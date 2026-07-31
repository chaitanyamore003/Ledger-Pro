import { useEffect, useState } from "react";
import QuickActions from "../../components/dashBoard/QuickActions";
import RecentTransactions from "../../components/dashBoard/RecentTransactions";
import SummaryCards from "../../components/dashBoard/SummaryCards";
import WelcomeCard from "../../components/dashBoard/WelcomeCard";
import {
  getDashboardSummary,
  initializeInitialFunds,
} from "../../services/ledgerApi";

const createIdempotencyKey = () => {
  return window.crypto?.randomUUID?.() || `initial-funds-${Date.now()}`;
};

function Overview() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadDashboard = async () => {
      try {
        const { data } = await getDashboardSummary();

        if (!isMounted) {
          return;
        }

        setDashboard(data.data);
        setError("");
      } catch (requestError) {
        if (!isMounted) {
          return;
        }

        setError(
          requestError.response?.data?.message ||
            "Unable to load dashboard summary.",
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleInitializeFunds = async (amount) => {
    try {
      setInitializing(true);
      setError("");

      const { data } = await initializeInitialFunds({
        amount: Number(amount),
        idempotencyKey: createIdempotencyKey(),
      });

      setDashboard(data.data.dashboard);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Unable to initialize funds.",
      );
    } finally {
      setInitializing(false);
    }
  };

  return (
    <div className="space-y-6">
      <WelcomeCard
        dashboard={dashboard}
        initializing={initializing}
        loading={loading}
        onInitializeFunds={handleInitializeFunds}
      />

      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      <SummaryCards dashboard={dashboard} loading={loading} />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)]">
        <QuickActions />
        <RecentTransactions
          loading={loading}
          transactions={dashboard?.recentTransactions ?? []}
        />
      </div>
    </div>
  );
}

export default Overview;
