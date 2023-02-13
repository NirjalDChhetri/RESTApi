import React, {useEffect, useState} from 'react'
import api from "../api/config";

const Homepage = () => {
  const [bookList, setBookList] = useState([]);
  useEffect(()=>{
    async function fetchBooks(){
      const response = await api.get("/book");
      //console.log(response.data);
      setBookList(response.data);
    }
    fetchBooks();
  }, []);
  return (
    <div>
      {bookList.map((book, index)=>{
        return <div key= {index}>
          <img src={book.image} alt={`image $(index)`}/>
          {boook.name}</div>
      })}
    </div>
  )
}

export default Homepage