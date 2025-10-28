import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

class ManageSchedule extends Component {
  render() {
    const { isLoggedIn } = this.props;
    return (
      <React.Fragment>
        <div>Manage Schedule</div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
