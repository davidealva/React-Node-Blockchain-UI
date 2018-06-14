import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Form, Button, Input, Col, Select, Option, Row } from 'muicss/react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './index.css';

const now = new Date()
const timeNow = now.getTime()


// onClick={testCall()
// testCall() {
//   console.log("Im inside testCall")
// }

class App extends Component {

  render(){
    return (
      <div>
        <Row><Endpoint /></Row>
        <Row>
          <Add />
          <Query />
        </Row>
        <Row><DataTable /></Row>
      </div>
    );
  }
}

class Endpoint extends Component {

	onSubmit(ev) {
    ev.preventDefault();  // prevent form submission
    alert(this.select.controlEl.value);
  }

	render() {
		return (
			<div>
				<div className="mui-col-md-4">
					<Form inline={true} onSubmit={this.onSubmit.bind(this)} >
						<legend>Select Existing Endpoint:</legend>
						<Select ref={el => { this.select = el; }} name="input">
		          <Option value="option1" label="Option 1" />
		          <Option value="option2" label="Option 2" />
		          <Option value="option3" label="Option 3" />
		          <Option value="option4" label="Option 4" />
		        </Select>
						<Button color="primary">Select</Button>
					</Form>
				</div>
				<div className="mui-col-md-7 mui-col-md-offset-1">
					<Form inline={true}>
						<legend>Enter New Endpoint:</legend>
					<div className="mui-col-md-4 no-padding-left">
		        	<Input label="IP Address" floatingLabel={true} />
					</div>
					<div className="mui-col-md-4">
		        <Input label="Authorization Token" floatingLabel={true}/>
					</div>
		        <Button color="primary">Submit</Button>
		      </Form>
				</div>
			</div>
		);
	}
}

class Add extends Component {
    constructor(props) {
    super(props);
    this.state ={
      file:null
    }
  }

  onSubmit(event) {
		event.preventDefault();
		const data = new FormData(event.target);

    let content = data.get('content')
    console.log(content)
    let tags = data.get('tags')
    console.log(tags)

		const url = `/add/content/?content=${content}&tags=${tags}`
		console.log(url)

    axios.get(url)
    .then(res => {
      this.setState({ response: res.data });
    })
  }

  onSubmitFile(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    //
    // data.append('filename',)
    let content = data.get('filename')
    console.log(content.name)
    let tags = data.get('tags')
    console.log(tags)

    const url = `/upload/?file=${content}&tags=${tags}`
    // const url = `/upload/?file=${content}&tags=${tags}`
    console.log(url)

    axios.get(url)
    .then(res => {
      this.setState({ response: res.data });
    })
  }

	render() {
		return (
			<div id="add" className="mui-col-md-4">
        <h4>Add Text To Blockchain:</h4>
				<div>
          <Form onSubmit={this.onSubmit.bind(this)}>
            <Input label="Text:" placeholder="Enter text string to add" type="text" name="content" required />
            <Input label="Tags:" placeholder="tag=value, tag2=value2" type="text" name="tags" required />
            <Button color="primary" type="submit" value="Submit">Submit</Button>
          </Form>
				</div>
        <h4>Add File To Blockchain:</h4>
        <div>
          <Form encType='multipart/form-data' onSubmit={this.onSubmitFile.bind(this)}>
            <Input label="Tags:" placeholder="tag=value, tag2=value2" type="text" name="tags" required />
            <Input color="primary" type="file" onChange={this.onChange} name="filename"/>
            <Button color="primary" type="submit" value="Submit">Submit</Button>
          </Form>
        </div>
			</div>
		);
	}
}

class Query extends Component {

  constructor(props) {
    super(props);

    this.state = {
			response: "",
      startTime: new Date(now),
      endTime: new Date(now),
		}

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleContent = this.handleContent.bind(this);
    this.handleTags = this.handleTags.bind(this);
    this.handleRange = this.handleRange.bind(this);
  }

	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
		console.log(event.target.name); // the name of the form element
		console.log(event.target.value); // the value of the form element
	}

	handleSubmit(event) {
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
		const url = `/query/hash/?${key}=${value}`
		console.log(url)

    axios.get(url)
    .then(res => {
      this.setState({ response: res.data });
    })
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

    axios.get(url)
    .then(res => {
      this.setState({ response: res.data });
    })
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

    axios.get(url)
    .then(res => {
      this.setState({ response: res.data });
    })
  }

  handleRange(event) {
    event.preventDefault()
    const data = new FormData(event.target)

    let from = data.get('from')
    // from = parseInt(from)
    from = Date.parse(from)
    from = Math.round(from / 1000)

    let to = data.get('to')
    // to = parseInt(to)
    to = Date.parse(to)
    to = Math.round(to / 1000)


    const url = `/query/date?from=${from}&to=${to}`

    console.log('URL sent to api: ',url)

    axios.get(url)
    .then(res => {
      this.setState({ response: res.data });
    })
  }

  handleClick(event, param) {
    event.preventDefault();
    let startTime = event.target.value
    startTime = Date.parse(startTime)
    startTime = Math.round(startTime / 1000)
    console.log('The button was clicked.', startTime)

    const newTime = startTime - param
    console.log('New time: ', newTime)

    let readDate = new Date(newTime * 1000)
    console.log('readable : ', readDate)

    this.setState({ startTime: readDate })
    console.log(this.state.startTime)
  }

  render() {
    console.log(this.props)
    return (
      <div id="query" className="mui-col-md-7 mui-col-md-offset-1">
        <h4>Query Blockchain:</h4>
        <div id="date">
          <div className="mui--text-caption mui--text-dark-secondary">Quick Date Range - Last:</div>
          <Button size="small" variant="raised" color="primary" value={this.state.startTime} onClick={(e) => this.handleClick(e, 60)}>1 MIN</Button>
          <Button size="small" variant="raised" color="primary" value={this.state.startTime} onClick={(e) => this.handleClick(e, 300)}>5 MINS</Button>
          <Button size="small" variant="raised" color="primary" value={this.state.startTime} onClick={(e) => this.handleClick(e, 3600)}>HOUR</Button>
          <Button size="small" variant="raised" color="primary" value={this.state.startTime} onClick={(e) => this.handleClick(e, 14400)}>4 HOURS</Button>
          <Button size="small" variant="raised" color="primary" value={this.state.startTime} onClick={(e) => this.handleClick(e, 86400)}>DAY</Button>
          <Button size="small" variant="raised" color="primary" value={this.state.startTime} onClick={(e) => this.handleClick(e, (7*86400))}>WEEK</Button>
        </div>
        <div>
          <Form inline={true} onSubmit={this.handleRange}>
            <Col xs="4">
              <Input label="Date Range Start:" placeholder="Start Date" value={this.state.startTime.toLocaleString()} name="from" onChange={this.handleChange}/>
            </Col>
            <Col xs="4">
              <Input label="Date Range End:"placeholder="End Date" value={this.state.endTime.toLocaleString()} name="to"  onChange={this.handleChange}/>
            </Col>
            <Button className="mui--pull-right" color="primary" type="submit" value="Submit">Submit</Button>
            <div className="mui--clearfix"></div>
          </Form>
        </div>
        <div>
          <Form inline={true} onSubmit={this.handleContent}>
            <Input label="Content:" placeholder="Enter content" type="text" name="content" value={this.state.content} onChange={this.handleChange}/>
            <Button className="mui--pull-right" color="primary" type="submit" value="Submit">Submit</Button>
            <div className="mui--clearfix"></div>
          </Form>
        </div>
        <div>
          <Form inline={true} onSubmit={this.handleSubmit}>
            <Input label="Content Hash:" placeholder="Enter content hash" type="text" name="content_hash" value={this.state.content_hash} onChange={this.handleChange}/>
            <Button className="mui--pull-right" color="primary" type="submit" value="Submit">Submit</Button>
            <div className="mui--clearfix"></div>
          </Form>
        </div>
        <div>
          <Form inline={true} onSubmit={this.handleSubmit}>
            <Input label="Transaction Hash:" placeholder="Enter transaction hash" name="transaction_hash" value={this.state.transaction_hash} onChange={this.handleChange}/>
            <Button className="mui--pull-right" color="primary" type="submit" value="Submit">Submit</Button>
          </Form>
        </div>
        <div>
          <Form inline={true} onSubmit={this.handleTags}>
          <Input label="Tags:" placeholder="Enter tag name and value seperated by comma (tag=val, tag2=val2)" name="tags" value={this.state.tags} onChange={this.handleChange}/>
            <Button className="mui--pull-right" color="primary" type="submit" value="Submit">Submit</Button>
          </Form>
        </div>
        <div><DataTable dataSet={this.state.response.data} /></div>
      </div>
    );
  }
}


class DataTable extends Component {
  render(){
    return(
      <BootstrapTable data={this.props.dataSet} striped hover condensed>
        <TableHeaderColumn isKey dataField='timestamp'>Timestamp</TableHeaderColumn>
        <TableHeaderColumn dataField='content_hash'>Conetent Hash</TableHeaderColumn>
        <TableHeaderColumn dataField='transaction_hash'>Transaction Hash</TableHeaderColumn>
        <TableHeaderColumn dataField='tags'>Tags</TableHeaderColumn>
      </BootstrapTable>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('content-wrapper'));
