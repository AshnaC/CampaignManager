/**
 *
 * PageIntentation
 *
 */

import React from "react";
import PropTypes from "prop-types";

class PageIntentation extends React.PureComponent {
  state = {};
  render() {
    return (
      <div className="page_intentation_wrapper">
        {[...Array(this.props.pageNo)].map((item, i) => {
          return (
            <div
              key={i}
              onClick={this.changePage(i)}
              className={`circle intentation_item ${
                this.props.selectedPage === i ? "page_selected" : ""
              }`}
            >
              {i + 1}
            </div>
          );
        })}
      </div>
    );
  }

  changePage = index => () => {
    this.props.onChangePage(index);
  };
}

PageIntentation.propTypes = {
  onChangePage: PropTypes.func
};

export default PageIntentation;
