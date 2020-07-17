import { useRef, useEffect } from 'react';

/**
 * Hook customizado para executar um callback apenas uma vez, quando o componente for montado
 *
 * @param {() => any} callback - Callback que vai ser executado
 */
export function useComponentDidMount(callback: () => any) {
  const ref = useRef(callback);
  useEffect(ref.current, []);
}

/**
 * Hook customizado para executar um callback apenas uma vez, quando o componente for desmontado
 *
 * @param {() => any} callback - Callback que vai ser executado
 */
export function useComponentDidUnmount(callback: () => any) {
  const ref = useRef(callback);
  useEffect(() => ref.current, []);
}
