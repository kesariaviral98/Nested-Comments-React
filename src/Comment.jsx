import React, { useState } from "react";

const formatDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const Comment = ({ comment, addReply, deleteComment, editComment }) => {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replyAuthor, setReplyAuthor] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);

  const saveEdit = () => {
    if (!editText.trim()) return;
    editComment(comment.id, editText.trim());
    setIsEditing(false);
  };

  return (
    <div style={{ marginLeft: "20px", marginTop: "10px" }}>
      <div style={{ border: "1px solid gray", padding: "10px" }}>
        <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "4px" }}>
          <strong>{comment.author}</strong>
          <span style={{ color: "#888", fontSize: "0.85em" }}>
            {formatDate(comment.createdAt)}
            {comment.edited && " (edited)"}
          </span>
        </div>

        {isEditing ? (
          <div style={{ marginBottom: "8px" }}>
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              rows={3}
              style={{ display: "block", width: "400px", marginBottom: "4px" }}
            />
            <button onClick={saveEdit}>Save</button>
            <button onClick={() => { setIsEditing(false); setEditText(comment.text); }} style={{ marginLeft: "6px" }}>
              Cancel
            </button>
          </div>
        ) : (
          <p style={{ margin: "4px 0 8px" }}>{comment.text}</p>
        )}

        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={() => setShowReply(!showReply)}>Reply</button>
          <button onClick={() => { setIsEditing(true); setEditText(comment.text); }}>Edit</button>
          <button onClick={() => deleteComment(comment.id)} style={{ color: "red" }}>Delete</button>
        </div>

        {showReply && (
          <div style={{ marginTop: "8px" }}>
            <input
              placeholder="Your name"
              value={replyAuthor}
              onChange={(e) => setReplyAuthor(e.target.value)}
              style={{ display: "block", marginBottom: "4px" }}
            />
            <input
              placeholder="Write a reply…"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              style={{ display: "block", marginBottom: "4px", width: "300px" }}
            />
            <button
              onClick={() => {
                if (!replyText.trim()) return;
                addReply(comment.id, replyText.trim(), replyAuthor.trim() || "Anonymous");
                setReplyText("");
                setReplyAuthor("");
                setShowReply(false);
              }}
            >
              Add Reply
            </button>
            <button onClick={() => setShowReply(false)} style={{ marginLeft: "6px" }}>
              Cancel
            </button>
          </div>
        )}
      </div>

      {comment.children.map((child) => (
        <Comment
          key={child.id}
          comment={child}
          addReply={addReply}
          deleteComment={deleteComment}
          editComment={editComment}
        />
      ))}
    </div>
  );
};

export default Comment;
