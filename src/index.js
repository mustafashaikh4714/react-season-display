import React from 'react'
import ReactDOM from 'react-dom'
import SeasonDisplay from './SeasonDisplay'
import Spinner from './Spinner'

class App extends React.Component {
  state = { lat: null, errorMessage: '' }
  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      location => this.setState({ lat: location.coords.latitude }),
      error => this.setState({ errorMessage: error.message })
    )
  }
  renderContent = () => {
    if (this.state.lat && !this.state.errorMessage) {
      return (
        <div>
          <SeasonDisplay lat={this.state.lat} />
        </div>
      )
    }

    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>
    }

    return (
      <div>
        <Spinner message='Please accept location request' />
      </div>
    )
  }
  render() {
    return <div>{this.renderContent()}</div>
  }
}

ReactDOM.render(<App />, document.querySelector('#root'))
export default App
