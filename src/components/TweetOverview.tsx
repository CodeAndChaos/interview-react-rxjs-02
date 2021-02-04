import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { DisplayTweets } from "./TweetOverview/TweetList";

export type TweetDisplayFilters = "Recent" | "All" | "Favorites";

export const TweetOverview = () => {
  const [currentTab, setCurrentTab] = useState("Recent");

  const availableTabs = ["Recent", "All", "Favorites"];

  return (
    <>
      <Nav fill variant="tabs" activeKey={currentTab}>
        {availableTabs.map((val) => (
          <Nav.Item key={val}>
            <Nav.Link eventKey={val} onClick={() => setCurrentTab(val)}>
              {val}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      <DisplayTweets filter={currentTab as TweetDisplayFilters} />
    </>
  );
};
