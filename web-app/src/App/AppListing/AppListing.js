import React, { useEffect } from 'react';
import {
  Card,
  CardGroup,
  Container,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import './AppListing.scss';
import {
  fetchListings,
  refreshListingsList,
} from '../../Store/Actions/listings.action';
import { connect } from 'react-redux';
import AppLoading from '../AppLoading/AppLoading';
import AppNotification from '../AppNotification/AppNotification';
import AppListingDetails from '../AppListingDetails/AppListingDetails';
import { useRef } from 'react';

function AppListing(props) {
  const { isLoading, listings, wasLoaded } = props;

  useEffect(() => {
    //component mount code
    console.log('useEffect called');
    return () => {
      console.log('UNMOUNTEDs');
      props.refreshListingsList();
    };
  }, []);

  useEffect(() => {
    console.log('useEffect wasLoaded');

    if (!wasLoaded) {
      props.fetchListings();
    }
  }, [props.wasLoaded]);

  if (isLoading || !wasLoaded) {
    return <AppLoading></AppLoading>;
  }
  return (
    <Container>
      <div className='page-header'>
        <h4>Listed Parking Spaces</h4>
        <AppNotification error={props.error}></AppNotification>
      </div>
      <ListGroup variant='flush'>
        {listings.map((item) => (
          <ListGroupItem>
            <AppListingDetails item={item}></AppListingDetails>
          </ListGroupItem>
        ))}
      </ListGroup>
    </Container>
  );
}

//add the state data to local props for easy access
function mapStateToProps(state, ownProps) {
  return {
    isLoading: state.listings.isLoading,
    listings: state.listings.listings,
    error: state.listings.error,
    wasLoaded: state.listings.wasLoaded,
  };
}

//maping fetchListings to props
const mapDispatchToProps = {
  fetchListings: fetchListings,
  refreshListingsList: refreshListingsList,
};

//map methods to connect and export
const ConnectedListings = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppListing);
export default ConnectedListings;
