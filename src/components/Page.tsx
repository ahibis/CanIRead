import Button from '@mui/material/Button';
import _ from "lodash"
import { useEffect, useState } from 'react';
import axios from "axios";
import {IBook} from "./models"
import BookList from './BookList';
import WordsStudy from './WordsStudy';

export default function page() {
  const [books,setBooks] = useState<IBook[]>([])
  const [selectedBook,setSelectedBook] = useState<IBook >()
  
  function addBook() {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "text/plain"
    input.click()
    input.onchange = async () => {
      const file = input.files?.[0]
      let text;
      if (!file) return alert("this is isn;t book");
      const name = file.name.split(".")[0]
      text = await file.text()
      const words = _(text)
        .split(/[^\wа-яА-Я]+/)
        .map(e => e.toLowerCase())
        .value()

      const quantityEncountered = _(words)
        .groupBy()
        .map((matchWords, word) => [word, matchWords.length])
        .orderBy(1, ["desc"])
        .value()
      const book: IBook= {
        quantityEncountered,
        wordsCount: words.length,
        name
      }
      setBooks([...books,book])
      localStorage["book_" + name] = JSON.stringify(book)
    }
  }
  async function loadBooks(){
    const books = Object.entries(localStorage)
      .filter(([key]) => /book_/.test(key))
      .map(([key, value]) => JSON.parse(value))
    if(!localStorage["book_1984"]){
      const book = (await axios.get("1984.json")).data;
      books.push(book);
      console.log("book download")
      localStorage["book_1984"] = JSON.stringify(book)
    }
    setBooks(books)
  }
  useEffect(() => {
    loadBooks()
  },[])

  function selectBook(book:IBook){
    console.log(book);
    setSelectedBook(book)
  }
  return (
    <>
      <BookList books={books} selectBook={selectBook}/>
      <Button variant="contained" onClick={addBook}>addBook</Button>
      
      <WordsStudy selectedBook={selectedBook}/>
    </>
  )
}