import { getNowISOStr } from './dateutils';
import uuid from 'uuid';

function createComment(
  commentUUID,
  feedUUID,
  username,
  message,
  createdAt,
) {
  let newCreatedAt = createdAt;
  let newCommentUUID = commentUUID;

  if (!newCreatedAt) {
    newCreatedAt = getNowISOStr();
  }

  if (!newCommentUUID) {
    newCommentUUID = uuid.v4();
  }

  // For now ignore location and tags
  const comment = {
    uuid: newCommentUUID,
    feedUUID,
    username,
    message,
    created_at: newCreatedAt,
  };

  return comment;
}

export { createComment };
