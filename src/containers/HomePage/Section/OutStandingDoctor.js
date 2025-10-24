import React, { Component } from 'react';
import { connect } from "react-redux";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { Buffer } from "buffer";
import { withRouter } from 'react-router';

class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }
  componentDidMount() {
    this.props.loadTopDoctors();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctors !== this.props.topDoctors) {
      this.setState({
        arrDoctors: this.props.topDoctors,
      });
    }
  }
  handleViewDetailDoctor = (doctor) => {
  this.props.history.push(`/detail-doctor/${doctor.id}`)
  };
   
  render() {
    let language = this.props.language;
    let { arrDoctors } = this.state;
    return (
      <div className="section-share">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Bác sĩ nổi bật</span>
            <button className="btn-section">Tìm kiếm</button>
          </div>
          <div
            className="section-body section-os-doctor"
          >
            <Slider {...this.props.settings}>
              {arrDoctors &&
                arrDoctors.length > 0 &&
                arrDoctors.map((item, index) => {
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = Buffer.from(item.image, "base64").toString(
                      "base64"
                    );
                    imageBase64 = `data:image/jpeg;base64,${imageBase64}`;
                  }
                  let nameVi = `${item.positionData.value_Vi}, ${item.lastName} ${item.firstName}`;
                  let nameEn = `${item.positionData.value_En}, ${item.firstName} ${item.lastName}`;
                  return (
                    <div className="doctor-card" 
                    onClick={() => this.handleViewDetailDoctor(item)}
                    >
                      <div
                        className="img-customize section-os-doctor"
                        style={{
                          backgroundImage: `url(${imageBase64})`,
                        }}
                      ></div>
                      <div className="position text-center">
                        <div className="doctor-name">
                          <span>{language === LANGUAGES.VI ? nameVi : nameEn}</span>
                        </div>
                        <div className="doctor-specialty"> <span>Chuyên Khoa</span></div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    topDoctors: state.admin.topDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctorStart()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
