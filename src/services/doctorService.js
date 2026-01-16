import axios from "../axios";

// Doctor related APIs
const handleGetTopDoctorHomeService = (limit) => {
  return axios.get("/api/top-doctor-home", { params: { limit } });
};

const handleGetAllDoctorsService = () => {
  return axios.get("/api/get-all-doctors");
};

const saveDetailDoctorService = (data) => {
  return axios.post("/api/save-info-doctors", data);
};

const getDetailInfoDoctor = (inputId) => {
  return axios.get("/api/get-detail-doctor-by-id", { params: { id: inputId } });
};

const saveBulkScheduleDoctor = (data) => {
  return axios.post("/api/bulk-create-schedule", data);
};

const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get("/api/get-schedule-doctor-by-date", {
    params: { doctorId: doctorId, date: date },
  });
};

const saveBulkDoctorServices = (data) =>
  axios.post("/api/bulk-create-doctor-services", data);

const getAllDoctorServices = (inputId) => {
  return axios.get(`/api/get-list-doctor-services?doctorId=${inputId}`);
};

const getExtraInfoDoctorById = (doctorId) => {
  return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`);
};

export {
  handleGetTopDoctorHomeService,
  handleGetAllDoctorsService,
  saveDetailDoctorService,
  getDetailInfoDoctor,
  saveBulkScheduleDoctor,
  getScheduleDoctorByDate,
  saveBulkDoctorServices,
  getAllDoctorServices,
  getExtraInfoDoctorById,
};
