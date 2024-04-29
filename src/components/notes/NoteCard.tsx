import { Card, CardContent, IconButton, Typography } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { NoteResponse } from "../../common/hooks/notes";
import DateFormatter from "../../common/utils/DateFormatter";

type NoteCardProps = {
  note: NoteResponse;
  onEdit: (note: NoteResponse) => void;
  onDelete: (note: NoteResponse) => void;
  selectNote: (note: NoteResponse) => void;
};

export default function NoteCard({
  note,
  onEdit,
  onDelete,
  selectNote,
}: NoteCardProps) {
  const handleDelete = () => {
    selectNote(note);
    onDelete(note);
  };

  const handleEdit = () => {
    selectNote(note);
    onEdit(note);
  };

  return (
    <Card
      sx={{
        position: "relative",
        height: "100%",
        width: "100%",
        tabIndex: 0,
        backgroundColor: "lightgray",
      }}
      component={"article"}
    >
      <CardContent>
        <IconButton
          aria-label="edit"
          onClick={handleEdit}
          sx={{
            position: "absolute",
            top: ".4em",
            color: "#fff",
            padding: ".2em",
            opacity: ".6",
            "&.Mui-checked": {
              color: "inherit",
            },
            "&.Mui-focusVisible": {
              color: "inherit",
            },
          }}
          style={{ right: "1.8em" }}
        >
          <Edit fontSize="small" color="success" />
        </IconButton>

        <IconButton
          aria-label="delete"
          sx={{
            position: "absolute",
            top: ".4em",
            color: "#fff",
            padding: ".2em",
            opacity: ".6",
            "&.Mui-checked": {
              color: "inherit",
            },
            "&.Mui-focusVisible": {
              color: "inherit",
            },
          }}
          style={{ right: ".2em" }}
          onClick={handleDelete}
          type="button"
        >
          <Delete color="error" fontSize="small" />
        </IconButton>

        <Typography
          component={"h2"}
          sx={{ wordBreak: "break-word", width: 130 }}
        >
          {note.title}
        </Typography>

        <Typography variant="body2" component="p">
          {note.content}
        </Typography>

        <Typography variant="body1" component="div">
          {DateFormatter(note.createdAt)}
        </Typography>
      </CardContent>
    </Card>
  );
}
