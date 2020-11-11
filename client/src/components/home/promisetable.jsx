import React, { Component } from 'react';
import AddPromise from './addPromise'
import {DataTable} from  'react-data-components';      
class Table extends Component {
    constructor(props){
      super(props)
      this.state = {  
      callNewPromises:this.props.callNewPromises,
      pageOfItems: []

        }
      }
    componentWillReceiveProps(){
      if(Object.keys(this.props.newpromises).length>0){
      let data=this.props.newpromises
      localStorage.setItem('nxtdate',data[data.length-1]["today"])
      this.setState({edate:data[data.length-1]["today"]})
      }
    } 
    render() { 
      var columns = [
        { title: 'Name', prop: 'today'  },
        { title: 'Chapter T', prop: 'telugu_chapter' },
        { title: 'Promise T', prop: 'telugu_promise' },
        { title: 'Chapter E', prop: 'english_chapter' },
        { title: 'Promise E', prop: 'english_promise' },
        { title: 'Verse', prop: 'verse' },
      ];
        return ( <div class="container">
        <AddPromise onChange={this.props.onChange} nxtdate={this.state.edate}/>
        <h2>Promises&nbsp;<button class="btn btn-success btn-sm" type="button" data-toggle="modal" data-target="#addPromise">+</button></h2>
  
  
  {this.props.newpromises &&      <DataTable
      keys="name"
      columns={columns}
      initialData={this.props.newpromises}
      initialPageLength={5}
     />
  }
       </div>
       );
    }
} 
export default Table;