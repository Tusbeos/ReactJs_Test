import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {LANGUAGES} from '../../../utils';
import { handleGetAllCodeService } from "../../../services/userService";
class UserRedux extends Component {
    constructor(props) {
        super(props)
            this.state={

            }
    }
    async componentDidMount() {
        try {
            let res = await handleGetAllCodeService("gender");
            if (res && res.errCode === 0) {
                this.setState({
                    genderArr: res.data
                })
            }   
            console.log("check res: ", res);

        } catch (e) {
            console.log(e);
         }
    }


    render() {
        let gender = this.state.genderArr;
        let language = this.props.language;
        return (
            <div className='user-crud-redux-container'>
                <div className='title'><FormattedMessage id='manage-user.title'/></div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'>
                                <FormattedMessage id='manage-user.add'/></div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.email'/></label>
                                <input className='form-control' type='email'/>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.password'/></label>
                                <input className='form-control' type='password'/>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.first-name'/></label>
                                <input className='form-control' type='firstName '/>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.last-name'/></label>
                                <input className='form-control' type='lastName'/>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.phone-number'/></label>
                                <input className='form-control' type='phoneNumber'/>
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id='manage-user.address'/></label>
                                <input className='form-control' type='address'/>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.gender'/></label>
                                <select className="form-select">
                                {gender && gender.length > 0 &&
                                gender.map((item, index) => {
                                    return (
                                    <option key={index}>{language === LANGUAGES.VI ? item.value_Vi : item.value_En}
                                    </option>
                                    )
                                })
                                }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.position'/></label>
                                <select className="form-select" defaultValue="">
                                <option value="">Choose...</option>
                                <option value="...">...</option>
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.role'/></label>
                                <select className="form-select" defaultValue="">
                                <option value="">Choose...</option>
                                <option value="...">...</option>
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.image'/></label>
                                <input className='form-control' type='image'/>
                            </div>
                        <div className='col-12 mt-3'>
                            <button className='btn btn-primary'><FormattedMessage id='manage-user.save'/></button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language : state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
