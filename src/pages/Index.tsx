
import { useState } from "react";
import { Search, Bell, FileText, Calendar, Filter, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TenderCard } from "@/components/TenderCard";
import { TenderFilters } from "@/components/TenderFilters";
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
  const [filters, setFilters] = useState<FilterState>({
    category: "Все категории",
    organization: "Все организации", 
    budgetMin: 0,
    budgetMax: 50000000000,
    deadline: "Все сроки",
    status: "Все статусы"
  });
  
  // Демо данные тендеров
  const mockTenders = [
    {
      id: "1",
      title: "Поставка компьютерного оборудования",
      organization: "Министерство образования РУз",
      budget: "250,000,000",
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
      budget: "15,000,000,000",
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
      budget: "850,000,000", 
      currency: "сум",
      deadline: "2025-01-25",
      status: "active",
      category: "Медицина",
      description: "Поставка современного медицинского оборудования для поликлиник"
    }
  ];

  const applyFilters = (tenders: typeof mockTenders) => {
    return tenders.filter(tender => {
      // Category filter
      if (filters.category !== "Все категории" && tender.category !== filters.category) {
        return false;
      }
      
      // Organization filter
      if (filters.organization !== "Все организации" && tender.organization !== filters.organization) {
        return false;
      }
      
      // Budget filter
      const budget = parseInt(tender.budget.replace(/,/g, ''));
      if (budget < filters.budgetMin || budget > filters.budgetMax) {
        return false;
      }
      
      // Status filter
      if (filters.status !== "Все статусы" && tender.status !== filters.status) {
        return false;
      }
      
      // Deadline filter
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">TenderHelper</h1>
                <p className="text-sm text-gray-600">Помощник по тендерам Узбекистана</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Уведомления
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <FileText className="w-4 h-4 mr-2" />
                Мои документы
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex space-x-1 bg-white/60 backdrop-blur-sm p-1 rounded-xl border border-blue-100 w-fit">
          <Button
            variant={activeTab === "tenders" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("tenders")}
            className={activeTab === "tenders" ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white" : ""}
          >
            <Search className="w-4 h-4 mr-2" />
            Поиск тендеров
          </Button>
          <Button
            variant={activeTab === "documents" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("documents")}
            className={activeTab === "documents" ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white" : ""}
          >
            <FileText className="w-4 h-4 mr-2" />
            Документы
          </Button>
          <Button
            variant={activeTab === "notifications" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("notifications")}
            className={activeTab === "notifications" ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white" : ""}
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
            <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Поиск активных тендеров
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      placeholder="Поиск по названию, организации или категории..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-12 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    className="h-12 px-6 border-blue-200 hover:bg-blue-50"
                    onClick={() => setShowFilters(true)}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Фильтры
                    {getActiveFiltersCount() > 0 && (
                      <Badge className="ml-2 bg-blue-100 text-blue-800">
                        {getActiveFiltersCount()}
                      </Badge>
                    )}
                  </Button>
                  <Button className="h-12 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    <Calendar className="w-4 h-4 mr-2" />
                    По дате
                  </Button>
                </div>
                
                {/* Active Filters Display */}
                {getActiveFiltersCount() > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200">
                    <span className="text-sm text-gray-600 font-medium">Активные фильтры:</span>
                    {filters.category !== "Все категории" && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {filters.category}
                      </Badge>
                    )}
                    {filters.organization !== "Все организации" && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {filters.organization}
                      </Badge>
                    )}
                    {filters.status !== "Все статусы" && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {filters.status}
                      </Badge>
                    )}
                    {filters.deadline !== "Все сроки" && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {filters.deadline}
                      </Badge>
                    )}
                  </div>
                )}
                
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                  <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                    <div className="text-2xl font-bold text-blue-600">{filteredTenders.length}</div>
                    <div className="text-sm text-gray-600">Найдено тендеров</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
                    <div className="text-2xl font-bold text-green-600">12</div>
                    <div className="text-sm text-gray-600">Новых сегодня</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-100">
                    <div className="text-2xl font-bold text-orange-600">5</div>
                    <div className="text-sm text-gray-600">Заканчиваются скоро</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tenders List */}
            <div className="space-y-4">
              {filteredTenders.length === 0 ? (
                <Card className="bg-white/80 backdrop-blur-sm border-blue-100">
                  <CardContent className="text-center py-12">
                    <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Тендеры не найдены</h3>
                    <p className="text-gray-600">Попробуйте изменить параметры поиска или фильтры</p>
                  </CardContent>
                </Card>
              ) : (
                filteredTenders.map((tender) => (
                  <TenderCard key={tender.id} tender={tender} />
                ))
              )}
            </div>
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
