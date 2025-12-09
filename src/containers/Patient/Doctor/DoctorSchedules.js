import React, { Component,  } from 'react';
import { connect } from "react-redux";
import "./DoctorSchedules.scss" 
import moment from 'moment';
import localization from 'moment/locale/vi';
import { LANGUAGES } from 'utils';
import {getScheduleDoctorByDate } from "../../../services/userService"
class DoctorSchedules extends Component {
  constructor(props){
    super(props);
    this.state = {
      allDays: [],
      
    }
  }
  
async componentDidMount() {
  let {language} = this.props;
  this.setArrDays(language);
}
  componentDidUpdate(prevProps, prevState, snapShot) {
    if (this.props.language !== prevProps.language){
      let {language} = this.props;
      this.setArrDays(language);
    }
  }

  setArrDays = (language) => {
  let allDays = [];
  for (let i =0; i<7; i++){
    let object = {};
    if (language === LANGUAGES.VI)
      {object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');}
    else{
      object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM')}
    object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
    allDays.push(object);
  }
  this.setState({
    allDays: allDays
  })
  }

  HandleOnChangeSelect = async (event) => {
    if( this.props.detailDoctorFromParent && this.props.detailDoctorFromParent !== -1){
    let doctorId = this.props.detailDoctorFromParent;
    let date = event.target.value;
    let res = await getScheduleDoctorByDate(doctorId, date);
    console.log("check res schedule by date", res);
  }
} 
  render() {
    let {allDays} = this.state;
    return (
      
    <div className='doctor-schedules-container'>
      <div className='all-schedules'>
        <select onChange={(event)=> this.HandleOnChangeSelect(event)}>
          {allDays && allDays.length >0 &&
            allDays.map((item, index)=>{
              return(              
              <option 
              value={item.value} 
              key={index} 
            >
                {item.label} 
                </option>)
            })}
        </select>
      </div>
      <div className='available-schedules'></div>
    </div>
    
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedules);
