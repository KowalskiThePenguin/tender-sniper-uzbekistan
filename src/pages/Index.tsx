import { useState } from "react";
import { Search, Bell, FileText, Calendar, Filter, TrendingUp, Heart, CalendarDays, Gavel, ShoppingCart, Trophy, Building, CheckCircle, Users, Award, ArrowRight, Star, Clock, MapPin, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TenderCard } from "@/components/TenderCard";
import { TenderFilters } from "@/components/TenderFilters";
import { TenderCalendar } from "@/components/TenderCalendar";
import { FavoriteTenders } from "@/components/FavoriteTenders";
import { DocumentHelper } from "@/components/DocumentHelper";
import { NotificationPanel } from "@/components/NotificationPanel";

interface FilterState {
  category: string;
  organization: string;
  budgetMin: number;
  budgetMax: number;
  deadline: string;
  status: string;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("home");
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    category: "Все категории",
    organization: "Все организации", 
    budgetMin: 0,
    budgetMax: 50000000000,
    deadline: "Все сроки",
    status: "Все статусы"
  });
  
  const mockTenders = [
    {
      id: "1",
      title: "Поставка компьютерного оборудования",
      organization: "Министерство образования РУз",
      budget: "250000000",
      currency: "сум",
      deadline: "2025-01-15",
      status: "active",
      category: "IT оборудование",
      description: "Поставка компьютеров, принтеров и сетевого оборудования для образовательных учреждений"
    },
    {
      id: "2", 
      title: "Строительство автомобильной дороги",
      organization: "Комитет автомобильных дорог",
      budget: "15000000000",
      currency: "сум",
      deadline: "2025-01-20",
      status: "active",
      category: "Строительство",
      description: "Строительство и реконструкция автомобильной дороги протяженностью 25 км"
    },
    {
      id: "3",
      title: "Поставка медицинского оборудования",
      organization: "Министерство здравоохранения",
      budget: "850000000", 
      currency: "сум",
      deadline: "2025-01-25",
      status: "active",
      category: "Медицина",
      description: "Поставка современного медицинского оборудования для поликлиник"
    }
  ];

  const mockAuctions = [
    {
      id: "a1",
      title: "Продажа государственного имущества",
      organization: "Комитет по управлению госимуществом",
      startPrice: "500000000",
      currentPrice: "750000000",
      currency: "сум",
      deadline: "2025-01-18",
      status: "active",
      category: "Недвижимость",
      description: "Аукцион по продаже административного здания в центре города"
    },
    {
      id: "a2",
      title: "Аукцион автотранспорта",
      organization: "Министерство транспорта",
      startPrice: "120000000",
      currentPrice: "180000000",
      currency: "сум",
      deadline: "2025-01-22",
      status: "active",
      category: "Транспорт",
      description: "Продажа списанных служебных автомобилей"
    }
  ];

  const mockEshop = [
    {
      id: "e1",
      title: "Канцелярские товары",
      supplier: "ООО 'ОфисПро'",
      price: "15000",
      currency: "сум",
      available: true,
      category: "Канцтовары",
      description: "Полный комплект канцелярских принадлежностей для офиса"
    },
    {
      id: "e2",
      title: "Компьютерная техника",
      supplier: "ТОО 'ТехноМарт'",
      price: "8500000",
      currency: "сум",
      available: true,
      category: "Техника",
      description: "Ноутбуки, мониторы и периферийные устройства"
    }
  ];

  const mockContests = [
    {
      id: "c1",
      title: "Конкурс архитектурных проектов",
      organization: "Министерство строительства",
      prize: "100000000",
      currency: "сум",
      deadline: "2025-02-01",
      status: "active",
      category: "Архитектура",
      description: "Разработка проекта современного культурного центра"
    },
    {
      id: "c2",
      title: "IT-конкурс разработки приложения",
      organization: "Агентство по развитию IT",
      prize: "75000000",
      currency: "сум",
      deadline: "2025-02-15",
      status: "active",
      category: "IT",
      description: "Создание мобильного приложения для государственных услуг"
    }
  ];

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const applyFilters = (tenders: typeof mockTenders) => {
    return tenders.filter(tender => {
      if (filters.category !== "Все категории" && tender.category !== filters.category) {
        return false;
      }
      
      if (filters.organization !== "Все организации" && tender.organization !== filters.organization) {
        return false;
      }
      
      const budget = parseInt(tender.budget.replace(/,/g, ''));
      if (budget < filters.budgetMin || budget > filters.budgetMax) {
        return false;
      }
      
      if (filters.status !== "Все статусы" && tender.status !== filters.status) {
        return false;
      }
      
      if (filters.deadline !== "Все сроки") {
        const deadline = new Date(tender.deadline);
        const today = new Date();
        const diffDays = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        
        switch (filters.deadline) {
          case "Сегодня":
            if (diffDays !== 0) return false;
            break;
          case "3 дня":
            if (diffDays > 3) return false;
            break;
          case "7 дней":
            if (diffDays > 7) return false;
            break;
          case "30 дней":
            if (diffDays > 30) return false;
            break;
        }
      }
      
      return true;
    });
  };

  const filteredTenders = applyFilters(mockTenders).filter(tender =>
    tender.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tender.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tender.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.category !== "Все категории") count++;
    if (filters.organization !== "Все организации") count++;
    if (filters.budgetMin > 0 || filters.budgetMax < 50000000000) count++;
    if (filters.deadline !== "Все сроки") count++;
    if (filters.status !== "Все статусы") count++;
    return count;
  };

  // Hero Section Component
  const HeroSection = () => (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary))_0%,transparent_50%)] opacity-5"></div>
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-gradient">
            Ваш надежный партнер в мире тендеров Узбекистана
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Платформа для поиска и участия в государственных закупках. Находите выгодные тендеры, управляйте документами и развивайте свой бизнес.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="gradient-primary hover:opacity-90 text-white px-8 py-4 text-lg"
              onClick={() => setActiveTab("tenders")}
            >
              <Search className="w-5 h-5 mr-2" />
              Найти тендер
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 text-lg"
            >
              <Building className="w-5 h-5 mr-2" />
              Разместить тендер
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">1000+</div>
              <div className="text-muted-foreground">Активных тендеров</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Проверенных компаний</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">₽50M+</div>
              <div className="text-muted-foreground">Объем сделок</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // How it works section
  const HowItWorksSection = () => (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-gradient">Как работает платформа</h2>
          <p className="text-xl text-muted-foreground">
            Простой и понятный процесс участия в тендерах
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="text-center group">
            <div className="w-16 h-16 mx-auto mb-6 gradient-primary rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <Search className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">1. Найдите тендер</h3>
            <p className="text-muted-foreground">Используйте удобные фильтры для поиска подходящих тендеров</p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 mx-auto mb-6 gradient-primary rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">2. Подготовьте документы</h3>
            <p className="text-muted-foreground">Загрузите необходимые документы с помощью нашего помощника</p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 mx-auto mb-6 gradient-primary rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">3. Подайте заявку</h3>
            <p className="text-muted-foreground">Отправьте заявку одним кликом через нашу платформу</p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 mx-auto mb-6 gradient-primary rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">4. Получите результат</h3>
            <p className="text-muted-foreground">Отслеживайте статус заявки и получайте уведомления</p>
          </div>
        </div>
      </div>
    </section>
  );

  // Features section
  const FeaturesSection = () => (
    <section className="py-20 gradient-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-gradient">Преимущества платформы</h2>
          <p className="text-xl text-muted-foreground">
            Всё необходимое для успешного участия в тендерах
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="border-professional shadow-professional hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Быстрый поиск</h3>
              <p className="text-muted-foreground">Находите подходящие тендеры за секунды с помощью умных фильтров</p>
            </CardContent>
          </Card>
          
          <Card className="border-professional shadow-professional hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mb-4">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Уведомления</h3>
              <p className="text-muted-foreground">Получайте мгновенные уведомления о новых тендерах в вашей сфере</p>
            </CardContent>
          </Card>
          
          <Card className="border-professional shadow-professional hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Управление документами</h3>
              <p className="text-muted-foreground">Храните и управляйте всеми документами в одном месте</p>
            </CardContent>
          </Card>
          
          <Card className="border-professional shadow-professional hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">База подрядчиков</h3>
              <p className="text-muted-foreground">Доступ к проверенной базе субподрядчиков и партнеров</p>
            </CardContent>
          </Card>
          
          <Card className="border-professional shadow-professional hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Аналитика</h3>
              <p className="text-muted-foreground">Анализируйте рынок и отслеживайте свою эффективность</p>
            </CardContent>
          </Card>
          
          <Card className="border-professional shadow-professional hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Поддержка 24/7</h3>
              <p className="text-muted-foreground">Круглосуточная техническая поддержка и консультации</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );

  // Testimonials section
  const TestimonialsSection = () => (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-gradient">Отзывы наших клиентов</h2>
          <p className="text-xl text-muted-foreground">
            Компании, которые уже работают с нами
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="border-professional shadow-professional">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                {[1,2,3,4,5].map(star => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4 italic">
                "Платформа значительно упростила процесс поиска и участия в тендерах. Экономим время и находим больше возможностей."
              </p>
              <div className="font-semibold">ООО "СтройТех"</div>
              <div className="text-sm text-muted-foreground">Генеральный подрядчик</div>
            </CardContent>
          </Card>
          
          <Card className="border-professional shadow-professional">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                {[1,2,3,4,5].map(star => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4 italic">
                "Удобный интерфейс и быстрый поиск. Теперь не пропускаем ни одного подходящего тендера в нашей области."
              </p>
              <div className="font-semibold">АО "МедТехСервис"</div>
              <div className="text-sm text-muted-foreground">Поставщик оборудования</div>
            </CardContent>
          </Card>
          
          <Card className="border-professional shadow-professional">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                {[1,2,3,4,5].map(star => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4 italic">
                "Отличная техническая поддержка и понятная система уведомлений. Рекомендуем всем коллегам по отрасли."
              </p>
              <div className="font-semibold">ТОО "ИТ Решения"</div>
              <div className="text-sm text-muted-foreground">IT подрядчик</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Company logos */}
        <div className="mt-16 pt-16 border-t border-slate-200">
          <div className="text-center mb-8">
            <p className="text-muted-foreground">Нам доверяют ведущие компании</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-2xl font-bold text-slate-400">UZAVTOYOL</div>
            <div className="text-2xl font-bold text-slate-400">TASHKENT CITY</div>
            <div className="text-2xl font-bold text-slate-400">UZTELECOM</div>
            <div className="text-2xl font-bold text-slate-400">UZBEKENERGO</div>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-professional sticky top-0 z-50 shadow-professional">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">TenderWork</h1>
                <p className="text-sm text-muted-foreground">Тендерная платформа Узбекистана</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/5">
                <Bell className="w-4 h-4 mr-2" />
                Войти
              </Button>
              <Button size="sm" className="gradient-primary hover:opacity-90 text-white">
                <FileText className="w-4 h-4 mr-2" />
                Регистрация
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      {activeTab !== "home" && (
        <div className="container mx-auto px-4 py-6">
          <div className="flex space-x-1 bg-white/80 backdrop-blur-sm p-1 rounded-xl border-professional w-fit">
            <Button
              variant={activeTab === "home" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("home")}
              className={activeTab === "home" ? "gradient-primary text-white hover:opacity-90" : "hover:bg-primary/5"}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Главная
            </Button>
            <Button
              variant={activeTab === "tenders" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("tenders")}
              className={activeTab === "tenders" ? "gradient-primary text-white hover:opacity-90" : "hover:bg-primary/5"}
            >
              <Search className="w-4 h-4 mr-2" />
              Тендеры
            </Button>
            <Button
              variant={activeTab === "auction" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("auction")}
              className={activeTab === "auction" ? "gradient-primary text-white hover:opacity-90" : "hover:bg-primary/5"}
            >
              <Gavel className="w-4 h-4 mr-2" />
              Аукционы
            </Button>
            <Button
              variant={activeTab === "eshop" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("eshop")}
              className={activeTab === "eshop" ? "gradient-primary text-white hover:opacity-90" : "hover:bg-primary/5"}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Электронный магазин
            </Button>
            <Button
              variant={activeTab === "contest" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("contest")}
              className={activeTab === "contest" ? "gradient-primary text-white hover:opacity-90" : "hover:bg-primary/5"}
            >
              <Trophy className="w-4 h-4 mr-2" />
              Конкурсы
            </Button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 pb-8">
        {activeTab === "home" && (
          <div>
            <HeroSection />
            <HowItWorksSection />
            <FeaturesSection />
            <TestimonialsSection />
          </div>
        )}

        {activeTab === "tenders" && (
          <div className="space-y-6">
            {/* Search and Filter Section */}
            <Card className="border-professional shadow-professional">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gradient">
                  Поиск активных тендеров
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      placeholder="Поиск по названию, организации или категории..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-12 border-primary/20 focus:border-primary focus:ring-primary"
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    className="h-12 px-6 border-primary/20 hover:bg-primary/5"
                    onClick={() => setShowFilters(true)}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Фильтры
                    {getActiveFiltersCount() > 0 && (
                      <Badge className="ml-2 bg-primary/10 text-primary border-primary/20">
                        {getActiveFiltersCount()}
                      </Badge>
                    )}
                  </Button>
                  <Button className="h-12 px-6 gradient-primary hover:opacity-90 text-white">
                    <Calendar className="w-4 h-4 mr-2" />
                    По дате
                  </Button>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                  <div className="text-center p-4 gradient-secondary rounded-lg border-professional">
                    <div className="text-2xl font-bold text-primary">{filteredTenders.length}</div>
                    <div className="text-sm text-muted-foreground">Найдено тендеров</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-2xl font-bold text-green-700">12</div>
                    <div className="text-sm text-muted-foreground">Новых сегодня</div>
                  </div>
                  <div className="text-center p-4 bg-teal-50 rounded-lg border border-teal-200">
                    <div className="text-2xl font-bold text-teal-700">5</div>
                    <div className="text-sm text-muted-foreground">Заканчиваются сегодня</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tender Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTenders.map((tender) => (
                <TenderCard
                  key={tender.id}
                  tender={tender}
                  isFavorite={favorites.includes(tender.id)}
                  onToggleFavorite={() => toggleFavorite(tender.id)}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === "auction" && (
          <div className="space-y-6">
            <Card className="border-professional shadow-professional">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gradient">
                  Активные аукционы
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Участвуйте в государственных аукционах по продаже имущества
                </p>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockAuctions.map((auction) => (
                <Card key={auction.id} className="border-professional shadow-professional hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                        {auction.category}
                      </Badge>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Текущая цена</div>
                        <div className="text-lg font-bold text-primary">
                          {parseInt(auction.currentPrice).toLocaleString()} {auction.currency}
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                      {auction.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {auction.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm">
                        <Building className="w-4 h-4 mr-2 text-muted-foreground" />
                        {auction.organization}
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                        До {new Date(auction.deadline).toLocaleDateString('ru-RU')}
                      </div>
                      <div className="flex items-center text-sm">
                        <DollarSign className="w-4 h-4 mr-2 text-muted-foreground" />
                        Стартовая: {parseInt(auction.startPrice).toLocaleString()} {auction.currency}
                      </div>
                    </div>
                    
                    <Button className="w-full gradient-primary hover:opacity-90 text-white">
                      Участвовать в аукционе
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "eshop" && (
          <div className="space-y-6">
            <Card className="border-professional shadow-professional">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gradient">
                  Электронный магазин
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Покупайте товары и услуги у проверенных поставщиков
                </p>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockEshop.map((item) => (
                <Card key={item.id} className="border-professional shadow-professional hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        {item.category}
                      </Badge>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">
                          {parseInt(item.price).toLocaleString()} {item.currency}
                        </div>
                        <div className="text-sm text-muted-foreground">за единицу</div>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm">
                        <Building className="w-4 h-4 mr-2 text-muted-foreground" />
                        {item.supplier}
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        В наличии
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 border-primary/20 hover:bg-primary/5">
                        Предложить цену
                      </Button>
                      <Button className="flex-1 gradient-primary hover:opacity-90 text-white">
                        Купить
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "contest" && (
          <div className="space-y-6">
            <Card className="border-professional shadow-professional">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gradient">
                  Творческие конкурсы
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Участвуйте в конкурсах и получайте призы за лучшие проекты
                </p>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockContests.map((contest) => (
                <Card key={contest.id} className="border-professional shadow-professional hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                        {contest.category}
                      </Badge>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Призовой фонд</div>
                        <div className="text-lg font-bold text-primary">
                          {parseInt(contest.prize).toLocaleString()} {contest.currency}
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                      {contest.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {contest.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm">
                        <Building className="w-4 h-4 mr-2 text-muted-foreground" />
                        {contest.organization}
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                        До {new Date(contest.deadline).toLocaleDateString('ru-RU')}
                      </div>
                    </div>
                    
                    <Button className="w-full gradient-primary hover:opacity-90 text-white">
                      <Trophy className="w-4 h-4 mr-2" />
                      Участвовать в конкурсе
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "calendar" && <TenderCalendar tenders={mockTenders} />}
        {activeTab === "favorites" && <FavoriteTenders favorites={favorites} onToggleFavorite={toggleFavorite} allTenders={mockTenders} />}
        {activeTab === "documents" && <DocumentHelper />}
        {activeTab === "notifications" && <NotificationPanel />}
      </div>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-professional py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-lg">TenderWork</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Надежная платформа для работы с тендерами в Узбекистане
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Платформа</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Поиск тендеров</li>
                <li>Размещение тендеров</li>
                <li>Аукционы</li>
                <li>Электронный магазин</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Документация</li>
                <li>Техническая поддержка</li>
                <li>Обучение</li>
                <li>FAQ</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>+998 71 123 45 67</li>
                <li>info@tenderwork.uz</li>
                <li>Ташкент, Узбекистан</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-professional pt-8 mt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 TenderWork. Все права защищены.</p>
          </div>
        </div>
      </footer>

      {/* Filters Dialog */}
      {showFilters && (
        <TenderFilters
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
          onApply={setFilters}
          activeFilters={filters}
        />
      )}
    </div>
  );
};

export default Index;