import { addStudentSchema } from "../../../../schemas/MasterSchema";
import { Form, Formik } from "formik";
import CustomInput from "../../../../components/CustomInput";

export const AddExamModel = ({ addStudent, loading, addExamModalRef }) => {
  const closeAddModal = () => {
    addExamModalRef.current.close();
  };

  return (
    <dialog id="add_student_modal" className="modal" ref={addExamModalRef}>
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
            initialValues={{
              name: "",
              phone: "",
              address: "",
              nic: "",
              email: "",
              birthDay: new Date().toISOString().split("T")[0],
            }}
            validationSchema={addStudentSchema}
            onSubmit={async (values, { resetForm }) => {
              const formData = new FormData();
              formData.append("name", values.name);
              formData.append("phone", values.phone);
              formData.append("address", values.address);
              formData.append("nic", values.nic);
              formData.append("email", values.email);
              formData.append("birthDay", values.birthDay);
              addStudent(formData);
              resetForm();
              closeAddModal();
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
  );
};
