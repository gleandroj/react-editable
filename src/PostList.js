import React from "react";
import Post from './Post';

class PostList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.posts){
        let posts = this.props.posts.map((post, i) => <Post key={i} {...post} />) || '';
        return (<div>
            { posts }
        </div>);
    }
    else
        return (<p> Nenhum post disponível :(</p>)
  }
}

PostList.propTypes = {
  posts: React.PropTypes.array
};

PostList.defaultProps = {
  posts: []
};

export default PostList;