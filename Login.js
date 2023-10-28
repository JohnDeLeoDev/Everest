export default function Login(props) {
    return (
        <>
            <h1>Login</h1>
            <button className="Button" onClick={() => {props.handleUser("owner")}}>Owner</button>
            <button className="Button" onClick={() => {props.handleUser("manager")}}>Manager</button>
            <button className="Button" onClick={() => {props.handleUser("customer")}}>Customer</button>
        </>
    )
}