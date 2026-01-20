import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import { withRouter } from "react-router";
import { FormattedMessage } from "react-intl";
import { handleGetAllClinics } from "../../../services/clinicService";

// Import Component chung
import SectionItem from "./SectionItem";

class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinics: [],
    };
  }

  componentDidMount() {
    this.getAllClinics();
  }

  getAllClinics = async () => {
    let res = await handleGetAllClinics();
    if (res && res.errCode === 0) {
      this.setState({
        dataClinics: res.data ? res.data : [],
      });
    }
  };

  handleViewDetailClinic = (clinic) => {
    if (this.props.history) {
      this.props.history.push(`/clinic/detail-clinic/${clinic.id}`);
    }
  };

  render() {
    let { dataClinics } = this.state;

    return (
      <div className="section-share section-medical-facility">
        <div className="booking-container">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">
                <FormattedMessage id="home-header.medical-facility" />
              </span>
              <button className="btn-section">
                <FormattedMessage id="home-header.see-more" />
              </button>
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
                        isCircular={false}
                        onClick={this.handleViewDetailClinic}
                      />
                    );
                  })}
              </Slider>
            </div>
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