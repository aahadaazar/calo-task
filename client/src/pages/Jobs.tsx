import { useQuery } from "react-query";
import JobList from "../components/JobList";
import { getAllJobs } from "../utils/queryClient";
import Loader from "../components/Loader";

function Jobs() {
  const { data: jobs, isLoading } = useQuery("allJobs", getAllJobs);

  if (isLoading) {
    return <Loader />;
  }

  return <JobList jobs={jobs} />;
}

export default Jobs;
