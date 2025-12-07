import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface Hunter {
  id: number;
  name: string;
  x: number;
  y: number;
  distance: string;
  isClose: boolean;
  color: string;
}

const HuntMap = () => {
  const [hunters, setHunters] = useState<Hunter[]>([
    { id: 1, name: 'ThunderHunter (Вы)', x: 25, y: 70, distance: '124м', isClose: true, color: 'from-primary to-orange-500' },
    { id: 2, name: 'ShadowSeeker', x: 35, y: 45, distance: '387м', isClose: true, color: 'from-secondary to-purple-500' },
    { id: 3, name: 'BlitzRunner', x: 65, y: 30, distance: '542м', isClose: false, color: 'from-accent to-pink-500' },
    { id: 4, name: 'NeonChaser', x: 80, y: 60, distance: '891м', isClose: false, color: 'from-blue-500 to-cyan-500' },
    { id: 5, name: 'VortexKing', x: 55, y: 80, distance: '1.2км', isClose: false, color: 'from-green-500 to-emerald-500' },
  ]);

  const treasureX = 50;
  const treasureY = 50;

  useEffect(() => {
    const interval = setInterval(() => {
      setHunters((prev) =>
        prev.map((hunter) => {
          const dx = treasureX - hunter.x;
          const dy = treasureY - hunter.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          const moveSpeed = hunter.id === 1 ? 0.3 : 0.15 + Math.random() * 0.2;
          const newX = hunter.x + (dx / distance) * moveSpeed;
          const newY = hunter.y + (dy / distance) * moveSpeed;

          const newDistance = Math.sqrt(
            (treasureX - newX) ** 2 + (treasureY - newY) ** 2
          );
          const distanceInMeters = Math.round(newDistance * 50);

          return {
            ...hunter,
            x: newX,
            y: newY,
            distance:
              distanceInMeters > 1000
                ? `${(distanceInMeters / 1000).toFixed(1)}км`
                : `${distanceInMeters}м`,
            isClose: newDistance < 15,
          };
        })
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="relative w-full aspect-video bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-primary/20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.1),transparent_50%)]" />

      <div
        className="absolute w-16 h-16 -translate-x-1/2 -translate-y-1/2 z-20 treasure-glow rounded-full"
        style={{ left: `${treasureX}%`, top: `${treasureY}%` }}
      >
        <div className="w-full h-full bg-gradient-to-br from-primary via-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
          <Icon name="Target" size={32} className="text-white" />
        </div>
        <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl animate-pulse" />
      </div>

      <div
        className="absolute w-32 h-32 border-4 border-primary/30 rounded-full -translate-x-1/2 -translate-y-1/2 z-10 proximity-ring"
        style={{ left: `${treasureX}%`, top: `${treasureY}%` }}
      />

      {hunters.map((hunter) => (
        <div
          key={hunter.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-100 ease-linear"
          style={{ left: `${hunter.x}%`, top: `${hunter.y}%` }}
        >
          <div className="relative group">
            <div
              className={`w-12 h-12 bg-gradient-to-br ${hunter.color} rounded-full flex items-center justify-center shadow-lg ${
                hunter.isClose ? 'hunter-pulse' : ''
              } cursor-pointer hover:scale-110 transition-transform`}
            >
              {hunter.id === 1 ? (
                <Icon name="User" size={24} className="text-white" />
              ) : (
                <Icon name="Users" size={24} className="text-white" />
              )}
            </div>

            {hunter.isClose && (
              <div className="absolute -inset-2 bg-primary/20 rounded-full blur-md animate-pulse pointer-events-none" />
            )}

            <Card className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 bg-background/95 backdrop-blur-sm border-primary/30">
              <div className="text-xs space-y-1">
                <p className="font-bold">{hunter.name}</p>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Icon name="Navigation" size={12} />
                  <span>{hunter.distance}</span>
                </div>
                {hunter.isClose && (
                  <Badge className="text-xs px-2 py-0 bg-primary/20 border-primary/40 text-primary">
                    🔥 Близко
                  </Badge>
                )}
              </div>
            </Card>
          </div>
        </div>
      ))}

      <div className="absolute inset-0 pointer-events-none z-40">
        <div className="absolute top-4 left-4 space-y-2">
          <Badge className="bg-background/80 backdrop-blur-sm border-primary/30">
            <Icon name="Users" size={14} className="mr-1" />
            {hunters.length} охотников
          </Badge>
        </div>

        <div className="absolute top-4 right-4 space-y-2">
          <Badge className="bg-background/80 backdrop-blur-sm border-accent/30">
            <Icon name="Zap" size={14} className="mr-1 text-accent" />
            Live режим
          </Badge>
        </div>

        <div className="absolute bottom-4 left-4 flex gap-3">
          <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-border">
            <div className="w-3 h-3 bg-gradient-to-br from-primary to-orange-500 rounded-full" />
            <span className="text-xs text-muted-foreground">Ваша позиция</span>
          </div>
          <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-border">
            <Icon name="Target" size={14} className="text-primary" />
            <span className="text-xs text-muted-foreground">Клад</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HuntMap;
