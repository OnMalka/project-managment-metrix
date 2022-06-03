export const loginAction = (loginData) => ({
  type: "LOGIN",
  loginData,
});

export const logoutAction = () => ({
  type: "LOGOUT",
});

export const updateLoginDataAction = (newLoginData) => ({
  type: "UPDATE_LOGIN_DATA",
  newLoginData,
});

export const updateTokenAction = (token) => ({
  type: "UPDATE_TOKEN",
  token,
});
