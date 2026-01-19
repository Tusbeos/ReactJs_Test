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
import { getDetailInfoDoctor } from "../../../services/doctorService";
import { handleGetAllSpecialties } from "../../../services/specialtyService";
import { FormattedMessage, injectIntl } from "react-intl";
import DoctorServices from "./DoctorServices";

const mdParser = new MarkdownIt();

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
      listSpecialty: [],
      selectedSpecialty: null,
      selectedClinic: null,
    };
    this.serviceRef = React.createRef();
  }

  async componentDidMount() {
    this.props.getAllRequiredDoctorInfo();
    this.props.getAllDoctors();
    try {
      const res = await handleGetAllSpecialties();
      if (res && res.errCode === 0 && Array.isArray(res.data)) {
        const dataSelectSpecialty = this.buildDataSpecialtySelect(res.data);
        this.setState({ listSpecialty: dataSelectSpecialty });
      } else {
        this.setState({ listSpecialty: [] });
      }
    } catch (e) {
      console.error("Lỗi khi lấy chuyên khoa:", e);
      this.setState({ listSpecialty: [] });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctors,
        "USERS",
      );
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctors,
        "USERS",
      );
      let { resPrice, resPayment, resProvince } =
        this.props.allRequiredDoctorInfo;
      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE",
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
        "PROVINCE",
      );
      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
  }

  buildDataSpecialtySelect = (inputData = []) => {
    return inputData
      .filter((item) => item && item.id && item.name)
      .map((item) => ({
        label: item.name,
        value: item.id,
      }));
  };

  handleChangeSelectSpecialty = (selectedSpecialty) => {
    this.setState({ selectedSpecialty });
  };

  handleChangeSelectClinic = (selectedClinic) => {
    this.setState({ selectedClinic });
  };

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

    let { listPrice, listPayment, listProvince, listSpecialty } = this.state;
    let res = await getDetailInfoDoctor(selectedOption.value);

    if (res && res.errCode === 0 && res.data) {
      let data = res.data;
      let markdown = data.Markdown;
      let doctorInfo = data.DoctorInfo;
      let addressClinic = "",
        nameClinic = "",
        note = "";
      let selectedPayment = null,
        selectedPrice = null,
        selectedProvince = null,
        selectedSpecialty = null;
      let contentHTML = "",
        contentMarkdown = "",
        description = "";
      let hasOldData = false;

      if (markdown) {
        contentHTML = markdown.contentHTML;
        contentMarkdown = markdown.contentMarkdown;
        description = markdown.description;
        hasOldData = true;
      }

      if (doctorInfo) {
        addressClinic = doctorInfo.addressClinic;
        nameClinic = doctorInfo.nameClinic;
        note = doctorInfo.note;
        hasOldData = true;
        selectedPayment = listPayment.find(
          (item) => item.value === doctorInfo.paymentId,
        );
        selectedPrice = listPrice.find(
          (item) => item.value === doctorInfo.priceId,
        );
        selectedProvince = listProvince.find(
          (item) => item.value === doctorInfo.provinceId,
        );
        if (listSpecialty && listSpecialty.length > 0) {
          selectedSpecialty = listSpecialty.find(
            (item) => item.value === doctorInfo.specialtyId,
          );
        }
      }
      this.setState({
        contentHTML: contentHTML,
        contentMarkdown: contentMarkdown,
        description: description,
        hasOldData: hasOldData,
        addressClinic: addressClinic,
        nameClinic: nameClinic,
        note: note,
        selectedPayment: selectedPayment,
        selectedPrice: selectedPrice,
        selectedProvince: selectedProvince,
        selectedSpecialty: selectedSpecialty,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
        addressClinic: "",
        nameClinic: "",
        note: "",
        selectedPayment: null,
        selectedPrice: null,
        selectedProvince: null,
        selectedSpecialty: null,
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
    let { hasOldData } = this.state;
    const { intl } = this.props;
    if (!this.state.selectedOption) {
      alert(
        intl.formatMessage({ id: "menu.manage-doctor.error-selected-doctor" }),
      );
      return;
    }
    if (!this.state.selectedPrice) {
      alert(
        intl.formatMessage({ id: "menu.manage-doctor.error-selected-price" }),
      );
      return;
    }
    if (!this.state.selectedPayment) {
      alert(
        intl.formatMessage({ id: "menu.manage-doctor.error-selected-payment" }),
      );
      return;
    }
    if (!this.state.selectedProvince) {
      alert(
        intl.formatMessage({
          id: "menu.manage-doctor.error-selected-province",
        }),
      );
      return;
    }
    let arrDoctorService = [];
    if (this.serviceRef.current) {
      const childData = this.serviceRef.current.getDataFromChild();
      if (childData.isValid === false) return;
      arrDoctorService = childData.data;
    }
    console.log("arrDoctorService", arrDoctorService);
    this.props.saveInfoDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
      specialtyId: this.state.selectedSpecialty
        ? this.state.selectedSpecialty.value
        : null,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
    });

    if (arrDoctorService && arrDoctorService.length > 0) {
      this.props.saveDoctorServices({
        arrDoctorService: arrDoctorService,
        doctorId: this.state.selectedOption.value,
      });
    }
  };

  handleOnChangeText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  render() {
    let { intl } = this.props;
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
              className="doctor-description form-control"
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
            <label>
              <FormattedMessage id="menu.manage-doctor.name-clinic" />
            </label>
            <input
              className="form-control"
              onChange={(event) => this.handleOnChangeText(event, "nameClinic")}
              value={this.state.nameClinic}
            ></input>
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="menu.manage-doctor.address-clinic" />
            </label>
            <input
              className="form-control"
              onChange={(event) =>
                this.handleOnChangeText(event, "addressClinic")
              }
              value={this.state.addressClinic}
            ></input>
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="menu.manage-doctor.note" />
            </label>
            <input
              className="form-control"
              onChange={(event) => this.handleOnChangeText(event, "note")}
              value={this.state.note}
            ></input>
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage
                id="menu.manage-doctor.select-specialty"
                defaultMessage="Chuyên khoa"
              />
            </label>
            <Select
              value={this.state.selectedSpecialty}
              onChange={this.handleChangeSelectSpecialty}
              options={this.state.listSpecialty}
              name="selectedSpecialty"
              placeholder={intl.formatMessage({
                id: "menu.manage-doctor.select-specialty",
              })}
            />
          </div>

          <div className="col-4 form-group">
            <label>
              <FormattedMessage
                id="menu.manage-doctor.select-clinic"
                defaultMessage="Phòng khám"
              />
            </label>
            <Select
              value={this.state.selectedClinic}
              onChange={this.handleChangeSelectClinic}
              options={[]}
              name="selectedClinic"
              placeholder={intl.formatMessage({
                id: "menu.manage-doctor.select-clinic",
              })}
            />
          </div>
        </div>
        <div className="doctor-services row">
          <div className="col-12">
            {this.state.selectedOption && (
              <DoctorServices
                ref={this.serviceRef}
                doctorIdFromParent={this.state.selectedOption.value}
              />
            )}
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
    saveDoctorServices: (data) => dispatch(actions.saveDoctorServices(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(ManageDoctor));