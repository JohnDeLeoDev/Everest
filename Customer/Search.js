/***************************************************************
 * @brief File to implement Customer Search by Filter Feature
 *          
 *          Search for Computer
 *          Search by Store
 * 
 * @author EM
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

//search computers
export function SearchComputer(props)
/**
 * Search by filters:
 *      Price: 
 *      Memory: 
 *      Storage:
 *      Processor:
 *      Process Gen:
 *      Graphics:
 * 
 *      select 20 or 50 per page (load 0..i files, "more" loads i+1..i+i, while i < n)
 ***************************************************************************************/
{
    //get the filter boxes

    //titles are the keys
    //array values are the check boxes

    return (
        <div className="bodybag">
            <div id="filter_boxes"> 
                <form onSubmit={props.handleSubmit} className='features'>
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

                <button id='c3'>Search</button>
            </form>
            </div>

        </div>
    )
}

//if we could pass it the type of input to use we can use for checkbox and radio
//search stores
export function SearchStores(props)
{
    let stores = props.stores


    return (
        <div className="bodybag">
            SEARCH STORES
            <div id="c1">
                {}
            </div>
            <div id="c2">
                <button>GO</button>
            </div>
        </div>
    )
}