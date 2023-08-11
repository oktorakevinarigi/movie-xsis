import Swal, { SweetAlertOptions } from "sweetalert2";

export function SwalError(props?: SweetAlertOptions) {
  return Swal.fire({
    title: "Error",
    icon: "error",
    confirmButtonText: "OK",
    ...props,
  });
}

export async function SwalWarning(props?: SweetAlertOptions) {
  return Swal.fire({
    title: "Peringatan!",
    icon: "warning",
    confirmButtonText: "OK",
    showCancelButton: false,
    cancelButtonText: "Cancel",
    ...props,
  });
}

export async function SwallSuccess(props?: SweetAlertOptions) {
  return Swal.fire({
    title: "Berhasil",
    icon: "success",
    text: "Data berhasil",
    ...props,
  });
}

export async function SwallInfo(props?: SweetAlertOptions) {
  return Swal.fire({
    title: "Info",
    icon: "info",
    confirmButtonText: "OK",
    ...props,
  });
}

export async function SwalConfirm(props?: SweetAlertOptions) {
  return Swal.fire({
    title: "Konfirmasi",
    icon: "warning",
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    confirmButtonColor: "#3085d6",
    showCancelButton: true,
    ...props,
  });
}
