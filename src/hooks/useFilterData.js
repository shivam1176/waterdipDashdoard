import { useEffect, useState } from 'react';
import { parse } from 'date-fns';

const useFilterData = (data, dateRange) => {
  const [filteredData, setFilteredData] = useState([]);

  const getMonthIndex = (monthName) => {
    const date = parse(`${monthName} 1`, 'MMMM d', new Date());
    return date.getMonth();
  };

  useEffect(() => {
    if (data.length > 0) {
      const filtered = data.filter((booking) => {
        const bookingDate = new Date(
          booking.arrival_date_year,
          getMonthIndex(booking.arrival_date_month),
          booking.arrival_date_day_of_month
        );
        return bookingDate >= dateRange.startDate && bookingDate <= dateRange.endDate;
      });
      setFilteredData(filtered);
    }
  }, [dateRange, data]);

  return filteredData;
};

export default useFilterData;
