import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [resetPassword, setResetPassword] = useState({ newPassword: "" })
    const [error, setError] = useState({});
    const [isToggle, setIsToggle] = useState(false);
    const [loading, setLoading] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        setLoading(true)
        Accounts.resetPassword(
            token,
            resetPassword.newPassword,
            (error) => {
                setLoading(false)
                error ? setError(error) : navigate('/login')
            },
        );
    }

    return (
        <form onSubmit={submit} className="login-form">
            <div className={"error-header"}>
                <p>{error?.reason}</p>
            </div>
            <div>
                <h1>Reset Password</h1>
            </div>

            <div className="pass-input">
                <label htmlFor="password">Set New Password</label>

                <input
                    type={isToggle ? "text" : "password"}
                    placeholder="New Password"
                    name="newPassword"
                    required
                    onChange={(e) => setResetPassword({ ...resetPassword, [e.target.name]: e.target.value })}
                />

                <img src={`/assets/svgs/eye-${isToggle ? "close" : "show"}.svg`} className='clickable-svg-icons pass-eye-icon' alt="EYE toggle" width={20} onClick={() => setIsToggle(!isToggle)} />
            </div>

            <div>
                <button type="submit"> {loading ? "Saving..." : "Save"}</button>
            </div>
        </form>
    );
};