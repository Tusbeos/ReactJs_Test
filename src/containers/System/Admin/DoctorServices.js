import React, { Component } from 'react';
import { connect } from "react-redux";
import "./DoctorServices.scss" 
import * as actions from "../../../store/actions";
// import { LANGUAGES } from 'utils';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        this.setState({
          arrServices: [
            {
              nameVi: "",
              nameEn: "",
              price: "",
              descriptionVi: "",
              descriptionEn: "",
            },
          ],
        });
      }
    }
  }

  fetchDataServices = async (doctorId) => {
    try {
      let res = await getAllDoctorServices(doctorId);
      if (res && res.errCode === 0 && res.data && res.data.length > 0) {
        this.setState({
          arrServices: res.data,
        });
      } else {
        this.setState({
          arrServices: [
            {
              nameVi: "",
              nameEn: "",
              price: "",
              descriptionVi: "",
              descriptionEn: "",
            },
          ],
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
    let newRow = {
      nameVi: "",
      nameEn: "",
      price: "",
      descriptionVi: "",
      descriptionEn: "",
    };
    this.setState({
      arrServices: [...this.state.arrServices, newRow],
    });
  };

  handleRemoveRow = (index) => {
    let data = [...this.state.arrServices];
    if (data.length === 1) {
      data[0] = {
        nameVi: "",
        nameEn: "",
        price: "",
        descriptionVi: "",
        descriptionEn: "",
      };
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
      if (!data[i].nameVi || !data[i].price) {
        isValid = false;
        toast.error(`Vui lòng điền Tên (TV) và Giá ở dòng số ${i + 1}`);
        break;
      }
    }
    return {
      isValid: isValid,
      data: data,
    };
  };
  render() {
    let { arrServices } = this.state;
    return (
      <div className="doctor-service-container">
        <div className="title-section">Quản lý danh sách dịch vụ khám</div>
        <div className="row header-row">
          <div className="col-2 header-item">Tên (TV)</div>
          <div className="col-2 header-item">Tên (TA)</div>
          <div className="col-2 header-item">Giá</div>
          <div className="col-3 header-item">Mô tả (TV)</div>
          <div className="col-2 header-item">Mô tả (TA)</div>{" "}
          {/* Cột 2 thay vì 3 để vừa layout */}
          <div className="col-1 header-item text-center">#</div>
        </div>

        <div className="service-body">
          {arrServices &&
            arrServices.length > 0 &&
            arrServices.map((item, index) => {
              return (
                <div className="row service-row" key={index}>
                  {/* Name Vi */}
                  <div className="col-2">
                    <input
                      type="text"
                      className="form-control"
                      value={item.nameVi}
                      onChange={(e) =>
                        this.handleOnChangeInput(e, index, "nameVi")
                      }
                    />
                  </div>
                  {/* Name En */}
                  <div className="col-2">
                    <input
                      type="text"
                      className="form-control"
                      value={item.nameEn}
                      onChange={(e) =>
                        this.handleOnChangeInput(e, index, "nameEn")
                      }
                    />
                  </div>
                  {/* Price */}
                  <div className="col-2">
                    <input
                      type="number"
                      className="form-control"
                      value={item.price}
                      onChange={(e) =>
                        this.handleOnChangeInput(e, index, "price")
                      }
                    />
                  </div>

                  {/* Description Vi */}
                  <div className="col-3">
                    <textarea
                      className="form-control"
                      rows="1"
                      value={item.descriptionVi}
                      placeholder="Mô tả TV..."
                      onChange={(e) =>
                        this.handleOnChangeInput(e, index, "descriptionVi")
                      }
                    />
                  </div>

                  {/* Description En */}
                  <div className="col-2">
                    <textarea
                      className="form-control"
                      rows="1"
                      value={item.descriptionEn}
                      placeholder="Desc En..."
                      onChange={(e) =>
                        this.handleOnChangeInput(e, index, "descriptionEn")
                      }
                    />
                  </div>

                  {/* Delete */}
                  <div className="col-1 d-flex justify-content-center align-items-center">
                    <div
                      className="btn-delete"
                      onClick={() => this.handleRemoveRow(index)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="action-row">
          <button
            className="btn btn-primary btn-add-new"
            onClick={() => this.handleAddNewRow()}
          >
            <i className="fas fa-plus"></i> Thêm dịch vụ
          </button>
          <small className="text-note">
            * Nhập giá tiền dạng số, không bao gồm ký tự đặc biệt.
          </small>
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

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(DoctorServices);
