import React from 'react';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { tw, css } from 'xtwind';
import Wrapper from './Wrapper';
import { SmartLink, DocumentImage, findLink } from '@uniwebcms/module-sdk';

export default (props) => {
    const { properties, activeLang, makeLink, documents, documentId, main } = props;

    const { header = {}, body = {} } = main;

    const { title, subtitle, description } = header;
    const links = body.links || [];
    const image = body.imgs?.[0];
    const video = body.videos?.[0];

    const imgPosition = image?.imgPos || '';

    const { bgColor = 'white', fullWidth = false, borderColor = 'var(--secondary)', arrowColor = 'var(--secondary)', linkColor = 'var(--info)' } = properties;

    let imgStyle = '';
    let maxH = '';
    let textPadding = 'pl-8 pr-12';
    let layout = 'flex-row';

    textPadding = imgPosition === 'left' ? 'pl-12 pr-8' : textPadding;
    layout = imgPosition === 'left' ? 'flex-row-reverse' : 'flex-row';

    if (fullWidth) {
        maxH = css({ maxHeight: '250px' });

        imgStyle = `md:(absolute ${imgPosition === 'left' ? 'left-0' : 'right-0'} max-h-screen) w-full h-full`;
    }

    const sectionStyle = css({
        flex: '0 0 50%',
        maxWidth: '50%'
    });

    const figureStyle = tw`block object-cover w-full h-full object-center`;

    const borderStyle = css({
        borderLeft: '4px solid',
        borderColor
    });

    const arrowStyle = css({ color: arrowColor });

    return (
        <div className={tw`relative`} style={{ background: bgColor }}>
            <Wrapper className={tw`flex flex-col md:(${layout}) !px-0 md:!px-8 mb-6 md:(mb-12)`}>
                <header className={tw`w-full order-last md:(${sectionStyle} order-none)`}>
                    <div className={tw`py-12 md:py-24 px-8 md:(${textPadding})`}>
                        {title ? (
                            <h2
                                className={tw`pl-4 mb-2 md:mb-4 ${borderStyle} text-xl md:text-2xl lg:text-3xl font-bold capitalize`}
                                dangerouslySetInnerHTML={{
                                    __html: title
                                }}></h2>
                        ) : null}
                        {subtitle ? (
                            <h3
                                className={tw`mb-2 md:mb-4 text-lg md:text-xl lg:text-2xl font-semibold`}
                                dangerouslySetInnerHTML={{
                                    __html: subtitle
                                }}></h3>
                        ) : null}
                        {description ? (
                            <p
                                className={tw`mb-2 md:mb-4 text-base md:text-lg`}
                                dangerouslySetInnerHTML={{
                                    __html: description
                                }}></p>
                        ) : null}
                        {links.map((link, index) => {
                            const { label, href } = link;

                            const external = href.startsWith('https:') || href.startsWith('mailto:');

                            let to = external ? href : makeLink(findLink(href, documents, activeLang));

                            return (
                                <SmartLink key={index} className={tw`my-2 md:my-4 flex font-semibold items-center text-base md:text-lg hover:underline h-11`} to={to} external={external}>
                                    <span style={{ color: linkColor }}>{label}</span>
                                    <HiArrowNarrowRight className={tw`ml-3 w-6 h-6 ${arrowStyle}`}></HiArrowNarrowRight>
                                </SmartLink>
                            );
                        })}
                    </div>
                </header>
                {image ? (
                    <figure className={tw`w-full ${maxH} md:(${sectionStyle} !max-h-screen) ${imgStyle}`}>
                        <DocumentImage contentId={documentId} value={image.value} className={tw`${figureStyle}`} alt={image.alt} activeLang={activeLang}></DocumentImage>
                    </figure>
                ) : null}
                {video ? (
                    <iframe
                        className={tw`w-full min-h-[420px] md:(${sectionStyle} !max-h-screen) md:rounded-md`}
                        src={video.src}
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                        title={video.caption}
                    />
                ) : null}
            </Wrapper>
        </div>
    );
};
