import React, { ChangeEvent, ReactNode } from 'react';
import FormControl, { FormControlProps } from '@material-ui/core/FormControl';
import MaterialUISelect, { SelectProps } from '@material-ui/core/Select';
import MenuItem, { MenuItemProps } from '@material-ui/core/MenuItem';
import InputLabel, { InputLabelProps } from '@material-ui/core/InputLabel';
import FormHelperText, { FormHelperTextProps } from '@material-ui/core/FormHelperText';
import { getLabelItem, getValueItem } from '../../utils';

/**
 * Modelo do tipo das Props do componente Select
 *
 * @extends {SelectProps}
 * @template T - Tipo dos dados que vão ser listados como opções
 * @template V - Tipo do valor do Select
 */
export interface SelectPropType<T, V = T | null> extends SelectProps {
  options: T[];
  value?: V | null;
  /** @deprecated use onChangeValue */
  onChange?: (
    event: ChangeEvent<{
      name?: string;
      value: unknown;
    }>,
    child: ReactNode
  ) => void;
  /**
   * Função para manipular o evento de mudança de valor do Select
   */
  onChangeValue?: (
    value: T,
    event: ChangeEvent<{
      name?: string;
      value: any;
    }>,
    child: ReactNode
  ) => void;
  /**
   * Função que vai ser usada para extrair o value.
   * Normalmente esta prop é usada quando as opções e o valor são objetos
   */
  valueExtractor?: (value: null | any) => V | null;
  /**
   * Função ou caminho até a prop em string que será usada para extrair a label de cada opção
   */
  getOptionLabel: string | ((item: T, index: number) => string);
  /**
   * Função ou caminho até a prop em string que será usada para extrair o valor de cada opção
   */
  getOptionValue: string | ((item: T, index: number) => any);
  /**
   * Função que será usada para validar se a opção deve ser desabilitada ou não
   */
  disableOptionIf?: (option: T, index: number) => boolean;
  label?: string;
  LabelProps?: InputLabelProps;
  OptionProps?: MenuItemProps;
  FormControlProps?: FormControlProps;
  HelperTextProps?: FormHelperTextProps;
  ErrorTextProps?: FormHelperTextProps;
  helperText?: string | JSX.Element;
  errorText?: string | JSX.Element;
}

/**
 * Componente Select/Combobox customizado
 *
 * @template T - Tipo das opções do Select
 * @template V - Tipo do valor do Select
 * @param {SelectPropType<T, V>} props
 */
function Select<T, V = T | null>(props: SelectPropType<T, V>): JSX.Element {
  const {
    name = `select-${Math.random() * 9999999999}`,
    label,
    value = '',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onChange,
    onChangeValue,
    valueExtractor = (item) => (item === undefined || item === null ? '' : item),
    options,
    getOptionLabel,
    getOptionValue,
    helperText = '',
    errorText = '',
    error = false,
    LabelProps,
    FormControlProps,
    HelperTextProps,
    ErrorTextProps,
    OptionProps = {},
    disableOptionIf = () => false,
    ...others
  } = props;

  return (
    <FormControl error={error} color='primary' style={{ width: '100%' }} {...FormControlProps}>
      {label && (
        <InputLabel error={error} color='primary' htmlFor={`id-${name}-input`} {...LabelProps}>
          {label}
        </InputLabel>
      )}

      <MaterialUISelect
        id={`id-${name}`}
        name={name}
        error={error}
        SelectDisplayProps={{ style: { backgroundColor: 'transparent' } }}
        color='primary'
        {...others}
        inputProps={{ name, id: `id-${name}-input`, ...others.inputProps }}
        value={valueExtractor(value)}
        onChange={(e, child) => {
          const selected = getValueToReturn(e.target.value);
          if (!selected) return;
          e.target.value = valueExtractor(e.target.value);
          onChangeValue && onChangeValue(selected, e, child);
        }}
      >
        {options.map((option, i) => {
          const optionDisabled = disableOptionIf(option, i);
          return (
            <MenuItem
              value={getValueItem<T>(option, getOptionValue, i)}
              disabled={optionDisabled}
              key={i}
              color='primary'
              {...OptionProps}
              style={{
                outline: 'none',
                cursor: optionDisabled ? 'default' : 'pointer',
                ...OptionProps.style,
              }}
              button={true}
            >
              {getLabelItem<T>(option, getOptionLabel, i)}
            </MenuItem>
          );
        })}
      </MaterialUISelect>

      {(() => {
        if (error && errorText) {
          return (
            <FormHelperText color='primary' {...ErrorTextProps}>
              {errorText}
            </FormHelperText>
          );
        }

        if (helperText) {
          return (
            <FormHelperText color='primary' {...HelperTextProps}>
              {helperText}
            </FormHelperText>
          );
        }

        return <></>;
      })()}
    </FormControl>
  );

  /**
   * Usa o valor passado por parâmetro para retornar a opção equivalente
   *
   * @param {*} valueExtracted - Valor extraído para comparar
   * @returns {(T | null)} Opção equivalente com o parâmetro
   */
  function getValueToReturn(valueExtracted: any): T | null {
    let itemSelected: T | null = null;
    const selected = options.find((item, i) => {
      if (disableOptionIf(item, i)) return false;

      itemSelected = item;
      const itemExtracted = getValueItem<T>(item, getOptionValue, i);
      return JSON.stringify(itemExtracted) === JSON.stringify(valueExtracted);
    });

    if (selected === undefined) return null;

    return itemSelected;
  }
}

export default Select;
