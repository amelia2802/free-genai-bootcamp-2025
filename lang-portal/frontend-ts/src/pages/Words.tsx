
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
const mockWords = {
  words: Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    bengali: "শব্দ",
    pronunciation: "shobdo",
    english: "word",
    correctCount: Math.floor(Math.random() * 20),
    wrongCount: Math.floor(Math.random() * 10),
  })),
  pagination: {
    currentPage: 1,
    totalPages: 5,
    itemsPerPage: 100,
  },
};

export default function Words() {
  const { data } = useQuery({
    queryKey: ["words"],
    queryFn: () => Promise.resolve(mockWords),
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Words</h1>
          <p className="text-muted-foreground mt-1">
            Browse and manage vocabulary words
          </p>
        </div>
      </header>

      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bengali</TableHead>
              <TableHead>Pronunciation</TableHead>
              <TableHead>English</TableHead>
              <TableHead className="text-right">Correct</TableHead>
              <TableHead className="text-right">Wrong</TableHead>
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
                <TableCell>{word.pronunciation}</TableCell>
                <TableCell>{word.english}</TableCell>
                <TableCell className="text-right text-green-600">
                  {word.correctCount}
                </TableCell>
                <TableCell className="text-right text-red-600">
                  {word.wrongCount}
                </TableCell>
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
