import React from 'react';
import { tw, css } from 'xtwind';
import Wrapper from './Wrapper';

export default (props) => {
    const { properties, main } = props;

    const { header = {} } = main;
    const { alignment, title, subtitle, description } = header;

    const textAlign = alignment || 'center';

    const { bgColor = 'white', maxWidth = '' } = properties;

    const textStyle = css({ textAlign });

    return (
        <div className={tw`relative`} style={{ background: bgColor }}>
            <Wrapper className={tw`w-full flex justify-${textAlign} mb-6 md:mb-12 ${maxWidth ? `!max-w-[${maxWidth}]` : ''}`}>
                <article className={tw`space-y-2 md:space-y-5`}>
                    <header className={tw`space-y-1 md:space-y-3`}>
                        {title ? (
                            <h2
                                className={tw`text-2xl md:text-3xl lg:text-4xl font-bold ${textStyle}`}
                                dangerouslySetInnerHTML={{
                                    __html: title
                                }}></h2>
                        ) : null}
                        {subtitle ? (
                            <h3
                                className={tw`text-xl md:text-2xl lg:text-3xl font-semibold ${textStyle}`}
                                dangerouslySetInnerHTML={{
                                    __html: subtitle
                                }}></h3>
                        ) : null}
                    </header>
                    {description ? (
                        <p
                            className={tw`text-base md:text-lg lg:text-xl font-medium ${textStyle}`}
                            dangerouslySetInnerHTML={{
                                __html: description
                            }}></p>
                    ) : null}
                </article>
            </Wrapper>
        </div>
    );
};
