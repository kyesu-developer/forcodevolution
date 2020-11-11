import React, { Component } from 'react';
import axios from 'axios'

class AddPromise extends Component {

constructor(props){
  super(props)
  this.state = {  
    edate:localStorage.getItem("nxtdate"),
    telugu_promise:'',
    telugu_chapter:'',
    english_promise:'',
    english_chapter:'',
    verse:''
  }
}
  handleChange=(event) =>{
    let target =event.target.name;
    this.setState({[target]: event.target.value});
  }
  handleSubmit=async (event)=> {
      event.preventDefault();
      let data= this.state;
      await this.addPromise(data)
  }
  addPromise=async(data)=>{
      await   axios.post(`http://157.245.233.15/addpromise`,{data},{headers:{
          'x-access-token':localStorage.getItem('token')
      }})
      .then(res => {
        this.setState({success:"Added Successfully",err:""})
      }).catch(err=>{
        this.setState({success:"",err:err})
      })
      this.setState({ telugu_promise:'',
      telugu_chapter:'',
      english_promise:'',
      english_chapter:'',
      verse:''})
      await this.props.onChange()


  }

  render() { 
        return (  
            <div id="addPromise" class="modal fade" role="dialog">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                 <h4 class="modal-title">Add Promise</h4>
                  </div>
                  <div class="modal-body">
                    <p>{this.state.success}</p>
                    <p>{this.state.err}</p>

                  <form class="form-horizontal" role="form" onSubmit={this.handleSubmit}>
                  <div class="form-group">
                    <label  class="col-sm-2 control-label"
                              for="inputEmail3">Date</label>
                    <div class="col-sm-10">
                        <input type="date" class="form-control" name="edate" onChange={this.handleChange}
                        id="inputEmail3" placeholder="Email"        value={this.state.edate}
                        />
                    </div>
                  </div>
                  <div class="form-group">
                    <label  class="col-sm-2 control-label"
                              for="inputEmail3">Telugu</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" name="telugu_chapter" onChange={this.handleChange}
                        id="inputEmail3" placeholder="Chapter" value={this.state.telugu_chapter}/>
                    </div>
                  </div>
                  <div class="form-group">
                    <label  class="col-sm-2 control-label"
                              for="inputEmail3">English</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" name="english_chapter" onChange={this.handleChange}
                        id="inputEmail3" placeholder="Chapter" value={this.state.english_chapter}/>
                    </div>
                  </div>
                  <div class="form-group">
                    <label  class="col-sm-2 control-label"
                              for="inputEmail3">Verse</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" name="verse" onChange={this.handleChange}
                        id="inputEmail3" placeholder="Verse" value={this.state.verse}/>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-2 control-label"
                          for="inputPassword3" >Telugu Promise</label>
                    <div class="col-sm-10">
                        <textarea class="form-control" name="telugu_promise" onChange={this.handleChange}
                            id="inputPassword3" placeholder="Enter promise" cols="10" rows="5" value={this.state.telugu_promise}>
                                </textarea>
                    </div>
                  </div> 
                  <div class="form-group">
                    <label class="col-sm-2 control-label"
                          for="inputPassword3" >English Promise</label>
                    <div class="col-sm-10">
                        <textarea class="form-control" name="english_promise" onChange={this.handleChange}
                            id="inputPassword3" placeholder="Enter promise" cols="10" rows="5" value={this.state.english_promise}
                            ></textarea>
                    </div>
                  </div> 
                  <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                      <button type="submit" class="btn btn-primary btn-sm">Submit</button>
                    </div>
                  </div>
                </form>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-danger" data-dismiss="modal">Close</button>
                  </div>
                </div>
            
              </div>
            </div>
             );
    }
} 

export default AddPromise;