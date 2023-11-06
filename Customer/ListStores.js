//list stores to filter by/go to

export function ListStoreBalances(props)
{
    //build structure ascending (default)
    for (let i=0; i < objArray.length;i++){
        //build structure ascending
        reportBody.push(
            <tr key={sortedObjArray[i].storeID}>
            <td>{sortedObjArray[i].name}</td>
            <td>{sortedObjArray[i].storeBalance}</td>
        </tr>
        )
    }
}



