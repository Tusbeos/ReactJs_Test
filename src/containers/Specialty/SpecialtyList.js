import React, { Component } from "react";
import { withRouter } from "react-router";
import { handleGetAllSpecialties } from "../../services/specialtyService";
import "./SpecialtyList.scss";
import HomeHeader from "containers/HomePage/HomeHeader";
import { getBase64FromBuffer } from "../../utils/CommonUtils";
import Breadcrumb from "../../components/Breadcrumb";
import "../../components/Breadcrumb.scss";

class SpecialtyItem extends Component {
  render() {
    const { name, imageUrl, isLast, onClick } = this.props;
    return (
      <li
        className={`specialty-item${isLast ? " last" : ""}`}
        onClick={onClick}
        style={{ cursor: "pointer" }}
      >
        <div className="specialty-item__icon">
          <img
            src={imageUrl}
            alt="icon"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/60?text=No+Img"; // Ảnh thay thế nếu link lỗi
            }}
          />
        </div>
        <span className="specialty-item__name">{name}</span>
      </li>
    );
  }
}

class SpecialtyList extends Component {
  state = {
    specialties: [],
  };

  componentDidMount() {
    this.fetchSpecialties();
  }

  fetchSpecialties = async () => {
    try {
      const res = await handleGetAllSpecialties();
      if (res && res.errCode === 0 && res.data && Array.isArray(res.data)) {
        const dataArr = res.data;
        const specialties = dataArr.map((item) => ({
          id: item.id,
          name: item.name,
          imageUrl:
            getBase64FromBuffer(item.image) ||
            "https://via.placeholder.com/60?text=No+Img",
        }));

        this.setState({ specialties });
      } else {
        console.log("Fetch failed or no data:", res);
        this.setState({ specialties: [] });
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách chuyên khoa:", error);
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      specialties: [],
    };
  }

  handleViewDetailSpecialty = (id) => {
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${id}`);
    }
  };

  render() {
    const { specialties } = this.state;
    const breadcrumbItems = [
      { label: "Trang chủ", to: "/" },
      { label: "Chuyên khoa" },
    ];
    return (
      <>
        <HomeHeader />
        <Breadcrumb
          items={breadcrumbItems}
          containerClassName="booking-container"
        />
        <div className="booking-container">
          <div className="specialty-list-container">
            <h1 className="specialty-list-title">Chuyên khoa dành cho bạn</h1>
            <ul className="specialty-list-items">
              {specialties && specialties.length > 0 ? (
                specialties.map((item, idx) => (
                  <SpecialtyItem
                    key={item.id}
                    name={item.name}
                    imageUrl={item.imageUrl}
                    isLast={idx === specialties.length - 1}
                    onClick={() => this.handleViewDetailSpecialty(item.id)}
                  />
                ))
              ) : (
                <li
                  className="specialty-item"
                  style={{ justifyContent: "center" }}
                >
                  <span>Không có dữ liệu chuyên khoa</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(SpecialtyList);