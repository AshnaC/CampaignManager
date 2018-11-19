/**
 *
 * AddCampaign
 *
 */

import React from "react";
import PropTypes from "prop-types";

class AddCampaign extends React.PureComponent {
  state = {};
  render() {
    const enableButton = this.state.name && this.state.creator;
    return (
      <div className="add_campaign_container">
        <div className="add_form">
          <i onClick={this.onCloseForm} className="close_button fa fa-close" />
          <div className="input_warpper">
            <div className="input_label">Campaign Name</div>
            <input
              className="input_box"
              name="name"
              onBlur={this.onInputChange}
            />
          </div>
          <div className="input_wrapper">
            <label className="input_label">Created By</label>
            <input
              className="input_box"
              name="creator"
              onBlur={this.onInputChange}
            />
          </div>
          <div className="add_popup_button">
            <button
              className={`add_button ${enableButton ? "" : "disabled"}`}
              onClick={enableButton ? this.addCampaign : null}
            >
              Add Campaign
            </button>
          </div>
        </div>
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

  addCampaign = () => {
    const campaign = {
      ...this.state,
      history: [
        { action: this.props.actions.CREATED, creator: this.state.creator }
      ],
      comments: []
    };
    this.props.addCampaign(campaign);
  };
}

AddCampaign.propTypes = {
  onCloseForm: PropTypes.func,
  addCampaign: PropTypes.func,
  actions: PropTypes.object
};

export default AddCampaign;
