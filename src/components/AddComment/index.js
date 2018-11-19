/**
 *
 * AddComment
 *
 */

import React from "react";
import PropTypes from "prop-types";

class AddComment extends React.PureComponent {
  state = {};
  render() {
    const enableButton = this.state.comment && this.state.creator;
    return (
      <div className="rename_wrapper">
        <i onClick={this.onCloseForm} className="close_button fa fa-close" />
        <div className="input_warpper">
          <label className="input_label">Comment</label>
          <textarea
            className="text_area_box"
            name="comment"
            onBlur={this.onInputChange}
          />
        </div>
        <div className="input_warpper">
          <label className="input_label">Created By</label>
          <input
            className="input_box"
            name="creator"
            onBlur={this.onInputChange}
          />
        </div>
        <button
          className={`add_button ${enableButton ? "" : "disabled"}`}
          onClick={enableButton && this.saveComment}
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

  saveComment = () => {
    const { comment, creator } = this.state;
    this.props.addComment(comment, creator, this.props.selectedIndex);
    this.props.onCloseForm();
  };
}

AddComment.propTypes = {
  selectedIndex: PropTypes.number,
  addComment: PropTypes.func,
  onCloseForm: PropTypes.func
};

export default AddComment;
