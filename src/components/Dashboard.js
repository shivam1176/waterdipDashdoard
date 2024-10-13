import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import { format } from 'date-fns';
import VisitorPerDay from './VisitorPerDay';
import VisitorsPerCountryChart from './VisitorsPerCountryChart';
import AdultVisitorsSparkline from './AdultVisitorsSparkline';
import ChildrenVisitorsSparkline from './ChildrenVisitorsSparkline';

const Dashboard = ({ filteredData, dateRange, setDateRange }) => {
  const [openDate, setOpenDate] = useState(true);

  const handleClick = () => {
    setOpenDate((prev) => !prev);
  };

  return (
    <>
      <span onClick={handleClick} className="mx-auto shadow-md border">
        {`${format(dateRange.startDate, 'MMM dd, yyyy')} to ${format(dateRange.endDate, 'MMM dd, yyyy')}`}
      </span>
      {openDate && (
        <DateRangePicker
          ranges={[dateRange]}
          onChange={(ranges) => setDateRange(ranges.selection)}
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
          <div className="bg-white p-4 rounded-lg shadow">
            <AdultVisitorsSparkline type="adults" data={filteredData} />
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <ChildrenVisitorsSparkline type="children" data={filteredData} />
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
