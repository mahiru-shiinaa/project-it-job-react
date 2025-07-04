import { useEffect } from "react";
import "./App.css";
import AllRoutes from "./components/AllRoutes";
import { useDispatch } from "react-redux";
import { fetchUser } from "./redux/actions/auth.action";
//import '@ant-design/v5-patch-for-react-19';

function App() {
  const dispatch = useDispatch();
   useEffect(() => {
    dispatch(fetchUser()); // gọi 1 lần khi load trang
  }, [dispatch]);

  return (
    <>
      <AllRoutes />
    </>
  );
}

export default App;
