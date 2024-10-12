import { useCallback, useEffect, useState } from "react";

export function useServiceHook(callback, direct = true) {
  const [loading, setLoading] = useState(direct);
  const [data, setData] = useState();

  const fetcher = useCallback(async () => {
    setLoading(true);
    try {
      const res = await callback();
      setData(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [callback]);

  useEffect(() => {
    if (direct) fetcher();
  }, []);

  return [data, loading, fetcher];
}
