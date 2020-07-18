import React from 'react';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import DateUtils from '../../utils/date';
import moment from 'moment';
import { MuiPickersUtilsProviderProps as MuiPickersUtilsProviderPropsType } from '@material-ui/pickers/MuiPickersUtilsProvider';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardTimePickerProps,
} from '@material-ui/pickers';

export type TimePickerPropType = KeyboardTimePickerProps & {
  MuiPickersUtilsProviderProps?: MuiPickersUtilsProviderPropsType;
  errorText?: string;
};

/**
 * Componente TimePicker customizado
 *
 * @param {TimePickerPropType} props
 */
function TimePicker(props: TimePickerPropType): JSX.Element {
  const {
    errorText,
    error,
    helperText,
    style,
    ampm = false,
    MuiPickersUtilsProviderProps = {},
    ...others
  } = props;

  return (
    <MuiPickersUtilsProvider
      libInstance={moment}
      utils={DateUtils}
      locale='pt-BR'
      {...MuiPickersUtilsProviderProps}
    >
      <KeyboardTimePicker
        autoOk={true}
        variant='inline'
        color='primary'
        keyboardIcon={<AccessTimeIcon />}
        {...others}
        ampm={ampm}
        error={error}
        helperText={error ? errorText : helperText}
        style={{ width: '100%', ...style }}
      />
    </MuiPickersUtilsProvider>
  );
}

export default TimePicker;
