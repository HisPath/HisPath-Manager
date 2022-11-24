export const logout = () => {
  localStorage.removeItem("TOKEN");
  window.location.reload();
};
