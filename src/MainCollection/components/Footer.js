import React from 'react';
import Wrapper from './Wrapper';
import { SmartLink, DocumentImage, findLink } from '@uniwebcms/module-sdk';

export default (props) => {
    const { properties, activeLang, documents, documentId, makeLink, main } = props;

    const { banner = {}, body, header } = main;

    const { links, lists } = body;

    const iconLink = links[0]?.href;
    const navLinks = lists[0] || [];

    const { minHeight = '150px' } = properties;

    return (
        <div className='bg-blue-900' style={{ minHeight }}>
            <Wrapper className='flex flex-col flex-col-reverse md:flex-row justify-between my-5 !px-8'>
                <div className='w-full md:w-auto md:mr-12 lg:mr-24 xl:mr-36 2xl:mr-48 mt-3 md:mt-0'>
                    <SmartLink to={makeLink(iconLink === '/' ? '' : iconLink)} className='block -m-1.5 px-1.5 py-3 min-w-[100px]'>
                        <span className='sr-only'>Organization</span>
                        <div className='h-7 md:h-9'>
                            <DocumentImage contentId={documentId} value={banner?.value} className='block object-cover h-full object-top' alt={banner?.alt} activeLang={activeLang}></DocumentImage>
                        </div>
                    </SmartLink>
                    <p className='text-gray-300 text-sm'>{header.title}</p>
                </div>
                <div className='flex-1 md:grid gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
                    {navLinks.map((navItem, index) => {
                        const { links, lists, paragraphs } = navItem;

                        if (links.length) {
                            // inline nav item
                            const linkItem = links[0];

                            return (
                                <SmartLink key={index} to={findLink(linkItem.href, documents, activeLang)} className='text-base md:text-lg font-medium text-white hover:text-blue-500'>
                                    {linkItem.label}
                                </SmartLink>
                            );
                        } else if (lists.length) {
                            // group nav item
                            const linksList = lists[0];

                            return (
                                <div className='row-span-full' key={index}>
                                    <p className='text-base md:text-lg font-medium text-gray-200 mb-1'>{paragraphs[0]}</p>
                                    {linksList.map((item, index) => {
                                        const { links } = item;

                                        if (links.length) {
                                            const { href, label } = links[0];

                                            return (
                                                <SmartLink key={index} to={findLink(href, documents, activeLang)} className='my-0.5 block text-base md:text-lg font-medium text-[rgb(10,196,233)] hover:text-blue-500'>
                                                    {label}
                                                </SmartLink>
                                            );
                                        }
                                    })}
                                </div>
                            );
                        }
                    })}
                </div>
            </Wrapper>
        </div>
    );
};
