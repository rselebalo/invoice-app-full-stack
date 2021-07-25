import React from 'react';
import { Skeleton, List, Avatar } from 'antd';
import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import listData from '../../utils/data.json';

const IconText = ({ icon, text }: { icon: any; text: string }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);

const Loader: React.FC<any> = () => {
  const avatar = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png';

  return (
    <>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={listData}
        renderItem={(item) => (
          <List.Item
            key={item.description}
            actions={[
              <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
              <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
              <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
            ]}
            extra={
              <img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />
            }
          >
            <Skeleton loading active avatar>
              <List.Item.Meta
                avatar={<Avatar src={avatar} />}
                title={item.description}
                description={item.description}
              />
              {item.description}
            </Skeleton>
          </List.Item>
        )}
      />
    </>
  );
};
export default Loader;
