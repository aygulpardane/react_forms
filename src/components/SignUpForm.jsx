/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react"
import {useState} from "react"

const SignUpForm = ({setToken}) => { //deconstruct the setToken function from props
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    function handleUsernameChange (event) {
        if (event.target.value.length > 3) {
            setError("Username too long");
        }
        if (event && event.target.value.length <= 3) {
            setError("");
        }
        setUsername(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault(); //this prevents page refresh
        try {
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
                method: "POST",
                body: JSON.stringify({username, password})
            });
            const result = await response.json();
            console.log(result);
            setToken(result.token);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div>
            <h2>Sign Up</h2>
            {error && <p>{error}</p>}
            <form onSubmit = {handleSubmit}>
                <label>
                    Username: {""} <input value={username}
                    onChange={handleUsernameChange}/>
                </label>

                <br/>
                <br/>

                <label>
                    Password: {""} <input value={password}
                    onChange={(event) => setPassword(event.target.value)}/>
                </label>

                <br/>
                <br/>

                <button disabled={error}>Submit</button>
            </form>
        </div>
    );
}

export default SignUpForm
