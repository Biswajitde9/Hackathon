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
    <div className="container mt-4">
      <div className="row">
        <div className="col-12 col-sm-4" >
          <ul className="list-unstyled">
            {media_url.map((url, index) => (
              <li key={index}>
                <img src={url}  style={{maxHeight:"280px",maxWidth:"250px",objectFit:"contain"}} alt={`Media ${index + 1}`} className="img-fluid" />
              </li>
            ))}
          </ul>
        </div>
        <div className="col-12 col-sm-8">
          <h2>{name}</h2>
          <p>From {new Date(start_date).toLocaleDateString()} to {new Date(end_date).toLocaleDateString()}</p>
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
          {status === 3 &&
            <div>
              Rating: {rating} <br />
              Attendees: {attendees}
            </div>
          }
          <div>
            {/* Assuming keys are "facebook", "instagram", and "twitter" */}
            <a href={social.facebook}><button className="btn btn-primary me-2">Facebook</button></a>
            <a href={social.twitter}><button className="btn btn-info me-2">Twitter</button></a>
            <a href={social.instagram}><button className="btn btn-danger">Instagram</button></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
