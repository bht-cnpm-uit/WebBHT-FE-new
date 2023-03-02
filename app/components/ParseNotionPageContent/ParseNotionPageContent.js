import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import Link from 'next/link';

function ParseNotionParagraphBlock({ children }) {
    const richtextObjs = children?.paragraph?.rich_text;
    const htmls = richtextObjs?.map((richtextObj, index) => {
        if (!richtextObj?.href) {
            return (
                <span
                    key={index}
                    className={clsx({
                        'font-semibold': richtextObj?.annotations?.bold,
                        italic: richtextObj?.annotations?.italic,
                        underline: richtextObj?.annotations?.underline,
                    })}
                >
                    {richtextObj?.text?.content}
                </span>
            );
        } else {
            return (
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    key={index}
                    href={richtextObj?.href}
                    className="font-medium underline decoration-primary decoration-1 underline-offset-4 can-hover:hover:decoration-2"
                >
                    {richtextObj?.text?.content}
                </a>
            );
        }
    });
    return <div>{htmls}</div>;
}

function ParseNotionBulletBlock({ children }) {
    const richtextObjs = children?.bulleted_list_item?.rich_text;
    const richtextHtml = richtextObjs?.map((richtextObj, index) => {
        if (!richtextObj?.href) {
            return (
                <span
                    key={index}
                    className={clsx({
                        'font-semibold': richtextObj?.annotations?.bold,
                        italic: richtextObj?.annotations?.italic,
                        underline: richtextObj?.annotations?.underline,
                    })}
                >
                    {richtextObj?.text?.content}
                </span>
            );
        } else {
            return (
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    key={index}
                    href={richtextObj?.href}
                    className="font-medium underline decoration-primary decoration-1 underline-offset-4 can-hover:hover:decoration-2"
                >
                    {richtextObj?.text?.content}
                </a>
            );
        }
    });
    return (
        <div className="flex">
            <div className="ml-2 flex h-6 w-6 items-center justify-center pt-1">
                <FontAwesomeIcon className="h-1.5 w-1.5" icon={faCircle} />
            </div>
            <div className="flex-1">{richtextHtml}</div>
        </div>
    );
}

function ParseNotionPageContent({ children }) {
    return (
        <div>
            {children?.map((notionObj, index) => {
                if (notionObj?.type === 'bulleted_list_item') {
                    return <ParseNotionBulletBlock key={index}>{notionObj}</ParseNotionBulletBlock>;
                } else {
                    return <ParseNotionParagraphBlock key={index}>{notionObj}</ParseNotionParagraphBlock>;
                }
            })}
        </div>
    );
}

export default ParseNotionPageContent;
