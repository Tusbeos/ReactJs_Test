import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageClinic.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { CommonUtils } from "../../../utils";
import { createNewClinicService } from "../../../services/clinicService";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt();

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
    };
  }

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

  handleOnChangeImage = async (event, type = "avatar") => {
    if (!event || !event.target || !event.target.files) return;
    const file = event.target.files[0];
    if (!file) return;

    const Base64 = await CommonUtils.getBase64(file);
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
    } = this.state;

    try {
      const res = await createNewClinicService({
        name,
        address,
        imageBase64,
        imageCoverBase64,
        descriptionHTML,
        descriptionMarkdown,
      });

      if (res && res.errCode === 0) {
        toast.success("Tạo phòng khám thành công!");
        this.setState({
          name: "",
          address: "",
          imageBase64: "",
          previewImage: "",
          imageCoverBase64: "",
          previewImageCover: "",
          descriptionHTML: "",
          descriptionMarkdown: "",
        });
      } else {
        toast.error(res?.errMessage || "Tạo phòng khám thất bại!");
      }
    } catch (e) {
      console.log(e);
      toast.error("Có lỗi xảy ra khi tạo phòng khám!");
    }
  };

  render() {
    const {
      name,
      address,
      previewImage,
      previewImageCover,
      descriptionMarkdown,
    } = this.state;

    return (
        <div className="manage-clinic-container">
            <div className="ms-title">Quản lý Phòng khám</div>
            <div className="add-new-clinic row">
                <div className="col-md-6 left-content">
                    <div className="form-group">
                        <label>Tên phòng khám <span className="text-danger">*</span></label>
                        <input className="form-control" type="text"
                            placeholder="Ví dụ: Bệnh viện Việt Đức..."
                            value={this.state.name}
                            onChange={(event) => this.handleOnChangeInput(event, 'name')}
                        />
                    </div>
                    <div className="form-group">
                        <label>Địa chỉ phòng khám <span className="text-danger">*</span></label>
                        <textarea className="form-control" rows="4"
                            placeholder="Ví dụ: 40 Tràng Thi, Hoàn Kiếm, Hà Nội..."
                            value={this.state.address}
                            onChange={(event) => this.handleOnChangeInput(event, 'address')}
                        />
                    </div>
                </div>
                <div className="col-md-6 right-content">
                    <div className="row">
                        {/* Box Upload Logo */}
                        <div className="col-12 mb-3">
                             <label>Logo phòng khám</label>
                             <div className="upload-box logo-box"
                                  style={{ backgroundImage: `url(${this.state.imageBase64})` }}
                                  onClick={() => this.fileInputLogo.click()} 
                             >
                                 {!this.state.imageBase64 && <span className="upload-text"><i className="fas fa-upload"></i> Tải Logo</span>}
                                 
                                 {/* Input ẩn */}
                                 <input ref={ref => this.fileInputLogo = ref}
                                        type="file" hidden
                                        onChange={(event) => this.handleOnChangeImage(event, 'imageBase64')}
                                 />
                             </div>
                        </div>
                        <div className="col-12">
                             <label>Ảnh bìa (Cover)</label>
                             <div className="upload-box cover-box"
                                  style={{ backgroundImage: `url(${this.state.imageCoverBase64})` }}
                                  onClick={() => this.fileInputCover.click()}
                             >
                                 {!this.state.imageCoverBase64 && <span className="upload-text"><i className="fas fa-image"></i> Tải ảnh bìa</span>}
                                 
                                 <input ref={ref => this.fileInputCover = ref}
                                        type="file" hidden
                                        onChange={(event) => this.handleOnChangeImage(event, 'imageCoverBase64')}
                                 />
                             </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 editor-content">
                    <label className="mb-2">Thông tin giới thiệu chi tiết</label>
                    <MdEditor
                        style={{ height: '400px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.descriptionMarkdown}
                    />
                </div>

                {/* --- KHỐI BUTTON --- */}
                <div className="col-12 action-btn">
                    <button className="btn btn-primary btn-lg"
                        onClick={() => this.handleSaveNewClinic()}
                    >
                        <i className="fas fa-save"></i> Lưu thông tin
                    </button>
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