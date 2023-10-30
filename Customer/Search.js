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

//search computers
export function searchComputer()
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

    computer_filter_labels.forEach((filter) => {
        const [key, value] = filter;
        console.log("key:" + key)
        console.log("value: "+ value)
    }
    );
    //titles are the keys
    //array values are the check boxes

    return (
        <div>
            <div id="filter_boxes"> 
        
            </div>

        </div>
    )
}


//search stores