export const loginDataInitialState = {
  loginName: null,
  loginId: null,
  token: null,
};

const loginReducer = (loginData, action) => {
  switch (action.type) {
    case "LOGIN": {
      return { ...action.loginData };
    }
    case "LOGOUT": {
      return { ...loginDataInitialState };
    }
    case "UPDATE_LOGIN_DATA": {
      return { ...loginData, ...action.newLoginData };
    }
    case "UPDATE_TOKEN": {
      return { ...loginData, token: action.token };
    }
    default: {
      return loginData;
    }
  }
};

export default loginReducer;
