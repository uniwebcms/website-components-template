import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useBaseUrl from '@docusaurus/useBaseUrl';
import imageDimensions from '@site/static/img/dimensions.json';

export const Gallery = (props) => {
    const getCompleteUrl = (url) => {
        return useBaseUrl(url);
    };

    return (
        <BrowserOnly fallback={<div>Loading...</div>}>
            {() => {
                const Gallery = require('@uniwebcms/tutorial-starter').Gallery;
                return <Gallery {...props} {...props} getCompleteUrl={getCompleteUrl} imageDimensions={imageDimensions} />;
            }}
        </BrowserOnly>
    );
};

export const SchemaViewer = (props) => {
    return (
        <BrowserOnly fallback={<div>Loading...</div>}>
            {() => {
                const SchemaViewer = require('@uniwebcms/tutorial-starter').SchemaViewer;
                return <SchemaViewer {...props} />;
            }}
        </BrowserOnly>
    );
};
