import { userProps } from "../../../interfaces/userProps";
import { completeOrderProps } from "../../../interfaces/OrderProps";

import DashboardUserContent from "./DashboardUserContent";
import DashboardAdminContent from "./DashboardAdminContent";

interface dashboardProps {
  user: userProps | undefined,
  userImage?: string,
  order?: completeOrderProps
}

const Dashboard = ({ user, userImage, order }: dashboardProps) => {
  const date = new Date(Date.now());
  const correctedDate = date.toLocaleDateString().slice(0, 6) + (date.getFullYear() + 20);

  const currentUrl = new URL(window.location.toString());
  
  const setOption = (option: string) => {
    currentUrl.searchParams.set('option', option);
    window.history.pushState(null, '', currentUrl);
    window.location.reload();
  }

  return (
    <div className="flex flex-col gap-5 flex-1 text-black py-5">
        <h1 className="text-3xl font-medium">Dashboard</h1>
        {user && user.role !== "ADMIN" ? (
          <DashboardUserContent 
            user={user}
            userImage={userImage}
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
            userImage={userImage}
          />
        )}
    </div>
  )
}

export default Dashboard;