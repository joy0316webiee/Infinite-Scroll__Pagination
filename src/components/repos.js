import React, { Component } from 'react';
import Pagination from './pagination';

class Repos extends Component {
  constructor() {
    super();

    this.state = {
      currentPageId: [0]
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleOnScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleOnScroll);
  }

  componentWillReceiveProps() {
    if (this.props.entries) {
      const { currentPageId } = this.state;
      const repos = this.props.entries.edges || [];

      if (this.props.loading && !currentPageId.includes(repos.length))
        currentPageId.push(repos.length);

      this.setState({ currentPageId: currentPageId });
    }
  }

  handleOnScroll = () => {
    var scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    var scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    var clientHeight =
      document.documentElement.clientHeight || window.innerHeight;
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
    if (scrolledToBottom) {
      this.props.onLoadMore();
    }
  };

  render() {
    if (!this.props.entries && this.props.loading) return <p>Loading....</p>;
    const repos = this.props.entries.edges || [];

    return (
      <div>
        <Pagination ids={this.state.currentPageId} />
        <ul className="content">
          {repos.map(({ node }, idx) => {
            return (
              <li key={idx} id={idx}>
                {this.state.currentPageId.includes(idx) ? (
                  <h1>page {this.state.currentPageId.indexOf(idx)}</h1>
                ) : null}
                <p>{node.description}</p>
                <p>★ {node.stargazers.totalCount} - </p>
              </li>
            );
          })}
          {this.props.loading && <h2>Loading...</h2>}
        </ul>
      </div>
    );
  }
}

export default Repos;
