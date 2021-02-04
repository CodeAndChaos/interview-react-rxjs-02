import React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { StateTweet } from "../../data/datasource";
import { twitterStore } from "../../data/state";

const TweetMain = styled.div<{ favorite: boolean }>`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${({ favorite }) => (favorite ? "border: 0.25rem solid red;" : "")}
`;
const TweetAutor = styled.div`
  font-style: italic;
  color: #ccc;
  margin-right: 0.5rem;
`;
const TweetContent = styled.div`
    display: flex;
  align-items: center;
`;

export const Tweet: React.FC<{ tweet: StateTweet }> = ({ tweet }) => {
  let controls;
  if (tweet.favorite) {
    controls = (
      <Button onClick={() => twitterStore.setFavorite(tweet.id, false)}>
        UnFavorite
      </Button>
    );
  } else {
    controls = (
      <Button onClick={() => twitterStore.setFavorite(tweet.id, true)}>
        Favorite
      </Button>
    );
  }
  return (
    <TweetMain favorite={tweet.favorite}>
      <TweetContent>
        <TweetAutor>@{tweet.account}</TweetAutor>
        {tweet.content}
      </TweetContent>
      <div>{controls}</div>
    </TweetMain>
  );
};
