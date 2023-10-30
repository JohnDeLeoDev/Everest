//remove store - site manager permissions

export default function RemoveStore(props){
    if (props.user === 'manager'){
        //can do actions
        console.log("remove computer ID "+ props.removeId)
    } else {
        //cannot do actions
        alert("You do not have permission for this action. Please log in.")
    }
}