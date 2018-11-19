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
  state = {
    campaignList: [
      {
        name: "Push Notification 1",
        creator: "Sam",
        id: 0,
        history: [{ action: 1, creator: "Sam" }]
      },
      {
        name: "Push Notification 1",
        creator: "Smith",
        id: 1,
        history: [{ action: 1, creator: "D" }]
      },
    ],
    selectedPage: 0,
    pageNo: 1
  };
  render() {
    const selectedList = this.state.campaignList.slice(
      this.state.selectedPage * 10,
      this.state.selectedPage * 10 + 10
    );
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
            pageNo={this.state.pageNo}
            menu={this.props.menu}
            selectedIndex={this.state.selectedIndex}
            selectedPage={this.state.selectedPage}
            changeSelectedPage={this.changeSelectedPage}
            selectedList={selectedList}
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

  changeSelectedPage = selectedPage => {
    this.setState({ selectedPage, selectedIndex: null, menu: "" });
  };

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
    const pageNo = Math.ceil(campaignList.length / 10);
    this.setState(prevState => {
      if (prevState.selectedPage > pageNo - 1) {
        return { selectedPage: prevState.selectedPage - 1 };
      }
    });
    this.setState({
      campaignList,
      action: "",
      selectedCamp: null,
      selectedIndex: null,
      pageNo
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
    campaign = { ...campaign, history};
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
      const pageNo = Math.ceil(campaignList.length / 10);
      return {
        pageNo,
        campaignList,
        openForm: false,
        selectedCamp: campaign,
        selectedIndex: id,
        selectedPage: pageNo - 1,
        menu: this.props.menu.HISTORY
      };
    });
  };
}

CampaignLayout.propTypes = {
  actions: PropTypes.object,
  actions: PropTypes.object
};

export default CampaignLayout;
