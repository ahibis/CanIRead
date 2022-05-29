import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import { margin } from "@mui/system";
import React, { useEffect, useMemo, useState } from "react";
import { IBook } from "./models";

interface IParams {
  selectedBook?: IBook;
}

export default function wordsStudy({ selectedBook }: IParams) {
  const [index, setIndex] = useState(0);
  const [knowCount, setKnowCount] = useState(0);
  const [allCount, setAllCount] = useState(0);
  const [knowFamiliarWords, setKnowFamiliarWords] = useState(0);
  const [familiarWords, setFamiliarWords] = useState<string[]>([]);
  const [noFamiliarWords, setNoFamiliarWords] = useState<string[]>([]);
  const word = useMemo(
    () => {
      const word = selectedBook?.quantityEncountered[index]
      return word},
    [index, selectedBook]
  );
  const specialWordCount = useMemo(
    () => selectedBook?.quantityEncountered.length || 1,
    [selectedBook]
  );
  function knowWordTest(){
    if(typeof word?.[0] != "string") return;
    if(familiarWords.includes(word[0]))
      iKnow()
    if(noFamiliarWords.includes(word[0]))
      iDontKnow()
  }
  useEffect(()=>knowWordTest(),[word])
  function iKnow() {
    if (!selectedBook 
      || typeof word?.[1] != "number" 
      || typeof word?.[0] != "string") return;
    setKnowFamiliarWords(knowFamiliarWords + 1);
    setIndex(index + 1);
    setAllCount(allCount + word[1]);
    setKnowCount(knowCount + word[1]);
    if(familiarWords.includes(word[0])) return;
    const FamiliarWords = [...familiarWords, word[0]]
    setFamiliarWords(FamiliarWords)
    localStorage["familiarWords"] = JSON.stringify(FamiliarWords);
  }
  function iDontKnow() {
    if (!selectedBook 
      || typeof word?.[1] != "number" 
      || typeof word?.[0] != "string") return;
    if (!selectedBook) return;
    setIndex(index + 1);
    setAllCount(allCount + word[1]);
    if(noFamiliarWords.includes(word[0])) return;
    const NoFamiliarWords = [...noFamiliarWords, word[0]]
    setNoFamiliarWords(NoFamiliarWords)
    localStorage["noFamiliarWords"] = JSON.stringify(NoFamiliarWords);
  }

  function keyDown({key}: React.KeyboardEvent<HTMLDivElement>) {
    if (key == "ArrowRight") iKnow();
    if (key == "ArrowLeft") iDontKnow();
  }
  useEffect(()=>{
    if(localStorage["familiarWords"])
      setFamiliarWords(JSON.parse(localStorage["familiarWords"]))
    if(localStorage["noFamiliarWords"])
      setNoFamiliarWords(JSON.parse(localStorage["noFamiliarWords"]))
  },[])
  return (
    <div onKeyDown={keyDown} tabIndex={0} >
      {selectedBook && (
        <Card >
          <CardHeader
            title={`${selectedBook.name} (${index + 1}/${specialWordCount})`}
            sx={{ fontSize: 30 }}
          />
          <CardContent>
            {word ? (
              <Typography
                gutterBottom
                variant="h3"
                sx={{margin:"100px 0px"}}
                component="div"
                align="center"
              >
                {word[0]} ({word[1]})
              </Typography>
            ) : (
              <h3>слова закончились</h3>
            )}
            <Grid container justifyContent="space-around">
              <Grid item>
                <Button variant="contained" color="info" onClick={iDontKnow}>
                  I don't know
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="success" onClick={iKnow}>
                  I know
                </Button>
              </Grid>
            </Grid>
          </CardContent>
          <p style={{ fontSize: "24px" }}>
            I know {knowFamiliarWords}/{specialWordCount} (
            {((knowFamiliarWords / specialWordCount) * 100).toFixed()}%) no repeat words
            <br />I know {knowCount}/{selectedBook.wordsCount} (
            {((knowCount / selectedBook.wordsCount) * 100).toFixed()}%) words of
            text
          </p>
        </Card>
      )}
    </div>
  );
}
