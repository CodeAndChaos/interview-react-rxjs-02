import React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { i18n } from "../../config/i18n";
import { StateTweet } from "../../data/datasource";
import { twitterStore } from "../../data/state";

const TweetMain = styled.div<{ favorite: boolean }>`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${({ favorite }) => (favorite ? "border: 0.25rem solid red;" : "")}
`;
const TweetAuthor = styled.div`
  font-style: italic;
  color: #ccc;
  margin-right: 0.5rem;
`;
const TweetContent = styled.div`
  display: flex;
  align-items: center;
`;

export const Tweet: React.FC<{ tweet: StateTweet }> = ({ tweet }) => {
  const { id, favorite, account, content } = tweet;
  let controls;
  if (favorite) {
    controls = (
      <Button onClick={() => twitterStore.setFavorite(id, false)}>
        {i18n.UnFavorite}
      </Button>
    );
  } else {
    controls = (
      <Button onClick={() => twitterStore.setFavorite(id, true)}>
        {i18n.Favorite}
      </Button>
    );
  }
  return (
    <TweetMain favorite={favorite}>
      <TweetContent>
        <TweetAuthor>@{account}</TweetAuthor>
        {content}
      </TweetContent>
      <div>{controls}</div>
    </TweetMain>
  );
};
