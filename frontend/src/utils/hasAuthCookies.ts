const hasAuthCookies = () => {
  return document.cookie.includes('access_token=')
      || document.cookie.includes('refresh_token=');
};
export default hasAuthCookies;