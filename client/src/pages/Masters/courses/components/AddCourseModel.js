import { courseSchema } from "../../../../schemas/MasterSchema";  // Change schema
import { Form, Formik } from "formik";
import CustomInput from "../../../../components/CustomInput";

export const AddCourseModal = ({ addCourse, loading , addCourseModalRef}) => { // Change function name and props

  const closeAddModal = () => {
    addCourseModalRef.current.close();  // Change ref
  };

  return (
    <dialog id="add_course_modal" className="modal" ref={addCourseModalRef}>
      <div className="modal-box rounded-none">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">ADD NEW COURSE</h3> 
        <div className="max-w-lg">
          <Formik
            initialValues={{
              course_name: "",  // Change fields
              course_code: "",  // Change fields
            }}
            validationSchema={courseSchema}  // Change schema
            onSubmit={ async (values,{ resetForm }) => {
              const formData = new FormData();
              formData.append("course_name", values.course_name);  // Change fields
              formData.append("course_code", values.course_code);  // Change fields
              addCourse(formData);  // Change function
              closeAddModal();
              resetForm();
            }}
          >
            {() => (
              <Form>
                <CustomInput label="Course Name" name="course_name" type="text" /> 
                <CustomInput label="Course Code" name="course_code" type="text" />  
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
