import React, { Component } from 'react';
import { connect } from "react-redux";

class HomeFooter extends Component {
  render() {
    return (
      <div className="home-footer">
        <p>&copy; 2025 Lê Tuấn Tú. <a target='_blank' href="https://github.com/Tusbeos">More information, Visit my Github</a></p>
      </div>
    );
  }
}

// Redux
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
