import React, { useState } from "react";


function SignupForm({onLogin}){
    const [form, setForm] = useState({
        username: '',
        password: '',
        bio:'',
        image_url:''
    })
    

    function handleChange(e){
        const { name, value } = e.target

        setForm({
            ...form,
            [name]: value
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        const signupInfo = {
            username: form.username,
            password: form.password,
            bio: form.bio,
            image_url: form.image_url
        }
        fetch('/signup', {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify(signupInfo)
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((user) => onLogin(user))
            }
            else {
                r.json().then((error) => alert(error.message))
            }
        })
        setForm({
            username: '',
            password: '',
            bio:'',
            image_url:''
        })
    }

    return (
        <form className='login-form' onSubmit={handleSubmit}>
            <h4>Username:</h4>
                <input
                    type='text'
                    placeholder="Username..."
                    name='username'
                    id='username'
                    autoComplete='off'
                    value={form.username}
                    onChange={handleChange}
                />
            <h4>Password:</h4>
                <input
                    type='password'
                    placeholder="Password..."
                    name='password'
                    id='password'
                    autoComplete='current-password'
                    value={form.password}
                    onChange={handleChange}
                />
            <h4>Bio:</h4>
                <input
                    type='text'
                    placeholder="Bio..."
                    name='bio'
                    id='bio'
                    autoComplete='off'
                    value={form.bio}
                    onChange={handleChange}
                />
            <h4>Image:</h4>
                <input
                    type='text'
                    placeholder="Image Url..."
                    name='image_url'
                    id='image-url'
                    autoComplete='off'
                    value={form.image_url}
                    onChange={handleChange}
                />
            <br></br>
            <button type="submit">Sign Up</button>
        </form>
    )
}

export default SignupForm;