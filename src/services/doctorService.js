import axios from "../axios";

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

const getSpecialtiesByDoctorId = (doctorId) => {
  return axios.get(`/api/get-specialties-by-doctor-id?doctorId=${doctorId}`);
};

const HandleGetDoctorSpecialtyById = (inputId) => {
  return axios.get(`/api/get-doctor-specialty-by-id?id=${inputId}`);
};

const getDoctorsByClinicId = (clinicId) => {
  return axios.get(`/api/get-doctors-by-clinic-id?clinicId=${clinicId}`);
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
  getSpecialtiesByDoctorId,
  HandleGetDoctorSpecialtyById,
  getDoctorsByClinicId,
};
