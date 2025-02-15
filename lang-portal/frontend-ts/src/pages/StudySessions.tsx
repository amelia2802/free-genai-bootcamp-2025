
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const StudySessions = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["studySessions"],
    queryFn: async () => {
      const response = await fetch("/api/study_sessions");
      return response.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Study Sessions</h1>
        <p className="text-gray-600 mt-2">View your learning history</p>
      </header>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Activity Name</TableHead>
            <TableHead>Group Name</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>Review Items</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.study_sessions.map((session) => (
            <TableRow key={session.id}>
              <TableCell>
                <Link 
                  to={`/study-sessions/${session.id}`}
                  className="text-primary hover:underline"
                >
                  {session.id}
                </Link>
              </TableCell>
              <TableCell>{session.study_activity_id}</TableCell>
              <TableCell>{session.group_id}</TableCell>
              <TableCell>{new Date(session.created_at).toLocaleString()}</TableCell>
              <TableCell>{session.review_items_count ?? 0}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudySessions;
