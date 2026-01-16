import axios from "../axios";

// Specialty related APIs
const createNewSpecialtyService = (data) => {
  return axios.post("/api/create-new-specialty", data);
};

const handleGetAllSpecialties = () => {
  return axios.get("/api/get-specialty");
};

export {
  createNewSpecialtyService,
  handleGetAllSpecialties,
};
