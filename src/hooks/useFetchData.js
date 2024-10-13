import { useState, useEffect } from 'react';

const useFetchData = () => {
  const [data, setData] = useState([]);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error loading JSON data:', error));
  }, []);

  return { data, dateRange, setDateRange };
};

export default useFetchData;
