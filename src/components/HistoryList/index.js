/**
 *
 * HistoryList
 *
 */

import React from "react";
import PropTypes from "prop-types";

class HistoryList extends React.PureComponent {
  render() {
    const { history, name } = this.props.selectedCamp;
    return (
      <div>
        <div className="history_header">
          <div>
            <i className="fa fa-repeat repeat_history" />
            History
          </div>
          <div className="history_header_name overflow_ellipse">{name}</div>
        </div>
        {history.map((item, id) => {
          return (
            <div key={`${item.action}_${id}`} className="hisory_list_item">
              {this.getContent(item.action, item)}
            </div>
          );
        })}
      </div>
    );
  }

  getContent(action, item) {
    const actions = this.props.actions;
    switch (action) {
      case actions.CREATED:
        return (
          <div>
            <div className="timeline_wrapper">
              <i className="fa fa-plus-circle time_line_action" />
            </div>
            <div className="history_item_wrapper">
              Campaign created
              <div>
                by
                <div className="creator_name overflow_ellipse">
                  {item.creator}
                </div>
              </div>
            </div>
          </div>
        );
      case actions.COMMENTED:
        return (
          <div>
            <div className="timeline_wrapper">
              <i className="fa fa-comment time_line_action" />
            </div>
            <div className="history_item_wrapper">
              Comment added
              <div>
                by
                <div className="creator_name overflow_ellipse">
                  {item.creator}
                </div>
              </div>
              <div className="overflow_ellipse">{item.comment}</div>
            </div>
          </div>
        );
      case actions.RENAMED:
        return (
          <div>
            <div className="timeline_wrapper">
              <i className="fa fa-edit time_line_action" />
            </div>
            <div className="history_item_wrapper">
              Campaign Renamed
              <div>
                by
                <div className="creator_name overflow_ellipse">
                  {item.creator}
                </div>
              </div>
              <div className="old_name overflow_ellipse">{item.oldName}</div>
              <div className="new_name overflow_ellipse">{item.newName}</div>
            </div>
          </div>
        );
      case actions.PAUSED:
        return (
          <div>
            <div className="timeline_wrapper">
              <i className="fa fa-pause-circle time_line_action" />
            </div>
            <div className="history_item_wrapper">Campaign paused</div>
          </div>
        );
      case actions.RESUMED:
        return (
          <div>
            <div className="timeline_wrapper">
              <i className="fa fa-play-circle time_line_action" />
            </div>
            <div className="history_item_wrapper">Campaign resumed</div>
          </div>
        );
    }
  }
}

HistoryList.propTypes = {
  actions: PropTypes.object,
  selectedCamp: PropTypes.object
};

export default HistoryList;
