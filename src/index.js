
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import OrgList from './components/OrgList';
import App from './App';
import ViewOrg from './components/ViewOrg'; 

ReactDOM.render(
  <Router>
      <div>
        <Route exact path='/' component={App} />
        <Route path='/OrgList' component={OrgList} /> 
        <Route path='/ViewOrg/:id' component={ViewOrg} /> 
      </div>
  </Router>, 
  document.getElementById('root')
); 