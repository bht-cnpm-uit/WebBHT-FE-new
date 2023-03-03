'use client';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronCircleRight,
    faChevronRight,
    faFile,
    faFileImage,
    faFolder,
    faImage,
    faCopy,
} from '@fortawesome/free-solid-svg-icons';

import docData from '~/data/document.json';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import findByPath from '~/utils/findByPath';
import findByKeyWord from '~/utils/findByKeyword';
import Button from '~/app/components/Button';

const ICONS = {
    folder: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6 text-yellow-400"
        >
            <path d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-15a3 3 0 00-3 3V18a3 3 0 003 3h15zM1.5 10.146V6a3 3 0 013-3h5.379a2.25 2.25 0 011.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 013 3v1.146A4.483 4.483 0 0019.5 9h-15a4.483 4.483 0 00-3 1.146z" />
        </svg>
    ),
    'image/jpeg': (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6 text-purple-400"
        >
            <path
                fillRule="evenodd"
                d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                clipRule="evenodd"
            />
        </svg>
    ),
    'image/png': (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6 text-purple-400"
        >
            <path
                fillRule="evenodd"
                d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                clipRule="evenodd"
            />
        </svg>
    ),
    'image/gif': (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6 text-purple-400"
        >
            <path
                fillRule="evenodd"
                d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                clipRule="evenodd"
            />
        </svg>
    ),
    file: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6 text-blue-400"
        >
            <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" />
            <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
        </svg>
    ),
};

export default function Document() {
    const router = useRouter();
    const pathName = usePathname();
    const path = pathName.split('/').slice(2);

    const [foundData, setFoundData] = useState([]);
    const [breadcrumb, setBreadCrumb] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState({ file: [], folder: [] });
    const [mounted, setMouted] = useState(false);

    useEffect(() => {
        setMouted(true);
    }, []);
    useEffect(() => {
        const result = findByPath(docData, path ? ['', ...path] : ['']);
        if (result?.item && result?.item.type === 'folder') {
            if (result?.item.children) {
                setFoundData(result?.item.children);
                setBreadCrumb(result?.path);
            } else {
                setFoundData([]);
                setBreadCrumb([]);
            }
        } else {
            setFoundData([]);
            setBreadCrumb([]);
        }
    }, [pathName]);

    useEffect(() => {
        if (search) {
            const result = findByKeyWord(docData, search);
            const searchResultFile = result?.filter((elem) => elem?.item?.type !== 'folder');
            const searchResultFolder = result?.filter((elem) => elem?.item?.type === 'folder');
            setSearchResult({ file: searchResultFile, folder: searchResultFolder });
            console.log({ file: searchResultFile, folder: searchResultFolder });
        }
    }, [search]);

    function handleItemClick(item) {
        if (item.type === 'folder') {
            if (!path) {
                router.push('document/' + item.path);
            } else {
                router.push('document/' + path.join('/') + '/' + item.path);
            }
        } else {
            if (item.link) {
                window.open(item.link);
            }
        }
    }

    function copyLink(item) {
        if (item.type === 'folder') {
            const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';

            const URL = `${origin}${pathName}/${item.path}`;
            navigator.clipboard.writeText(URL);
        } else if (item.link) {
            // copy
            navigator.clipboard.writeText(item.link);
        }
    }

    return (
        <>
            {/* BANNER */}
            <div className="flex h-[200px] flex-col items-center justify-center bg-primary px-p-body">
                <h2 className="mb-4 px-6 text-center text-xl font-semibold text-white">TÀI LIỆU HỌC TẬP</h2>
                <div className="group relative flex h-9 w-full max-w-[800px] items-center rounded-md bg-white px-3 ring-white ring-opacity-50 focus-within:ring-1">
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

                    <input
                        type="text"
                        className="h-full flex-1 rounded-md px-3 "
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Tìm theo mã môn, tên môn,..."
                    />

                    {search && (
                        <div className="absolute top-full left-0 right-0 hidden max-h-[400px] min-h-[300px] overflow-auto rounded-md border bg-white p-3 shadow-md group-focus-within:block">
                            <div className="mb-2">
                                <div className="mb-1 font-semibold">File:</div>
                                <div className="space-y-2">
                                    {!searchResult?.file?.length ? (
                                        <div className="pl-3">Không tìm thấy file</div>
                                    ) : (
                                        searchResult?.file?.slice(0, 10)?.map((searchResult, index) => (
                                            <a
                                                key={index}
                                                href={searchResult?.item?.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex cursor-pointer items-center rounded border p-3 hover:bg-bg-light"
                                            >
                                                <div className="pr-3 text-center">
                                                    {ICONS[searchResult?.item?.type]}
                                                </div>
                                                <div className="pr-4">{searchResult?.item?.name}</div>
                                                <div className="flex-1 overflow-hidden whitespace-nowrap text-right text-sm text-text">
                                                    {searchResult?.path?.map((elem) => elem.name)?.join('/')}
                                                </div>
                                            </a>
                                        ))
                                    )}
                                </div>
                            </div>
                            <div>
                                <div className="mb-1 font-semibold">Thư mục:</div>
                                <div>
                                    {!searchResult?.folder?.slice(0, 10)?.length ? (
                                        <div className="pl-3">Không tìm thấy thư mục</div>
                                    ) : (
                                        searchResult?.folder?.map((searchResult, index) => (
                                            <Link
                                                key={index}
                                                href={
                                                    '/document' +
                                                    searchResult?.path?.[searchResult?.path?.length - 1]?.path
                                                }
                                                rel="noopener noreferrer"
                                                className="flex cursor-pointer items-center rounded border p-3 hover:bg-bg-light"
                                            >
                                                <div className="pr-3 text-center">
                                                    {ICONS[searchResult?.item?.type]}
                                                </div>
                                                <div className="pr-4">{searchResult?.item?.name}</div>
                                                <div className="flex-1 overflow-hidden whitespace-nowrap text-right text-sm text-text">
                                                    {searchResult?.path?.map((elem) => elem.name)?.join('/')}
                                                </div>
                                            </Link>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Breadcrumb */}
            <div className="flex flex-wrap py-4 px-p-body ">
                {breadcrumb?.map((item, index) =>
                    index !== breadcrumb.length - 1 ? (
                        <div key={index} className="flex items-center">
                            <Link
                                href={'/document' + item.path}
                                className="mx-1 rounded py-1 px-2 text-lg hover:bg-bg-light sm:text-base"
                            >
                                {item.name}
                            </Link>
                            <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
                        </div>
                    ) : (
                        <div key={index} className="flex items-center">
                            <button className="pointer-events-none mx-1 rounded py-1 px-2 text-lg font-medium hover:bg-bg-light sm:text-base">
                                {item.name}
                            </button>
                        </div>
                    )
                )}
            </div>

            {/* TABLE */}
            <div className="min-h-[250px] p-p-body ">
                <table className="mx-auto w-full max-w-container">
                    <thead className="">
                        <tr className="border-b dark:border-gray-600">
                            <th className="w-16 p-3 text-center font-medium">Loại</th>
                            <th className="p-3 text-left font-medium">Tên</th>
                            <th className="p-3 text-right font-medium">Tuỳ chọn</th>
                        </tr>
                    </thead>

                    <tbody>
                        {foundData.length === 0 && mounted ? (
                            <tr>
                                <td colSpan={3} className="text-center">
                                    <div className="my-3 font-semibold">Thư mục trống</div>
                                    <div className="flex justify-center">
                                        <Button
                                            outline
                                            onClick={() => {
                                                router.back();
                                            }}
                                        >
                                            Quay lại
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            foundData.map((item, index) => (
                                <tr
                                    key={index}
                                    className="cursor-pointer border-b hover:bg-bg-light dark:border-gray-600"
                                    onClick={() => handleItemClick(item)}
                                >
                                    <td className="p-3 text-center">
                                        <div className="flex justify-center">{ICONS[item.type] || ICONS.file}</div>
                                    </td>
                                    <td className="p-3">{item.name}</td>
                                    <td className="p-3">
                                        <div className="flex justify-end">
                                            <button
                                                className="hover:opacity-70"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    copyLink(item);
                                                }}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className="h-6 w-6"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z"
                                                        clipRule="evenodd"
                                                    />
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
