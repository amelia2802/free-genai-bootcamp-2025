
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { Moon, Sun, Trash2, RotateCcw } from "lucide-react";

export default function Settings() {
  const { toast } = useToast();

  const handleThemeChange = (theme: string) => {
    // Theme implementation will be added later
    toast({
      title: "Theme Changed",
      description: `Theme has been changed to ${theme}`,
    });
  };

  const handleResetHistory = () => {
    // API call will be implemented later
    toast({
      title: "History Reset",
      description: "Your study history has been reset successfully",
    });
  };

  const handleFullReset = () => {
    // API call will be implemented later
    toast({
      title: "Full Reset Complete",
      description: "All data has been reset to initial state",
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Theme Preferences</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => handleThemeChange("light")}
          >
            <Sun className="mr-2" size={18} />
            Light
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => handleThemeChange("dark")}
          >
            <Moon className="mr-2" size={18} />
            Dark
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => handleThemeChange("system")}
          >
            System
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reset Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="w-full">
                <RotateCcw className="mr-2" size={18} />
                Reset History
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Reset Study History</AlertDialogTitle>
                <AlertDialogDescription>
                  This will delete all study sessions and word review items. This
                  action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleResetHistory}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full">
                <Trash2 className="mr-2" size={18} />
                Full Reset
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Full System Reset</AlertDialogTitle>
                <AlertDialogDescription>
                  This will reset all data to initial state, including words,
                  groups, and study history. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleFullReset}
                  className="bg-destructive hover:bg-destructive/90"
                >
                  Reset Everything
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}
