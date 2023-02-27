'use client';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

function PageLoader({ loading }) {
    return (
        <div className="fixed top-0 right-0 left-0 z-loader">
            <div
                className={clsx('loading-bar h-0.5 bg-primary opacity-0 sm:h-1', {
                    loading: loading,
                    loaded: !loading,
                })}
            ></div>
        </div>
    );
}

export default PageLoader;
