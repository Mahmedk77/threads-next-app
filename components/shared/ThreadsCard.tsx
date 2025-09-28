import React from "react";

interface Params {
    id: string,
    currentUserId: string,
    parentId: string,
    content: string,
    author: string,
    community: string,
    createdAt: string,
    comments: string,
}

const ThreadsCard = ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
}: Params) => {
  return <div>ThreadsCard</div>;
};

export default ThreadsCard;
