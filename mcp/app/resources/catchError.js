import axios from "axios";
export default (error) => {
    if (axios.isAxiosError(error)) {
        if (error.status === 401) {
            return { error: "UNAUTHORIZED" };
        }
        const msg = (typeof error.response?.data === 'string' && error.response.data) ||
            error.message;
        return { error: msg };
    }
    return { error: error?.message ?? 'Unknown error' };
};
