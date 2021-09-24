import React from "react";
import "antd/dist/antd.css";
import "../../styles/MainPage.css";
import { Row, Col } from "antd";

import RssFeedsList from "../RssFeedsList";
import RssFeedShowCase from "../RssFeedShowCase";

const MainPage = () => {
  return (
    <Row>
      <Col span={8}>
        <RssFeedsList />
      </Col>
      <Col span={16}>
        <RssFeedShowCase />
      </Col>
    </Row>
  );
};

export default MainPage;
