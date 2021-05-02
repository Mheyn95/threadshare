import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
import ShareImage from "../assets/share.jpg";

function SignUp(props) {
    const [formState, setFormState] = useState({
        email: "",
        password: "",
    });
    const [addUser] = useMutation(ADD_USER);

    const handleSignUpFormSubmit = async (event) => {
        event.preventDefault();
        const mutationResponse = await addUser({
            variables: {
                email: formState.email,
                password: formState.password,
                firstName: formState.firstName,
                lastName: formState.lastName,
            },
        });
        const token = mutationResponse.data.addUser.token;
        Auth.login(token);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // wrote skelton, but classNames and styling still needs to be done
    return (
        <div className='home-styling'>
        <div className='sign-up'>
            <h2 className="sign-up-words">
                Welcome to threadSHARE.<br/>
                Build your profile below.
            </h2>
            <form onSubmit={handleSignUpFormSubmit}>
                <div className='row'>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        placeholder="First Name"
                        name="firstName"
                        type="firstName"
                        id="firstName"
                        onChange={handleChange}
                    />
                </div>
                <div className='row'>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        placeholder="Last Name"
                        name="lastName"
                        type="lastName"
                        id="lastName"
                        onChange={handleChange}
                    />
                </div>
                <div className='row'>
                    <label htmlFor="email">Email:</label>
                    <input
                        placeholder="name@email.com"
                        name="email"
                        type="email"
                        id="email"
                        onChange={handleChange}
                    />
                </div>
                <div className="row">
                    <label htmlFor="password">Password:</label>
                    <input
                        placeholder="******"
                        name="password"
                        type="password"
                        id="password"
                        onChange={handleChange}
                    />
                </div>
                <div className="password-words">* Password must contain 5 characters</div>
                <div className='button-row'>
                    <button className='btn' type="submit">Submit</button>
                </div>
            </form>
            </div>

            <div>
                <img className="home-image" src={ShareImage} alt="hands holding flower" />
            </div>

        
    </div>

    );
}

export default SignUp;
