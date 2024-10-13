import React, { useState, useEffect } from 'react';

const App = () => {
  const [data, setData] = useState([]); // Holds the original data
  
  // Fetch the JSON data
  useEffect(() => {
    fetch('/data.json') // Ensure the path is correct
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => console.error('Error loading JSON data:', error));
  }, []);



 
  return (
    <>
    </>
  );
};

export default App;
