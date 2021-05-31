import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Desks from './components/Desks';
import Desk from './components/Desk'
import Typology from './components/Typology'
import { AuthProvider } from './contexts/AuthContext';
import OwnNavbar from './components/OwnNavbar';


function App() {
  return (
      <AuthProvider>
          <Router>
            <OwnNavbar></OwnNavbar>
            <div style={{"marginTop": "60px"}}>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/desks' component={Desks} />
                <Route path='/typologies/:id' component={Typology} />
                <Route path='/desks/:id' component={Desk} />
                <Route path='/login' component={Login} />
                <Route path='/signup' component={Signup} />
              </Switch>
            </div>
          </Router>
      </AuthProvider>
  );
}


export default App;
