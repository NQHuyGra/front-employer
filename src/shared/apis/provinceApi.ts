import axios from "axios"

export const fetchProvinces = async () => {
    const { data } = await axios.get('https://provinces.open-api.vn/api/p/')
    return data
}

export const fetchDistricts = async (provinceCode: string) => {
    const { data } = await axios.get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`)
    return data.districts
}

export const fetchWards = async (districtCode: string) => {
    const { data } = await axios.get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
    return data.wards
}