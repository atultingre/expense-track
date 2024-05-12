"use client";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from "lucide-react";

const SideNav = () => {
  const path = usePathname();

  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Budgets",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    {
      id: 3,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses",
    },
    {
      id: 4,
      name: "Upgrade",
      icon: ShieldCheck,
      path: "/dashboard/upgrade",
    },
  ];
  return (
    <div className="h-screen p-5 border shadow-sm">
      <Image
        className="pb-5 mx-auto"
        src={"/logo.png"}
        width={50}
        height={50}
        alt="logo"
      />
      <div>
        {menuList.map((menu, index) => (
          <Link href={menu.path} key={menu.id}>
            <h2
              className={`flex gap-2 items-center text-gray-500 font-medium p-5 cursor-pointer rounded-md hover:text-primary my-2 hover:bg-blue-100 ${
                path === menu.path && "text-primary bg-blue-100"
              }`}
            >
              <menu.icon />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
      <div className="fixed bottom-10 flex items-center gap-2">
        <UserButton />
        Profile
      </div>
    </div>
  );
};

export default SideNav;
