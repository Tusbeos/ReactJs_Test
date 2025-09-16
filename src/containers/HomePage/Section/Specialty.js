import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import specialtyImg from "../../../assets/spacialty/co-xuong-khop.png"
 
const PrevArrow = ({ onClick }) => (
  <button className="sp-arrow sp-prev" onClick={onClick} aria-label="Prev">
    ‹
  </button>
);

const NextArrow = ({ onClick }) => (
  <button className="sp-arrow sp-next" onClick={onClick} aria-label="Next">
    ›
  </button>
);

class Specialty extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 2,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 2 } },
        { breakpoint: 768,  settings: { slidesToShow: 2, slidesToScroll: 1, arrows: false } },
      ],
    };

    return (
      <div className='section-specialty'>
        <div className='specialty-container'>
          <div className='specialty-header'>
            <span className='title-section'>Chuyên Khoa</span>
            <button className='btn-section'>Xem Thêm</button>
          </div>
          <div className='specialty-body'>
            <Slider {...settings}>
              <div className='img-customize'>
                <img src={specialtyImg} alt="Cơ xương khớp 1" />
                <div>Cơ xương khớp 1</div>
              </div>

              <div className='img-customize'>
                <img src={specialtyImg} alt="Chuyên khoa 2" />
                <div>Chuyên khoa 2</div>
              </div>

              <div className='img-customize'>
                <img src={specialtyImg} alt="Chuyên khoa 3" />
                <div>Chuyên khoa 3</div>
              </div>

              <div className='img-customize'>
                <img src={specialtyImg} alt="Chuyên khoa 4" />
                <div>Chuyên khoa 4</div>
              </div>

              <div className='img-customize'>
                <img src={specialtyImg} alt="Chuyên khoa 5" />
                <div>Chuyên khoa 5</div>
              </div>

              <div className='img-customize'>
                <img src={specialtyImg} alt="Chuyên khoa 6" />
                <div>Chuyên khoa 6</div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

// Redux
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
