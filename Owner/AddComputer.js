import { AddComputerRequest } from "../API";
import React from 'react';

/**
 * @brief add a computer to a store
 *
*/

import { computer_cfg } from "../computer_cfg";
import { wait } from "@testing-library/user-event/dist/utils";

//get computer memory options
function getOptions(keyword, options){
    return options.map((option) => {
        return (
            <div>
                <input type='radio' name={keyword} value={option} />
                <label>{option}</label>
            </div>
        )
    });
}

export default function AddComputer(props) {

    const [addComputerRequest, setAddComputerRequest] = React.useState(null);
    const [addComputerResponse, setAddComputerResponse] = React.useState(null);

    function handleSubmit(event) {
        event.preventDefault();
        const form = document.forms.addComputer;
        const formData = new FormData(form);
        let brand = formData.get("brand");
        let model = formData.get("model");
        let price = formData.get("price");
        let description = formData.get("description");
        let memory = formData.get("Memory");
        let storage = formData.get("Storage");
        let graphics = formData.get("Graphics");
        let processor = formData.get("Processor");
        let processGen = formData.get("ProccessGen");

        var json = {
            "username": props.user[0],
            "storeID": props.user[2].storeID,
            "brand": brand,
            "model": model,
            "price": price,
            "description": description,
            "memory": memory,
            "storageSize": storage,
            "graphics": graphics,
            "processor": processor,
            "processGen": processGen,
            "isSold": 0,
        };

        setAddComputerRequest(json);

    }

    function backButton() {
        props.handleAddComputer(false);
        props.handleComputerAdded(false);
    }

    return (
        <div>
            <br clear='right'/>
            <h1 >Enter details below to add a computer to your inventory:</h1>
            <form name="addComputer" onSubmit={props.handleSubmit} className='features'>
                <div>
                    <label htmlFor="brand"  id='text-inputs'>Brand</label>
                    <input
                        type="text"
                        name="brand"
                    />
                
                    <label htmlFor="model"  id='text-inputs'>Model:</label>
                    <input
                        type="text"
                        name="model"
                    />
                
                    <label htmlFor="price"  id='text-inputs'>Price:</label>
                    <input
                        type="text"
                        name="price"
                    />
                
                    <label htmlFor="description"  id='text-inputs'>Description:</label>
                    <input
                        type="text"
                        name="description"
                        maxLength={250}
                    />
                </div>
                
                    <div id='c1'>
                    <label id='tile-title'>Memory</label>
                    {getOptions("Memory", computer_cfg.Memory)}
                    </div>

                    <div id='c2'>
                    <label id='tile-title'>Storage</label>
                    {getOptions("Storage", computer_cfg.Storage)}
                    </div>

                    <div id='c3'>
                    <label id='tile-title'>Graphics</label>
                    {getOptions("Graphics", computer_cfg.Graphics)}
                    </div>
                
            <br clear='right'/>
                <div id='c1'>
                    <label id='tile-title'>Processor</label>
                    {getOptions("Processor", computer_cfg.Processor)}
                </div>

                <div id='c2'>
                    <label id='tile-title'>Processor Generation</label>
                    {getOptions("ProccessGen", computer_cfg.ProcessGen)}
                </div>

                <button onClick={handleSubmit} id='c3'>Add Computer</button>
            </form>
            {addComputerRequest !== null ? <AddComputerRequest json={addComputerRequest} setAddComputerResponse={setAddComputerResponse} computerAdded={props.computerAdded} handleComputerAdded={props.handleComputerAdded} /> : null}
            {props.computerAdded === true ? <h1>Computer added successfully!</h1> : null}
            {props.computerAdded === true ? <button onClick={backButton}>Back</button> : null}
        </div>
    )
}