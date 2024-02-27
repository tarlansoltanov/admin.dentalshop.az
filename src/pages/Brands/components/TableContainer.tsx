import { useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";

// Reactstrap
import { Row, Col, Card, CardBody, Button } from "reactstrap";

// React Table
import { createColumnHelper } from "@tanstack/react-table";

// Components
import DataTable from "@/components/DataTable";
import * as Fields from "@/components/DataTable/Fields";
import * as Filters from "@/components/DataTable/Filters";
import { usePagination, useSorting, useColumnFiltering } from "@/components/DataTable/Hooks";

// Types
import { Brand } from "@/types";

// Actions
import { getBrands } from "@/store/actions";

interface Props {
  onCreate?: () => void;
  onUpdate?: (data: Brand) => void;
  onDelete?: (data: Brand) => void;
}

const TableContainer = ({ onCreate, onUpdate, onDelete }: Props) => {
  // Pagination
  const { page, limit, pagination, onPaginationChange } = usePagination();

  // Sorting
  const { ordering, sorting, onSortingChange } = useSorting();

  // Column Filtering
  const { filters, columnFilters, onColumnFiltersChange } = useColumnFiltering();

  // Table data
  const dispatch = useDispatch<AppDispatch>();
  const { update, items, status, count } = useSelector((state: RootState) => state.brand);

  const fetchItems = () => {
    dispatch(getBrands({ ...filters, page, limit, ordering }));
  };

  useEffect(() => {
    fetchItems();
  }, [columnFilters, pagination, sorting]);

  useEffect(() => {
    if (update) fetchItems();
  }, [update]);

  // Columns
  const columnHelper = createColumnHelper<Brand>();

  const columns = [
    columnHelper.display({
      header: "#",
      enableSorting: false,
      cell: (cell) => {
        return <Fields.IndexField cell={cell} />;
      },
    }),
    columnHelper.accessor("photo", {
      header: "Logo",
      enableColumnFilter: false,
      cell: (cell) => {
        return (
          <Fields.ImageField url={cell.getValue()} style={{ margin: "2px", width: "100px" }} />
        );
      },
    }),
    columnHelper.accessor("name", {
      header: "Ad",
      cell: (cell) => {
        return <Fields.TextField text={cell.getValue()} />;
      },
      meta: {
        filterComponent: (column) => <Filters.TextFilter column={column} />,
      },
    }),
    columnHelper.accessor("is_main", {
      header: "Əsas",
      cell: (cell) => {
        return <Fields.BooleanField value={cell.getValue()} />;
      },
      meta: {
        filterComponent: (column) => (
          <Filters.SelectFilter
            column={column}
            options={[
              { label: "Bəli", value: "true" },
              { label: "Xeyr", value: "false" },
            ]}
          />
        ),
      },
    }),
    columnHelper.display({
      header: "Əməliyyatlar",
      enableSorting: false,
      cell: (cell) => {
        return (
          <div className="d-flex gap-3">
            {onUpdate && <Fields.EditButton onClick={() => onUpdate(cell.row.original as Brand)} />}
            {onDelete && (
              <Fields.DeleteButton onClick={() => onDelete(cell.row.original as Brand)} />
            )}
          </div>
        );
      },
    }),
  ];

  return (
    <Row>
      <Col xs="12">
        <Card>
          <CardBody>
            <DataTable
              data={items || []}
              columns={columns}
              controls={
                <Button color="primary" className="mb-2 me-2" onClick={onCreate}>
                  <i className={`mdi mdi-plus-circle-outline me-1`} />
                  Əlavə et
                </Button>
              }
              loading={status.loading && status.lastAction === getBrands.typePrefix}
              // Pagination
              pagination={pagination}
              onPaginationChange={onPaginationChange}
              pageCount={Math.ceil(count / limit)}
              // Sorting
              sorting={sorting}
              onSortingChange={onSortingChange}
              // Filtering
              columnFilters={columnFilters}
              onColumnFiltersChange={onColumnFiltersChange}
            />
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default TableContainer;
