export type Job = {
    id: string;
    title: string;
    description: string;
    benefit: string;
    location: string[];
    location_details: string;
    salary: number;
    deadline: Date;
    exp: number;
    form_of_work: number;
    gender: number;
    job_field: number;
    number_of_recruits: number;
    rank: number;
    requirement: string;
	enable?: boolean;
    created_at?: Date;
    updated_at?: Date;
    number_of_applicants?: number
}