import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: ;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  //console.log(cabins);
  const [searchParam] = useSearchParams();
  if (isLoading) return <Spinner />;

  //Filter
  const filteredVal = searchParam.get("discount") || "all";
  let filteredCabin;
  if (filteredVal === "all") filteredCabin = cabins;
  if (filteredVal === "no-discount")
    filteredCabin = cabins.filter((cabin) => cabin.discount <= 0);
  if (filteredVal === "with-discount")
    filteredCabin = cabins.filter((cabin) => cabin.discount > 0);

  //sort By
  const sortBy = searchParam.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabin.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div>Image</div>
          <div>cabin</div>
          <div>Capacity</div>
          <div>price</div>
          <div>discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          // data={cabins}
          // data={filteredCabin}
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        ></Table.Body>
      </Table>
    </Menus>
  );
}
export default CabinTable;
