import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      fullName: '',
      bio: '',
      profilePic: null,
      email: '',
      phone: '',
      zip: ''
    }
  }

  componentDidMount() {
    window.scrollTo(0,0);
    axios.get(`/api/userData/${this.props.match.params.userid}`).then(res => {
      let {fullname, bio, profile_pic, email, phone, zipcode} = res.data[0]
      console.log(res.data[0])
      this.setState({
        fullName: fullname,
        bio: bio,
        profilePic: profile_pic,
        email: email,
        phone: phone,
        zip: zipcode
      })
    })
  }

  changeName(value) {
    this.setState({fullName: value})
  }

  changeBio(value) {
    this.setState({bio: value})
  }

  changeEmail(value) {
    this.setState({email: value})
  }

  changePhone(value) {
    this.setState({phone: value})
  }

  changeZip(value) {
    this.setState({zip: value})
  }

  confirmChanges = async () => {
    let {fullName, bio, email, phone, zip} = this.state
    await axios.put(`/api/userData/${this.props.match.params.userid}`, {fullName, bio, email, phone, zip});
    this.props.history.push(`/profile/${this.props.match.params.userid}`);
  }

  deleteAccount = () => {
    axios.delete('/api/deleteUser')
  }

  render() {
    return (
      <div className='profileEdit-page'>
        <span className='profileEdit-span'>image</span>
        <div className='profileEdit-nameAndBio'>
          <div className='profileEdit-nameContainer'>
            <span className='profileEdit-span'>Name:</span>
            <br/>
            <input className='profileEdit-input' maxlength='100' value={this.state.fullName} onChange={e => this.changeName(e.target.value)}/>
          </div>
          <div className='profileEdit-bioContainer'>
            <span className='profileEdit-span'>Bio:</span>
            <br/>
            <textarea className='profileEdit-bio' maxlength='200' value={this.state.bio} onChange={e => this.changeBio(e.target.value)}/>
          </div>
        </div>
        <div className='emailAndPhone'>
          <div className='profileEdit-emailContainer'>
            <span className='profileEdit-span'>Email:</span>
            <br/>
            <input className='profileEdit-input' maxlength='70' value={this.state.email} onChange={e => this.changeEmail(e.target.value)}/>
          </div>
          <div className='profileEdit-phoneContainer'>
            <span className='profileEdit-span'>Phone Number:</span>
            <br/>
            <input className='profileEdit-input' maxlength='25' value={this.state.phone} onChange={e => this.changePhone(e.target.value)}/>
          </div>
          <div className='profileEdit-zipContainer'>
            <span className='profileEdit-span'>Zipcode:</span>
            <br/>
            <input className='profileEdit-input' maxlength='50' value={this.state.zip} onChange={e => this.changeZip(e.target.value)}/>
          </div>
        </div>
        <div className='profileEdit-buttonContainer'>
          <button className='profileEdit-confirm' onClick={() => this.confirmChanges()}>Confirm</button>
        </div>
        <div className='profileDelete-buttonContainer'>
          <Link to='/'><button className='profileEdit-confirm' onClick={() => this.deleteAccount()}>Delete Account</button></Link>
        </div>
      </div>
    )
  }
}