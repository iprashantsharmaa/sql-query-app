import {
  useState,
  useEffect,
} from 'react';
import { isNil } from '../utils/helper';

function usePersistentState(defaultValue, key) {
  const _value = localStorage.getItem(key);
  const [value, dispatcher] = useState(
    !isNil(_value)
      ? JSON.parse(_value)
      : defaultValue,
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value ?? defaultValue));
  }, [key, value, defaultValue]);

  return [value, dispatcher];
}

export default usePersistentState;
