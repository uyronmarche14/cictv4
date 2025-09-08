import React from "react";

export const CleanGridBackground = ({
  rows = 12,
  cols = 20,
  cellSize = 40,
  opacity = 0.1,
  borderOpacity = 0.15
}) => {
  return (
    <div className="absolute inset-0 h-full max-w-full overflow-hidden pointer-events-none">
      <div 
        className="absolute inset-0 grid gap-0"
        style={{
          gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
          justifyContent: 'center',
          alignContent: 'center',
          transform: 'translateY(-10%)'
        }}
      >
        {Array.from({ length: rows * cols }, (_, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: 'transparent',
              width: cellSize,
              height: cellSize,
              border: `1px solid ${borderOpacity >= 0.5 ? 
                `rgba(0, 0, 0, ${borderOpacity})` : 
                `rgba(255, 255, 255, ${borderOpacity})`}`,
              opacity
            }}
          />
        ))}
      </div>
      
      {/* Fade effect - stronger at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent dark:from-gray-900 dark:via-gray-900/50 dark:to-transparent" />
    </div>
  );
};