import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "containers/HomePage/HomeHeader";
import "./DetailClinic.scss";
import { LANGUAGES } from "utils";
import { getDetailClinicById } from "../../../services/clinicService";
import { getBase64FromBuffer } from "../../../utils/CommonUtils";

class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clinic: {},
      notFound: false,
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      try {
        let res = await getDetailClinicById(id);
        if (res && res.errCode === 0 && res.data) {
          this.setState({ clinic: res.data, notFound: false });
        } else {
          this.setState({ notFound: true });
        }
      } catch (e) {
        this.setState({ notFound: true });
      }
    } else {
      this.setState({ notFound: true });
    }
  }

  handleAgentBooking = () => {
    alert("Mở modal đặt lịch cho khách hàng (Agent Mode)");
  };

  render() {
    const { clinic, notFound } = this.state;

    if (notFound) {
      return (
        <div className="detail-clinic-wrapper">
          <HomeHeader />
          <div className="not-found-msg">Không tìm thấy phòng khám.</div>
        </div>
      );
    }

    // Xử lý ảnh sử dụng hàm CommonUtils
    let coverUrl = getBase64FromBuffer(clinic.imageCover);
    let logoUrl = getBase64FromBuffer(clinic.image);

    return (
      <div className="detail-clinic-wrapper">
        <HomeHeader />

        {/* 1. HERO BANNER SECTION (Giống BookingCare) */}
        <div className="clinic-hero-container">
          <div
            className="hero-cover"
            style={{ backgroundImage: `url(${coverUrl})` }}
          >
            {/* Lớp phủ đen mờ để chữ trắng nổi bật */}
            <div className="overlay-gradient"></div>

            {/* Nội dung đè lên banner */}
            <div className="hero-content booking-container">
              <div className="profile-box">
                <div
                  className="clinic-logo"
                  style={{ backgroundImage: `url(${logoUrl})` }}
                ></div>
                <div className="clinic-info-header">
                  <h1 className="clinic-name-hero">{clinic.name}</h1>
                  <p className="clinic-addr-hero">
                    <i className="fas fa-map-marker-alt"></i> {clinic.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. NAVIGATION TABS (Thanh menu trắng dưới banner) */}
        <div className="clinic-nav-tabs">
          <div className="booking-container">
            <div className="tab-list">
              <span className="tab-item active">Giới thiệu</span>
              <span className="tab-item">Thế mạnh chuyên môn</span>
              <span className="tab-item">Trang thiết bị</span>
              <span className="tab-item">Quy trình khám</span>
            </div>
          </div>
        </div>

        {/* 3. MAIN CONTENT (Nền xám nhạt) */}
        <div className="clinic-body-section">
          <div className="booking-container">
            {/* Box giới thiệu vàng - chuẩn style BookingCare */}
            <div className="intro-section">
              <div className="notice-box-yellow">
                <strong>BookingCare</strong> là Nền tảng Y tế chăm sóc sức khỏe
                toàn diện hàng đầu Việt Nam, kết nối người dùng với trên 200
                bệnh viện - phòng khám uy tín.
              </div>

              <div className="info-box-blue">
                <p>
                  Từ nay, người bệnh có thể đặt lịch tại{" "}
                  <strong>{clinic.name}</strong> thông qua hệ thống BookingCare.
                </p>
                <ul>
                  <li>
                    Được lựa chọn các giáo sư, tiến sĩ, bác sĩ chuyên khoa giàu
                    kinh nghiệm
                  </li>
                  <li>
                    Hỗ trợ đặt khám trực tuyến trước khi đi khám (miễn phí đặt
                    lịch)
                  </li>
                </ul>
              </div>
            </div>

            {/* Nội dung HTML từ server */}
            <div className="clinic-html-content">
              {clinic.descriptionHTML && (
                <div
                  dangerouslySetInnerHTML={{ __html: clinic.descriptionHTML }}
                ></div>
              )}
            </div>
          </div>
        </div>

        {/* 4. AGENT STICKY FOOTER (Thanh công cụ dính dưới đáy) */}
        <div className="agent-sticky-footer">
          <div className="booking-container footer-content">
            <div className="agent-info">
              <div className="agent-stat">
                <span className="label">Hoa hồng Agent:</span>
                <span className="value highlight">15%</span>
              </div>
              <div className="vr-line"></div>
              <div className="agent-stat">
                <span className="label">Suất hôm nay:</span>
                <span className="value">12 suất</span>
              </div>
            </div>

            <div className="agent-actions">
              <button className="btn-support">
                <i className="fas fa-phone-alt"></i> Hỗ trợ
              </button>
              <button
                className="btn-book-now"
                onClick={this.handleAgentBooking}
              >
                Tạo Lịch Khám (Agent)
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
});

export default connect(mapStateToProps)(DetailClinic);
