import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, recentstays, cabins, numdays }) {
  //1 number of bookings
  const numBookings = bookings.length;

  //2.total sales
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  //3.total check ins
  const checkins = recentstays.length;

  //4.occupancy rate
  const occupancy =
    recentstays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (cabins * numdays);

  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title="Bookings"
        value={numBookings}
        color="blue"
      ></Stat>
      <Stat
        icon={<HiOutlineBanknotes />}
        title="sales"
        value={formatCurrency(sales)}
        color="green"
      ></Stat>
      <Stat
        icon={<HiOutlineCalendarDays />}
        title="check ins"
        value={checkins}
        color="indigo"
      ></Stat>
      <Stat
        icon={<HiOutlineChartBar />}
        title="occupancy rate"
        value={Math.round(occupancy * 100) + "%"}
        color="yellow"
      ></Stat>
    </>
  );
}

export default Stats;
