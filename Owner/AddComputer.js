/**
 * @brief add a computer to a store
 */

import { computer_cfg } from "../computer_cfg";

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

    console.log("ADD COMPUTER")
    return (
        <div>
            <br clear='right'/>
            <h1 id='banner'>Enter details below to add a computer to your inventory:</h1>
            <form onSubmit={props.handleSubmit} className='features'>
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

                <button id='c3'>Add Computer</button>
            </form>
        </div>
    )
}