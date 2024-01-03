import { mappingSchema } from "../../../schemas/MasterSchema";
import { Form, Formik } from "formik";
import CustomInput from "../../../components/CustomInput";
import { CourseSelect } from "./CourseSelect";
import { BatchSelect } from "./BatchSelect";
import { StudentMultiSelect } from "./StudentMultiSelect";

export const AddMappingModel = ({
  addMapping,
  loading,
  addMappingModalRef,
}) => {
  const closeAddModal = () => {
    addMappingModalRef.current.close();
  };

  return (
    <dialog id="add_batch_modal" className="modal" ref={addMappingModalRef}>
      <div className="modal-box w-11/12 max-w-5xl rounded-none h-3/4">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        <h3 className="font-bold text-lg">ADD NEW MAP</h3>
        <div className="">
          <Formik
            initialValues={{
              course: "",
              batch: "",
              students: [],
            }}
            validationSchema={mappingSchema}
            onSubmit={async (values, { resetForm }) => {
              addMapping(values.course, values.batch, values.students);
              resetForm();
              closeAddModal();
            }}
          >
            {({ setFieldValue }) => (
              <Form>
                <CourseSelect label="Course" name="course" type="text" />
                <BatchSelect label="Batch" name="batch" type="text" />
                <StudentMultiSelect
                  label="Students"
                  name="students"
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
