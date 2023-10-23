import { examSchema } from "../../../../schemas/MasterSchema";
import { Form, Formik } from "formik";
import CustomInput from "../../../../components/CustomInput";
import { CourseSelect } from "./CourseSelect";
import { BatchSelect } from "./BatchSelect";

export const UpdateExamModel = ({
  selectedExam,
  updateExam,
  loading,
  updateExamModalRef,
}) => {
  const closeUpdateModal = () => {
    updateExamModalRef.current.close();
  };

  console.log(selectedExam);
  return (
    <dialog id="update_exam_modal" className="modal" ref={updateExamModalRef}>
      <div className="modal-box  rounded-none">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">UPDATE EXAM</h3>
        <div className="max-w-lg">
          <Formik
            enableReinitialize
            initialValues={{
              exam_code: selectedExam == null ? "" : selectedExam.exam_code,
              batch: selectedExam == null ? "" : selectedExam.batch_code,
              course: selectedExam == null ? "" : selectedExam.course_code,
              exam_auto_id:
                selectedExam == null ? "" : selectedExam.exam_auto_id,
            }}
            validationSchema={examSchema}
            onSubmit={async (values, { resetForm }) => {
              console.log(values);
              const formData = new FormData();
              formData.append("exam_auto_id", values.exam_auto_id);
              formData.append("course_code", values.course);
              formData.append("batch_code", values.batch);
              formData.append("exam_code", values.exam_code);
              updateExam(formData);
              resetForm();
              closeUpdateModal();
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
