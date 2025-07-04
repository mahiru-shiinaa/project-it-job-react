import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function Goback() {
    const navigate = useNavigate();
    return (
        <>
            <Button onClick={() => navigate(-1)}>Go Back</Button>
        </>
    );
}

export default Goback;