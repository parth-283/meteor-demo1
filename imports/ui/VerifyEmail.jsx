import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const VerifyEmail = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState({});

    useEffect(() => {
        Accounts.verifyEmail(token, (error) => {
            if (error) {
                setError(error)
            } else {
                navigate('/')
            }
        });
    }, [token]);

    return (
        <div className="align-screen-center">
            <div className={error?.reason ? "error-header" : ""}>
                <h2>{error?.reason ? error?.reason : "Verifying your email..."}</h2>
            </div>
        </div>
    );
};