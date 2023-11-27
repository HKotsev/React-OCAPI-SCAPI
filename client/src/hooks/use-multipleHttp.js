import { useCallback } from "react";
import { useState } from "react";

const useMultipleHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const requestHandler = useCallback(async function (requestConfigs) {
    setIsLoading(true);
    setError(null);
    try {
      const responses = await Promise.all(
        requestConfigs.map(async (requestConfig) => {
          const response = await fetch(requestConfig.url, {
            method: requestConfig.method ? requestConfig.method : "GET",
            headers: requestConfig.headers ? requestConfig.headers : {},
            body: requestConfig.body
              ? JSON.stringify(requestConfig.body)
              : null,
          });

          if (!response.ok) {
            const errorResponse = await response.json();
            const errorMessage = errorResponse.message;
            throw new Error(errorMessage);
          }

          return response.json();
        })
      );

      setIsLoading(false);
      return responses;
    } catch (err) {
      setError(err.message || "Something went wrong!");
      setIsLoading(false);
      throw err;
    }
  }, []);

  return { isLoading: isLoading, error: error, requestHandler: requestHandler };
};

export default useMultipleHttp;
