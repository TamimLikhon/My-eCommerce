import { FaRegMoneyBillAlt } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import { FaCreditCard } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
export default function SecondHeader() {
  return (
      <div className="w-full bg-slate-300 py-2">
          <div className="container mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
                  <div className="flex items-center gap-2 justify-center">
                      <FaRegMoneyBillAlt className="text-green-600 text-lg" />
                      <p className="text-sm sm:text-base lg:text-xl font-bold">0% EMI</p>
                  </div>

                  <div className="flex items-center gap-1 justify-center">
                      <MdSupportAgent className="text-blue-600 text-lg" />
                      <p className="text-sm sm:text-base lg:text-xl font-bold">24/7 Online Support</p>
                  </div>

                  <div className="flex items-center gap-2 justify-center">
                      <FaCreditCard className="text-orange-600 text-lg" />
                      <p className="text-sm sm:text-base lg:text-xl font-bold">No card charge</p>
                  </div>

                  <div className="flex items-center gap-2 justify-center">
                      <TbTruckDelivery className="text-purple-600 text-lg" />
                      <p className="text-sm sm:text-base lg:text-xl font-bold">Free Delivery</p>
                  </div>
              </div>
          </div>
      </div>
  );
}