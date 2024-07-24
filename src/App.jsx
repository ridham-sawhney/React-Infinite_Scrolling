import { useCallback, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ListItem from './components/Listtem/ListItem';
import useVisible from './hooks/useVisible';

function App() {
  const [data,setData] = useState([]);
  const [isLoading,setLoading] = useState(false);
  
  const users = Array.from({ length: 50 }, (_, index) => {
    return {
      name: `User ${index + 1}`,
      id: index
    }
  });

  useEffect(()=>{
    setData(users);
  },[])

  const lastItemReached = useCallback(()=>{
    console.log('called')
    setLoading(true);
    setTimeout(() => {
      console.log(data.length)
      var newUsers = Array.from({ length: 50 }, (_, index) => {
        return {
          name: `User ${data.length+index + 1}`,
          id: data.length+index+1
        }
      });
      setLoading(false);
      setData(prevData=>{
        return [...prevData,...newUsers]
      })
    }, 1500);
  },[data])
  const [elementRef] = useVisible(lastItemReached);
  return (
    <>
      <h1 style={{color:'red'}}>Total Data count : {data.length}</h1>
      <div className='listContainer'>
        {
          data.map((user,index) => {
            return <ListItem key={user.id} name={user.name} ref={index === data.length - 1 ? elementRef : null}/>
          })
        }
        {isLoading && <h1>Loading ....</h1>}
      </div>
    </>
  )
}

export default App
