
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

const Words = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["words"],
    queryFn: async () => {
      const response = await fetch("/api/words");
      return response.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Words</h1>
        <p className="text-gray-600 mt-2">Browse all available words</p>
      </header>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Bengali</TableHead>
            <TableHead>Pronunciation</TableHead>
            <TableHead>English</TableHead>
            <TableHead>Correct Count</TableHead>
            <TableHead>Wrong Count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.words.map((word) => (
            <TableRow key={word.id}>
              <TableCell>
                <Link 
                  to={`/words/${word.id}`}
                  className="text-primary hover:underline"
                >
                  {word.bengali}
                </Link>
              </TableCell>
              <TableCell>{word.pronounciation}</TableCell>
              <TableCell>{word.english}</TableCell>
              <TableCell>{word.correct_count ?? 0}</TableCell>
              <TableCell>{word.wrong_count ?? 0}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Words;
