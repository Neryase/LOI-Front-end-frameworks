import DashboardCard from "../components/DashboardCard";

export default function Dashboard() {
  return (
    <>
      <DashboardCard url="/planned" icon="Schedule"></DashboardCard>
      <DashboardCard url="/finished" icon="Completed"></DashboardCard>
      <DashboardCard url="/knowledgebase" icon="KnowledgeBase"></DashboardCard>
      <DashboardCard url="/settings" icon="Settings"></DashboardCard>
    </>
  );
}
