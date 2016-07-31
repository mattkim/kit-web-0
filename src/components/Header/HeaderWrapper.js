import { connect } from 'react-redux';
import Header from './Header';

function mapStateToProps(state) {
  return {
    width: state.window.width,
    height: state.window.height,
    isMobile: state.window.isMobile,
  };
}

const HeaderWrapper = connect(
  mapStateToProps
)(Header);

export default HeaderWrapper;
