import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSpecialty.scss";
import { FormattedMessage } from "react-intl";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { CommonUtils, getBase64FromBuffer } from "../../../utils";
import {
  createNewSpecialtyService,
  handleGetAllSpecialties,
  deleteSpecialtyService,
  updateSpecialtyService,
  getSpecialtyByIds,
} from "../../../services/specialtyService";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt();

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      previewImgURL: "",
      specialties: [],
      isEditing: false,
      editSpecialtyId: null,
    };
  }

  async componentDidMount() {
    this.fetchAllSpecialties();
  }

  fetchAllSpecialties = async () => {
    let res = await handleGetAllSpecialties();
    if (res && res.errCode === 0) {
      this.setState({
        specialties: res.data ? res.data : [],
      });
    }
  };

  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let Base64 = await CommonUtils.getBase64(file);
      this.setState({
        imageBase64: Base64,
        previewImgURL: Base64,
      });
    }
  };

  handleSaveNewSpecialty = async () => {
    let {
      isEditing,
      editSpecialtyId,
      name,
      imageBase64,
      descriptionHTML,
      descriptionMarkdown,
    } = this.state;

    if (!name || !imageBase64 || !descriptionMarkdown) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    let data = {
      name: name,
      imageBase64: imageBase64,
      descriptionHTML: descriptionHTML,
      descriptionMarkdown: descriptionMarkdown,
    };

    let res;
    if (isEditing) {
      res = await updateSpecialtyService({ ...data, id: editSpecialtyId });
    } else {
      res = await createNewSpecialtyService(data);
    }

    if (res && res.errCode === 0) {
      toast.success(
        isEditing
          ? "Cập nhật chuyên khoa thành công!"
          : "Thêm chuyên khoa thành công!",
      );
      this.setState({
        name: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
        previewImgURL: "",
        isEditing: false,
        editSpecialtyId: null,
      });
      this.fetchAllSpecialties();
    } else {
      toast.error(res.errMessage || "Đã có lỗi xảy ra!");
    }
  };

  handleEditSpecialty = (item) => {
    let imageBase64 = "";
    if (item && item.image) {
      imageBase64 = getBase64FromBuffer(item.image) || "";
    }

    this.setState({
      name: item?.name || "",
      imageBase64: imageBase64,
      previewImgURL: imageBase64,
      descriptionHTML: item?.descriptionHTML || "",
      descriptionMarkdown: item?.descriptionMarkdown || "",
      isEditing: true,
      editSpecialtyId: item?.id || null,
    });
  };

  handleDeleteSpecialty = async (item) => {
    let res = await deleteSpecialtyService(item.id);
    if (res && res.errCode === 0) {
      toast.success("Xóa chuyên khoa thành công!");
      this.fetchAllSpecialties();
    } else {
      toast.error(res.errMessage || "Xóa chuyên khoa thất bại!");
    }
  };

  handleCancelEdit = () => {
    this.setState({
      name: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      previewImgURL: "",
      isEditing: false,
      editSpecialtyId: null,
    });
  };

  render() {
    let { specialties, isEditing, previewImgURL } = this.state;

    return (
      <div className="manage-specialty-container">
        <div className="ms-title">
          <FormattedMessage id="menu.manage-specialty.title" />
        </div>

        <div className="add-new-specialty row">
          <div className="col-12 mb-4">
            <div className="info-card">
              <div className="card-header">
                <span>
                  <i className="fas fa-notes-medical"></i> Thông tin chung
                </span>
              </div>
              <div className="card-body row">
                <div className="col-md-6 form-group">
                  <label className="label-bold">
                    <FormattedMessage id="menu.manage-specialty.name-specialty" />{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value={this.state.name}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "name")
                    }
                    placeholder="Nhập tên chuyên khoa..."
                  />
                </div>

                <div className="col-md-6 form-group">
                  <label className="label-bold">
                    <FormattedMessage id="menu.manage-specialty.image-specialty" />{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <div
                    className="upload-box"
                    style={{ backgroundImage: `url(${previewImgURL})` }}
                    onClick={() => this.fileInput.click()}
                  >
                    <input
                      ref={(fileInput) => (this.fileInput = fileInput)}
                      id="previewImg"
                      type="file"
                      hidden
                      onChange={(event) => this.handleOnChangeImage(event)}
                    />
                    {!previewImgURL && (
                      <span className="upload-text">
                        <i className="fas fa-cloud-upload-alt"></i>{" "}
                        <FormattedMessage id="menu.manage-specialty.upload-image" />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="info-card">
              <div className="card-header">
                <span>
                  <i className="fas fa-pen-nib"></i>{" "}
                  <FormattedMessage id="menu.manage-specialty.description" />
                </span>
              </div>
              <div className="card-body">
                <MdEditor
                  style={{ height: "400px" }}
                  renderHTML={(text) => mdParser.render(text)}
                  onChange={this.handleEditorChange}
                  value={this.state.descriptionMarkdown}
                />
              </div>
            </div>
          </div>

          <div className="col-12 btn-container">
            <button
              type="button"
              className="btn btn-primary btn-save-specialty"
              onClick={() => this.handleSaveNewSpecialty()}
            >
              <i className="fas fa-save"></i>{" "}
              {isEditing ? (
                <FormattedMessage
                  id="menu.manage-specialty.edit"
                  defaultMessage="Cập nhật"
                />
              ) : (
                <FormattedMessage id="menu.manage-specialty.save" />
              )}
            </button>
            {isEditing && (
              <button
                className="btn btn-secondary ml-3 btn-cancel"
                onClick={() => this.handleCancelEdit()}
              >
                <i className="fas fa-times"></i> Hủy
              </button>
            )}
          </div>
        </div>

        <div className="specialty-list-container mt-5">
          <div className="info-card">
            <div className="card-header">
              <span>
                <i className="fas fa-list"></i> Danh sách chuyên khoa
              </span>
            </div>
            <div className="card-body p-0">
              <table className="table table-striped table-bordered mb-0">
                <thead>
                  <tr>
                    <th>Tên chuyên khoa</th>
                    <th style={{ width: "150px", textAlign: "center" }}>
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {specialties && specialties.length > 0 ? (
                    specialties.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td className="text-center">
                          <button
                            className="btn-edit"
                            onClick={() => this.handleEditSpecialty(item)}
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => this.handleDeleteSpecialty(item)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="text-center">
                        Chưa có chuyên khoa nào
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);