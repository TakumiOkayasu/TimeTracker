"use client";

import type React from "react";

import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

interface TimeEntryFormProps {
  onStart: (description: string) => void;
  isTimerActive: boolean;
}

export default function TimeEntryForm({
  onStart,
  isTimerActive,
}: TimeEntryFormProps) {
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      onStart(description);
      setDescription("");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ mb: 4, display: "flex", gap: 2 }}
    >
      <TextField
        label="What are you working on?"
        variant="outlined"
        fullWidth
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={isTimerActive}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!description.trim() || isTimerActive}
        startIcon={<PlayArrowIcon />}
        sx={{ minWidth: 120 }}
      >
        Start
      </Button>
    </Box>
  );
}
