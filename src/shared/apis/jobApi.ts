import { ApiResponse, Meta } from "../types/apiResponse";
import { Job } from "../types/job";
import http from "../utils/http";

export const addJob = async (job: Job) => {
    const { data } = await http.post<ApiResponse<Job>>("/job/create", job);
    return data;
}

export const updateJob = async (job: Job) => {
    const { data } = await http.put<ApiResponse<Job>>(`/job/update/${job.id}`, job);
    return data;
}

export const deleteJob = async (id: string) => {
    const { data } = await http.delete<ApiResponse<boolean>>(`/job/delete/${id}`);
    return data;
}

export const toggleEnableJob = async (id: string) => {
    const { data } = await http.put<ApiResponse<Job>>(`/job/enable/${id}`);
    return data;
}

export const getJobById = async (id: string) => {
    const { data } = await http.get<ApiResponse<Job>>(`/job/without-company/${id}`);   
    return data;
}

export const getJobs = async (
    { queryKey } : {
        queryKey: 
        [
            string,
            {
                page: number,
                size: number,
                sortBy: string,
                direction: string
            }
        ]
    }
) => {
    const [, params] = queryKey
    const { data } = await http.get<ApiResponse<Meta & {
        jobs: Job[]
    }>>(`/job/my-jobs`, { params });
    return data;
}

