import React from 'react';
import classnames from 'classnames';
import withStyles from 'withStyles';
import startOfMonth from 'date-fns/start_of_month';
import endOfMonth from 'date-fns/end_of_month';
import addDays from 'date-fns/add_days';
import getDate from 'date-fns/get_date';
import startOfWeek from 'date-fns/start_of_week';
import isSameDay from 'date-fns/is_same_day';

import chunkFn from 'lodash/chunk';

import styles from './styles.scss';

const CalendarView = ({
  weekDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  startWeekDay = 0,
  selectedMonth = new Date(),
  selectedDate, onSelectDate,
}) => {
  if (startWeekDay > 6 && startWeekDay < 0) throw new Error('startWeekDay must be in out of range [0..6]');
  const weekDayNamesShifted =
    weekDayNames.slice(startWeekDay)
    .concat(weekDayNames.slice(0, startWeekDay));

  const startOfTheSelectedMonth = startOfMonth(selectedMonth);
  const endOfTheSelectedMonth = endOfMonth(selectedMonth);
  const viewStartDate = startOfWeek(startOfTheSelectedMonth, { weekStartsOn: startWeekDay });

  let currentDate = viewStartDate;
  const dates = [];
  while (currentDate < endOfTheSelectedMonth || dates.length % 7) {
    dates.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }
  const chunkedDates = chunkFn(dates, 7);

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>
        {monthNames[selectedMonth.getMonth()]}, {selectedMonth.getFullYear()}
      </div>
      <table className={styles.view}>
        <thead className={styles.header}>
          <tr>
            { weekDayNamesShifted.map((name, idx) => <th key={idx}>{name}</th>)}
          </tr>
        </thead>
        <tbody className={styles.main}>
          { chunkedDates.map((week, idx) => (
            <tr key={idx}>
              { week.map((day, idx) => (
                <td key={idx}><div
                  onClick={() => onSelectDate(day)}
                  className={classnames(
                    styles.day,
                    ((day < startOfTheSelectedMonth) ||
                    (day > endOfTheSelectedMonth)) && styles.day_outOfRange,
                    isSameDay(selectedDate, day) && styles.day_selected
                  )}
                >{getDate(day)}</div></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default withStyles(styles)(CalendarView);
