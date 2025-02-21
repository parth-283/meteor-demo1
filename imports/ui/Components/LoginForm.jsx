import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const LoginForm = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isToggle, setIsToggle] = useState(false);
    const [error, setError] = useState({});

    const submit = (e) => {
        e.preventDefault();

        Meteor.loginWithPassword(username, password, (error) => {
            error ? setError(error) : navigate('/')
        });
    };

    return (
        <form onSubmit={submit} className="login-form">
            <div className="error-header">
                <p>{error?.reason}</p>
            </div>
            <div>
                <h1>Login</h1>
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
                <Link to="/forgot-password">Forgot Password?</Link>
            </div>

            <div>
                <Link to="/register">Haven't an account?</Link>
            </div>

            <div>
                <button type="submit">Log In</button>
            </div>
        </form>
    );
};