import { questionSchema } from "../../../../schemas/MasterSchema";
import { Form, Formik } from "formik";
import CustomInput from "../../../../components/CustomInput";
import { CourseSelect } from "./CourseSelect";
import { BatchSelect } from "./BatchSelect";
import { ExamSelect } from "./ExamSelect";

export const UpdateQuestionModel = ({
  updateQuestion,
  loading,
  selectedQuestion,
  updateQuestionModalRef,
}) => {
  const closeUpdateModal = () => {
    updateQuestionModalRef.current.close();
  };

  return (
    <dialog
      id="update_question_modal"
      className="modal"
      ref={updateQuestionModalRef}
    >
      <div className="modal-box  rounded-none">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">UPDATE QUESTION</h3>
        <div className="max-w-lg">
          {console.log("selectedQuestion", selectedQuestion)}
          <Formik
            enableReinitialize
            initialValues={{
              question: selectedQuestion ? selectedQuestion.question : "",
              answer_01: selectedQuestion ? selectedQuestion.answer_01 : "",
              answer_02: selectedQuestion ? selectedQuestion.answer_02 : "",
              answer_03: selectedQuestion ? selectedQuestion.answer_03 : "",
              answer_04: selectedQuestion ? selectedQuestion.answer_04 : "",
              correct_answer: selectedQuestion
                ? selectedQuestion.correct_answer
                : "",
              course: selectedQuestion ? selectedQuestion.course_code : "",
              batch: selectedQuestion ? selectedQuestion.batch_code : "",
              exam: selectedQuestion ? selectedQuestion.exam_code : "",
              question_auto_id: selectedQuestion
                ? selectedQuestion.question_auto_id
                : "",
            }}
            validationSchema={questionSchema}
            onSubmit={async (values) => {
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
              formData.append("question_auto_id", values.question_auto_id);
              updateQuestion(formData);
              closeUpdateModal();
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
