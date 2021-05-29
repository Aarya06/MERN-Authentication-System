import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import './App.css';
import Home from './components/Home';
import Register from './components/Register';
import API from './utils/api';
import { HTTP_CODES, USER_TYPE } from './utils/constants';

const App = () => {
  const [user, setUser] = useState({});
  const [isLoggedIn, seIsLoggedIn] = useState(false)

  const handleSignUp = async ({ email, password }) => {
    const config = { headers: { 'Content-Type': 'application/json' } }
    try {
      const response = await API.post('user/signup', { email, password }, config)
      if (response.status === HTTP_CODES.CREATED) {
        seIsLoggedIn(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleLogin = async ({ email, password }) => {
    const config = { headers: { 'Content-Type': 'application/json' } }
    try {
      const response = await API.post('user/login', { email, password }, config)
      if (response.status === HTTP_CODES.SUCCESS) {
        seIsLoggedIn(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleFetchUser = async () => {
    const config = { headers: { 'Content-Type': 'application/json' } }
    try {
      const response = await API.get('/', config)
      if (response.status === HTTP_CODES.SUCCESS) {
        seIsLoggedIn(true)
        setUser(response.data.user)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleLogout = async () => {
    try {
      const response = await API.get('/user/logout')
      if (response.status === HTTP_CODES.SUCCESS) {
        seIsLoggedIn(false)
        setUser({})
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    handleFetchUser()
  }, [isLoggedIn])


  return (
    <Router>
      <Switch>
        <Route path='/' exact={true}>
          <Home data={user} onLogout={handleLogout} />
        </Route>
        <Route path='/login'>
          {isLoggedIn ?
            <Redirect to='/' /> :
            <Register userType={USER_TYPE.LOGIN} redirect='/signup' onSubmit={handleLogin} />
          }
        </Route>
        <Route path='/signup'>
          {isLoggedIn ?
            <Redirect to='/' /> :
            <Register userType={USER_TYPE.SIGNUP} redirect='/login' onSubmit={handleSignUp} />
          }
        </Route>
      </Switch>
    </Router>
  )
}

export default App;