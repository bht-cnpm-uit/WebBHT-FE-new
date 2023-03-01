import FooterContact from './FooterContact';
import FooterDescription from './FooterDescription';
import FooterShortLink from './FooterShortLink';

export default function Footer() {
    return (
        <footer className="bg-bg-light py-10 px-p-body">
            <div className="mx-auto flex max-w-container flex-wrap md:flex-col xs:max-w-none">
                <FooterDescription />
                <div className="flex flex-1 justify-end md:flex-wrap md:justify-start xs:justify-center">
                    <FooterShortLink />
                    <FooterContact />
                    <FooterContact />
                </div>
            </div>
        </footer>
    );
}
