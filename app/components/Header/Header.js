import PlatformGroup from '../PlatformGroup';
import DesktopNav from './DesktopNav';
import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';
import MobileNav from './MobileNav';

export default function Header() {
    return (
        <>
            <DesktopHeader platformGroup={<PlatformGroup />} nav={<DesktopNav />} />
            <MobileHeader platformGroup={<PlatformGroup />} nav={<MobileNav />} />
        </>
    );
}
