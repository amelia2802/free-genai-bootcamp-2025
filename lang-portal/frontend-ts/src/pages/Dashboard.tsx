
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const { data: lastSession } = useQuery({
    queryKey: ["lastStudySession"],
    queryFn: async () => {
      const response = await fetch("/dashboard/last_study_session");
      return response.json();
    },
  });

  const { data: progress } = useQuery({
    queryKey: ["studyProgress"],
    queryFn: async () => {
      const response = await fetch("/dashboard/study_progress");
      return response.json();
    },
  });

  const { data: stats } = useQuery({
    queryKey: ["quickStats"],
    queryFn: async () => {
      const response = await fetch("/dashboard/quick-stats");
      return response.json();
    },
  });

  return (
    <div className="space-y-8 fade-in">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
        <p className="text-gray-600">Continue your language learning journey</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6 glass-card hover-scale">
          <h2 className="text-xl font-semibold mb-4">Last Study Session</h2>
          {lastSession && (
            <div className="space-y-2">
              <p>Activity: {lastSession.study_activity_id}</p>
              <p>Date: {new Date(lastSession.created_at).toLocaleDateString()}</p>
            </div>
          )}
        </Card>

        <Card className="p-6 glass-card hover-scale">
          <h2 className="text-xl font-semibold mb-4">Study Progress</h2>
          {progress && (
            <div className="space-y-2">
              <p>Total Sessions: {progress.total_sessions}</p>
              <p>Words Reviewed: {progress.total_words_reviewed}</p>
              <div className="h-2 bg-gray-200 rounded-full mt-4">
                <div 
                  className="h-2 bg-primary rounded-full transition-all duration-500"
                  style={{ 
                    width: `${(progress.correct_reviews / progress.total_words_reviewed) * 100}%` 
                  }}
                />
              </div>
            </div>
          )}
        </Card>

        <Card className="p-6 glass-card hover-scale">
          <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
          {stats && (
            <div className="space-y-2">
              <p>Total Words: {stats.total_words}</p>
              <p>Total Groups: {stats.total_groups}</p>
              <p>Study Sessions: {stats.total_study_sessions}</p>
            </div>
          )}
        </Card>
      </div>

      <div className="text-center mt-12">
        <Button 
          size="lg" 
          onClick={() => navigate("/study-activities")}
          className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Start Studying
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
