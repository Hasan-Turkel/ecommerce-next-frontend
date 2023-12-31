import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  registerSuccess,
  logoutSuccess,
} from "../lib/features/authSlice";
import useAxios from "./useAxios";
import { toastErrorNotify, toastSuccessNotify, toastWarnNotify } from "@/helpers/ToastNotify";
const useAuthCalls = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { axiosSimple } = useAxios();
  const { axiosToken } = useAxios();

  const login = async (values:any) => {
    toastWarnNotify("Login performing")
    dispatch(fetchStart());
    try {
      const { data } = await axiosSimple.post(`users/auth/login`, values);
      dispatch(loginSuccess(data));
        toastSuccessNotify("Login performed.")
      router.push("/");
      // console.log(data);
    } catch (error:any) {
      // console.log(error);
      dispatch(fetchFail());
        toastErrorNotify(error.response.data.message)
    }
  };

  const register = async (values:any) => {
    toastWarnNotify("Register performing")
    dispatch(fetchStart());
    try {
      const { data } = await axiosSimple.post(`users/auth/register`, values);
      dispatch(registerSuccess(data));
        toastSuccessNotify("Register performed.")
      router.push("/");
      // console.log(data);
    } catch (error:any) {
      // console.log(error);
      dispatch(fetchFail());
        toastErrorNotify(error.response.data.message.includes("duplicate")&&"Register failed. Username or email already in use." || error.response.data.message)
    }
  };
  const logout = async () => {
    toastWarnNotify("Logout performing")
    dispatch(fetchStart());
    try {
      const { data } = await axiosToken.get(`users/auth/logout`);
      dispatch(logoutSuccess());
      router.push("/");
        toastSuccessNotify("Logout performed.")
    } catch (error) {
      // console.log(error.message);
      dispatch(fetchFail());
        toastErrorNotify("Logout failed.")
    }
  };

  return { login, register, logout };
};

export default useAuthCalls;
