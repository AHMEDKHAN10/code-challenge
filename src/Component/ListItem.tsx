import React from 'react'
import { ListItemType } from '../Type/List.type'
import { Card } from 'antd';

interface Props {
  listItem: ListItemType
}

const ListItem:React.FC<Props> = ({ listItem }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20  }}>
      <Card bordered={false} style={{ width: 300 }}>
        <p>User Id: {listItem.userId}</p>
        <p>Title: {listItem.title}</p>
        <p>Body: {listItem.body}</p>
      </Card>
    </div>
  )
}

export default ListItem