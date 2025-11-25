import useUser from "./hooks/useUser";
import { useNavigate } from "react-router-dom";
export default function Protected({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentLoggedInUserData} =useUser();
  const navigate = useNavigate();

  if (!currentLoggedInUserData) {
    // 
    navigate("/");
  }
  

  return children;
}