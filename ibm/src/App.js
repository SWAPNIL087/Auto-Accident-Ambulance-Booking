import './App.css';
import UHome from './Components/UserHome';
import AmbulanceHome from './Components/AmbulanceHome';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Navbar from './Components/Navbar';
import A_Register from './Components/Register_ambulance';
import Home from './Components/Home'
import Login from './Components/Login';
import Logout from './Components/Logout';
import UserLogin from './Components/UserLogin';
import User_Register from './Components/UserRegister';
import SimpleMap2 from './Components/Map2';
import LogoutUser from './Components/Logoutuser';
import Footer from './Components/Footer';

function App() {
  return (
    
    <div className="App">
      <BrowserRouter>
      
      <Route component={Navbar}/>
      <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/login' component={Login}/>
      <Route exact path='/logout' component={Logout}/>
      <Route exact path='/logoutUser' component={LogoutUser}/>

      <Route exact path='/User_Home' component={UHome}/>
      <Route exact path='/User_Register' component={User_Register}/>
      <Route exact path='/Ambulance_Home' component={AmbulanceHome}/>
      <Route exact path='/ambulance_register' component={A_Register}/>
      <Route exact path='/userLogin' component={UserLogin}/>
      <Route exact path='/AmbulanceMap' component={SimpleMap2}/>
      
      {/* <Route component={PageNotFound} /> */}
      </Switch>
      <Route component={Footer}/>
    
  </BrowserRouter>
    </div>
  );
}

export default App;
