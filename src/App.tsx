import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ListItem from './Component/ListItem';
import { ListItemType } from "./Type/List.type";
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import { Select, Tag } from 'antd';

const tagRender = (props: CustomTagProps) => {
  const { label, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  
  return (
    <Tag
      color={'black'}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<ListItemType[]>([])
  const [displayList, setDisplayList] = useState<ListItemType[]>([])
  const [filteredId, setFilteredId] = useState<number[]>([])
  const [uniqueIds, setUniqueId] = useState<{ value: string }[]>([])

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts`)
    .then( res => {
      const posts = res.data
      setList(posts) 
      setDisplayList(posts)
      const uniquePostUserIds = posts.map((item: ListItemType) => item.userId )
      .filter((value: number, index: number, self: any) => self.indexOf(value) === index)

      const arr: { value: string; }[] = []
      uniquePostUserIds.map((item: number) => {
        arr.push({ 'value': JSON.stringify(item) })
      })
      setUniqueId(arr)
      setLoading(false)
    })
    .catch( err => console.error(err) )
  }, [])

  const onFilterSelect = (e: string) => {
    const selectedId = Number(e);
    let updatedFilteredIds: number[] = [...filteredId];
    if(!filteredId.includes(selectedId)){
      updatedFilteredIds.push(selectedId)
    } else {
      updatedFilteredIds = updatedFilteredIds.filter(id => id !== selectedId)
    }

    setFilteredId(updatedFilteredIds)
    
    let filteredList: ListItemType[] = list.filter((item: ListItemType) => updatedFilteredIds.includes(item.userId))
    setDisplayList(filteredList)
  }
  
  return (
    <div className="App">
      {loading ? <>Loading</> :
        <>
          <Select
            mode="multiple"
            showArrow
            tagRender={tagRender}
            defaultValue={[]}
            style={{width: '100%'}}
            options={uniqueIds}
            onSelect={onFilterSelect}
            onDeselect={onFilterSelect}
          />
          {displayList.map((item: ListItemType, key: number) => <ListItem listItem={item} key={key}/> )}
        </>
      }
    </div>
  );
}

export default App;
