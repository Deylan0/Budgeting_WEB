import { useMemo } from 'react';
import spider from './assets/pajonczek.png';
import myLove from './assets/kochaniemoje.png';

function Background() {
  const items = useMemo(() =>
    Array.from({length: 15}, (_, i) =>  ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        rotation: Math.random() * 360,
        scale: Math.random() * 0.6 + 0.5,
    })),
    []);
    
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        overflow: 'hidden',
        background: 'linear-gradient(to bottom, #741018, #014d83, #010f19)',
      }}
    >
      {items.map(({ id, x, y, rotation, scale, opacity }) => (
        <img
          key={id}
          src={spider}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: `${x}%`,
            top: `${y}%`,
            transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`,
            pointerEvents: 'none',
            userSelect: 'none',
            width: '32px',     
          }}
        />
      ))}
      <img src={myLove} style={{position: "absolute", top: "905px",left: "008px", rotate: "18deg"}}/>
    </div>
  );
}

export default Background