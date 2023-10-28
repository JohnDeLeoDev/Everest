export default function AddComp(props) {
    return (
        <>
            <h1>Enter details below to add a computer to your inventory:</h1>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <label htmlFor="brand">Brand:</label>
                    <input
                        type="text"
                        name="brand"
                    />
                </div>
                <div>
                    <label htmlFor="model">Model:</label>
                    <input
                        type="text"
                        name="model"
                    />
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input
                        type="text"
                        name="price"
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        name="description"
                    />
                </div>
                <div>
                    <label>Memory:</label>
                    <input type="radio" name="memory" value="4GB"/>4GB
                    <input type="radio" name="memory" value="8GB"/>8GB
                    <input type="radio" name="memory" value="16GB"/>16GB
                    <input type="radio" name="memory" value="32GB"/>32GB
                </div>
                <div>
                    <label>Storage:</label>
                    <input type="radio" name="storage" value="128GB"/>128GB
                    <input type="radio" name="storage" value="256GB"/>256GB
                    <input type="radio" name="storage" value="512GB"/>512GB
                    <input type="radio" name="storage" value="1TB"/>1TB
                    <input type="radio" name="storage" value="2TB"/>2TB
                </div>
                <div>
                    <label>Graphics:</label>
                    <input type="radio" name="graphics" value="NVIDIA GeForce RTX 4090"/>NVIDIA GeForce RTX 4090
                    <input type="radio" name="graphics" value="AMD Radeon Pro X6400"/>AMD Radeon Pro X6400
                    <input type="radio" name="graphics" value="Intel UHD Graphics 770"/>Intel UHD Graphics 770
                </div>
                <div>
                    <label>Processor:</label>
                    <input type="radio" name="processor" value="Intel Core i9-11900K"/>Intel Core i9-11900K
                    <input type="radio" name="processor" value="AMD Ryzen 9 5950X"/>AMD Ryzen 9 5950X
                    <input type="radio" name="processor" value="Apple M1"/>Apple M1
                </div>
                <div>
                    <label>Operating System:</label>
                    <input type="radio" name="operating-system" value="Windows 10"/>Windows 10
                    <input type="radio" name="operating-system" value="Mac OS"/>Mac OS
                    <input type="radio" name="operating-system" value="Linux"/>Linux
                </div>
                <div>
                    <label>Screen Size:</label>
                    <input type="radio" name="screen-size" value="13 inches"/>13 inches
                    <input type="radio" name="screen-size" value="15 inches"/>15 inches
                    <input type="radio" name="screen-size" value="17 inches"/>17 inches
                </div>
                <div>
                    <label>Color:</label>
                    <input type="radio" name="color" value="Black"/>Black
                    <input type="radio" name="color" value="Silver"/>Silver
                    <input type="radio" name="color" value="Space Gray"/>Space Gray
                    <input type="radio" name="color" value="Gold"/>Gold
                    <input type="radio" name="color" value="Rose Gold"/>Rose Gold
                </div>
                <div>
                    <label>Quantity:</label>
                    <input type="number" name="quantity" value={props.quantity} onChange={props.handleChange}/>
                </div>
                <button>Add Computer</button>
            </form>
        </>
    )
}