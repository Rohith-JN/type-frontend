import { ToastOptions, toast } from "react-toastify";

export const toastOptions: ToastOptions<{}> = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "dark",
};

export const customToast = {
    success(msg: string, options: {}) {
        return toast.success(msg, {
            ...options,
            className: "toast-success-container",
            progressClassName: "toast-success-progress",
        });
    },
    error(msg: string, options = {}) {
        return toast.error(msg, {
            ...options,
            className: "toast-error-container",
            progressClassName: "toast-error-progress",
        });
    },
    info(msg: string, options = {}) {
        return toast.info(msg, {
            ...options,
            className: "toast-info-container",
            progressClassName: "toast-info-progress",
        });
    },
};
