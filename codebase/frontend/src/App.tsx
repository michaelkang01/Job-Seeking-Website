import React from 'react';
import { useEffect, useState } from 'react';
import "tailwindcss/tailwind.css"
import axios from 'axios';
import JobListings from './pages/JobListings'


const App = () => {
  

  return (
    <div>
      <JobListings></JobListings>
    </div>

  );
}

export default App;
