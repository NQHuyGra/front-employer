import { useQuery } from "@tanstack/react-query"
import { Company } from "../../../../shared/types/company"
import HasCompany from "./HasCompany"
import NotHasCompany from "./NotHasCompany"
import { fetchCompany } from "../../../../shared/apis/companyApi"
import { ApiResponse } from "../../../../shared/types/apiResponse"

export default function CompanyBody() {

    // const { data, isLoading, isError } = useQuery<ApiResponse<Company>>({
    //     queryKey: ['my-company'],
    //     queryFn: fetchCompany
    // })

    const data = {
        data: COMPANY
    }

    // if(isLoading) return <div>Loading...</div>

    // if(isError || !data?.data) return <NotHasCompany/>
    return <NotHasCompany/>

    // return <HasCompany company={data.data} />
}

const COMPANY : Company = {
    name: "Hello Asia Travel",
    tax_code: "0110163039",
    fields: [
        31
    ],
    fields_str: ["Du l\u1ecbch"],
    address: "T\u00f2a nh\u00e0 Tr\u1ea7n Ph\u00fa, s\u1ed1 6 D\u01b0\u01a1ng \u0110\u00ecnh Ngh\u1ec7, Y\u00ean H\u00f2a, C\u1ea7u Gi\u1ea5y, H\u00e0 N\u1ed9i",
    phone: "0949085650",
    email: "phuonganh090301@gmail.com",
    website: null,
    size: "100-499",
    description: "<p>At Vietnamtour.in, we take pride in being one of Vietnam\u2019s top travel agencies, specializing in creating premium, tailor-made travel experiences for clients from India, South Africa, and other English-speaking markets. Our mission is to deliver extraordinary vacations, turning ordinary trips into lifelong memories by connecting travelers to vibrant new cultures.<\/p><p>If you are passionate about travel, dedicated to delivering excellent customer service, and eager to help travelers explore the wonders of Asia, we invite you to join our team as a Travel Sales Specialist and embark on this exciting adventure with us!<\/p>",
    logo_url: 'https://i.pinimg.com/originals/94/ea/c8/94eac835763ea2c2b63c069cedbed22f.gif',
    company_info_request: {
        status: 'PENDING',
        time: "23:27 25\/09\/2024",
        data: {
            name: "Hello Asia Travel",
            tax_code: "0110163039",
            fields: [
                31
            ],
            fields_str: ["Du l\u1ecbch"],
            address: "T\u00f2a nh\u00e0 Tr\u1ea7n Ph\u00fa, s\u1ed1 6 D\u01b0\u01a1ng \u0110\u00ecnh Ngh\u1ec7, Y\u00ean H\u00f2a, C\u1ea7u Gi\u1ea5y, H\u00e0 N\u1ed9i",
            phone: "0949085650",
            email: "phuonganh090301@gmail.com",
            website: "",
            size: "100-499",
            description: "<p>At Vietnamtour.in, we take pride in being one of Vietnam\u2019s top travel agencies, specializing in creating premium, tailor-made travel experiences for clients from India, South Africa, and other English-speaking markets. Our mission is to deliver extraordinary vacations, turning ordinary trips into lifelong memories by connecting travelers to vibrant new cultures.<\/p><p>If you are passionate about travel, dedicated to delivering excellent customer service, and eager to help travelers explore the wonders of Asia, we invite you to join our team as a Travel Sales Specialist and embark on this exciting adventure with us!<\/p>",
            logo_url: 'https://i.pinimg.com/originals/94/ea/c8/94eac835763ea2c2b63c069cedbed22f.gif',
            business_type: 2
        }
    },
    business_type: 1
}