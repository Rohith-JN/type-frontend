import React, { useState } from 'react';

const HoverComponent = ({ text, spanText }: { text: string, spanText: string }) => {
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };

    return (
        <>
            <span
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                style={{ cursor: 'pointer' }}
            >
                {spanText}
            </span>

            {isHovering && (
                <div style={{ backgroundColor: "var(--sub-alt-color)", paddingLeft: "10px", paddingRight: "10px", position: "absolute", borderRadius: "7px", marginTop: "10px", width: "50px" }}>
                    <h2 style={{ color: "var(--sub-color)", fontSize: "12px" }}>{text}</h2>
                </div>
            )}
        </>
    );
};

export default HoverComponent