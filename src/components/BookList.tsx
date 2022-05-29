import { List, ListItem, ListItemText } from "@mui/material";
import { lightBlue } from "@mui/material/colors";
import { IBook } from "./models";
interface IProps {
  books?: IBook[],
  selectBook?: (book:IBook) => void
}
export default ({ books, selectBook }: IProps) => {
  return (
    <>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: lightBlue[200],
          borderRadius: 4,
        }}
      >
        {books?.map((book, i) => (
          <ListItem key={i} onClick={()=>selectBook && selectBook(book)}
          title="click to select"
          sx={{cursor:"pointer"}}>
            <ListItemText>{book.name}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
};
