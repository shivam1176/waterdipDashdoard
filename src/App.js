import React from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Dashboard from './components/Dashboard';
import useFetchData from './hooks/useFetchData';
import useFilterData from './hooks/useFilterData';

const App = () => {
  const { data, dateRange, setDateRange } = useFetchData();
  const filteredData = useFilterData(data, dateRange);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Hotel Booking Dashboard</h1>
        <Dashboard filteredData={filteredData} dateRange={dateRange} setDateRange={setDateRange} />
      </div>
    </div>
  );
};

export default App;
