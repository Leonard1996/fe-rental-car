import { createContext, useContext, useReducer } from 'react';

const init = {
  user: JSON.parse(localStorage.getItem('user')),
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  isGlobalSearchModalOpen: false
};

const AuthContext = createContext({ ...init, dispatch: () => {} });

export const ActionType = {
  LOGIN: 'login',
  LOGOUT: 'logout'
};

function reducer(state, action) {
  if (action.type === ActionType.LOGIN) {
    Object.keys(action.payload).forEach((key) => localStorage.setItem(key, JSON.stringify(action.payload[key])));

    return { ...state, ...action.payload };
  }
  if (action.type === ActionType.LOGOUT) {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    return { ...state, user: null, accessToken: null, refreshToken: null };
  }

  return state;
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, init);

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
