import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import {
  loginUser,
  registerUser,
  checkMembership,
  logoutUser,
  loadUserFromStorage,
  clearError,
  setLoading,
  updateUser,
} from "@/store/slices/authSlice";
import { UserRegistrationData } from "@/types/auth";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  const login = (userData: { user: any; token: string }) => {
    return dispatch(loginUser(userData));
  };

  const register = (userData: UserRegistrationData) => {
    return dispatch(registerUser(userData));
  };

  const checkUserMembership = (userId: number) => {
    return dispatch(checkMembership(userId));
  };

  const logout = () => {
    return dispatch(logoutUser());
  };

  const loadUser = () => {
    return dispatch(loadUserFromStorage());
  };

  const clearAuthError = () => {
    dispatch(clearError());
  };

  const setAuthLoading = (loading: boolean) => {
    dispatch(setLoading(loading));
  };

  const updateUserData = (userData: Partial<typeof auth.user>) => {
    dispatch(updateUser(userData));
  };

  return {
    ...auth,
    login,
    register,
    checkUserMembership,
    logout,
    loadUser,
    clearAuthError,
    setAuthLoading,
    updateUserData,
  };
};
