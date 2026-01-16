import React, { Component } from 'react';
import { connect } from "react-redux";
import Slider from "react-slick";
import { withRouter } from "react-router";
import SectionItem from "./SectionItem";
import { FormattedMessage } from "react-intl";
import SpecialtyImg from "../../../assets/handbook/handbook-1.jpg";

class Handbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataHandbooks: [
        { id: 1, name: "Cẩm nang Cơ xương khớp", image: SpecialtyImg },
        { id: 2, name: "Cẩm nang Thần kinh", image: SpecialtyImg },
        { id: 3, name: "Cẩm nang Tiêu hóa", image: SpecialtyImg },
        { id: 4, name: "Cẩm nang Tim mạch", image: SpecialtyImg },
        { id: 5, name: "Cẩm nang Tai Mũi Họng", image: SpecialtyImg },
        { id: 6, name: "Cẩm nang Cột sống", image: SpecialtyImg },
      ],
    };
  }

  handleViewDetailHandbook = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-handbook/${item.id}`);
    }
  };

  render() {
    let { dataHandbooks } = this.state;

    return (
      <div className="section-share section-handbook">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="home-header.handbook" />
            </span>
            <button className="btn-section">
              <FormattedMessage id="home-header.all-article" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {dataHandbooks &&
                dataHandbooks.length > 0 &&
                dataHandbooks.map((item, index) => {
                  return (
                    <SectionItem
                      key={index}
                      item={item}
                      isCircular={false} // Cẩm nang thường là ảnh chữ nhật
                      onClick={this.handleViewDetailHandbook}
                    />
                  );
                })}
            </Slider>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Handbook)
);