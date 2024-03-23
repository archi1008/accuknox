import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import './Signup.css';
import { SignupSuccess } from '../store/actions/actions';

const Signup = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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

    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message);
      return;
    }

    setLoading(false);
    window.location.href="/dashboard";
    dispatch(SignupSuccess(email,password));
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
