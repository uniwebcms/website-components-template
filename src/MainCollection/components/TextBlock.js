import React from 'react';
import Wrapper from './Wrapper';

export default (props) => {
    const { properties, main } = props;

    const { header = {} } = main;
    const { alignment, title, subtitle, description } = header;

    const textAlign = alignment || 'center';

    const { bgColor = 'white', maxWidth = '' } = properties;

    const textStyle = { textAlign };

    return (
        <div className='relative' style={{ background: bgColor }}>
            <Wrapper className={`w-full flex justify-${textAlign} mb-6 md:mb-12 ${maxWidth ? `!max-w-[${maxWidth}]` : ''}`}>
                <article className='space-y-2 md:space-y-5'>
                    <header className='space-y-1 md:space-y-3'>
                        {title ? (
                            <h2
                                className='text-2xl md:text-3xl lg:text-4xl font-bold'
                                dangerouslySetInnerHTML={{
                                    __html: title
                                }}
                                style={textStyle}></h2>
                        ) : null}
                        {subtitle ? (
                            <h3
                                className='text-xl md:text-2xl lg:text-3xl font-semibold'
                                dangerouslySetInnerHTML={{
                                    __html: subtitle
                                }}
                                style={textStyle}></h3>
                        ) : null}
                    </header>
                    {description ? (
                        <p
                            className='text-base md:text-lg lg:text-xl font-medium'
                            dangerouslySetInnerHTML={{
                                __html: description
                            }}
                            style={textStyle}></p>
                    ) : null}
                </article>
            </Wrapper>
        </div>
    );
};
