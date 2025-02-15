
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const StudyActivityShow = () => {
  const { id } = useParams();

  const { data: activity, isLoading } = useQuery({
    queryKey: ["studyActivity", id],
    queryFn: async () => {
      const response = await fetch(`/api/study_activities/${id}`);
      return response.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{activity?.name}</h1>
          <p className="text-gray-600 mt-2">Activity Details</p>
        </div>
        <Button asChild>
          <Link to={`/study-activities/${id}/launch`}>Launch Activity</Link>
        </Button>
      </header>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Description</h2>
        <p className="text-gray-600">{activity?.description}</p>
      </Card>
    </div>
  );
};

export default StudyActivityShow;
