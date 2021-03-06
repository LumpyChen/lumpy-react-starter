import React from 'react'
import { Router, Route, browserHistory, IndexRedirect } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import store from '../store'

import App from '../layouts/App.jsx'
import Home from '../components/Home.jsx'
import Comment from '../components/Comment.jsx'
import { StepOne, StepTwo, StepThree } from '../components/StepText.jsx'
import PackageIntro from '../components/PackageIntro.jsx'
import Add from '../components/Add.jsx'
import Revert from '../components/Revert.jsx'
import Reset from '../components/Reset.jsx'
import Page404 from '../components/404.jsx'

const history = syncHistoryWithStore(browserHistory, store)

const authTransition = (nextState, replace) => {
  const state = store.getState()
  const path = state.routing.locationBeforeTransitions.pathname.replace('\\', '/')
  let conf = false
  state.chipData.present.toJS().forEach((ele) => (
    conf = `/packages/${ele.label}` === path ? true : conf
  ))
  if (!conf) {
    replace('/404')
  }
}

export default () => (
  <Provider store={store} >
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRedirect to="/packages" />
        <Route path="/packages" component={Home} >
          <Route path="/new" component={Add} />
          <Route path="/revert" component={Revert} />
          <Route path="/reset" component={Reset} />
          <Route path=":label" component={PackageIntro} onEnter={authTransition} />
        </Route>
        <Route path="/comment" component={Comment}>
          <IndexRedirect to="1" />
          <Route
            path="(1)(2)(3)"
            components={{ one: StepOne, two: StepTwo, three: StepThree }}
          />
        </Route>
        <Route path="*" component={Page404} />
      </Route>
    </Router>
  </Provider>
)
