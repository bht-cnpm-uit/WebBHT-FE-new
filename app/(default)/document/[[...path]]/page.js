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
    folder: <FontAwesomeIcon icon={faFolder} className="text-xl text-yellow-400" />,
    file: <FontAwesomeIcon icon={faFile} className="text-xl text-blue-500" />,
    image: <FontAwesomeIcon icon={faImage} className="text-xl text-purple-500" />,
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
                                                className="flex cursor-pointer items-center rounded border p-3 hover:bg-gray-50"
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
                                                className="flex cursor-pointer items-center rounded border p-3 hover:bg-gray-50"
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
                                className="mx-1 rounded py-1 px-2 text-lg hover:bg-gray-100 sm:text-base"
                            >
                                {item.name}
                            </Link>
                            <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
                        </div>
                    ) : (
                        <div key={index} className="flex items-center">
                            <button className="pointer-events-none mx-1 rounded py-1 px-2 text-lg font-medium hover:bg-gray-100 sm:text-base">
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
                        <tr className="border-b">
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
                                    className="cursor-pointer border-b hover:bg-gray-50"
                                    onClick={() => handleItemClick(item)}
                                >
                                    <td className="p-3 text-center">{ICONS[item.type]}</td>
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
                                                <FontAwesomeIcon icon={faCopy} className="" />
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
