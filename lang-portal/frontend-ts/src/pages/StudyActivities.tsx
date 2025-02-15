
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const StudyActivities = () => {
  const { data: activities, isLoading } = useQuery({
    queryKey: ["studyActivities"],
    queryFn: async () => {
      const response = await fetch("/api/study_activities");
      return response.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Study Activities</h1>
        <p className="text-gray-600 mt-2">Choose an activity to start studying</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities?.map((activity) => (
          <Card key={activity.id} className="p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-4">{activity.name}</h3>
            <div className="space-x-4">
              <Button asChild>
                <Link to={`/study-activities/${activity.id}/launch`}>Launch</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to={`/study-activities/${activity.id}`}>View Details</Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudyActivities;
