import React from 'react';

const wrapperStyle = {
  display: 'inline-block',
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: '5px',
};

const imgStyle = {
  height: '50px',
};

function styleFeedTag(tag, onClickHandler, linkBool) {
  const content = (
    <span>
      <img
        style={imgStyle}
        alt={tag.display_name}
        src={tag.image_url}
      />
      <br />
      <p className={"text-center"}>{tag.display_name}</p>
    </span>
  );

  const finalContent = linkBool ? (
    <a onClick={onClickHandler}>
      {content}
    </a>
  ) : content;

  return (
    <div style={wrapperStyle}>
      {finalContent}
    </div>
  );
}

export { styleFeedTag };
