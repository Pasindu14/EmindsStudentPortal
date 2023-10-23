import React, { useEffect, useCallback, useRef } from "react";
import { useEventStore } from "../../../zustand/stores/eventZustand"; // Adjust this import
import DataTable from "react-data-table-component";
import { reactTableStyles } from "../../../core/constants/styles";
import { confirmToast } from "../../../components/Toast";
import { useHandleErrors } from "../../../hooks/useHandleErrors";
import { formatDate } from "../../../helpers/commonHelpers";
import { AddEventModel } from "./components/AddEventModel"; /* 
import { UpdateEventModel } from "./components/UpdateEventModel";
import { SearchField } from "./components/Search"; */

import Card from "../../../components/Card";
import { ThreeCircles } from "react-loader-spinner";
import AnimatedComponent from "../../../components/AnimatedComponent";

export function Events() {
  const addEventModalRef = useRef(null);
  const updateEventModalRef = useRef(null);

  const showAddModal = () => {
    addEventModalRef.current.showModal();
  };

  const showUpdateModal = () => {
    updateEventModalRef.current.showModal();
  };

  const {
    loading,
    statusMessage,
    hasErrors,
    getEvents,
    addEvent,
    updateEvent,
    filter,
    filteredEventData,
    setSelectedEvent,
    selectedEvent,
    removeEvent,
    // Any other relevant methods
  } = useEventStore(); // Adjusted store hook

  useHandleErrors(hasErrors, statusMessage);

  const handleFilter = useCallback(
    (event) => {
      filter(event.target.value);
    },
    [filter]
  );

  useEffect(() => {
    getEvents();
    // loadAnyOtherData();
  }, [getEvents]);

  const handleUpdateButtonClick = (row) => {
    showUpdateModal();
    setSelectedEvent(row);
  };

  const eventColumns = [
    { name: "Name", cell: (row) => row.name },
    { name: "Description", cell: (row) => row.description },
    { name: "Date", cell: (row) => formatDate(row.date) },
    {
      name: "Link",
      cell: (row) => (
        <a target="_self" href={row.link} className="link link-primary">
          {row.link}
        </a>
      ),
    },
    { name: "Image", cell: (row) => row.image },
    {
      name: "Status",
      cell: (row) => (row.status === 1 ? "Active" : "Inactive"),
    },
    {
      name: "Actions",
      cell: (row) => (
        <button
          className="btn btn-primary btn-sm rounded-none text-white font-inter"
          onClick={() => handleUpdateButtonClick(row)}
        >
          Update
        </button>
      ),
    },
  ];

  return (
    <>
      {loading ? (
        <div className="w-screen h-[90vh] flex items-center justify-center">
          <ThreeCircles height="100" width="100" color="#570DF8" visible />
        </div>
      ) : (
        <AnimatedComponent>
          <Card title="MANAGE EVENTS">
            <div className="font-inter">
              <button
                className="btn btn-primary rounded-none text-white mt-4 max-w-xs font-inter mb-1"
                type="submit"
                onClick={showAddModal}
              >
                Add new event
              </button>
              <AddEventModel
                addEvent={addEvent}
                loading={loading}
                addEventModalRef={addEventModalRef}
              />
              {/*  <UpdateEventModel
                updateEvent={updateEvent}
                loading={loading}
                selectedEvent={selectedEvent}
                updateEventModalRef={updateEventModalRef}
              />
              <SearchField handleFilter={handleFilter} /> */}
              <div className="table-border">
                <DataTable
                  columns={eventColumns}
                  data={filteredEventData}
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
