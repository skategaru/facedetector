import React, { Component } from 'react';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      signInName: '',
      signInEmail: '',
      signInPassword: ''
    }
  }

  onNameChange = (event) => {
    this.setState({ signInName: event.target.value });
  }

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  }

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  }

  onRegister = () => {
    fetch('http://localhost:3100/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.state.signInName,
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
      });
  }

  render() {
    return (
      <article className="shadow-5 br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
        < main className="pa4 black-80" >
          <form className="measure">
            <fieldset id="register" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="Name">Name</label>
                <input onChange={(e) => this.onNameChange(e)} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="name" name="name" id="name" />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input onChange={(e) => this.onEmailChange(e)} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input onChange={(e) => this.onPasswordChange(e)} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
              </div>
            </fieldset>
            <div className="pointer">
              <input onClick={() => this.onRegister()} className="br3 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />
            </div>
          </form>
        </main >
      </article>
    );
  }

}

export default Register;