import { useTitle } from "../../hooks/useTitle";
import CVList from "./CVList";


function CVManage() {
    useTitle("Quản lý CV / IT Job");

    return (
        <>
            <h1>Danh sách CV</h1>
            <CVList className="mt-20" />
        </>
    );
}

export default CVManage;