import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function CabinTableOperation() {
  return (
    <TableOperations>
      <Filter
        filtervalue="discount"
        option={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No Discount" },
          { value: "with-discount", label: "With Discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name [A-Z]" },
          { value: "name-desc", label: "Sort by name [Z-A]" },
          {
            value: "regularPrice-asc",
            label: "Sort by Price [Lowest-Highest]",
          },
          {
            value: "regularPrice-desc",
            label: "Sort by Price [Highest-Lowest]",
          },
          {
            value: "maxCapacity-asc",
            label: "Sort by Capacity [Lowest-Highest]",
          },
          {
            value: "maxCapacity-desc",
            label: "Sort by Capacity [Highest-Lowest]",
          },
          {
            value: "discount-asc",
            label: "Sort by Discount [Lowest-Highest]",
          },
          {
            value: "discount-desc",
            label: "Sort by Discount [Highest-Lowest]",
          },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperation;
