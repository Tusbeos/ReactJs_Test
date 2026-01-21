import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "containers/HomePage/HomeHeader";
import "./DetailClinic.scss";
import { LANGUAGES } from "utils";
import { getDetailClinicById } from "../../../services/clinicService";
import { getDoctorsByClinicId } from "../../../services/doctorService";
import { getBase64FromBuffer } from "../../../utils/CommonUtils";
import DoctorCard from "../../../components/Patient/DoctorCard";

class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clinic: {},
      notFound: false,
      doctorIds: [],
    };

    this.sectionRefs = {
      intro: React.createRef(),
      doctors: React.createRef(),
    };
    this.contentRef = React.createRef();
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

        const doctorRes = await getDoctorsByClinicId(id);
        if (
          doctorRes &&
          doctorRes.errCode === 0 &&
          Array.isArray(doctorRes.data)
        ) {
          this.setState({ doctorIds: doctorRes.data });
        } else {
          this.setState({ doctorIds: [] });
        }
      } catch (e) {
        this.setState({ notFound: true });
      }
    } else {
      this.setState({ notFound: true });
    }
  }

  handleScrollTo = (key) => {
    const offset = 80;

    if (key === "intro" || key === "doctors") {
      const el = document.getElementById(key);
      if (el) {
        const top =
          el.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: "smooth" });
        return;
      }
    }

    const container = this.contentRef && this.contentRef.current;
    if (container) {
      const selector = "h2, h3, h4, strong";
      const nodes = Array.from(container.querySelectorAll(selector));
      const keyword = key === "equipment" ? "trang thiết bị" : "quy trình";

      const target = nodes.find((node) => {
        const text = (node.textContent || "").toLowerCase();
        return text.includes(keyword);
      });

      const scrollTarget = target || container;
      const top =
        scrollTarget.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  render() {
    const { clinic, notFound, doctorIds } = this.state;

    if (notFound) {
      return (
        <div className="detail-clinic-wrapper">
          <HomeHeader />
          <div className="not-found-msg">Không tìm thấy phòng khám.</div>
        </div>
      );
    }
    let coverUrl = getBase64FromBuffer(clinic.imageCover);
    let logoUrl = getBase64FromBuffer(clinic.image);

    return (
      <div className="detail-clinic-wrapper">
        <HomeHeader />
        <div className="clinic-hero-container">
          <div
            className="hero-cover"
            style={{ backgroundImage: `url(${coverUrl})` }}
          >
            <div className="overlay-gradient"></div>

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
        <div className="clinic-nav-tabs">
          <div className="booking-container">
            <div className="tab-list">
              <span
                className="tab-item active"
                onClick={() => this.handleScrollTo("intro")}
              >
                Giới thiệu
              </span>
              <span
                className="tab-item"
                onClick={() => this.handleScrollTo("doctors")}
              >
                Thế mạnh chuyên môn
              </span>
              <span
                className="tab-item"
                onClick={() => this.handleScrollTo("equipment")}
              >
                Trang thiết bị
              </span>
              <span
                className="tab-item"
                onClick={() => this.handleScrollTo("process")}
              >
                Quy trình khám
              </span>
            </div>
          </div>
        </div>
        <div className="clinic-body-section">
          <div className="booking-container">
            <div
              className="intro-section"
              ref={this.sectionRefs.intro}
              id="intro"
            >
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

            <div ref={this.sectionRefs.doctors} id="doctors">
              <DoctorCard
                clinicId={clinic && clinic.id ? clinic.id : null}
                doctorIds={doctorIds}
              />
            </div>

            <div className="clinic-html-content" ref={this.contentRef}>
              {clinic.descriptionHTML && (
                <div
                  dangerouslySetInnerHTML={{ __html: clinic.descriptionHTML }}
                ></div>
              )}
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
