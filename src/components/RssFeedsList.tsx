import React, { useEffect, useState } from "react";

import "../styles/RssFeedsList.css";
import { List, message, Avatar, Spin, Button } from "antd";

import InfiniteScroll from "react-infinite-scroller";

import axios, { AxiosResponse } from "axios";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../store";
import simpleSlice from "../store/slices/simple";

import { WifiOutlined, PlusOutlined } from "@ant-design/icons";

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

  const dispatch = useDispatch();

  useEffect(() => {
    window.Main.database.getAllRssFeeds().then((res) => {
      setState((state) => ({
        ...state,
        data: res.rows.map((val) => val.doc) as [],
      }));
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
            <List.Item
              key={item._id}
              onClick={() => {
                dispatch(simpleSlice.actions.setCurrentRssFeedUrl(item.url));
              }}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    style={{
                      backgroundColor: "#ffb121",
                    }}
                    icon={<WifiOutlined />}
                  />
                }
                title={item.title}
                description={item.url}
              />
              {/* <div>Content</div> */}
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
      <Button
        id="btn-add-feed"
        type="primary"
        shape="round"
        icon={<PlusOutlined />}
        size="large"
      >
        Feed
      </Button>
    </div>
  );
};

export default RssFeedsList;
