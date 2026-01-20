import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS } from "../../../utils";
import CommonUtils from "../../../utils/CommonUtils";
import * as actions from "../../../store/actions";
import Lightbox from "react-image-lightbox";
import "./UserRedux.scss";
import TableManageUser from "./TableManageUser";
import "react-image-lightbox/style.css";
import { Buffer } from "buffer";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgURL: "",
      isOpen: false,

      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",

      actions: "",
      userEditId: "",
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let arrGenders = this.props.genderRedux;
    if (prevProps.genderRedux !== this.props.genderRedux) {
      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
      });
    }

    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRoles = this.props.roleRedux;
      this.setState({
        roleArr: arrRoles,
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
      });
    }

    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPositions = this.props.positionRedux;
      this.setState({
        positionArr: arrPositions,
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
      });
    }
    if (prevProps.listUsers !== this.props.listUsers) {
      let arrGenders = this.props.genderRedux;
      let arrRoles = this.props.roleRedux;
      let arrPositions = this.props.positionRedux;
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
        roleArr: arrRoles,
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
        avatar: "",
        previewImgURL: "", // Reset ảnh preview
        actions: CRUD_ACTIONS.CREATE,
      });
    }
  }

  handleOnchangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let Base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        avatar: Base64,
      });
    }
  };

  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({ isOpen: true });
  };

  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;
    let { actions } = this.state;
    if (actions === CRUD_ACTIONS.CREATE) {
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    } else if (actions === CRUD_ACTIONS.EDIT) {
      this.props.editAUserRedux({
        id: this.state.userEditId,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
      "gender",
      "position",
      "role",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };

  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({ ...copyState });
  };

  handleEditUserFromParent = (user) => {
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = Buffer.from(user.image, "base64").toString("base64");
    }

    this.setState({
      email: user.email,
      password: "HARDCODE",
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      gender: user.gender,
      position: user.positionId,
      role: user.roleId,
      actions: CRUD_ACTIONS.EDIT,
      userEditId: user.id,
      avatar: imageBase64,
      previewImgURL: imageBase64 ? `data:image/jpeg;base64,${imageBase64}` : "",
    });
  };

  render() {
    let genders = this.state.genderArr;
    let positions = this.state.positionArr;
    let roles = this.state.roleArr;
    let language = this.props.language;
    let isLoadingGenderRedux = this.props.isLoadingGender;
    let {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      gender,
      position,
      role,
      avatar,
    } = this.state;

    return (
      <div className="user-crud-redux-container">
        <div className="title">
          <FormattedMessage id="manage-user.title" />
        </div>

        <div className="user-redux-body">
          <div className="container">
            <div className="info-card">
              <div className="card-header">
                <span>
                  <i className="fas fa-user-plus"></i>{" "}
                  <FormattedMessage id="manage-user.add" />
                </span>
                {isLoadingGenderRedux && (
                  <span className="loading-text ml-3">
                    <i className="fas fa-spinner fa-spin"></i>{" "}
                    <FormattedMessage id="manage-user.loading" />
                  </span>
                )}
              </div>

              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 form-group">
                    <label>
                      <FormattedMessage id="manage-user.email" />
                    </label>
                    <input
                      className="form-control"
                      type="email"
                      value={email}
                      onChange={(event) => this.onChangeInput(event, "email")}
                      disabled={this.state.actions === CRUD_ACTIONS.EDIT}
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>
                      <FormattedMessage id="manage-user.password" />
                    </label>
                    <input
                      className="form-control"
                      type="password"
                      value={password}
                      onChange={(event) =>
                        this.onChangeInput(event, "password")
                      }
                      disabled={this.state.actions === CRUD_ACTIONS.EDIT}
                    />
                  </div>
                  <div className="col-md-4 form-group">
                    <label>
                      <FormattedMessage id="manage-user.first-name" />
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      value={firstName}
                      onChange={(event) =>
                        this.onChangeInput(event, "firstName")
                      }
                    />
                  </div>
                  <div className="col-md-4 form-group">
                    <label>
                      <FormattedMessage id="manage-user.last-name" />
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      value={lastName}
                      onChange={(event) =>
                        this.onChangeInput(event, "lastName")
                      }
                    />
                  </div>
                  <div className="col-md-4 form-group">
                    <label>
                      <FormattedMessage id="manage-user.phone-number" />
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      value={phoneNumber}
                      onChange={(event) =>
                        this.onChangeInput(event, "phoneNumber")
                      }
                    />
                  </div>
                  <div className="col-md-12 form-group">
                    <label>
                      <FormattedMessage id="manage-user.address" />
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      value={address}
                      onChange={(event) => this.onChangeInput(event, "address")}
                    />
                  </div>
                  <div className="col-md-4 form-group">
                    <label>
                      <FormattedMessage id="manage-user.gender" />
                    </label>
                    <select
                      className="form-select form-control"
                      onChange={(event) => this.onChangeInput(event, "gender")}
                      value={gender}
                    >
                      {genders &&
                        genders.length > 0 &&
                        genders.map((item, index) => (
                          <option key={index} value={item.keyMap}>
                            {language === LANGUAGES.VI
                              ? item.value_Vi
                              : item.value_En}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-md-4 form-group">
                    <label>
                      <FormattedMessage id="manage-user.position" />
                    </label>
                    <select
                      className="form-select form-control"
                      onChange={(event) =>
                        this.onChangeInput(event, "position")
                      }
                      value={position}
                    >
                      {positions &&
                        positions.length > 0 &&
                        positions.map((item, index) => (
                          <option key={index} value={item.keyMap}>
                            {language === LANGUAGES.VI
                              ? item.value_Vi
                              : item.value_En}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-md-4 form-group">
                    <label>
                      <FormattedMessage id="manage-user.role" />
                    </label>
                    <select
                      className="form-select form-control"
                      onChange={(event) => this.onChangeInput(event, "role")}
                      value={role}
                    >
                      {roles &&
                        roles.length > 0 &&
                        roles.map((item, index) => (
                          <option key={index} value={item.keyMap}>
                            {language === LANGUAGES.VI
                              ? item.value_Vi
                              : item.value_En}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-md-6 form-group">
                    <label>
                      <FormattedMessage id="manage-user.image" />
                    </label>
                    <div
                      className="upload-box"
                      style={{
                        backgroundImage: `url(${this.state.previewImgURL})`,
                      }}
                      onClick={() => this.fileInput.click()}
                    >
                      <input
                        ref={(fileInput) => (this.fileInput = fileInput)}
                        id="previewImg"
                        type="file"
                        hidden
                        onChange={(event) => this.handleOnchangeImage(event)}
                      />
                      {!this.state.previewImgURL && (
                        <span className="upload-text">
                          <i className="fas fa-cloud-upload-alt"></i>{" "}
                          <FormattedMessage id="manage-user.upload-image" />
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-12 btn-container">
                    <button
                      className={
                        this.state.actions === CRUD_ACTIONS.EDIT
                          ? "btn btn-warning btn-save-user"
                          : "btn btn-primary btn-save-user"
                      }
                      onClick={() => this.handleSaveUser()}
                    >
                      {this.state.actions === CRUD_ACTIONS.EDIT ? (
                        <span>
                          <i className="fas fa-edit"></i>{" "}
                          <FormattedMessage id="manage-user.edit" />
                        </span>
                      ) : (
                        <span>
                          <i className="fas fa-save"></i>{" "}
                          <FormattedMessage id="manage-user.save" />
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12">
                <div className="info-card">
                  <div className="card-header">
                    <span>
                      <i className="fas fa-users"></i>{" "}
                      <FormattedMessage id="manage-user.title" />
                    </span>
                  </div>
                  <div className="card-body p-0">
                    <TableManageUser
                      handleEditUserFromParentKey={
                        this.handleEditUserFromParent
                      }
                      actions={this.state.actions}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    isLoadingGenderRedux: state.admin.isLoadingGender,
    positionRedux: state.admin.position,
    roleRedux: state.admin.role,
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchAllUsers: () => dispatch(actions.fetchAllUsersStart()),
    editAUserRedux: (data) => dispatch(actions.editUserStart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);