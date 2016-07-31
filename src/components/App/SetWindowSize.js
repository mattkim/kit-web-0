import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setWindowSize } from '../../actions/window';

class SetWindowSize extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    this.handleResize(null);
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  isMobile(width) {
    if (width === null) {
      return true;
    }

    return width < 480;
  }

  handleResize(e) {  // eslint-disable-line no-unused-vars
    const width = window.innerWidth;
    const height = window.innerHeight;
    if (this.props && this.props.dispatch) {
      this.props.dispatch(setWindowSize({
        width,
        height,
        isMobile: this.isMobile(width),
      }));
    }
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default connect()(SetWindowSize);
