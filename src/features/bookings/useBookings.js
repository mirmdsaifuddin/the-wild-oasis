import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constant";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const querClient = useQueryClient();

  //Filter
  const filtervalue = searchParams.get("status");
  const filter =
    !filtervalue || filtervalue === "all"
      ? null
      : { field: "status", value: filtervalue, method: "eq" };

  //Sort By
  const sortRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortRaw.split("-");
  const sortBy = { field, direction };

  //pagination
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const {
    data: { data: bookings, count } = {},
    error,
    isLoading,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, currentPage],
    queryFn: () => getBookings(filter, sortBy, currentPage),
  });

  //prefetching
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (currentPage < pageCount)
    querClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, currentPage + 1],
      queryFn: () => getBookings(filter, sortBy, currentPage + 1),
    });
  if (currentPage > 1)
    querClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, currentPage - 1],
      queryFn: () => getBookings(filter, sortBy, currentPage - 1),
    });
  return { bookings, error, isLoading, count };
}
