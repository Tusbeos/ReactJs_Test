import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from "./Section/Specialty";
import MedicalFacility from "./Section/MedicalFacility";
import OSDoctor from "./Section/OSDoctor";
import Handbook from "./Section/Handbook";
import About from "./Section/About";
import HomeFooter from "./HomeFooter";
import "./HomePage.scss";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
class HomePage extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 2,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 2 } },
        {
          breakpoint: 768,
          settings: { slidesToShow: 2, slidesToScroll: 1, arrows: false },
        },
      ],
    };
    return (
      <div>
        <HomeHeader />
        <Specialty settings={settings} />
        <MedicalFacility settings={settings} />
        <OSDoctor settings={settings} />
        <Handbook settings={settings} />
        <About />
        <HomeFooter />
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
      isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
