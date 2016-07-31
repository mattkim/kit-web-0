import { connect } from 'react-redux';
import Address from './Address';

function mapStateToProps(state) {
  return {
    lat: state.location.lat,
    long: state.location.long,
    address: state.location.address,
  };
}

const AddressWrapper = connect(
  mapStateToProps
)(Address);

export default AddressWrapper;
