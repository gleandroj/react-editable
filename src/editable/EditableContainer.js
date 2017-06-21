import React from "react";
import { EditableElement } from './'

export default class EditableContainer extends React.Component{
  
  constructor(props) {
    super(props);
    this.children = [];
  }

  componentDidMount() {
      this.children = this.props.children instanceof Array ? this.props.children : [this.props.children];
  }

  prepareChildren(){
     const childrenWithProps = React.Children.map(this.props.children,
     (child) => 
       child.type.prototype.getEditable ?
       (<EditableElement editable={ child.type.prototype.getEditable }> { child } </EditableElement>) : child
    );

    return childrenWithProps;
  }

  render() {
    let children = this.prepareChildren();
    return (
      <div>
          <h1 style={{textAlign:'center'}}>Editable Container</h1>
          <hr/>
          { children }
      </div>
    );
  }

}
