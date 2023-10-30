//trying out a tmp computer object to organize how a computer is displayed

class Computer {
    constructor (price, model, brand, memory, storage, processor, processGen, graphics){
        this.price = price;
        this.model = model;
        this.brand = brand;
        this.memory = memory;
        this.storage = storage;
        this.processor = processor;
        this.processGen = processGen;
        this.graphics = graphics;
    }

    getComputer(){
        return (
            <div>
                <ul>
                    <li>{this.price}</li>
                    <li>{this.model} {this.brand}</li>
                    <li>{this.memory}</li>
                </ul>
            </div>
        )
    }
}