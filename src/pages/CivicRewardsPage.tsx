import React from 'react';
import { useApp } from '../context/AppContext';
import { PANCHAYAT_LEADERBOARD } from '../data/mockData';
import { 
  Award, 
  Sparkles, 
  Gift, 
  Check, 
  Trophy, 
  Users, 
  Calendar, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Tag
} from 'lucide-react';

export const CivicRewardsPage: React.FC = () => {
  const { currentUser, rewards, claimReward, setCurrentView } = useApp();

  return (
    <div className="min-h-screen bg-[#f7f5ef] pb-20 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Header Card */}
        <div className="bg-gradient-to-r from-[#00452d] via-[#1f5d42] to-[#00452d] text-white rounded-3xl p-6 sm:p-10 shadow-civic-float border border-[#0f5137] relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#efc052] text-[#261a00] text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Community Civic Impact Program
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Civic Rewards & Village Impact
            </h1>
            <p className="text-xs sm:text-sm text-[#e5f4eb] leading-relaxed">
              Every verified grievance report, community endorsement, and clean-up initiative earns you civic points redeemable for agricultural, solar, and travel subsidies.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20">
                <span className="text-xs text-[#efc052] font-extrabold uppercase tracking-wider block">
                  Current Balance
                </span>
                <span className="text-3xl font-extrabold text-white">
                  {currentUser.civicPoints} <span className="text-xs font-semibold text-gray-200">Points</span>
                </span>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20">
                <span className="text-xs text-[#95d4b1] font-extrabold uppercase tracking-wider block">
                  Citizen Tier
                </span>
                <span className="text-lg font-extrabold text-white">
                  {currentUser.level}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Badges Earned Collection */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-civic border border-[#ddece3] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-primary flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                Citizen Achievement Badges
              </h2>
              <p className="text-xs text-on-surface-variant">Recognitions awarded by Gram Sabha for civic stewardship</p>
            </div>
            <span className="text-xs font-bold text-primary bg-[#b1f0cd] px-3 py-1 rounded-full">
              {currentUser.badges.length} Unlocked
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {currentUser.badges.map((b) => (
              <div
                key={b.id}
                className="bg-surface-container-low rounded-2xl p-4 border border-[#ddece3] flex items-start gap-3 hover:border-primary transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#6a4e00] to-[#efc052] text-white flex items-center justify-center shadow-md shrink-0">
                  <span className="material-symbols-outlined text-2xl">{b.icon}</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-primary">{b.name}</h4>
                  <p className="text-[11px] text-on-surface-variant mt-0.5 leading-snug">{b.description}</p>
                  <span className="text-[10px] text-outline font-semibold mt-1 block">Earned: {b.dateEarned}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Rewards Store */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-civic border border-[#ddece3] space-y-6">
          <div>
            <h2 className="text-xl font-extrabold text-primary flex items-center gap-2">
              <Gift className="w-5 h-5 text-[#3c6938]" />
              Redeemable Govt & Sponsor Vouchers
            </h2>
            <p className="text-xs text-on-surface-variant">
              Exchange your points for useful agricultural, solar, health, and transport benefits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rewards.map((reward) => (
              <div
                key={reward.id}
                className="bg-surface-container-low rounded-2xl p-5 border border-[#ddece3] flex flex-col justify-between hover:shadow-civic-lg transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#ddece3] text-primary flex items-center justify-center shadow-sm">
                      <span className="material-symbols-outlined text-xl">{reward.icon}</span>
                    </div>
                    <span className="text-xs font-extrabold text-amber-900 bg-[#ffdf9e] px-2.5 py-0.5 rounded-full">
                      {reward.costPoints} Points
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-primary">{reward.title}</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{reward.description}</p>
                  <span className="text-[10px] text-outline block font-semibold">
                    Sponsored by: <b>{reward.sponsor}</b>
                  </span>
                </div>

                <div className="pt-4 mt-3 border-t border-[#ddece3]">
                  {reward.claimed ? (
                    <div className="bg-[#b1f0cd] text-[#002113] p-2 rounded-xl text-center text-xs font-bold font-mono">
                      Code: {reward.code} (Claimed ✓)
                    </div>
                  ) : (
                    <button
                      onClick={() => claimReward(reward.id)}
                      disabled={currentUser.civicPoints < reward.costPoints}
                      className="w-full py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-sm hover:bg-[#1f5d42] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      {currentUser.civicPoints >= reward.costPoints ? 'Claim Voucher' : 'Need More Points'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Gram Panchayat Cleanliness Leaderboard */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-civic border border-[#ddece3] space-y-4">
          <div>
            <h2 className="text-xl font-extrabold text-primary flex items-center gap-2">
              <Trophy className="w-5 h-5 text-emerald-700" />
              District Panchayat Governance Leaderboard
            </h2>
            <p className="text-xs text-on-surface-variant">
              Top performing Gram Panchayats ranked by resolution speed, cleanliness index, and citizen engagement.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container text-primary uppercase text-[10px] font-extrabold tracking-wider">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Rank</th>
                  <th className="p-3.5">Gram Panchayat</th>
                  <th className="p-3.5">Cleanliness Score</th>
                  <th className="p-3.5">Resolution Rate</th>
                  <th className="p-3.5">Total Resolved</th>
                  <th className="p-3.5 rounded-r-xl">Special Badge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ddece3]">
                {PANCHAYAT_LEADERBOARD.map((item) => (
                  <tr key={item.rank} className="hover:bg-surface-container-low transition-colors">
                    <td className="p-3.5 font-extrabold text-primary">
                      {item.rank === 1 ? '🥇 #1' : item.rank === 2 ? '🥈 #2' : item.rank === 3 ? '🥉 #3' : `#${item.rank}`}
                    </td>
                    <td className="p-3.5 font-bold text-primary">
                      {item.name}
                      <span className="block text-[10px] text-on-surface-variant font-normal">
                        {item.block}, {item.district}
                      </span>
                    </td>
                    <td className="p-3.5 font-extrabold text-emerald-800">{item.cleanlinessScore}%</td>
                    <td className="p-3.5 font-semibold text-primary">{item.resolutionRate}%</td>
                    <td className="p-3.5 font-bold text-primary">{item.totalResolved} issues</td>
                    <td className="p-3.5">
                      <span className="bg-[#b1f0cd] text-[#002113] text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {item.topBadge}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
};
