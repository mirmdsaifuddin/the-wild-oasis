import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signup as apisignup } from "../../services/apiLogin";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: apisignup,
    onSuccess: (user) => {
      console.log(user);
      toast.success("user has been created successfully");
    },
    onError: (err) => {
      toast.error(err.message || "Signup failed");
    },
  });
  return { signup, isLoading };
}
