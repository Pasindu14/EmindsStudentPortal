import React, { useRef } from "react";
import { eventSchema } from "../../../../schemas/MasterSchema"; // Update this import
import { Form, Formik, useFormikContext } from "formik";
import CustomInput from "../../../../components/CustomInput";
import CustomFileInput from "../../../../components/CustomFileInput";
import CustomCheckbox from "../../../../components/CustomCheckbox";

export const AddEventModel = ({ addEvent, loading, addEventModalRef }) => {
  const fileInputRef = useRef();

  const handleChange = (event) => {
    console.log("first", event.currentTarget.files[0]);
  };

  const closeAddModal = () => {
    addEventModalRef.current.close();
  };

  return (
    <dialog id="add_event_modal" className="modal" ref={addEventModalRef}>
      <div className="modal-box rounded-none">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">ADD NEW EVENT</h3>
        <div className="max-w-lg">
          <Formik
            enableReinitialize
            initialValues={{
              name: "",
              description: "",
              date: new Date().toISOString().split("T")[0],
              link: "",
              status: "",
              file: null,
            }}
            validationSchema={eventSchema} // Adjust this
            onSubmit={async (values, { resetForm }) => {
              const formData = new FormData();
              formData.append("name", values.name);
              formData.append("description", values.description);
              formData.append("date", values.date);
              formData.append("link", values.link);
              formData.append("status", values.status === true ? 1 : 0);
              formData.append("type", "event");
              formData.append("imageFile", values.file);
              addEvent(formData);
              resetForm();
              closeAddModal();
            }}
          >
            {({ setFieldValue }) => (
              <Form>
                <CustomInput label="Name" name="name" type="text" />
                <CustomInput
                  label="Description"
                  name="description"
                  type="text"
                />
                <CustomInput label="Date" name="date" type="date" />
                <CustomInput label="Link" name="link" type="text" />
                <CustomFileInput
                  id="file"
                  name="file"
                  type="file"
                  label="Image"
                  setFieldValue={setFieldValue}
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
