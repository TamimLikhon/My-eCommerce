import { FaRegMoneyBillAlt } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import { FaCreditCard } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";

export default function SecondHeader() {
    return (
        <div className="w-full bg-slate-300 py-2">
        <div className="container mx-auto">
          <div className="flex justify-between items-center space-x-4 px-4">
            <div className="flex items-center gap-2">
              <FaRegMoneyBillAlt className="text-green-600 text-lg" />
              <p className="text-xl font-bold">0% EMI</p>
            </div>
  
            <div className="flex items-center gap-1">
              <MdSupportAgent className="text-blue-600 text-lg" />
              <p className="text-xl font-bold">24/7 Online Support</p>
            </div>
  
            <div className="flex items-center gap-2">
              <FaCreditCard className="text-orange-600 text-lg" />
              <p className="text-xl font-bold">No charge on card payment</p>
            </div>
  
            <div className="flex items-center gap-2">
              <TbTruckDelivery className="text-purple-600 text-lg" />
              <p className="text-xl font-bold">64 District Free Delivery</p>
            </div>
          </div>
        </div>
      </div>
    );
}