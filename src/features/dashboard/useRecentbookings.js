import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

export function useRecentbookings() {
  const [searchParams] = useSearchParams();
  const numdays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const querydate = subDays(new Date(), numdays).toISOString();

  const { data: recntbookings, isLoading } = useQuery({
    queryFn: () => getBookingsAfterDate(querydate),
    queryKey: ["recentbookings", numdays],
  });

  return { isLoading, recntbookings };
}
