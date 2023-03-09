import React from "react";
import "./FitbookPost.css"; // Importerer stilen for komponenten

type Props = {
  text: string;
  username: string;
  imageUrl: string;
  profilepic: string;
};

const FitbookPost = ({ text, username, imageUrl, profilepic }: Props) => {
  return (
    <div className="fitbook-post">
      <div className="post-header">
        <div className="profile-pic">
          <img src={profilepic} alt="Profile picture" />
        </div>
        <h2 className="username">{username}</h2>
      </div>
      <div className="post-image">
        <img src={imageUrl} alt="Post image" />
      </div>
      <div className="post-text">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default FitbookPost;
