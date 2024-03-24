// Dashboard.js
import React from 'react';
import './Dashboard.css';
import { auth } from '../firebase/firebaseConfig';

const Dashboard = () => {

  console.log(auth.currentUser)
  return (
    <div className="dashboard-container">
      <h2>Welcome to Accuknox</h2>
      
    </div>
  );
};

export default Dashboard;
