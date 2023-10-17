import { batchSchema } from "../../../../schemas/MasterSchema"; // Change schema
import { Form, Formik } from "formik";
import CustomInput from "../../../../components/CustomInput";

export const AddBatchModal = ({ addBatch, loading, addBatchModalRef }) => {
  const closeAddModal = () => {
    addBatchModalRef.current.close(); // Change ref
  };

  return (
    <dialog id="add_batch_modal" className="modal" ref={addBatchModalRef}>
      <div className="modal-box rounded-none">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">ADD NEW BATCH</h3>
        <div className="max-w-lg">
          <Formik
            initialValues={{
              auto_id: "",
              batch_no: "",
              batch_name: "",
              zoom_link: "",
              course_auto_id: "",
              start_date: "",
              end_date: "",
              status: "",
              password: "",
              price: "",
            }}
            validationSchema={batchSchema} // Change schema
            onSubmit={async (values, { resetForm }) => {
              const formData = new FormData();
              // Append all fields
              Object.keys(values).forEach((key) => {
                formData.append(key, values[key]);
              });
              addBatch(formData); // Change function
              closeAddModal();
              resetForm();
            }}
          >
            {() => (
              <Form>
                <CustomInput label="Auto ID" name="auto_id" type="text" />
                <CustomInput label="Batch No" name="batch_no" type="text" />
                <CustomInput label="Batch Name" name="batch_name" type="text" />
                <CustomInput label="Zoom Link" name="zoom_link" type="text" />
                <CustomInput
                  label="Course Auto ID"
                  name="course_auto_id"
                  type="text"
                />
                <CustomInput label="Start Date" name="start_date" type="date" />
                <CustomInput label="End Date" name="end_date" type="date" />
                <CustomInput label="Status" name="status" type="text" />
                <CustomInput label="Password" name="password" type="password" />
                <CustomInput label="Price" name="price" type="number" />
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
