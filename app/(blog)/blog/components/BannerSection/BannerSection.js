export default function BannerSection() {
    return (
        <div className="flex flex-col items-center bg-gradient-to-r from-primary/30 to-primary-to/30 py-10 px-p-body">
            <h2 className="mb-4 text-center text-4xl font-bold leading-tight text-text-dark xs:text-3xl">Blogs</h2>
            <div className="max-w-[777px] text-center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercit
            </div>
            <div className="group relative mt-4 flex h-11 w-full max-w-[800px] items-center rounded-md bg-bg px-3">
                <div className="text-text">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                </div>
                <input type="text" className="h-full flex-1 rounded-md bg-bg px-3" placeholder="Tìm bài viết..." />
            </div>
        </div>
    );
}
