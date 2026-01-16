import React, { Component } from "react";
import { connect } from "react-redux";
import "./VerifyEmail.scss";
import { handleVerifyEmail } from "../../services/userService";

class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
      status:'LOADING',
      message:''    
    };
  }

  async componentDidMount() {
    if(this.props.location && this.props.location.search) {
      let urlParams = new URLSearchParams(this.props.location.search);
      let token = urlParams.get('token');
      let doctorId = urlParams.get('doctorId');
      let res = await handleVerifyEmail({
        token: token,
        doctorId: doctorId
      })
      if(res && res.errCode === 0) {
        this.setState({
          statusVerify: true
        })
      }setTimeout(() => {
                this.setState({ status: 'SUCCEEDED' });
            }, 1500);

        } else {
            this.setState({ 
                status: 'FAILED',
                message: 'Lỗi xác thực. Vui lòng thử lại sau.'
            });
        }
  }
  async componentDidUpdate(prevProps, prevState, snapShot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    const { status, message } = this.state;
    return (
            <div className="verify-container">
                <div className="verify-card">
                    {status === 'LOADING' && (
                        <div className="status-box loading">
                            <div className="spinner"></div>
                            <div className="text">Đang xác thực lịch hẹn...</div>
                        </div>
                    )}
                    {status === 'SUCCEEDED' && (
                        <div className="status-box success">
                            <i className="fas fa-check-circle icon-success"></i>
                            <div className="title">Xác nhận thành công!</div>
                            <div className="text">Cảm ơn bạn đã xác nhận. Lịch hẹn của bạn đã được ghi nhận vào hệ thống.</div>
                        </div>
                    )}

                    {status === 'FAILED' && (
                        <div className="status-box failed">
                            <i className="fas fa-exclamation-triangle icon-failed"></i>
                            <div className="title">Xác nhận thất bại!</div>
                            <div className="text">{message ? message : 'Token không hợp lệ hoặc lịch hẹn đã được xác nhận.'}</div>
                        </div>
                    )}
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
