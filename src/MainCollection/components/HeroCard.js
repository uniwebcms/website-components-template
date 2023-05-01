import React from 'react';
import { MdEmail } from 'react-icons/md';
import { SmartLink, DocumentImage, findLink } from '@uniwebcms/module-sdk';

export default (props) => {
    const { properties, activeLang, documents, documentId, makeLink, main } = props;

    const { header = {}, body = {} } = main;

    const { title, subtitle } = header;
    const bgImg = body.imgs?.[0];
    const links = body.links || [];

    const { textAlign = 'center', textShadowColor = '' } = properties;

    const textStyle = { textAlign };

    const imgSizes = {
        center: 'basic',
        wide: 'lg',
        fill: 'full'
    };

    const imageSize = imgSizes[bgImg?.direction] || '';

    const containerStyle = () => {
        switch (imageSize) {
            case 'lg':
                return 'mx-auto 2xl:max-w-[116rem] xl:max-w-[90rem] lg:max-w-[95%] px-0 md:px-6 lg:px-8';
            case 'full':
                return 'w-full';
            default:
                return 'mx-auto 2xl:max-w-[80rem] xl:max-w-[72rem] lg:max-w-[95%] px-0 md:px-6 lg:px-8';
        }
    };

    return (
        <div className='relative'>
            <section className={`${containerStyle()} mb-6 md:mb-12`}>
                <div className={`relative shadow-xl sm:overflow-hidden ${imageSize !== 'full' ? 'md:rounded-2xl' : ''}`}>
                    <figure className='absolute inset-0'>
                        {bgImg ? <DocumentImage contentId={documentId} value={bgImg.value} className='h-full w-full object-cover' alt={bgImg.alt} activeLang={activeLang}></DocumentImage> : null}
                        <div className='absolute inset-0' />
                    </figure>
                    <div className={`flex justify-${textAlign} relative px-4 py-16 sm:px-6 sm:py-28 md:py-36 lg:px-8 lg:py-40 xl:py-44 ${imageSize === 'full' ? 'mx-auto 2xl:max-w-[80rem] xl:max-w-[72rem] lg:max-w-[95%]' : ''}`}>
                        <header className='max-w-[90%] md:max-w-[80%]'>
                            <h2
                                className='mb-3 md:mb-5 text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight'
                                style={{
                                    textShadow: textShadowColor ? `${textShadowColor} 1px 0 10px` : '',
                                    ...textStyle
                                }}
                                dangerouslySetInnerHTML={{
                                    __html: title
                                }}></h2>
                            {subtitle ? (
                                <p
                                    className='font-medium text-lg xl:text-xl 2xl:text-2xl'
                                    dangerouslySetInnerHTML={{
                                        __html: subtitle
                                    }}
                                    style={{
                                        textShadow: textShadowColor ? `${textShadowColor} 1px 0 10px` : '',
                                        ...textStyle
                                    }}></p>
                            ) : null}
                            <div className={`flex justify-${textAlign} mt-8`}>
                                {links.map((link, index) => {
                                    const { label, href } = link;

                                    const external = href.startsWith('https:') || href.startsWith('mailto:');

                                    let to = external ? href : makeLink(findLink(href, documents, activeLang));

                                    return (
                                        <SmartLink
                                            key={index}
                                            className='inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                                            to={to}
                                            external={external}>
                                            <MdEmail className='-ml-1 mr-2 h-5 w-5' aria-hidden='true' />
                                            {label}
                                        </SmartLink>
                                    );
                                })}
                            </div>
                        </header>
                    </div>
                </div>
            </section>
        </div>
    );
};
