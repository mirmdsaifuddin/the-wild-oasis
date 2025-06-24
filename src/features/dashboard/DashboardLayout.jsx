import styled from "styled-components";
import { useRecentbookings } from "./useRecentbookings";
import SpinnerMini from "../../ui/SpinnerMini";
import { useRecentstays } from "./useRecentstays";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
function DashboardLayout() {
  const { isLoading: isbookingLoading, recntbookings } = useRecentbookings();
  const { isLoading: isStaysLoading, recentstays, numdays } = useRecentstays();
  const { cabins, isLoading } = useCabins();

  if (isbookingLoading || isStaysLoading || isLoading) return <SpinnerMini />;
  // console.log(recntbookings);
  // console.log(recentstays);
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={recntbookings}
        recentstays={recentstays}
        numdays={numdays}
        cabins={cabins.length}
      />
      <TodayActivity />
      <DurationChart recentstays={recentstays} />
      <SalesChart recntbookings={recntbookings} numdays={numdays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
