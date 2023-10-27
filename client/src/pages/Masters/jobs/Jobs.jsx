import React, { useEffect, useCallback, useRef } from "react";
import { useJobStore } from "../../../zustand/stores/job-zustand";
import DataTable from "react-data-table-component";
import { reactTableStyles } from "../../../core/constants/styles";
import { useHandleErrors } from "../../../hooks/useHandleErrors";
import { AddJobModal } from "./components/AddJobModel";
import { UpdateJobModal } from "./components/UpdateJobModel";
import { SearchField } from "./components/Search";
import Card from "../../../components/Card";
import { ThreeCircles } from "react-loader-spinner";
import AnimatedComponent from "../../../components/AnimatedComponent";
import { confirmToast } from "../../../components/Toast";

export function Jobs() {
  const addJobModalRef = useRef(null);
  const updateJobModalRef = useRef(null);

  const showAddModal = () => {
    addJobModalRef.current.showModal();
  };

  const showUpdateModal = () => {
    updateJobModalRef.current.showModal();
  };

  const {
    loading,
    statusMessage,
    hasErrors,
    getJobs,
    addJob,
    updateJob,
    filter,
    filteredJobData,
    setSelectedJob,
    selectedJob,
    removeJob,
  } = useJobStore();

  useHandleErrors(hasErrors, statusMessage);

  const handleFilter = useCallback(
    (event) => {
      filter(event.target.value);
    },
    [filter]
  );

  useEffect(() => {
    getJobs();
  }, [getJobs]);

  const handleUpdateButtonClick = (row) => {
    showUpdateModal();
    setSelectedJob(row);
  };
  const handleRemoveButtonClick = (row) => {
    confirmToast(() => removeJob(row.job_auto_id));
  };
  const jobColumns = [
    {
      name: "Job Title",
      cell: (row) => row.title,
    },
    {
      name: "Expire Date",
      cell: function (row) {
        return new Date(row.expire_date).toLocaleDateString("en-CA");
      },
    },
    {
      name: "Link",
      cell: (row) => (
        <a className="link link-primary" href={row.link}>
          Link
        </a>
      ),
      minWidth: "10rem",
    },
    {
      name: "Status",
      cell: (row) => (row.status === 1 ? "Active" : "Inactive"),
    },
    {
      name: "Actions",
      minWidth: "15rem",
      cell: function (row) {
        return (
          <div>
            <button
              className="btn btn-primary btn-sm rounded-none text-white font-inter"
              onClick={() => handleUpdateButtonClick(row)}
            >
              Update
            </button>
            <button
              className="btn btn-error btn-sm rounded-none text-white font-inter ml-2"
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
          {" "}
          <Card title="MANAGE JOBS">
            <div className="font-inter">
              <button
                className="btn btn-primary rounded-none text-white mt-4 max-w-xs font-inter mb-1"
                type="submit"
                onClick={() => showAddModal()}
              >
                Add Job
              </button>

              <AddJobModal
                addJob={addJob}
                loading={loading}
                addJobModalRef={addJobModalRef}
              />
              <UpdateJobModal
                updateJob={updateJob}
                loading={loading}
                selectedJob={selectedJob}
                updateJobModalRef={updateJobModalRef}
              />

              <SearchField handleFilter={handleFilter} />

              <div className="table-border">
                <DataTable
                  columns={jobColumns}
                  data={filteredJobData}
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
