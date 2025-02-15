
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import StudyActivities from "./pages/StudyActivities";
import StudyActivityShow from "./pages/StudyActivityShow";
import StudyActivityLaunch from "./pages/StudyActivityLaunch";
import Words from "./pages/Words";
import WordShow from "./pages/WordShow";
import Groups from "./pages/Groups";
import GroupShow from "./pages/GroupShow";
import StudySessions from "./pages/StudySessions";
import StudySessionShow from "./pages/StudySessionShow";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/study-activities" element={<StudyActivities />} />
        <Route path="/study-activities/:id" element={<StudyActivityShow />} />
        <Route path="/study-activities/:id/launch" element={<StudyActivityLaunch />} />
        <Route path="/words" element={<Words />} />
        <Route path="/words/:id" element={<WordShow />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/groups/:id" element={<GroupShow />} />
        <Route path="/study-sessions" element={<StudySessions />} />
        <Route path="/study-sessions/:id" element={<StudySessionShow />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
