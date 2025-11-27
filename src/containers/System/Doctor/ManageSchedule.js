import React, { Component } from 'react';
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { LANGUAGES, dateFormat } from "utils";
import DatePicker from "../../../components/Input/DatePicker";
import { toast } from "react-toastify";
import moment from "moment";
import _ from "lodash";
import { saveBulkScheduleDoctor } from "services/userService";

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
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      let data = this.props.allScheduleTime;
      if (data && data.length > 0) {
        data = data.map((item) => ({
          ...item,
          isSelected: false,
        }));
      }
      this.setState({
        rangeTime: data,
      });
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
    this.setState({ startDate: date[0] });
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
    }
    if (!selectedDoctor || _.isEmpty(selectedDoctor)) {
      toast.error("Invalid selected doctor!");
      return;
    }
    let formatDate = new Date(startDate).setHours(0, 0, 0, 0);
    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((item) => {
          let object = {};
          object.doctorId = selectedDoctor.value;
          object.date = formatDate;
          object.timeType = item.keyMap;
          result.push(object);
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
      console.log("check res save bulk schedule", res);
    }
  };

  render() {
    let { rangeTime } = this.state;
    let { language } = this.props;
    return (
      <div className="manage-schedule-container">
        <div className="manage-schedule-title">
          <FormattedMessage id="manage-schedule.title" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6 form-group">
              <FormattedMessage id="manage-schedule.select-doctor" />
              <Select
                value={this.state.selectedDoctor}
                onChange={this.handleChangeSelectDoctor}
                options={this.state.listDoctors}
              />
            </div>
            <div className="col-2 form-group">
              <FormattedMessage id="manage-schedule.select-date" />
              <DatePicker
                className="form-control"
                value={this.state.startDate}
                onChange={this.handleChange}
                minDate={new Date()}
              />
            </div>
            <div className="col-12 pick-hour-container">
              {rangeTime &&
                rangeTime.length > 0 &&
                rangeTime.map((item, index) => {
                  return (
                    <button
                      className={
                        item.isSelected == false
                          ? "btn btn-schedule"
                          : "btn btn-schedule active"
                      }
                      onClick={() => this.handleClickTime(item)}
                      key={index}
                    >
                      {language === LANGUAGES.VI
                        ? item.value_Vi
                        : item.value_En}
                    </button>
                  );
                })}
            </div>
            <div className="col-12 form-group">
              <button
                className="btn btn-primary btn-save-schedule"
                onClick={() => this.handleSaveSchedule()}
              >
                <FormattedMessage id="manage-schedule.save" />
              </button>
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
