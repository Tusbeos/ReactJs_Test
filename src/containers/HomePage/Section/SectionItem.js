import React, { Component } from 'react';
import { getBase64FromBuffer } from "../../../utils/CommonUtils";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils/constant";
class SectionItem extends Component {
  render() {
    const { item, onClick, isCircular, subTitle, language } = this.props;

    let imageBase64 =
      getBase64FromBuffer(item.image) ||
      "https://via.placeholder.com/60?text=No+Img";

    let name = item.name;
    if (item.lastName && item.firstName) {
      let positionVi = item.positionData ? item.positionData.value_Vi : "";
      let positionEn = item.positionData ? item.positionData.value_En : "";
      if (language === LANGUAGES.VI) {
        name = `${positionVi}, ${item.lastName} ${item.firstName}`;
      } else {
        name = `${positionEn}, ${item.firstName} ${item.lastName}`;
      }
    }
    return (
      <div className="section-customize" onClick={() => onClick(item)}>
        <div
          className={`img-customize ${
            isCircular ? "img-circle" : "img-square"
          }`}
          style={{
            backgroundColor: "#eee",
            backgroundImage: `url(${imageBase64})`,
          }}
        />
        <div className="bg-text-name-section">
          <div className="name-section">{name}</div>
          {subTitle && <div className="position-section">{subTitle}</div>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    topDoctors: state.admin.topDoctors,
    language: state.app.language,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SectionItem);