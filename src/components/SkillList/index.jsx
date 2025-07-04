import { useEffect, useState } from "react";
import { getListTag } from "../../services/tagServices";
import { Link } from "react-router-dom";
import { Tag } from "antd";

function SkillList() {
    const [tags, setTags] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const result = await getListTag();
            if (result) {
                setTags(result);
            }
        }
        fetchApi();
    },[])
    return (
        <>
            {tags && (
                <div className="mb-20">
                    {tags.map((item, index) => (
                       <Link key={index} to={`/search?keyword=${item.value || ""}`} className="skill">
                        <Tag color="blue" className="mb-5">{item.value}</Tag>
                       </Link>
                        
                        
                    ))}
                </div>
            )}
        </>
    );
}

export default SkillList;