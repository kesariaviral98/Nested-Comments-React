import React, { useState } from "react";

const formatDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const Comment = ({ comment, addReply, deleteComment, editComment, likeComment }) => {
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
    <div className="comment-wrapper">
      <div className="comment-card">
        <div className="comment-meta">
          <span className="comment-author">{comment.author}</span>
          <span className="comment-date">
            {formatDate(comment.createdAt)}
            {comment.edited && " · edited"}
          </span>
        </div>

        {isEditing ? (
          <div className="reply-form">
            <textarea
              className="form-textarea"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              rows={3}
            />
            <div style={{ display: "flex", gap: "6px" }}>
              <button className="btn btn-primary" onClick={saveEdit}>Save</button>
              <button
                className="btn btn-ghost"
                onClick={() => { setIsEditing(false); setEditText(comment.text); }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="comment-text">{comment.text}</p>
        )}

        <div className="comment-actions">
          <button className="btn btn-like" onClick={() => likeComment(comment.id)}>
            ▲ {comment.likes}
          </button>
          <button className="btn btn-ghost" onClick={() => setShowReply(!showReply)}>
            Reply
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => { setIsEditing(true); setEditText(comment.text); }}
          >
            Edit
          </button>
          <button className="btn btn-danger" onClick={() => deleteComment(comment.id)}>
            Delete
          </button>
        </div>

        {showReply && (
          <div className="reply-form">
            <input
              className="form-input"
              placeholder="Your name"
              value={replyAuthor}
              onChange={(e) => setReplyAuthor(e.target.value)}
            />
            <input
              className="form-input"
              placeholder="Write a reply…"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <div style={{ display: "flex", gap: "6px" }}>
              <button
                className="btn btn-primary"
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
              <button className="btn btn-ghost" onClick={() => setShowReply(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {comment.children.length > 0 && (
        <div className="comment-children">
          {comment.children.map((child) => (
            <Comment
              key={child.id}
              comment={child}
              addReply={addReply}
              deleteComment={deleteComment}
              editComment={editComment}
              likeComment={likeComment}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
