import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'; 

class UsersList extends Component {
    constructor(props) {
        super(props);
        this.state = { }
  }

  ComponentDidMount() {
      var orgDetails = this.props.navigator;
      console.log(orgDetails);
  }

  render() {                            
      return (                          
          <div className="row">         
              <div className="col-md-5">
                  <Link to={'/CreateUser'}>Create User</Link>
              </div>                    
              <div className="col-md-7">
                  Users List            
              </div>                    
          </div>                        
      )                                 
  }
}    

export default UsersList;