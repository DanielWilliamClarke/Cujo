/** @jsxImportSource theme-ui */

import React from 'react';
import { ThemeUICSSObject } from 'theme-ui';
import { usePositionContext } from './PositionContext';
import { GenericComponentProps } from './props';

const baseLineStyle: ThemeUICSSObject = {
    display: 'block',
    height: 1,
    padding: 0,
    marginY: 10
}

export const centeredStyle: ThemeUICSSObject = {
    float: 'none',
    marginX: 'auto'
}

export type LineProps = GenericComponentProps & {
    centered: boolean;
    colorOverride?: string;
}

const BaseLine: React.FC<LineProps> = ({ className, centered, colorOverride }) => {
    const { even } = usePositionContext();

    return (
        <div
            className={className}
            sx={{
                ...baseLineStyle,
                ...(centered && centeredStyle),
                backgroundColor: colorOverride ?? (even ? 'accent' : 'secondary')
            }}
        />
    )
}

export const Line: React.FC<LineProps> = (props) => (
    <BaseLine
        {...props}
        sx={{ width: 200 }}
    />
);

export const ShortLine: React.FC<LineProps> = (props) => (
    <BaseLine
        {...props}
        sx={{ width: 30 }}
    />
)

export const LongLine: React.FC<LineProps> = (props) => (
    <BaseLine
        {...props}
        sx={{ width: '75%' }}
    />
)

export type SymbolProps = GenericComponentProps & {
    symbol: string
}

const BaseSymbol: React.FC<SymbolProps> = ({ className, symbol }) => {
    const { even } = usePositionContext();

    return (
        <span
            className={className}
            sx={{
                '&:after': {
                    marginX: 10,
                    content: `"${symbol}"`,
                    color: even ? 'accent' : 'secondary'
                }
            }}
        />
    )
}

export const Dot: React.FC<SymbolProps> = (props) => (
    <BaseSymbol
        {...props}
        symbol="•"
    />
);

export const At: React.FC<SymbolProps> = (props) => (
    <BaseSymbol
        {...props}
        symbol="@"
    />
)

export const Copyright: React.FC<SymbolProps> = (props) => (
    <BaseSymbol
        {...props}
        symbol="©"
    />
)

export const Dash: React.FC<SymbolProps> = (props) => (
    <BaseSymbol
        {...props}
        symbol="-"
    />
)