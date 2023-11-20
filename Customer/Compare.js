import React from 'react';

export function CompareSelected(props) {
    let selectedComputersID = props.compareState;
    let allSearch = props.searchResults;
    let selectedComputers = [];

    for (let i = 0; i < selectedComputersID.length; i++) {
        selectedComputersID[i] = Number(selectedComputersID[i]);
        for (let j = 0; j < allSearch.length; j++) {
            if (selectedComputersID[i] === allSearch[j].inventoryID) {
                selectedComputers.push(allSearch[j]);
            }
        }
    }

    function computerCards() {

        console.log(selectedComputers);
        if (selectedComputers.length === 0) {
            return (
                <div className="compare-results">
                    <div>
                        <h2>No computers selected.</h2>
                    </div>
                </div>
            )
        } else return (
            <>
                <div className="compare-results">
                    {selectedComputers.map((computer) => {
                        return (
                            <div className="compare-computer-card" key={computer.inventoryID}>
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
            {computerCards()}
        </div>
    )






}