import React from "react"
import { Link } from "react-router-dom"

function Trip({trip}){
    const {id, destination, approximate_cost, description, trip_image_url} = trip

    
    return (
        <div className="trip-card">
            <h1>{trip.id}. {destination}</h1>
            <img src={trip_image_url} alt='Destination'/>
            <h2>${approximate_cost}</h2>
            <p><b>Description:</b> {description}</p>
            <Link to={`/tripreviews/${id}`}>
                <button>See more</button>
            </Link>
        </div>
    )
}

export default Trip;