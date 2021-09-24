import React, { useEffect, useState } from "react";

import "antd/dist/antd.css";
import { List, message, Avatar, Spin } from "antd";

import InfiniteScroll from "react-infinite-scroller";

import axios, { AxiosResponse } from "axios";

const fakeDataUrl =
  "https://randomuser.me/api/?results=30&inc=name,gender,email,nat&noinfo";

const fetchData = (callback: (res: AxiosResponse<any>) => void) => {
  axios.get(fakeDataUrl).then(callback);
};

const RssFeedsList = () => {
  const [state, setState] = useState({
    data: [],
    loading: false,
    hasMore: true,
  });

  useEffect(() => {
    fetchData((res) => {
      setState((state) => ({ ...state, data: res.data.results as [] }));
    });
  }, []);

  const handleInfiniteOnLoad = () => {
    let { data } = state;
    setState((state) => ({ ...state, loading: true }));
    if (data.length > 50) {
      message.warning("Infinite List loaded all");
      setState((state) => ({ ...state, hasMore: false, loading: false }));
      return;
    }
    fetchData((res) => {
      data = data.concat(res.data.results);
      setState((state) => ({ ...state, data, loading: false }));
    });
  };

  return (
    <div className="rss-feed-list">
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={handleInfiniteOnLoad}
        hasMore={!state.loading && state.hasMore}
        useWindow={false}
      >
        <List
          dataSource={state.data}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<a href="https://ant.design">{item.name.last}</a>}
                description={item.email}
              />
              <div>Content</div>
            </List.Item>
          )}
        >
          {state.loading && state.hasMore && (
            <div className="demo-loading-container">
              <Spin />
            </div>
          )}
        </List>
      </InfiniteScroll>
    </div>
  );
};

export default RssFeedsList;
