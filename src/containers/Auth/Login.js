import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import "./Login.scss";
// import { FormattedMessage } from "react-intl"; // chưa dùng có thể xoá
import { handleLoginApi } from "../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      showPassword: false,
      errMessage: "",
    };
  }

  handleOnChangeUsername = (e) => {
    this.setState({ username: e.target.value });
  };
  handleOnChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  handleLogin = async () => {
    this.setState({ errMessage: "" });
    try {
      const { username, password } = this.state;
      const data = await handleLoginApi(username, password);

      if (!data || data.errCode !== 0) {
        return this.setState({ errMessage: data?.message || "Login failed" });
      }

      // ✅ gọi qua props
      this.props.userLoginSuccess(data.user);
      console.log("Login success");
      // (tuỳ chọn) điều hướng:
      // this.props.navigate("/");

    } catch (e) {
      const msg =
        e?.response?.data?.message ||
        e?.message ||
        "Something went wrong. Please try again.";
      this.setState({ errMessage: msg });
      console.log("login error:", e);
    }
  };

  handleOnChangeIconEyes = () => {
    this.setState((s) => ({ showPassword: !s.showPassword }));
  };

  render() {
    const { username, password, showPassword, errMessage } = this.state;

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
                value={username}
                onChange={this.handleOnChangeUsername}
              />
            </div>

            <div className="col-12 form-group input-login">
              <label>Password</label>
              <div className="custom-input-password">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={this.handleOnChangePassword}
                />
                <span onClick={this.handleOnChangeIconEyes}>
                  <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"} />
                </span>
              </div>
            </div>

            <div className="col-12" style={{ color: "red" }}>
              {errMessage}
            </div>

            <div className="col-12">
              <button className="btn-login" onClick={this.handleLogin}>
                Login
              </button>
            </div>

            <div className="col-12 forgot-password">
              <span>Forgot your password!</span>
            </div>

            <div className="col-12 text-center mt-3">
              <span className="text-other-login text-center">Or Login with:</span>
            </div>

            <div className="col-12 social-login">
              <i className="fab fa-google"></i>
              {/* ✅ class -> className */}
              <i className="fab fa-facebook-f"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
});

const mapDispatchToProps = (dispatch) => ({
  navigate: (path) => dispatch(push(path)),
  userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
