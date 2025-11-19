import useAuth from "./Components/Context/AuthContext";
import { useNavigate } from "react-router-dom";
export default function Protected({
  children,
}: {
  children: React.ReactNode;
}) {
  const { CurrentUser } = useAuth();
  const navigate = useNavigate();

  if (!CurrentUser) {
    // 
    navigate("/");
  }
  

  return children;
}