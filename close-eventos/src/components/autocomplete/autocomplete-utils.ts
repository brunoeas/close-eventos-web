/**
 * Retorna a referência do container do componente AutoComplete
 * ou uma <div> default caso o componente não tenha sido montado ainda
 *
 * @return Referência do elemento do componente ou um elemento <div> novo
 */
function getComponentAutoCompleteRef(): HTMLElement {
  return document.getElementById('container-autocomplete') || document.createElement('div');
}

const exists: boolean[] = [];
/**
 * Gera um número aleatório que nunca se repete
 *
 * @param {Number} [max=Number.MAX_SAFE_INTEGER] - Número máximo que ele pode gerar,
 * se não for passado nenhum valor ele assume o valor Number.MAX_SAFE_INTEGER
 * @returns Um número inteiro aleatório e único maior que 0
 */
function generateUniqueRandomNumber(max: number = Number.MAX_SAFE_INTEGER) {
  let randomNumber: number;

  do {
    randomNumber = Math.floor(Math.random() * max);
  } while (exists[randomNumber]);

  exists[randomNumber] = true;

  return randomNumber;
}

export { getComponentAutoCompleteRef, generateUniqueRandomNumber };
