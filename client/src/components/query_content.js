// Query content component
import React, { Component } from 'react'
import { Form, Button, Input, Col } from 'muicss/react'

Date.prototype.addHours = function(h){
    this.setHours(this.getHours()+h);
    return this;
}

const now = new Date()
const later = new Date().addHours(22);

class Query extends Component {
	constructor(props) {
    super(props);
    this.state = {
			response: [],
			content_hash: '',
			content: ''
		};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ response: data }));

  }


	render() {
		return (
			<div id="query" className="mui-col-md-7 mui-col-md-offset-1">
				<h2>Query Blockchain:</h2>
				<div id="date">
					<div className="mui--text-caption mui--text-dark-secondary">Quick Date Range - Last:</div>
					<Button size="small" variant="raised" color="primary">1 MIN</Button>
          <Button size="small" variant="raised" color="primary">5 MINS</Button>
          <Button size="small" variant="raised" color="primary">HOUR</Button>
					<Button size="small" variant="raised" color="primary">4 HOURS</Button>
					<Button size="small" variant="raised" color="primary">DAY</Button>
					<Button size="small" variant="raised" color="primary">WEEK</Button>
				</div>
				<div>
					<Form inline={true} onSubmit={this.handleSubmit}>
						<Col xs="4">
							<Input label="Date Range:" placeholder="Start Date" defaultValue={now}/>
						</Col>
						<Col xs="4">
							<Input placeholder="End Date" defaultValue={later} />
						</Col>
						<Button className="mui--pull-right" color="primary">Submit</Button>
						<div className="mui--clearfix"></div>
					</Form>
				</div>
				<div>
					<Form inline={true} onSubmit={this.handleSubmit}>
						<Input label="Content:" placeholder="Enter content" type="text" name="content" value={this.state.content} onChange={this.handleChange}/>
						<Button className="mui--pull-right" color="primary" type="submit" value="Submit">Submit</Button>
						<div className="mui--clearfix"></div>
					</Form>
				</div>
				<div>
					<Form inline={true} onSubmit={this.handleSubmit}>
						<Input label="Content Hash:" placeholder="Enter content hash" type="text" name="content_hash" value={this.state.content_hash} onChange={this.handleChange}/>
						<Button className="mui--pull-right" color="primary">Submit</Button>
						<div className="mui--clearfix"></div>
					</Form>
				</div>
				<div>
					<Form inline={true}>
					<Input label="Transaction Hash:" placeholder="Enter transaction hash"/>
						<Button className="mui--pull-right" color="primary">Submit</Button>
					</Form>
				</div>
				<div>
					<Form inline={true}>
					<Input label="Tags:" placeholder="Enter tag name and value seperated by comma (tag=val, tag2=val2)"/>
						<Button className="mui--pull-right" color="primary">Submit</Button>
					</Form>
					<h1>{this.response}</h1>
				</div>
			</div>
		);
	}
}

export default Query
