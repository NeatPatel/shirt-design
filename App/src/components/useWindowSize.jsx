import { useState, useEffect } from 'react';

// This is a custom hook
function useWindowSize() {
    const [ windowSize, setWindowSize ] = useState({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight
    });

    // Effect for resizing window
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                windowWidth: window.innerWidth,
                windowHeight: window.innerHeight
            });
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
}

export { useWindowSize };