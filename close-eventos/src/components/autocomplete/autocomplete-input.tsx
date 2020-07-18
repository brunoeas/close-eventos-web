import React, { useEffect, useState } from 'react';
import TextField, { StandardTextFieldProps } from '@material-ui/core/TextField';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { generateUniqueRandomNumber } from './autocomplete-utils';
import { ReferenceObject } from 'popper.js';
import { InputProps } from '@material-ui/core/Input';

export interface AutoCompleteInputPropType extends StandardTextFieldProps {
  isOpen: boolean;
  openMenu: (cb?: () => void) => void;
  clearSelection: (cb?: () => void) => void;
  onChangeInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<any>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  onChangeIsOpen: (cb?: () => void) => void;
  style?: React.CSSProperties;
  value?: string;
  helperText?: string;
  setAnchorElement: (anchorElement: ReferenceObject | null) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
  InputProps?: Partial<InputProps>;
}

/**
 * Componente Input do AutoComplete
 *
 * @param {Object} props - props do componente
 * @returns Componente React com Input para o usuário
 */
function AutoCompleteInput(props: AutoCompleteInputPropType): JSX.Element {
  const {
    isOpen,
    openMenu,
    clearSelection,
    onChangeInput,
    onChange,
    disabled,
    onChangeIsOpen,
    style,
    helperText,
    setAnchorElement,
    onKeyDown,
    onFocus,
    InputProps,
    ...others
  } = props;

  const [idInput, setIdInput] = useState('');

  useEffect(() => {
    if (!idInput) {
      setIdInput(`autocomplete-input-${generateUniqueRandomNumber()}`);
    }
  }, [idInput]);

  return (
    <TextField
      {...others}
      id={idInput}
      helperText={isOpen ? undefined : helperText}
      style={{ width: '100%', ...style }}
      onKeyDown={onInputKeyDown}
      onChange={onChangeText}
      onFocus={onFocusInput}
      autoComplete='off'
      type='text'
      disabled={disabled}
      inputProps={{ 'aria-autocomplete': 'none', ...others.inputProps }}
      InputProps={{
        autoComplete: 'off',
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton
              disabled={disabled}
              onClick={() => {
                setAnchorElement(document.getElementById(idInput));
                onChangeIsOpen();
              }}
            >
              <ExpandMoreIcon style={{ transform: isOpen ? 'rotateX(180deg)' : '' }} />
            </IconButton>
          </InputAdornment>
        ),
        ...InputProps,
      }}
    />
  );

  /**
   * Faz com que quando uma tecla for pressionado no Input abra as sugestões
   * e execute a função onKeyDown, caso esteja declarada, para que o componente superior possa escutar
   *
   * @param {React.KeyboardEvent<HTMLInputElement>} e - Evento do Input
   */
  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    openMenu();
    onKeyDown && onKeyDown(e);
  }

  /**
   * Limpa seleção caso o Input esteja vazio e executa o onChangeInput, caso esteja declarado
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - Evento do Input
   */
  function onChangeText(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value === '') {
      clearSelection();
    }

    onChange && onChange(e);
    onChangeInput && onChangeInput(e);
  }

  /**
   * Setta o elemente de ancoragem para o card de sugestões
   * e executa o evento onFocus, caso esteja declarado, para o componente superior escutar
   *
   * @param {React.FocusEvent<HTMLInputElement>} e - Evento do Input
   */
  function onFocusInput(e: React.FocusEvent<HTMLInputElement>) {
    setAnchorElement(e.currentTarget);
    onFocus && onFocus(e);
  }
}

export default AutoCompleteInput;
