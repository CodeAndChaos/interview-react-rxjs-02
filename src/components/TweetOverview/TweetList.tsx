import React, { useLayoutEffect, useState } from "react";
import { initialState, twitterStore } from "../../data/state";
import { TweetDisplayFilters } from "../TweetOverview";
import { Tweet } from "./TweetDisplay";

export const DisplayTweets: React.FC<{
  filter: TweetDisplayFilters;
}> = ({ filter }) => {
  const [items, setItems] = useState(initialState);

  useLayoutEffect(() => {
    twitterStore.subscribe(setItems);
  }, []);

  const filterMap = {
    Recent: () => items.tweets,
    All: () => [...items.tweets, ...items.archive],
    Favorites: () =>
      [...items.tweets, ...items.archive].filter(
        (val) => val.favorite === true
      ),
  };
  const tweetArray = filterMap[filter]();

  const displayTweets = [
    ...tweetArray.map((val) => <Tweet key={val.id} tweet={val} />),
  ];

  return <>{displayTweets}</>;
};
