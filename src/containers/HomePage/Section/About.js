import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import logo1 from "../../../assets/about/110757-dantrilogo.png"
import logo2 from "../../../assets/about/142415-logo-vnnet.png"
import logo3 from "../../../assets/about/vnexpress.png"
import logo4 from "../../../assets/about/vtv1.png"
import logo5 from "../../../assets/about/suckhoedoisong.png"
import logo6 from "../../../assets/about/165432-vtcnewslogosvg.png"

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-header">
          Truyền thông nói về BookingCare
        </div>
        <div className="section-about-content">
          <div className="content-left">
            <iframe
              width="587"
              height="330"
              src="https://www.youtube.com/embed/FyDQljKtWnI"
              title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>

          <div className="content-right">
            <div className="img-logo">
              <img src={logo1}></img>
            </div>
            <div className="img-logo">
              <img src={logo2}></img>
            </div>
            <div className="img-logo">
              <img src={logo3}></img>
            </div>
            <div className="img-logo">
              <img src={logo4}></img>
            </div>
            <div className="img-logo">
              <img src={logo5}></img>
            </div>
            <div className="img-logo">
              <img src={logo6}></img>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Redux
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
