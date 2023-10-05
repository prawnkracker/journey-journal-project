import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function SignupLogin({onLogin}){
    const [login, setLogin] = useState(true)

    return (
        <div>
            {login ? 
            (<div>
            <LoginForm onLogin={onLogin}/>
            <p>No account? Sign up for one.</p>
            <button onClick={() => setLogin(false)}>Sign up</button>
            </div>)
        : 
            (<div>
            <SignupForm onLogin={onLogin}/>
            <p>Already have an account? Login.</p>
            <button onClick={() => setLogin(true)}>Sign in</button>
            </div>
            )}
        </div>
    )
}

export default SignupLogin;