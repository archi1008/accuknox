import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Signup.css';
import { auth } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const Signup = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !email.includes('@')) {
      setError("Please Enter Valid Email");
      setLoading(false);
      return;
    }
    if (!password) {
      setError("Please Enter Password");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    if(!firstName || firstName === ''){
      setError("Please Enter First Name");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user,{displayName:`${firstName} ${lastName}`});
      
      dispatch({
        type: 'SIGNUP_USER',
        payload: {
          uid: userCredential.user.uid,
          email,
          displayName: `${firstName} ${lastName}`
        }
      });
    } catch (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    window.location.href="/dashboard";
    
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
         <div>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div>
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label htmlFor="showPassword">Show Password</label>
        </div>
        {error && <span style={{ color: 'red' }}>{error}</span>}
        {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      )}
        <button type="submit" disabled={loading}>Sign Up</button>
        <span onClick={()=>{window.location.href="/"}}>Already an User? Login Instead</span>
      </form>
    </div>
  );
};

export default Signup;
