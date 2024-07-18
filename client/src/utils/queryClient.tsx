import axios, { AxiosError } from "axios";
import { JobCreateType, JobType } from "./types";

axios.defaults.baseURL = "http://localhost:3001";

export function getAllJobs(): Promise<JobType[] | AxiosError> {
  return axios
    .get<JobType[]>("/jobs")
    .then((result) => result.data)
    .catch((err: AxiosError) => err);
}

export function createJob(job: JobCreateType): Promise<JobType[] | AxiosError> {
  return axios
    .post<JobType[]>("/jobs", job) // Pass job as the request body
    .then((result) => result.data)
    .catch((err: AxiosError) => err);
}

export function getJobById({
  queryKey,
}: {
  queryKey: [string, string];
}): Promise<JobType> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, jobId] = queryKey;
  return axios
    .get<JobType>(`/jobs/${jobId}`)
    .then((result) => result.data)
    .catch((err) => {
      throw new Error(err.response?.data || err.message);
    });
}
