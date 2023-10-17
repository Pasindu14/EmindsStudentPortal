import React from "react";
import { courseSchema } from "../../../../schemas/MasterSchema";
import { Form, Formik } from "formik";
import CustomInput from "../../../../components/CustomInput";

export const UpdateCourseModel = ({loading, selectedCourse, updateCourse, updateCourseModalRef}) => {

  const closeUpdateModal = () => {
    updateCourseModalRef.current.close();
  };

  return (
    <>
      <dialog id="update_course_modal" className="modal" ref={updateCourseModalRef}>
        <div className="modal-box  rounded-none">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">UPDATE COURSE</h3>
          <div className="max-w-lg">
            <Formik
              enableReinitialize
              initialValues={{
                course_id: selectedCourse == null ? "" : selectedCourse.auto_id,
                course_name: selectedCourse == null ? "" : selectedCourse.course_name,
                course_code: selectedCourse == null ? "" : selectedCourse.course_code,
              }}
              validationSchema={courseSchema}
              onSubmit={async (values) => {

                const formData = new FormData();
                formData.append("course_name", values.course_name);
                formData.append("course_code", values.course_code);
                formData.append("auto_id", values.course_id);
                updateCourse(formData);
                closeUpdateModal();
              }}
            >
              {() => (
                <Form>
                 <CustomInput label="Course Code" name="course_code" type="text" />
                  <CustomInput label="Course Name" name="course_name" type="text" />

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
}
