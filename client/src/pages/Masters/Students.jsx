import React, { useEffect } from "react";
import { useStudentStore } from "../../zustand/stores/masterZustand";
import DataTable from "react-data-table-component";
import { reactTableStyles } from "../../core/constants/styles";
import CustomInput from "../../components/CustomInput";
import { addStudentSchema } from "../../schemas/MasterSchema";
import { Form, Formik } from "formik";
import { errorToast } from "../../components/Toast";

function Students() {
  const {
    loading,
    errorMessage,
    hasErrors,
    getStudents,
    addStudent,
    filter,
    filteredStudentData,
  } = useStudentStore();

  useEffect(() => {
    getStudents();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (hasErrors) {
      errorToast(errorMessage);
    }
  });

  async function handleFilter(event) {
    await filter(event.target.value);
  }

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
      cell: (row) => new Date(row.birthDay).toLocaleDateString("en-CA"),
    },
  ];

  return (
    <>
      <button
        className="btn btn-primary rounded-none text-white mt-4 max-w-xs "
        type="submit"
        onClick={() => document.getElementById("add_student_modal").showModal()}
      >
        Add new student
      </button>
      <dialog id="add_student_modal" className="modal">
        <div className="modal-box ">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Add New Student</h3>
          <div className="max-w-lg">
            <Formik
              initialValues={{
                name: "",
                phone: "",
                address: "",
                nic: "",
                email: "",
                birthDay: new Date().toISOString().split("T")[0],
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
                addStudent(formData);
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
      <hr />
      <br />
      <div className="flex justify-end">
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
    </>
  );
}

export default Students;
