import React from 'react';
import withStyles from 'withStyles';
import timesFn from 'lodash/times';
import addMonths from 'date-fns/add_months';
import Icon from 'components/Icon';

import CalendarView from '../CalendarView';
import styles from './styles.scss';

const Calendar = ({
  selectedDate = new Date(),
  offsetMonth = 0, numberOfViews = 2,
  onSelectDate, onClickPrev, onClickNext,
}) => (
  <div className={styles.calendar}>
    <div className={styles.header}>
      <div className={styles.header__prev} onClick={onClickPrev}><Icon name="arrow-left" /></div>
      <div className={styles.header__title} />
      <div className={styles.header__next} onClick={onClickNext}><Icon name="arrow-right" /></div>
    </div>
    <div className={styles.main}>
      { timesFn(numberOfViews).map((i, idx) => (
        <div className={styles.main__view} key={idx}>
          <CalendarView
            selectedMonth={addMonths(selectedDate, idx + offsetMonth)}
            onSelectDate={date => onSelectDate(date, idx)}
            selectedDate={selectedDate}
          />
        </div>
      ))}
    </div>
  </div>
);

export default withStyles(styles)(Calendar);
