"use client";

import { useState, useEffect } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import StopIcon from "@mui/icons-material/Stop";
import { formatDuration } from "../utils/utils";
import type { TimeEntry } from "../types/time-entry";

interface TimerControlsProps {
  activeEntry: TimeEntry | null;
  onStop: () => void;
}

export default function TimerControls({
  activeEntry,
  onStop,
}: TimerControlsProps) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (!activeEntry) {
      setElapsedSeconds(0);
      return;
    }

    setElapsedSeconds(
      Math.floor(
        (new Date().getTime() - new Date(activeEntry.startTime).getTime()) /
          1000,
      ),
    );

    const interval = setInterval(() => {
      setElapsedSeconds(
        Math.floor(
          (new Date().getTime() - new Date(activeEntry.startTime).getTime()) /
            1000,
        ),
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [activeEntry]);

  if (!activeEntry) {
    return null;
  }

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4, bgcolor: "#f5f5f5" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="subtitle1" color="text.secondary">
            Currently tracking:
          </Typography>
          <Typography variant="h6" component="h2">
            {activeEntry.description}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            variant="h4"
            component="div"
            sx={{ fontFamily: "monospace" }}
          >
            {formatDuration(elapsedSeconds)}
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            onClick={onStop}
            startIcon={<StopIcon />}
          >
            Stop
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
