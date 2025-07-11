
import { useState } from "react";
import { Filter, X, Search, Calendar, DollarSign, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface FilterState {
  category: string;
  organization: string;
  budgetMin: number;
  budgetMax: number;
  deadline: string;
  status: string;
}

interface TenderFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  activeFilters: FilterState;
}

export const TenderFilters = ({ isOpen, onClose, onApply, activeFilters }: TenderFiltersProps) => {
  const [filters, setFilters] = useState<FilterState>(activeFilters);

  const categories = [
    "Все категории",
    "IT оборудование", 
    "Строительство",
    "Медицина",
    "Образование",
    "Транспорт",
    "Энергетика",
    "Сельское хозяйство"
  ];

  const organizations = [
    "Все организации",
    "Министерство образования РУз",
    "Комитет автомобильных дорог", 
    "Министерство здравоохранения",
    "Министерство энергетики",
    "Министерство транспорта"
  ];

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters = {
      category: "Все категории",
      organization: "Все организации",
      budgetMin: 0,
      budgetMax: 50000000000,
      deadline: "Все сроки",
      status: "Все статусы"
    };
    setFilters(resetFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.category && filters.category !== "Все категории") count++;
    if (filters.organization && filters.organization !== "Все организации") count++;
    if (filters.budgetMin > 0 || filters.budgetMax < 50000000000) count++;
    if (filters.deadline && filters.deadline !== "Все сроки") count++;
    if (filters.status && filters.status !== "Все статусы") count++;
    return count;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto bg-white/95 backdrop-blur-sm border-yellow-200 shadow-2xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-xl">
              <Filter className="w-5 h-5 mr-2 text-yellow-600" />
              Расширенные фильтры
              {getActiveFiltersCount() > 0 && (
                <Badge className="ml-2 bg-yellow-100 text-yellow-800 border-yellow-300">
                  {getActiveFiltersCount()}
                </Badge>
              )}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-black flex items-center">
              <Building className="w-4 h-4 mr-2 text-yellow-600" />
              Категория
            </label>
            <Select value={filters.category} onValueChange={(value) => setFilters({...filters, category: value})}>
              <SelectTrigger className="border-yellow-300 focus:border-yellow-500">
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Organization Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-black flex items-center">
              <Building className="w-4 h-4 mr-2 text-yellow-600" />
              Организация
            </label>
            <Select value={filters.organization} onValueChange={(value) => setFilters({...filters, organization: value})}>
              <SelectTrigger className="border-yellow-300 focus:border-yellow-500">
                <SelectValue placeholder="Выберите организацию" />
              </SelectTrigger>
              <SelectContent>
                {organizations.map((org) => (
                  <SelectItem key={org} value={org}>
                    {org}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Budget Range Filter */}
          <div className="space-y-4">
            <label className="text-sm font-medium text-black flex items-center">
              <DollarSign className="w-4 h-4 mr-2 text-green-600" />
              Бюджет (в сумах)
            </label>
            <div className="px-3">
              <Slider
                value={[filters.budgetMin, filters.budgetMax]}
                onValueChange={([min, max]) => setFilters({...filters, budgetMin: min, budgetMax: max})}
                max={50000000000}
                min={0}
                step={1000000}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-600 mt-2">
                <span>{filters.budgetMin.toLocaleString('ru-RU')} сум</span>
                <span>{filters.budgetMax.toLocaleString('ru-RU')} сум</span>
              </div>
            </div>
          </div>

          {/* Deadline Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-black flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-yellow-600" />
              Срок подачи
            </label>
            <Select value={filters.deadline} onValueChange={(value) => setFilters({...filters, deadline: value})}>
              <SelectTrigger className="border-yellow-300 focus:border-yellow-500">
                <SelectValue placeholder="Выберите срок" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Все сроки">Все сроки</SelectItem>
                <SelectItem value="Сегодня">Заканчиваются сегодня</SelectItem>
                <SelectItem value="3 дня">До 3 дней</SelectItem>
                <SelectItem value="7 дней">До 7 дней</SelectItem>
                <SelectItem value="30 дней">До 30 дней</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-black">Статус</label>
            <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
              <SelectTrigger className="border-yellow-300 focus:border-yellow-500">
                <SelectValue placeholder="Выберите статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Все статусы">Все статусы</SelectItem>
                <SelectItem value="active">Активные</SelectItem>
                <SelectItem value="draft">Черновики</SelectItem>
                <SelectItem value="closed">Закрытые</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-yellow-200">
            <Button onClick={handleReset} variant="outline" className="flex-1 border-gray-400">
              Сбросить все
            </Button>
            <Button onClick={handleApply} className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black">
              Применить фильтры
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
