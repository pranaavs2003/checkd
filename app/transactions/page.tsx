import Transactions from "../../components/Transactions";
export default function page() {
    return (
      <div className="text-3xl font-semibold p-5 ml-[20vw] min-h-screen h-fit" >
        <div className="flex-1" >
          {/* Top Container */}
          <div className="mt-10" >
              <span className="font-bold text-6xl text-[#a287e7]" >Transactions</span>
          </div>  

          {/* Bottom Container */}
          <div className="mt-8 flex-none lg:flex " >

            {/* Transaction Table */}
            <Transactions />

          </div>
        </div>
      </div>
    )
  }
  