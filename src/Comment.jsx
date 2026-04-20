import React, { useState } from "react";

const Comment = ({ comment, addReply }) => {
  const [showInput, setShowInput] = useState(false);
  const [replyText, setReplyText] = useState("");

  return (
    <div style={{ marginLeft: "20px", marginTop: "10px" }}>
      <div style={{ border: "1px solid gray", padding: "10px" }}>
        <p>{comment.text}</p>

        <button onClick={() => setShowInput(!showInput)}>
          Reply
        </button>

        {showInput && (
          <div>
            <input
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <button
              onClick={() => {
                addReply(comment.id, replyText);
                setReplyText("");
                setShowInput(false);
              }}
            >
              Add
            </button>
          </div>
        )}
      </div>

      {comment.children.map((child) => (
        <Comment key={child.id} comment={child} addReply={addReply} />
      ))}
    </div>
  );
};

export default Comment;