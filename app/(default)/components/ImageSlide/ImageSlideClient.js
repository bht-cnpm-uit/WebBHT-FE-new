'use client';

export default function ImageSlideClient({ slideImages }) {
    return (
        <div className="relative z-[1] h-[420px] w-1/2">
            <div className="absolute top-1/2 h-[300px] w-[264px] -translate-y-1/2 translate-x-[230px] rotate-12 overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-bg opacity-60"></div>
                <img
                    src="https://plus.unsplash.com/premium_photo-1666900050405-c6b2d1cc94df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="absolute top-1/2 h-[356px] w-[314px] translate-x-[116px] -translate-y-1/2 rotate-6 overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-bg opacity-30"></div>

                <img
                    src="https://plus.unsplash.com/premium_photo-1666899830344-f7f226af458f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="absolute h-[420px] w-[370px] overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-bg opacity-0"></div>

                <img
                    src="https://plus.unsplash.com/premium_photo-1669833449026-124965aa4d26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                    className="h-full w-full object-cover"
                />
            </div>
        </div>
    );
}
