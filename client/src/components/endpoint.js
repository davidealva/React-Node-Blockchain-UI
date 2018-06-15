// Endpoint Select/Input Component
import React, { Component } from 'react'
import { Form, Button, Input, Option, Select } from 'muicss/react'


class Endpoint extends Component {

	onSubmit(event) {
    event.preventDefault();  // prevent form submission
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


export default Endpoint
