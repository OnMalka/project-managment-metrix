export const setLoginDataOnSessionStorage = (loginData) => {
  sessionStorage.setItem("user-name", loginData.userName);
  sessionStorage.setItem("user-id", loginData.userId);
  sessionStorage.setItem("token", loginData.token);
};

export const deleteLoginDataFromSessionStorage = () => {
  sessionStorage.clear();
};

export const getLoginDataFromSessionStorage = () => {
  const loginData = {
    userName: sessionStorage.getItem("user-name") || null,
    userId: sessionStorage.getItem("user-id") || null,
    token: sessionStorage.getItem("token") || null,
  };
  for (const prop in loginData)
    if (prop === null) {
      deleteLoginDataFromSessionStorage();
      return null;
    }

  return loginData;
};

// export const getUserNameFromSessionStorage = () => {
//   const userName = sessionStorage.getItem("user-name");

//   return userName;
// };

// export const getUserIdFromSessionStorage = () => {
//   const userId = sessionStorage.getItem("user-id");
//   if (userId === undefined) return null;

//   return userId;
// };

// export const getTokenFromSessionStorage = () => {
//   const token = sessionStorage.getItem("token");
//   if (token === undefined) return null;

//   return token;
// };
