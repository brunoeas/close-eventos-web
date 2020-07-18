import React, { useEffect, useState, useCallback } from 'react';
import { Paper, MenuItem, PaperProps } from '@material-ui/core';
import { getComponentAutoCompleteRef } from './autocomplete-utils';
import Popper, { PopperPlacementType, PopperProps } from '@material-ui/core/Popper';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import BoldIncludedWord from './bold-included-word';
import deburr from 'lodash/deburr';
import { GetItemPropsOptions } from 'downshift';
import { ReferenceObject } from 'popper.js';
import { getValueItem, getLabelItem } from '../../utils';

export type AutoCompleteSuggestionsPropType<T> = {
  suggestions: T[];
  getItemProps: (options: GetItemPropsOptions<any>) => any;
  isOpen: boolean;
  getLabel: string | ((item: T) => string);
  getValue: string | ((item: T) => any);
  inputValue: string;
  customStyles?: React.CSSProperties;
  limitSuggestions?: number;
  anchorElement: ReferenceObject | null;
  id: string;
  PaperSuggestionsProps?: PaperProps;
  PopperSuggestionsProps?: PopperProps;
};

/**
 * Componente para listagem e escolha de sugestões
 *
 * @template T - Tipo do objeto de sugestão
 * @param {AutoCompleteSuggestionsPropType<T>} props
 */
function AutoCompleteSuggestions<T>(props: AutoCompleteSuggestionsPropType<T>): JSX.Element {
  const {
    suggestions,
    getItemProps,
    isOpen,
    getLabel,
    getValue,
    inputValue,
    customStyles,
    limitSuggestions,
    anchorElement,
    id,
    PaperSuggestionsProps,
    PopperSuggestionsProps,
  } = props;

  const inputPositions = getComponentAutoCompleteRef().getBoundingClientRect();
  const bodyPositions = document.body.getBoundingClientRect();

  /**
   * Valida se o Input está abaixo da metade da altura da tela
   *
   * @returns está abaixo = true; está acima = false;
   */
  const inputIsInBottom = useCallback(
    () => inputPositions.y + inputPositions.height >= bodyPositions.height / 2,
    [bodyPositions.height, inputPositions.height, inputPositions.y]
  );

  /**
   * @returns Estilos dinâmicos de acordo com a posição do componente
   */
  const getDynamicStyles = useCallback(
    () => ({
      container: {
        width: inputPositions.width,
        zIndex: 9999,
        ...customStyles,
      },
      paper: {
        minWidth: inputPositions.width / 2,
        maxWidth: bodyPositions.width - inputPositions.left,
        maxHeight:
          (inputIsInBottom()
            ? inputPositions.y
            : bodyPositions.height - inputPositions.y - inputPositions.height) - 25,
      },
    }),
    [
      bodyPositions.height,
      bodyPositions.width,
      customStyles,
      inputIsInBottom,
      inputPositions.height,
      inputPositions.left,
      inputPositions.width,
      inputPositions.y,
    ]
  );

  const [styles, setStyles] = useState(getDynamicStyles());
  useEffect(() => setStyles(getDynamicStyles()), [getDynamicStyles, inputPositions.y]);

  useScrollPosition(() => {
    if (inputYPositionIsChanged()) {
      setStyles(getDynamicStyles());
    }
  });

  /**
   * Sugestões filtradas pelas que o label da sugestão tem o valor do input
   * ou nenhuma se o valor do input for inválido.
   * E "recorta" a lista caso tenha um limite
   */
  const sugestoesFiltradas = suggestions
    .filter(
      (sugestao) =>
        !inputValue ||
        deburr(getLabelItem<T>(sugestao, getLabel))
          .toUpperCase()
          .includes(deburr(inputValue).toUpperCase())
    )
    .slice(0, limitSuggestions || suggestions.length);

  return (
    <Popper
      {...PopperSuggestionsProps}
      id={id}
      open={isOpen}
      placement={getPopperPlacement()}
      anchorEl={anchorElement}
      style={styles.container}
      modifiers={{
        flip: { enabled: true },
        preventOverflow: { enabled: true, boundariesElement: 'scrollParent' },
      }}
    >
      <Paper {...PaperSuggestionsProps} style={{ ...styles.paper, overflowY: 'auto', marginRight: 5 }}>
        {sugestoesFiltradas.map((sugestao, index) => (
          <MenuItem
            key={index}
            {...getItemProps({ key: getValueItem(sugestao, getValue), index, item: sugestao })}
          >
            <BoldIncludedWord value={inputValue}>{getLabelItem<T>(sugestao, getLabel)}</BoldIncludedWord>
          </MenuItem>
        ))}
      </Paper>
    </Popper>
  );

  /**
   * @returns {PopperPlacementType} Posição do Popper de acordo com a posição do Input
   */
  function getPopperPlacement(): PopperPlacementType {
    return inputIsInBottom() ? 'top-start' : 'bottom-start';
  }

  /**
   * Valida se a posicionamento vertical (Y) do Input na tela mudou (em caso de telas com scroll)
   *
   * @returns Se mudou = true; Se não mudou = false;
   */
  function inputYPositionIsChanged() {
    return inputPositions.y !== getComponentAutoCompleteRef().getBoundingClientRect().y;
  }
}

export default AutoCompleteSuggestions;
