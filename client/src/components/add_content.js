// Add content component
import React, { Component } from 'react'
import { Form, Button, Input } from 'muicss/react'


class Add extends Component {


	render() {
		return (
			<div className="mui-col-md-4">
				<div>
					<Form inline={true}>
						<Input />
						<Button color="primary">Submit</Button>
					</Form>
				</div>
				<div>
					<Form inline={true}>
						<Input />
						<Button color="primary">Submit</Button>
					</Form>
				</div>
				<div>
					<Form inline={true}>
						<Input />
						<Button color="primary">Submit</Button>
					</Form>
				</div>
			</div>
		);
	}
}

export default Add
