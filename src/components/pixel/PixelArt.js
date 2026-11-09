import { PALETTE, SPRITES } from '@/data/pixelArt';

// Renders a sprite from `src/data/pixelArt.js` as crisp SVG. Horizontal runs of
// the same colour collapse into one rect so even a 24×24 sprite stays small.
function toRuns(rows) {
  const runs = [];
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const key = row[x];
      let end = x + 1;
      while (end < row.length && row[end] === key) end += 1;
      if (key !== '.' && PALETTE[key]) runs.push({ x, y, w: end - x, fill: PALETTE[key] });
      x = end;
    }
  });
  return runs;
}

const cache = new Map();

export default function PixelArt({ name, className, label, style }) {
  const rows = SPRITES[name];
  if (!rows) return null;

  if (!cache.has(name)) cache.set(name, toRuns(rows));
  const runs = cache.get(name);
  const width = Math.max(...rows.map((row) => row.length));
  const height = rows.length;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      style={style}
      shapeRendering="crispEdges"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : 'true'}
      focusable="false"
    >
      {runs.map((run) => (
        <rect key={`${run.x}-${run.y}`} x={run.x} y={run.y} width={run.w} height={1} fill={run.fill} />
      ))}
    </svg>
  );
}
