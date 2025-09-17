import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";

import specialtyImg from "../../../assets/specialty/co-xuong-khop.png";

class Specialty extends Component {
  render() {
    return (
      <div className="section-share section-specialty">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Chuyên Khoa</span>
            <button className="btn-section">Xem Thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="img-customize section-specialty">
                <img src={specialtyImg} alt="Cơ xương khớp 1" />
                <div>Cơ xương khớp 1</div>
              </div>

              <div className="img-customize section-specialty">
                <img src={specialtyImg} alt="Chuyên khoa 2" />
                <div>Chuyên khoa 2</div>
              </div>

              <div className="img-customize section-specialty">
                <img src={specialtyImg} alt="Chuyên khoa 3" />
                <div>Chuyên khoa 3</div>
              </div>

              <div className="img-customize section-specialty">
                <img src={specialtyImg} alt="Chuyên khoa 4" />
                <div>Chuyên khoa 4</div>
              </div>

              <div className="img-customize section-specialty">
                <img src={specialtyImg} alt="Chuyên khoa 5" />
                <div>Chuyên khoa 5</div>
              </div>

              <div className="img-customize section-specialty">
                <img src={specialtyImg} alt="Chuyên khoa 6" />
                <div>Chuyên khoa 6</div>
              </div>
            </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
