import React from 'react';
import omitFn from 'lodash/omit';
import withStyles from 'withStyles';
import classnames from 'classnames';
import { ErrorMessages } from 'react-nebo15-validate';
import format from 'date-fns/format';
import Calendar from './Calendar';
import styles from './styles.scss';

@withStyles(styles)
export default class DateField extends React.Component {
  static defaultProps = {
    closeOnSelect: true,
  };
  constructor(props) {
    super(props);
    this.onClickNext = this.onClickNext.bind(this);
    this.onClickPrev = this.onClickPrev.bind(this);
    this.onSelectDate = this.onSelectDate.bind(this);
    this.state = {
      offsetMonth: 0,
    };
  }
  onClickNext() {
    this.setState({
      offsetMonth: this.state.offsetMonth + 1,
    });
  }
  onClickPrev() {
    this.setState({
      offsetMonth: this.state.offsetMonth - 1,
    });
  }
  onSelectDate(date, idxOfView) {
    this.setState({
      offsetMonth: -1 * idxOfView,
    });
    return this.props.closeOnSelect ?
      this.props.input.onBlur(date) :
      this.props.input.onChange(date);
  }
  render() {
    const {
      input, meta, // redux-form
      labelText, // label props
      type, max, min, pattern, minLength, maxLength, placeholder, // input props
      errorMessages, dateFormat = 'DD.MM.YYYY HH:mm',
    } = this.props;

    return (
      <div
        className={classnames(
          styles.dateField,
          meta.error && styles.dateField_errored,
          meta.active && styles.dateField_focused
        )}
      >
        {labelText && <div className={styles.label}>{labelText}</div>}
        <div className={styles.calendarWrap}>
          <Calendar
            onSelectDate={this.onSelectDate}
            selectedDate={input.value}
            onClickNext={this.onClickNext}
            onClickPrev={this.onClickPrev}
            offsetMonth={this.state.offsetMonth}
          />
        </div>
        <div className={styles.control}>
          <input
            {...{
              type,
              max,
              min,
              pattern,
              minLength,
              maxLength,
              placeholder,
              ...omitFn(input, ['onBlur']),
              value: input.value && format(input.value, dateFormat),
              readOnly: true,
            }}
            className={styles.input}
          />
        </div>
        <div className={styles.error}><ErrorMessages error={meta.error}>
          {errorMessages}
        </ErrorMessages></div>
      </div>
    );
  }
}
