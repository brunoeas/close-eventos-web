import React from 'react';
import MaterialUITextField, { TextFieldProps } from '@material-ui/core/TextField';

/**
 * Componente TextField customizado
 *
 * @param {TextFieldProps} props
 */
function TextField(props: TextFieldProps): JSX.Element {
  const { type, onChange, style, inputProps, ...others } = props;

  return (
    <MaterialUITextField
      autoComplete='off'
      color='primary'
      {...others}
      style={{ width: '100%', ...style }}
      inputProps={{ autoComplete: 'off', ...inputProps }}
      type={type === 'number' || !type ? 'text' : type}
      onChange={(e) => {
        if (type === 'number' && !isNaN(+e.target.value)) {
          e.target.value = (e.target.value ?? '').replace(/(e|E| +)/g, '');
          onChange && onChange(e);
        } else if (type !== 'number') {
          onChange && onChange(e);
        }
      }}
    />
  );
}

export default TextField;
