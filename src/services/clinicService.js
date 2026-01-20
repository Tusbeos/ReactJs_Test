import axios from "../axios";

// Clinic related APIs
const createNewClinicService = (data) => {
  return axios.post("/api/create-new-clinic", data);
};

export { createNewClinicService };