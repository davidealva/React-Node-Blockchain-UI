import React, { Component } from 'react'
import axios from 'axios';
import { Row } from 'muicss/react'
import Endpoint from './components/endpoint'
import Add from './components/add_content'
import Query from './components/query_content'
import Table from './components/table'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
			response: ""
		}
  }

  callApi(url) {
    axios.get(url)
    .then(res => {
      this.setState({ response: res.data })
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error)
    });
  }

  handleHash(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log(data)

    for (var key of data.keys()) {
       console.log(key)
    }
    // Display the values
    for (var value of data.values()) {
       console.log(value)
    }
    const url = `/query/hash/?${key}=${value}`
    console.log(url)
    this.callApi(url)
  }

  handleContent(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log(data)

    for (var key of data.keys()) {
       console.log(key);
    }
    // Display the values
    for (var value of data.values()) {
       console.log(value);
    }
    const url = `/query/content?${key}=${value}`
    console.log(url)
    this.callApi(url)
  }

  handleTags(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log(data)

    for (var key of data.keys()) {
       console.log(key);
    }
    // Display the values
    for (var value of data.values()) {
       console.log(value);
    }
    const url = `/query/tags?${key}=${value}`
    console.log(url)
    this.callApi(url)
  }

  handleRange(event) {
    event.preventDefault()
    const data = new FormData(event.target)

    let from = data.get('from')
    from = Date.parse(from)
    from = Math.round(from / 1000)

    let to = data.get('to')
    to = Date.parse(to)
    to = Math.round(to / 1000)
    const url = `/query/date?from=${from}&to=${to}`
    console.log('URL sent to api: ',url)
    this.callApi(url)
  }

  render() {
    return (
      <div className="App">
        <Row>
          <Endpoint />
        </Row>
        <Row>
          <Add />
				  <Query
            handleHash={ this.handleHash.bind(this) }
            handleContent={ this.handleContent.bind(this) }
            handleTags={ this.handleTags.bind(this) }
            handleRange={ this.handleRange.bind(this)}
            data= {this.state.response}
          />
        </Row>
        <Row><Table data= {this.state.response}/></Row>
      </div>
    );
  }
}

export default App;
