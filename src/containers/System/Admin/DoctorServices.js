import React, { Component } from 'react';
import { connect } from "react-redux";
import "./DoctorServices.scss";
import * as actions from "../../../store/actions";
import { LANGUAGES } from '../../../utils'; // Đã bỏ comment để fix lỗi
import { toast } from "react-toastify";
import { getAllDoctorServices } from "../../../services/doctorService";

class DoctorServices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrServices: [
                {
                    nameVi: "",
                    nameEn: "",
                    price: "",
                    descriptionVi: "",
                    descriptionEn: "",
                },
            ],
        };
    }

    componentDidMount() {
        if (this.props.doctorIdFromParent) {
            this.fetchDataServices(this.props.doctorIdFromParent);
        }
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
            if (this.props.doctorIdFromParent) {
                this.fetchDataServices(this.props.doctorIdFromParent);
            } else {
                // Reset về mảng rỗng có 1 phần tử trắng khi không có bác sĩ
                this.setState({
                    arrServices: [{
                        nameVi: "", nameEn: "", price: "", descriptionVi: "", descriptionEn: "",
                    }],
                });
            }
        }
    }

    fetchDataServices = async (doctorId) => {
        try {
            let res = await getAllDoctorServices(doctorId);
            if (res && res.errCode === 0 && res.data && res.data.length > 0) {
                this.setState({ arrServices: res.data });
            } else {
                this.setState({
                    arrServices: [{
                        nameVi: "", nameEn: "", price: "", descriptionVi: "", descriptionEn: "",
                    }],
                });
            }
        } catch (e) {
            console.log(e);
        }
    };

    handleOnChangeInput = (event, index, key) => {
        let data = [...this.state.arrServices];
        data[index][key] = event.target.value;
        this.setState({ arrServices: data });
    };

    handleAddNewRow = () => {
        let newRow = { nameVi: "", nameEn: "", price: "", descriptionVi: "", descriptionEn: "" };
        this.setState({
            arrServices: [...this.state.arrServices, newRow],
        });
    };

    handleRemoveRow = (index) => {
        let data = [...this.state.arrServices];
        if (data.length === 1) {
            // Nếu còn 1 dòng thì chỉ xóa data, không xóa dòng
            data[0] = { nameVi: "", nameEn: "", price: "", descriptionVi: "", descriptionEn: "" };
            this.setState({ arrServices: data });
            return;
        }
        data.splice(index, 1);
        this.setState({ arrServices: data });
    };

    getDataFromChild = () => {
        let isValid = true;
        let data = this.state.arrServices;
        for (let i = 0; i < data.length; i++) {
            // Validate: Tên TV và Giá là bắt buộc (có thể thêm logic khác tùy ý)
            if (data[i].nameVi && !data[i].price) {
                isValid = false;
                toast.error(`Vui lòng điền giá tiền ở dòng số ${i + 1}`);
                break;
            }
            if (!data[i].nameVi && data[i].price) {
                isValid = false;
                toast.error(`Vui lòng điền tên dịch vụ ở dòng số ${i + 1}`);
                break;
            }
        }
        // Lọc bỏ những dòng rỗng hoàn toàn trước khi gửi đi (nếu cần)
        // Ở đây ta cứ gửi hết, Service backend sẽ xử lý hoặc loop check
        return {
            isValid: isValid,
            data: data,
        };
    };

    render() {
        let { arrServices } = this.state;
        let { language } = this.props;

        return (
            <div className="doctor-service-container">
                {/* Sử dụng cấu trúc Card giống ManageDoctor */}
                <div className="info-card">
                    <div className="card-header">
                        <span><i className="fas fa-stethoscope"></i> Quản lý danh sách dịch vụ khám</span>
                    </div>
                    
                    <div className="card-body">
                        {/* Header của bảng */}
                        <div className="row header-row">
                            <div className="col-3 header-item">Tên dịch vụ <span className="text-danger">*</span></div>
                            <div className="col-2 header-item">Giá (VND) <span className="text-danger">*</span></div>
                            <div className="col-3 header-item">Mô tả chi tiết</div>
                            <div className="col-3 header-item">Tên & Mô tả (Tiếng Anh)</div>
                            <div className="col-1 header-item text-center">Hành động</div>
                        </div>

                        {/* Body của bảng */}
                        <div className="service-body">
                            {arrServices && arrServices.length > 0 && arrServices.map((item, index) => {
                                return (
                                    <div className="row service-row" key={index}>
                                        {/* Cột 1: Tên TV */}
                                        <div className="col-3">
                                            <input type="text" className="form-control"
                                                placeholder="Tên dịch vụ (TV)"
                                                value={item.nameVi}
                                                onChange={(e) => this.handleOnChangeInput(e, index, "nameVi")}
                                            />
                                        </div>

                                        {/* Cột 2: Giá */}
                                        <div className="col-2">
                                            <input type="number" className="form-control"
                                                placeholder="Giá tiền..."
                                                value={item.price}
                                                onChange={(e) => this.handleOnChangeInput(e, index, "price")}
                                            />
                                        </div>

                                        {/* Cột 3: Mô tả TV */}
                                        <div className="col-3">
                                            <textarea className="form-control" rows="1"
                                                placeholder="Chi tiết dịch vụ..."
                                                value={item.descriptionVi}
                                                onChange={(e) => this.handleOnChangeInput(e, index, "descriptionVi")}
                                            />
                                        </div>

                                        {/* Cột 4: Tiếng Anh (Gộp Name + Desc cho gọn layout) */}
                                        <div className="col-3 group-en">
                                            <input type="text" className="form-control mb-1"
                                                placeholder="Name (En)"
                                                value={item.nameEn}
                                                onChange={(e) => this.handleOnChangeInput(e, index, "nameEn")}
                                            />
                                             <textarea className="form-control" rows="1"
                                                placeholder="Description (En)"
                                                value={item.descriptionEn}
                                                onChange={(e) => this.handleOnChangeInput(e, index, "descriptionEn")}
                                            />
                                        </div>

                                        {/* Cột 5: Nút xóa */}
                                        <div className="col-1 d-flex justify-content-center align-items-center">
                                            <button className="btn-delete" onClick={() => this.handleRemoveRow(index)} title="Xóa dòng này">
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Nút thêm mới */}
                        <div className="action-row">
                            <button className="btn btn-primary btn-add-new" onClick={() => this.handleAddNewRow()}>
                                <i className="fas fa-plus-circle"></i> Thêm dịch vụ
                            </button>
                            <small className="text-note">
                                <i className="fas fa-exclamation-circle"></i> Lưu ý: Nhập giá tiền dạng số. Dữ liệu Tiếng Anh là tùy chọn.
                            </small>
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
        getDoctorServices: () => dispatch(actions.fetchDoctorServices()),
    };
};

// Quan trọng: forwardRef: true để ManageDoctor gọi được getDataFromChild
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(DoctorServices);