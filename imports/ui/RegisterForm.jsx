import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { Accounts } from "meteor/accounts-base";
import { useNavigate } from "react-router-dom";

export const RegisterForm = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true)

        Accounts.createUser({
            email: username,
            password: password,
            profile: { name: "Parth" }
        }, (error) => {
            setLoading(false)
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
                <button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
            </div>
        </form>
    );
};