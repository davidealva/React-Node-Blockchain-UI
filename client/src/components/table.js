// Display table component
import React, { Component } from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

class Table extends Component {
  render(){
    return(
      <BootstrapTable data={this.props.response.data} striped hover condensed>
        <TableHeaderColumn isKey dataField='transaction_hash'>Timestamp</TableHeaderColumn>
        <TableHeaderColumn dataField='content_hash'>Conetent Hash</TableHeaderColumn>
        <TableHeaderColumn dataField='tags'>Transaction Hash</TableHeaderColumn>
        <TableHeaderColumn dataField='timestamp'>Tags</TableHeaderColumn>
      </BootstrapTable>
    )
  }
}

export default Table
