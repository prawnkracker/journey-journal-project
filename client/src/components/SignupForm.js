import React, { useState } from "react";


function SignupForm({onLogin}){
    const [form, setForm] = useState({
        username: '',
        password: '',
        bio:'',
        image_url:''
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
                r.json().then((error) => setErrors(error))
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
        <form onSubmit={handleSubmit}>
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
            <button type="submit">Sign Up</button>
            <div>
                {errors.map((err) => {
                    <alert key={err}>{err}</alert>
                })}
            </div>
        </form>
    )
}

export default SignupForm;