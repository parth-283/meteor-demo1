import React, { useState } from 'react'

const ChangePassword = () => {
    const [changePassword, setChangePassword] = useState({ oldPassword: "", newPassword: "" })
    const [error, setError] = useState();
    const [success, setSuccess] = useState('');
    const [isOldPasswordToggle, setIsOldPasswordToggle] = useState(false);
    const [isToggle, setIsToggle] = useState(false);
    const [loading, setLoading] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        setLoading(true)

        Accounts.changePassword(
            changePassword.oldPassword,
            changePassword.newPassword,
            (error) => {
                setLoading(false)
                error ? setError(error) : setSuccess('Your password change successfully.')
            },
        );
    }

    return (
        <>
            <form onSubmit={submit} className="login-form">
                {(success || error) && <div className={success ? "success-header" : "error-header"}>
                    <p>{success ? success : error?.reason}</p>
                </div>}
                <div>
                    <h1>Change Password</h1>
                </div>

                <div className="pass-input">
                    <label htmlFor="password">Old Password</label>

                    <input
                        type={isOldPasswordToggle ? "text" : "password"}
                        placeholder="Old Password"
                        name="oldPassword"
                        required
                        onChange={(e) => setChangePassword({ ...changePassword, [e.target.name]: e.target.value })}
                    />

                    <img src={`/assets/svgs/eye-${isOldPasswordToggle ? "close" : "show"}.svg`} className='clickable-svg-icons pass-eye-icon' alt="EYE toggle" width={20} onClick={() => setIsOldPasswordToggle(!isOldPasswordToggle)} />
                </div>

                <div className="pass-input">
                    <label htmlFor="password">New Password</label>

                    <input
                        type={isToggle ? "text" : "password"}
                        placeholder="Password"
                        name="newPassword"
                        required
                        onChange={(e) => setChangePassword({ ...changePassword, [e.target.name]: e.target.value })}
                    />

                    <img src={`/assets/svgs/eye-${isToggle ? "close" : "show"}.svg`} className='clickable-svg-icons pass-eye-icon' alt="EYE toggle" width={20} onClick={() => setIsToggle(!isToggle)} />
                </div>

                <div>
                    <button type="submit"> {loading ? "Saving..." : "Save"}</button>
                </div>
            </form>
        </>
    )
}

export default ChangePassword