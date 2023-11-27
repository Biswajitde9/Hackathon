import React, { useState, useEffect } from 'react'
import Event from './Event'

//Import fireStore reference from frebaseInit file
import {db} from "../firebase-init";

//Import all the required functions from fireStore
import { collection, getDocs, where, query} from "firebase/firestore"; 

const Profile = ({ currentUser }) => {
  const [events, setEvents] = useState();
  const [selfEvents, setSelfEvents] = useState();

  // Fetch events data from the "Events" collection based on the "attended" array
  const fetchEventsData = async (eventIDs) => {
    const eventsData = [];

    // Loop through each event reference in the "attended" array
    for (const eventId of eventIDs) {
      try {
        // Create a query to find events based on the "attended" array
        const eventsCollection = collection(db, 'Events');
        const q = query(eventsCollection, where('uid', '==', currentUser.uid));
    
        // Execute the query
        const querySnapshot = await getDocs(q);
    
        // Loop through the query results and add event data to eventsData array
        querySnapshot.forEach((doc) => {
          eventsData.push(doc.data());
        });
    
        return eventsData;
      } catch (error) {
        console.error('Error fetching events data:', error);
        // Handle error
        return eventsData; // Return an empty array or handle error as needed
      }
    }

    return eventsData;
  };

  useEffect(() => {
    // Call the function to fetch attended events data
    fetchEventsData(currentUser.attended).then((eventsData) => {
      console.log('Fetched attended events data:', eventsData);
      setEvents(eventsData)
    });
    
    // Fetch self managed events data
    fetchEventsData(currentUser.events).then((eventsData) => {
      console.log('Fetched managed events data:', eventsData);
      setSelfEvents(eventsData)
    });
  }, [])

  return (
    <div>
      <h2>Welcome, {currentUser.name}!</h2>
      <h3>Events Managing</h3>
      <div>
        {events &&
          events.map((event, index) => (
            <Event key={index} event={event} />
          ))
        }
      </div>
      <h3>Events Attending</h3>
      <div>
        {events &&
          events.map((event, index) => (
            <Event key={index} event={event} />
          ))
        }
      </div>
    </div>
  )
}

export default Profile