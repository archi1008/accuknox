// Login.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import './Login.css';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!email || !email.includes('@')) { setError("Please Enter Valid Email"); return;}
    if(!password) {setError("Please Enter Password"); return;}
    try {
        setLoading(true);
        const userCredential = await signInWithEmailAndPassword(auth,email, password);
        console.log("userCredential ",userCredential )
      dispatch({
        type: 'LOGIN_USER',
        payload: {
          uid: userCredential.user.uid,
          email :userCredential.user.email ,
          displayName: userCredential.user.displayName
        }
      });
      } catch (error) {
        setError("Please Check the entered Details. Either email or password is incorrect");
        setLoading(false);
        return;
      }
  
      setLoading(false);
      window.location.href="/dashboard";
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
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
        <button type="submit">Login</button>
        <span onClick={()=>{window.location.href="/signup"}}>New User? SignUp Instead</span>
      </form>
    </div>
  );
};

export default Login;
