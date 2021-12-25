import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceDetection from './components/FaceDetection/FaceDetection';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

const particleOptions = {
  particles: {
    number: {
      density: {
        enable: true,
        value_area: 800,
      },
      value: 85,
    }
  }
};

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  showParticles: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      showParticles: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    };
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  setShowParticles = (showParticles) => {
    this.setState({ showParticles: showParticles })
  }

  componentDidMount() {
    setTimeout(() => {
      this.setShowParticles(true);
    }, 10);

    fetch('http://localhost:3100')
      .then(response => response.json())
      .then(console.log("Server is running"))
      .catch(() => console.log("server not running"));
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  calculateFaceLocation = (data) => {
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: face.left_col * width,
      topRow: face.top_row * height,
      rightCol: width - (face.right_col * width),
      bottomRow: height - (face.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
  }

  onButtonSubmit = (event) => {
    this.setState({ imageUrl: this.state.input });

    fetch("http://localhost:3100/imageUrl", {
      method: 'post',
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(result => {
        if (result) {
          fetch('http://localhost:3100/image', {
            method: 'put',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
            .catch(err => console.log(err));
        }
        this.displayFaceBox(this.calculateFaceLocation(JSON.parse(result, null, 2)))
      })
      .catch(error => console.log('error', error));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  }

  render() {
    const { imageUrl, box, route, isSignedIn } = this.state;

    return (
      <div className="App">

        {this.state.showParticles && (
          <Particles className='particles' params={particleOptions} />
        )}

        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === 'home'
          ? <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
            <FaceDetection box={box} imageUrl={imageUrl} />
          </div>
          : (
            route === 'signin'
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
}

export default App;
