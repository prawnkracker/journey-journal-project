import React, { useState } from "react";


function SignupForm(){
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
            <h4>Bio:</h4>
                <input
                    type='text'
                    placeholder="Bio..."
                    id='bio'
                    autocomplete='off'
                    value={form.bio}
                    onChange={handleChange}
                />
            <h4>Image:</h4>
                <input
                    type='text'
                    placeholder="Image Url..."
                    id='image-url'
                    autocomplete='off'
                    value={form.image_url}
                    onChange={handleChange}
                />
            <button type="submit">Sign Up</button>
            <FormField>
                {errors.map((err) => {
                    <Error key={err}>{err}</Error>
                })}
            </FormField>
        </form>
    )
}