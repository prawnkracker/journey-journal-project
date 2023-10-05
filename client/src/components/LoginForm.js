import React, {useState} from "react";

function LoginForm(){
    const [form, setForm] = useState({
        username: '',
        password: ''
    })
    const [errors, setErrors] = useState([])

    function handleChange(e){
        const { name, value } = e.target

        setForm({
            ...form,
            [name]: value
        })
    }

    function handleSubmit(e){
        e.preventDefault();
       const loginInfo = {
            username: form.username,
            password: form.password
       }
        fetch('/login', {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify(loginInfo)
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((user) => onLogin(user))
            }
            else {
                r.json().then((error) => setErrors(error))
            }
        })

    }

    return (
        <form onSubmit={handleSubmit}>
                <h4>Username:</h4>
                <input
                    type='text'
                    placeholder="Username..."
                    id='username'
                    autocomplete='off'
                    value={form.username}
                    onChange={handleChange}
                />
            <h4>Password:</h4>
                <input
                    type='password'
                    placeholder="Password..."
                    id='password'
                    autocomplete='current-password'
                    value={form.password}
                    onChange={handleChange}
                />
            <button type='submit'>Login</button>
            <FormField>
                {errors.map((err) => (
                    <Error key={err}>{err}</Error>
                ))}
            </FormField>
        </form>
    );
}

export default LoginForm;