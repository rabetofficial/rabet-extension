import React, { useState } from 'react';
import DatePicker from 'popup/components/common/DatePicker';

const TestPage = () => {
  const [startDate, setStartDate] = useState(new Date());

  const onchange = (e: Date) => {
    setStartDate(e);
  };

  return (
    <div>
      <DatePicker value={startDate} onChange={onchange} />
    </div>
  );
};

export default TestPage;
