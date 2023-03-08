import React from "react";
import "./FitbookPost.css"; // Importerer stilen for komponenten

type Props = {
  text: string;
  username: string;
  imageUrl: string;
};

const FitbookPost = ({ text, username, imageUrl }: Props) => {
  return (
    <div className="fitbook-post">
      <div className="post-header">
        <img
          className="profile-pic"
          src="https://via.placeholder.com/50x50" // Legg til bilde-URL for profilbilde
          alt="Profile picture"
        />
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
