import { UserButton } from "@clerk/nextjs";

const DashboardHeader = () => {
  return (
    <div className="flex items-center justify-between p-5 shadow-sm border-b">
      <div>{/* Search */}</div>
      <div>
        <UserButton />
      </div>
    </div>
  );
};

export default DashboardHeader;
