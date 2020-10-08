import { components } from 'react-select';
import React from 'react';


export const CustomOption = props => {
    const { data, innerRef, innerProps } = props;
    return data.custom ? (
        <div
            style={{
                position: 'relative',
                left: 20 * data.level + 'px',
                display: 'flex',
                padding: '5px'
            }}
            ref={innerRef}
            {...innerProps}>
            {data.label}
        </div>
    ) : (
        <components.Option {...props}/>
    );
};


