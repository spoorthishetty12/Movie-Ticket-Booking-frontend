const { axiosInstance } = require(".");

// Add a new movie
export const AddMovie = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/movies/add-movie", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

//Get All Movies

export const GetAllMovies = async () => {
    try {
        const response = await axiosInstance.get("/api/movies/get-all-movies");
        return response.data;
    } catch (error) {
        return error.response;
    }
}

// update a movie
export const UpdateMovies = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/movies/update-movie", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

// delete a movie
export const DeleteMovie = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/movies/delete-movie", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
}