import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { lang } from "moment";
import { FormattedMessage } from "react-intl";
class HomeHeader extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i class="fas fa-bars"></i>
              <div className="header-logo"></div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <>
                  <b>
                    <FormattedMessage id="home-header.speciality" />
                  </b>
                </>
                <div className="subs-title">
                  <FormattedMessage id="home-header.search-doctor" />
                </div>
              </div>
              <div className="child-content">
                <>
                  <b>
                    <FormattedMessage id="home-header.medical-facility" />
                  </b>
                </>
                <div className="subs-title">
                  <FormattedMessage id="home-header.choose-hospital-clinic" />
                </div>
              </div>
              <div className="child-content">
                <>
                  <b>
                    <FormattedMessage id="home-header.doctor" />
                  </b>
                </>
                <div className="subs-title">
                  <FormattedMessage id="home-header.choose-doctor" />
                </div>
              </div>
              <div className="child-content">
                <>
                  <b>
                    <FormattedMessage id="home-header.fee" />
                  </b>
                </>
                <div className="subs-title">
                  <FormattedMessage id="home-header.check-health" />
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i class="far fa-question-circle"></i>
                <FormattedMessage id="home-header.support" />
              </div>
              <div className="language-vi">VN</div>
              <div className="language-en">EN</div>
            </div>
          </div>
        </div>
        <div className="home-header-banner">
          <div className="content-up">
            <div className="title1">
              <FormattedMessage id="banner.title1" />
            </div>
            <div className="title2">
              {" "}
              <FormattedMessage id="banner.title2" />
            </div>
            <div className="search">
              <i class="fas fa-search"></i>
              <input className="search-input"></input>
            </div>
          </div>
          <div className="content-down">
            <div className="options">
              <div className="option-child">
                <div className="icon-child">
                  <i class="far fa-hospital"></i>
                </div>
                <div className="text-child">
                  {" "}
                  <FormattedMessage id="banner.child1" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i class="fa-solid fa-mobile-screen-button"></i>
                </div>
                <div className="text-child">
                  {" "}
                  <FormattedMessage id="banner.child2" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i class="fas fa-stethoscope"></i>
                </div>
                <div className="text-child">
                  {" "}
                  <FormattedMessage id="banner.child3" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i class="fa fa-microscope"></i>
                </div>
                <div className="text-child">
                  {" "}
                  <FormattedMessage id="banner.child4" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i class="fas fa-brain"></i>
                </div>
                <div className="text-child">
                  {" "}
                  <FormattedMessage id="banner.child5" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i class="fa-solid fa-user-doctor"></i>
                </div>
                <div className="text-child">
                  {" "}
                  <FormattedMessage id="banner.child6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
