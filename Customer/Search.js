import React from 'react';
import { SearchComputersRequest } from '../API';
import { testCustomerInventory } from "./testInventory"
import { GenerateStore } from './GenerateInventory';

/***************************************************************
 * @brief File to implement Customer Search by Filter Feature
 *          
 *          Search for Computer
 *          Search by Store
 * 
 * @author EM, JD
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

    function handleSearch(e){
        e.preventDefault()
        const form = document.getElementById("filter-form");
        const formData = new FormData(form);

        let filters = {}
        for (let [key, value] of formData.entries()) {
            console.log(key, value);

            if (filters[key.toLowerCase()] === undefined){
                filters[key.toLowerCase()] = []
            }
            filters[key.toLowerCase()].push(value) 
        }
        setFilter(filters);
        setSearch(true);
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
                                <h2>{computer.brand} {computer.model}</h2> 
                                <p>Price: {computer.price}</p>
                                <p>Memory: {computer.memory}</p>
                                <p>Storage: {computer.storageSize}</p>
                                <p>Processor: {computer.processor}</p>
                                <p>Process Generation: {computer.processGen}</p>
                                <p>Graphics: {computer.graphics}</p>
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
 *        **when calling from manager view, use radio buttons
 *        **when calling from default view, use checkboxes
 *************************************************************/
{
    const stores = props.stores
    let submit = "checkbox"
    if (props.user === 'manager'){
        submit = 'radio'
    }

    //these to set the inventory from the requested Store(s)
    const [generateStore, setGenerateStore] = React.useState(null);
    const [customerStoreInventory, setCustomerStoreInventory] = React.useState(testCustomerInventory);

     //show one store's inventory
    function handleGenerateStore(){
        //this is where we would call the function to make the request, but testing now
        //everything will use the default test data

        //set storeID(s) from option here to pass back to app
        props.handleStores("");
        props.handleListFilteredStores(true)

        //set the store inventory (customer view) from the request when store is chosen
        //props.handleCustomerStoreInventory(response)
    }

    //make check boxes
    let storeSearch = []
    for (let s of stores){
        storeSearch.push(
            <tr>
                <td>
                <input type={submit} name={s.storeID} value={s.name}/>   
                <label>{s.name}</label>
                <button onClick={() => handleGenerateStore()}>GO</button>
                </td>
            </tr> 
        )
    }

    return (
        <div className="bodybag">
            SEARCH STORES
            <div id="c1">
                <table>
                    <tbody>
                    {storeSearch}
                    </tbody>
                </table>
            </div>
        </div>
    )
}