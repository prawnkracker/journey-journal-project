import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function SignupLogin({onLogin}){
    const [login, setLogin] = useState(true)

    return (
        <>
            {login ? 
            (<div>
                <LoginForm onLogin={onLogin}/>
                <div className="login">
                <p>No account? Sign up for one.</p>
                <button onClick={() => setLogin(false)}>Sign up</button>
                </div>
            </div>)
        : 
            (<div>
                <SignupForm onLogin={onLogin}/>
                <div className="login">
                <p>Already have an account? Login.</p>
                <button onClick={() => setLogin(true)}>Sign in</button>
                </div>
            </div>
            )}
        </>
    )
}

export default SignupLogin;