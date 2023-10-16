import { toast } from "react-toastify";

export const errorToast = (message) => {
  return toast.error(message, {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    className: "toast-top",
  });
};
