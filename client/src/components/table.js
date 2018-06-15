// Display table component
import React, { Component } from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

class Table extends Component {
  render(){
    return(
      <BootstrapTable data={this.props.response.data} striped hover condensed>
        <TableHeaderColumn isKey dataField='transaction_hash'>Transaction Hash</TableHeaderColumn>
        <TableHeaderColumn dataField='content_hash'>Content Hash</TableHeaderColumn>
        <TableHeaderColumn dataField='tags'>Tags</TableHeaderColumn>
        <TableHeaderColumn dataField='timestamp'>Timestamp</TableHeaderColumn>
      </BootstrapTable>
    )
  }
}

export default Table
