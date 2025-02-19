import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { Accounts } from "meteor/accounts-base";
import { Link, useNavigate } from "react-router-dom";

export const RegisterForm = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({});
    const [isToggle, setIsToggle] = useState(false);
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
            <div className="error-header">
                <p>{error?.reason}</p>
            </div>
            <div>
                <h1>Register</h1>
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
            <div className="pass-input">
                <label htmlFor="password">Password</label>

                <input
                    type={isToggle ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />

                <img src={`/assets/svgs/eye-${isToggle ? "close" : "show"}.svg`} className='clickable-svg-icons pass-eye-icon' alt="EYE toggle" width={20} onClick={() => setIsToggle(!isToggle)} />
            </div>

            <div>
                <Link to="/login">Have a account?</Link>
            </div>
            <div>
                <button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
            </div>
        </form>
    );
};