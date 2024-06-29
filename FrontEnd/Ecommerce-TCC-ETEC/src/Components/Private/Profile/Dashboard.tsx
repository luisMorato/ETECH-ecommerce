import { userProps } from "../../../interfaces/userProps";
import { completeOrderProps } from "../../../interfaces/OrderProps";

import DashboardUserContent from "./DashboardUserContent";
import DashboardAdminContent from "./DashboardAdminContent";

interface dashboardProps {
  user: userProps | undefined,
  order?: completeOrderProps
}

const Dashboard = ({ user, order }: dashboardProps) => {
  const date = new Date(Date.now());
  const correctedDate = date.toLocaleDateString().slice(0, 6) + (date.getFullYear() + 20);

  const currentUrl = new URL(window.location.toString());
  
  //Set some Option From the SideBar and keep it in the URL, 
  //to enable the User to see different contents in the profile page and persist the reloads
  const setOption = (option: string) => {
    currentUrl.searchParams.set('option', option);
    window.history.pushState(null, '', currentUrl);
    window.location.reload();
  }

  return (
    <div className="flex flex-col gap-5 flex-1 text-black py-5 max-w-[1280px]">
        <h1 
        className="relative text-3xl font-medium w-fit
        after:absolute
        after:top-full
        after:left-0
        after:bg-mainBlue
        after:h-0.5
        after:w-full"
        >Dashboard</h1>
        {user && user.role !== "ADMIN" ? (
          <DashboardUserContent
            user={user}
            order={order}
            setOption={setOption}
            correctedDate={correctedDate}
          />
        )
        :
        (
          <DashboardAdminContent 
            user={user}
            setOption={setOption}
          />
        )}
    </div>
  )
}

export default Dashboard;