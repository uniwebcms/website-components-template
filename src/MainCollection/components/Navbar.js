import React, { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { HiChevronDown } from 'react-icons/hi';
import { MdOutlineClose } from 'react-icons/md';
import Wrapper from './Wrapper';
import { SmartLink, DocumentImage, PopoverMenu, findLink } from '@uniwebcms/module-sdk';

const NavbarMenu = (props) => {
    const { linksList = [], label, activeLang, documents } = props;

    let menu = [];

    linksList.forEach((item, index) => {
        const { links } = item;

        if (links.length) {
            const { href, label } = links[0];

            menu.push(
                <SmartLink key={index} to={findLink(href, documents, activeLang)} className='block px-5 py-4 hover:bg-gray-50'>
                    <span className='text-base md:text-lg font-medium text-gray-900'>{label}</span>
                </SmartLink>
            );
        }
    });

    return (
        <PopoverMenu
            trigger={
                <>
                    <span>{label}</span>
                    <HiChevronDown className='ml-2 h-5 w-5 text-gray-500 group-hover:text-gray-700' aria-hidden='true' />
                </>
            }
            triggerClassName={'-ml-3 -mr-2 -my-1 pl-3 pr-2 py-1 group inline-flex items-center rounded-md text-base md:text-lg font-semibold text-gray-700 hover:text-gray-900 focus:outline-none'}
            position={'top-full -left-[13px] mt-[14px]'}
            width={'150px'}
            zIndex={'10'}
            options={menu}
        />
    );
};

export default function Navbar(props) {
    const { activeLang, language, setLang, activeRoute, targetRoute, documents, documentId, properties, makeLink, main } = props;

    const { banner = {}, body } = main;

    const { links, lists } = body;

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [activeRoute]);

    const { sticky = false, bgColor = 'white' } = properties;

    const iconLink = links[0]?.href;
    const navLinks = lists[0] || [];

    return (
        <>
            <div className={sticky ? 'sticky top-0 z-10' : ''} style={{ background: bgColor }}>
                <Wrapper className='h-9 flex items-center justify-between my-3 md:my-6' element='nav'>
                    {/* Logo */}
                    <div className='flex lg:min-w-0 lg:flex-1'>
                        <SmartLink to={makeLink(iconLink === '/' ? '' : iconLink)} className='-m-1.5 p-1.5'>
                            <span className='sr-only'>Proximify</span>
                            <div className='h-9'>
                                <DocumentImage contentId={documentId} value={banner?.value} className='block object-cover h-full object-top' alt={banner?.alt} activeLang={activeLang}></DocumentImage>
                            </div>
                        </SmartLink>
                    </div>
                    {/* Mobile menu trigger*/}
                    <div className='flex lg:hidden'>
                        <button className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700' onClick={() => setMobileMenuOpen(true)}>
                            <span className='sr-only'>Open main menu</span>
                            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' aria-hidden='true' className='h-6 w-6'>
                                <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'></path>
                            </svg>
                        </button>
                    </div>
                    {/* Nav bar items */}
                    <div className='hidden lg:flex lg:min-w-[35rem] lg:flex-1 lg:justify-center 2xl:ml-12 2xl:mr-16 2xl:space-x-12 xl:ml-10 xl:mr-12 xl:space-x-8 lg:ml-3 lg:mr-5 lg:space-x-4'>
                        {navLinks.map((navItem, index) => {
                            const { links, lists, paragraphs } = navItem;

                            if (links.length) {
                                // inline nav item
                                const linkItem = links[0];

                                return (
                                    <SmartLink key={index} to={findLink(linkItem.href, documents, activeLang)} className='text-base md:text-lg font-semibold text-gray-700 hover:text-gray-900 pr-0.5'>
                                        {linkItem.label}
                                    </SmartLink>
                                );
                            } else if (lists.length) {
                                // group nav item
                                return (
                                    <NavbarMenu
                                        key={index}
                                        linksList={lists[0]}
                                        label={paragraphs[0]}
                                        {...{
                                            activeLang,
                                            documents,
                                            documentId
                                        }}
                                    />
                                );
                            }
                        })}
                    </div>
                    {/* Page language toggle */}
                    <div className='hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-end'>
                        {language === 'bilingual' ? (
                            <a
                                href='#'
                                onClick={(e) => {
                                    e.preventDefault();

                                    setLang(activeLang === 'en' ? 'fr' : 'en', activeRoute, targetRoute);
                                }}>
                                <span className='text-base md:text-lg font-semibold text-gray-700 hover:text-gray-900'>{activeLang === 'en' ? 'FR' : 'EN'}</span>
                            </a>
                        ) : null}
                    </div>
                </Wrapper>
            </div>
            {/* Mobile nav menu */}
            <Dialog as='div' open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <Dialog.Panel focus='true' className='fixed inset-0 z-10 overflow-y-auto bg-white px-4 sm:px-6 py-3 md:py-6 lg:hidden'>
                    <div className='flex h-9 items-center justify-between'>
                        <div className='flex'>
                            <SmartLink to={makeLink(iconLink === '/' ? '' : iconLink)} className='-m-1.5 p-1.5'>
                                <span className='sr-only'>Organization</span>
                                <div className='h-9'>
                                    <DocumentImage contentId={documentId} value={banner?.value} className='block object-cover h-full object-top' alt={banner?.alt} activeLang={activeLang}></DocumentImage>
                                </div>
                            </SmartLink>
                        </div>
                        <div className='flex items-center space-x-1.5 -mr-2.5'>
                            <a
                                href='#'
                                onClick={(e) => {
                                    e.preventDefault();

                                    setLang(activeLang === 'en' ? 'fr' : 'en', activeRoute, targetRoute);
                                    setMobileMenuOpen(false);
                                }}
                                className='inline-flex items-center justify-center p-2.5 w-[44px] h-[44px] rounded-md text-base md:text-lg font-semibold leading-6 text-gray-500 hover:text-gray-700 hover:bg-gray-50'>
                                <span>{activeLang === 'en' ? 'FR' : 'EN'}</span>
                            </a>

                            <button type={'button'} className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:text-gray-900' onClick={() => setMobileMenuOpen(false)}>
                                <span className='sr-only'>Close menu</span>
                                <MdOutlineClose className='h-6 w-6' aria-hidden='true' />
                            </button>
                        </div>
                    </div>
                    <div className='mt-6 flow-root'>
                        <div className='grid grid-cols-2 gap-y-4 gap-x-8'>
                            {navLinks.map((navItem, index) => {
                                const { links, lists, paragraphs } = navItem;

                                if (links.length) {
                                    const linkItem = links[0];
                                    return (
                                        <SmartLink key={index} to={findLink(linkItem.href, documents, activeLang)} className='text-base md:text-lg font-semibold text-gray-700 hover:text-gray-900 pr-0.5'>
                                            {linkItem.label}
                                        </SmartLink>
                                    );
                                } else if (lists.length) {
                                    const linksList = lists[0];

                                    return (
                                        <div className={`col-span-2 ${index < navLinks.length - 1 ? 'border-b pb-3 mb-3' : ''}`} key={index}>
                                            <p className='text-base md:text-lg font-medium text-gray-500 mb-2'>{paragraphs[0]}</p>
                                            {linksList.map((item, index) => {
                                                const { links } = item;

                                                if (links.length) {
                                                    const { href, label } = links[0];

                                                    return (
                                                        <SmartLink key={index} to={findLink(href, documents, activeLang)} className='block px-4 py-2 hover:bg-gray-50'>
                                                            <span className='text-base md:text-lg font-medium text-gray-900'>{label}</span>
                                                        </SmartLink>
                                                    );
                                                }
                                            })}
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </>
    );
}
