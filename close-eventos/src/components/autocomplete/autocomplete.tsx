import React, { useEffect, useState, InputHTMLAttributes } from 'react';
import Downshift, { ControllerStateAndHelpers } from 'downshift';
import AutoCompleteSuggestions from './autocomplete-suggestions';
import AutoCompleteInput from './autocomplete-input';
import { generateUniqueRandomNumber } from './autocomplete-utils';
import { ReferenceObject } from 'popper.js';
import { getLabelItem } from '../../utils';
import { PaperProps, PopperProps } from '@material-ui/core';

export type AutoCompletePropType<T> = {
  suggestions: T[];
  getLabel: string | ((item: T) => string);
  getValue: string | ((item: T) => any);
  value?: T;
  onBlur?: (event: React.FocusEvent<any>) => void;
  onChangeValue?: (selectedItem: T | null, stateAndHelpers: ControllerStateAndHelpers<T | null>) => void;
  onChangeInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  name?: string;
  disabled?: boolean;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  error?: boolean;
  errorText?: string;
  helperText?: string;
  style?: React.CSSProperties;
  styleInput?: React.CSSProperties;
  styleSuggestions?: React.CSSProperties;
  limitSuggestions?: number;
  containerDivProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  rootDivProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  PaperSuggestionsProps?: PaperProps;
  PopperSuggestionsProps?: PopperProps;
};

/**
 * Parte principal do componente Autocomplete
 *
 * @template T - Tipo do objeto de sugestão e do valor
 * @param {AutoCompletePropType<T>} props
 */
function AutoComplete<T>(props: AutoCompletePropType<T>): JSX.Element {
  const {
    suggestions,
    getLabel,
    getValue,
    onChangeValue,
    onChangeInput,
    onBlur,
    disabled = false,
    label,
    name,
    value,
    inputProps = {},
    error = false,
    errorText,
    helperText,
    style,
    styleInput,
    styleSuggestions,
    limitSuggestions,
    containerDivProps,
    rootDivProps,
    PaperSuggestionsProps,
    PopperSuggestionsProps,
  } = props;

  const [idToAnchor, setIdToAnchor] = useState('');

  useEffect(() => {
    if (!idToAnchor) {
      setIdToAnchor(`autocomplete-popper-${generateUniqueRandomNumber()}`);
    }
  }, [idToAnchor]);

  const [anchorElement, setAnchorElement] = useState<ReferenceObject | null>(null);

  return (
    <div {...rootDivProps} style={{ paddingTop: 0.1 }}>
      <Downshift<T | null>
        id='autocomplete-main'
        itemToString={(item) => (item ? getLabelItem<T>(item, getLabel) : '')}
        onChange={onChangeValue}
        initialSelectedItem={value ? value : undefined}
      >
        {({ getInputProps, getItemProps, inputValue, isOpen, clearSelection, openMenu, closeMenu }) => (
          <div {...containerDivProps} style={style} id='container-autocomplete'>
            <AutoCompleteInput
              {...getInputProps()}
              {...inputProps}
              color='primary'
              size={undefined}
              onBlur={(e) => {
                if (!isOpen) return;
                onBlur && onBlur(e);
                const inputProps = getInputProps();
                inputProps.onBlur && inputProps.onBlur(e);
              }}
              onChangeInput={onChangeInput}
              error={error}
              helperText={error ? errorText : helperText}
              label={label}
              name={name}
              value={inputValue ?? ''}
              isOpen={isOpen}
              onChangeIsOpen={isOpen ? closeMenu : openMenu}
              openMenu={openMenu}
              clearSelection={clearSelection}
              disabled={disabled}
              style={styleInput}
              setAnchorElement={setAnchorElement}
              aria-describedby={idToAnchor}
            />

            <AutoCompleteSuggestions<T>
              getItemProps={getItemProps}
              suggestions={suggestions}
              isOpen={isOpen}
              getLabel={getLabel}
              getValue={getValue}
              inputValue={inputValue || ''}
              customStyles={styleSuggestions}
              limitSuggestions={limitSuggestions}
              id={idToAnchor}
              anchorElement={anchorElement}
              PaperSuggestionsProps={PaperSuggestionsProps}
              PopperSuggestionsProps={PopperSuggestionsProps}
            />
          </div>
        )}
      </Downshift>
    </div>
  );
}

export default AutoComplete;
