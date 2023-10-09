import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";

export const dashboardSidebarItems = [
  {
    id: 1,
    title: "Dashboard",
    path: "/dashboard",
    icon: RxDashboard,
  },
  {
    id: 2,
    title: "All Orders",
    path: "/dashboard-orders",
    icon: FiShoppingBag,
  },
  {
    id: 3,
    title: "All Products",
    path: "/dashboard-products",
    icon: FiPackage,
  },
  {
    id: 4,
    title: "Create Product",
    path: "/dashboard-create-product",
    icon: AiOutlineFolderAdd,
  },
  {
    id: 5,
    title: "All Events",
    path: "/dashboard-events",
    icon: MdOutlineLocalOffer,
  },
  {
    id: 6,
    title: "Create Event",
    path: "/dashboard-create-event",
    icon: VscNewFile,
  },
  {
    id: 7,
    title: "Withdraw Money",
    path: "/dashboard-withdraw-money",
    icon: CiMoneyBill,
  },
  {
    id: 8,
    title: "Shop Inbox",
    path: "/dashboard-messages",
    icon: BiMessageSquareDetail,
  },
  {
    id: 9,
    title: "Discount Codes",
    path: "/dashboard-coupouns",
    icon: AiOutlineGift,
  },
  {
    id: 10,
    title: "Refunds",
    path: "/dashboard-refunds",
    icon: HiOutlineReceiptRefund,
  },
  {
    id: 11,
    title: "Settings",
    path: "/settings",
    icon: CiSettings,
  },
];
