
export default function editable(options){
  return function(target){
    target.prototype.getEditable = options.editable || null;
  }
}