import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Layout from '../components/Layout'
import Login from '../pages/Login'
import Register from '../pages/Register'
import VerifyToken from '../components/VeryfyToken'
import Home from '../pages/Home'
import Menu from '../pages/Menu'
import NotFound from '../pages/NotFound'

function App () {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/menu' component={Menu} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/verifyToken' component={VerifyToken} />
          <Route exact path='/login' component={Login} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  )
}

export default App
