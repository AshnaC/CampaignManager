/**
 *
 * CampaignManager
 *
 */

import React from "react";
import PropTypes from "prop-types";

import { CAMPAIGN_ACTION, MENU_OPTIONS } from "./constants";

import CampaignLayout from "../../components/CampaignLayout";

class CampaignManager extends React.Component {
  render() {
    return <CampaignLayout actions={CAMPAIGN_ACTION} menu={MENU_OPTIONS} />;
  }
}

CampaignManager.propTypes = {
};

export default CampaignManager;
