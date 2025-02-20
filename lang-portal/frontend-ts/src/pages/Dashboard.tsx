
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Check,
  Clock,
  Target,
  Users,
  ArrowRight,
} from "lucide-react";

// Mock data until backend is ready
const mockLastSession = {
  id: 1,
  activity: "Vocabulary Quiz",
  timestamp: "2024-02-14T10:00:00Z",
  correct: 15,
  wrong: 5,
  group: "Basic Words",
};

const mockProgress = {
  totalWords: 124,
  studiedWords: 45,
  mastery: 65,
};

const mockStats = {
  successRate: 80,
  totalSessions: 4,
  activeGroups: 3,
  studyStreaks: 4,
};

export default function Dashboard() {
  // These will be replaced with actual API calls later
  const { data: lastSession } = useQuery({
    queryKey: ["lastSession"],
    queryFn: () => Promise.resolve(mockLastSession),
  });

  const { data: progress } = useQuery({
    queryKey: ["progress"],
    queryFn: () => Promise.resolve(mockProgress),
  });

  const { data: stats } = useQuery({
    queryKey: ["stats"],
    queryFn: () => Promise.resolve(mockStats),
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back!</h1>
          <p className="text-muted-foreground mt-1">
            Track your language learning progress
          </p>
        </div>
        <Button size="lg" className="gap-2">
          <Link to="/study-activities">
            Start Studying
          </Link>
          <ArrowRight size={18} />
        </Button>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Last Study Session
            </CardTitle>
          </CardHeader>
          <CardContent>
            {lastSession && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{lastSession.activity}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(lastSession.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  <Link
                    to={`/groups/${lastSession.id}`}
                    className="text-sm text-primary hover:underline"
                  >
                    View Group
                  </Link>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Check className="text-green-500" size={18} />
                    <span>{lastSession.correct} correct</span>
                  </div>
                  <div className="flex items-center gap-2 text-red-500">
                    <span>•</span>
                    <span>{lastSession.wrong} wrong</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Study Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            {progress && (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      Total Words Studied
                    </span>
                    <span className="font-medium">
                      {progress.studiedWords}/{progress.totalWords}
                    </span>
                  </div>
                  <Progress value={progress.mastery} />
                </div>
                <p className="text-sm text-muted-foreground">
                  {progress.mastery}% mastery achieved
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats && (
          <>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Target size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                    <p className="text-2xl font-bold">{stats.successRate}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <BookOpen size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Study Sessions
                    </p>
                    <p className="text-2xl font-bold">{stats.totalSessions}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Active Groups</p>
                    <p className="text-2xl font-bold">{stats.activeGroups}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Clock size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Study Streak</p>
                    <p className="text-2xl font-bold">{stats.studyStreaks} days</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
