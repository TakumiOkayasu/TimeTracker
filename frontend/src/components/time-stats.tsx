"use client";

import type React from "react";

import { useMemo } from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TodayIcon from "@mui/icons-material/Today";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { formatDuration } from "../utils/utils";
import type { TimeEntry } from "../types/time-entry";
import { isToday, isThisWeek } from "date-fns";

interface TimeStatsProps {
  entries: TimeEntry[];
}

export default function TimeStats({ entries }: TimeStatsProps) {
  const stats = useMemo(() => {
    const totalSeconds = entries.reduce(
      (total, entry) => total + entry.duration,
      0,
    );

    const todayEntries = entries.filter((entry) =>
      isToday(new Date(entry.startTime)),
    );
    const todaySeconds = todayEntries.reduce(
      (total, entry) => total + entry.duration,
      0,
    );

    const weekEntries = entries.filter((entry) =>
      isThisWeek(new Date(entry.startTime)),
    );
    const weekSeconds = weekEntries.reduce(
      (total, entry) => total + entry.duration,
      0,
    );

    return {
      total: formatDuration(totalSeconds),
      today: formatDuration(todaySeconds),
      week: formatDuration(weekSeconds),
    };
  }, [entries]);

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid item xs={12} sm={4}>
        <StatCard
          title="Today"
          value={stats.today}
          icon={<TodayIcon fontSize="large" color="primary" />}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <StatCard
          title="This Week"
          value={stats.week}
          icon={<DateRangeIcon fontSize="large" color="primary" />}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <StatCard
          title="Total"
          value={stats.total}
          icon={<AccessTimeIcon fontSize="large" color="primary" />}
        />
      </Grid>
    </Grid>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <Paper elevation={2} sx={{ p: 2, height: "100%" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {icon}
        <Box>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h6" component="div">
            {value}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
