import React from 'react';
import { HiArrowNarrowRight } from 'react-icons/hi';
import Wrapper from './Wrapper';
import { SmartLink, DocumentImage, findLink } from '@uniwebcms/module-sdk';

const applyBPToCn = (bp, className) => {
    return className
        .split(' ')
        .map((cn) => `${bp}:${cn}`)
        .join(' ');
};

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
        maxH = `max-h-[${maxHeight}]`;

        imgStyle = `md:absolute md:${imgPosition === 'left' ? 'left-0' : 'right-0'} md:max-h-screen w-full h-full`;
    }

    const figureStyle = `block object-cover w-full h-full object-center`;

    return (
        <div className='relative' style={{ background: bgColor }}>
            <Wrapper className={`flex flex-col ${applyBPToCn('md', layout)} !px-0 md:!px-8 mb-6 md:mb-12`}>
                <header className='w-full order-last md:flex-[0_0_50%] md:max-w-[50%] md:order-none'>
                    <div className={`py-12 md:py-24 px-8 ${applyBPToCn('md', textPadding)}`}>
                        {title ? (
                            <h2
                                className='pl-4 mb-2 md:mb-4 text-xl md:text-2xl lg:text-3xl font-bold capitalize'
                                dangerouslySetInnerHTML={{
                                    __html: title
                                }}
                                style={{
                                    borderLeft: '4px solid',
                                    borderColor
                                }}></h2>
                        ) : null}
                        {subtitle ? (
                            <h3
                                className='mb-2 md:mb-4 text-lg md:text-xl lg:text-2xl font-semibold'
                                dangerouslySetInnerHTML={{
                                    __html: subtitle
                                }}></h3>
                        ) : null}
                        {description ? (
                            <p
                                className='mb-2 md:mb-4 text-base md:text-lg'
                                dangerouslySetInnerHTML={{
                                    __html: description
                                }}></p>
                        ) : null}
                        {links.map((link, index) => {
                            const { label, href } = link;

                            const external = href.startsWith('https:') || href.startsWith('mailto:');

                            let to = external ? href : makeLink(findLink(href, documents, activeLang));

                            return (
                                <SmartLink key={index} className='my-2 md:my-4 flex font-semibold items-center text-base md:text-lg hover:underline h-11' to={to} external={external}>
                                    <span style={{ color: linkColor }}>{label}</span>
                                    <HiArrowNarrowRight className='ml-3 w-6 h-6' style={{ color: arrowColor }}></HiArrowNarrowRight>
                                </SmartLink>
                            );
                        })}
                    </div>
                </header>
                {image ? (
                    <figure className={`w-full ${maxH} md:flex-[0_0_50%] md:max-w-[50%] md:!max-h-screen ${imgStyle}`}>
                        <DocumentImage contentId={documentId} value={image.value} className={figureStyle} alt={image.alt} activeLang={activeLang}></DocumentImage>
                    </figure>
                ) : null}
                {video ? (
                    <iframe
                        className='w-full min-h-[420px] md:flex-[0_0_50%] md:max-w-[50%] md:!max-h-screen md:rounded-md'
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
