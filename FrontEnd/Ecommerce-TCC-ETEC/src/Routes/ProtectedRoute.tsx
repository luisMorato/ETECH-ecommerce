import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { UseAuth } from "../Hooks/UseAuth";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { userToken: token } = useParams();
  const { user } = UseAuth();

  useEffect(() => {
    if(!user && !token){
      navigate('/', { replace: true });
    }
  }, [user, navigate, token]);

  return children;
}

export default ProtectedRoute;