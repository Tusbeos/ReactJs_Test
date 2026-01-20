import axios from "../axios";

// Clinic related APIs
const createNewClinicService = (data) => {
  return axios.post("/api/create-new-clinic", data);
};

const getDetailClinicById = (clinicId) => {
  return axios.get("/api/get-detail-clinic-by-id", {
    params: { id: clinicId },
  });
};

const handleGetAllClinics = () => {
  return axios.get("/api/get-all-clinic");
};

export { createNewClinicService, getDetailClinicById, handleGetAllClinics };