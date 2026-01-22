import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions/appActions";
import { withRouter } from "react-router";

import logo from "../../assets/Logo.svg";

class HomeHeader extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  returnToHome = () => {
    if (this.props.history) this.props.history.push("/home");
  };

  handleSpecialtyClick = () => {
    if (this.props.history) this.props.history.push("/specialty");
  };

  handleClinicClick = () => {
    if (this.props.history) this.props.history.push("/clinic");
  };
  handleViewTopDoctors = () => {
    if (this.props.history) this.props.history.push("/top-doctor");
  };
  render() {
    let language = this.props.language;

    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <div
                className="header-logo"
                onClick={() => this.returnToHome()}
              ></div>
            </div>
            <div className="center-content">
              <div
                className="child-content"
                onClick={this.handleSpecialtyClick}
                style={{ cursor: "pointer" }}
              >
                <div className="title">
                  <FormattedMessage id="home-header.speciality" />
                </div>
                <div className="sub-title">
                  <FormattedMessage id="home-header.search-doctor" />
                </div>
              </div>
              <div
                className="child-content"
                onClick={this.handleClinicClick}
                style={{ cursor: "pointer" }}
              >
                <div className="title">
                  <FormattedMessage id="home-header.medical-facility" />
                </div>
                <div className="sub-title">
                  <FormattedMessage id="home-header.choose-hospital-clinic" />
                </div>
              </div>
              <div
                className="child-content"
                onClick={this.handleViewTopDoctors}
                style={{ cursor: "pointer" }}
              >
                <div className="title">
                  <FormattedMessage id="home-header.doctor" />
                </div>
                <div className="sub-title">
                  <FormattedMessage id="home-header.choose-doctor" />
                </div>
              </div>
              <div className="child-content">
                <div className="title">
                  <FormattedMessage id="home-header.fee" />
                </div>
                <div className="sub-title">
                  <FormattedMessage id="home-header.check-health" />
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="far fa-question-circle"></i>
                <FormattedMessage id="home-header.support" />
              </div>
              <div
                className={language === LANGUAGES.VI ? "flag active" : "flag"}
                onClick={() => this.changeLanguage(LANGUAGES.VI)}
              >
                VN
              </div>
              <div
                className={language === LANGUAGES.EN ? "flag active" : "flag"}
                onClick={() => this.changeLanguage(LANGUAGES.EN)}
              >
                EN
              </div>
            </div>
          </div>
        </div>
        {this.props.isShowBanner === true && (
          <div className="home-header-banner">
            <div className="content-up">
              <div className="title1">
                <FormattedMessage id="banner.title1" />
              </div>
              <div className="title2">
                <FormattedMessage id="banner.title2" />
              </div>
              <div className="search-box">
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Tìm chuyên khoa, bác sĩ, bệnh viện..."
                />
              </div>
            </div>
            <div className="content-down">
              <div className="stats-glass-bar">
                <div className="stat-item">
                  <div className="stat-icon">
                    <i className="fas fa-hospital"></i>
                  </div>
                  <div className="stat-text">
                    <span className="stat-number">150+</span>
                    <span className="stat-label">
                      <FormattedMessage id="banner.child1" />
                    </span>
                  </div>
                </div>

                <div className="stat-divider"></div>

                {/* Item 2 */}
                <div className="stat-item">
                  <div className="stat-icon">
                    <i className="fas fa-user-md"></i> {/* Icon Bác sĩ */}
                  </div>
                  <div className="stat-text">
                    <span className="stat-number">1,500+</span>
                    <span className="stat-label">
                      <FormattedMessage id="banner.child6" />
                    </span>
                  </div>
                </div>

                <div className="stat-divider"></div>

                <div className="stat-item">
                  <div className="stat-icon">
                    <i className="fas fa-file-medical"></i>
                  </div>
                  <div className="stat-text">
                    <span className="stat-number">10k+</span>
                    <span className="stat-label">
                      <FormattedMessage id="banner.child4" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
  language: state.app.language,
});

const mapDispatchToProps = (dispatch) => ({
  changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader),
);