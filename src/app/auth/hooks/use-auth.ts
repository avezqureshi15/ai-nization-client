export const useAuth = () => {
  const isAuthenticated = Boolean(localStorage.getItem("token")) || true;
  return { isAuthenticated };
};