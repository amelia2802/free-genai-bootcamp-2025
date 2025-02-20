
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
const mockGroups = {
  groups: Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Group ${i + 1}`,
    wordCount: Math.floor(Math.random() * 100) + 1,
  })),
  pagination: {
    currentPage: 1,
    totalPages: 5,
    itemsPerPage: 100,
  },
};

export default function Groups() {
  const { data } = useQuery({
    queryKey: ["groups"],
    queryFn: () => Promise.resolve(mockGroups),
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Groups</h1>
          <p className="text-muted-foreground mt-1">
            Manage your word groups and collections
          </p>
        </div>
      </header>

      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Group Name</TableHead>
              <TableHead className="text-right">Word Count</TableHead>
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
                <TableCell className="text-right">{group.wordCount}</TableCell>
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
