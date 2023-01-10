import React from 'react'
import { ListItemType } from '../Type/List.type'
import { Card } from 'antd';
import '../App.css'

interface Props {
  listItem: ListItemType
}

const ListItem:React.FC<Props> = ({ listItem }) => {
  return (
    <div className='list'>
      <Card bordered={false} style={{ width: 300 }}>
        <p><span className='headings'> User Id: </span> {listItem.userId}</p>
        <p><span className='headings'> Title: </span> {listItem.title}</p>
        <p><span className='headings'> Body: </span> {listItem.body}</p>
      </Card>
    </div>
  )
}

export default ListItem