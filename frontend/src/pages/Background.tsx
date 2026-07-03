import { useMemo } from 'react';
import spider from '/src/assets/pajonczek.png';
import myLove from '/src/assets/kochaniemoje.png';

// Typ dla każdego elementu tła
interface BackgroundItem {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  opacity: number;
}

function Background() {
  const items = useMemo<BackgroundItem[]>(() => {
    const results: BackgroundItem[] = [];
    let attempts = 0;
    while (results.length < 25 && attempts < 500) {
      const x = Math.random() * 92 + 3;
      const y = Math.random() * 92 + 3;

      const tooClose = x > 25 && x < 75 && y > 33 && y < 67;
      if (!tooClose) {
        results.push({
          id: results.length,
          x,
          y,
          rotation: Math.random() * 360,
          scale: Math.random() * 0.3 + 0.9,
          opacity: 0.8
        });
      }
      attempts++;
    }
    return results;
  }, []);

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
      {items.map(({ id, x, y, rotation, scale }) => (
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
      <img
        src={myLove}
        alt=""
        style={{ position: "fixed", top: "95%", left: "0%", width: '32px' }}
      />
    </div>
  );
}

export default Background