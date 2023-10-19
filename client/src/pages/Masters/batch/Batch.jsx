import React, { useEffect, useCallback, useRef } from "react";
import { useBatchStore } from "../../../zustand/stores/batchZustand"; // Update accordingly
import DataTable from "react-data-table-component";
import { reactTableStyles } from "../../../core/constants/styles"; // Update accordingly
import { confirmToast } from "../../../components/Toast"; // Update accordingly
import { useHandleErrors } from "../../../hooks/useHandleErrors"; // Update accordingly
import { AddBatchModal } from "./components/AddBatchModel";
import { UpdateBatchModel } from "./components/UpdateBatchModel";
import { SearchField } from "./components/Search"; // Update accordingly
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
    setSelectedBatch,
    selectedBatch,
    removeBatch,
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
  }, [getBatches]);

  const handleAddButtonClick = (row) => {
    showUpdateModal();
    setSelectedBatch(row);
  };

  const handleRemoveButtonClick = (row) => {
    confirmToast(() => removeBatch(row.auto_id));
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
      cell: (row) => new Date(row.start_date).toLocaleDateString("en-CA"),
    },
    {
      name: "End Date",
      cell: (row) => new Date(row.end_date).toLocaleDateString("en-CA"),
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
              className="btn btn-success btn-sm rounded-none text-white font-inter"
              onClick={() => handleAddButtonClick(row)}
            >
              Update
            </button>
            <button
              className="btn btn-error btn-sm rounded-none text-white font-inter"
              onClick={() => handleRemoveButtonClick(row)}
            >
              Remove
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <>
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
          <UpdateBatchModel
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
    </>
  );
}
