import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as apiDeleteBooking } from "../../services/apiBookings";

export function useDeletebooking() {
  const queryClient = useQueryClient();
  const { isLoading: isDeletingbooking, mutate: deleteBooking } = useMutation({
    mutationFn: apiDeleteBooking,
    onSuccess: () => {
      toast.success(`booking has successfully deleted`);
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isDeletingbooking, deleteBooking };
}
