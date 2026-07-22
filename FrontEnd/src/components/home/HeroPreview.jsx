import {
  Activity,
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  DollarSign,
} from "lucide-react";

function HeroPreview() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-200 pb-5">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Ledger Dashboard
          </h3>
          <p className="text-sm text-slate-500">Banking overview</p>
        </div>

        <div className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
          Active
        </div>
      </div>

      {/* Statistics */}

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-slate-200 p-4">
          <DollarSign className="text-indigo-700" size={22} />
          <p className="mt-3 text-sm text-slate-500">Total Balance</p>
          <h4 className="mt-1 text-2xl font-bold text-slate-900">₹8.4L</h4>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <CreditCard className="text-indigo-700" size={22} />
          <p className="mt-3 text-sm text-slate-500">Accounts</p>
          <h4 className="mt-1 text-2xl font-bold text-slate-900">12</h4>
        </div>
      </div>

      {/* Recent Activity */}

      <div className="mt-8">
        <div className="mb-4 flex items-center gap-2">
          <Activity size={18} className="text-indigo-700" />
          <h4 className="font-semibold text-slate-900">Recent Activity</h4>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <ArrowDownLeft className="text-emerald-600" size={18} />
              <div>
                <p className="font-medium text-slate-900">Deposit</p>
                <p className="text-sm text-slate-500">Today</p>
              </div>
            </div>

            <span className="font-semibold text-emerald-600">+₹25,000</span>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <ArrowUpRight className="text-red-500" size={18} />
              <div>
                <p className="font-medium text-slate-900">Withdrawal</p>
                <p className="text-sm text-slate-500">Yesterday</p>
              </div>
            </div>

            <span className="font-semibold text-red-500">-₹7,500</span>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <ArrowDownLeft className="text-emerald-600" size={18} />
              <div>
                <p className="font-medium text-slate-900">Transfer</p>
                <p className="text-sm text-slate-500">Jul 21</p>
              </div>
            </div>

            <span className="font-semibold text-emerald-600">+₹12,800</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroPreview;
