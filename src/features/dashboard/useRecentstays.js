import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

export function useRecentstays() {
  const [searchParams] = useSearchParams();
  const numdays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const querydate = subDays(new Date(), numdays).toISOString();

  const { data: recentstays, isLoading } = useQuery({
    queryFn: () => getStaysAfterDate(querydate),
    queryKey: ["recentstays", numdays],
  });
  const confirmed_stays = recentstays?.filter(
    (stays) => stays.status === "checked-in" || stays.status === "checked-out"
  );

  return { isLoading, recentstays, confirmed_stays, numdays };
}
