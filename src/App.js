import React, { useState, useEffect } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { format, parse } from 'date-fns';
import VisitorPerDay from './components/VisitorPerDay';
import VisitorsPerCountryChart from './components/VisitorsPerCountryChart';
const App = () => {
  const [data, setData] = useState([]); // Holds the original data
  const [filteredData, setFilteredData] = useState([]); // Holds the filtered data
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
        setFilteredData(data); // Show all data initially
        console.log(filteredData);
      })
      .catch(error => console.error('Error loading JSON data:', error));
  }, []);

  // Helper function to convert month name to month index (0-11)
  const getMonthIndex = (monthName) => {
    const date = parse(`${monthName} 1`, 'MMMM d', new Date());
    return date.getMonth(); // Returns 0 for January, 1 for February, and so on.
  };

  // Filter data based on the selected date range
  useEffect(() => {
    if (data.length > 0) {
      const filtered = data.filter(booking => {
        const bookingDate = new Date(
          booking.arrival_date_year, // Year from the data
          getMonthIndex(booking.arrival_date_month), // Convert month name to index
          booking.arrival_date_day_of_month // Day from the data
        );
        
        return (
          bookingDate >= dateRange.startDate && bookingDate <= dateRange.endDate
        );
      });
      setFilteredData(filtered);
      console.log(filtered);
    }
  }, [dateRange, data]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Hotel Booking Dashboard</h1>

        {/* Date Range Picker */}
        <span onClick={handleClick} className="mx-auto shadow-md border">
          {`${format(dateRange.startDate, 'MMM dd, yyyy')} to ${format(dateRange.endDate, 'MMM dd, yyyy')}`}
        </span>
        {openDate && (
          <DateRangePicker
            ranges={[dateRange]}
            onChange={(ranges) => setDateRange(ranges.selection)} // Update date range on change
          />
        )}

        
        {filteredData.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg shadow">
              <VisitorPerDay data={filteredData} />
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <VisitorsPerCountryChart data={filteredData} />
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default App;
