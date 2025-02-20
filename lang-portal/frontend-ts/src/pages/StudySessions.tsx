
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data until backend is ready
const mockSessions = {
  sessions: Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    activityName: `Activity ${i + 1}`,
    groupName: `Group ${i + 1}`,
    startTime: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    endTime: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
    reviewItems: Math.floor(Math.random() * 50) + 1,
  })),
  pagination: {
    currentPage: 1,
    totalPages: 5,
    itemsPerPage: 100,
  },
};

export default function StudySessions() {
  const { data } = useQuery({
    queryKey: ["studySessions"],
    queryFn: () => Promise.resolve(mockSessions),
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Study Sessions</h1>
          <p className="text-muted-foreground mt-1">
            Review your learning history and progress
          </p>
        </div>
      </header>

      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Activity</TableHead>
              <TableHead>Group</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>End Time</TableHead>
              <TableHead className="text-right">Review Items</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.sessions.map((session) => (
              <TableRow key={session.id}>
                <TableCell>
                  <Link
                    to={`/study-sessions/${session.id}`}
                    className="text-primary hover:underline"
                  >
                    #{session.id}
                  </Link>
                </TableCell>
                <TableCell>{session.activityName}</TableCell>
                <TableCell>{session.groupName}</TableCell>
                <TableCell>
                  {new Date(session.startTime).toLocaleString()}
                </TableCell>
                <TableCell>{new Date(session.endTime).toLocaleString()}</TableCell>
                <TableCell className="text-right">{session.reviewItems}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Page {data?.pagination.currentPage} of {data?.pagination.totalPages}
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
