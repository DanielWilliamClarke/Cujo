/** @jsxImportSource theme-ui */

import { useInjection } from 'inversify-react';
import React from 'react';
import { IIconService } from '../services/IconService';
import { keyframes } from '@emotion/react'

import { anton } from './Font';
import { GenericComponentProps } from './props';

const pastelRgb = keyframes`
    0% {
        color: hsl(360, 90%, 65%);
    }

    10% {
        color: hsl(0, 90%, 65%);
    }

    20% {
        color: hsl(36, 90%, 65%);
    }

    30% {
        color: hsl(72, 90%, 65%);
    }

    40% {
        color: hsl(108, 90%, 65%);
    }

    50% {
        color: hsl(144, 90%, 65%);
    }

    60% {
        color: hsl(180, 90%, 65%);
    }

    70% {
        color: hsl(216, 90%, 65%);
    }

    80% {
        color: hsl(252, 90%, 65%);
    }

    90% {
        color: hsl(288, 90%, 65%);
    }

    100% {
        color: hsl(324, 90%, 65%);
    }
`;

export const Logo: React.FC<GenericComponentProps> = ({ className }) => {
    const iconService = useInjection(IIconService.$);
    const Icon = iconService.getWithDefault("skills");

    return (
        <div
            className={`${anton.className} ${className}`}
            sx={{
                fontSize: 150,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingRight: 30
            }}
        >
            <span>DC</span>
            <Icon
                sx={{
                    width: 150 + 30,
                    position: 'absolute',
                    rotate: '10deg',
                    filter: 'drop-shadow(4px 4px 4px rgb(0 0 0 / 0.4))',
                    animation: `${pastelRgb} 10s infinite`,
                    animationTimingFunction: 'ease-in-out'
                }}
            />
        </div>
    )
}