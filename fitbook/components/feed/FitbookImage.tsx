import React from "react";
import "./FitbookPost.css"; // Importerer stilen for komponenten

type Props = {
  text: string;
  username: string;
  imageUrl: string;
};

const FitbookImage = ({ text, username, imageUrl }: Props) => {
  return (
    <div className="fitbook-post">
      <div className="post-image">
        <img src={imageUrl} alt="Post image" />
      </div>
      <div className="post-text">
        <hr />
        <p>
          <b>{username}</b> {text}
        </p>
      </div>
    </div>
  );
};

export default FitbookImage;