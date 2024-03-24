import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { auth } from '../firebase/firebaseConfig';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((usr) => {
      setUser(usr);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut().then(() => {
      // Redirect to login page after logout
      window.location.href = "/"
    }).catch((error) => {
      console.error('Logout error:', error);
    });
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome to Accuknox</h2>
      <div className="user-info">
        {user ? (
          <div>
            <p>Hello, {user.displayName || user.email}</p>
            <p>Email: {user.email}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <p onClick={() => { window.location.href = "/" }}>Login to View Details</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
