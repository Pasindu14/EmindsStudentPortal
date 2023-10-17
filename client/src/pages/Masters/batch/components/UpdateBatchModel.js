import React from "react";
import { batchSchema } from "../../../../schemas/MasterSchema";
import { Form, Formik } from "formik";
import CustomInput from "../../../../components/CustomInput";

export const UpdateBatchModel = ({
  loading,
  selectedBatch,
  updateBatch,
  updateBatchModalRef,
}) => {
  const closeUpdateModal = () => {
    updateBatchModalRef.current.close();
  };

  function formatDate(dateString) {
    if (!dateString) return "";

    const date = new Date(dateString);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return date.toLocaleDateString("en-CA", options);
  }

  return (
    <>
      <dialog
        id="update_batch_modal"
        className="modal"
        ref={updateBatchModalRef}
      >
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
                batch_id: selectedBatch == null ? "" : selectedBatch.batch_id,
                batch_name:
                  selectedBatch == null ? "" : selectedBatch.batch_name,
                start_date:
                  selectedBatch == null
                    ? ""
                    : formatDate(selectedBatch.start_date),
                end_date:
                  selectedBatch == null
                    ? ""
                    : formatDate(selectedBatch.end_date),
              }}
              validationSchema={batchSchema}
              onSubmit={async (values) => {
                const formData = new FormData();
                formData.append("batch_id", values.batch_id);
                formData.append("batch_name", values.batch_name);
                formData.append("start_date", values.start_date);
                formData.append("end_date", values.end_date);

                updateBatch(formData);
                closeUpdateModal();
              }}
            >
              {() => (
                <Form>
                  <CustomInput label="Batch ID" name="batch_id" type="text" />
                  <CustomInput
                    label="Batch Name"
                    name="batch_name"
                    type="text"
                  />
                  <CustomInput
                    label="Start Date"
                    name="start_date"
                    type="date"
                  />
                  <CustomInput label="End Date" name="end_date" type="date" />

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
