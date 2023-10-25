import { eventSchemaUpdate } from "../../../../schemas/MasterSchema";
import { Form, Formik } from "formik";
import CustomInput from "../../../../components/CustomInput";
import CustomFileInput from "../../../../components/CustomFileInput";
import CustomCheckbox from "../../../../components/CustomCheckbox";

import { formatDate } from "../../../../helpers/commonHelpers";
export const UpdateEventModel = ({
  selectedEvent,
  updateEvent,
  loading,
  updateEventModalRef,
}) => {
  const closeUpdateModal = () => {
    updateEventModalRef.current.close();
  };

  return (
    <dialog id="update_event_modal" className="modal" ref={updateEventModalRef}>
      <div className="modal-box rounded-none">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">UPDATE EVENT</h3>
        <div className="max-w-lg">
          <Formik
            enableReinitialize
            initialValues={{
              event_auto_id: selectedEvent ? selectedEvent.event_auto_id : "",
              name: selectedEvent ? selectedEvent.name : "",
              description: selectedEvent ? selectedEvent.description : "",
              date: selectedEvent ? formatDate(selectedEvent.date) : "",
              link: selectedEvent ? selectedEvent.link : "",
              status: selectedEvent
                ? selectedEvent.status === 1
                  ? true
                  : false
                : false,
              file: null,
              // Add more fields as needed
            }}
            validationSchema={eventSchemaUpdate} // Make sure to update this schema
            onSubmit={async (values, { resetForm }) => {
              const formData = new FormData();
              formData.append("event_auto_id", values.event_auto_id);
              formData.append("name", values.name);
              formData.append("description", values.description);
              formData.append("date", values.date);
              formData.append("link", values.link);
              formData.append("status", values.status === true ? 1 : 0);
              formData.append("type", "event");
              formData.append("imageFile", values.file);
              updateEvent(formData);
              resetForm();
              closeUpdateModal();
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
