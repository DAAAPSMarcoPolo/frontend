/* eslint-disable */
import React, { Component } from 'react';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { Redirect } from 'react-router-dom';
import apiFetch from '../../utils/api.js';
import { saveToLocalStorage, getFromLocalStorage } from '../../utils/localstorage.js';
import '../../css/summary.css';
import '../../css/footer.css';
import edit_icon_white from '../../assets/pencil-icon.svg';
import edit_icon_orange from '../../assets/pencil-icon-orange.svg';
import Loader from '../components/Loader';
import EditSummary from './EditSummary';
import ModalConductor from '../components/modal/ModalConductor';
import Moment from 'react-moment';
import 'moment-timezone';
import moment from 'moment';

class Summary extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props);
    const { cookies } = this.props;
    this.state = {
      redirectToReferrer: false,
      summary: {},
      sentencesArray: [],
      sentences: [],
      response: [],
      brevity: 50,
      isWaiting: false,
      editMode: false,
      sentenceCount: null,
      text: '',
      receivedSummary: false,
      error: null,
      title: '',
      editTitle: false,
      wait: false,
      noteID: '',
      options: false,
      linkOpen: false,
      token: cookies.get('token'),
      nightMode: false,
      isOffline: false,
      showAddCollab: false,
      showViewCollab: false,
      showDelCollab: false,
      showSendReminder: false,
      redirect: false,
      dates: [],
      dateString: ''
    };
  }
  componentDidMount() {
    const { cookies } = this.props;
    const email = cookies.get('email');
    this.setState({
      noteID: this.props.match.params.noteID,
      token: cookies.get('token')
    });
    return apiFetch('getsumandnote', {
      headers: {
       'Content-Type': 'text/plain'
      },
      body: JSON.stringify({
        email,
        noteID: this.props.match.params.noteID,
      }),
      method: 'POST'
    }).then(response =>
      response.json()
    ).then((json) => {
        console.log('json', json[0]);
        if (json.success === false) {
          console.log('error', json.error);
          this.setError("we could not pull a summary from this noteID");
          window.setTimeout(function() { this.setError(null); }.bind(this), 4000);
        }
        else {
          // call funtion to send data to page
          let summary = JSON.parse(json[0].summary);
          if (summary !== "empty" && summary !== "") {
            console.log('receivedSummary = true');
            this.setState({
              receivedSummary: true,
              response: summary
            });
          }
          this.setState({
            text: json[0].noteText,
            title: json[0].name
          });
        }
      });

  }
  updateResponse = (index, priority) => {
    let newResponse = this.state.response;
    newResponse[index][1] = priority;
    this.setState({
      response: newResponse
    });
    this.updateSummary();
  }
  updateSummary = () => {
    const summary = [];
    const sentenceCount = Math.floor(this.state.brevity * (1/100) * this.state.response.length);
    this.setState({
      sentenceCount: sentenceCount
    });
    const sentences = [];
    this.state.response.forEach(sentence => {
      if (sentence[1] <= sentenceCount) {
        summary.push(sentence[0]);
      }
      sentences.push(sentence[0]);
    });
    this.setState({
      summary: summary.join(' '),
      text: summary.join(' '),
      sentencesArray: sentences
    });
  }
  summarize = (e) => {
    e.preventDefault();
    this.setState({
      wait: true
    });
    return apiFetch('summarizertext', {
      headers: {
       'Content-Type': 'text/plain'
      },
      body: JSON.stringify({
        text: this.state.text
      }),
      method: 'POST'
    }).then(response =>
      response.json()
    ).then((json) => {
        if (json.success === false) {
          console.log('error', json.error);
          this.setState({
            editMode: false,
            error: "json.error"
          });
        }
        else {
          // call funtion to send data to page
          this.setState({
            response: json.text,
            receivedSummary: true,
            wait: false
          });
          this.updateSummary();
        }
      });
  }
  summarizeLink = (e) => {
    //call function to grab text from article and pass it into summarize in request body?
  }
  handleTitle = (e) => {
    e.target.style.height = '1px';
    e.target.style.height = 25 + e.target.scrollHeight + 'px';
  }
  handleKeyUp = (e) => {
    e.target.style.height = (e.target.scrollHeight >= e.target.clientHeight && e.target.scrollHeight > 350) ? (e.target.scrollHeight)+"px" : "50vh";
  }
  onEdit = (e) => {
    this.setState({ text: e.target.value, receivedSummary: false });
  }
  onEditTitle = (e) => {
    this.setState({ title: e.target.value });
  }
  changeBrevity = (e) => {
    this.setState({
      brevity: e.target.value,
      sentenceCount: Math.floor(this.state.brevity * (1/100) * this.state.sentences.length)
    });
    if (this.state.receivedSummary === true) {
      this.updateSummary();
    }
  }
  updateNote = (e) => {
    e.preventDefault();
    const { cookies } = this.props;
    const email = cookies.get('email');

    if (this.state.isOffline === true) {
      saveToLocalStorage({
        text: this.state.text,
        title: this.state.title
      });
      console.log('in update note this.state.isOffline', this.state.isOffline);
      this.setError("This summary will be synced when you go back online!");
      window.setTimeout(function() { this.setError(null); }.bind(this), 4000);
      return;
    }
    let summary = 'empty';
    if (this.state.receivedSummary === true) {
      console.log('response', this.state.response);
      summary = this.state.response;
    }
    let noteText = this.state.text.replace(/[']+/g, "\\'");
    console.log('noteText', noteText);
    return apiFetch('createnote', {
      headers: {
       'Content-Type': 'text/plain'
      },
      body: JSON.stringify({
        text: summary,
        noteID: this.state.noteID,
        noteText: noteText,
        name: this.state.title,
        email
      }),
      method: 'POST'
    }).then(response =>
      response.text()
    ).then((json) => {
        json = JSON.parse(json);
        if (json.success === false) {
            this.setError("Your summary was not saved!");
            window.setTimeout(function() { this.setError(null); }.bind(this), 4000);
        }
        else {
          // call funtion to send data to page
          this.setState({
            editMode: false
          });
          this.setError("Your summary was successfully saved!");
          window.setTimeout(function() { this.setError(null); }.bind(this), 4000);
        }
      });
  }

  setError = (error) => {
    this.setState({
      error
    });
  }
  toggleEditMode = (e) => {
    e.preventDefault( );
    if (this.state.receivedSummary === true) {
      this.setState({
        editMode: !this.state.editMode
      });
    } else if (this.state.editMode === true) {
      this.setState({
        editMode: false
      });
    } else {
      this.setError("You can only edit summarized text!");
      window.setTimeout(function() { this.setError(null); }.bind(this), 4000);
    }
  }
  toggleEditTitle = () => {
    this.setState({
      editTitle: true
    });
  }
  toggleOptions = () => {
    this.setState({
      options: !this.state.options
    })
  }
  toggleLinkOpen = () => {
    this.setState({
      linkOpen: !this.state.linkOpen
    })
  }
  toggleState = (state, val) => {
    this.setState({
      state: val
    });
    if (state === "showAddCollab") {
      this.setState({
        showAddCollab:false
      });
    }
    else if (state === "showViewCollab") {
      this.setState({
        showViewCollab:false
      });
    }
    else if (state === "showSendReminder") {
      this.setState( {
        showSendReminder:false
      })
    }
    else if (state === "showDelCollab") {
      this.setState( {
        showDelCollab: false
      })
    }
  }
  viewAddCollab = () => {
    this.setState({ showAddCollab: true })
  }
  viewViewCollab = () => {
    this.setState({ showViewCollab: true })
  }
  viewDelCollab = () => {
    this.setState({ showDelCollab: true})
  }
  exportToText = () => {
    var e = document.createElement("a");
    var file = new Blob([this.state.text], {type: 'text/plain'}, "name");
    e.href = URL.createObjectURL(file);
    e.download = `${this.state.title} Simplifai Note.txt`;
    e.click();
  }
  exportToGoogle = (e) => {
    e.preventDefault();
    const { cookies } = this.props;
    const token = cookies.get('token');
    if (token === '') {
      this.setError("You do have an account attached.");
      return;
    }
    const req = {
      text: this.state.text,
      title: this.state.title,
      googleToken: token
    };
    console.log('req', req);
    return apiFetch('exportToDrive', {
      headers: {
       'Content-Type': 'text/plain'
      },
      body: JSON.stringify({
        text: this.state.text,
        title: this.state.title,
        googleToken: token
      }),
      method: 'POST'
    }).then(response =>
      response.text()
    ).then((json) => {
        json = JSON.parse(json);
        if (json.fileID) {
            this.setError("Your summary was successfully exported to Google Drive!");
            window.setTimeout(function() { this.setError(null); }.bind(this), 4000);
        }
        else {
          // call funtion to send data to page
          this.setError("Your summary was not successfully exported!");
          window.setTimeout(function() { this.setError(null); }.bind(this), 4000);
        }
      });
  }

  deleteNote = (e)=> {
    e.preventDefault();
    const { cookies } = this.props;
    const email = cookies.get('email');
    return apiFetch('deletenote', {
      headers: {
       'Content-Type': 'text/plain'
      },
      body: JSON.stringify({
        email: email,
        noteID: this.state.noteID

      }),
      method: 'POST'
      }).then(response =>
        response.text()
      ).then((json) => {
        json = JSON.parse(json);
        if (json.success === false) {
            this.setError("Error deleting note!");
            window.setTimeout(function() { this.setError(null); }.bind(this), 4000);
        }
        else {
          this.setError("Your note was successfully deleted!");
          window.setTimeout(function() { this.setError(null); }.bind(this), 4000);

          this.setState({
            redirect: true
          });
        }
      });
  }

  toggleNightMode = () => {
    this.setState({
      nightMode: !this.state.nightMode
    });
    const { cookies } = this.props;
    cookies.set('scheme','');
    cookies.get('night') === 'bgnight' ? cookies.set('night','') : cookies.set('night','bgnight');

    window.location.reload();
  }

  toggleOfflineMode = (e) => {
    e.persist();
    let offline = this.state.isOffline;
    this.setState({
      isOffline: !this.state.isOffline
    });
    console.log('before this.state.isOffline', this.state.isOffline);
    if (offline === true) {
      if (getFromLocalStorage('text') !== null || getFromLocalStorage('title')) {
        console.log('before set state');
        this.setState({
          text: getFromLocalStorage('text'),
          title: getFromLocalStorage('title'),
          isOffline: false
        }, () => {
          this.updateNote(e);
        });
      }
      else {
        this.setError("Your summary saved in offline mode was not saved correctly!");
        window.setTimeout(function() { this.setError(null); }.bind(this), 4000);
      }
    }
    else {
      this.setError("You are now in offline mode!");
      window.setTimeout(function() { this.setError(null); }.bind(this), 4000);
    }
  }

  viewSendReminder = () => {
    // this.setState({ showSendReminder: true });
    // TODO: add search for reg x and push props to modal component
    let dates = [];

    var regex = /(^|\s)((((0[13578]|1[02])[\/\.-](0[1-9]|[12]\d|3[01])[\/\.-]((19|[2-9]\d)\d{2})\s(0[0-9]|1[0-2]):(0[0-9]|[1-59]\d):(0[0-9]|[1-59]\d)\s(AM|am|PM|pm))|((0[13456789]|1[012])[\/\.-](0[1-9]|[12]\d|30)[\/\.-]((19|[2-9]\d)\d{2})\s(0[0-9]|1[0-2]):(0[0-9]|[1-59]\d):(0[0-9]|[1-59]\d)\s(AM|am|PM|pm))|((02)[\/\.-](0[1-9]|1\d|2[0-8])[\/\.-]((19|[2-9]\d)\d{2})\s(0[0-9]|1[0-2]):(0[0-9]|[1-59]\d):(0[0-9]|[1-59]\d)\s(AM|am|PM|pm))|((02)[\/\.-](29)[\/\.-]((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))\s(0[0-9]|1[0-2]):(0[0-9]|[1-59]\d):(0[0-9]|[1-59]\d)\s(AM|am|PM|pm)))(\s|$))+/g;

    if (this.state.text) {
      dates = this.state.text.match(regex);
      console.log('dates after regex', dates);
      if (!dates) {
        this.setState({
          dateFound: false,
          dates: dates,
          showSendReminder: true
        });
        return;
      }
      let formatted =  [];
      dates.forEach(date => {
        var momentDate = moment(date, "MM/DD/YYYY HH:mm:ss A");
        var iso = momentDate.toISOString();
        console.log('iso', iso);
        var index = iso.split("").reverse().join("").indexOf('.');
        console.log('index', index);
        var substring = iso.substring(0, 10);
        console.log('substring', substring);
        formatted.push(substring);
      });
      this.setState({
        dates: formatted,
        dateFound: true,
        showSendReminder: true
      });
    }
    else {
      this.setState({
        dateFound: false
      });
    }

    // console.log('date pulled from array', dates[0]);
    // var momentDate = moment(dates[0], "MM/DD/YYYY HH:mm:ss A");
    //
    // var iso = momentDate.toISOString();
    // console.log('iso', iso);
    // var index = iso.split("").reverse().join("").indexOf('.');
    // console.log('index', index);
    // var substring = iso.substring(0, iso.length - index - 1);
    // console.log('substring', substring);
    // var newData = substring + '-05:00';
    // console.log('newData', newData);

  }
  render() {
    const { cookies } = this.props;
    const isAuthenticated = cookies.get('isAuthenticated');
    if (isAuthenticated === "false" || !isAuthenticated) {
      return (<Redirect to="/login"/>);
    }
    if (this.state.redirect === true) {
       return (<Redirect to="/notes"/>);
    }
    const sentences = [];
    this.state.sentences.forEach(sentence => {
      sentences.push(<p>{sentence}</p>);
    });
    return (
      <div className="summary">
        {this.state.wait ? <Loader/> : null}
        <form onSubmit={this.summarize}>
          <textarea className="h1" name="textarea" placeholder="Enter a Title..." value={this.state.title} onChange={this.onEditTitle} onKeyPress={this.handleTitle} />

          <button className="icon orange" onClick={this.toggleEditMode}><img src={edit_icon_orange} alt="edit"/></button>
          {this.state.error ? <p>{this.state.error}</p> : null}
          {this.state.editMode ?
            <EditSummary brevity={this.state.brevity} response={this.state.response} updateResponse={this.updateResponse} setError={this.setError} />
            :
            <textarea className="note" name="textarea" placeholder="Start taking notes..." onKeyUp={this.handleKeyUp} value={this.state.text} onChange={this.onEdit} id="summary"/>
          }
          <button className="fixed" type="submit">Summarize</button>
          <button onClick={this.updateNote} className="fixed save">Save</button>
        </form>
        <div className="brevity fixed fixed-slider">
          <label>Brevity {this.state.brevity}%</label>
          <input type="range" min="1" max="100" className="slider" id="myRange" value={this.state.brevity} onChange={this.changeBrevity} />
        </div>

        <div className="footer">
          <button className="button" onClick={this.toggleEditMode}><img src={edit_icon_white} alt="edit_icon_white"/></button>
          <button className="button" onClick={this.toggleOptions}>?</button>
        </div>

        {this.state.options
          ?
          (<div className="options drop">
            <p onClick={this.exportToText}>Export to text file</p>
            {this.state.token !== '' ? <p onClick={this.exportToGoogle}>Export to Google Drive</p> : null}
            <p onClick={this.toggleNightMode}>Toggle Night Mode</p>
            <p onClick={this.viewSendReminder}>Search for Dates</p>
            <p onClick={this.toggleOfflineMode}>Toggle Offline Mode</p>
            <p onClick={this.viewAddCollab}> Add Collaborator </p>
            <p onClick={this.viewViewCollab}> View Collaborator </p>
            <p onClick={this.viewDelCollab}> Delete Collaborator </p>
            <p onClick={this.deleteNote}> Delete this Note </p>
          </div>) : null
        }
        {this.state.showAddCollab ?

        <ModalConductor name={'showAddCollab'} showModal= {this.state.showAddCollab} toggleState = {this.toggleState} noteID = {this.state.noteID} currentModal='ADDCOLLAB'/>: null}

        {this.state.showViewCollab ?
        <ModalConductor name={'showViewCollab'} showModal= {this.state.showViewCollab} toggleState = {this.toggleState}  noteID = {this.state.noteID} currentModal='VIEWCOLLAB'/>: null}

        {this.state.showDelCollab ?
        <ModalConductor name={'showDelCollab'} showModal= {this.state.showDelCollab} toggleState = {this.toggleState} currentModal='DELCOLLAB' noteID={this.state.noteID} />: null}

        {this.state.showSendReminder ?
        <ModalConductor name={'showSendReminder'} text={this.state.text} dates={this.state.dates} dateFound={this.state.dateFound} showModal={this.state.showSendReminder} toggleState={this.toggleState} currentModal='SENDREMINDER'/>: null}

      </div>
    );
  }
}

export default withCookies(Summary);
