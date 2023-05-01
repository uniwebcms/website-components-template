import React from 'react';
import Wrapper from './Wrapper';
import { SmartLink, DocumentImage, findLink } from '@uniwebcms/module-sdk';

const CardRenderer = ({ activeLang, makeLink, documents, documentId, main = {} }) => {
    const { header = {}, body = {}, banner } = main;

    const { title, subtitle, description } = header;
    const links = body.links || [];
    const image = body.imgs?.[0] || {};

    if (banner && links[0]) {
        const { href } = links[0];
        const external = href.startsWith('https:') || href.startsWith('mailto:') || href.startsWith('tel:');

        return (
            <SmartLink className='w-48 h-48 p-6 m-2 rounded-xl !shadow-md hover:!shadow-lg bg-white' to={href} external={external}>
                <DocumentImage contentId={documentId} value={banner.value} alt={banner.alt} activeLang={activeLang} className='w-full h-full object-contain'></DocumentImage>
            </SmartLink>
        );
    }

    return (
        <div className='space-y-4 w-[20rem] my-3 px-4 sm:px-6 lg:px-8'>
            <div className='w-full h-48 rounded-md overflow-hidden'>
                <DocumentImage contentId={documentId} value={image.value} alt={image.alt} activeLang={activeLang}></DocumentImage>
            </div>
            <div className='w-full space-y-1 text-lg leading-6'>
                <h3 className='font-medium' dangerouslySetInnerHTML={{ __html: title }}></h3>
                <h4 dangerouslySetInnerHTML={{ __html: subtitle }}></h4>
            </div>
            <div className='w-full text-lg'>
                {description ? (
                    <p
                        className='text-base'
                        dangerouslySetInnerHTML={{
                            __html: description
                        }}></p>
                ) : null}
            </div>
            <div>
                {links.map((link, index) => {
                    const { label, href } = link;

                    const external = href.startsWith('https:') || href.startsWith('mailto:') || href.startsWith('tel:');

                    let to = external ? href : makeLink(findLink(href, documents, activeLang));

                    return (
                        <SmartLink key={index} className='my-4 font-medium text-lg text-blue-600 hover:underline h-11' to={to} external={external}>
                            {label}
                        </SmartLink>
                    );
                })}
            </div>
        </div>
    );
};

export default (props) => {
    const { activeLang, documents, makeLink, items, main, documentId } = props;

    const cards = items.length ? items : [main];

    return (
        <Wrapper className='flex flex-wrap justify-center !mt-0 !mb-6 !px-0 sm:!px-0 lg:!px-0'>
            {cards.map((card, index) => {
                return (
                    <CardRenderer
                        key={index}
                        {...{
                            main: card,
                            activeLang,
                            makeLink,
                            documents,
                            documentId
                        }}
                    />
                );
            })}
        </Wrapper>
    );
};
