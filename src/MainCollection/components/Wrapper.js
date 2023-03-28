import React from 'react';
import { tw } from 'xtwind';

export default ({ className, children, element }) => {
    let Tag = element || 'section';

    return <Tag className={tw`mx-auto 2xl:max-w-[80rem] xl:max-w-[72rem] lg:max-w-[95%] px-4 sm:px-6 lg:px-8 ${className}`}>{children}</Tag>;
};
