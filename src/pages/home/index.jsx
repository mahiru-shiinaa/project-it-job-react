import CompanyList from "../../components/CompanyList";
import JobList from "../../components/JobList";
import SearchForm from "../../components/SearchForm";
import SkillList from "../../components/SkillList";
import { useTitle } from "../../hooks/useTitle";

function Home() {
    useTitle("Trang chủ / IT Job");
    return (
        <>
            <SearchForm />
            <SkillList />
            <JobList />
            <CompanyList />
        </>
    );
}

export default Home;