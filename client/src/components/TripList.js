import React from "react";
import Trip from "./Trip"


function TripList({trips}){

    return (
        <div id="trip-list">
            <h1>Trip List</h1>
            <ul>
                {trips.map((trip) => {
                return <Trip
                key={trip.id}
                trip={trip}
                />
            })}
            </ul>
        </div>
    )
}
export default TripList;