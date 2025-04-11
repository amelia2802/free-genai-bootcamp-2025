import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, BookOpen, BrainCircuit, Gamepad2, ScrollText } from "lucide-react";
import { Link } from "react-router-dom";
import axios from 'axios';

// Mock data until backend is ready
const mockActivities = [
  {
    id: 1,
    name: "Vocabulary Quiz",
    description: "Test your knowledge with multiple choice questions",
    icon: ScrollText,
    launchUrl: "/activities/vocabulary-quiz",
  },
  {
    id: 2,
    name: "Memory Game",
    description: "Match words with their meanings in a memory card game",
    icon: BrainCircuit,
    launchUrl: "/activities/memory-game",
  },
  {
    id: 3,
    name: "Word Pairs",
    description: "Practice word associations and translations",
    icon: BookOpen,
    launchUrl: "/activities/word-pairs",
  },
  {
    id: 4,
    name: "Speed Challenge",
    description: "Race against time to match as many words as possible",
    icon: Gamepad2,
    launchUrl: "/activities/speed-challenge",
  },
];

export default function StudyActivities() {
  const { data: activities } = useQuery({
    queryKey: ["studyActivities"],
    queryFn: () => Promise.resolve(mockActivities),
  });

  const { data: quizData, isLoading, isError } = useQuery({
    queryKey: ["vocabularyQuiz"],
    queryFn: async () => {
      const response = await axios.get('/api/study-activities/vocabulary-quiz');
      return response.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading quiz data</div>;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Study Activities</h1>
          <p className="text-muted-foreground mt-1">
            Choose an activity to practice your vocabulary
          </p>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {activities?.map((activity) => (
          <Card key={activity.id} className="group">
            <CardHeader>
              <div className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <activity.icon className="size-6 text-primary" />
              </div>
              <CardTitle className="text-xl">{activity.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{activity.description}</p>
            </CardContent>
            <CardFooter className="flex gap-4">
              {activity.id === 1 && (
                <Button asChild className="flex-1">
                  <div>
                    <Link to={activity.launchUrl}>
                      Launch
                      <ArrowRight size={16} className="ml-2" />
                    </Link>
                    {quizData && quizData.questions && (
                      <div>
                        {quizData.questions.map((question, index) => (
                          <div key={index}>
                            <p>{question.prompt}</p>
                            <ul>
                              {question.options.map((option, index) => (
                                <li key={index}>{option}</li>
                              ))}
                            </ul>
                            <p>Answer: {question.answer}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Button>
              )}
              <Button asChild variant="outline" className="flex-1">
                <Link to={`${activity.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}