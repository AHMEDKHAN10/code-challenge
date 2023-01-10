import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios';
import './App.css';
import ListItem from './Component/ListItem';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import { Select, Tag } from 'antd';

const tagRender = (props: CustomTagProps) => {
  const { label, value, closable, onClose } = props;
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
  const [list, setlist] = useState(Array<List>)
  const [displayList, setDisplayList] = useState(Array<List>)
  const [filteredId, setFilteredId] = useState(Array)
  const [uniqueIds, setUniqueId] = useState(Array<{value: string}>)

  interface List {
    body: string;
    id: number;
    title: string;
    userId: number;
  }

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts`)
    .then( res => {
      const posts = res.data
      setlist(posts) 
      setDisplayList(posts)
      const uniquePostUserIds = posts.map((item: List) => item.userId )
      .filter((value: number, index: number, self: any) => self.indexOf(value) === index)

      const arr: { value: string; }[] = []
      uniquePostUserIds.map((item: number) => {
        arr.push({ 'value': JSON.stringify(item) })
      })
      setUniqueId(arr)
    })
    .catch( err => console.error(err) )
  }, [])

  const onFilterSelect = (e: number) => {
    
    if(filteredId.indexOf(e) === -1){
      filteredId.push(Number(e))
    }
    setFilteredId(filteredId)
    
    let filteredList: Array<List> = list.filter((item: List) => item.userId === Number(e))
    console.log(filteredList)
    displayList.push(filteredList)
    setDisplayList(displayList)
  }
  
  return (
    <div className="App">
      {
        displayList.length > 0
          ? <>
              <Select
                mode="multiple"
                showArrow
                tagRender={tagRender}
                defaultValue={[]}
                style={{ width: '100%' }}
                options={uniqueIds}
                onSelect={onFilterSelect}
              />
              {displayList.map((item: List, key: number) => <ListItem listItem={item} key={key}/> )}
            </>
          : <>loadinf</>
      }
    </div>
  );
}

export default App;
