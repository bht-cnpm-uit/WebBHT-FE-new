import ActivitySection from './components/ActivitySection';
import BannerSection from './components/BannerSection';
import FollowSection from './components/FollowSection';
import MemberSection from './components/MemberSection';
import StatisticSection from './components/StatisticSection';

export default function About() {
    return (
        <>
            <BannerSection />
            <StatisticSection />
            <FollowSection />
            <ActivitySection />
            {/* <MemberSection /> */}
        </>
    );
}
