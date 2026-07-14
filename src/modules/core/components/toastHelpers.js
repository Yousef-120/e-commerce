export const loadingToast = (text) =>
    toast.loading(text);

export const successToast = (id, text) =>
    toast.update(id, {
        render: text,
        type: "success",
        isLoading: false,
        autoClose: 3000,
    });

export const errorToast = (id, text) =>
    toast.update(id, {
        render: text,
        type: "error",
        isLoading: false,
        autoClose: 3000,
    });