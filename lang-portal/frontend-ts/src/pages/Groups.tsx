
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

const Groups = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      const response = await fetch("/api/groups");
      return response.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Word Groups</h1>
        <p className="text-gray-600 mt-2">Browse all word groups</p>
      </header>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Group Name</TableHead>
            <TableHead>Word Count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.groups.map((group) => (
            <TableRow key={group.id}>
              <TableCell>
                <Link 
                  to={`/groups/${group.id}`}
                  className="text-primary hover:underline"
                >
                  {group.name}
                </Link>
              </TableCell>
              <TableCell>{group.word_count ?? 0}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Groups;
