import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login as apiLogin } from "../../services/apiLogin";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isLoading: isLoadingLogin } = useMutation({
    mutationFn: ({ email, password }) => apiLogin({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      toast.success("Loged In Successfully");
      navigate("/dashboard", { replace: true });
    },
    onError: () => {
      toast.error("Log in credentials are not matching");
    },
  });
  return { login, isLoadingLogin };
}
