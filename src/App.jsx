import React, { useState } from "react";
import Comment from "./Comment";
import commentsData from "./data";

const App = () => {
  const [comments, setComments] = useState(commentsData);

  const addReply = (parentId, text) => {
    const newComment = {
      id: Date.now(),
      text,
      children: []
    };

    const updateTree = (comments) => {
      return comments.map((comment) => {
        if (comment.id === parentId) {
          return {
            ...comment,
            children: [...comment.children, newComment]
          };
        }

        return {
          ...comment,
          children: updateTree(comment.children)
        };
      });
    };

    setComments(updateTree(comments));
  };

  return (
    <div>
      <h2>Nested Comments</h2>

      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          addReply={addReply}
        />
      ))}
    </div>
  );
};

export default App;