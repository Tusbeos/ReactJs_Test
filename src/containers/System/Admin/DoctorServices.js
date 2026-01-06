import React, { Component } from 'react';
import { connect } from "react-redux";
import "./DoctorServices.scss" 
// import { LANGUAGES } from 'utils';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllDoctorServices } from '../../../services/userService';
class DoctorServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrServices: [
        { nameVi: '', nameEn: '', price: '' }
    ]
    };
  }

    componentDidMount() {}

    async componentDidUpdate(prevProps) {
    if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
      if (this.props.doctorIdFromParent) {
          this.fetchDataServices(this.props.doctorIdFromParent);
      } else {
          this.setState({
              arrServices: [{ nameVi: '', nameEn: '', price: '' }]
          })
      }
    }
  }
  fetchDataServices = async (doctorId) => {
      let res = await getAllDoctorServices(doctorId);
      if (res && res.errCode === 0 && res.data && res.data.length > 0) {
          this.setState({
              arrServices: res.data
          })
      } else {
          this.setState({
              arrServices: [{ nameVi: '', nameEn: '', price: '' }]
          })
      }
  }

    handleOnChangeInput = (event, index, key) => {
        let data = [...this.state.arrServices];
        data[index][key] = event.target.value;
        this.setState({ arrServices: data });
    }

    handleAddNewRow = () => {
        let newRow = { nameVi: '', nameEn: '', price: '' };
        this.setState({
            arrServices: [...this.state.arrServices, newRow]
        })
    }

    handleRemoveRow = (index) => {
        let data = [...this.state.arrServices];
        if (data.length === 1) {
            data[0] = { nameVi: '', nameEn: '', price: '' };
            this.setState({ arrServices: data });
            return;
        }
        data.splice(index, 1);
        this.setState({ arrServices: data });
    }

    getDataFromChild = () => {
        let isValid = true;
        let data = this.state.arrServices;
        for(let i = 0; i < data.length; i++){
            if(!data[i].nameVi || !data[i].price){
                isValid = false;
                toast.error(`Vui lòng điền Tên (TV) và Giá ở dòng số ${i + 1}`);
                break;
            }
        }
        return {
            isValid: isValid,
            data: data
        };
    }
  render() {
    let { arrServices } = this.state;
    console.log('arrServices: ', arrServices);

    return (
      <div className='doctor-service-container'>
        <div className="title-section">Quản lý danh sách dịch vụ khám</div>
                <div className="row header-row">
                    <div className="col-4 header-item">Tên Dịch vụ (Tiếng Việt)</div>
                    <div className="col-4 header-item">Tên Dịch vụ (Tiếng Anh)</div>
                    <div className="col-3 header-item">Giá dịch vụ (VND)</div>
                    <div className="col-1 header-item text-center">Xóa</div>
                </div>

                <div className="service-body">
                    {arrServices && arrServices.length > 0 &&
                        arrServices.map((item, index) => {
                            return (
                                <div className="row service-row" key={index}>
                                    <div className="col-4">
                                        <input 
                                            type="text" className="form-control" 
                                            value={item.nameVi}
                                            placeholder="VD: Khám tổng quát"
                                            onChange={(e) => this.handleOnChangeInput(e, index, 'nameVi')}
                                        />
                                    </div>
                                    <div className="col-4">
                                        <input 
                                            type="text" className="form-control" 
                                            value={item.nameEn}
                                            placeholder="VD: General Checkup"
                                            onChange={(e) => this.handleOnChangeInput(e, index, 'nameEn')}
                                        />
                                    </div>
                                    <div className="col-3">
                                        <input 
                                            type="number" className="form-control" 
                                            value={item.price}
                                            placeholder="VD: 500000"
                                            onChange={(e) => this.handleOnChangeInput(e, index, 'price')}
                                        />
                                    </div>
                                    <div className="col-1 d-flex justify-content-center align-items-center">
                                        <div className="btn-delete" onClick={() => this.handleRemoveRow(index)}>
                                            <i className="fas fa-trash-alt"></i>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="action-row">
                    <button className="btn btn-primary btn-add-new" onClick={() => this.handleAddNewRow()}>
                        <i className="fas fa-plus"></i> Thêm dịch vụ
                    </button>
                    <small className="text-note">* Nhập giá tiền dạng số, không bao gồm ký tự đặc biệt.</small>
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

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(DoctorServices);
