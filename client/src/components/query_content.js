// Query content component
import React, { Component } from 'react'
import { Form, Button, Input, Col } from 'muicss/react'

const now = new Date()
const timeNow = now.getTime()


class Query extends Component {

  constructor(props) {
    super(props);

    this.state = {
      startTime: new Date(now),
      endTime: new Date(now),
		}
    this.handleChange = this.handleChange.bind(this)
    this.handleQuickDate = this.handleQuickDate.bind(this);
  }

	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value })
		console.log(event.target.name) // the name of the form element
		console.log(event.target.value) // the value of the form element
	}

  handleQuickDate(event, param) {
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
          <Button size="small" variant="raised" color="primary" value={this.state.startTime} onClick={(e) => this.handleQuickDate(e, 60)}>1 MIN</Button>
          <Button size="small" variant="raised" color="primary" value={this.state.startTime} onClick={(e) => this.handleQuickDate(e, 300)}>5 MINS</Button>
          <Button size="small" variant="raised" color="primary" value={this.state.startTime} onClick={(e) => this.handleQuickDate(e, 3600)}>HOUR</Button>
          <Button size="small" variant="raised" color="primary" value={this.state.startTime} onClick={(e) => this.handleQuickDate(e, 14400)}>4 HOURS</Button>
          <Button size="small" variant="raised" color="primary" value={this.state.startTime} onClick={(e) => this.handleQuickDate(e, 86400)}>DAY</Button>
          <Button size="small" variant="raised" color="primary" value={this.state.startTime} onClick={(e) => this.handleQuickDate(e, (7*86400))}>WEEK</Button>
        </div>
        <div>
          <Form inline={true} onSubmit={this.props.handleRange}>
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
          <Form inline={true} onSubmit={this.props.handleContent}>
            <Input label="Content:" placeholder="Enter content" type="text" name="content" value={this.state.content} onChange={this.handleChange} required/>
            <Button className="mui--pull-right" color="primary" type="submit" value="Submit">Submit</Button>
            <div className="mui--clearfix"></div>
          </Form>
        </div>
        <div>
          <Form inline={true} onSubmit={this.props.handleHash}>
            <Input label="Content Hash:" placeholder="Enter content hash" type="text" name="content_hash" value={this.state.content_hash} onChange={this.handleChange} required/>
            <Button className="mui--pull-right" color="primary" type="submit" value="Submit">Submit</Button>
            <div className="mui--clearfix"></div>
          </Form>
        </div>
        <div>
          <Form inline={true} onSubmit={this.props.handleHash}>
            <Input label="Transaction Hash:" placeholder="Enter transaction hash" name="transaction_hash" value={this.state.transaction_hash} onChange={this.handleChange} required/>
            <Button className="mui--pull-right" color="primary" type="submit" value="Submit">Submit</Button>
          </Form>
        </div>
        <div>
          <Form inline={true} onSubmit={this.props.handleTags}>
          <Input label="Tags:" placeholder="Enter tag name and value seperated by comma (tag=val, tag2=val2)" name="tags" value={this.state.tags} onChange={this.handleChange} required/>
            <Button className="mui--pull-right" color="primary" type="submit" value="Submit">Submit</Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default Query
