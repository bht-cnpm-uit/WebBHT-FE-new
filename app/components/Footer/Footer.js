import FooterClient from './FooterClient';
import FooterContact from './FooterContact';
import FooterDescription from './FooterDescription';
import FooterShortLink from './FooterShortLink';

export default function Footer() {
    return (
        <FooterClient
            footerContact={<FooterContact />}
            footerDescription={<FooterDescription />}
            footerShortLink={<FooterShortLink />}
        />
    );
}
