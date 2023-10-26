import { sessionSchema } from "../../../../schemas/MasterSchema"; // Update the schema
import { Form, Formik } from "formik";
import CustomInput from "../../../../components/CustomInput";
import CustomFileInput from "../../../../components/CustomFileInput";
import { CourseSelect } from "./CourseSelect";
import { BatchSelect } from "./BatchSelect";

export const AddSessionModel = ({
  addSession,
  loading,
  addSessionModalRef,
}) => {
  const closeAddModal = () => {
    addSessionModalRef.current.close();
  };

  return (
    <dialog id="add_session_modal" className="modal" ref={addSessionModalRef}>
      <div className="modal-box rounded-none">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">ADD NEW SESSION</h3>
        <div className="max-w-lg">
          <Formik
            initialValues={{
              title: "", // Changed from exam_code to title
              course: "",
              batch: "",
              zoom_link: "",
              zoom_password: "",
              file: null,
            }}
            validationSchema={sessionSchema} // Updated schema
            onSubmit={async (values, { resetForm }) => {
              const formData = new FormData();
              formData.append("course_auto_id", values.course);
              formData.append("batch_auto_id", values.batch);
              formData.append("title", values.title);
              formData.append("zoom_link", values.zoom_link);
              formData.append("zoom_password", values.zoom_password);
              formData.append("type", "slide");
              formData.append("imageFile", values.file);
              formData.append(
                "slide_extension",
                values.file.name.split(".").pop()
              );
              addSession(formData);
              resetForm();
              closeAddModal();
            }}
          >
            {({ setFieldValue }) => (
              <Form>
                <CourseSelect label="Course" name="course" type="text" />
                <BatchSelect label="Batch" name="batch" type="text" />
                <CustomInput label="Session Title" name="title" type="text" />
                <CustomInput label="Zoom Link" name="zoom_link" type="text" />
                <CustomInput
                  label="Password"
                  name="zoom_password"
                  type="text"
                />
                <CustomFileInput
                  id="file"
                  name="file"
                  type="file"
                  label="Slide"
                  setFieldValue={setFieldValue}
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
