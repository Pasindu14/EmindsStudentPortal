import { jobSchema } from "../../../../schemas/MasterSchema"; // Change schema
import { Form, Formik } from "formik";
import CustomInput from "../../../../components/CustomInput";
import CustomCheckbox from "../../../../components/CustomCheckbox";

export const AddJobModal = ({ addJob, loading, addJobModalRef }) => {
  // Change function name and props

  const closeAddModal = () => {
    addJobModalRef.current.close(); // Change ref
  };

  return (
    <dialog id="add_job_modal" className="modal" ref={addJobModalRef}>
      <div className="modal-box rounded-none">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">ADD NEW JOB</h3>
        <div className="max-w-lg">
          <Formik
            initialValues={{
              title: "",
              link: "",
              expire_date: new Date().toISOString().split("T")[0],
              status: false,
            }}
            validationSchema={jobSchema} // Change schema
            onSubmit={async (values, { resetForm }) => {
              console.log(values);
              const formData = new FormData();
              formData.append("title", values.title); // Change fields
              formData.append("link", values.link);
              formData.append("expire_date", values.expire_date); // Change fields
              formData.append("status", values.status === true ? 1 : 0);
              addJob(formData); // Change function
              closeAddModal();
              resetForm();
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
                <CustomCheckbox label="Status" name="status" type="checkbox" />
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
