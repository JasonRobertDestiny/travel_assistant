import * as React from 'react';
export interface DividerProps {
    prefixCls?: string;
    type?: 'horizontal' | 'vertical';
    /**
     * @default center
     */
    orientation?: 'left' | 'right' | 'center' | 'start' | 'end';
    orientationMargin?: string | number;
    className?: string;
    rootClassName?: string;
    children?: React.ReactNode;
    dashed?: boolean;
    /**
     * @since 5.20.0
     * @default solid
     */
    variant?: 'dashed' | 'dotted' | 'solid';
    style?: React.CSSProperties;
    plain?: boolean;
}
declare const Divider: React.FC<DividerProps>;
export default Divider;
