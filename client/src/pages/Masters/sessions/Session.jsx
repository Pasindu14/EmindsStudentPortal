import React, { useEffect, useCallback, useRef } from "react";
import { useSessionStore } from "../../../zustand/stores/sessionZustand"; // Adjust this import
import DataTable from "react-data-table-component";
import { reactTableStyles } from "../../../core/constants/styles";
import { confirmToast } from "../../../components/Toast";
import { useHandleErrors } from "../../../hooks/useHandleErrors";
import { AddSessionModel } from "./components/AddSessionModel";
import { UpdateSessionModel } from "./components/UpdateSessionModel";
import { SearchField } from "./components/Search";

import Card from "../../../components/Card";
import { ThreeCircles } from "react-loader-spinner";
import AnimatedComponent from "../../../components/AnimatedComponent";

export function Sessions() {
  const addSessionModalRef = useRef(null);
  const updateSessionModalRef = useRef(null);

  const showAddModal = () => {
    addSessionModalRef.current.showModal();
  };

  const {
    loading,
    statusMessage,
    hasErrors,
    getSessions,
    addSession,
    updateSession,
    filter,
    filteredSessionData,
    selectedSession,
    removeSession,
    loadCourseAndBatchData,
    setSelectedCourseCode,
    setSelectedBatchCode,
  } = useSessionStore(); // Adjusted store hook

  useHandleErrors(hasErrors, statusMessage);

  const handleFilter = useCallback(
    (event) => {
      filter(event.target.value);
    },
    [filter]
  );

  useEffect(() => {
    getSessions();
    loadCourseAndBatchData();
  }, [getSessions, loadCourseAndBatchData]);

  const handleRemoveButtonClick = (row) => {
    confirmToast(() => {
      removeSession(row.session_auto_id);
    });
  };

  const sessionColumns = [
    {
      name: "Session Title",
      cell: (row) => row.title,
    },
    {
      name: "Zoom Link",
      cell: (row) => (
        <a className="link link-primary" href={row.zoom_link}>
          {row.zoom_link}
        </a>
      ),
    },
    {
      name: "Course",
      cell: (row) => row.course_name,
    },
    {
      name: "Batch",
      cell: (row) => row.batch_name,
    },
    {
      name: "Password",
      cell: (row) => row.zoom_password,
    },
    {
      name: "Slide Url",
      cell: (row) => (
        <a className="link link-primary" href={row.zoom_link}>
          Document
        </a>
      ),
    },
    {
      name: "Actions",
      cell: function (row) {
        return (
          <div>
            <button
              className="btn btn-error btn-sm rounded-none text-white font-inter"
              onClick={() => handleRemoveButtonClick(row)}
            >
              REMOVE
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
          <Card title="MANAGE SESSIONS">
            <div className="font-inter">
              <button
                className="btn btn-primary rounded-none text-white mt-4 max-w-xs font-inter mb-1"
                type="submit"
                onClick={() => showAddModal()}
              >
                Add new session
              </button>

              <AddSessionModel
                addSession={addSession}
                loading={loading}
                addSessionModalRef={addSessionModalRef}
                setSelectedCourseCode={setSelectedCourseCode}
                setSelectedBatchCode={setSelectedBatchCode}
              />
              <UpdateSessionModel
                updateSession={updateSession}
                loading={loading}
                selectedSession={selectedSession}
                updateSessionModalRef={updateSessionModalRef}
              />

              <SearchField handleFilter={handleFilter} />
              <div className="table-border">
                <DataTable
                  columns={sessionColumns}
                  data={filteredSessionData}
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
