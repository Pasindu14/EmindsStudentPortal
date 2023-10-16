import React, { useEffect, useCallback } from "react";
import { useStudentStore } from "../../zustand/stores/masterZustand";
import DataTable from "react-data-table-component";
import { reactTableStyles } from "../../core/constants/styles";
import CustomInput from "../../components/CustomInput";
import { addStudentSchema } from "../../schemas/MasterSchema";
import { Form, Formik } from "formik";
import { errorToast } from "../../components/Toast";

import { AddStudentModal } from "./components/AddStudentModel";

export function Students() {
  const {
    loading,
    errorMessage,
    hasErrors,
    getStudents,
    addStudent,
    updateStudent,
    filter,
    filteredStudentData,
    setSelectedStudent,
    selectedStudent,
  } = useStudentStore();

  useEffect(() => {
    getStudents();
    if (hasErrors) {
      errorToast(errorMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilter = useCallback(
    async (event) => {
      await filter(event.target.value);
    },
    [filter]
  );

  const handleButtonClick = (row) => {
    document.getElementById("update_student_modal").showModal();
    setSelectedStudent(row);
  };

  const studentColumns = [
    {
      name: "Name ",
      cell: (row) => row.name,
    },
    {
      name: "Phone Number",
      cell: (row) => row.phoneNumber,
    },
    {
      name: "Address",
      cell: (row) => row.address,
    },
    {
      name: "NIC",
      cell: (row) => row.nic,
    },
    {
      name: "Email",
      cell: (row) => row.email,
    },
    {
      name: "Birth Day",
      cell: function (row) {
        return new Date(row.birthDay).toLocaleDateString("en-CA");
      },
    },
    {
      name: "Actions",
      cell: function (row) {
        return (
          <div>
            <button
              className="btn btn-success btn-sm rounded-none text-white font-inter"
              onClick={() => handleButtonClick(row)}
            >
              Update
            </button>
          </div>
        );
      },
    },
  ];

  function formatDate(dateString) {
    if (!dateString) return ""; // Handle null or empty date string

    const date = new Date(dateString);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return date.toLocaleDateString("en-CA", options);
  }
  return (
    <>
      <div className="font-inter">
        <button
          className="btn btn-primary rounded-none text-white mt-4 max-w-xs font-inter mb-1"
          type="submit"
          onClick={() =>
            document.getElementById("add_student_modal").showModal()
          }
        >
          Add new student
        </button>

        <AddStudentModal addStudent={addStudent} loading={loading} />

        <dialog id="update_student_modal" className="modal">
          <div className="modal-box  rounded-none">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">ADD NEW STUDENT</h3>
            <div className="max-w-lg">
              <Formik
                enableReinitialize
                initialValues={{
                  auto_id:
                    selectedStudent == null ? "" : selectedStudent.auto_id,
                  name: selectedStudent == null ? "" : selectedStudent.name,
                  phone:
                    selectedStudent == null ? "" : selectedStudent.phoneNumber,
                  address:
                    selectedStudent == null ? "" : selectedStudent.address,
                  nic: selectedStudent == null ? "" : selectedStudent.nic,
                  email: selectedStudent == null ? "" : selectedStudent.email,
                  birthDay:
                    selectedStudent == null
                      ? ""
                      : formatDate(selectedStudent.birthDay),
                }}
                validationSchema={addStudentSchema}
                onSubmit={async (values) => {
                  const formData = new FormData();
                  formData.append("name", values.name);
                  formData.append("phone", values.phone);
                  formData.append("address", values.address);
                  formData.append("nic", values.nic);
                  formData.append("email", values.email);
                  formData.append("birthDay", values.birthDay);
                  formData.append("auto_id", values.auto_id);
                  updateStudent(formData);
                }}
              >
                {() => (
                  <Form>
                    <CustomInput label="Name" name="name" type="text" />
                    <CustomInput label="Phone" name="phone" type="text" />
                    <CustomInput label="Address" name="address" type="text" />
                    <CustomInput label="NIC" name="nic" type="text" />
                    <CustomInput label="Email" name="email" type="email" />
                    <CustomInput
                      label="Date Of Birth"
                      name="birthDay"
                      type="date"
                    />

                    <button
                      className={`btn w-full rounded-none mt-4 ${
                        loading ? "text-gray-500" : "btn-primary text-white"
                      }`}
                      type="submit"
                      disabled={loading}
                    >
                      Submit
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </dialog>

        <div className="flex justify-end mb-4">
          <input
            type="search"
            placeholder="Search"
            className="input input-bordered w-full input-primary max-w-xs rounded-none h-10"
            onChange={handleFilter}
          />
        </div>

        <div className="table-border">
          <DataTable
            columns={studentColumns}
            data={filteredStudentData}
            progressPending={loading}
            pagination
            customStyles={reactTableStyles}
          />
        </div>
      </div>
    </>
  );
}
