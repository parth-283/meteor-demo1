import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const navigate = useNavigate()
    const [changePassword, setChangePassword] = useState({ oldPassword: "", newPassword: "" })
    const [error, setError] = useState();
    const [success, setSuccess] = useState('');
    const [isOldPasswordToggle, setIsOldPasswordToggle] = useState(false);
    const [isToggle, setIsToggle] = useState(false);
    const [loading, setLoading] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        setLoading(true)
        setError(null)
        setSuccess(null)

        if (!changePassword.oldPassword || !changePassword.newPassword) {
            setError({ reason: "Old Password and New Password are required." })
            return
        }

        Accounts.changePassword(
            changePassword.oldPassword,
            changePassword.newPassword,
            (error) => {
                setLoading(false)
                if (error) {
                    setError(error)
                } else {
                    setSuccess('Your password change successfully.')
                    Meteor.logout(() => {
                        navigate('/login')
                    });
                }
            },
        );
    }

    return (
        <>
            <SEO
                title="Change Password | Demo1"
                description="Welcome to Change Password"
                url="/change-password"
            />

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
                        onChange={(e) => setChangePassword({ ...changePassword, [e.target.name]: e.target.value })}
                    />

                    <img src={`/assets/svgs/eye-${isToggle ? "close" : "show"}.svg`} className='clickable-svg-icons pass-eye-icon' alt="EYE toggle" width={20} onClick={() => setIsToggle(!isToggle)} />
                </div>

                <div>
                    <button id="change-pwd-btn" type="submit"> {loading ? "Saving..." : "Save"}</button>
                </div>
            </form>
        </>
    )
}

export default ChangePassword