import PlatformGroup from '../PlatformGroup';
import DesktopNav from './DesktopNav';
import HeaderDesktop from './HeaderDesktop';

export default function Header() {
    return <HeaderDesktop platformGroup={<PlatformGroup />} nav={<DesktopNav />} />;
}
