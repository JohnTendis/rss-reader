import { Avatar, List, Space } from "antd";
import React, { useEffect, useState } from "react";
import Parser from "rss-parser";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import htmlParser from "html-react-parser";

const parser = new Parser();

const IconText = ({ icon, text }: any) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const RssFeedShowCase = () => {
  const [feed, setFeed] = useState<any>();
  useEffect(() => {
    (async () => {
      const feed = await parser.parseURL("https://www.reddit.com/.rss");
      setFeed(feed);
    })();
  }, []);

  if (feed?.items === undefined) {
    return <></>;
  }

  const listData = feed.items.map((val: any) => ({
    href: val.link,
    title: val.title,
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    description: val.author,
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
              avatar={<Avatar src={item.avatar} />}
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {/* {htmlParser(item.content as string)} */}
          </List.Item>
        )}
      />
    </div>
  );
};

export default RssFeedShowCase;
