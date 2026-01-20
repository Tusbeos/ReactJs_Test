import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSpecialty.scss";
import { FormattedMessage } from "react-intl";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { CommonUtils } from '../../../utils';
import { createNewSpecialtyService } from "../../../services/specialtyService";
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
    };
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapShot) {
    if (this.props.language !== prevProps.language) {
    }
  }

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
      });
    }
  };

  handleSaveNewSpecialty = async () => {
    // Validate đơn giản
    if (
      !this.state.name ||
      !this.state.imageBase64 ||
      !this.state.descriptionMarkdown
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    let res = await createNewSpecialtyService({
      name: this.state.name,
      imageBase64: this.state.imageBase64,
      descriptionHTML: this.state.descriptionHTML,
      descriptionMarkdown: this.state.descriptionMarkdown,
    });
    if (res && res.errCode === 0) {
      toast.success("Thêm chuyên khoa thành công!");
      this.setState({
        name: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
      });
    } else {
      toast.error("Lỗi thêm chuyên khoa!");
    }
  };

  // Trigger input file khi click vào box ảnh
  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true,
    });
  };

  render() {
    return (
      <div className="manage-specialty-container">
        <div className="ms-title">
          <FormattedMessage id="menu.manage-specialty.title" />
        </div>

        <div className="add-new-specialty row">
          {/* --- CARD 1: THÔNG TIN CƠ BẢN --- */}
          <div className="col-12 mb-4">
            <div className="info-card">
              <div className="card-header">
                <span>
                  <i className="fas fa-info-circle"></i> Thông tin chung
                </span>
              </div>
              <div className="card-body row">
                {/* Cột Trái: Tên */}
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

                {/* Cột Phải: Upload Ảnh (Box Style) */}
                <div className="col-md-6 form-group">
                  <label className="label-bold">
                    <FormattedMessage id="menu.manage-specialty.image-specialty" />{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <div
                    className="upload-box"
                    style={{
                      backgroundImage: `url(${this.state.imageBase64})`,
                    }}
                    onClick={() => this.fileInput.click()}
                  >
                    <input
                      ref={(fileInput) => (this.fileInput = fileInput)}
                      id="previewImg"
                      type="file"
                      hidden
                      onChange={(event) => this.handleOnChangeImage(event)}
                    />
                    {/* Chỉ hiện text khi chưa có ảnh */}
                    {!this.state.imageBase64 && (
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

          {/* --- CARD 2: EDITOR --- */}
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

          {/* --- BUTTON SAVE --- */}
          <div className="col-12 btn-container">
            <button
              type="button"
              className="btn btn-primary btn-save-specialty"
              onClick={() => this.handleSaveNewSpecialty()}
            >
              <i className="fas fa-save"></i>{" "}
              <FormattedMessage id="menu.manage-specialty.save" />
            </button>
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