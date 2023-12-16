//Buy computer case
import React, { useEffect } from "react";
import { BuyComputer, GetStoreLatLong, SearchComputersRequest } from "../API";
import { wait } from "@testing-library/user-event/dist/utils";

//*************************************************************************** */
function convertToDecimalDeg(storeLat, storeLong, custLat, custLong)
/**
 * not sure if we need this, but in case someone inputs deg, min, sec and needs 
 *      to convert to dec degrees
 */
{
    let decStoreLat = storeLat.split(![0-9]);      //split string on def.min.sec
    let deg = 0.0;
    let mult = 1.0;
    let div = 1/60;
    // /1, /60, /3600

    for(let i of decStoreLat){
        deg += (i * (mult))
        mult *= div;
    }

    return deg;
}

//*************************************************************** */
function toRadians(val)
/**
 * @brief helper conversion for decimal degrees -> radians
 *****************************************************************/
{
    return val * Math.PI/180;
}

//*************************************************************** */
export function calculateShipping(storeLat, storeLong, custLat, custLong, costPerMile)
/**
 * @brief calculate the shipping from the store to the customer's loc
 *      
 *  @description 
 *      shipping is calculated by mile from one lat/long point to another
 *      haversine formula: how to calculate distance on a sphere, or don't 
 *      if you believe the earth is flat. (not significant < 20k)
 * 
 *  haversine(theta) = sin^2(theta/2)
 * 
 *  φ is latitude, λ is longitude, R is earth’s radius (mean radius = 6,371km)
 *  a = sin²(φB - φA/2) + cos φA * cos φB * sin²(λB - λA/2) 
 *  c = 2 * asin( √a, √(1−a) )
 *  d = R ⋅ c
 * 
 *  @parameters
 *      decimal degrees - normalized in pos/neg form (not N,S,E,W)
 *      storeLat: latitude of store 
 *      storeLong: longitude of store
 *      custLat: latitude of customer
 *      custLong: longitude of customer
 */
{
    var distance = 0.0; //km
    var meanRadius = 6371.009; //km

    var deltaLat = toRadians((custLat - storeLat))
    var lat = Math.sin(deltaLat/2.0)**2

    var deltaLong = toRadians((custLong - storeLong))
    var long = Math.sin(deltaLong/2.0)**2

    //console.log("store lat: " + storeLat + " store long: " + storeLong)
    //console.log("cust lat: " + custLat + " cust lon: " + custLong)

    //convert to radians
    var a = 2 * lat + (long * Math.cos(toRadians(storeLat))*(Math.cos(toRadians(storeLat))))
    var c = 2 * Math.atan2(Math.sqrt(Math.abs(a)), Math.sqrt(Math.abs(1-a)))
    distance = (meanRadius * c);    //m

    //console.log("a: " + a + " c "+ c + " distance " + distance)

    //convert to miles
    distance = distance / 1.852;
    console.log("shipping distance(mi): " + distance)
    
    return distance * costPerMile;
}

//********************************************************************* */
export function GetCoordinatesView(props)
/**
 * @brief a web view for getting coordinates from the customer when buying
 *      a computer with the "Buy" button
 * input form
 ************************************************************************/
{
    let computer = props.computer
    let computerID = computer.inventoryID
    let handleStoreCoordinates = props.handleStoreCoordinates
    console.log("in getCoords, computerID="+computerID)

    const [coord, setCoord] = React.useState(null);


    function passback(){
        props.handleCustomerCoordinates(
            document.getElementById("lat").value, document.getElementById("lon").value);
        props.handleStoreLoc(true);
    }

    return (
        <div className="bodybag">
            <h2>Please enter the latitude and longitude of your location. When ready, click the buy button.</h2>
                <div>
                    <label>Latitude (decimal degrees)</label>
                    <input id="lat" />
                </div>
                <div>
                    <label>Longitude (decimal degrees)</label>
                    <input id="lon" />
                </div>
                <button 
                    className="Button"
                    onClick = {()=>{
                        passback()
                    }}>
                    Buy
                </button>
        </div>
    )
}


/*
{sendReq && <ReqStoreLonLat 
                    handleStoreCoordinates={props.handleStoreCoordinates} 
                    computerID={computerID}/>} 

*/

/*
function getStoreCoordinates(computerID){
    let json = {"ComputerID":computerID}

    return (
        <div>
            {<ReqStoreLonLat 
                    handleStoreCoordinates={props.handleStoreCoordinates} 
                    id={props.id}/>}
        </div>
    )
}*/

//******************************************************************** */
export function ReqStoreLonLat(props)
/**
 * @brief request the store latitude and longitude
 **********************************************************************/
{
    let computerID = props.computerID
    console.log("in req store lat lon, computer id="+computerID)

    /*
    //set the lat and lon from store retrieved from database
    function handleSt(lat, lon){
        props.handleStoreCoordinates(lat, lon)
        console.log("lat: " + lat + " long " + lon)
    }
    */

    let stop = props.handleStoreLoc(false)
    let next = props.handleConfirmBuy(true)
    //create the json for the request, have to send computer ID, will look for store and will 
    //do all the things for buy
    let json = {
        "computerID": computerID
    }

    return (
        <div>
            {stop}
            {next}
            <GetStoreLatLong
            handleStoreCoordinates={props.handleStoreCoordinates}
            computerID={props.computerID}
            json={json}
            />
        </div>
    )
}

//***************************************************************** */
export function Buy(props)
/**
 * @brief Buy a computer
 * 
 *  @description:
 *      How to find computers:
 *          From Landing, Search Stores, select a store and 
 *              see all computers in that store
 *          From Landing, Search Computers and select filters
 *      Buy computer must do 3 things:
 *          1. get user lat, long, address - does NOT need to persist
 *          2. calculate shipping from xy->xy distance (3$/mile??)
 *              store lat/long -> customer lat/long from database
 *          3. shipping + list price = cost
 *          4. store cut: cost * 0.95 (make sure in dollars at end)
 *          5. site manager cut: cost * (5%)
 ************************************************************/
{
    let computer = props.computerInfo
    let price = computer.price
    let computerID = computer.inventoryID
    let coordinates = {} 
    let perMileCost = 0.03
    let shipping = 0.0;
    let storePay = price*0.95;          
    let siteCut = price - storePay;
    let storeCoord = props.storeCoordinates
    let customerCoord = props.customerCoordinates

    //debug prints
    {storeCoord.lat && console.log("Store lat: " + storeCoord.lat+ " Store lon: " + storeCoord.lon)}
    {customerCoord.length && console.log("Customer lat: " + customerCoord.lat + " Customer lon: " + customerCoord.lat)}

    shipping = calculateShipping(storeCoord.lat, storeCoord.lat, customerCoord.lat, customerCoord.lon, perMileCost)

    let totalPrice = shipping + price

    //debug prints
    console.log("total price:" + totalPrice)
    console.log("store paid: " + storePay + " site cut: " + siteCut)


    let json = {
        "computerID":computerID,
        "storeCut":storePay,
        "siteCut":siteCut
    }

    //define
    const [status, setStatus] = React.useState(null); 

    const [buyTrigger, setBuyTrigger] = React.useState(false);

    function handleStatus(status){
        if (props.buyStatusCount == 0) {
            setStatus(status);
            props.handleSetBuyStatusCount(1);
        } else {
            return;
        }
        
        let previousResults = props.searchResults;

        // remove purchased computer from search results
        let newResults = previousResults.filter((computer) => {
            return computer.inventoryID != props.computerInfo.inventoryID;
        });
        props.handleSearchResults(newResults);     
    }

    function handleBuyTrigger(){
        setBuyTrigger(true);
    }

    //request in return:
    //pay store
    //pay site manager
    //remove computer from database
    return (
        <div className="bodybag">
            {(status == null) && <h2>Are you sure you want to buy this computer?</h2>}
            {(status == null) && <h2>Price:{price.toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</h2>}
            {(status == null) && <h2>Shipping:{shipping.toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</h2>}
            {(status == null) && <h2>Total:{totalPrice.toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</h2>}
            {(status == null) && <button onClick={() => {
                handleBuyTrigger();
            }}>Buy</button>}

            {(status == true) && <h2>Computer purchased successfully!</h2>}
            {(status == true) && <h2>Thank you for your purchase!</h2>}
            {(status == true) && <h2>Receipt of Sale:</h2>}
            {(status == true) && <h2>Price:{price.toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</h2>}
            {(status == true) && <h2>Shipping:{shipping.toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</h2>}
            {(status == true) && <h2>Total:{totalPrice.toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</h2>}
            {(status == false) && <h2>Computer purchase failed. Computer no longer available.</h2>}
            <button onClick={() => {
                props.handleSetBuyStatusCount(0);
                props.handleConfirmBuy(false);


            }}>Back</button>

            {buyTrigger && <BuyComputer 
                handleStatus={handleStatus}
                json={json}
                />}

                
                
            
        </div>
    )

}