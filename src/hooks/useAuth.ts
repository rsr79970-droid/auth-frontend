import { useMutation } from "@tanstack/react-query";
import {
  loginUser,
  verifyEmail,
  registerUser,
  logoutUser,
} from "@/services/auth.service";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};

export const useVerify = () => {
  return useMutation({
    mutationFn: verifyEmail,
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logoutUser,
  });
};
