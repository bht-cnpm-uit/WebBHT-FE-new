import clsx from 'clsx';
import SyntaxHighlighter from './HighLightCode';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

function ParseRichTextObject({ children }) {
    if (!children?.href) {
        return (
            <span
                className={clsx({
                    'font-semibold': children?.annotations?.bold,
                    italic: children?.annotations?.italic,
                    underline: children?.annotations?.underline,
                    'mx-0.5 rounded-sm bg-gray-200 py-0.5 px-1 font-mono text-base text-primary dark:bg-gray-800':
                        children?.annotations?.code,
                })}
                dangerouslySetInnerHTML={{ __html: children?.text?.content }}
            ></span>
        );
    } else {
        return (
            <a
                target="_blank"
                rel="noopener noreferrer"
                href={children?.href}
                className="font-medium underline decoration-primary decoration-1 underline-offset-4 can-hover:hover:decoration-2"
            >
                {children?.text?.content}
            </a>
        );
    }
}

function ParseRichTextList({ children }) {
    return children?.map((richTextObject, index) => (
        <ParseRichTextObject key={index}>{richTextObject}</ParseRichTextObject>
    ));
}

function ParseNotionParagraphBlock({ children }) {
    return (
        <div className="my-3">
            <ParseRichTextList>{children?.paragraph?.rich_text}</ParseRichTextList>
        </div>
    );
}
function ParseNotionHeading2Block({ children }) {
    return (
        <div className="my-4 text-2xl text-text-dark">
            <ParseRichTextList>{children?.heading_2?.rich_text}</ParseRichTextList>
        </div>
    );
}
function ParseNotionHeading3Block({ children }) {
    return (
        <div className="my-4 text-xl text-text-semidark">
            <ParseRichTextList>{children?.heading_3?.rich_text}</ParseRichTextList>
        </div>
    );
}
function ParseNotionQuoteBlock({ children }) {
    return (
        <div className="my-4 border-l-[3px] border-primary pl-3">
            <ParseRichTextList>{children?.quote?.rich_text}</ParseRichTextList>
        </div>
    );
}

function ParseNotionBulletBlock({ children }) {
    return (
        <div className="my-2 flex pl-5">
            <div className="mr-3">•</div>
            <div>
                <ParseRichTextList>{children?.bulleted_list_item?.rich_text}</ParseRichTextList>
            </div>
        </div>
    );
}
function ParseNotionImageBlock({ children }) {
    return (
        <div className="my-5">
            <img src={children?.image?.file?.url} className="mx-auto max-h-[500px]" />
            <div className="mt-2 text-center italic">{children?.image?.caption?.[0]?.plain_text}</div>
        </div>
    );
}
function ParseNotionCodeBlock({ children }) {
    return (
        <div className="my-3 text-base">
            <SyntaxHighlighter language={children?.code?.language} showLineNumbers wrapLongLines style={dracula}>
                {children?.code?.rich_text?.[0]?.text?.content}
            </SyntaxHighlighter>
        </div>
    );
}

function ParseNotionDividerBlock() {
    return <hr className="my-3 dark:border-gray-800" />;
}

function ParseNotionPageContent({ children }) {
    return (
        <div className="counter-reset">
            {children?.map((notionObj, index) => {
                switch (notionObj?.type) {
                    case 'bulleted_list_item':
                        return <ParseNotionBulletBlock key={index}>{notionObj}</ParseNotionBulletBlock>;
                    case 'heading_2':
                        return <ParseNotionHeading2Block key={index}>{notionObj}</ParseNotionHeading2Block>;
                    case 'heading_3':
                        return <ParseNotionHeading3Block key={index}>{notionObj}</ParseNotionHeading3Block>;
                    case 'quote':
                        return <ParseNotionQuoteBlock key={index}>{notionObj}</ParseNotionQuoteBlock>;
                    case 'image':
                        return <ParseNotionImageBlock key={index}>{notionObj}</ParseNotionImageBlock>;
                    case 'code':
                        return <ParseNotionCodeBlock key={index}>{notionObj}</ParseNotionCodeBlock>;
                    case 'divider':
                        return <ParseNotionDividerBlock key={index} />;
                    default:
                        return <ParseNotionParagraphBlock key={index}>{notionObj}</ParseNotionParagraphBlock>;
                }
            })}
        </div>
    );
}

export default ParseNotionPageContent;
