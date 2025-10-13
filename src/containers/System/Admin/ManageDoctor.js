import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./ManageDoctor.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from 'react-select';
import { LANGUAGES } from 'utils';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        selectedOption: null,
        listDoctors: []
    };
  }

  componentDidMount() {
    this.props.getAllDoctors()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  if(prevProps.allDoctors !== this.props.allDoctors){
    let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
    this.setState({
      listDoctors: dataSelect
    })
  }
  if(prevProps.language !== this.props.language){
       let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
    this.setState({
      listDoctors: dataSelect
    })
  }
  }

  buildDataInputSelect = (inputData = []) => {
    const { language } = this.props;
    return inputData.map((item) => {
      const labelVi = `${item.lastName ?? ""} ${item.firstName ?? ""}`.trim();
      const labelEn = `${item.firstName ?? ""} ${item.lastName ?? ""}`.trim();
      return {
        label: language === LANGUAGES.VI ? labelVi : labelEn,
        value: item.id,
      };
    });
  };

  handleEditorChange = ({ html, text }) =>{
  this.setState({
    contentMarkdown: text,
    contentHTML: html,
  });
  }

  handleChange = (selectedOption) => {
      this.setState({ selectedOption }, () =>
        console.log(`Option selected:`, this.state.selectedOption)
      );
    };


  handleSaveContentMarkDown=()=>{
    this.props.saveInfoDoctor({ 
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
    })
  }


  handleOnChangeDecs=(event)=>{
      this.setState({
          description: event.target.value
      })
  }
  render() {    
    return (
      <div className='manage-doctor-container'>
        <div className='manage-doctor-title'>Tạo thông tin bác sĩ</div>
        <div className='more-info'>
            <div className='content-left form-group '>
                <label>Chọn bác sĩ</label>
                <Select
                  value={this.state.selectedOption}
                  onChange={this.handleChange}
                  options={this.state.listDoctors}
                  />
            </div>
            <div className='content-right form-group'>
                <label>Thông tin giới thiệu</label>
                <textarea className='form-control' rows="4"
                onChange={(event)=> this.handleOnChangeDecs(event)}
                value={this.state.description}></textarea>
            </div>
        </div>
        <div className='manage-doctor-editor'>        
        <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={this.handleEditorChange}
        /></div>
        <button className='save-content-markdown'
        onClick={()=>this.handleSaveContentMarkDown()}>Save</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
      language:state.app.language,
      allDoctors: state.admin.allDoctors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
      getAllDoctors: () => dispatch(actions.fetchAllDoctorsStart()),
      saveInfoDoctor: (data) => dispatch(actions.saveDetailDoctorsStart(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
