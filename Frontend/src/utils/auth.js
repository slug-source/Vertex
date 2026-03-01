export const getToken = () => localStorage.getItem("token");
export const getRole = () => localStorage.getItem("user");

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
}