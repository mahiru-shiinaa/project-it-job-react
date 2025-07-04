import CompanyList from "../../components/CompanyList";
import JobList from "../../components/JobList";
import SearchForm from "../../components/SearchForm";
import SkillList from "../../components/SkillList";

function Home() {
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