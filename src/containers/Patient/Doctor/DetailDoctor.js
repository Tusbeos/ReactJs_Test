import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import HomeHeader from 'containers/HomePage/HomeHeader';
import "./DetailDoctor.scss" 
import {getDetailInfoDoctor} from "../../../services/userService"
import { LANGUAGES } from 'utils';

class DetailDoctor extends Component {
  constructor(props){
    super(props);
    this.state = {
      detailDoctor:{}
    }
  }
  
async componentDidMount() {
  const id = this.props.match?.params?.id || this.props.router?.params?.id;
  if (!id) return;                     
  console.log("DetailDoctor id=", id); 
  try {
    const res = await getDetailInfoDoctor(id);
    if (res && res.errCode === 0) {
      this.setState({
        detailDoctor: res.data,
      });
    }
  } catch (e) {
    console.log("API error:", e?.response?.status, e?.response?.config?.url);
  }
}
  componentDidUpdate(prevProps,prevState,snapShot){}

  render() {
    console.log("DetailDoctor state=", this.state);
    let {detailDoctor} = this.state;
    let {language} = this.props;
    let nameVi = '';
    let nameEn = '';
    if(detailDoctor && detailDoctor.positionData){
      nameVi = `${detailDoctor.positionData.value_Vi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
      nameEn = `${detailDoctor.positionData.value_En}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
    }
    
    return (
      <>
      <HomeHeader isShowBanner={false}/>
      <div className='detail-doctor-container'>
          <div className='intro-doctor'>
            <div className='content-left' 
            style={{ backgroundImage: `url(data:image/jpeg;base64,${detailDoctor.image ? detailDoctor.image : ''})` }}>
            </div>
            <div className='content-right'>
              <div className='up'>
                {language === LANGUAGES.VI ? nameVi : nameEn}
              </div>
              <div className='down'>{detailDoctor.Markdown && detailDoctor.Markdown.description 
                && 
                <span>
                {detailDoctor.Markdown.description}
                 </span>}
              </div>
            </div>
          </div>
          <div className='schedule-doctor'></div>
          <div className='detail-info'>
            {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML
              &&
              <div dangerouslySetInnerHTML={{__html: detailDoctor.Markdown.contentHTML}}>
              </div>
            }
          </div>
          <div className='comment-doctor'></div>
      </div>
      </>

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
