import React from 'react';
import { SearchComputersRequest } from '../API';
import { testCustomerInventory } from "./testInventory"
import { GenerateStore } from './GenerateInventory';
import { ListStoresRequest } from '../API';
import {CompareSelected} from './Compare';
import { SearchStoreInventoryRequest } from '../API';
import { storeResults } from './GenerateInventory';

/***************************************************************
 * @brief File to implement Customer Search by Filter Feature
 *          
 *          Search for Computer
 *          Search by Store
 * 
 * @author EM, JD, CN
 * 
 * TODO:
 *      n/a
 ***************************************************************/
import { computer_filter_labels } from "../computer_cfg";

//get computer memory options
function getOptions(keyword, options){
    return options.map((option) => {
        return (
            <div>
                <input type='checkbox' name={keyword} value={option} />
                <label>{option}</label>
            </div>
        )
    });
}

//***************************************************** */
export function SearchComputer(props)
/**
 * search computers
 * 
 * Search by filters:
 *      Price: 
 *      Memory: 
 *      Storage:
 *      Processor:
 *      Process Gen:
 *      Graphics:
 * 
 *      select 20 or 50 per page (load 0..i files, 
 *          "more" loads i+1..i+i, while i < n)
 ***************************************************************************************/
{
    const [filter, setFilter] = React.useState({});
    const [search, setSearch] = React.useState(null);
    const [compareState, setCompareState] = React.useState(null);

    function handleSearch(e){
        e.preventDefault()
        const form = document.getElementById("filter-form");
        const formData = new FormData(form);

        let filters = {}
        for (let [key, value] of formData.entries()) {

            if (filters[key.toLowerCase()] === undefined){
                filters[key.toLowerCase()] = []
            }
            filters[key.toLowerCase()].push(value) 
        }
        setFilter(filters);
        setSearch(true);
    }

    function handleCompare(e){
        e.preventDefault()
        const computers = document.querySelectorAll('input[type=checkbox]:checked');
        let computerIDs = []
        for (let c of computers){
            computerIDs.push(c.value)
        }
        setCompareState(computerIDs)
    }

    function handleCompareClear(e){
        e.preventDefault()
        setCompareState(null)
        document.querySelectorAll('input[type=checkbox]:checked').forEach( el => el.checked = false );
    }

    //******************************************************************* */
    function computerCards() 
    /**
     * @brief function to display computers fitting values selected in Search
     * 
     * @parameters
     *      searchResults: the computers that are returned from the search filters
     * @returns
     *      View displaying all computers returned from filter search
     *************************************************************************/
    {
        let searchResults = props.searchResults;
        if (searchResults === null || searchResults.length === 0) {
            return (
                <div className="search-results">
                    <div className="computer-card">
                        <h2>No results found</h2>
                    </div>
                </div>
            )
        } else return (
            <>
                <div className="search-results">
                    {searchResults.map((computer) => {
                        return (
                            <div className="computer-card">
                                <div className="compare-check">
                                    <input type="checkbox" id="computer-compare" value={computer.inventoryID}/>
                                    <label for="computer-compare">Compare</label>
                                </div>
                                <h2>{computer.brand} {computer.model}</h2> 
                                <p>Price: {computer.price}</p>
                                <p>Memory: {computer.memory}</p>
                                <p>Storage: {computer.storageSize}</p>
                                <p>Processor: {computer.processor}</p>
                                <p>Process Generation: {computer.processGen}</p>
                                <p>Graphics: {computer.graphics}</p>
                                <button onClick={() => props.handleCoordinatesIntake(true, computer)}>Buy</button>
                            </div>
                        )
                    })}
                </div>
            </>
        )
    }
    
    return (
        <div>
            <div id="filter_boxes"> 
                <form id={"filter-form"} onSubmit={handleSearch} className='features'>
                <div id='c1'>
                <label>Price</label>
                {getOptions("Price", computer_filter_labels.Price)}
                </div>

                <div id='c2'>
                <label>Memory</label>
                {getOptions("Memory", computer_filter_labels.Memory)}
                </div>

                <div id='c3'>
                <label>Storage</label>
                {getOptions("Storage", computer_filter_labels.Storage)}
                </div>

                <div id='c1'>
                <label>Processor</label>
                {getOptions("Processor", computer_filter_labels.Processor)}
                </div>

                <div id='c2'>
                <label>Process Generation</label>
                {getOptions("ProcessGen", computer_filter_labels.ProcessGen)}
                </div>

                <div id='c3'>
                <label>Graphics</label>
                {getOptions("Graphics", computer_filter_labels.Graphics)}
                </div>

                <button id='c3' onClick={handleSearch} >Search</button>
                <div id="compare-selected">
                    <button onClick={handleCompare} >Compare Selected</button>
                
                {compareState && (
                    <div id="compare-selected">
                        <button onClick={handleCompareClear} >Clear Compare</button>
                    </div>
                
                )}
                </div>
                {compareState && <CompareSelected compareState={compareState} searchResults={props.searchResults}/>}
            </form>
            </div>
            <div id='results'>
                {search && <SearchComputersRequest 
                    searchResults={props.searchResults} 
                    handleSearchResults={props.handleSearchResults} 
                    json={filter} />}
                {props.searchResults && computerCards()}
            </div>

            

        </div>
    )
}

//*********************************************************** */
export function SearchStores(props)
/**
 * @brief function to search for all stores on site
 * 
 * @parameters
 *      stores: stores to display
 *      handleCustomerInventory: 
 *          this sets the storeID to open a single store page for one store
 *          it is used to hold all stores in multi-search option
 *      
 *************************************************************/
{


    // <div id='results'>
    //     {<ListStoresRequest handleStores={props.handleStores} stores={props.stores}/>}
    // </div>


    let stores = props.stores
    let submit = "checkbox"

    //these to set the inventory from the requested Store(s)
    const [generateStore, setGenerateStore] = React.useState(null);
    const [customerStoreInventory, setCustomerStoreInventory] = React.useState(null);


     //one case is to click on the store name to "link" to 
     function handleReturnOneStoreInventory(storeID){
        let storeIDs = []
        storeIDs.push(storeID)
        let json = {"stores":storeIDs}
        console.log(json)

        props.handleCustomerStoreInventory(json)
        props.handleStores("");
        props.handleListFilteredStores(true)
        
     }

     //show multiple store's inventory (selected with checkboxes)
    function handleGenerateStore(){
        const stores = document.querySelectorAll('input[type=checkbox]:checked');
        let storeIDs = [];
        for (let s of stores){
            storeIDs.push(s.value);
        }
        let json = {
            "stores": storeIDs
        }

        setGenerateStore(json);        
    }

    //display the stores to go to or display computers from
    let storeSearch = []
    if(stores !== null){
        for (let s of stores){
            storeSearch.push(
                <tr>
                    <td>
                    <input type={submit} name={s.name} value={s.storeID}/>   
                    <a 
                        id="link"
                        onClick={() => {handleReturnOneStoreInventory(s.storeID)} }
                        style={{cursor: 'pointer'}}>
                            {s.name}
                    </a>
                    </td>
                </tr> 
            )
        }
    }

    //this is the function for the filter boxes - multi-select
    function storeResults(){
        var storeResults = [];

        if (generateStore === null || generateStore.length === 0) {
            return (
                <div className="search-results">
                    <div className="computer-card">
                        <h2>No results found</h2>
                    </div>
                </div>
            )
        } else {
            for (let storeName in customerStoreInventory){
                storeResults.push(
                    <div className="store-results">
                        <div className="store-card">
                            <h2>{storeName}</h2>
                        </div>
                        <div className="computer-results">
                            {customerStoreInventory[storeName].map((computer) => {
                                    return (
                                        <div className="computer-card">
                                            <h2>{computer.brand} {computer.model}</h2> 
                                            <p>Price: {computer.price}</p>
                                            <p>Memory: {computer.memory}</p>
                                            <p>Storage: {computer.storageSize}</p>
                                            <p>Processor: {computer.processor}</p>
                                            <p>Process Generation: {computer.processGen}</p>
                                            <p>Graphics: {computer.graphics}</p>
                                            <button onClick={() =>{props.handleCoordinatesIntake(true, computer)}}>Buy</button>
                                        </div>
                                    )
                                })}
                        </div>
                    </div>
                )
            }
            return (
                <>
                    {storeResults}
                </>
            )
        }
        
    }

    //search stores with button to set filters by multiple stores
    return (
        <div>
            SEARCH STORES
            <p>Click Store Name to go to store inventory, select multiple stores
                 to display computers from all stores selected.
            </p>
            <div id="c1">
                <table>
                    <tbody>
                    {storeSearch}
                    </tbody>
                </table>
            </div>
            <div id='results'>
                {<ListStoresRequest handleStores={props.handleStores} stores={props.stores}/>}
                <button onClick={handleGenerateStore}>GO</button>
            </div>
            <div id='inventory-results'>
                {generateStore && <SearchStoreInventoryRequest json={generateStore} handleCustomerStoreInventory={setCustomerStoreInventory}/>}
                {customerStoreInventory && storeResults(generateStore, customerStoreInventory)}
            </div>
        </div>
    )

}