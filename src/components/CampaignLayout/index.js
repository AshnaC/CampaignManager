/**
 *
 * CampaignLayout
 *
 */

import React from "react";
import PropTypes from "prop-types";

import AddCampaign from "../AddCampaign";
import CampaignList from "../CampaignList";
import RenameCampaign from "../RenameCampaign";
import AddComment from "../AddComment";
import HistoryList from "../HistoryList";

class CampaignLayout extends React.PureComponent {
  state = { campaignList: [] };
  render() {
    return (
      <div className="layout_wrapper">
        <div className="header">
          <div className="header_content">
            <i className="fa fa-envelope envelope" />
            All Campaigns
          </div>
          <div className="header_content">
            <i className="fa fa-align-left envelope" />
            <span className="heading">Campaign List</span>
            <button className="add_button" onClick={this.toogleAddCampaignForm}>
              + Create New
            </button>
          </div>
        </div>
        {this.state.openForm && (
          <AddCampaign
            actions={this.props.actions}
            addCampaign={this.addCampaign}
            onCloseForm={this.toogleAddCampaignForm}
          />
        )}
        <div className="campaign_list_container">
          <CampaignList
            menu={this.props.menu}
            selectedIndex={this.state.selectedIndex}
            campaignList={this.state.campaignList}
            deleteCampaign={this.deleteCampaign}
            pauseOrResume={this.pauseOrResume}
            openActionWindow={this.openActionWindow}
          />
          <div className="action_wrapper">
            {this.state.menu === this.props.menu.RENAME && (
              <RenameCampaign
                selectedCamp={this.state.selectedCamp}
                selectedIndex={this.state.selectedIndex}
                renameCampaign={this.renameCampaign}
                onCloseForm={this.closeActionWindow}
              />
            )}
            {this.state.menu === this.props.menu.COMMENT && (
              <AddComment
                addComment={this.addComment}
                selectedIndex={this.state.selectedIndex}
                onCloseForm={this.closeActionWindow}
                selectedCamp={this.state.selectedCamp}
              />
            )}
            {this.state.menu === this.props.menu.HISTORY &&
              this.state.selectedCamp && (
                <HistoryList
                  selectedCamp={this.state.selectedCamp}
                  actions={this.props.actions}
                />
              )}
          </div>
          <div />
        </div>
      </div>
    );
  }

  closeActionWindow = () => {
    this.setState({ menu: this.props.menu.HISTORY });
  };

  openActionWindow = (index, menu) => {
    if (menu === this.props.menu.HISTORY) {
      this.setState({ selectedIndex: index });
    }
    const selectedCamp = this.state.campaignList[index];
    this.setState({ menu, selectedCamp, selectedIndex: index });
  };

  deleteCampaign = index => {
    let campaignList = [...this.state.campaignList];
    campaignList.splice(index, 1);
    this.setState({
      campaignList,
      action: "",
      selectedCamp: null,
      selectedIndex: null
    });
  };

  pauseOrResume = (index, paused) => {
    let campaignList = [...this.state.campaignList];
    let campaign = { ...campaignList[index] };
    const newEvent = {
      action: paused ? this.props.actions.PAUSED : this.props.actions.RESUMED
    };
    let history = [...campaign.history, newEvent];
    campaign = { ...campaign, history, paused };
    campaignList[index] = campaign;
    this.setState({
      campaignList,
      selectedCamp: campaign,
      selectedIndex: index
    });
  };

  toogleAddCampaignForm = () => {
    this.setState(prevState => {
      return { openForm: !prevState.openForm };
    });
  };

  addComment = (comment, creator, index) => {
    let campaignList = [...this.state.campaignList];
    let campaign = { ...campaignList[index] };
    const newEvent = { action: this.props.actions.COMMENTED, creator, comment };
    let history = [...campaign.history, newEvent];
    let comments = [...campaign.comments, comment];
    campaign = { ...campaign, history, comments };
    campaignList[index] = campaign;
    this.setState({
      campaignList,
      selectedCamp: campaign,
      selectedIndex: index
    });
  };

  renameCampaign = (newName, creator, index) => {
    let campaignList = [...this.state.campaignList];
    let campaign = { ...campaignList[index] };
    const newEvent = {
      action: this.props.actions.RENAMED,
      creator,
      oldName: campaign.name,
      newName
    };
    let history = [...campaign.history, newEvent];
    campaign = { ...campaign, name: newName, history };
    campaignList[index] = campaign;
    this.setState({
      campaignList,
      selectedCamp: campaign,
      selectedIndex: index
    });
  };

  addCampaign = campaign => {
    this.setState(prevState => {
      const id = prevState.campaignList.length;
      campaign.id = id;
      const campaignList = [...prevState.campaignList, campaign];
      return {
        campaignList,
        openForm: false,
        selectedCamp: campaign,
        selectedIndex: id,
        menu: this.props.menu.HISTORY
      };
    });
  };
}

CampaignLayout.propTypes = {
  actions: PropTypes.object,
  actions: PropTypes.object,
};

export default CampaignLayout;
