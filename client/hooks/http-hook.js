import { useCallback } from 'react';

// ==============================================

const useHTTP = () => {
  const [is_loading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  // -an array of AbortController's
  const active_HTTP_requests = useRef([]);

  // --------------------------------------------

  const sendRequest = useCallback(
    async (endpoint, method = 'GET', body = null, headers = {}) => {
      setIsLoading(true);

      const http_abort_controller = new AbortController();
      active_HTTP_requests.current.push(http_abort_controller);

      try {
        // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#supplying_request_options
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}`,
          {
            method, // *GET, POST, PUT, DELETE, etc.
            body: body ? JSON.stringify(body) : null, // body data type must match "Content-Type" header
            // mode: 'cors', // no-cors, *cors, same-origin
            // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'same-origin', // include, *same-origin, omit
            // headers: {
            //   'Content-Type': 'application/json',
            //   // 'Content-Type': 'application/x-www-form-urlencoded',
            // },
            headers,
            // redirect: 'follow', // manual, *follow, error
            // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            signal: http_abort_controller.signal,
          }
        );

        const response_data = await response.json();

        active_HTTP_requests.current = active_HTTP_requests.current.filter(
          (req_controller) => req_controller !== http_abort_controller
        );

        if (!response.ok) {
          throw new Error(response_data.message);
        }

        setIsLoading(false);
        return response_data;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);

        // -sendRequest must be used in a
        //  try-catch block so that this
        //  thrown error can be caught
        //  up one level.
        throw err;
      }
    },
    []
  );

  // --------------------------------------------
};

// ==============================================

export { useHTTP };
