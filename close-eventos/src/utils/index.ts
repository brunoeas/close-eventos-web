/**
 * Método para retornar uma propriedade de um objeto, não importa o nível que ele esteja, por uma string com o caminho
 *
 * @template T - Tipo do item
 * @param {Object} item - Item que vai ser mapeado
 * @param {String} way - Caminho ate a prop desejada
 * @returns A prop desejada de acordo com o parâmetro da função
 */
function getObjectPropWithString<T = any>(item: T, way: string): any {
  if (!way) return item;
  const auxWay = way.split('.');

  let current: any = item;
  while (auxWay.length) {
    if (typeof current !== 'object') return undefined;
    current = current[auxWay.shift() || ''];
  }

  return current;
}

/**
 * Retorna o valor/key de um item/objeto
 *
 * @template T - Tipo do item/objeto
 * @template R - Tipo do valor/key
 * @param {T} item - Item/objeto com o valor/key
 * @param {(string | ((item: T, ...additionalArgs: any[]) => R))} getValueStringOrFunc - Função que retorna o valor/key do item/objeto ou string com o caminho para ele
 * @param {...any[]} getValueFuncArgs
 * @returns {R} O valor/key do item/objeto
 */
function getValueItem<T = object, R = any>(
  item: T,
  getValueStringOrFunc: string | ((item: T, ...additionalArgs: any[]) => R),
  ...getValueFuncArgs: any[]
): R {
  return typeof getValueStringOrFunc === 'function'
    ? getValueStringOrFunc(item, ...getValueFuncArgs)
    : getObjectPropWithString<T>(item, getValueStringOrFunc);
}

/**
 * Retorna a label de um item/objeto
 *
 * @template T - Tipo do item/objeto
 * @param {T} item - Item com a label
 * @param {(string | ((item: T, ...additionalArgs: any[]) => string))} getLabelStringOrFunc - Função que retorna a label do item ou string com o caminho para a label
 * @param {...any[]} getLabelFuncArgs - Parâmetros adicionais que serão passados junto com o item para a função que retorna a label do item
 * @returns {string} A label do item/objeto
 */
function getLabelItem<T = object>(
  item: T,
  getLabelStringOrFunc: string | ((item: T, ...additionalArgs: any[]) => string),
  ...getLabelFuncArgs: any[]
): string {
  return `${
    typeof getLabelStringOrFunc === 'function'
      ? getLabelStringOrFunc(item, ...getLabelFuncArgs)
      : getObjectPropWithString(item, getLabelStringOrFunc)
  }`;
}

/**
 * Converte um File para Base64
 *
 * @param {Blob} file - File que vai ser convertido
 * @returns {Promise<string>} Promise com o resultado da conversão
 */
async function fileToBase64(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (!reader.result || typeof reader.result !== 'string') {
        reject();
        return;
      }

      resolve(reader.result);
    };

    reader.readAsDataURL(file);
  });
}

export { getObjectPropWithString, getValueItem, getLabelItem, fileToBase64 };
