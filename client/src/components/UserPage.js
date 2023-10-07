import React, { useState, useEffect } from "react";
import Review from "./Review";
import { useHistory } from "react-router-dom";

function UserPage({currentUser, trips}){
    const [reviews, setReviews] = useState([])
    const [showUserEdit, setShowUserEdit] = useState('none')
    const [user, setUser] = useState(currentUser)
    const [form, setForm] = useState({
        bio:user.bio,
        image_url:user.image_url,
    })
    const history = useHistory()
    
    useEffect(() => {
        fetch(`/${user.id}/reviews`)
        .then((r) => r.json())
        .then((reviews) => setReviews(reviews))

    }, [])

    function handleChange(e){
        const {name, value} = e.target

        setForm({
            ...form,
            [name]:value
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        const userInfo={
            bio:form.bio,
            image_url:form.bio
        }
        fetch(`/user/${user.id}`, {
            method:"PATCH",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(userInfo)
        })
        .then((r) => r.json())
        .then((data) => setUser(data))

        setForm({
            bio:user.bio,
            image_url:user.image_url
        })
        setShowUserEdit('none')
    }

    function handleDeleteClick(){
        fetch(`/user/${user.id}`, {
            method:"DELETE"
        })
        .then(() => alert('User successfully deleted.'))
        
        fetch('/logout', {method: "DELETE"})
        .then((r)=> {
            if (r.ok){
                setUser(null)
            }
        })
        .then(() => history.push('/'))
    }

    return (
        <div className="user-card">
        <img src={`${user.image_url}`} alt="User avatar"/>
        <h1>{user.username}</h1>
        <p><b>Bio:</b> {user.bio}</p>
        <button onClick={() => setShowUserEdit('block')}>Edit User Info</button>
        <button onClick={handleDeleteClick}>Delete User</button>
        <form onSubmit={handleSubmit} style={{display:showUserEdit}}>
            <h4>New Bio:</h4>
            <input 
                type="text"
                name="bio"
                id="bio"
                autoComplete="off"
                value={form.bio}
                onChange={handleChange}
            />
            <h4>New Image:</h4>
            <input 
                type="text"
                name="image_url"
                id="image_url"
                autoComplete="off"
                value={form.image_url}
                onChange={handleChange}
            />
            <button type="submit">Update User</button>
            <button onClick={() => setShowUserEdit('none')}>Close</button>
        </form>
        <h2>Reviews:</h2>
        {reviews.map((review) => {
            return (
            <Review
            key={review.id}
            reviewData={review}
            currentUser={user}
            trips={trips}
            />
        )})}
        </div>
    )
}

export default UserPage