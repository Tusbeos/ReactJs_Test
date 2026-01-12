import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingDoctor.scss";
import { LANGUAGES } from "utils";
import moment from "moment";
import { NumericFormat } from "react-number-format";
import { FormattedMessage } from "react-intl";
import HomeHeader from "containers/HomePage/HomeHeader";
import { getDetailInfoDoctor } from "../../../services/userService";
class BookingModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
      timeBooking: {},
      doctorInfo: {},
    };
  }

  async componentDidMount() {
    if (this.props.location && this.props.location.state) {
      let { id } = this.props.match.params;
      let { dataTime } = this.props.location.state;
      try {
        const time = dataTime;
        const res = await getDetailInfoDoctor(id);
        if (res && res.errCode === 0) {
          this.setState({
            doctorInfo: res.data.DoctorInfo,
            timeBooking: time,
            detailDoctor: res.data,
          });
        }
      } catch (e) {}
    }
  }

  async componentDidUpdate(prevProps, prevState, snapShot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  renderTimeBooking = (timeBooking) => {
    let { language } = this.props;
    if (timeBooking && timeBooking.timeTypeData) {
      let time =
        language === LANGUAGES.VI
          ? timeBooking.timeTypeData.value_Vi
          : timeBooking.timeTypeData.value_En;
      let dateResult = "";
      if (timeBooking.date) {
        let startTime = +timeBooking.date;
        let dateFormatted = moment(startTime).format("DD/MM/YYYY");
        if (language === LANGUAGES.VI) {
          let dayNumber = moment(startTime).day();
          let days = [
            "Chủ Nhật",
            "Thứ 2",
            "Thứ 3",
            "Thứ 4",
            "Thứ 5",
            "Thứ 6",
            "Thứ 7",
          ];
          let dayName = days[dayNumber];
          dateResult = `${dayName} - ${dateFormatted}`;
        } else {
          let dayNameEn = moment(startTime).locale("en").format("dddd");
          dateResult = `${dayNameEn} - ${dateFormatted}`;
        }
      }
      return `${time} - ${dateResult}`;
    }
    return "";
  };

  getDoctorImage = (detailDoctor) => {
    if (detailDoctor && detailDoctor.image) {
      return `url(data:image/png;base64,${detailDoctor.image})`;
    }
    return "none";
  };

  render() {
    let { language } = this.props;
    let { detailDoctor, timeBooking, doctorInfo } = this.state;
    let nameVi = "";
    let nameEn = "";
    if (detailDoctor && detailDoctor.positionData) {
      nameVi = `${detailDoctor.positionData.value_Vi}, ${detailDoctor.roleData.value_Vi}  ${detailDoctor.lastName} ${detailDoctor.firstName}`;
      nameEn = `${detailDoctor.positionData.value_En}, ${detailDoctor.roleData.value_En} ${detailDoctor.firstName} ${detailDoctor.lastName}`;
    }

    console.log("check props booking modal", this.state);
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="booking-modal-container">
          <div className="booking-modal-content">
            <div className="doctor-info-section">
              <div
                className="doctor-image"
                style={{
                  backgroundImage: this.getDoctorImage(detailDoctor),
                }}
              ></div>
              <div className="doctor-details">
                <div className="title-booking">ĐẶT LỊCH KHÁM</div>
                <div className="doctor-name">
                  <div className="up">
                    {language === LANGUAGES.VI ? nameVi : nameEn}
                  </div>
                </div>
                <div className="time-booking">
                  <div>
                    <i className="fas fa-calendar-alt"></i>
                    {this.renderTimeBooking(timeBooking)}
                  </div>
                </div>
                <div className="name-clinic">
                  <i class="fas fa-clinic-medical"></i>
                  {doctorInfo && doctorInfo.nameClinic
                    ? doctorInfo.nameClinic
                    : ""}
                </div>
                <div className="address-clinic">
                  {doctorInfo && doctorInfo.addressClinic
                    ? doctorInfo.addressClinic
                    : ""}
                </div>
              </div>
            </div>

            <div className="price-section">
              <label className="price-box">
                <div>
                  <input type="radio" name="payment" value="Payment" />
                  &nbsp;Giá Khám:{""}
                </div>
                <div>
                  {doctorInfo &&
                    doctorInfo.priceTypeData &&
                    language === LANGUAGES.VI && (
                      <NumericFormat
                        className="currency"
                        value={doctorInfo.priceTypeData.value_Vi}
                        thousandsGroupStyle="thousand"
                        thousandSeparator=","
                        suffix="đ"
                        displayType="text"
                      />
                    )}
                  {doctorInfo &&
                    doctorInfo.priceTypeData &&
                    language === LANGUAGES.EN && (
                      <NumericFormat
                        className="currency"
                        value={doctorInfo.priceTypeData.value_En}
                        thousandsGroupStyle="thousand"
                        thousandSeparator=","
                        suffix="$"
                        displayType="text"
                      />
                    )}
                </div>
              </label>
            </div>

            <div className="booking-modal-body">
              <div className="row">
                <div className="col-12 form-group">
                  <div className="input-icon-group">
                    <i class="fas fa-user"></i>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Nhập họ tên..."
                    />
                  </div>
                </div>
                <div className="col-12 form-group">
                  <div className="gender-options">
                    <label>
                      <input type="radio" name="gender" value="M" /> Nam
                    </label>
                    <label style={{ marginLeft: "20px" }}>
                      <input type="radio" name="gender" value="F" /> Nữ
                    </label>
                  </div>
                </div>
              </div>

              <div className="row">
                <div></div>
                <div className="col-12 form-group">
                  <div className="input-icon-group">
                    <i class="fas fa-phone"></i>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Nhập số điện thoại..."
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12 form-group">
                  <div className="input-icon-group">
                    <i class="fas fa-envelope"></i>
                    <input
                      className="form-control"
                      type="email"
                      placeholder="Nhập email..."
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12 form-group">
                  <div className="input-icon-group">
                    <i class="fas fa-calendar-alt"></i>
                    <input className="form-control" type="date" />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12 form-group">
                  <div className="input-icon-group">
                    <i class="fas fa-map-marker-alt"></i>
                    <select className="form-control">
                      <option value="">-- Chọn Tỉnh/Thành --</option>
                      <option value="HN">Hà Nội</option>
                      <option value="HCM">TP. Hồ Chí Minh</option>
                    </select>
                  </div>
                </div>

                <div className="col-12 form-group">
                  <div className="input-icon-group">
                    <i class="fas fa-map-marker-alt"></i>
                    <select className="form-control">
                      <option value="">-- Chọn Quận/Huyện --</option>
                      <option value="CauGiay">Quận Cầu Giấy</option>
                      <option value="HoanKiem">Quận Hoàn Kiếm</option>
                    </select>
                  </div>
                </div>

                <div className="col-12 form-group">
                  <div className="input-icon-group">
                    <i class="fas fa-map-marker-alt"></i>
                    <select className="form-control">
                      <option value="">-- Chọn Phường/Xã --</option>
                      <option value="YenHoa">Phường Yên Hòa</option>
                      <option value="DichVong">Phường Dịch Vọng</option>
                    </select>
                  </div>
                </div>

                <div className="col-12 form-group">
                  <div className="input-icon-group">
                    <i class="fas fa-map-marker-alt"></i>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Nhập địa chỉ cụ thể..."
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12 form-group">
                  <div className="input-icon-group">
                    <i class="fas fa-plus-circle"></i>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Mô tả triệu chứng..."
                    />
                  </div>
                </div>
                <div className="col-12">
                  <label className="payment">Hình Thức Thanh Toán:</label>
                  <div className="payment-options">
                    <label>
                      <input type="radio" name="payment" value="Payment" />{" "}
                      &nbsp;Thanh Toán sau tại cơ sở y tế
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="more-info">
              <div className="tag-price">
                <span className="left">Giá Khám</span>
                <span className="right">
                  {" "}
                  <div>
                    {doctorInfo &&
                      doctorInfo.priceTypeData &&
                      language === LANGUAGES.VI && (
                        <NumericFormat
                          className="currency"
                          value={doctorInfo.priceTypeData.value_Vi}
                          thousandsGroupStyle="thousand"
                          thousandSeparator=","
                          suffix="đ"
                          displayType="text"
                        />
                      )}
                    {doctorInfo &&
                      doctorInfo.priceTypeData &&
                      language === LANGUAGES.EN && (
                        <NumericFormat
                          className="currency"
                          value={doctorInfo.priceTypeData.value_En}
                          thousandsGroupStyle="thousand"
                          thousandSeparator=","
                          suffix="$"
                          displayType="text"
                        />
                      )}
                  </div>
                </span>
              </div>
              <div className="tag-price">
                <span className="left">Phí Đặt Lịch</span>
                <span className="right">Miễn Phí</span>
              </div>
              <div className="tag-price">
                <span className="left">Tổng cộng</span>
                <span className="right text-danger">
                  {" "}
                  <div>
                    {doctorInfo &&
                      doctorInfo.priceTypeData &&
                      language === LANGUAGES.VI && (
                        <NumericFormat
                          className="currency"
                          value={doctorInfo.priceTypeData.value_Vi}
                          thousandsGroupStyle="thousand"
                          thousandSeparator=","
                          suffix="đ"
                          displayType="text"
                        />
                      )}
                    {doctorInfo &&
                      doctorInfo.priceTypeData &&
                      language === LANGUAGES.EN && (
                        <NumericFormat
                          className="currency"
                          value={doctorInfo.priceTypeData.value_En}
                          thousandsGroupStyle="thousand"
                          thousandSeparator=","
                          suffix="$"
                          displayType="text"
                        />
                      )}
                  </div>
                </span>
              </div>
            </div>
            <div className="note-booking">
              <div className="note-title">
                Quý khách vui lòng điền đầy đủ thông tin để tiết kiệm thời gian
                làm thủ tục khám
              </div>

              <div className="note-table">
                <span className="note">LƯU Ý</span>
                <p className="note-desc">
                  Thông tin anh/chị cung cấp sẽ được sử dụng làm hồ sơ khám
                  bệnh, khi điền thông tin anh/chị vui lòng:
                </p>
                <ul className="note-list">
                  <li>
                    Ghi rõ họ và tên, viết hoa những chữ cái đầu tiên, ví dụ:{" "}
                    <b>Trần Văn Phú</b>
                  </li>
                  <li>
                    Điền đầy đủ, đúng và vui lòng kiểm tra lại thông tin trước
                    khi ấn "Xác nhận"
                  </li>
                </ul>
              </div>
            </div>

            <div className="booking-modal-footer">
              <button className="btn-booking-confirm col-12">
                Xác nhận đặt khám
              </button>
            </div>
          </div>
        </div>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModel);
