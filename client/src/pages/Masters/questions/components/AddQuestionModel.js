import { questionSchema } from "../../../../schemas/MasterSchema"; // Adjust the schema import
import { Form, Formik } from "formik";
import CustomInput from "../../../../components/CustomInput";
import { CourseSelect } from "./CourseSelect";
import { BatchSelect } from "./BatchSelect";
import { ExamSelect } from "./ExamSelect";

export const AddQuestionModel = ({
  addQuestion,
  loading,
  addQuestionModalRef,
}) => {
  // Adjust the component name and props
  const closeAddModal = () => {
    addQuestionModalRef.current.close(); // Adjust the ref name
  };

  return (
    <dialog id="add_question_modal" className="modal" ref={addQuestionModalRef}>
      {" "}
      {/* Adjust the id and ref */}
      <div className="modal-box  rounded-none">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">ADD NEW QUESTION</h3>{" "}
        {/* Adjust the title */}
        <div className="max-w-lg">
          <Formik
            initialValues={{
              question: "",
              answer_01: "",
              answer_02: "",
              answer_03: "",
              answer_04: "",
              correct_answer: "",
              course: "",
              batch: "",
              exam: "",
            }}
            validationSchema={questionSchema} // Adjust the schema
            onSubmit={async (values, { resetForm }) => {
              const formData = new FormData();
              formData.append("question", values.question);
              formData.append("answer_01", values.answer_01);
              formData.append("answer_02", values.answer_02);
              formData.append("answer_03", values.answer_03);
              formData.append("answer_04", values.answer_04);
              formData.append("correct_answer", values.correct_answer);
              formData.append("course_code", values.course);
              formData.append("batch_code", values.batch);
              formData.append("exam_code", values.exam);
              addQuestion(formData); // Adjust the function name
              resetForm();
              closeAddModal();
            }}
          >
            {() => (
              <Form>
                <CourseSelect label="Course" name="course" />
                <BatchSelect label="Batch" name="batch" />
                <ExamSelect label="Exam" name="exam" />
                <CustomInput label="Question" name="question" type="text" />
                <CustomInput label="Answer 1" name="answer_01" type="text" />
                <CustomInput label="Answer 2" name="answer_02" type="text" />
                <CustomInput label="Answer 3" name="answer_03" type="text" />
                <CustomInput label="Answer 4" name="answer_04" type="text" />
                <CustomInput
                  label="Correct Answer"
                  name="correct_answer"
                  type="text"
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
