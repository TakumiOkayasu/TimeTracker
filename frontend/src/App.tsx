"use client";

import { useState, useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import TimeEntryList from "./components/time-entry-list";
import TimeEntryForm from "./components/time-entry-form";
import TimerControls from "./components/timer-controls";
import TimeStats from "./components/time-stats";
import type { TimeEntry } from "./types/time-entry";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

export default function App() {
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [activeEntry, setActiveEntry] = useState<TimeEntry | null>(null);

  // Load entries from localStorage on initial render
  useEffect(() => {
    const savedEntries = localStorage.getItem("timeEntries");
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }

    const savedActiveEntry = localStorage.getItem("activeEntry");
    if (savedActiveEntry) {
      setActiveEntry(JSON.parse(savedActiveEntry));
    }
  }, []);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("timeEntries", JSON.stringify(entries));
  }, [entries]);

  // Save active entry to localStorage whenever it changes
  useEffect(() => {
    if (activeEntry) {
      localStorage.setItem("activeEntry", JSON.stringify(activeEntry));
    } else {
      localStorage.removeItem("activeEntry");
    }
  }, [activeEntry]);

  const handleStartTimer = (description: string) => {
    const newEntry: TimeEntry = {
      id: Date.now().toString(),
      description,
      startTime: new Date(),
      endTime: null,
      duration: 0,
    };
    setActiveEntry(newEntry);
  };

  const handleStopTimer = () => {
    if (activeEntry) {
      const endTime = new Date();
      const duration = Math.floor(
        (endTime.getTime() - new Date(activeEntry.startTime).getTime()) / 1000,
      );

      const completedEntry: TimeEntry = {
        ...activeEntry,
        endTime,
        duration,
      };

      setEntries([completedEntry, ...entries]);
      setActiveEntry(null);
    }
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Time Tracker
          </Typography>

          <TimerControls activeEntry={activeEntry} onStop={handleStopTimer} />

          <TimeEntryForm
            onStart={handleStartTimer}
            isTimerActive={!!activeEntry}
          />

          <TimeStats entries={entries} />

          <TimeEntryList entries={entries} onDelete={handleDeleteEntry} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
