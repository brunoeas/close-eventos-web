import React from 'react';
import { KeyboardDatePicker, KeyboardDatePickerProps } from '@material-ui/pickers/DatePicker';
import DateUtils from '../../utils/date';
import moment from 'moment';
import MuiPickersUtilsProvider, {
  MuiPickersUtilsProviderProps,
} from '@material-ui/pickers/MuiPickersUtilsProvider';

export type DatePickerPropType = KeyboardDatePickerProps & {
  MuiPickersUtilsProviderProps?: MuiPickersUtilsProviderProps;
  errorText?: string;
};

/**
 * Componente DatePicker customizado
 *
 * @param {DatePickerPropType} props
 */
function DatePicker(props: DatePickerPropType): JSX.Element {
  const { errorText, error, helperText, style, MuiPickersUtilsProviderProps = {}, ...others } = props;

  return (
    <MuiPickersUtilsProvider
      libInstance={moment}
      utils={DateUtils}
      locale='pt-BR'
      {...MuiPickersUtilsProviderProps}
    >
      <KeyboardDatePicker
        variant='inline'
        color='primary'
        autoOk={true}
        format='DD/MM/YYYY'
        {...others}
        error={error}
        helperText={error ? errorText : helperText}
        style={{ width: '100%', ...style }}
      />
    </MuiPickersUtilsProvider>
  );
}

export default DatePicker;
