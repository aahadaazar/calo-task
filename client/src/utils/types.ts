import { AxiosError } from "axios";

export type JobType =  {
    uuid: string;
  title: string;
  description: string;
  timestamp: string;
  id: number;
  imgSrc: string;
  }

  export type JobCreateType =  {
  title: string;
  description: string;
  }


export type JobListProps = {
    jobs: JobType[] | AxiosError<unknown, unknown> | undefined;
  };
  