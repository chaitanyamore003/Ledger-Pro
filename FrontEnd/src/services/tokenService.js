let accessToken = null;

/**
 * Get current access token
 */
export const getAccessToken = () => {
  return accessToken;
};

/**
 * Save access token
 */
export const setAccessToken = (token) => {
  accessToken = token;
};

/**
 * Remove access token
 */
export const clearAccessToken = () => {
  accessToken = null;
};
