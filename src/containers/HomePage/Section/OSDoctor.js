import React, { Component } from 'react';
import { connect } from 'react-redux';

import specialtyImg from "../../../assets/doctor/105310-gs-ha-van-quyet.png";

import Slider from 'react-slick';

class OSDoctor extends Component {
  render() {
        return (
      <div className="section-share section-os-doctor">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Bác sĩ nổi bật</span>
            <button className="btn-section">Tìm kiếm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
             <div className="doctor-card">
                <div className="img-customize section-os-doctor">
                  <img src={specialtyImg} alt="Bác sĩ 1" />
                </div>
                <div className="position text-center">                
                  <div className="doctor-name">Tên Bác Sĩ</div>
                  <div className="doctor-title">Chức vụ</div>
                </div>
              </div>
             
              <div className="doctor-card">
                <div className="img-customize section-os-doctor">
                  <img src={specialtyImg} alt="Bác sĩ 1" />
                </div>
                <div className="position text-center">                
                  <div className="doctor-name">Tên Bác Sĩ 1</div>
                  <div className="doctor-title">Chức vụ</div>
                </div>
              </div>

              <div className="doctor-card">
                <div className="img-customize section-os-doctor">
                  <img src={specialtyImg} alt="Bác sĩ 1" />
                </div>
                <div className="position text-center">                
                  <div className="doctor-name">Tên Bác Sĩ 2</div>
                  <div className="doctor-title">Chức vụ</div>
                </div>
              </div>
                            <div className="doctor-card">
                <div className="img-customize section-os-doctor">
                  <img src={specialtyImg} alt="Bác sĩ 1" />
                </div>
                <div className="position text-center">                
                  <div className="doctor-name">Tên Bác Sĩ 3</div>
                  <div className="doctor-title">Chức vụ</div>
                </div>
              </div>
                            <div className="doctor-card">
                <div className="img-customize section-os-doctor">
                  <img src={specialtyImg} alt="Bác sĩ 1" />
                </div>
                <div className="position text-center">                
                  <div className="doctor-name">Tên Bác Sĩ 4</div>
                  <div className="doctor-title">Chức vụ</div>
                </div>
              </div>
                            <div className="doctor-card">
                <div className="img-customize section-os-doctor">
                  <img src={specialtyImg} alt="Bác sĩ 1" />
                </div>
                <div className="position text-center">                
                  <div className="doctor-name">Tên Bác Sĩ 5</div>
                  <div className="doctor-title">Chức vụ</div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OSDoctor);
