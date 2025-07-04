import { useRoutes } from "react-router-dom";
import { routes } from "../../routes";

function AllRoutes() {
  return useRoutes(routes);
}

export default AllRoutes;