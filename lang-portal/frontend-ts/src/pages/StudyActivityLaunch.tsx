
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";

const StudyActivityLaunch = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedGroup, setSelectedGroup] = useState("");

  const { data: groups, isLoading } = useQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      const response = await fetch("/api/groups");
      return response.json();
    },
  });

  const handleLaunch = async () => {
    if (!selectedGroup) return;

    try {
      const response = await fetch("/api/study_activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          group_id: selectedGroup,
          study_activity_id: id,
        }),
      });

      if (response.ok) {
        navigate(`/study-activities/${id}`);
      }
    } catch (error) {
      console.error("Failed to launch activity:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <Card className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Launch Study Activity</h1>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Group</label>
          <Select value={selectedGroup} onValueChange={setSelectedGroup}>
            <SelectTrigger>
              <SelectValue placeholder="Select a group" />
            </SelectTrigger>
            <SelectContent>
              {groups?.groups.map((group) => (
                <SelectItem key={group.id} value={group.id.toString()}>
                  {group.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={handleLaunch} 
          disabled={!selectedGroup}
          className="w-full"
        >
          Launch Now
        </Button>
      </div>
    </Card>
  );
};

export default StudyActivityLaunch;
