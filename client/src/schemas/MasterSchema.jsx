import * as yup from "yup";
export const addStudentSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  phone: yup.string().required("Phone is required"),
  address: yup.string().required("Address is required"),
  nic: yup.string().required("NIC is required"),
  email: yup.string().required("Email is required").email("Invalid email"),
  birthDay: yup.date().required("Date Of Birth is required"),
});

export const courseSchema = yup.object().shape({
  course_code: yup.string().required("Code is required"),
  course_name: yup.string().required("Name is required"),
});

export const batchSchema = yup.object().shape({
  batch_no: yup.string().required("Batch number is required"),
  batch_name: yup.string().required("Batch name is required"),
  zoom_link: yup
    .string()
    .url("Must be a valid URL")
    .required("Zoom link is required"),
  course_auto_id: yup
    .number()
    .positive("Must be a positive number")
    .required("Course Auto ID is required"),
  start_date: yup.date().required("Start date is required"),
  end_date: yup
    .date()
    .required("End date is required")
    .min(yup.ref("start_date"), "End date can't be before start date"),
  status: yup.string().required("Status is required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
  price: yup
    .number()
    .positive("Must be a positive number")
    .required("Price is required"),
});
