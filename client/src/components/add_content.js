// Add content component
import React, { Component } from 'react'
import { Form, Button, Input } from 'muicss/react'


class Add extends Component {
    constructor(props) {
    super(props);
    this.state ={
      file:null
    }
  }

	render() {
		return (
			<div id="add" className="mui-col-md-4">
        <h4>Add Text To Blockchain:</h4>
				<div>
          <Form onSubmit={this.props.onSubmitContent}>
            <Input label="Text:" placeholder="Enter text string to add" type="text" name="content" required />
            <Input label="Tags:" placeholder="tag=value, tag2=value2" type="text" name="tags" required />
            <Button color="primary" type="submit" value="Submit">Submit</Button>
          </Form>
				</div>
        <h4>Add File To Blockchain:</h4>
        <div>
          <Form encType='multipart/form-data' onSubmit={this.props.onSubmitFile}>
            <Input label="Tags:" placeholder="tag=value, tag2=value2" type="text" name="tags" required />
            <Input color="primary" type="file" onChange={this.onChange} name="filename"/>
            <Button color="primary" type="submit" value="Submit">Submit</Button>
          </Form>
        </div>
			</div>
		);
	}
}

export default Add
