
import { useState, useEffect } from "react";

// All hooks start with the word "use".
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortControl = new AbortController();
    setTimeout(() => {
      fetch(url, { signal: abortControl.signal })
        .then(res => {
          console.log(1);
          if (res.ok) return res.json();
          else throw Error("Could not fetch data");
        })
        .then(data => {
          console.log(2);
          setData(data);
          setIsLoading(false);
          setError(null);
        })
        .catch(err => {
          if (err.name === 'AbortError')
            console.log("Fetch aborted");
          else {
            setIsLoading(false);
            setError(err.message);
          }
        });
    }, 200);  // simulate loading, wait 500ms
    return () => abortControl.abort();
  }, [url]);  // empty dependency array
  return {data, isLoading, error};
}

export default useFetch;
