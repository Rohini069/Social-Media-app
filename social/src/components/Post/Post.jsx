import React, { useState } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";

const Post = ({ data, attribute }) => {
  const [liked, setLiked] = useState(
    attribute.likedUser.includes(localStorage.getItem("userId"))
  ); // Whether the post is liked by the user
  const [likes, setLikes] = useState(attribute.likes); // Current like count

  // URL for image format posts
  const url =
    attribute.format === "image"
      ? `data:image/jpeg;base64,${attribute.postBase64}`
      : "";

  // Handle Like Button Click
  const handleLikes = async () => {
    const formData = {
      _id: attribute._id, // The ID of the post
      userId: localStorage.getItem("userId"), // The user ID from localStorage
    };

    try {
      const response = await fetch("http://localhost:8080/api/profile/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send the post ID and user ID to the backend
      });

      if (response.ok) {
        const resp = await response.json();
        setLiked(!liked); // Toggle the liked state
        setLikes(resp.updatedLikes); // Update the like count from the server response
        console.log("Like result: ", resp);
      } else {
        console.error("Failed to like the post");
      }
    } catch (error) {
      console.error("Error in liking the post:", error);
    }
  };

  return (
    <div className="Post">
      {/* Display image if the format is image */}
      {attribute.format === "image" && (
        <img src={url} alt="PostImage" className="postImage" />
      )}

      {/* Reaction buttons (Like, Comment, Share) */}
      <div className="postReact">
        {/* Like Button */}
        <img
          src={liked ? Heart : NotLike} // Show the liked image or the not liked image
          alt="like"
          style={{ cursor: "pointer" }}
          onClick={handleLikes} // Trigger like action on click
        />
        {/* Comment Button */}
        <img src={Comment} alt="comment" style={{ cursor: "pointer" }} />
        {/* Share Button */}
        <img src={Share} alt="share" style={{ cursor: "pointer" }} />
      </div>

      {/* Display the number of likes */}
      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>

      {/* Post details */}
      <div className="detail">
        <span>
          <b>{attribute.name}</b>
        </span>
        <span> {attribute.desc || ""}</span>
      </div>
    </div>
  );
};

export default Post;
