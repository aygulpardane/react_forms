/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react"
import {useState} from "react"

const Authenticate = ({token}) => { //deconstruct token from props
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleClick =async () => {
        try {
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", {
                method: "GET",
                headers: { //headers property is an object, needs two properties
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, //Authorization header, needs to contain our token
                }
            });
            const result = await response.json();
            console.log(result);
            setSuccessMessage(result.message);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Authenticate</h2>
            {successMessage && <p>{successMessage}</p>}
            {error && <p>{error}</p>}
            <button onClick={handleClick}>Authenticate Token</button>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    );
}

export default Authenticate
