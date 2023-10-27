import React, { useEffect, useCallback, useRef } from "react";
import { useBatchStore } from "../../../zustand/stores/batches-zustand";
import DataTable from "react-data-table-component";
import { reactTableStyles } from "../../../core/constants/styles";
import { useHandleErrors } from "../../../hooks/useHandleErrors";
import { AddBatchModal } from "./components/AddBatchModel";
import { UpdateBatchModal } from "./components/UpdateBatchModel";
import { SearchField } from "./components/Search";
import { formatDate } from "../../../helpers/commonHelpers";
import { ThreeCircles } from "react-loader-spinner";
import AnimatedComponent from "../../../components/AnimatedComponent";
import Card from "../../../components/Card";

export function Batches() {
  const addBatchModalRef = useRef(null);
  const updateBatchModalRef = useRef(null);

  const showAddModal = () => {
    addBatchModalRef.current.showModal();
  };

  const showUpdateModal = () => {
    updateBatchModalRef.current.showModal();
  };

  const {
    loading,
    statusMessage,
    hasErrors,
    getBatches,
    addBatch,
    updateBatch,
    filter,
    filteredBatchData,
    selectedBatch,
    loadCourseData,
    setSelectedBatch,
  } = useBatchStore(); // Update accordingly

  useHandleErrors(hasErrors, statusMessage);

  const handleFilter = useCallback(
    (event) => {
      filter(event.target.value);
    },
    [filter]
  );

  useEffect(() => {
    getBatches();
    loadCourseData();
  }, [getBatches, loadCourseData]);

  const handleUpdateButtonClick = (row) => {
    showUpdateModal();
    setSelectedBatch(row);
  };

  const batchColumns = [
    {
      name: "Batch No",
      cell: (row) => row.batch_no,
    },
    {
      name: "Batch Name",
      cell: (row) => row.batch_name,
    },
    {
      name: "Zoom Link",
      cell: (row) => row.zoom_link.substring(1, 20),
    },
    {
      name: "Start Date",
      cell: (row) => formatDate(row.start_date),
    },
    {
      name: "End Date",
      cell: (row) => formatDate(row.end_date),
    },
    {
      name: "Status",
      cell: (row) => row.status,
    },
    {
      name: "Password",
      cell: (row) => row.password,
    },
    {
      name: "Price",
      cell: (row) => row.price,
    },
    {
      name: "Actions",
      cell: function (row) {
        return (
          <div>
            <button
              className="btn btn-primary btn-sm rounded-none text-white font-inter"
              onClick={() => handleUpdateButtonClick(row)}
            >
              Update
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      {loading === true ? (
        <div className="w-screen h-[90vh] flex items-center justify-center">
          <ThreeCircles
            height="100"
            width="100"
            color="#570DF8"
            visible={true}
            ariaLabel="three-circles-rotating"
          />
        </div>
      ) : (
        <AnimatedComponent>
          <Card title="MANAGE BATCHES">
            <div className="font-inter">
              <button
                className="btn btn-primary rounded-none text-white mt-4 max-w-xs font-inter mb-1"
                type="submit"
                onClick={() => showAddModal()}
              >
                Add new batch
              </button>

              <AddBatchModal
                addBatch={addBatch}
                loading={loading}
                addBatchModalRef={addBatchModalRef}
              />
              <UpdateBatchModal
                updateBatch={updateBatch}
                loading={loading}
                selectedBatch={selectedBatch}
                updateBatchModalRef={updateBatchModalRef}
              />

              <SearchField handleFilter={handleFilter} />

              <div className="table-border">
                <DataTable
                  columns={batchColumns}
                  data={filteredBatchData}
                  progressPending={loading}
                  pagination
                  customStyles={reactTableStyles}
                />
              </div>
            </div>
          </Card>
        </AnimatedComponent>
      )}
    </>
  );
}
