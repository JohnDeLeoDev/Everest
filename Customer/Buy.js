//Buy computer case
import React from "react";


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

    //convert to radians
    var a = 2 * lat + (long * Math.cos(toRadians(storeLat))*(Math.cos(toRadians(storeLat))))
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    distance = (meanRadius * c);    //km

    //convert to miles
    distance = distance / 1.609344;
    
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

    return (
        <div className="bodybag">
            <h2>Please enter the latitude and longitude of your location</h2>
                <div>
                    <label>Latitude (decimal degrees)</label>
                    <input id="lat" />
                </div>
                <div>
                    <label>Longitude (decimal degrees)</label>
                    <input id="lon" />
                </div>
                <button onClick = {()=>{props.handleCustomerCoordinates(document.getElementById("lat").value, document.getElementById("lon").value)}}>Buy</button>
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

}