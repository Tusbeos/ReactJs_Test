import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSpecialty.scss";
import { FormattedMessage } from "react-intl";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { CommonUtils } from '../../../utils';
import { createNewSpecialtyService } from '../../../services/userService';
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
  render() {
    return (
      <div className="manage-specialty-container">
        <div className="ms-title">
          <FormattedMessage id="menu.manage-specialty.title" />
        </div>

        <div className="add-new-specialty row">
          <div className="col-6 form-group">
            <label>
              <FormattedMessage id="menu.manage-specialty.name-specialty" />
            </label>
            <input
              className="form-control"
              type="text"
              value={this.state.name}
              onChange={(event) => this.handleOnChangeInput(event, "name")}
            />
          </div>

          <div className="col-6 form-group">
            <label>
              <FormattedMessage id="menu.manage-specialty.image-specialty" />
            </label>
            <div className="preview-img-container">
              <input
                id="previewImg"
                type="file"
                hidden
                onChange={(event) => this.handleOnChangeImage(event)}
              />
              <label className="label-upload" htmlFor="previewImg">
                <FormattedMessage id="menu.manage-specialty.upload-image" />
              </label>

              <div
                className="preview-image"
                style={{ backgroundImage: `url(${this.state.imageBase64})` }}
              ></div>
            </div>
          </div>

          <div className="col-12 editor-section">
            <label>
              <FormattedMessage id="menu.manage-specialty.description" />
            </label>
            <MdEditor
              style={{ height: "300px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.descriptionMarkdown}
            />
          </div>

          <div className="col-12">
            <button
              type="button"
              className="btn-save-specialty"
              onClick={() => this.handleSaveNewSpecialty()}
            >
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
