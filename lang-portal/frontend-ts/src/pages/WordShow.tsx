
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const WordShow = () => {
  const { id } = useParams();

  const { data: word, isLoading } = useQuery({
    queryKey: ["word", id],
    queryFn: async () => {
      const response = await fetch(`/api/words/${id}`);
      return response.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold">{word?.bengali}</h1>
        <p className="text-gray-600 mt-2">Word Details</p>
      </header>

      <Card className="p-6 space-y-6">
        <div>
          <h2 className="text-sm font-medium text-gray-500">Pronunciation</h2>
          <p className="text-lg mt-1">{word?.pronounciation}</p>
        </div>

        <div>
          <h2 className="text-sm font-medium text-gray-500">English Translation</h2>
          <p className="text-lg mt-1">{word?.english}</p>
        </div>

        <div>
          <h2 className="text-sm font-medium text-gray-500 mb-2">Word Groups</h2>
          <div className="flex gap-2 flex-wrap">
            {word?.groups?.map((group) => (
              <Badge key={group.id} variant="outline">
                <Link 
                  to={`/groups/${group.id}`}
                  className="hover:underline"
                >
                  {group.name}
                </Link>
              </Badge>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WordShow;
