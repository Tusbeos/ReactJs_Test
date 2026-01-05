import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfo.scss";


class DoctorExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isShowDetailInfo: false,
    };
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapShot) {
    if (this.props.language !== prevProps.language) {}
    }
 
showHideDetailInfo = (status) => {
    this.setState({
        isShowDetailInfo: status,
    });
}

  render() {
    let { isShowDetailInfo } = this.state;
    return (
      <div className="doctor-extra-info-container">
        <div className="content-up">
            <div className="text-address">Địa chỉ khám</div>
            <div className="name-clinic">Bệnh viện Quốc Tế City</div>
            <div className="detail-address">3 Đường Số 17A, phường An Lạc, Thành phố Hồ Chí Minh</div>
        </div>
        <div className="content-down">
            {isShowDetailInfo === false &&
            <>
                <div>GIÁ KHÁM: 500.000 VND.
                    <div className="short-info">
                        <span onClick={() => this.showHideDetailInfo(true)}>
                            Xem chi tiết
                        </span>
                    </div>
                </div>
            </>
            }
            {isShowDetailInfo === true &&
            <>
                <div className="tile-price">GIÁ KHÁM: </div>
                <div className="detail-price">
                <div className="price">
                    <span className="left">Giá Khám:</span>
                    <span className="right">500.000 VND</span>
                    <div className="note">Được ưu tiện khám trước khi đặt khám quá BookingCare.</div>
                </div>
                <div className="payment">Người bệnh có thể thanh toán bằng tiền mặt</div>
                </div>
                <div className="show-info">
                    <span onClick={() => this.showHideDetailInfo(false)}>
                        Ẩn giá khám
                        </span>
                    </div>
            </>
            }
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
