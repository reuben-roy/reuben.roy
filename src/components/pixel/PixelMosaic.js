// A tiled backdrop of soft squares, deterministic per seed, behind sprite art.
const TONES = {
  amber: ['#fff4cc', '#ffeaa3', '#ffde75', '#ffd04a'],
  orange: ['#ffe6d6', '#ffd0b3', '#ffb98d', '#ffa066'],
  mint: ['#dcf6ea', '#c0eed9', '#9fe3c6', '#7bd6b0'],
  rose: ['#ffe4e0', '#ffcdc6', '#ffb2a8', '#ff958a'],
  blue: ['#e3ebff', '#cbdaff', '#b0c7ff', '#93b2ff'],
  stone: ['#f5f4ef', '#ebe9e0', '#e4e3de', '#d9d7cf'],
};

function seeded(seed) {
  let state = 0;
  for (const char of seed) state = (state * 31 + char.charCodeAt(0)) % 2147483647;
  state = state || 1;
  return () => {
    state = (state * 16807) % 2147483647;
    return state / 2147483647;
  };
}

export default function PixelMosaic({ tone = 'stone', seed = tone, cols = 12, rows = 8, className }) {
  const colors = TONES[tone] || TONES.stone;
  const random = seeded(seed);
  const cells = [];

  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      const roll = random();
      // Bias toward the lighter shades so the sprite on top stays the focus.
      const index = roll < 0.42 ? 0 : roll < 0.72 ? 1 : roll < 0.9 ? 2 : 3;
      cells.push(<rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={colors[index]} />);
    }
  }

  return (
    <svg
      viewBox={`0 0 ${cols} ${rows}`}
      preserveAspectRatio="xMidYMid slice"
      shapeRendering="crispEdges"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {cells}
    </svg>
  );
}
