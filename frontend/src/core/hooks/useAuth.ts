import { useSelector, useDispatch } from 'react-redux';
import { type RootState, type AppDispatch } from '../data/redux/store';
import { login, logout, getCurrentUser } from '../data/redux/authSlice';
import { type LoginRequest } from '../services/authService';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const loginUser = (credentials: LoginRequest) => {
    return dispatch(login(credentials));
  };

  const logoutUser = () => {
    return dispatch(logout());
  };

  const fetchCurrentUser = () => {
    return dispatch(getCurrentUser());
  };

  return {
    user,
    token,
    loading,
    error,
    loginUser,
    logoutUser,
    fetchCurrentUser,
    isAuthenticated: !!token,
  };
};
