import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "react-bootstrap/Card";

function PostDetails() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  const posts = useSelector((state) => state.postsData.posts);

  useEffect(() => {
    const foundPost = posts.find((post) => post.id === Number(postId));
    setPost(foundPost);
  }, [postId, posts]);

  if (!post) {
    return <p>Loading post...</p>;
  }

  return (
    <div className="container mt-5">
      <Card className="mb-2">
        <Card.Header className="fw-bold fs-4">
          {post.id} - {post.title}
        </Card.Header>
        <Card.Body>
          <Card.Title>User Id: {post.userId} </Card.Title>
          <Card.Text>{post.body}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default PostDetails;
