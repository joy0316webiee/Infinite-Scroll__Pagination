import React, { Component } from 'react';
import './pagination.css';

class Pagination extends Component {
  render() {
    const { ids } = this.props;
    return (
      <div id="container">
        <div className="pagination">
          <a href="#0" className="page">
            first
          </a>
          {ids.map((id, idx) => (
            <a href={'#' + id} className="page" key={idx}>
              {idx}
            </a>
          ))}
          <a href={'#' + ids[ids.length - 1]} className="page">
            last
          </a>
        </div>
      </div>
    );
  }
}

export default Pagination;
