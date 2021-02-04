import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import { TweetOverview } from "../components/TweetOverview";
import { i18n } from "../config/i18n";
import { twitterStore } from "../data/state";

const MainBody = styled.div`
  margin-top: 1rem;
`;
export const Main: React.FC = () => {
  return (
    <MainBody>
      <Container>
        <Row>
          <Col xs={8}>
            <TweetOverview />
          </Col>
          <Col>
            <Button variant="danger" onClick={() => twitterStore.clear()}>{i18n.Clear}</Button>
          </Col>
        </Row>
      </Container>
    </MainBody>
  );
};
