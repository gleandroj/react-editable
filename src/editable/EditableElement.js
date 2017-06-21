import React from "react";
import "./style.css";

export default class EditableElement extends React.Component{

   constructor(props) {
    super(props);
    this.editable = {};
    this.onCancelarClick = this.onCancelarClick.bind(this);
    this.onEditarClick = this.onEditarClick.bind(this);
    this.onPropEdit = this.onPropEdit.bind(this);
    this.state = {isInEditMode: false};
    this.instanceProps = {};
    this.instanceOriginalProps = {};
  }

  onCancelarClick(e){
      //e.preventDefault();
      this.instanceProps = Object.assign({}, this.instanceOriginalProps); 
      this.editable.resetState();
      this.setState({
          isInEditMode: false
      });
  }

  onEditarClick(e){
    //e.preventDefault();
    this.instanceOriginalProps = Object.assign({}, this.instanceProps); 
    this.editable.originalState = Object.assign({}, this.editable.state); 
    this.setState((preState)=>{
      return {
        isInEditMode: !preState.isInEditMode
      }
    });
  }

  onPropEdit(newProps){
    this.instanceProps = newProps;
  }

 prepareChildren(){
     const childrenWithProps = React.Children.map(this.props.children,
     (child) => child instanceof Object ? React.cloneElement(child, this.instanceProps) : child
    );

    return childrenWithProps;
  }

  render(){
    let childs = this.prepareChildren();
    return (
      <div >
        <div className={this.state.isInEditMode ? 'active modal-window' : 'modal-window'}>
            <div>
                <a className="modal-close" onClick={this.onCancelarClick}> Cancelar </a>
                { <this.props.editable ref={(editable) => { this.editable = editable; }} onPropEdit={this.onPropEdit} /> }
                <hr/>
                <a onClick={this.onEditarClick}> { this.state.isInEditMode ? 'Salvar' : 'Editar'}</a>
            </div>
        </div>

        <div className="editcontainer">
          <a className="btnedit" onClick={this.onEditarClick}> Editar</a>
          { childs }
        </div>

      </div>
    );
  }

}
