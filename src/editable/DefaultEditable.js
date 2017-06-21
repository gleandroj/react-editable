import React from "react";

export default class DefaultEditable extends React.Component{
  
  constructor(props) {
    super(props);
    this.originalState = {};
  }

  componentWillUpdate(nextProps, nextState){
    this.props.onPropEdit(nextState);
  }

  resetState(){}
}