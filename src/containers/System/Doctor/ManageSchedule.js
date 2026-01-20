import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import { toast } from "react-toastify";
import _ from "lodash";
import {
  saveBulkScheduleDoctor,
  getScheduleDoctorByDate,
} from "../../../services/doctorService";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDoctor: {},
      listDoctors: [],
      startDate: new Date(),
      rangeTime: [],
    };
  }

  componentDidMount() {
    this.props.getAllDoctors();
    this.props.getAllScheduleTime();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({ listDoctors: dataSelect });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({ listDoctors: dataSelect });
    }
    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      let data = this.props.allScheduleTime;
      if (data && data.length > 0) {
        data = data.map((item) => ({ ...item, isSelected: false }));
      }
      this.setState({ rangeTime: data });
    }
  }

  buildDataInputSelect = (inputData = []) => {
    const { language } = this.props;
    return inputData.map((item) => {
      const labelVi = `${item.lastName ?? ""} ${item.firstName ?? ""}`.trim();
      const labelEn = `${item.firstName ?? ""} ${item.lastName ?? ""}`.trim();
      return {
        label: language === LANGUAGES.VI ? labelVi : labelEn,
        value: item.id,
      };
    });
  };

  handleChangeSelectDoctor = async (selectedDoctor) => {
    this.setState({ selectedDoctor });
  };

  handleChange = (date) => {
    if (date && date.length > 0) {
      this.setState({ startDate: date[0] }, () => {});
    }
  };

  handleClickTime = (time) => {
    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if (item.id === time.id) item.isSelected = !item.isSelected;
        return item;
      });
      this.setState({ rangeTime: rangeTime });
    }
  };

  handleSaveSchedule = async () => {
    let { rangeTime, selectedDoctor, startDate } = this.state;
    let result = [];

    if (!startDate) {
      toast.error("Invalid date!");
      return;
    }
    if (!selectedDoctor || _.isEmpty(selectedDoctor)) {
      toast.error("Invalid selected doctor!");
      return;
    }

    let formatDate = new Date(startDate).getTime();

    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((item) => {
          let object = {};
          object.doctorId = selectedDoctor.value;
          object.date = formatDate;
          object.timeType = item.keyMap;
          result.push(object);
          return item;
        });
      } else {
        toast.error("Invalid selected time!");
        return;
      }

      let res = await saveBulkScheduleDoctor({
        arrSchedule: result,
        doctorId: selectedDoctor.value,
        formattedDate: formatDate,
      });

      if (res && res.errCode === 0) {
        toast.success("Save schedule succeed!");
        this.setState({
          rangeTime: rangeTime.map((item) => ({ ...item, isSelected: false })),
        });
      } else {
        toast.error("Save schedule failed!");
      }
    }
  };

  render() {
    let currentDay = new Date();
    let { rangeTime } = this.state;
    let { language } = this.props;

    return (
      <div className="manage-schedule-container">
        <div className="m-s-title">
          <FormattedMessage id="manage-schedule.title" />
        </div>

        <div className="row">
          <div className="col-12">
            <div className="info-card">
              <div className="card-header">
                <span>
                  <i className="fas fa-calendar-alt"></i> Thông tin kế hoạch
                </span>
              </div>

              <div className="card-body">
                <div className="row">
                  {/* Chọn Bác sĩ */}
                  <div className="col-md-6 form-group">
                    <label>
                      <FormattedMessage id="manage-schedule.select-doctor" />
                    </label>
                    <Select
                      value={this.state.selectedDoctor}
                      onChange={this.handleChangeSelectDoctor}
                      options={this.state.listDoctors}
                      menuPortalTarget={document.body}
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                    />
                  </div>

                  {/* Chọn Ngày */}
                  <div className="col-md-6 form-group">
                    <label>
                      <FormattedMessage id="manage-schedule.select-date" />
                    </label>
                    <DatePicker
                      className="form-control"
                      onChange={this.handleChange}
                      value={this.state.startDate}
                      minDate={currentDay}
                    />
                  </div>

                  {/* Chọn Giờ */}
                  <div className="col-12 pick-hour-container">
                    <label className="mb-3">Chọn khung giờ khám:</label>
                    <div className="time-content">
                      {rangeTime &&
                        rangeTime.length > 0 &&
                        rangeTime.map((item, index) => {
                          return (
                            <button
                              className={
                                item.isSelected === true
                                  ? "btn btn-schedule active"
                                  : "btn btn-schedule"
                              }
                              key={index}
                              onClick={() => this.handleClickTime(item)}
                            >
                              {language === LANGUAGES.VI
                                ? item.value_Vi
                                : item.value_En}
                            </button>
                          );
                        })}
                    </div>
                  </div>

                  {/* Nút Lưu */}
                  <div className="col-12 btn-container">
                    <button
                      className="btn btn-primary btn-save-schedule"
                      onClick={() => this.handleSaveSchedule()}
                    >
                      <i className="fas fa-save"></i>{" "}
                      <FormattedMessage id="manage-schedule.save" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    allScheduleTime: state.admin.allScheduleTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctors: () => dispatch(actions.fetchAllDoctorsStart()),
    getAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
