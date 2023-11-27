import React from 'react';

const Event = ({ event }) => {
  const {
    name,
    desc,
    start_date,
    end_date,
    address,
    location,
    media_url,
    post_event,
    attendees,
    rating,
    social,
    status,
  } = event;

  const statusTextArray = ['PLANNED', 'DELAYED', 'STARTED', 'ENDED', 'CANCELLED'];
  const statusText = statusTextArray[status] || 'UNKNOWN';

  return (
    <div>
      <h2>{name}</h2>
      <div style={{display:"flex",flexDirection:"row"}}>
      <div>
        <ul style={{display:"flex", listStyle:"none"}}>
          {media_url.map((url, index) => (
            <li key={index}>
              <img src={url} alt={`Media ${index + 1}`} style={{ maxWidth: '100px', maxHeight: '100px' }} />
            </li>
          ))}
        </ul>
      </div>
      <div>
      <p>From {new Date(start_date.toDate()).toLocaleDateString()} to {new Date(end_date.toDate()).toLocaleDateString()}</p>
      <p>{desc}</p>
      <p>
        Address: {address}
      </p>
      <p>
        Location: Latitude: {location[0]}, Longitude: {location[1]}
      </p>
      <p>
        Status: {statusText}
      </p>
      <div>
        Social Links:
          {/* Assuming keys are "facebook", "instagram", and "twitter" */}
          <a href={social.facebook}><button>Facebook</button></a>
          <a href={social.twitter}><button>Twitter</button></a>
          <a href={social.instagram}><button>Instagram</button></a>
      </div>
      {status!=3 && 
        <div>
          Rating: {rating} <br/>
          Attendees: {attendees}
        </div>
      }
      </div>
    </div>
    </div>
  );
};

export default Event;
