import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageClinic.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { CommonUtils, getBase64FromBuffer } from "../../../utils";
import {
  createNewClinicService,
  updateClinicService,
  deleteClinicService,
  getDetailClinicById,
  handleGetAllClinics,
} from "../../../services/clinicService";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt({ html: true });

class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      imageBase64: "",
      previewImage: "",
      imageCoverBase64: "",
      previewImageCover: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      clinics: [],
      isEditing: false,
      editClinicId: null,
    };
  }

  componentDidMount() {
    this.fetchAllClinics();
  }

  fetchAllClinics = async () => {
    try {
      let res = await handleGetAllClinics();
      if (res && res.errCode === 0) {
        this.setState({
          clinics: res.data ? res.data : [],
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleOnChangeInput = (event, id) => {
    if (!event || !event.target) return;
    const valueInput = event.target.value;
    this.setState({
      [id]: valueInput,
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };

  handleOnChangeImage = async (event, type = "logo") => {
    if (!event || !event.target || !event.target.files) return;
    const file = event.target.files[0];
    if (!file) return;

    const Base64 = await CommonUtils.getBase64(file);
    // Create object URL for immediate preview without base64 conversion overhead if desired,
    // but here we stick to base64 for consistency with your saving logic.
    if (type === "cover") {
      this.setState({
        imageCoverBase64: Base64 || "",
        previewImageCover: Base64 || "",
      });
    } else {
      this.setState({
        imageBase64: Base64 || "",
        previewImage: Base64 || "",
      });
    }
  };

  handleSaveNewClinic = async () => {
    const {
      name,
      address,
      imageBase64,
      imageCoverBase64,
      descriptionHTML,
      descriptionMarkdown,
      isEditing,
      editClinicId,
    } = this.state;

    if (!name || !address || !descriptionMarkdown) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    try {
      const payload = {
        id: editClinicId,
        name,
        address,
        imageBase64,
        imageCoverBase64,
        descriptionHTML,
        descriptionMarkdown,
      };

      const res = isEditing
        ? await updateClinicService(payload)
        : await createNewClinicService(payload);

      if (res && res.errCode === 0) {
        toast.success(
          isEditing
            ? "Cập nhật phòng khám thành công!"
            : "Tạo phòng khám thành công!",
        );
        this.setState({
          name: "",
          address: "",
          imageBase64: "",
          previewImage: "",
          imageCoverBase64: "",
          previewImageCover: "",
          descriptionHTML: "",
          descriptionMarkdown: "",
          isEditing: false,
          editClinicId: null,
        });
        await this.fetchAllClinics();
      } else {
        toast.error(
          res?.errMessage ||
            (isEditing
              ? "Cập nhật phòng khám thất bại!"
              : "Tạo phòng khám thất bại!"),
        );
      }
    } catch (e) {
      console.log(e);
      toast.error(
        isEditing
          ? "Có lỗi xảy ra khi cập nhật phòng khám!"
          : "Có lỗi xảy ra khi tạo phòng khám!",
      );
    }
  };

  handleEditClinic = async (clinic) => {
    if (!clinic || !clinic.id) return;
    try {
      const res = await getDetailClinicById(clinic.id);
      if (res && res.errCode === 0 && res.data) {
        // Handle image previews. Data might come as buffer or base64 string depending on backend
        const imageBase64 = res.data.image
          ? getBase64FromBuffer(res.data.image) || ""
          : "";
        const imageCoverBase64 = res.data.imageCover
          ? getBase64FromBuffer(res.data.imageCover) || ""
          : "";

        this.setState({
          name: res.data.name || "",
          address: res.data.address || "",
          imageBase64: imageBase64,
          previewImage: imageBase64,
          imageCoverBase64: imageCoverBase64,
          previewImageCover: imageCoverBase64,
          descriptionHTML: res.data.descriptionHTML || "",
          descriptionMarkdown: res.data.descriptionMarkdown || "",
          isEditing: true,
          editClinicId: res.data.id,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleDeleteClinic = async (clinic) => {
    if (!clinic || !clinic.id) return;
    try {
      const res = await deleteClinicService(clinic.id);
      if (res && res.errCode === 0) {
        toast.success("Xóa phòng khám thành công!");
        await this.fetchAllClinics();
      } else {
        toast.error(res?.errMessage || "Xóa phòng khám thất bại!");
      }
    } catch (e) {
      console.log(e);
      toast.error("Có lỗi xảy ra khi xóa phòng khám!");
    }
  };

  handleCancelEdit = () => {
    this.setState({
      name: "",
      address: "",
      imageBase64: "",
      previewImage: "",
      imageCoverBase64: "",
      previewImageCover: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      isEditing: false,
      editClinicId: null,
    });
  };

  render() {
    const {
      name,
      address,
      previewImage,
      previewImageCover,
      descriptionMarkdown,
      clinics,
      isEditing,
    } = this.state;

    // Use state preview directly.
    // Ensure your handleEditClinic correctly sets these state variables from the fetched data.
    const logoPreviewUrl = previewImage ? `url(${previewImage})` : "";
    const coverPreviewUrl = previewImageCover
      ? `url(${previewImageCover})`
      : "";

    return (
      <div className="manage-clinic-container">
        <div className="ms-title">Quản lý Phòng khám</div>

        <div className="add-new-clinic row">
          {/* --- CARD 1: GENERAL INFORMATION --- */}
          <div className="col-12 mb-4">
            <div className="info-card">
              <div className="card-header">
                <span>
                  <i className="fas fa-hospital-alt"></i> Thông tin chung
                </span>
              </div>
              <div className="card-body row">
                {/* LEFT COLUMN: INPUTS */}
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="label-bold">
                      Tên phòng khám <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Ví dụ: Bệnh viện Việt Đức..."
                      value={name}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "name")
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label className="label-bold">
                      Địa chỉ phòng khám <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      rows="5"
                      placeholder="Ví dụ: 40 Tràng Thi, Hoàn Kiếm, Hà Nội..."
                      value={address}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "address")
                      }
                    />
                  </div>
                </div>

                {/* RIGHT COLUMN: IMAGES */}
                <div className="col-md-6">
                  <div className="row">
                    {/* Logo Box */}
                    <div className="col-md-6 form-group">
                      <label className="label-bold">Logo</label>
                      <div
                        className="upload-box logo-box"
                        style={{ backgroundImage: logoPreviewUrl }}
                        onClick={() => this.fileInputLogo.click()}
                      >
                        <input
                          ref={(ref) => (this.fileInputLogo = ref)}
                          type="file"
                          hidden
                          onChange={(event) =>
                            this.handleOnChangeImage(event, "logo")
                          }
                        />
                        {!this.state.imageBase64 && (
                          <span className="upload-text">
                            <i className="fas fa-cloud-upload-alt"></i> Tải Logo
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Cover Box */}
                    <div className="col-md-6 form-group">
                      <label className="label-bold">Ảnh bìa (Cover)</label>
                      <div
                        className="upload-box cover-box"
                        style={{ backgroundImage: coverPreviewUrl }}
                        onClick={() => this.fileInputCover.click()}
                      >
                        <input
                          ref={(ref) => (this.fileInputCover = ref)}
                          type="file"
                          hidden
                          onChange={(event) =>
                            this.handleOnChangeImage(event, "cover")
                          }
                        />
                        {!this.state.imageCoverBase64 && (
                          <span className="upload-text">
                            <i className="fas fa-image"></i> Tải Cover
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="info-card">
              <div className="card-header">
                <span>
                  <i className="fas fa-pen-nib"></i> Thông tin giới thiệu chi
                  tiết
                </span>
              </div>
              <div className="card-body">
                <MdEditor
                  style={{ height: "400px" }}
                  renderHTML={(text) => mdParser.render(text)}
                  onChange={this.handleEditorChange}
                  value={descriptionMarkdown}
                />
              </div>
            </div>
          </div>

          <div className="col-12 action-btn btn-container">
            <button
              className="btn btn-primary btn-lg btn-save-clinic"
              onClick={() => this.handleSaveNewClinic()}
            >
              <i className="fas fa-save"></i>{" "}
              {isEditing ? "Cập nhật" : "Lưu thông tin"}
            </button>
            {isEditing && (
              <button
                className="btn btn-secondary btn-lg ml-3 btn-cancel"
                onClick={() => this.handleCancelEdit()}
              >
                <i className="fas fa-times"></i> Hủy
              </button>
            )}
          </div>
        </div>

        <div className="clinic-list-container mt-5">
          <div className="info-card">
            <div className="card-header">
              <span>
                <i className="fas fa-list"></i> Danh sách phòng khám
              </span>
            </div>
            <div className="card-body p-0">
              <table className="table table-striped table-bordered mb-0 table-hover">
                <thead className="thead-light">
                  <tr>
                    <th>Tên phòng khám</th>
                    <th>Địa chỉ</th>
                    <th style={{ width: "150px", textAlign: "center" }}>
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {clinics && clinics.length > 0 ? (
                    clinics.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.address}</td>
                        <td className="text-center">
                          <button
                            className="btn-edit"
                            onClick={() => this.handleEditClinic(item)}
                            title="Sửa"
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => this.handleDeleteClinic(item)}
                            title="Xóa"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center">
                        Chưa có dữ liệu phòng khám
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);