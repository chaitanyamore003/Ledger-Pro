import QuickActions from "../../components/dashBoard/QuickActions";
import RecentTransactions from "../../components/dashBoard/RecentTransactions";
import SummaryCards from "../../components/dashBoard/SummaryCards";
import WelcomeCard from "../../components/dashBoard/WelcomeCard";

function Overview() {
  return (
    <div className="space-y-6">
      <WelcomeCard />
      <SummaryCards />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)]">
        <QuickActions />
        <RecentTransactions />
      </div>
    </div>
  );
}

export default Overview;
