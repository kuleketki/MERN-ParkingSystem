//import './App.scss';
import AppNavbar from './AppNavbar/AppNavbar';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import SignUp from './AppSignup/AppSignup';
import LoginPage from './AppLogin/AppLogin';
import 'bootstrap/dist/css/bootstrap.min.css';

import SearchBar from './SearchBar/SearchBar';
import ViewPage from './ViewPage/ViewPage';
import AddParkingSpace from './AppParkingSpace/AppParkingSpace';
import AppListing from './AppListing/AppListing';
import { useEffect } from 'react';
import BookingPage from './BookingPage/BookingPage';
import UserBookingDetails from './UserBookingDetails/UserBookingDetails';

function App() {
  // const handleWindowClose = () => {
  //   debugger;
  //   localStorage.clear();
  // };

  // useEffect(() => {
  //   //clear localstorage when window is close
  //   window.addEventListener('onbeforeunload', handleWindowClose);
  // });

  return (
    <div>
      <HashRouter>
        <div>
          <AppNavbar />
          <Switch>
            <Route exact path='/'>
              <Redirect to='/search' />
            </Route>
            <Route exact path='/viewpage/' component={ViewPage} />
            <Route exact path='/search' component={SearchBar} />
            <Route exact path='*/login' component={LoginPage} />
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/addspace' component={AddParkingSpace} />

            <Route exact path='/bookingpage/' component={BookingPage} />
            <Route
              exact
              path='/userbookingdetails/'
              component={UserBookingDetails}
            />

            <Route exact path='/listings' component={AppListing} />
          </Switch>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
