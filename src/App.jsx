import React, { useState } from "react";
import Comment from "./Comment";
import commentsData from "./data";

const App = () => {
  const [comments, setComments] = useState(commentsData);
  const [newText, setNewText] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  const addTopLevel = () => {
    if (!newText.trim()) return;
    const comment = {
      id: Date.now(),
      author: newAuthor.trim() || "Anonymous",
      text: newText.trim(),
      likes: 0,
      createdAt: new Date().toISOString(),
      children: []
    };
    setComments([...comments, comment]);
    setNewText("");
    setNewAuthor("");
  };

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

  const deleteComment = (targetId) => {
    const removeFromTree = (nodes) =>
      nodes
        .filter((c) => c.id !== targetId)
        .map((c) => ({ ...c, children: removeFromTree(c.children) }));
    setComments(removeFromTree(comments));
  };

  const editComment = (targetId, newText) => {
    const updateTree = (nodes) =>
      nodes.map((c) => {
        if (c.id === targetId) return { ...c, text: newText, edited: true };
        return { ...c, children: updateTree(c.children) };
      });
    setComments(updateTree(comments));
  };

  const likeComment = (targetId) => {
    const updateTree = (nodes) =>
      nodes.map((c) => {
        if (c.id === targetId) return { ...c, likes: c.likes + 1 };
        return { ...c, children: updateTree(c.children) };
      });
    setComments(updateTree(comments));
  };

  return (
    <div>
      <h2>Nested Comments</h2>

      <div style={{ marginBottom: "20px", padding: "12px", border: "1px solid #ccc" }}>
        <h3 style={{ margin: "0 0 8px" }}>Add a Comment</h3>
        <input
          placeholder="Your name"
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
          style={{ display: "block", marginBottom: "6px" }}
        />
        <textarea
          placeholder="What's on your mind?"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          rows={3}
          style={{ display: "block", width: "400px", marginBottom: "6px" }}
        />
        <button onClick={addTopLevel}>Post Comment</button>
      </div>

      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          addReply={addReply}
          deleteComment={deleteComment}
          editComment={editComment}
          likeComment={likeComment}
        />
      ))}
    </div>
  );
};

export default App;
