import React, { useState } from 'react'

const ForgotPassword = () => {
    const [forgotPassword, setForgotPassword] = useState({ email: "" })
    const [error, setError] = useState();
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        setLoading(true)
        let options = { email: forgotPassword.email }

        Accounts.forgotPassword(options, (error) => {
            setLoading(false)
            error ? setError(error) : setSuccess('Sent reset password email successfully.')
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
                    <h1>Forgot Password</h1>
                </div>
                <div>
                    <label htmlFor="username">email</label>

                    <input
                        type="email"
                        placeholder="Email address"
                        name="email"
                        required
                        onChange={(e) => setForgotPassword({ ...forgotPassword, [e.target.name]: e.target.value })}
                    />
                </div>

                <div>
                    <button type="submit"> {loading ? "Saving..." : "Send"}</button>
                </div>
            </form>
        </>
    )
}

export default ForgotPassword