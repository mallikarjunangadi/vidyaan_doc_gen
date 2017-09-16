
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import OrgList from './components/OrgList';
import App from './App';
import ViewOrg from './components/ViewOrg'; 
import CreateOrg from './components/CreateOrg';
import UsersList from './components/UsersList'; 
import CreateUser from './components/CreateUser'; 

ReactDOM.render(
  <Router>
      <div> 
        <Route exact path='/' component={App} />
        <Route path='/OrgList' component={OrgList} /> 
        <Route path='/CreateOrg' component={CreateOrg} /> 
        <Route path='/UsersList' component={UsersList} /> 
        <Route path='/CreateUser' component={CreateUser} /> 
        <Route path='/ViewOrg/:id' component={ViewOrg} /> 
      </div>
  </Router>, 
  document.getElementById('root')
); 