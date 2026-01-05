import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./ManageDoctor.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from "utils";
import { getDetailInfoDoctor } from "../../../services/userService";
import { FormattedMessage } from "react-intl";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //save to markdown table
      contentHTML: "",
      contentMarkdown: "",
      description: "",
      selectedOption: null,
      listDoctors: [],
      hasOldData: false,

      //save to doctor_info table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      selectedPrice: null,
      selectedPayment: null,
      selectedProvince: null,
      nameClinic: "",
      addressClinic: "",
      note: "",
    };
  }

  componentDidMount() {
    this.props.getAllRequiredDoctorInfo();
    this.props.getAllDoctors();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctors,
        "USERS"
      );
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctors,
        "USERS"
      );
      let { resPrice, resPayment, resProvince } =
        this.props.allRequiredDoctorInfo;
      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      this.setState({
        listDoctors: dataSelect,
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
    if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
      let { resPrice, resPayment, resProvince } =
        this.props.allRequiredDoctorInfo;
      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
  }

  buildDataInputSelect = (inputData, type) => {
    const { language } = this.props;
    if (!inputData) return [];

    return inputData.map((item) => {
      let label = "";
      let objectValue = "";
      if (type === "USERS") {
        const labelVi = `${item.lastName ?? ""} ${item.firstName ?? ""}`;
        const labelEn = `${item.firstName ?? ""} ${item.lastName ?? ""}`;
        label = language === LANGUAGES.VI ? labelVi : labelEn;
        objectValue = item.id;
      } else {
        label = language === LANGUAGES.VI ? item.value_Vi : item.value_En;
        objectValue = item.keyMap;
      }
      return {
        label: label ? label.trim() : "",
        value: objectValue,
      };
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleChange = async (selectedOption) => {
    this.setState({ selectedOption });
    let res = await getDetailInfoDoctor(selectedOption.value);
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown;
      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
      });
    }
  };

  handleChangeSelectDoctorInfo = (selectedOption, name) => {
    let nameState = name.name;
    let stateCopy = { ...this.state };
    stateCopy[nameState] = selectedOption;
    this.setState({
      ...stateCopy,
    });
  };

  handleSaveContentMarkDown = () => {
    // [LOG 1] Kiểm tra xem nút bấm có hoạt động không
    console.log(">>> 1. Bắt đầu lưu thông tin...");

    let { hasOldData } = this.state;

    // VALIDATE
    if (!this.state.selectedOption) {
      console.log(">>> Bị chặn: Chưa chọn Bác sĩ"); // [LOG LỖI]
      alert("Lỗi: Vui lòng chọn Bác sĩ!");
      return;
    }
    if (!this.state.selectedPrice) {
      console.log(">>> Bị chặn: Chưa chọn Giá"); // [LOG LỖI]
      alert("Lỗi: Vui lòng chọn Giá khám!");
      return;
    }
    if (!this.state.selectedPayment) {
      console.log(">>> Bị chặn: Chưa chọn Phương thức thanh toán"); // [LOG LỖI]
      alert("Lỗi: Vui lòng chọn Phương thức thanh toán!");
      return;
    }
    if (!this.state.selectedProvince) {
      console.log(">>> Bị chặn: Chưa chọn Tỉnh thành"); // [LOG LỖI]
      alert("Lỗi: Vui lòng chọn Tỉnh thành!");
      return;
    }

    // [LOG 2] Nếu in ra dòng này nghĩa là đã qua ải Validate
    console.log(">>> 2. Đã qua validate, chuẩn bị gọi API...");

    this.props.saveInfoDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
    });

    // [LOG 3] Đã gọi hàm Redux
    console.log(">>> 3. Đã dispatch action Redux");
  };

  handleOnChangeText = (event, id) => {
    console.log("event", id);
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  render() {
    console.log("check state", this.state.selectedPayment);
    let { hasOldData } = this.state;
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">
          <FormattedMessage id="menu.manage-doctor.title" />
        </div>
        <div className="more-info">
          <div className="content-left form-group ">
            <label>
              <FormattedMessage id="menu.manage-doctor.select-doctor" />
            </label>
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChange}
              options={this.state.listDoctors}
              placeholder={
                <FormattedMessage id="menu.manage-doctor.select-doctor" />
              }
            />
          </div>
          <div className="content-right form-group">
            <label>
              <FormattedMessage id="menu.manage-doctor.introductory-information" />
            </label>
            <textarea
              className="form-control"
              rows="2"
              onChange={(event) =>
                this.handleOnChangeText(event, "description")
              }
              value={this.state.description}
            ></textarea>
          </div>
        </div>
        <div className="more-info-extra row">
          <div className="col-4 form-group md-3">
            <label>
              <FormattedMessage id="menu.manage-doctor.select-price" />
            </label>
            <Select
              value={this.state.selectedPrice}
              onChange={this.handleChangeSelectDoctorInfo}
              options={this.state.listPrice}
              name="selectedPrice"
              placeholder={<FormattedMessage id="menu.manage-doctor.price" />}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="menu.manage-doctor.select-payment" />
            </label>
            <Select
              value={this.state.selectedPayment}
              onChange={this.handleChangeSelectDoctorInfo}
              options={this.state.listPayment}
              name="selectedPayment"
              placeholder={<FormattedMessage id="menu.manage-doctor.payment" />}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              {<FormattedMessage id="menu.manage-doctor.select-province" />}
            </label>
            <Select
              value={this.state.selectedProvince}
              onChange={this.handleChangeSelectDoctorInfo}
              options={this.state.listProvince}
              name="selectedProvince"
              placeholder={
                <FormattedMessage id="menu.manage-doctor.province" />
              }
            />
          </div>
          <div className="col-4 form-group">
            <label>Tên phòng khám</label>
            <input
              className="form-control"
              onChange={(event) => this.handleOnChangeText(event, "nameClinic")}
              value={this.state.nameClinic}
            ></input>
          </div>
          <div className="col-4 form-group">
            <label>Địa chỉ phòng khám</label>
            <input
              className="form-control"
              onChange={(event) =>
                this.handleOnChangeText(event, "addressClinic")
              }
              value={this.state.addressClinic}
            ></input>
          </div>
          <div className="col-4 form-group">
            <label>Note</label>
            <input
              className="form-control"
              onChange={(event) => this.handleOnChangeText(event, "note")}
              value={this.state.note}
            ></input>
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            value={this.state.contentMarkdown}
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
          />
        </div>
        <button
          className={
            hasOldData === true
              ? "save-content-doctor"
              : "create-content-doctor"
          }
          onClick={() => this.handleSaveContentMarkDown()}
        >
          {hasOldData === true ? (
            <span>
              <FormattedMessage id="menu.manage-doctor.edit" />
            </span>
          ) : (
            <span>
              <FormattedMessage id="menu.manage-doctor.save" />
            </span>
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctors: () => dispatch(actions.fetchAllDoctorsStart()),
    saveInfoDoctor: (data) => dispatch(actions.saveDetailDoctorsStart(data)),
    getAllRequiredDoctorInfo: () => dispatch(actions.fetchRequiredDoctorInfo()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
