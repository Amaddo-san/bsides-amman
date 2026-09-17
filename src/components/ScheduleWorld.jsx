// Fixed coordinates keep the sky identical through rerenders, reloads, and reversals.
const STARS = [[6, 16], [17, 31], [29, 12], [76, 18], [89, 34], [95, 9], [9, 57], [39, 23], [63, 9], [82, 53], [93, 66], [22, 64], [54, 17], [69, 39]];

export function PixelSun() {
  return <path d="M8 0h8v2h4v4h2v12h-2v4h-4v2H8v-2H4v-4H2V6h2V2h4Z" fill="currentColor" />;
}

export function PixelMoon() {
  return <path d="M8 2h8v2h-4v4h-2v8h4v4h6v2H8v-2H4v-4H2V8h2V4h4Z" fill="currentColor" />;
}

function PixelCloud() {
  return <svg viewBox="0 0 64 20" shapeRendering="crispEdges"><path d="M0 16h4v-4h8V8h8V4h16v4h12v4h8v4h8v4H0Z" fill="currentColor" /></svg>;
}

export default function ScheduleWorld() {
  return (
    <div className="pixel-world" aria-hidden="true">
      <div className="pixel-world__viewport" data-world>
        <div className="pixel-world__light" />
        <div className="pixel-world__stars">{STARS.map(([x, y], index) => <i key={index} style={{ left: `${x}%`, top: `${y}%` }} />)}</div>
        <svg className="pixel-world__sun" viewBox="0 0 24 24" shapeRendering="crispEdges"><PixelSun /></svg>
        <svg className="pixel-world__moon" viewBox="0 0 24 24" shapeRendering="crispEdges"><PixelMoon /></svg>
        <div className="pixel-world__clouds"><PixelCloud /><PixelCloud /><PixelCloud /></div>

        <div className="pixel-world__plane pixel-world__far">
          <svg viewBox="0 0 800 320" shapeRendering="crispEdges" fill="currentColor">
            <path d="M0 156h40v-8h32v-12h44v-8h44v16h44v20h40v20h36v8h48v16h48v8h64v-8h40v-12h40v-16h44v-16h32v-16h48v-12h40v-8h40v16h36v12h40v164H0Z" />
            <path d="M80 152v-40h20v-8h12v8h12v40Zm52-8v-48h8V84h8v12h8v48Zm36 16v-44h28v44Zm40 20v-40h20v-8h12v48Zm356 0v-44h24v44Zm40-16v-52h28v52Zm44-12V88h8V76h8v12h8v64Zm36 0v-36h32v36Z" />
          </svg>
        </div>

        <div className="pixel-world__plane pixel-world__near">
          <svg viewBox="0 0 800 320" shapeRendering="crispEdges" fill="currentColor">
            <path d="M0 208h24v-28h28v8h20v32h24v-16h28v-28h36v12h20v40h24v-16h32v32h32v8h40v12h52v8h68v-8h40v-8h36v-12h36v-24h24v-24h32v16h24v-40h32v12h24v32h24v-20h28v-24h32v16h36v8h32v-32h32v144H0Z" />
            <path d="M108 204v-44h8v-8h12v8h8v44Zm492 8v-56h8v-12h8v12h8v56Z" />
            <g className="pixel-world__windows">
              <path d="M32 196h4v8h-4Zm12 0h4v8h-4Zm88-4h4v8h-4Zm16 0h4v8h-4Zm68 32h4v8h-4Zm356-12h4v8h-4Zm44-32h4v8h-4Zm24 16h4v8h-4Zm52 20h4v8h-4Zm36-20h4v8h-4Zm52 4h4v8h-4Z" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
