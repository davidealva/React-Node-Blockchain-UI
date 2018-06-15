// Display table component
import React, { Component } from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

class Table extends Component {
  render(){
    return(
      <BootstrapTable data={this.props.data} striped hover condensed>
        <TableHeaderColumn isKey dataField='timestamp'>Timestamp</TableHeaderColumn>
        <TableHeaderColumn dataField='content_hash'>Conetent Hash</TableHeaderColumn>
        <TableHeaderColumn dataField='transaction_hash'>Transaction Hash</TableHeaderColumn>
        <TableHeaderColumn dataField='tags'>Tags</TableHeaderColumn>
      </BootstrapTable>
    )
  }
}

export default Table
