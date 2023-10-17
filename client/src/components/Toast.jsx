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
    timer: 3000,
  });

  Toast.fire({
    icon: "success",
    title: message,
  });
};

export const confirmToast = (confirmFunction) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#570DF8",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      confirmFunction();
    }
  });
};
