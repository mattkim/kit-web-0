import { connect } from 'react-redux';
import Address from './Address';

function mapStateToProps(state) {
  return {
    lat: state.location.lat,
    long: state.location.long,
    geocodes: state.location.geocodes,
    locationError: state.location.locationError,
  };
}

const AddressWrapper = connect(
  mapStateToProps
)(Address);

export default AddressWrapper;
