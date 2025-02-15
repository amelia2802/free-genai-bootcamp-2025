
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "next-themes";

const Settings = () => {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

  const resetHistory = async () => {
    try {
      const response = await fetch("/api/reset_history", { method: "POST" });
      if (response.ok) {
        toast({
          title: "Success",
          description: "Study history has been reset",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reset history",
        variant: "destructive",
      });
    }
  };

  const fullReset = async () => {
    try {
      const response = await fetch("/api/full_reset", { method: "POST" });
      if (response.ok) {
        toast({
          title: "Success",
          description: "Application has been fully reset",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to perform full reset",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Customize your experience</p>
      </header>

      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Theme</h2>
          <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Reset Options</h2>
          <div className="space-y-4">
            <div>
              <Button 
                variant="outline" 
                onClick={resetHistory}
                className="w-full"
              >
                Reset History
              </Button>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                This will delete all study sessions and word review items
              </p>
            </div>

            <div>
              <Button 
                variant="destructive" 
                onClick={fullReset}
                className="w-full"
              >
                Full Reset
              </Button>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                This will reset all data to initial state
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
