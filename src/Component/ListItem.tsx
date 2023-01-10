import React from 'react'
import { ListType } from '../Type/List.type'
import { Card, Space } from 'antd';

interface Props {
  listItem: ListType
}

const ListItem:React.FC<Props> = ({listItem}) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20  }}>
      {/* List
      <p>body: {list.body}</p>
      <p>id: {list.id}</p>
      <p>tile: {list.title}</p>
      <p>userId: {list.userId}</p> */}
      <Card bordered={false} style={{ width: 300 }}>
        <p>User Id: {listItem.userId}</p>
        <p>Title: {listItem.title}</p>
        <p>Body: {listItem.body}</p>
      </Card>
    </div>
  )
}

export default ListItem