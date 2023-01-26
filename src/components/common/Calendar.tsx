import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import cal_left_arrow_icon from '../../assets/cal_left_arrow_icon.svg';
import cal_right_arrow_icon from '../../assets/cal_right_arrow_icon.svg';

export default function Calendar({
  startDate,
  setStartDate,
}: {
  startDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
}) {
  return (
    <DatePicker
      inline
      minDate={new Date()}
      selected={startDate}
      onChange={(date: Date) => {
        setStartDate(date);
      }}
      formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 1)}
      renderCustomHeader={({ monthDate, decreaseMonth, increaseMonth }) => (
        <div>
          <button
            aria-label="Previous Month"
            className={'react-datepicker__navigation react-datepicker__navigation--previous'}
            onClick={decreaseMonth}
          >
            <img src={cal_left_arrow_icon} />
          </button>
          <span className="react-datepicker__current-month">
            {monthDate.toLocaleString('ko', {
              month: 'short',
              year: 'numeric',
            })}
          </span>
          <button
            aria-label="Next Month"
            className={'react-datepicker__navigation react-datepicker__navigation--next'}
            onClick={increaseMonth}
          >
            <img src={cal_right_arrow_icon} />
          </button>
        </div>
      )}
    />
  );
}
