import React, { Component } from 'react';
import axios from 'axios';
import './../App.css';
import {Link} from 'react-router-dom';

class OrgList extends Component {
  constructor(props) {
    super(props);
    this.state = { organisations: [] };
    this.handleCreateNewOrg = this.handleCreateNewOrg.bind();
  }

  handleCreateNewOrg() {
       
  }

  componentDidMount() {
    axios.get('http://localhost:8080/getOrgs')
      .then(response => {
        console.log(response.data.data);
        this.setState({ organisations: response.data.data });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  render() {
    var orgsList = this.state.organisations.map(function (org, $index) {
      return (
        <li key={$index}>                
          <Link to={'/ViewOrg/'+org._id}>{org.body.uiData.orgName.eng}</Link>
        </li>
      )
    })
    
    return (
      <div className="row OrgListMainDiv">
        <div className="col-md-4">
          
          <Link to={'/CreateOrg'}>Create New Org</Link>
        </div>
        <div className="col-md-8 orgListBodyDiv">
          <div>{orgsList}</div>
        </div>
      </div>
    );
  }
}

export default OrgList