import Swal from "sweetalert2";

export const errorToast = (message) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3500,
  });

  Toast.fire({
    icon: "error",
    title: message,
  });
};

export const successToast = (message) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1500,
  });

  Toast.fire({
    icon: "success",
    title: message,
  });
};
