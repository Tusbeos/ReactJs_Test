import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};

const handleGetAllUsers = (inputId) => {
  return axios.get("/api/get-all-users", { params: { id: inputId } });
};

const handleCreateNewUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};

const handleDeleteUserService = (userId) => {
  return axios.delete("/api/delete-user", { data: { id: userId } });
};

const handleEditUserService = (inputData) => {
  return axios.put("/api/edit-user", inputData);
};

const handleGetAllCodeService = (inputType) => {
  return axios.get("/api/allcode", { params: { type: inputType } });
};

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
  return axios.get(`/api/get-list-doctor-services`, {
    params: { id: inputId },
  });
};

export {
  handleLoginApi,
  handleGetAllUsers,
  handleCreateNewUserService,
  handleDeleteUserService,
  handleEditUserService,
  handleGetAllCodeService,
  handleGetTopDoctorHomeService,
  handleGetAllDoctorsService,
  saveDetailDoctorService,
  getDetailInfoDoctor,
  saveBulkScheduleDoctor,
  getScheduleDoctorByDate,
  saveBulkDoctorServices,
  getAllDoctorServices,
};
