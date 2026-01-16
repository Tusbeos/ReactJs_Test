import React, { Component } from 'react';
import { Buffer } from 'buffer';
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils/constant";
class SectionItem extends Component {

    render() {
        const { item, onClick, isCircular, subTitle,language } = this.props;

        let imageBase64 = '';

        if (item.image) {
          if (
            typeof item.image === "object" &&
            item.image.type === "Buffer" &&
            item.image.data
          ) {
            let buffer = new Buffer(item.image.data);
            let base64String = buffer.toString("base64");
            imageBase64 = `data:image/jpeg;base64,${base64String}`;
          } else if (typeof item.image === "string") {
            if (item.image.startsWith("ZGF0Y")) {
              imageBase64 = new Buffer(item.image, "base64").toString("binary");
            } else if (item.image.startsWith("data:image")) {
              imageBase64 = item.image;
            } else {
              imageBase64 = `data:image/jpeg;base64,${item.image}`;
            }
          }
        }
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
                    className={`img-customize ${isCircular ? 'img-circle' : 'img-square'}`}
                    style={{
                        backgroundColor: '#eee', 
                        backgroundImage: `url(${imageBase64})`
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