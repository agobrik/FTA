import { useState, useEffect, useCallback } from 'react';

/**
 * Async operation hook
 *
 * Kullanım:
 * const { execute, loading, error, data } = useAsync(fetchPlayers);
 *
 * useEffect(() => {
 *   execute();
 * }, []);
 */
export const useAsync = (asyncFunction) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = useCallback(async (...params) => {
    setLoading(true);
    setError(null);

    try {
      const result = await asyncFunction(...params);
      setData(result);
      return result;
    } catch (err) {
      setError(err.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [asyncFunction]);

  return { execute, loading, error, data };
};

export default useAsync;
