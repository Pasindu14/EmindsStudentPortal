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

export const examSchema = yup.object().shape({
  exam_code: yup.string().required("Exam code is required"),
  course: yup.string().required("Course is required"),
  batch: yup.string().required("Batch is required"),
});

export const jobSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  expire_date: yup.date().required("Expire date is required"),
  link: yup.string().required("Link is required"),
});

export const questionSchema = yup.object().shape({
  question: yup.string().required("Question is required"),
  answer_01: yup.string().required("Answer 1 is required"),
  answer_02: yup.string().required("Answer 2 is required"),
  answer_03: yup.string().required("Answer 3 is required"),
  answer_04: yup.string().required("Answer 4 is required"),
  correct_answer: yup
    .number()
    .integer()
    .min(1)
    .max(4)
    .required("Correct Answer is required"),
  course: yup.string().required("Course is required"),
  batch: yup.string().required("Batch is required"),
  exam: yup.string().required("Exam is required"),
});

export const eventSchema = yup.object().shape({
  name: yup.string().required("Event name is required"),
  description: yup.string().required("Description is required"),
  date: yup.date().required("Date is required"),
  link: yup.string().required("Link is required"),
  file: yup.mixed().required("File is required"),
});

export const eventSchemaUpdate = yup.object().shape({
  name: yup.string().required("Event name is required"),
  description: yup.string().required("Description is required"),
  date: yup.date().required("Date is required"),
  link: yup.string().required("Link is required"),
});

export const mappingSchema = yup.object().shape({
  batch: yup.string().required("Batch is required"),
  course: yup.string().required("Course is required"),
  students: yup
    .array()
    .min(1, "At least one student is required")
    .required("Students are required"),
});

export const sessionSchema = yup.object().shape({
  title: yup.string().required("Session title is required"),
  course: yup.string().required("Course is required"),
  batch: yup.string().required("Batch is required"),
  zoom_link: yup.string().required("Zoom link is required"),
  zoom_password: yup.string().required("Zoom password is required"),
  file: yup.mixed().required("File is required"),
});
