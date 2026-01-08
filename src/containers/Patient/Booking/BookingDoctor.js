import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingDoctor.scss";
import { FormattedMessage } from "react-intl";
import HomeHeader from 'containers/HomePage/HomeHeader';
class BookingModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapShot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="booking-modal-container">
            <div className="booking-modal-content">
                <div className="doctor-info-section">
                    <div className="doctor-image">
                        <img src="https://via.placeholder.com/100" alt="Doctor Avatar" />
                    </div>
                    <div className="doctor-details">
                        <div className="title-booking">ĐẶT LỊCH KHÁM</div>
                        <div className="doctor-name">Phó Giáo Sư, Tiến Sĩ: Nguyễn Văn A</div>
                        <div className="time-booking">
                            <div> <i class="fas fa-calendar-alt"></i>09:00 - 10:00 - Thứ 4 - 15/07/2023</div>
                        </div>
                        <div className="name-clinic"><i class="fas fa-clinic-medical"></i>Bệnh viện Ung bướu Hưng Việt</div>
                        <div className="address-clinic">34 và 40 Đại Cồ Việt, Hai Bà Trưng, Hà Nội</div>
                    </div>
                </div>

                <div className="price-section">
                    Giá khám: <b>500.000 VND</b>
                </div>

                <div className="booking-modal-body">
                    <div className="row">
                        <div className="col-12 form-group">
                            <div className="input-icon-group">
                                <i class="fas fa-user"></i>
                                <input className="form-control" type="text" placeholder="Nhập họ tên..." />
                            </div>
                        </div>
                        <div className="col-12 form-group">
                            <div className="gender-options">
                                <label><input type="radio" name="gender" value="M" /> Nam</label>
                                <label style={{marginLeft: '20px'}}><input type="radio" name="gender" value="F" /> Nữ</label>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div ></div>
                        <div className="col-12 form-group">
                            <div className="input-icon-group">
                                <i class="fas fa-phone"></i>
                                <input className="form-control" type="text" placeholder="Nhập số điện thoại..." />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 form-group">
                            <div className="input-icon-group">
                                <i class="fas fa-envelope"></i>
                                <input className="form-control" type="email" placeholder="Nhập email..." />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 form-group">
                            <div className="input-icon-group">
                                <i class="fas fa-calendar-alt"></i>
                                <input className="form-control" type="date" /> 
                            </div>
                        </div>
                        
                        
                    </div>

                    <div className="row">
                        <div className="col-12 form-group">
                            <div className="input-icon-group">
                                <i class="fas fa-map-marker-alt"></i>
                                <select className="form-control">
                                    <option value="">-- Chọn Tỉnh/Thành --</option>
                                    <option value="HN">Hà Nội</option>
                                    <option value="HCM">TP. Hồ Chí Minh</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-12 form-group">
                            <div className="input-icon-group">
                                <i class="fas fa-map-marker-alt"></i>
                                <select className="form-control">
                                    <option value="">-- Chọn Quận/Huyện --</option>
                                    <option value="CauGiay">Quận Cầu Giấy</option>
                                    <option value="HoanKiem">Quận Hoàn Kiếm</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-12 form-group">
                            <div className="input-icon-group">
                                <i class="fas fa-map-marker-alt"></i>
                            <select className="form-control">
                                <option value="">-- Chọn Phường/Xã --</option>
                                <option value="YenHoa">Phường Yên Hòa</option>
                                <option value="DichVong">Phường Dịch Vọng</option>
                            </select>
                            </div>
                        </div>
                        
                        <div className="col-12 form-group">
                            <div className="input-icon-group">
                                <i class="fas fa-map-marker-alt"></i>
                                <input className="form-control" type="text" placeholder="Nhập địa chỉ cụ thể..." />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 form-group">
                            <div className="input-icon-group">
                                <i class="fas fa-plus-circle"></i>
                                <input className="form-control" type="text" placeholder="Mô tả triệu chứng..." />
                            </div>
                        </div>
                        <div className="col-12">
                            <label className="payment">Hình Thức Thanh Toán:</label>
                            <div className="payment-options">
                                <label><input type="radio" name="payment" value="Payment" /> Thanh Toán sau tại cơ sở y tế</label>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="more-info">
                    <div className="tag-price">                    
                        <span className="left">Giá Khám</span>
                        <span className="right">500.000 VND</span>
                    </div>
                    <div className="tag-price">                    
                        <span className="left">Phí Đặt Lịch</span>
                        <span className="right">Miễn Phí</span>
                    </div>
                    <div className="tag-price">                    
                        <span className="left">Tổng cộng</span>
                        <span className="right">500.000 VND</span>
                    </div>
                </div>
                <div className="note-booking">
                    <div className="note-title">Quý khách vui lòng điền đầy đủ thông tin để tiết kiệm thời gian làm thủ tục khám</div>

                    <div className="note-table">
                        <span className="note">LƯU Ý</span>
                        <p className="note-desc">
                            Thông tin anh/chị cung cấp sẽ được sử dụng làm hồ sơ khám bệnh, khi điền thông tin anh/chị vui lòng:
                        </p>
                        <ul className="note-list">
                            <li>
                                Ghi rõ họ và tên, viết hoa những chữ cái đầu tiên, ví dụ: <b>Trần Văn Phú</b>
                            </li>
                            <li>
                                Điền đầy đủ, đúng và vui lòng kiểm tra lại thông tin trước khi ấn "Xác nhận"
                            </li>
                        </ul>
                        </div>
                </div>
                    
                <div className="booking-modal-footer">
                    <button className="btn-booking-confirm col-12">Xác nhận đặt khám</button>
                </div>
                    </div>
            </div>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModel);
