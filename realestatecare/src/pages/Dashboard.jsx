import DashboardCard from "../components/DashboardCard";

export default function Dashboard() {
  return (
    <>
      <DashboardCard url="/planned" icon="Schedule"></DashboardCard>
      <DashboardCard url="#" icon="Completed"></DashboardCard>
      <DashboardCard url="#" icon="KnowledgeBase"></DashboardCard>
      <DashboardCard url="#" icon="Settings"></DashboardCard>
    </>
  );
}
