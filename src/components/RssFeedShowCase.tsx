import { Avatar, List, Space } from "antd";
import React, { useEffect, useState } from "react";
import Parser from "rss-parser";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import htmlParser from "html-react-parser";
import { useSelector } from "react-redux";
import { RootState } from "../store";

import { UserOutlined } from "@ant-design/icons";
import "../styles/RssFeedShowCase.css";

const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str?.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    colour += ("00" + value.toString(16)).substr(-2);
  }
  return colour;
};

const parser = new Parser();

const IconText = ({ icon, text }: any) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const RssFeedShowCase = () => {
  const [feed, setFeed] = useState<any>();

  const { currentRssFeedUrl } = useSelector((state: RootState) => state.simple);

  useEffect(() => {
    if (currentRssFeedUrl === "") {
      setFeed([]);
      return;
    }
    parser
      .parseURL(currentRssFeedUrl)
      .then((feed) => {
        setFeed(feed);
      })
      .catch((err) => alert(`${err} ${currentRssFeedUrl}`));
  }, [currentRssFeedUrl]);

  if (feed?.items === undefined) {
    return <></>;
  }

  alert;

  const listData = feed.items.map((val: any) => ({
    href: val.link,
    title: val.title,
    author: val.creator,
    content: val.content,
  }));

  return (
    <div className="rss-feed-showcase">
      <List
        itemLayout="vertical"
        size="large"
        dataSource={listData}
        renderItem={(item: any) => (
          <List.Item
            key={item.title}
            //   actions={[
            //     <IconText
            //       icon={StarOutlined}
            //       text="156"
            //       key="list-vertical-star-o"
            //     />,
            //     <IconText
            //       icon={LikeOutlined}
            //       text="156"
            //       key="list-vertical-like-o"
            //     />,
            //     <IconText
            //       icon={MessageOutlined}
            //       text="2"
            //       key="list-vertical-message"
            //     />,
            //   ]}
            //   extra={}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  style={{
                    backgroundColor: stringToColor(item.author),
                  }}
                  icon={<UserOutlined />}
                />
              }
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {htmlParser(item.content as string)}
          </List.Item>
        )}
      />
    </div>
  );
};

export default RssFeedShowCase;
