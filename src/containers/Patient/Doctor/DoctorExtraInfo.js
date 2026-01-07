import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfo.scss";
import {
  getExtraInfoDoctorById,
  getAllDoctorServices,
} from "../../../services/userService";
import { LANGUAGES } from "utils";
import { NumericFormat } from "react-number-format";
import { FormattedMessage } from "react-intl";

class DoctorExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfo: true,
      extraInfo: {},
      listDoctorServices: {},
    };
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapShot) {
    if (this.props.language !== prevProps.language) {
    }
    if (
      this.props.detailDoctorFromParent !== prevProps.detailDoctorFromParent
    ) {
      let data = await getExtraInfoDoctorById(
        this.props.detailDoctorFromParent
      );
      let listDoctorServices = await getAllDoctorServices(
        this.props.detailDoctorFromParent
      );
      if (data && data.errCode === 0) {
        this.setState({
          extraInfo: data && data.data ? data.data : {},
          listDoctorServices: listDoctorServices.data
            ? listDoctorServices.data
            : {},
        });
      }
    }
  }

  showHideDetailInfo = (status) => {
    this.setState({
      isShowDetailInfo: status,
    });
  };

  render() {
    console.log("DoctorExtraInfo state=", this.state.listDoctorServices);
    let language = this.props.language;
    let { isShowDetailInfo, extraInfo } = this.state;
    return (
      <div className="doctor-extra-info-container">
        <div className="content-up">
          <div className="text-address">
            <FormattedMessage id="patient.extra-info-doctor.clinic-address" />
          </div>
          <div className="name-clinic">
            {extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ""}
          </div>
          <div className="detail-address">
            {extraInfo && extraInfo.addressClinic
              ? extraInfo.addressClinic
              : ""}
          </div>
        </div>
        <div className="content-down">
          {isShowDetailInfo === false && (
            <>
              <div className="price-title">
                <FormattedMessage id="patient.extra-info-doctor.price" />
                {extraInfo &&
                  extraInfo.priceTypeData &&
                  language === LANGUAGES.VI && (
                    <NumericFormat
                      className="currency"
                      value={extraInfo.priceTypeData.value_Vi}
                      thousandsGroupStyle="thousand"
                      thousandSeparator=","
                      suffix="đ"
                      displayType="text"
                    />
                  )}
                {extraInfo &&
                  extraInfo.priceTypeData &&
                  language === LANGUAGES.EN && (
                    <NumericFormat
                      className="currency"
                      value={extraInfo.priceTypeData.value_En}
                      thousandsGroupStyle="thousand"
                      thousandSeparator=","
                      suffix="$"
                      displayType="text"
                    />
                  )}
                <span
                  className="short-info"
                  onClick={() => this.showHideDetailInfo(true)}
                >
                  <FormattedMessage id="patient.extra-info-doctor.detail" />
                </span>
              </div>
            </>
          )}
          {isShowDetailInfo === true && (
            <>
              <div className="tile-price">
                <FormattedMessage id="patient.extra-info-doctor.price" />
              </div>
              <div className="detail-price">
                <div className="price">
                  <span className="left">
                    <FormattedMessage id="patient.extra-info-doctor.price" />
                  </span>
                  <span className="right">
                    {extraInfo &&
                      extraInfo.priceTypeData &&
                      language === LANGUAGES.VI && (
                        <NumericFormat
                          className="currency"
                          value={extraInfo.priceTypeData.value_Vi}
                          thousandsGroupStyle="thousand"
                          thousandSeparator=","
                          suffix="đ"
                          displayType="text"
                        />
                      )}
                    {extraInfo &&
                      extraInfo.priceTypeData &&
                      language === LANGUAGES.EN && (
                        <NumericFormat
                          className="currency"
                          value={extraInfo.priceTypeData.value_En}
                          thousandsGroupStyle="thousand"
                          thousandSeparator=","
                          suffix="$"
                          displayType="text"
                        />
                      )}
                  </span>
                  <div className="note">
                    {extraInfo && extraInfo.note ? extraInfo.note : ""}
                  </div>
                </div>
                <div className="payment">
                  <FormattedMessage id="patient.extra-info-doctor.payment" />
                  {extraInfo && extraInfo.paymentTypeData
                    ? language === LANGUAGES.VI
                      ? extraInfo.paymentTypeData.value_Vi
                      : extraInfo.paymentTypeData.value_En
                    : ""}
                </div>
              </div>
              <div className="price-service">
                <div className="title-service">
                  <FormattedMessage id="patient.extra-info-doctor.service-price" />
                </div>
                <div className="detail-service">
                  {this.state.listDoctorServices &&
                  this.state.listDoctorServices.length > 0 ? (
                    this.state.listDoctorServices.map((item, index) => {
                      return (
                        <div key={index} className="service-item">
                          <span className="service-name">
                            {this.state.listDoctorServices &&
                            language === LANGUAGES.VI
                              ? item.nameVi
                              : item.nameEn}
                          </span>
                          <span className="service-price">
                            {language === LANGUAGES.VI ? (
                              <NumericFormat
                                className="currency"
                                value={item.price}
                                thousandsGroupStyle="thousand"
                                thousandSeparator=","
                                suffix="đ"
                                displayType="text"
                              />
                            ) : (
                              <NumericFormat
                                className="currency"
                                value={Math.ceil(item.price / 23000)}
                                thousandsGroupStyle="thousand"
                                thousandSeparator=","
                                suffix="$"
                                displayType="text"
                              />
                            )}
                          </span>
                          <div className="description">
                            {language === LANGUAGES.VI
                              ? item.descriptionVi
                              : item.descriptionEn}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="no-services">
                      <FormattedMessage id="patient.extra-info-doctor.no-services" />
                    </div>
                  )}
                </div>
              </div>
              <div className="show-info">
                <span onClick={() => this.showHideDetailInfo(false)}>
                  <FormattedMessage id="patient.extra-info-doctor.hide-price" />
                </span>
              </div>
            </>
          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
