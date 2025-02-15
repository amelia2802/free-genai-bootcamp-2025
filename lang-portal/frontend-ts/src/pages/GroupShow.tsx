
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

const GroupShow = () => {
  const { id } = useParams();

  const { data: group, isLoading: groupLoading } = useQuery({
    queryKey: ["group", id],
    queryFn: async () => {
      const response = await fetch(`/api/groups/${id}`);
      return response.json();
    },
  });

  const { data: words, isLoading: wordsLoading } = useQuery({
    queryKey: ["groupWords", id],
    queryFn: async () => {
      const response = await fetch(`/api/groups/${id}/words`);
      return response.json();
    },
  });

  if (groupLoading || wordsLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold">{group?.name}</h1>
        <p className="text-gray-600 mt-2">Group Details</p>
      </header>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Words in Group</h2>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bengali</TableHead>
              <TableHead>Pronunciation</TableHead>
              <TableHead>English</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {words?.words.map((word) => (
              <TableRow key={word.id}>
                <TableCell>{word.bengali}</TableCell>
                <TableCell>{word.pronounciation}</TableCell>
                <TableCell>{word.english}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default GroupShow;
