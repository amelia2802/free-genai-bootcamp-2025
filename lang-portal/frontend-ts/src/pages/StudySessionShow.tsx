
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const StudySessionShow = () => {
  const { id } = useParams();

  const { data: session, isLoading: sessionLoading } = useQuery({
    queryKey: ["studySession", id],
    queryFn: async () => {
      const response = await fetch(`/api/study_sessions/${id}`);
      return response.json();
    },
  });

  const { data: words, isLoading: wordsLoading } = useQuery({
    queryKey: ["sessionWords", id],
    queryFn: async () => {
      const response = await fetch(`/api/study_sessions/${id}/words`);
      return response.json();
    },
  });

  if (sessionLoading || wordsLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Study Session Details</h1>
        <p className="text-gray-600 mt-2">Session #{id}</p>
      </header>

      <Card className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div>
            <h3 className="font-medium text-gray-500">Activity</h3>
            <p className="mt-1">{session?.study_activity_id}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-500">Group</h3>
            <p className="mt-1">{session?.group_id}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-500">Start Time</h3>
            <p className="mt-1">{new Date(session?.created_at).toLocaleString()}</p>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4">Reviewed Words</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bengali</TableHead>
              <TableHead>Pronunciation</TableHead>
              <TableHead>English</TableHead>
              <TableHead>Result</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {words?.words.map((word) => (
              <TableRow key={word.word_id}>
                <TableCell>{word.bengali}</TableCell>
                <TableCell>{word.pronounciation}</TableCell>
                <TableCell>{word.english}</TableCell>
                <TableCell>
                  <span className={word.correct ? "text-green-600" : "text-red-600"}>
                    {word.correct ? "Correct" : "Incorrect"}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default StudySessionShow;
