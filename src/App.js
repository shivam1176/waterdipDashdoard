import React, { useState, useEffect } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { format, parse } from 'date-fns';

const App = () => {
  const [data, setData] = useState([]); // Holds the original data

  const [openDate, setOpenDate] = useState(true); // For showing date range picker
  const [dateRange, setDateRange] = useState({
    startDate: new Date(), // Start date for range
    endDate: new Date(), // End date for range
    key: 'selection',
  });

  function handleClick() {
    setOpenDate((prev) => !prev);
  }

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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Hotel Booking Dashboard</h1>
        <span onClick={handleClick} className="mx-auto shadow-md border">
          {`${format(dateRange.startDate, 'MMM dd, yyyy')} to ${format(dateRange.endDate, 'MMM dd, yyyy')}`}
        </span>
        {openDate && (
          <DateRangePicker
            ranges={[dateRange]}
            onChange={(ranges) => setDateRange(ranges.selection)} // Update date range on change
          />
        )}
      </div>
    </div>
  );
};

export default App;
