// Add content component
import React, { Component } from 'react'
import axios from 'axios';
import { Form, Button, Input } from 'muicss/react'


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

export default Add
