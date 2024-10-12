import DashboardCard from "../components/dashboardcard";

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
