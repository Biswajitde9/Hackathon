import logo from './logo.svg';
import './App.css';

import { useState, useEffect, useRef } from 'react';
import Login from './components/Login';
import Profile from './components/Profile';

function App() {
  // Check if there is a user in localStorage on app start
  const storedUser = JSON.parse(localStorage.getItem('currentUser'));
  const [currentUser, setCurrentUser] = useState(storedUser);
  
  const handleLogin = (user) => {
    console.log(user);
    setCurrentUser(user);
   // Save user information in localStorage when the user logs in
   localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    // Remove user information from localStorage when the user logs out
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };


  return (
    <>
      {currentUser == null 
        ? <Login onLogin={handleLogin} />
        : <>
          <button onClick={handleLogout}>Logout</button>
          <Profile currentUser={currentUser}/>
        </>
      }
    </>
  );
}

export default App;
