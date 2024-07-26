import { useCallback, useEffect, useState } from 'react'
import './App.css'
import ListItem from './components/Listtem/ListItem';
import useVisible from './hooks/useVisible';
import { useInfiniteQuery } from '@tanstack/react-query'


function App() {

  const fetchUsers = async ({pageParam})=>{
    const response = await fetch(`http://localhost:3000/data/${pageParam}`)
    return response.json();
  }

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['projects'],
    queryFn: fetchUsers,
    initialPageParam: 0,
    getNextPageParam: (response, pages) => {
    debugger;
    return response.nextPage;
    }
  })


  // useEffect(()=>{
  //   fetchNextPage();
  // },[])

  const lastItemReached = useCallback(()=>{
    console.log(hasNextPage)
    fetchNextPage();
  },[data])

  const totalPages = data ? data.pages.length : 0;
  const totalUsers= data ? data.pages.reduce((sum,page)=>{
    return sum+ page.data.length;
  },0) : 0;
  const [elementRef] = useVisible(lastItemReached);
  return (
    <>
      <h1 style={{color:'red'}}>Total Pages Loaded : {totalPages} , Total Users :{totalUsers}</h1>
      {
      data && <div className='listContainer'>
        {
          data.pages.map((page,pageIndex)=>{
            return(<>
              {
                page.data.map((user,userIndex)=>{
                  var isLast = (userIndex == page.data.length-10) && ( pageIndex == data.pages.length -1);
                  return <ListItem key={user.id} name={user.name} ref={isLast ? elementRef : null}/>
                })
              }
            </>)
          })
        }
        {isFetching && <h1>Fetching...</h1>}
      </div>
      }
    </>
  )
}

//Below code is without service call , just a front end configuration
//for infinite scrolling.
// function App() {
//   const [data,setData] = useState([]);
//   const [isLoading,setLoading] = useState(false);
  
//   const users = Array.from({ length: 50 }, (_, index) => {
//     return {
//       name: `User ${index + 1}`,
//       id: index
//     }
//   });

//   useEffect(()=>{
//     setData(users);
//   },[])

//   const lastItemReached = useCallback(()=>{
//     console.log('called')
//     setLoading(true);
//     setTimeout(() => {
//       console.log(data.length)
//       var newUsers = Array.from({ length: 50 }, (_, index) => {
//         return {
//           name: `User ${data.length+index + 1}`,
//           id: data.length+index+1
//         }
//       });
//       setLoading(false);
//       setData(prevData=>{
//         return [...prevData,...newUsers]
//       })
//     }, 1500);
//   },[data])
//   const [elementRef] = useVisible(lastItemReached);
//   return (
//     <>
//       <h1 style={{color:'red'}}>Total Data count : {data.length}</h1>
//       <div className='listContainer'>
//         {
//           data.map((user,index) => {
//             return <ListItem key={user.id} name={user.name} ref={index === data.length - 1 ? elementRef : null}/>
//           })
//         }
//         {isLoading && <h1>Loading ....</h1>}
//       </div>
//     </>
//   )
// }

export default App
