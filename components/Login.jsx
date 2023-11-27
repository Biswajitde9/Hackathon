import {useState, useEffect, useRef} from 'react';

//Import fireStore reference from frebaseInit file
import {db} from "../firebase-init";

//Import all the required functions from fireStore
import { collection, getDocs, where, query} from "firebase/firestore"; 

const Login = ({onLogin}) => {
  const [formData, setFormData] = useState({
    name: '',
    password: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if user with provided username and password exists in the "Users" collection
      const usersCollection = collection(db, 'Users');
      const q = query(usersCollection, where('name', '==', formData.name), where('password', '==', formData.password));
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot)

      if (querySnapshot.size === 1) {
        // Successfully found a user with the provided username and password
        const userData = querySnapshot.docs[0].data();
        setError(null);
        onLogin(userData);
      } else {
        // No user found with the provided username and password
        let e = 'Invalid username or password. Please try again.';
        setError(e);
        //alert(e);
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Handle error
      //alert(error);
      setError('Error during login. Please try again.' + error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        {error && <span style={{color:"red"}}>{error}</span>}
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login