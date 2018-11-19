/**
 *
 * CampaignList
 *
 */

import React from "react";
import PropTypes from "prop-types";
import PageIntentation from "../PageIntentation";

class CampaignList extends React.PureComponent {
  state = {};
  render() {
    const { menu } = this.props;
    return (
      <div className="list_wrapper">
        {!this.props.selectedList.length && (
          <div className="no_data">No Campaigns yet!</div>
        )}
        <div className="camp_items">
          {this.props.selectedList.map((campaign, i) => {
            return (
              <div
                key={`${campaign.id}_${i}`}
                className={`list_item ${
                  this.props.selectedPage * 10 + i === this.props.selectedIndex
                    ? "selected"
                    : ""
                }`}
              >
                <div
                  className="campaign_name overflow_ellipse"
                  onClick={this.openActionWindow(i, menu.HISTORY)}
                >
                  <div className="circle">{i + 1}</div>
                  {campaign.name}
                </div>
                <i
                  className={`fa ${
                    campaign.paused ? "fa-play-circle" : "fa-pause-circle"
                  } action_item`}
                  onClick={this.pauseOrResume(i, campaign.paused)}
                />
                <i
                  className="fa fa-edit action_item"
                  onClick={this.openActionWindow(i, menu.RENAME)}
                />
                <i
                  className="fa fa-comment action_item"
                  onClick={this.openActionWindow(i, menu.COMMENT)}
                />
                <i
                  className="fa fa-trash action_item"
                  onClick={this.deleteCampaign(i)}
                />
              </div>
            );
          })}
        </div>
        <PageIntentation
          pageNo={this.props.pageNo}
          onChangePage={this.onChangePage}
          selectedPage={this.props.selectedPage}
        />
      </div>
    );
  }

  pauseOrResume = (index, paused) => () => {
    this.props.pauseOrResume(this.props.selectedPage * 10 + index, !paused);
  };

  openActionWindow = (index, menu) => () => {
    this.props.openActionWindow(this.props.selectedPage * 10 + index, menu);
  };

  deleteCampaign = index => () => {
    this.props.deleteCampaign(this.props.selectedPage * 10 + index);
  };

  onChangePage = selectedPage => {
    this.props.changeSelectedPage(selectedPage);
  };
}

CampaignList.propTypes = {
  pauseOrResume: PropTypes.func,
  openActionWindow: PropTypes.func,
  deleteCampaign: PropTypes.func,
  pageNo: PropTypes.number,
  menu: PropTypes.object,
  selectedIndex: PropTypes.number,
  selectedPage: PropTypes.number,
  changeSelectedPage: PropTypes.func,
  selectedList: PropTypes.array,
};

export default CampaignList;
