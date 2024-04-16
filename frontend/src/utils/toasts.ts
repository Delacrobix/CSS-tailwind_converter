import { toast } from "sonner";

export function getToastError() {
  return toast.error("Something went wrong! Please try again.", {
    duration: 5000,
    style: {
      color: "red",
      borderRadius: "0.5rem",
    },
  });
}

export function getToastWarning(message: string) {
  return toast.warning(message, {
    duration: 5000,
    style: {
      color: "orange",
      borderRadius: "0.5rem",
    },
  });
}

export function getSuccessToast(message: string) {
  return toast.success(message, {
    duration: 5000,
    classNames: {
      title: " text-green-900",
    },
    style: {
      borderRadius: "0.5rem",
      color: "green",
    },
  });
}
