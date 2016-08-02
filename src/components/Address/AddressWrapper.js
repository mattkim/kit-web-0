import { connect } from 'react-redux';
import Address from './Address';

function mapStateToProps(state) {
  return {
    lat: state.location.lat,
    long: state.location.long,
    geocodes: state.location.geocodes,
  };
}

const AddressWrapper = connect(
  mapStateToProps
)(Address);

export default AddressWrapper;
