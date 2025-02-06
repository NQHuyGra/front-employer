import http from "../utils/http"

export const fetchCompanyById = async (id: string) => {
    const { data } = await http.get(`/company/${id}`)
    return data
}

export const fetchCompany = async () => {
    const { data } = await http.get("/company/my-company")
    return data
}

export const fetchCompanyList = async (currentPage: number, pageSize: number) => {
    const { data } = await http.get('/company/list', {
        params: {
            page: currentPage,
            size: pageSize
        }
    })
    return data
}