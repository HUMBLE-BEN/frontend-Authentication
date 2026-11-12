const BASE_URL = import.meta.env.VITE_WEEKENDCLASS7_URL?.replace(/\/+$/, '');

export const post = async (path, body) => {
  if (!BASE_URL) {
    return {
      success: false,
      status: 0,
      message: 'API URL is missing. Set VITE_WEEKENDCLASS7_URL in your .env file.',
      data: null,
    };
  }

  const endpoint = `${BASE_URL}/${path.replace(/^\/+/, '')}`;
  let response;

  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error('[client] network error', error.message);
    return {
      success: false,
      status: 0,
      message: "Can't reach the server. Check your connection and try again.",
      data: null,
    };
  }

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    // The server may return an empty or non-JSON response.
  }

  if (!response.ok) {
    return {
      success: false,
      status: response.status,
      message: payload?.message || 'Something went wrong, please try again.',
      data: null,
    };
  }

  if (payload === null) {
    return {
      success: false,
      status: response.status,
      message: 'Unexpected response from the server.',
      data: null,
    };
  }

  return {
    success: true,
    status: response.status,
    message: payload.message || 'Success',
    data: payload,
  };
};
