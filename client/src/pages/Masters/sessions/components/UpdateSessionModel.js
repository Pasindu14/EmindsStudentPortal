import { sessionSchema } from "../../../../schemas/MasterSchema"; // Update the schema
import { Form, Formik } from "formik";
import CustomInput from "../../../../components/CustomInput";
import { CourseSelect } from "./CourseSelect";
import { BatchSelect } from "./BatchSelect";

export const UpdateSessionModel = ({
  selectedSession,
  updateSession,
  loading,
  updateSessionModalRef,
}) => {
  const closeUpdateModal = () => {
    updateSessionModalRef.current.close();
  };

  return (
    <dialog
      id="update_session_modal"
      className="modal"
      ref={updateSessionModalRef}
    >
      <div className="modal-box rounded-none">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">UPDATE SESSION</h3>
        <div className="max-w-lg">
          <Formik
            enableReinitialize
            initialValues={{
              title: selectedSession == null ? "" : selectedSession.title, // Changed from exam_code to title
              batch: selectedSession == null ? "" : selectedSession.batch_code,
              course:
                selectedSession == null ? "" : selectedSession.course_code,
              session_auto_id:
                selectedSession == null ? "" : selectedSession.session_auto_id, // Changed from exam_auto_id to session_auto_id
            }}
            validationSchema={sessionSchema} // Updated schema
            onSubmit={async (values, { resetForm }) => {
              const formData = new FormData();
              formData.append("session_auto_id", values.session_auto_id); // Changed from exam_auto_id to session_auto_id
              formData.append("course_code", values.course);
              formData.append("batch_code", values.batch);
              formData.append("title", values.title); // Changed from exam_code to title
              updateSession(formData);
              resetForm();
              closeUpdateModal();
            }}
          >
            {() => (
              <Form>
                <CourseSelect label="Course" name="course" type="text" />
                <BatchSelect label="Batch" name="batch" type="text" />
                <CustomInput
                  label="Session Title"
                  name="title"
                  type="text"
                />{" "}
                {/* Changed from Exam Code to Session Title */}
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
