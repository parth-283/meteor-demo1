import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { Accounts } from "meteor/accounts-base";
import { Link, useNavigate } from "react-router-dom";

export const RegisterForm = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [error, setError] = useState({});
    const [isToggle, setIsToggle] = useState(false);
    const [loading, setLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true)
        if (!username || !password) {
            setError({ reason: "Username and Password are required." })
            setLoading(false)
            return
        }

        Accounts.createUser({
            email: username,
            password: password,
            profile: { name: "Parth", isAdmin }
        }, async (error) => {
            setLoading(false)
            error ? setError(error) : navigate('/')
        });
    };

    return (
        <>
            <SEO
                title="Register | Demo1"
                description="Welcome to register page"
                url="/register"
            />
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
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="pass-input">
                    <label htmlFor="password">Password</label>

                    <input
                        type={isToggle ? "text" : "password"}
                        placeholder="Password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <img src={`/assets/svgs/eye-${isToggle ? "close" : "show"}.svg`} className='clickable-svg-icons pass-eye-icon' alt="EYE toggle" width={20} onClick={() => setIsToggle(!isToggle)} />
                </div>

                <div className="checkbox-field">
                    <input
                        id="id_admin"
                        type="checkbox"
                        checked={!!isAdmin}
                        onClick={() => setIsAdmin(!isAdmin)}
                        readOnly
                    />
                    <label htmlFor="id_admin">As Admin?</label>
                </div>

                <div>
                    <Link to="/login">Have an account?</Link>
                </div>

                <div>
                    <button id="registerbtn" type="submit" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                </div>
            </form>
        </>
    );
};