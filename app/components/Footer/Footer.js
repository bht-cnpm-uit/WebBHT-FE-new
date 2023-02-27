import FooterContact from './FooterContact';
import FooterDescription from './FooterDescription';
import FooterShortLink from './FooterShortLink';

export default function Footer() {
    return (
        <footer className="bg-bg-light py-10 px-p-body">
            <div className="mx-auto flex max-w-container md:flex-col xs:max-w-none">
                <FooterDescription />
                <div className="flex shrink-0 grow justify-around space-x-5 md:justify-center xs:flex-col xs:items-center xs:space-y-8 xs:space-x-0 ">
                    <FooterShortLink />
                    <FooterContact />
                </div>
            </div>
        </footer>
    );
}
