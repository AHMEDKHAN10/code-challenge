import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ListItem from './Component/ListItem';
import { ListItemType } from "./Type/List.type";
import tagRender from './Component/TagRender';
import { Select, Spin } from 'antd';

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
      if(posts.length > 0) {
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
      } else {
        alert('Sorry! No posts!')
      }
      
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
    if(updatedFilteredIds.length > 0){
      let filteredList: ListItemType[] = list.filter((item: ListItemType) => updatedFilteredIds.includes(item.userId))
      setDisplayList(filteredList)
    } else {
      setDisplayList(list)
    }
    
  }
  
  return (
    <div className="App">
      {loading 
        ? <Spin tip="Loading" size="large">
            <div className="content" />
          </Spin> 
        : <>
            <Select
              mode="multiple"
              showArrow
              tagRender={tagRender}
              defaultValue={[]}
              style={{width: '50%'}}
              options={uniqueIds}
              onSelect={onFilterSelect}
              onDeselect={onFilterSelect}
              placeholder={'Filter results by entering the ID'}
            />
            {displayList.map((item: ListItemType, key: number) => <ListItem listItem={item} key={key}/> )}
          </>
      }
    </div>
  );
}

export default App;
