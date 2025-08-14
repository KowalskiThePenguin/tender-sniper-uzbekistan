import { useState } from "react";
import { Search, Bell, FileText, Calendar, Filter, TrendingUp, Heart, CalendarDays, Gavel, ShoppingCart, Trophy, Building } from "lucide-react";
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
  const [activeTab, setActiveTab] = useState("tenders");
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-blue-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-blue-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-black">Tender Work</h1>
                <p className="text-sm text-gray-700">Помощник по тендерам Узбекистана</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="border-primary hover:bg-blue-50">
                <Bell className="w-4 h-4 mr-2" />
                Уведомления
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
                <FileText className="w-4 h-4 mr-2" />
                Мои документы
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex space-x-1 bg-white/80 backdrop-blur-sm p-1 rounded-xl border border-blue-200 w-fit">
          <Button
            variant={activeTab === "tenders" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("tenders")}
            className={activeTab === "tenders" ? "bg-gradient-to-r from-primary to-blue-600 text-white hover:from-blue-600 hover:to-blue-700" : "hover:bg-blue-50"}
          >
            <Search className="w-4 h-4 mr-2" />
            Поиск тендеров
          </Button>
          <Button
            variant={activeTab === "calendar" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("calendar")}
            className={activeTab === "calendar" ? "bg-gradient-to-r from-primary to-blue-600 text-white hover:from-blue-600 hover:to-blue-700" : "hover:bg-blue-50"}
          >
            <CalendarDays className="w-4 h-4 mr-2" />
            Календарь
          </Button>
          <Button
            variant={activeTab === "favorites" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("favorites")}
            className={activeTab === "favorites" ? "bg-gradient-to-r from-primary to-blue-600 text-white hover:from-blue-600 hover:to-blue-700" : "hover:bg-blue-50"}
          >
            <Heart className="w-4 h-4 mr-2" />
            Избранное {favorites.length > 0 && `(${favorites.length})`}
          </Button>
          <Button
            variant={activeTab === "documents" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("documents")}
            className={activeTab === "documents" ? "bg-gradient-to-r from-primary to-blue-600 text-white hover:from-blue-600 hover:to-blue-700" : "hover:bg-blue-50"}
          >
            <FileText className="w-4 h-4 mr-2" />
            Документы
          </Button>
          <Button
            variant={activeTab === "auction" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("auction")}
            className={activeTab === "auction" ? "bg-gradient-to-r from-primary to-blue-600 text-white hover:from-blue-600 hover:to-blue-700" : "hover:bg-blue-50"}
          >
            <Gavel className="w-4 h-4 mr-2" />
            Аукцион
          </Button>
          <Button
            variant={activeTab === "tender" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("tender")}
            className={activeTab === "tender" ? "bg-gradient-to-r from-primary to-blue-600 text-white hover:from-blue-600 hover:to-blue-700" : "hover:bg-blue-50"}
          >
            <Building className="w-4 h-4 mr-2" />
            Тендер
          </Button>
          <Button
            variant={activeTab === "eshop" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("eshop")}
            className={activeTab === "eshop" ? "bg-gradient-to-r from-primary to-blue-600 text-white hover:from-blue-600 hover:to-blue-700" : "hover:bg-blue-50"}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Электронный магазин
          </Button>
          <Button
            variant={activeTab === "contest" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("contest")}
            className={activeTab === "contest" ? "bg-gradient-to-r from-primary to-blue-600 text-white hover:from-blue-600 hover:to-blue-700" : "hover:bg-blue-50"}
          >
            <Trophy className="w-4 h-4 mr-2" />
            Конкурс
          </Button>
          <Button
            variant={activeTab === "notifications" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("notifications")}
            className={activeTab === "notifications" ? "bg-gradient-to-r from-primary to-blue-600 text-white hover:from-blue-600 hover:to-blue-700" : "hover:bg-blue-50"}
          >
            <Bell className="w-4 h-4 mr-2" />
            Уведомления
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8">
        {activeTab === "tenders" && (
          <div className="space-y-6">
            {/* Search and Filter Section */}
            <Card className="bg-white/90 backdrop-blur-sm border-blue-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
                  Поиск активных тендеров
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                    <Input
                      placeholder="Поиск по названию, организации или категории..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-12 border-blue-300 focus:border-primary focus:ring-primary"
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    className="h-12 px-6 border-blue-300 hover:bg-blue-50"
                    onClick={() => setShowFilters(true)}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Фильтры
                    {getActiveFiltersCount() > 0 && (
                      <Badge className="ml-2 bg-blue-100 text-blue-800 border-blue-300">
                        {getActiveFiltersCount()}
                      </Badge>
                    )}
                  </Button>
                  <Button className="h-12 px-6 bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
                    <Calendar className="w-4 h-4 mr-2" />
                    По дате
                  </Button>
                </div>
                
                {/* Active Filters Display */}
                {getActiveFiltersCount() > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-blue-200">
                    <span className="text-sm text-gray-700 font-medium">Активные фильтры:</span>
                    {filters.category !== "Все категории" && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-300">
                        {filters.category}
                      </Badge>
                    )}
                    {filters.organization !== "Все организации" && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-300">
                        {filters.organization}
                      </Badge>
                    )}
                    {filters.status !== "Все статусы" && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-300">
                        {filters.status}
                      </Badge>
                    )}
                    {filters.deadline !== "Все сроки" && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-300">
                        {filters.deadline}
                      </Badge>
                    )}
                  </div>
                )}
                
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                  <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                    <div className="text-2xl font-bold text-blue-700">{filteredTenders.length}</div>
                    <div className="text-sm text-gray-700">Найдено тендеров</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                    <div className="text-2xl font-bold text-green-700">12</div>
                    <div className="text-sm text-gray-700">Новых сегодня</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-red-50 to-rose-50 rounded-lg border border-red-200">
                    <div className="text-2xl font-bold text-red-700">5</div>
                    <div className="text-sm text-gray-700">Заканчиваются скоро</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tenders List */}
            <div className="space-y-4">
              {filteredTenders.length === 0 ? (
                <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
                  <CardContent className="text-center py-12">
                    <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Тендеры не найдены</h3>
                    <p className="text-gray-600">Попробуйте изменить параметры поиска или фильтры</p>
                  </CardContent>
                </Card>
              ) : (
                filteredTenders.map((tender) => (
                  <TenderCard 
                    key={tender.id} 
                    tender={tender} 
                    isFavorite={favorites.includes(tender.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === "calendar" && (
          <TenderCalendar tenders={mockTenders} />
        )}

        {activeTab === "favorites" && (
          <FavoriteTenders 
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            allTenders={mockTenders}
          />
        )}

        {activeTab === "auction" && (
          <div className="space-y-4">
            <Card className="bg-white/90 backdrop-blur-sm border-blue-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent flex items-center">
                  <Gavel className="w-6 h-6 mr-2" />
                  Активные аукционы
                </CardTitle>
              </CardHeader>
            </Card>
            {mockAuctions.map((auction) => (
              <Card key={auction.id} className="bg-white/90 backdrop-blur-sm border-blue-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{auction.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{auction.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Организатор: {auction.organization}</span>
                        <Badge className="bg-blue-100 text-blue-800">{auction.category}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <div className="text-sm text-gray-600">Стартовая цена</div>
                      <div className="text-lg font-bold text-green-700">{parseInt(auction.startPrice).toLocaleString()} {auction.currency}</div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <div className="text-sm text-gray-600">Текущая цена</div>
                      <div className="text-lg font-bold text-blue-700">{parseInt(auction.currentPrice).toLocaleString()} {auction.currency}</div>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                      <div className="text-sm text-gray-600">Окончание</div>
                      <div className="text-lg font-bold text-red-700">{new Date(auction.deadline).toLocaleDateString('ru-RU')}</div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <Button className="bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
                      Сделать ставку
                    </Button>
                    <Button variant="outline" className="border-blue-300 hover:bg-blue-50">
                      Подробнее
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "tender" && (
          <div className="space-y-4">
            <Card className="bg-white/90 backdrop-blur-sm border-blue-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent flex items-center">
                  <Building className="w-6 h-6 mr-2" />
                  Государственные тендеры
                </CardTitle>
              </CardHeader>
            </Card>
            {mockTenders.map((tender) => (
              <TenderCard 
                key={tender.id} 
                tender={tender} 
                isFavorite={favorites.includes(tender.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}

        {activeTab === "eshop" && (
          <div className="space-y-4">
            <Card className="bg-white/90 backdrop-blur-sm border-blue-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent flex items-center">
                  <ShoppingCart className="w-6 h-6 mr-2" />
                  Электронный магазин
                </CardTitle>
              </CardHeader>
            </Card>
            {mockEshop.map((item) => (
              <Card key={item.id} className="bg-white/90 backdrop-blur-sm border-blue-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Поставщик: {item.supplier}</span>
                        <Badge className="bg-blue-100 text-blue-800">{item.category}</Badge>
                        {item.available && <Badge className="bg-green-100 text-green-800">В наличии</Badge>}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <div className="text-sm text-gray-600">Цена</div>
                      <div className="text-lg font-bold text-blue-700">{parseInt(item.price).toLocaleString()} {item.currency}</div>
                    </div>
                    <div className="flex space-x-3">
                      <Button className="bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
                        Добавить в корзину
                      </Button>
                      <Button variant="outline" className="border-blue-300 hover:bg-blue-50">
                        Подробнее
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "contest" && (
          <div className="space-y-4">
            <Card className="bg-white/90 backdrop-blur-sm border-blue-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent flex items-center">
                  <Trophy className="w-6 h-6 mr-2" />
                  Активные конкурсы
                </CardTitle>
              </CardHeader>
            </Card>
            {mockContests.map((contest) => (
              <Card key={contest.id} className="bg-white/90 backdrop-blur-sm border-blue-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{contest.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{contest.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Организатор: {contest.organization}</span>
                        <Badge className="bg-blue-100 text-blue-800">{contest.category}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <div className="text-sm text-gray-600">Призовой фонд</div>
                      <div className="text-lg font-bold text-green-700">{parseInt(contest.prize).toLocaleString()} {contest.currency}</div>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                      <div className="text-sm text-gray-600">Окончание приема заявок</div>
                      <div className="text-lg font-bold text-red-700">{new Date(contest.deadline).toLocaleDateString('ru-RU')}</div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <Button className="bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
                      Подать заявку
                    </Button>
                    <Button variant="outline" className="border-blue-300 hover:bg-blue-50">
                      Подробнее
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "documents" && <DocumentHelper />}
        {activeTab === "notifications" && <NotificationPanel />}
      </div>

      {/* Filters Modal */}
      <TenderFilters
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        onApply={setFilters}
        activeFilters={filters}
      />
    </div>
  );
};

export default Index;
