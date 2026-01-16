import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import { withRouter } from "react-router";

// Import Component chung
import SectionItem from "./SectionItem";

class MedicalFacility extends Component {
  // Hàm chuyển hướng khi click vào cơ sở y tế
  handleViewDetailClinic = (clinic) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${clinic.id}`);
    }
  };

  render() {
    // Lấy dữ liệu từ props (được truyền từ HomePage hoặc Redux)
    let { dataClinics } = this.props;

    return (
      <div className="section-share section-medical-facility">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Cơ sở y tế nổi bật</span>
            <button className="btn-section">Tìm kiếm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {dataClinics &&
                dataClinics.length > 0 &&
                dataClinics.map((item, index) => {
                  return (
                    <SectionItem
                      key={index}
                      item={item}
                      isCircular={false} // Cơ sở y tế dùng ảnh chữ nhật
                      onClick={this.handleViewDetailClinic}
                    />
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
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);