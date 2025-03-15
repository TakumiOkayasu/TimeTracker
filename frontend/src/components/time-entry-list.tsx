"use client";

import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { format } from "date-fns";
import { formatDuration } from "../utils/utils";
import type { TimeEntry } from "../types/time-entry";

interface TimeEntryListProps {
  entries: TimeEntry[];
  onDelete: (id: string) => void;
}

export default function TimeEntryList({
  entries,
  onDelete,
}: TimeEntryListProps) {
  if (entries.length === 0) {
    return (
      <Paper elevation={1} sx={{ p: 3, mt: 4, textAlign: "center" }}>
        <Typography variant="subtitle1" color="text.secondary">
          No time entries yet. Start tracking your time!
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={1} sx={{ mt: 4 }}>
      <Box sx={{ p: 2, bgcolor: "#f9f9f9" }}>
        <Typography variant="h6" component="h2">
          Time History
        </Typography>
      </Box>
      <Divider />
      <List sx={{ width: "100%" }}>
        {entries.map((entry, index) => (
          <Box key={entry.id}>
            {index > 0 && <Divider />}
            <ListItem
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => onDelete(entry.id)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={entry.description}
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {formatDuration(entry.duration)}
                    </Typography>
                    {" • "}
                    {format(new Date(entry.startTime), "MMM d, yyyy • h:mm a")}
                  </>
                }
              />
            </ListItem>
          </Box>
        ))}
      </List>
    </Paper>
  );
}
