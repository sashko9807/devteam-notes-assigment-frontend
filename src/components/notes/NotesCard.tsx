import { Card, CardContent, IconButton, Typography } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { NoteResponse } from "../../common/hooks/notes";
import DateFormatter from "../../common/utils/DateFormatter";

type NoteCardProps = {
  note: NoteResponse;
  onEdit: (note: NoteResponse) => void;
  onDelete: (note: NoteResponse) => void;
};

export default function Note({ note, onEdit, onDelete }: NoteCardProps) {
  return (
    <Card
      sx={{ position: "relative", height: "100%", width: "100%" }}
      component={"article"}
    >
      <CardContent>
        <IconButton
          aria-label="edit"
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
          onClick={() => onEdit(note)}
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
          onClick={() => onDelete(note)}
          type="button"
        >
          <Delete color="error" fontSize="small" />
        </IconButton>

        <Typography component={"h2"} gutterBottom>
          {note.title}
        </Typography>

        <Typography
          variant="body2"
          component="p"
          //   className={classes.noteDescription}
        >
          {note.content}
        </Typography>

        <Typography
          variant="body1"
          component="div"
          //   className={classes.noteDate}
        >
          {DateFormatter(note.createdAt)}
        </Typography>
      </CardContent>
    </Card>
  );
}
