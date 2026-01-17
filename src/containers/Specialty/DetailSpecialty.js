import React, { Component } from "react";
import { withRouter } from "react-router";
import { handleGetAllSpecialties } from "../../services/specialtyService";
import HomeHeader from "containers/HomePage/HomeHeader";
import Breadcrumb from "../../components/Breadcrumb";
import "../../components/Breadcrumb.scss";
import { getBase64FromBuffer } from "../../utils/CommonUtils";
import "./DetailSpecialty.scss";

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      specialty: null,
      isShowDetail: false,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const id = match && match.params && match.params.id;
    if (id) {
      const res = await handleGetAllSpecialties();
      if (res && res.errCode === 0 && Array.isArray(res.data)) {
        const found = res.data.find((item) => +item.id === +id);
        if (found) {
          this.setState({
            specialty: {
              ...found,
              imageUrl: getBase64FromBuffer(found.image) || "",
            },
          });
        }
      }
    }
  }

  handleShowHideDetail = () => {
    this.setState({
      isShowDetail: !this.state.isShowDetail,
    });
  };

  render() {
    const { specialty, isShowDetail } = this.state;
    let backgroundImage = specialty ? `url(${specialty.imageUrl})` : "";

    const breadcrumbItems = [
      { label: "Trang chủ", to: "/" },
      { label: "Chuyên khoa", to: "/specialty" },
      { label: specialty && specialty.name ? specialty.name : "Chi tiết chuyên khoa" },
    ];

    return (
      <>
        <HomeHeader />
        <div className="detail-specialty-container">
          <div className="description-specialty">
            <Breadcrumb items={breadcrumbItems} />
            {specialty && (
              <div className="description-content-up">
                <div
                  className="description-bg"
                  style={{ backgroundImage: backgroundImage }}
                ></div>

                <div className="description-content-text">
                  <div
                    className="specialty-desc-html"
                    style={
                      isShowDetail
                        ? {}
                        : { maxHeight: "150px", overflow: "hidden" }
                    }
                    dangerouslySetInnerHTML={{
                      __html: specialty.descriptionHTML || "<i>Chưa có mô tả</i>",
                    }}
                  />

                  <div className="view-more-container">
                    <span
                      onClick={() => this.handleShowHideDetail()}
                      className="view-more-btn"
                    >
                      {isShowDetail ? "Thu gọn" : "Xem thêm"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="detail-specialty-body">
            <div className="search-sp-doctor">
              <select>
                <option>Toàn quốc</option>
                <option>Hà Nội</option>
                <option>Hồ Chí Minh</option>
              </select>
            </div>

            <div className="arr-doctor">
              <div className="placeholder-doctor">
                <p>Danh sách các bác sĩ thuộc khoa này sẽ hiện ở đây...</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(DetailSpecialty);