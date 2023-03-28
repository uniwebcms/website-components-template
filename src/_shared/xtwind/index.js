import * as twind from 'twind';
import { css, theme, screen } from 'twind/css';
import { styled } from '@twind/react';
import { lineClamp } from '@twind/line-clamp';
import { aspectRatio } from '@twind/aspect-ratio';
import * as colors from 'twind/colors';

// Set twind globally, extends its colour and add aspectRatio plugin. This is a fallback in case the uniweb engine doesn't set it.
if (!window.twind) {
    twind.setup({
        theme: {
            extend: {
                colors,
            },
        },
        plugins: {
            aspect: aspectRatio,
        },
    });

    window.twind = twind;
}

// The tw function allows you to represent your styles in arrays, objects, template literals, functions, or any combination of these.
// The apply function can be used to define a collection of Twind classes that can later be overwritten in a tw call
const { tw, apply } = twind;

// css function allows you to write CSS within Twind and provides support for global styling.
// theme function can be used to access theme values inside of a css function call.
// styled function can create a styled a styled components, which is inspired by stitches.
// screen function allows you to create media queries that reference your Twind breakpoints by name (sm,md, etc.).
// the lineClamp function is to specify how many lines of text should be visible before truncating.
// the aspectRatio function is to specify the aspect ratio for an element.
export { tw, css, apply, theme, styled, screen, lineClamp, aspectRatio };

export default twind;
