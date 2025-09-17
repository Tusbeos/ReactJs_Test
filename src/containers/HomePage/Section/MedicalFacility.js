import React, { Component } from 'react';
import { connect } from 'react-redux';

import specialtyImg from "../../../assets/medical-facility/header-background.jpg";

import Slider from 'react-slick';

class MedicalFacility extends Component {
  render() {
        return (
      <div className="section-share section-medical-facility">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Cơ sở ý tế</span>
            <button className="btn-section">Tìm kiếm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="img-customize section-medical-facility">
                <img src={specialtyImg} alt="Bệnh viện 1" />
                <div>Bệnh viện 1</div>
              </div>

              <div className="img-customize section-medical-facility">
                <img src={specialtyImg} alt="Bệnh viện 2" />
                <div>Bệnh viện 2</div>
              </div>

              <div className="img-customize section-medical-facility">
                <img src={specialtyImg} alt="Bệnh viện 3" />
                <div>Bệnh viện 3</div>
              </div>

              <div className="img-customize section-medical-facility">
                <img src={specialtyImg} alt="Bệnh viện 4" />
                <div>Bệnh viện 4</div>
              </div>

              <div className="img-customize section-medical-facility">
                <img src={specialtyImg} alt="Bệnh viện 5" />
                <div>Bệnh viện 5</div>
              </div>

              <div className="img-customize section-medical-facility">
                <img src={specialtyImg} alt="Bệnh viện 6" />
                <div>Bệnh viện 6</div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
