import { Job } from './job';
import { Profile } from './profile';
export type RecruitmentDetails = {
    id: string
    job_id: string
    profile_id: string
    created_at: Date
    updated_at: Date
    application_date: Date
    status: number
    viewed: boolean
    feedback: string
}

export type ApplicantResponse = {
    recruitmentDetailsResponse: RecruitmentDetails
    profileResponse: Profile
}