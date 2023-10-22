import { examSchema } from "../../../../schemas/MasterSchema";
import { Form, Formik } from "formik";
import CustomInput from "../../../../components/CustomInput";
import { CourseSelect } from "./CourseSelect";
import { BatchSelect } from "./BatchSelect";
export const AddExamModel = ({ addExam, loading, addExamModalRef }) => {
  const closeAddModal = () => {
    addExamModalRef.current.close();
  };

  return (
    <dialog id="add_exam_modal" className="modal" ref={addExamModalRef}>
      <div className="modal-box  rounded-none">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">ADD NEW EXAM</h3>
        <div className="max-w-lg">
          <Formik
            initialValues={{
              exam_code: "",
              course: "",
              batch: "",
            }}
            validationSchema={examSchema}
            onSubmit={async (values, { resetForm }) => {
              const formData = new FormData();
              formData.append("course_code", values.course);
              formData.append("batch_code", values.batch);
              formData.append("exam_code", values.exam_code);
              addExam(formData);
              resetForm();
              closeAddModal();
            }}
          >
            {() => (
              <Form>
                <CourseSelect label="Course" name="course" type="text" />
                <BatchSelect label="Batch" name="batch" type="text" />
                <CustomInput label="Exam Code" name="exam_code" type="text" />
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
