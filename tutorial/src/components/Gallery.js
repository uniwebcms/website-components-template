import React from 'react';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';
import useBaseUrl from '@docusaurus/useBaseUrl';
import imageDimensions from '@site/static/img/dimensions.json';

/**
 * Gallery of component preview images.
 * @param {Array} images - images paths
 * @returns
 */
export default function (props) {
    const { images = [] } = props;

    return (
        <Gallery id='image-gallery'>
            <div
                style={{
                    display: 'flex',
                    padding: '20px 20px',
                    gap: '20px',
                    background: '#e5e5e5',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    width: '100%',
                    borderRadius: '8px'
                }}>
                {images.map((image, index) => {
                    const src = useBaseUrl(`/img/${image}`);

                    const { height = 600, width = 800 } = imageDimensions[image] || {};

                    return (
                        <Item key={index} original={src} thumbnail={src} width={width} height={height}>
                            {({ ref, open }) => (
                                <img
                                    ref={ref}
                                    onClick={open}
                                    style={{
                                        cursor: 'pointer',
                                        width: '180px',
                                        height: '130px',
                                        objectFit: 'contain',
                                        background: 'white',
                                        borderRadius: '8px',
                                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
                                    }}
                                    src={src}
                                />
                            )}
                        </Item>
                    );
                })}
            </div>
        </Gallery>
    );
}
