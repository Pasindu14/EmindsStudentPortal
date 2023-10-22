import React from "react";
import { addStudentSchema } from "../../../../schemas/MasterSchema";
import { Form, Formik } from "formik";
import CustomInput from "../../../../components/CustomInput";
import { formatDate } from "../../../../helpers/commonHelpers";

export const UpdateStudentModel = ({
  loading,
  selectedStudent,
  updateStudent,
  updateStudentModalRef,
}) => {
  const closeUpdateModal = () => {
    updateStudentModalRef.current.close();
  };

  return (
    <>
      <dialog
        id="update_student_modal"
        className="modal"
        ref={updateStudentModalRef}
      >
        <div className="modal-box  rounded-none">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">UPDATE STUDENT</h3>
          <div className="max-w-lg">
            <Formik
              enableReinitialize
              initialValues={{
                auto_id: selectedStudent == null ? "" : selectedStudent.auto_id,
                name: selectedStudent == null ? "" : selectedStudent.name,
                phone:
                  selectedStudent == null ? "" : selectedStudent.phoneNumber,
                address: selectedStudent == null ? "" : selectedStudent.address,
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
                closeUpdateModal();
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
    </>
  );
};
