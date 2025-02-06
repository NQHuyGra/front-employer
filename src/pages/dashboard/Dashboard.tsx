import ProposeStatistic from "./components/ProposeStatistic";
import RecruitmentStatistic from "./components/RecruitmentStatistic";
import ServiceStatistic from "./components/ServiceStatistic";

export default function Dashboard() {


    return (
        <div className="flex flex-1 flex-col lg:flex-row gap-4 m-4">
            <RecruitmentStatistic/>
            <div className="flex flex-wrap min-w-80 gap-4 h-full">
                <ProposeStatistic/>
                <ServiceStatistic/>
            </div>
        </div>
    )
}