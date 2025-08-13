import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="login_background">
        <div className="login-container">
          <div className="login-content">
            <div className="col-12 text-login">Login</div>
            <div className="col-12 form-group input-login">
              <label>Username</label>
              <input
                type="text"
                className="form-control login"
                placeholder="Enter Your Username"
              ></input>
            </div>
            <div className="col-12 form-group input-login">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter Your Password"
              ></input>
            </div>
            <div className="col-12">
              <button className="btn-login ">Login</button>
            </div>
            <div className="col-12 forgot-password;">
              <span>Forgot your password!</span>
            </div>
            <div className="col-12 text-center mt-3">
              <span className="text-other-login text-center">
                Or Login with:
              </span>
            </div>
            <div className="col-12 social-login">
              <i className="fab fa-google"></i>
              <i class="fab fa-facebook-f"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    adminLoginSuccess: (adminInfo) =>
      dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
