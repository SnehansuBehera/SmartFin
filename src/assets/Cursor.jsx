import React, { useState, useEffect } from 'react';

const CursorAnimation = ({ show }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updatePosition = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        // Add event listener
        window.addEventListener('mousemove', updatePosition);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('mousemove', updatePosition);
        };
    }, []);

    return (
        <>
            {show &&
                <div
                    className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 bg-transparent transition-all duration-75 rounded-full w-[2rem] h-[2rem] shadow-[0_0_25px_10px_rgba(0,189,155,0.5)]"
                    style={{
                        top: `${position.y}px`,
                        left: `${position.x}px`
                    }
                    }
                >

                </div>

            }
        </>

    );
};

export default CursorAnimation;