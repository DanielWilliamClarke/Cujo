import { Fragment, Suspense, useEffect, useState } from 'react';
import { Fade, FadeProps } from 'react-awesome-reveal';
import { useWindowSize } from '../hooks/useWindowSize';

type RevealProps = FadeProps & {
    children?: React.ReactNode;
    index?: number;
};

export const Reveal: React.FC<RevealProps> = (
    { children, index, direction, ...props }: RevealProps
): JSX.Element => {
    const [override, setOverride] = useState<typeof direction>(direction);
    const initialDirection = (index ?? 0) % 2 ? 'right' : 'left';

    const { width } = useWindowSize();
    useEffect(() => {
        const requiresWidthOverride = width && width <= 700

        requiresWidthOverride ?
            setOverride('up') :
            setOverride(direction ?? initialDirection)
    }, [width, direction, initialDirection])

    return (
        <Fragment>
            {width && <Fade
                triggerOnce
                delay={0.5}
                direction={override as any}
                {...props}
                key={index}
            >
                <Suspense>
                    {children}
                </Suspense>
            </Fade>}
        </Fragment>
    )
};