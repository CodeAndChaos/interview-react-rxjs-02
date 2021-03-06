import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { initialState, twitterStore } from "../../data/state";
import { TweetDisplayFilters } from "../TweetOverview";
import { Tweet } from "./TweetDisplay";

const FavCount = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const useTwitterList = () => {
  const [items, setItems] = useState(initialState);

  useEffect(() => {
    const subscription = twitterStore.subscribe(setItems);

    return () => {
      subscription.unsubscribe()
    }
  }, []);

  return items;
};

export const DisplayTweets: React.FC<{
  filter: TweetDisplayFilters;
}> = ({ filter }) => {
  const items = useTwitterList();

  const filterMap = {
    Recent: () => items.tweets,
    All: () => [...items.tweets, ...items.archive],
    Favorites: () =>
      [...items.tweets, ...items.archive].filter((val) => val.favorite),
  };
  const tweetArray = filterMap[filter]();

  const displayTweets = [
    ...tweetArray.map((val) => <Tweet key={val.id} tweet={val} />),
  ];
  const favoriteCount = tweetArray.filter((val) => val.favorite).length;
  return (
    <>
      <FavCount>Favorite Count: {favoriteCount}</FavCount>
      {displayTweets}
    </>
  );
};
