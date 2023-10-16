import * as yup from "yup";
export const addStudentSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  phone: yup.string().required("Phone is required"),
  address: yup.string().required("Address is required"),
  nic: yup.string().required("NIC is required"),
  email: yup.string().required("Email is required").email("Invalid email"),
  birthDay: yup.date().required("Date Of Birth is required"),
});