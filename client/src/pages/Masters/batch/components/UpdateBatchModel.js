import { batchSchema } from "../../../../schemas/MasterSchema";
import { Form, Formik } from "formik";
import CustomInput from "../../../../components/CustomInput";
import { CourseSelect } from "./CourseSelect"; // Assuming you have this
import CustomCheckbox from "../../../../components/CustomCheckbox";
import { formatDate } from "../../../../helpers/commonHelpers";

export const UpdateBatchModal = ({
  selectedBatch,
  updateBatch,
  loading,
  updateBatchModalRef,
}) => {
  const closeUpdateModal = () => {
    updateBatchModalRef.current.close();
  };

  return (
    <dialog id="update_batch_modal" className="modal" ref={updateBatchModalRef}>
      <div className="modal-box rounded-none">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">UPDATE BATCH</h3>
        <div className="max-w-lg">
          <Formik
            enableReinitialize
            initialValues={{
              auto_id: selectedBatch ? selectedBatch.auto_id : "",
              batch_no: selectedBatch ? selectedBatch.batch_no : "",
              batch_name: selectedBatch ? selectedBatch.batch_name : "",
              zoom_link: selectedBatch ? selectedBatch.zoom_link : "",
              course: selectedBatch ? selectedBatch.course_auto_id : "",
              start_date: selectedBatch
                ? formatDate(selectedBatch.start_date)
                : "",
              end_date: selectedBatch ? formatDate(selectedBatch.end_date) : "",
              status: selectedBatch ? selectedBatch.status : "",
              password: selectedBatch ? selectedBatch.password : "",
              price: selectedBatch ? selectedBatch.price : "",
            }}
            validationSchema={batchSchema}
            onSubmit={async (values, { resetForm }) => {
              const formData = new FormData();
              formData.append("auto_id", values.auto_id);
              formData.append("batch_no", values.batch_no);
              formData.append("batch_name", values.batch_name);
              formData.append("zoom_link", values.zoom_link);
              formData.append("course_auto_id", values.course);
              formData.append("start_date", values.start_date);
              formData.append("end_date", values.end_date);
              formData.append("status", values.status === true ? 1 : 0);
              formData.append("password", values.password);
              formData.append("price", values.price);
              updateBatch(formData);
              resetForm();
              closeUpdateModal();
            }}
          >
            {({ validateForm }) => (
              <Form>
                <CustomInput label="Batch No" name="batch_no" type="text" />
                <CustomInput label="Batch Name" name="batch_name" type="text" />
                <CustomInput label="Zoom Link" name="zoom_link" type="text" />
                <CourseSelect label="Course" name="course" />
                <CustomInput label="Start Date" name="start_date" type="date" />
                <CustomInput label="End Date" name="end_date" type="date" />
                <CustomInput label="Password" name="password" type="password" />
                <CustomCheckbox label="Status" name="status" type="checkbox" />
                <button
                  className={`btn w-full rounded-none mt-4 ${
                    loading ? "text-gray-500" : "btn-primary text-white"
                  }`}
                  type="submit"
                  disabled={loading}
                >
                  Update
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </dialog>
  );
};
