import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedules.scss";
import moment from "moment";
import localization from "moment/locale/vi";
import { LANGUAGES } from "../../../utils";
import { getScheduleDoctorByDate } from "../../../services/userService";
import { FormattedMessage } from "react-intl";

class DoctorSchedules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      availableTime: [],
    };
  }

  async componentDidMount() {
    let { language } = this.props;
    let allDays = this.getArrDays(language);
    this.setState({
      allDays: allDays,
    });
    if (this.props.detailDoctorFromParent) {
      let res = await getScheduleDoctorByDate(
        this.props.detailDoctorFromParent,
        allDays[0].value
      );
      this.setState({
        availableTime: res.data ? res.data : [],
      });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapShot) {
    if (this.props.language !== prevProps.language) {
      let allDays = this.getArrDays(this.props.language);
      this.setState({
        allDays: allDays,
      });
    }
    if (
      this.props.detailDoctorFromParent !== prevProps.detailDoctorFromParent
    ) {
      let allDays = this.getArrDays(this.props.language);
      if (allDays && allDays.length > 0) {
        let res = await getScheduleDoctorByDate(
          this.props.detailDoctorFromParent,
          allDays[0].value
        );
        this.setState({
          availableTime: res.data ? res.data : [],
        });
      }
    }
  }

  getArrDays = (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Hôm nay - ${ddMM}`;
          object.label = today;
        } else {
          let labelVi = moment(new Date())
            .add(i, "days")
            .format("dddd - DD/MM");
          object.label = this.capitalizeFirstLetter(labelVi);
        }
      } else {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Today - ${ddMM}`;
          object.label = today;
        } else {
          object.label = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("dddd - DD/MM");
        }
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      allDays.push(object);
    }
    return allDays;
  };

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  HandleOnChangeSelect = async (event) => {
    if (
      this.props.detailDoctorFromParent &&
      this.props.detailDoctorFromParent !== -1
    ) {
      let doctorId = this.props.detailDoctorFromParent;
      let date = event.target.value;
      let res = await getScheduleDoctorByDate(doctorId, date);

      if (res && res.errCode === 0) {
        this.setState({
          availableTime: res.data ? res.data : [],
        });
      }
    }
  };

  render() {
    let { allDays, availableTime } = this.state;
    let { language } = this.props;

    return (
      <div className="doctor-schedules-container">
        <div className="all-schedules">
          <select onChange={(event) => this.HandleOnChangeSelect(event)}>
            {allDays &&
              allDays.length > 0 &&
              allDays.map((item, index) => {
                return (
                  <option value={item.value} key={index}>
                    {item.label}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="available-schedules">
          <div className="text-calender">
            <i className="fas fa-calendar-alt"></i>{" "}
            <span>
              <FormattedMessage id="patient.detail-doctor.schedule" />
            </span>
          </div>
          <div className="time-content">
            {availableTime && availableTime.length > 0 ? (
              <>
                <div className="time-content-btns">
                  {availableTime.map((item, index) => {
                    let timeDisplay =
                      language === LANGUAGES.VI
                        ? item.timeTypeData.value_Vi
                        : item.timeTypeData.value_En;

                    return (
                      <button
                        key={index}
                        className={
                          language === LANGUAGES.VI ? "btn-vi" : "btn-en"
                        }
                      >
                        {timeDisplay}
                      </button>
                    );
                  })}
                </div>

                <div className="book-free">
                  <span>
                    <FormattedMessage id="patient.detail-doctor.choose" />
                    <i className="far fa-hand-point-up"></i>
                    <FormattedMessage
                      id="patient.detail-doctor.book-free"
                      defaultMessage=" và đặt (Miễn phí)"
                    />
                  </span>
                </div>
              </>
            ) : (
              <div className="no-schedule">
                <FormattedMessage id="patient.detail-doctor.no-schedule" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedules);
