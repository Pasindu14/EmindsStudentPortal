import React, { useEffect, useCallback, useRef } from "react";
import { useJobStore } from "../../../zustand/stores/jobZustand"; // Adjusted to useJobStore
import DataTable from "react-data-table-component";
import { reactTableStyles } from "../../../core/constants/styles";
import { useHandleErrors } from "../../../hooks/useHandleErrors";
import { AddJobModal } from "./components/AddJobModel"; // Adjusted to AddJobModal
import { UpdateJobModal } from "./components/UpdateJobModel"; // Adjusted to UpdateJobModal
import { SearchField } from "./components/Search";
import Card from "../../../components/Card";

export function Jobs() {
  // Adjusted to Jobs
  const addJobModalRef = useRef(null); // Adjusted to addJobModalRef
  const updateJobModalRef = useRef(null); // Adjusted to updateJobModalRef

  const showAddModal = () => {
    addJobModalRef.current.showModal(); // Adjusted to addJobModalRef
  };

  const showUpdateModal = () => {
    updateJobModalRef.current.showModal(); // Adjusted to updateJobModalRef
  };

  const {
    loading,
    statusMessage,
    hasErrors,
    getJobs, // Adjusted to getJobs
    addJob, // Adjusted to addJob
    updateJob, // Adjusted to updateJob
    filter,
    filteredJobData, // Adjusted to filteredJobData
    setSelectedJob, // Adjusted to setSelectedJob
    selectedJob, // Adjusted to selectedJob
  } = useJobStore(); // Adjusted to useJobStore

  useHandleErrors(hasErrors, statusMessage);

  const handleFilter = useCallback(
    (event) => {
      filter(event.target.value);
    },
    [filter]
  );

  useEffect(() => {
    getJobs(); // Adjusted to getJobs
  }, [getJobs]); // Adjusted to getJobs

  const handleUpdateButtonClick = (row) => {
    showUpdateModal();
    setSelectedJob(row); // Adjusted to setSelectedJob
  };

  const jobColumns = [
    // Adjusted to jobColumns
    {
      name: "Job Title",
      cell: (row) => row.title, // Adjusted to title
    },
    {
      name: "Expire Date",
      cell: function (row) {
        return new Date(row.expire_date).toLocaleDateString("en-CA");
      }, // Adjusted to title
    },
    {
      name: "Link",
      cell: (row) => row.link.substring(1, 35), // Adjusted to title
    },
    {
      name: "Status",
      cell: (row) => (row.status === 1 ? "Active" : "Inactive"), // Adjusted to title
    },
    {
      name: "Actions",
      cell: function (row) {
        return (
          <div>
            <button
              className="btn btn-primary btn-sm rounded-none text-white font-inter"
              onClick={() => handleUpdateButtonClick(row)} // Adjusted to handleUpdateButtonClick
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
      <Card title="MANAGE JOBS">
        <div className="font-inter">
          <button
            className="btn btn-primary rounded-none text-white mt-4 max-w-xs font-inter mb-1"
            type="submit"
            onClick={() => showAddModal()}
          >
            Add Job
          </button>

          <AddJobModal // Adjusted to AddJobModal
            addJob={addJob} // Adjusted to addJob
            loading={loading}
            addJobModalRef={addJobModalRef} // Adjusted to addJobModalRef
          />
          <UpdateJobModal // Adjusted to UpdateJobModal
            updateJob={updateJob} // Adjusted to updateJob
            loading={loading}
            selectedJob={selectedJob} // Adjusted to selectedJob
            updateJobModalRef={updateJobModalRef} // Adjusted to updateJobModalRef
          />

          <SearchField handleFilter={handleFilter} />

          <div className="table-border">
            <DataTable
              columns={jobColumns} // Adjusted to jobColumns
              data={filteredJobData} // Adjusted to filteredJobData
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
