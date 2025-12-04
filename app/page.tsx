import { TILES } from "./lib/mock/tiles";
import { TilesLayout } from "./ui/tiles-layout";

export default function Home() {
  return (
    <div style={{
			width: '100%',
			maxWidth: '100vw',
			minHeight: '100vh',
    }}>
      <TilesLayout 
        style={{
					width: '50%',
          margin: '0 auto'
        }} 
        tiles={TILES}
				showControls={true}
      />

      <div className="grid-cols-4">
      
      </div>
    </div>
  );
}
