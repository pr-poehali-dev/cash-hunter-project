import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import HuntMap from '@/components/HuntMap';

type Section = 'home' | 'hunt' | 'leaderboard' | 'profile' | 'register';

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 34, seconds: 15 });

  const leaderboardData = [
    { rank: 1, name: 'ThunderHunter', points: 2450, distance: '124м' },
    { rank: 2, name: 'ShadowSeeker', points: 2200, distance: '387м' },
    { rank: 3, name: 'BlitzRunner', points: 1980, distance: '542м' },
    { rank: 4, name: 'NeonChaser', points: 1750, distance: '891м' },
    { rank: 5, name: 'VortexKing', points: 1620, distance: '1.2км' },
  ];

  const renderHome = () => (
    <div className="min-h-screen flex flex-col">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-effect">
              <Icon name="Target" size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              CashHUNTER
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => setActiveSection('hunt')}>
              <Icon name="Map" size={18} className="mr-2" />
              Охота
            </Button>
            <Button variant="ghost" onClick={() => setActiveSection('leaderboard')}>
              <Icon name="Trophy" size={18} className="mr-2" />
              Топ
            </Button>
            <Button onClick={() => setActiveSection('register')} className="glow-effect">
              Войти в игру
            </Button>
          </div>
        </div>
      </nav>

      <main className="flex-1 pt-20">
        <section className="relative overflow-hidden py-32 px-6">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 blur-3xl"></div>
          <div className="container mx-auto relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
              <Badge className="px-6 py-2 text-sm font-bold bg-gradient-to-r from-primary to-accent border-0 glow-effect">
                🔥 СТАРТ ЧЕРЕЗ {timeLeft.hours}Ч {timeLeft.minutes}М {timeLeft.seconds}С
              </Badge>
              <h1 className="text-7xl md:text-8xl font-black leading-tight">
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  НАЙДИ
                </span>
                <br />
                <span className="text-foreground">ПЕРВЫМ</span>
                <br />
                <span className="bg-gradient-to-r from-accent via-secondary to-primary bg-clip-text text-transparent">
                  ЗАБЕРИ ВСЁ
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Соревнуйся за реальные призы. Регистрируйся, получай GPS координаты клада и будь быстрее конкурентов.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                <Button 
                  size="lg" 
                  onClick={() => setActiveSection('register')}
                  className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all glow-effect animate-glow-pulse"
                >
                  <Icon name="Zap" size={24} className="mr-2" />
                  Начать охоту
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => setActiveSection('hunt')}
                  className="text-lg px-8 py-6 border-2 border-secondary hover:bg-secondary/20"
                >
                  Как это работает
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6 bg-card/50">
          <div className="container mx-auto">
            <h2 className="text-4xl font-black text-center mb-16">
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                Как охотиться
              </span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { icon: 'UserPlus', title: 'Регистрация', desc: 'Создай профиль и оплати участие в охоте', color: 'from-primary to-orange-600' },
                { icon: 'MapPin', title: 'Получи координаты', desc: 'GPS точка клада появится после старта', color: 'from-secondary to-purple-600' },
                { icon: 'Zap', title: 'Забери приз', desc: 'Первый на месте получает всё вознаграждение', color: 'from-accent to-pink-600' },
              ].map((step, i) => (
                <Card key={i} className="p-8 bg-card border-border hover:border-primary/50 transition-all group animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 glow-effect group-hover:scale-110 transition-transform`}>
                    <Icon name={step.icon as any} size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-12 border border-primary/20">
              <h2 className="text-5xl font-black mb-6">Призовой фонд</h2>
              <div className="text-7xl font-black bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-4 glow-effect">
                150 000 ₽
              </div>
              <p className="text-xl text-muted-foreground mb-8">Каждая охота — это реальные деньги за победу</p>
              <Button 
                size="lg"
                onClick={() => setActiveSection('register')}
                className="bg-gradient-to-r from-accent to-secondary hover:opacity-90 text-lg px-8 py-6 glow-effect-pink"
              >
                Участвовать сейчас
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-card border-t border-border py-8 px-6">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2025 CashHUNTER. Азарт, скорость, победа.</p>
        </div>
      </footer>
    </div>
  );

  const renderRegister = () => (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <Card className="max-w-md w-full p-8 space-y-6 animate-scale-in">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto glow-effect">
            <Icon name="Target" size={32} className="text-white" />
          </div>
          <h2 className="text-3xl font-black">Регистрация</h2>
          <p className="text-muted-foreground">Присоединяйся к охоте за призами</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold mb-2 block">Игровой никнейм</label>
            <Input placeholder="ThunderHunter" className="bg-background" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-2 block">Email</label>
            <Input type="email" placeholder="hunter@example.com" className="bg-background" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-2 block">Телефон</label>
            <Input type="tel" placeholder="+7 (900) 123-45-67" className="bg-background" />
          </div>
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold">Стоимость участия</span>
              <span className="text-xl font-bold text-primary">500 ₽</span>
            </div>
            <p className="text-xs text-muted-foreground">Оплата откроет доступ к GPS координатам</p>
          </div>
        </div>

        <div className="space-y-3">
          <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 glow-effect" size="lg">
            <Icon name="CreditCard" size={20} className="mr-2" />
            Оплатить и начать
          </Button>
          <Button variant="ghost" className="w-full" onClick={() => setActiveSection('home')}>
            Назад
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderHunt = () => (
    <div className="min-h-screen px-6 py-20">
      <div className="container mx-auto max-w-6xl space-y-8">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setActiveSection('home')}>
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>
          <Badge className="px-4 py-2 bg-gradient-to-r from-primary to-accent border-0 glow-effect">
            🔥 ОХОТА АКТИВНА
          </Badge>
        </div>

        <Card className="p-8 space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black">GPS Координаты клада</h2>
            <Button className="bg-secondary hover:bg-secondary/80">
              <Icon name="Navigation" size={20} className="mr-2" />
              Открыть в картах
            </Button>
          </div>
          
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 border border-primary/20">
            <div className="grid md:grid-cols-2 gap-6 text-center">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Широта</p>
                <p className="text-3xl font-black text-primary">55.7558° N</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Долгота</p>
                <p className="text-3xl font-black text-accent">37.6173° E</p>
              </div>
            </div>
          </div>

          <HuntMap />

          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-4 bg-card/50 border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Icon name="Users" size={24} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Участников</p>
                  <p className="text-2xl font-bold">47</p>
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-card/50 border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <Icon name="Target" size={24} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">До клада</p>
                  <p className="text-2xl font-bold">2.4 км</p>
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-card/50 border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Icon name="Timer" size={24} className="text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">До конца</p>
                  <p className="text-2xl font-bold">1ч 45м</p>
                </div>
              </div>
            </Card>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <div className="flex items-start gap-4">
            <Icon name="Bell" size={24} className="text-primary" />
            <div>
              <h3 className="font-bold mb-2">Push-уведомления активны</h3>
              <p className="text-sm text-muted-foreground">Вы получите оповещение, когда другие охотники приблизятся к кладу на 500м</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderLeaderboard = () => (
    <div className="min-h-screen px-6 py-20">
      <div className="container mx-auto max-w-4xl space-y-8">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setActiveSection('home')}>
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>
          <h1 className="text-4xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Лидерборд
          </h1>
          <div className="w-24" />
        </div>

        <div className="space-y-4">
          {leaderboardData.map((player, i) => (
            <Card 
              key={i} 
              className={`p-6 transition-all hover:scale-102 animate-slide-up ${i < 3 ? 'border-primary/50 bg-gradient-to-r from-primary/5 to-accent/5' : 'bg-card'}`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center font-black text-2xl ${
                    i === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white glow-effect' :
                    i === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-800' :
                    i === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {player.rank}
                  </div>
                  <div>
                    <p className="font-bold text-lg">{player.name}</p>
                    <p className="text-sm text-muted-foreground">До клада: {player.distance}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-primary">{player.points}</p>
                  <p className="text-sm text-muted-foreground">баллов</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-8 bg-gradient-to-br from-secondary/10 to-accent/10 border-secondary/20 text-center">
          <Icon name="Trophy" size={48} className="mx-auto mb-4 text-secondary" />
          <h3 className="text-2xl font-bold mb-2">Хочешь попасть в топ?</h3>
          <p className="text-muted-foreground mb-6">Участвуй в охотах и зарабатывай баллы за каждую победу</p>
          <Button 
            onClick={() => setActiveSection('register')}
            className="bg-gradient-to-r from-secondary to-accent hover:opacity-90 glow-effect-purple"
          >
            Присоединиться
            <Icon name="ArrowRight" size={20} className="ml-2" />
          </Button>
        </Card>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="min-h-screen px-6 py-20">
      <div className="container mx-auto max-w-4xl space-y-8">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setActiveSection('home')}>
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>
          <h1 className="text-4xl font-black">Профиль</h1>
          <Button variant="ghost">
            <Icon name="Settings" size={20} />
          </Button>
        </div>

        <Card className="p-8 space-y-6 animate-fade-in">
          <div className="flex items-center gap-6">
            <Avatar className="w-24 h-24 border-4 border-primary glow-effect">
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-3xl font-black">
                TH
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-3xl font-black">ThunderHunter</h2>
              <p className="text-muted-foreground">Охотник с декабря 2025</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <Icon name="Trophy" size={32} className="text-primary mb-3" />
              <p className="text-3xl font-black mb-1">12</p>
              <p className="text-sm text-muted-foreground">Побед</p>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
              <Icon name="Target" size={32} className="text-secondary mb-3" />
              <p className="text-3xl font-black mb-1">47</p>
              <p className="text-sm text-muted-foreground">Участий</p>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
              <Icon name="Zap" size={32} className="text-accent mb-3" />
              <p className="text-3xl font-black mb-1">2450</p>
              <p className="text-sm text-muted-foreground">Баллов</p>
            </Card>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Последние охоты</h3>
            <div className="space-y-3">
              {[
                { date: '15 дек 2025', result: 'Победа', prize: '50,000 ₽', place: '1 место' },
                { date: '12 дек 2025', result: 'Участие', prize: '—', place: '4 место' },
                { date: '8 дек 2025', result: 'Победа', prize: '30,000 ₽', place: '1 место' },
              ].map((hunt, i) => (
                <Card key={i} className="p-4 bg-card/50 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Icon name="Calendar" size={20} className="text-muted-foreground" />
                    <div>
                      <p className="font-semibold">{hunt.date}</p>
                      <p className="text-sm text-muted-foreground">{hunt.place}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${hunt.result === 'Победа' ? 'text-primary' : 'text-muted-foreground'}`}>
                      {hunt.result}
                    </p>
                    {hunt.prize !== '—' && (
                      <p className="text-sm text-accent">{hunt.prize}</p>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {activeSection === 'home' && renderHome()}
      {activeSection === 'register' && renderRegister()}
      {activeSection === 'hunt' && renderHunt()}
      {activeSection === 'leaderboard' && renderLeaderboard()}
      {activeSection === 'profile' && renderProfile()}
    </div>
  );
};

export default Index;