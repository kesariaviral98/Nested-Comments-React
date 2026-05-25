import React, { useState } from "react";
import Comment from "./Comment";
import commentsData from "./data";

const App = () => {
  const [comments, setComments] = useState(commentsData);

  const addReply = (parentId, text, author) => {
    const newComment = {
      id: Date.now(),
      author,
      text,
      likes: 0,
      createdAt: new Date().toISOString(),
      children: []
    };

    const updateTree = (nodes) =>
      nodes.map((c) => {
        if (c.id === parentId) return { ...c, children: [...c.children, newComment] };
        return { ...c, children: updateTree(c.children) };
      });

    setComments(updateTree(comments));
  };

  return (
    <div>
      <h2>Nested Comments</h2>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} addReply={addReply} />
      ))}
    </div>
  );
};

export default App;
