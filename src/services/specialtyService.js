import axios from "../axios";

// Specialty related APIs
const createNewSpecialtyService = (data) => {
  return axios.post("/api/create-new-specialty", data);
};

const handleGetAllSpecialties = () => {
  return axios.get("/api/get-all-specialty");
};

const getSpecialtyByIds = (ids = []) => {
  const idsStr = Array.isArray(ids) ? ids.join(",") : String(ids || "");
  return axios.get("/api/get-specialty-by-ids", { params: { ids: idsStr } });
};

export {
  createNewSpecialtyService,
  handleGetAllSpecialties,
  getSpecialtyByIds,
};
