import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Slider from "react-slick";

import * as actions from "../../../store/actions";
import SectionItem from "./SectionItem";
import { FormattedMessage } from "react-intl";
import { path } from "utils";

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
    if (this.props.history) {
      this.props.history.push(`/detail-doctor/${doctor.id}`);
    }
  };

  handleViewAllDoctors = () => {
    if (this.props.history) {
      this.props.history.push(path.LIST_TOP_DOCTOR);
    }
  };

  render() {
    let { arrDoctors } = this.state;
    return (
      <div className="section-share section-os-doctor">
        <div className="booking-container">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">
                <FormattedMessage id="home-header.top-doctor" />
              </span>
              <button
                className="btn-section"
                onClick={this.handleViewAllDoctors}
              >
                <FormattedMessage id="home-header.see-more" />
              </button>
            </div>

            <div className="section-body">
              <Slider {...this.props.settings}>
                {arrDoctors &&
                  arrDoctors.length > 0 &&
                  arrDoctors.map((item, index) => {
                    return (
                      <SectionItem
                        key={index}
                        item={item}
                        onClick={this.handleViewDetailDoctor}
                        isCircular={true}
                        subTitle="Chuyên khoa"
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
    topDoctors: state.admin.topDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctorStart()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor)
);