import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({});

    const submit = (e) => {
        e.preventDefault();

        Meteor.loginWithPassword(username, password, (error) => {
            error ? setError(error) : navigate('/')
        });
    };

    return (
        <form onSubmit={submit} className="login-form">
            <div>
                <p>{error?.reason}</p>
            </div>
            <div>
                <label htmlFor="username">Username</label>

                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="password">Password</label>

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div>
                <button type="submit">Log In</button>
            </div>
        </form>
    );
};