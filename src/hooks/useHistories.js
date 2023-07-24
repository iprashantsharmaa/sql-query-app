import { useMemo } from 'react';
import { compareFn, uuid } from '../utils/helper';
import usePersistentState from './usePersistentState';

function useHistories() {
  const [historiesMap, setHistoriesMap] = usePersistentState({}, 'histories');

  const histories = useMemo(
    () => Object.values((historiesMap ?? {}))
      .sort((a, b) => compareFn(a.starred, b.starred)),
    [historiesMap],
  );

  const addHistory = (query) => {
    if (query) {
      const uid = uuid();
      const updatedHistoriesMap = {
        ...(historiesMap ?? {}),
        [uid]: {
          id: uid,
          query: query.trim(),
        },
      };
      setHistoriesMap(updatedHistoriesMap);
    }
  };

  const deleteHistory = (id) => {
    const updatedMap = { ...historiesMap };
    delete updatedMap[id];
    setHistoriesMap(updatedMap);
  };

  const starredHistory = (id) => {
    const updatedMap = {
      ...historiesMap,
      [id]: {
        ...historiesMap[id],
        starred: !historiesMap[id].starred,
      },
    };
    setHistoriesMap(updatedMap);
  };

  return {
    histories,
    addHistory,
    deleteHistory,
    starredHistory,
  };
}

export default useHistories;
