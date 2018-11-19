/**
 *
 * RenameCampaign
 *
 */

import React from "react";
import PropTypes from "prop-types";

class RenameCampaign extends React.PureComponent {
  state = {};
  render() {
    const enableButton = this.state.newName && this.state.creator;
    return (
      <div className="rename_wrapper">
        <i onClick={this.onCloseForm} className="close_button fa fa-close" />
        <div className="input_wrapper">
          <div className="input_label">New Name</div>
          <input
            className="input_box"
            name="newName"
            onBlur={this.onInputChange}
          />
        </div>
        <div className="input_wrapper">
          <div className="input_label">Created By</div>
          <input
            className="input_box"
            name="creator"
            onBlur={this.onInputChange}
          />
        </div>
        <button
          className={`add_button ${enableButton ? "" : "disabled"}`}
          onClick={enableButton && this.saveName || null}
        >
          Save
        </button>
      </div>
    );
  }

  onInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onCloseForm = () => {
    this.props.onCloseForm();
  };

  saveName = () => {
    const { newName, creator } = this.state;
    this.props.renameCampaign(newName, creator, this.props.selectedIndex);
    this.props.onCloseForm();
  };
}

RenameCampaign.propTypes = {
  selectedIndex: PropTypes.number,
  renameCampaign: PropTypes.func,
  onCloseForm: PropTypes.func
};

export default RenameCampaign;
