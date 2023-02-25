import RecentTransactions from "./RecentTransactions";
import BalanceWidget from "./BalanceWidget";
import UploadWidget from "./UploadWidget";
import RecentCheques from "./RecentCheques";
export default function Dashboard() {
  return (
    <div className="bg-[#ece7f6] h-fit min-h-[100vh] flex-1 p-10" >
        {/* Top Container */}
        <div className="" >
            <span className="font-bold text-6xl text-[#a287e7]" >Dashboard</span>
        </div>  

        {/* Bottom Container */}
        <div className="mt-8" >
            {/* Quick Actions */}
            <div className="flex space-x-6" >
                <BalanceWidget />
                <UploadWidget />
            </div>
            
            <RecentTransactions />
            <RecentCheques />
        </div>

    </div>
  )
}
