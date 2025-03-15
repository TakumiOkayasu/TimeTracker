export interface TimeEntry {
  id: string;
  description: string;
  startTime: Date | string;
  endTime: Date | string | null;
  duration: number;
}
