import { useEffect, useState } from 'react';
import { Fade, FadeProps } from 'react-awesome-reveal';

type WindowState = {
    width?: number;
    height?: number;
}

export const useWindowSize = () => {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState<WindowState>({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        // only execute all the code below in client side
        // Handler to call on window resize
        const handleResize = () => {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}

type RevealProps = FadeProps & {
    children?: React.ReactNode;
    index?: number;
};

export const Reveal: React.FC<RevealProps> = (
    { children, index, direction, ...props }: RevealProps
): JSX.Element => {
    const [override, setOverride] = useState<typeof direction>(direction);
    const initialDirection = (index ?? 0) % 2 ? 'right' : 'left';

    const size = useWindowSize();
    useEffect(() => {
        const requiresWidthOverride = size.width && size.width <= 700

        requiresWidthOverride ?
            setOverride('up') :
            setOverride(direction ?? initialDirection)
    }, [size, direction, initialDirection])

    if (!size.width || !size.height) {
        return <></>;
    }

    return (
        <Fade
            triggerOnce
            delay={0.5}
            direction={override as any}
            {...props}

            key={index}
        >
            {children}
        </Fade>
    )
};