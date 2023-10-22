import React from "react";
import { jobSchema } from "../../../../schemas/MasterSchema"; // Change schema
import { Form, Formik } from "formik";
import CustomInput from "../../../../components/CustomInput";
import CustomCheckbox from "../../../../components/CustomCheckbox";
import { formatDate } from "../../../../helpers/commonHelpers";

export const UpdateJobModal = ({
  loading,
  selectedJob,
  updateJob,
  updateJobModalRef,
}) => {
  // Change function name and props

  const closeUpdateModal = () => {
    updateJobModalRef.current.close(); // Change ref
  };

  return (
    <>
      <dialog id="update_job_modal" className="modal" ref={updateJobModalRef}>
        <div className="modal-box  rounded-none">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">UPDATE JOB</h3>
          <div className="max-w-lg">
            <Formik
              enableReinitialize
              initialValues={{
                job_id: selectedJob == null ? "" : selectedJob.job_auto_id, // Change fields
                title: selectedJob == null ? "" : selectedJob.title, // Change fields
                link: selectedJob == null ? "" : selectedJob.link, // Change fields
                expire_date:
                  selectedJob == null
                    ? ""
                    : formatDate(selectedJob.expire_date),
                status:
                  selectedJob == null
                    ? ""
                    : selectedJob.status === 1
                    ? true
                    : false, // Change fields
              }}
              validationSchema={jobSchema} // Change schema
              onSubmit={async (values) => {
                console.log(values);
                const formData = new FormData();
                formData.append("title", values.title); // Change fields
                formData.append("link", values.link);
                formData.append("expire_date", values.expire_date); // Change fields
                formData.append("status", values.status === true ? 1 : 0);
                formData.append("job_auto_id", values.job_id); // Change fields
                updateJob(formData); // Change function
                closeUpdateModal();
              }}
            >
              {() => (
                <Form>
                  <CustomInput label="Job Title" name="title" type="text" />
                  <CustomInput label="Link" name="link" type="text" />
                  <CustomInput
                    label="Date Of Birth"
                    name="expire_date"
                    type="date"
                  />
                  <CustomCheckbox
                    label="Status"
                    name="status"
                    type="checkbox"
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
