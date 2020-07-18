import React from 'react';
import deburr from 'lodash/deburr';

export type BoldIncludedWordPropType = { children: string; value: string };

/**
 * Converte um termo e uma pesquisa para um JSX com o termo e a parte da pesquisa no termo em negrito
 *
 * @param {BoldIncludedWordPropType} props
 * @returns Componente React com a pesquisa em destaque no termo
 */
function BoldIncludedWord(props: BoldIncludedWordPropType): JSX.Element {
  const { children, value } = props;

  if (!value || deburr(children).toUpperCase() === deburr(value).toUpperCase()) {
    return <div>{children}</div>;
  }

  const indexOfIncludedWord = deburr(children).toUpperCase().indexOf(deburr(value).toUpperCase());
  const lastIndexOfIncludedWord = indexOfIncludedWord + value.length;

  const firstWord = children.slice(0, indexOfIncludedWord);
  const includedWord = children.slice(indexOfIncludedWord, lastIndexOfIncludedWord);
  const lastWord = children.slice(lastIndexOfIncludedWord, children.length);

  return (
    <div>
      {firstWord}
      <b>{includedWord}</b>
      {lastWord}
    </div>
  );
}

export default BoldIncludedWord;
