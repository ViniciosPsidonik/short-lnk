import { Meteor } from 'meteor/meteor'
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Signup from './../ui/Signup';
import Link from './../ui/Link';
import Login from './../ui/Login';
import NotFound from './../ui/NotFound';

const unathenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.replace("/links");
  }
}

const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    browserHistory.replace("/");
  }
}

export const routes = (
  <Router history={browserHistory}>
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage} />
    <Route path="/links" component={Link} onEnter={onEnterPrivatePage} />
    <Route exact path="/" component={Login} onEnter={onEnterPublicPage} />
    <Route path="*" component={NotFound} />
  </Router>
);

window.browserHistory = browserHistory;

export const onAuthChange = (isAuthenticated) =>{
  const pathname = browserHistory.getCurrentLocation().pathname;
  const IsUnauthenticatedPage = unathenticatedPages.includes(pathname);
  const IsAuthenticatedPage = authenticatedPages.includes(pathname);

  if (IsUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace("/links");
  } else if (IsAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace("/");
  }

  console.log('Meteor.userId();', Meteor.userId());
}