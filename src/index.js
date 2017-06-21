import React from "react";
import { render } from "react-dom";

import { Editable, DefaultEditable, EditableContainer } from "./editable"

import PostList from "./PostList";
import postApi from "./postApi";


class EditableApp extends DefaultEditable{
  
  constructor(props) {
    super(props);
    this.originalState = {
      title: 'Posts'
    };
    this.state = this.originalState;
    this.onInputChange = this.onInputChange.bind(this);
  }

  componentDidMount() {
    
  }

  onInputChange(event){
    this.setState({
      title: event.target.value
    });
  }

  resetState(){
    this.setState(this.originalState);
  }

  render() {
    return (
      <div>
        <h1 style={{textAlign:'center'}}>Editar Posts</h1>
        <hr/>
        <div style={{display:'flex', flex:'1', flexDirection:'row'}}>
          <label style={{fontWeight:'bold'}} >Titulo: </label>
          <input onChange={this.onInputChange} style={{width:'100%'}} value={this.state.title} />
        </div>
      </div>
    );
  }

}

@Editable({
  editable: EditableApp
})
class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      posts: null
    };
  }

  componentDidMount() {
    postApi.requestAllPost().then(data => {
      this.setState({posts: data})
    });
  }

  render() {
    return (
      <div>
        <h1 style={{textAlign:'center'}}>{this.props.title || 'Posts'}</h1>
        <hr/>
        <PostList posts={this.state.posts}/>
      </div>
    );
  }
}

render(<EditableContainer><App /></EditableContainer>,
  document.getElementById("editable-root"));

render(<App />,
  document.getElementById("root"));