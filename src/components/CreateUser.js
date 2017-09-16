 import React, { Component } from 'react';

class CreateUser extends Component {
  constructor() {
    super();

    this.state = {
      orgId: '',
      orgName: '',
      subscriberName: '',
      subscriberRole: 'teacher',
      subscriberId: '',
      password: '',
      remarks: '',
      firstName: {},
      lastName: {},
      fatherName: {},
      motherName: {},
      gaurdianName: {},
      mobileNumber1: '',
      mobileNumber2: '',
      mobileNumber3: '',
      mobileNumber4: '',
      emailId1: '',
      emailId2: '',
      classTeacher: {},
      designation: {},
      division: '',
      avatar: '',
      titled: {},
      address: {},
      bloodGroup: 'A+',
      dob: '',
      enrollmentNumber: '',
      gender: {},
      langOptions: [
        { value: 'kan', text: 'Kannada' },
        { value: 'tel', text: 'Telugu' },
        { value: 'eng', text: 'English' },
        { value: 'hin', text: 'Hindi' }
      ],
      langs: ['eng']
    }

    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleDate = this._handleDate.bind(this);
    this._onLangChange = this._onLangChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }


  handleInputChange = (lang) => (e) => {
    const fieldName = e.target.name;
    const temp = this.state[fieldName];
    temp[lang] = e.target.value;
    this.setState({ [fieldName]: temp });
  }
                                                                                                                                      
  _onLangChange(e) {                                                                                                                    
    if (e.target.value !== 'eng') {
      e.preventDefault();
      var tempArr = this.state.langs;  
      var ind = tempArr.indexOf(e.target.value);
      if (ind > -1) {
        tempArr.splice(ind, 1);
      } else {
        tempArr.push(e.target.value);
      }
      setTimeout(() => { this.setState({ langs: tempArr }) }, 0);
    }
  }

  _handleDate(e) {
    console.log(e.target.value);
    this.setState({ dob: e.target.value });
    console.log(this.state);
  }

  _handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    var dob = this.state.dob;
    console.log(typeof dob)
    dob = dob.split("-").reverse().join("/");
    // this.setState({"dob":dob});
    console.log(dob);

    var datetime = (new Date()).getTime();
    var mobileNumbers = [];

    if (this.state.mobileNumber1) {
      mobileNumbers.push(this.state.mobileNumber1);
    }
    if (this.state.mobileNumber2) {
      mobileNumbers.push(this.state.mobileNumber2);
    }
    if (this.state.mobileNumber3) {
      mobileNumbers.push(this.state.mobileNumber3);
    }
    if (this.state.mobileNumber4) {
      mobileNumbers.push(this.state.mobileNumber4);
    }

    var emailIds = [];
    console.log(this.state.emailId1);
    if (this.state.emailId1) {
      emailIds.push(this.state.emailId1);
    }
    if (this.state.emailId2) {
      emailIds.push(this.state.emailId2);
    }

    var userDoc = {
      "DocumentHeader": {
        "DocumentType": "SubscriberInfo",
        "Author": "shrey/gautham",
        "OrganizationId": this.state.orgId,
        "OrganizationName": this.state.orgName,
        "Datetime": datetime,
        "DocumentId": "100001",
        "version": "1.0",
        "tags": "default"
      },
      "DocumentSubHeader": {
        "ChannelId": "default",
        "ProgramId": "default",
        "ModeratorId": "default"
      },
      "DocumentBody": {
        "ApplicationSpecificData": {
          "SubscriberID": this.state.subscriberId,
          "password": this.state.password,
          "SubscriberName": this.state.subscriberName,
          "SubscriberRole": this.state.subscriberRole,
          "SubscribedChannels": [
            "1A-smcmalaysia"
          ],
          "previlageLevels": {},
          "teacherFor": {},
          "classTeacherFor": [
            "1C-smcmalaysia"
          ],
          "Subscribersspecific": {
            "remarks": this.state.remarks,
            "abcentDays": [
              "23 May 2016",
              "2 Dec 2016"
            ]
          }
        },
        "Document_Details": {
          "profile": {
            "FirstName": this.state.firstName,
            "LastName": this.state.lastName,
            "FathersName": this.state.fatherName,
            "MothersName": this.state.motherName,
            "GaurdiansName": this.state.gaurdianName,
            "MobileNumbers": mobileNumbers,
            "EmailIds": emailIds,
            "ClassTeacher": this.state.classTeacher,
            "Designation": this.state.designation,
            "Division": this.state.division,
            "Avatar": this.state.avatar,
            "Titled": this.state.titled,
            "Address": this.state.address, 
            "BloodGroup": this.state.bloodGroup,
            "DOB": dob,
            "EnrollmentNumber": this.state.enrollmentNumber,
            "Gender": this.state.gender
          }
        }
      }
    }
    console.log(userDoc);
  }

  render() {
    const options = this.state.langOptions.map(opt => {
      return (
        <li key={opt.value} className="react-select-option" >
          <input onChange={this._onLangChange} type='checkbox' checked={this.state.langs.indexOf(opt.value) > -1} value={opt.value} name={opt.value} key={opt.value} /> {opt.text}
        </li>
      );
    });

    return (
      <div className="App">
        <form onSubmit={this._handleSubmit} className="form-horizontal" >
          <div className="form-group">
            <label className="control-label col-sm-4">Languages:</label>
            <div className="col-sm-4">
              <ul>
                {options}
              </ul>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-4">OrganizationId :</label>
            <div className="col-sm-4">
              <input type="text" id="orgId" name="orgId" value={this.state.orgId} onChange={(e) => this.setState({ orgId: e.target.value })} />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-4">organizationName: </label>
            <div className="col-sm-4">
              <input type="text" name="orgName" id="orgName" value={this.state.orgName} onChange={(e) => this.setState({ orgName: e.target.value })} />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-4">SubscriberName: </label>
            <div className="col-sm-4">
              <input type="text" value={this.state.subscriberName} onChange={(e) => this.setState({ subscriberName: e.target.value })} />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-4">SubscriberID: </label>
            <div className="col-sm-4">
              <input type="text" value={this.state.subscriberId} onChange={(e) => this.setState({ subscriberId: e.target.value })} />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-4">subscriberRole:</label>
            <div className="col-sm-4">

              <select value={this.state.subscriberRole} onChange={(e) => this.setState({ subscriberRole: e.target.value })} >
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-4">Password: </label>
            <div className="col-sm-4">
              <input type="text" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-4">Remarks: </label>
            <div className="col-sm-4">
              <textarea value={this.state.remarks} onChange={(e) => this.setState({ remarks: e.target.value })} />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-4">Profile Pic: </label>
            <div className="col-sm-4">
              <input type="file" accept="image" onChange={(e) => this.setState({ avatar: e.target.files[0].name })} />
            </div>
          </div>
          {this.state.langs.map((lang, ind) => (
            <div key={ind} className="form-group">
              <label className="control-label col-sm-4">First Name ({lang}): </label>
              <div className="col-sm-4">
                <input type="text" value={this.state.firstName[lang]} name="firstName" onChange={this.handleInputChange(lang)} />
              </div>
            </div>
          ))}
          {this.state.langs.map((lang, ind) => (
            <div key={ind} className="form-group">
              <label className="control-label col-sm-4">Last Name ({lang}): </label>
              <div className="col-sm-4">
                <input type="text" value={this.state.lastName[lang]} name="lastName" onChange={this.handleInputChange(lang)} />
              </div>
            </div>
          ))}
          {this.state.langs.map((lang, ind) => (
            <div key={ind} className="form-group">
              <label className="control-label col-sm-4">Father Name ({lang}): </label>
              <div className="col-sm-4">
                <input type="text" value={this.state.fatherName[lang]} name="fatherName" onChange={this.handleInputChange(lang)} />
              </div>
            </div>
          ))}
          {this.state.langs.map((lang, ind) => (
            <div key={ind} className="form-group">
              <label className="control-label col-sm-4">Mother Name ({lang}): </label>
              <div className="col-sm-4">
                <input type="text" value={this.state.motherName[lang]} name="motherName" onChange={this.handleInputChange(lang)} />
              </div>
            </div>
          ))}
          {this.state.langs.map((lang, ind) => (
            <div key={ind} className="form-group">
              <label className="control-label col-sm-4">Gaurdian Name ({lang}): </label>
              <div className="col-sm-4">
                <input type="text" value={this.state.gaurdianName[lang]} name="gaurdianName" onChange={this.handleInputChange(lang)} />
              </div>
            </div>
          ))}
          <div className="form-group">
            <label className="control-label col-sm-4">Mobile Number 1: </label>
            <div className="col-sm-4">
              <input type="number" value={this.state.mobileNumbers1} onChange={(e) => this.setState({ mobileNumber1: e.target.value })} />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-4">Mobile Number 2:  </label>
            <div className="col-sm-4">
              <input type="number" value={this.state.mobileNumbers2} onChange={(e) => this.setState({ mobileNumber2: e.target.value })} />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-4">Mobile Number 3: </label>
            <div className="col-sm-4">
              <input type="number" value={this.state.mobileNumbers3} onChange={(e) => this.setState({ mobileNumber3: e.target.value })} />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-4">Mobile Number 4: </label>
            <div className="col-sm-4">
              <input type="number" value={this.state.mobileNumbers4} onChange={(e) => this.setState({ mobileNumber4: e.target.value })} />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-4">Email Id1: </label>
            <div className="col-sm-4">
              <input type="email" value={this.state.emailId1} onChange={(e) => this.setState({ emailId1: e.target.value })} />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-4">Email Id2: </label>
            <div className="col-sm-4">
              <input type="email" value={this.state.emailId2} onChange={(e) => this.setState({ emailId2: e.target.value })} />
            </div>
          </div>
          {this.state.langs.map((lang, ind) => (
            <div key={ind} className="form-group">
              <label className="control-label col-sm-4">Class Teacher ({lang}): </label>
              <div className="col-sm-4">
                <input type="text" value={this.state.classTeacher[lang]} name="classTeacher" onChange={this.handleInputChange(lang)} />
              </div>
            </div>
          ))}
          {this.state.langs.map((lang, ind) => (
            <div key={ind} className="form-group">
              <label className="control-label col-sm-4"> Designation ({lang}): </label>
              <div className="col-sm-4">
                <input type="text" value={this.state.designation[lang]} name="designation" onChange={this.handleInputChange(lang)} />
              </div>
            </div>
          ))}
          <div className="form-group">
            <label className="control-label col-sm-4">Division: </label>
            <div className="col-sm-4">
              <input type="text" value={this.state.division} onChange={(e) => this.setState({ division: e.target.value })} />
            </div>
          </div>
          {this.state.langs.map((lang, ind) => (
            <div key={ind} className="form-group">
              <label className="control-label col-sm-4">Titled ({lang}): </label>
              <div className="col-sm-4">
                <input type="text" value={this.state.titled[lang]} name="titled" onChange={this.handleInputChange(lang)} />
              </div>
            </div>
          ))}
          {this.state.langs.map((lang, ind) => (
            <div key={ind} className="form-group">
              <label className="control-label col-sm-4">Address ({lang}): </label>
              <div className="col-sm-4">
                <textarea value={this.state.address[lang]} name="address" onChange={this.handleInputChange(lang)} />
              </div>
            </div>
          ))}
          <div className="form-group">
            <label className="control-label col-sm-4">Blood Group:</label>
            <div className="col-sm-4">
              <select value={this.state.bloodGroup} onChange={(e) => this.setState({ bloodGroup: e.target.value })}  >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-4">Dob:</label>
            <div className="col-sm-4">
              <input type="date" value={this.state.dob} onChange={this._handleDate} />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-4">EnrollmentNumber : </label>
            <div className="col-sm-4">
              <input type="text" value={this.state.enrollmentNumber} onChange={(e) => this.setState({ enrollmentNumber: e.target.value })} />
            </div>
          </div>
          {this.state.langs.map((lang, ind) => (
            <div key={ind} className="form-group">
              <label className="control-label col-sm-4"> Gender ({lang}) :</label>
              <div className="col-sm-4">
                <input type="text" value={this.state.gender[lang]} name="gender" onChange={this.handleInputChange(lang)} />
              </div>
              {
                /* 
                 <div className="col-sm-2">
                   <select value={this.state.gender} onChange={(e) => this.setState({ gender: e.target.value })} >
                     <option value="male">Male</option>
                     <option value="female">Female</option>
                   </select>
                 </div>
                */
              }
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
      </div >
    );
  }
}

export default CreateUser;
