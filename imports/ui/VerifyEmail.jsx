const VerifyEmailPage = () => {
    const { token } = useParams();
    const location = useLocation();

    React.useEffect(() => { // Use useEffect for side effects
        Accounts.verifyEmail(token, (error) => {
            if (error) {
                console.error("Email verification failed:", error);
                // Optionally, show an error message to the user, e.g., using state
                alert("Email verification failed")
            } else {
                console.log("Email verified successfully!");
                // Redirect to a success page or dashboard.  Navigate is used for this
                // You would use useNavigate hook here if you want to redirect programmatically
                window.location.href = '/dashboard' // or use useNavigate if you want to stay in react router
            }
        });
    }, [token]); // Add token to the dependency array

    return (
        <div>
            {/* You can show a loading message or a verification status here */}
            <p>Verifying your email...</p>
            {/* Or redirect with Navigate component */}
            {/* <Navigate to="/dashboard" replace={true} /> */}
        </div>
    );
};