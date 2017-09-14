import React, { Component } from 'react';
import './../App.css';
import axios from 'axios';

class CreateOrg extends Component {
  constructor() {
    super();

    this.state = {
      orgId: '',
      orgName: {},
      orgLogo: '',
      slideImages: [],
      channelsArr: [{ channelId: '', channelName: '', admin: '', moderator: '' }],
      langs: ['eng'],
      feedsArr: [{ fName: {}, fIcon: '', fTarget: '', fId: '', fRunsOn: '' }],
      superAdmin: '',
      superModerator: '',
      channelId: '',
      channelName: '',
      admin: '',
      moderator: '',
      dashboardArr: [{ dIcon: '', dRef: '', dText: {}, dId: '', dType: '', dRunsOn: '' }],
      currentValues: [],
      langOptions: [
        { value: 'kan', text: 'Kannada' },
        { value: 'tel', text: 'Telugu' },
        { value: 'eng', text: 'English' },
        { value: 'hin', text: 'Hindi' }
      ]
    }
    this._handleProfilePicChange = this._handleProfilePicChange.bind(this);
    this._onLangChange = this._onLangChange.bind(this);
    this._handleSlidePicChange = this._handleSlidePicChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this.handleOrgNameChange = this.handleOrgNameChange.bind(this);

    this.handleFeedValuesChange = this.handleFeedValuesChange.bind(this);
    this.handleRemoveFeed = this.handleRemoveFeed.bind(this);
    this.handleAddFeed = this.handleAddFeed.bind(this);

    this.handleDashboardValueChange = this.handleDashboardValueChange.bind(this);
    this.handleRemoveDashboard = this.handleRemoveDashboard.bind(this);
    this.handleAddDashboard = this.handleAddDashboard.bind(this);

    this.handleChannelValueChange = this.handleChannelValueChange.bind(this);
    this.handleRemoveChannel = this.handleRemoveChannel.bind(this);
    this.handleAddChannel = this.handleAddChannel.bind(this);
  }

  handleOrgNameChange = (lang) => (e) => {
    let orgNameObj = this.state.orgName;
    orgNameObj[lang] = e.target.value;
    this.setState({ orgName: orgNameObj });
    //  console.log(this.state);
  }

  handleFeedValuesChange = (idx, lang) => (e) => {
    // console.log(lang);                                    
    const newFeed = this.state.feedsArr.map((feed, sidx) => {
      if (idx !== sidx) return feed;

      if (e.target.name !== 'fName') {
        return { ...feed, [e.target.name]: e.target.value };
      }
      else {
        //   console.log(feed);
        let temp = feed.fName;
        //   console.log(temp);
        temp[lang] = e.target.value;
        return { ...feed, 'fName': temp }
      }
    })

    this.setState({ feedsArr: newFeed });
  }

  handleRemoveFeed = (idx) => () => {
    if (this.state.feedsArr.length !== 1)
      this.setState({ feedsArr: this.state.feedsArr.filter((feed, sidx) => idx !== sidx) });
  }

  handleAddFeed = () => {
    this.setState({
      feedsArr: this.state.feedsArr.concat([{ fName: {}, fIcon: '', fTarget: '', fId: '', fRunsOn: '' }])
    })
  }

  handleDashboardValueChange = (idx, lang) => (e) => {
    const newDashboard = this.state.dashboardArr.map((dashboard, sIdx) => {
      if (idx !== sIdx) return dashboard;
      if (e.target.name !== 'dText') {
        return { ...dashboard, [e.target.name]: e.target.value };
      } else {
        const temp = dashboard.dText;
        temp[lang] = e.target.value;
        return { ...dashboard, 'dText': temp }
      }
    })
    this.setState({ dashboardArr: newDashboard });
  }

  handleRemoveDashboard = (idx) => () => {
    if (this.state.dashboardArr.length !== 1) {
      this.setState({
        dashboardArr: this.state.dashboardArr.filter((dashboard, sIdx) => idx !== sIdx)
      })
    }
  }

  handleAddDashboard = () => {
    this.setState({
      dashboardArr: this.state.dashboardArr.concat([{ dIcon: '', dRef: '', dText: {}, dId: '', dType: '', dRunsOn: '' }])
    })
  }

  handleChannelValueChange = (idx) => (e) => {
    const newChannel = this.state.channelsArr.map((channel, sIdx) => {
      if (idx !== sIdx) return channel;
      return { ...channel, [e.target.name]: e.target.value };
    })

    this.setState({ channelsArr: newChannel });
  }

  handleRemoveChannel = (idx) => () => {
    if (this.state.channelsArr.length !== 1) {
      this.setState({
        channelsArr: this.state.channelsArr.filter((channel, sIdx) => idx !== sIdx)
      })
    }
  }

  handleAddChannel = () => {
    this.setState({
      channelsArr: this.state.channelsArr.concat([{ channelId: '', channelName: '', admin: '', moderator: '' }])
    })
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

  _handleSlidePicChange(e) {
    e.preventDefault();
    var tempArr = [];
    for (var i = 0; i < e.target.files.length; i++) {
      //   console.log(e.target.files[i].name);
      tempArr.push({ 'name': e.target.files[i].name });
    }
    this.setState({ slideImages: tempArr });
    //  console.log(this.state);
  }

  _handleProfilePicChange(e) {
    e.preventDefault();
    this.setState({ orgLogo: e.target.files[0].name })
  }

  /*
    _onChangeName(e) {
      e.preventDefault();
       this.setState({name:e.target.value});
    }
  */
  _handleSubmit(e) {
    e.preventDefault();
    //   console.log(this.state);
    const tempChArr = this.state.channelsArr;
    let channelObj = {};
    const len = tempChArr.length;
    for (let i = 0; i < len; i++) {
      let t = tempChArr[i].channelId;
      channelObj[t] = tempChArr[i];
    }

    var datetime = (new Date()).getTime();
    var documentObj = {
      "header": {
        "docType": "OrganizationInfo",
        "author": "Shrey/Gautham",
        "orgId": this.state.orgId,
        "datetime": datetime,
        "docId": "20021",
        "ver": "1",
        "tags": " ",
        "temp": []
      },
      "body": {
        "uiData": {
          "langs": this.state.langs,
          "orgName": this.state.orgName,
          "orgLogo": this.state.orgLogo,
          "slides": this.state.slideImages,
          "feeds": this.state.feedsArr,
          "dashboard": this.state.dashboardArr
        },
        "appData": {
          "superAdmin": this.state.superAdmin,
          "superModerator": this.state.superModerator,
          "channels": channelObj
        }
      }
    }
    console.log(JSON.stringify(documentObj));
    /* 
        $.ajax({
          type: "POST",
          url: 'http://localhost:8080/AddOrg',
          data: documentObj,
          success: this.handleSubmitSuccess,
          error: this.handleSubmitFailure,
          dataType: 'json'
        }); 
    
    */
    var data = new FormData();
    data.append("json", JSON.stringify(documentObj));

    fetch("http://localhost:8080/AddOrg",
      {
        method: "POST",
        body: data,
        headers: {'Content-Type':'application/x-www-form-urlencoded'}
      })
      .then(function (res) { console.log(res) })
      .then(function (data) { console.log(data) })

    /* 
       axios({
         method: 'post',
         url: 'http://localhost:8080/AddOrg',
         data: data
       }).then(response => {
         console.log(response);
       }).catch(function (error) {
         console.log(error);
       })
     */
  }

  handleSubmitSuccess() {
    console.log('success');
  }
  handleSubmitFailure() {
    console.log('failure');
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
        <form>
          Languages:
          <ul>
            {options}
          </ul>

          <h3>Organisation Information</h3>
          Organization Id : <input type="text" value={this.state.orgId} onChange={(e) => this.setState({ orgId: e.target.value })} /><br />
          {this.state.langs.map((lang, indx) => (
            <div key={indx}>
              Organization Name ({lang}): <input type="text" value={this.state.orgName.lang} onChange={this.handleOrgNameChange(lang)} /><br />
            </div>
          ))}

          Organization Logo: <input type="file" accept="image" onChange={this._handleProfilePicChange} /><br />
          Sliding Images: <input type="file" accept="image" onChange={this._handleSlidePicChange} multiple /><br />

          <h3>AppData Information</h3>
          Super Admin: <input type="text" value={this.state.superAdmin} onChange={(e) => this.setState({ superAdmin: e.target.value })} /><br />
          Super Moderator: <input type="text" value={this.state.superModerator} onChange={(e) => this.setState({ superModerator: e.target.value })} /><br />
          <br />
          {this.state.channelsArr.map((channel, indx) => (
            <div key={indx}>
              <div>
                Channel Id: <input type="text" value={channel.channelId} name="channelId" onChange={this.handleChannelValueChange(indx)} /><br />
                Channel Name: <input type="text" value={channel.channelName} name="channelName" onChange={this.handleChannelValueChange(indx)} /><br />
                Admin: <input type="text" value={channel.admin} name="admin" onChange={this.handleChannelValueChange(indx)} /><br />
                Moderator: <input type="text" value={channel.moderator} name="moderator" onChange={this.handleChannelValueChange(indx)} /><br />
              </div>
              <div>
                <button type="button" onClick={this.handleRemoveChannel(indx)}>Remove(X)</button>
              </div>
            </div>
          ))}
          <button type="button" onClick={this.handleAddChannel}>Add(+)</button>

          <h3>Feeds Information</h3>
          {this.state.feedsArr.map((feed, indx) => (
            <div key={indx}>
              <div>
                {this.state.langs.map((lang, ind) => (
                  <div key={ind}>
                    Name ({lang}): <input type="text" value={feed.fName.lang} name="fName" onChange={this.handleFeedValuesChange(indx, lang)} /><br />
                  </div>
                ))}
                Icon: <input type="text" value={feed.fIcon} name="fIcon" onChange={this.handleFeedValuesChange(indx)} /><br />
                Target: <input type="text" value={feed.fTarget} name="fTarget" onChange={this.handleFeedValuesChange(indx)} /><br />
                Id: <input type="text" value={feed.fId} name="fId" onChange={this.handleFeedValuesChange(indx)} /><br />
                RunsOn: <input type="text" value={feed.fRunsOn} name="fRunsOn" onChange={this.handleFeedValuesChange(indx)} /><br />
              </div>
              <div>
                <button type="button" onClick={this.handleRemoveFeed(indx)}>Remove X</button>
              </div>
            </div>
          ))}
          <button type="button" onClick={this.handleAddFeed}>Add(+)</button>

          <h3>Dashboard Information</h3>
          {this.state.dashboardArr.map((dashboard, indx) => (
            <div key={indx}>
              <div>
                Icon: <input type="text" value={dashboard.dIcon} name="dIcon" onChange={this.handleDashboardValueChange(indx)} /><br />
                Ref: <input type="text" value={dashboard.dRef} name="dRef" onChange={this.handleDashboardValueChange(indx)} /><br />
                {this.state.langs.map((lang, idx) => (
                  <div key={idx}>
                    Text ({lang}): <input type="text" value={dashboard.dText.lang} name="dText" onChange={this.handleDashboardValueChange(indx, lang)} /><br />
                  </div>
                ))}
                Id: <input type="text" value={dashboard.dId} name="dId" onChange={this.handleDashboardValueChange(indx)} /><br />
                Type: <input type="text" value={dashboard.dType} name="dType" onChange={this.handleDashboardValueChange(indx)} /><br />
                Runs On: <input type="text" value={dashboard.dRunsOn} name="dRunsOn" onChange={this.handleDashboardValueChange(indx)} /><br />
              </div>
              <div>
                <button type="button" onClick={this.handleRemoveDashboard(indx)}>Remove(X)</button>
              </div>
            </div>
          ))}
          <button type="button" onClick={this.handleAddDashboard}>Add(+)</button>
          <br /> <br />
          <button type="submit" onClick={this._handleSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}

export default CreateOrg;
