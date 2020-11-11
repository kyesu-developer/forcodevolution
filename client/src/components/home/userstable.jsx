import React, { Component } from 'react';
import {DataTable} from  'react-data-components';      
class Table extends Component {

constructor(props){
  super(props)
  this.state={
    users:props.users
  }
} 
    render() { 
      var columns = [
        { title: 'Name', prop: 'name'  },
        { title: 'Username', prop: 'username' },
        { title: 'Join_Date', prop: 'created_at' },
      ];
        return ( <div class="container">
        <h2>Users</h2>
         
        {this.props.users &&      <DataTable
      keys="name"
      columns={columns}
      initialData={this.props.users}
      initialPageLength={5}
     />
  }
      </div>
       );
    }
}
 
export default Table;