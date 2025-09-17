import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";

import SpecialtyImg from "../../../assets/handbook/handbook-1.jpg";

class Handbook extends Component {
  render() {
    return (
      <div className="section-share section-handbook">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Cẩm nang</span>
            <button className="btn-section">Tất cả bài viết</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="img-customize section-handbook">
                <img src={SpecialtyImg} alt="Cơ xương khớp 1" />
                <div>Cơ xương khớp 1</div>
              </div>

              <div className="img-customize section-handbook">
                <img src={SpecialtyImg} alt="Chuyên khoa 2" />
                <div>Chuyên khoa 2</div>
              </div>

              <div className="img-customize section-handbook">
                <img src={SpecialtyImg} alt="Chuyên khoa 3" />
                <div>Chuyên khoa 3</div>
              </div>

              <div className="img-customize section-handbook">
                <img src={SpecialtyImg} alt="Chuyên khoa 4" />
                <div>Chuyên khoa 4</div>
              </div>

              <div className="img-customize section-handbook">
                <img src={SpecialtyImg} alt="Chuyên khoa 5" />
                <div>Chuyên khoa 5</div>
              </div>

              <div className="img-customize section-handbook">
                <img src={SpecialtyImg} alt="Chuyên khoa 6" />
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

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
