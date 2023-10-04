import React from "react"

function Trip({trip}){
    const {destination, approximate_cost, description, trip_image_url} = trip
    return (
        <div className="trip-card">
            <h1>{destination}</h1>
            <img src={trip_image_url} alt='Picture of destination'/>
            <h2>${approximate_cost}</h2>
            <p><b>Description:</b> {description}</p>
        </div>
    )
}

export default Trip;