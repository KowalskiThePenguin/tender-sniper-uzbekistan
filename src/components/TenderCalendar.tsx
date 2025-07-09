
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, Building } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Tender {
  id: string;
  title: string;
  organization: string;
  budget: string;
  currency: string;
  deadline: string;
  status: string;
  category: string;
  description: string;
}

interface TenderCalendarProps {
  tenders: Tender[];
}

export const TenderCalendar = ({ tenders }: TenderCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const navigate = useNavigate();

  const getTendersForDate = (date: Date | undefined) => {
    if (!date) return [];
    
    const dateString = date.toISOString().split('T')[0];
    return tenders.filter(tender => tender.deadline === dateString);
  };

  const getDateWithTenders = () => {
    const dates = new Set<string>();
    tenders.forEach(tender => {
      if (tender.deadline) {
        dates.add(tender.deadline);
      }
    });
    return Array.from(dates).map(date => new Date(date));
  };

  const getDaysLeft = (dateString: string) => {
    const deadline = new Date(dateString);
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const selectedDateTenders = getTendersForDate(selectedDate);
  const datesWithTenders = getDateWithTenders();

  const modifiers = {
    hasTenders: datesWithTenders
  };

  const modifiersClassNames = {
    hasTenders: "bg-blue-100 text-blue-900 font-medium"
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-white/90 backdrop-blur-sm border-blue-100">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <CalendarDays className="w-5 h-5 mr-2 text-blue-500" />
            Календарь дедлайнов
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            modifiers={modifiers}
            modifiersClassNames={modifiersClassNames}
            className="rounded-md border"
          />
          <div className="mt-4 text-sm text-gray-600">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-100 rounded mr-2"></div>
              Даты с дедлайнами тендеров
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/90 backdrop-blur-sm border-blue-100">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Clock className="w-5 h-5 mr-2 text-blue-500" />
            Тендеры на {selectedDate?.toLocaleDateString('ru-RU')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedDateTenders.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Clock className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p>На эту дату нет дедлайнов тендеров</p>
            </div>
          ) : (
            <div className="space-y-4">
              {selectedDateTenders.map((tender) => {
                const daysLeft = getDaysLeft(tender.deadline);
                const isUrgent = daysLeft <= 7;
                
                return (
                  <div
                    key={tender.id}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900 text-sm">{tender.title}</h4>
                      {isUrgent && (
                        <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">
                          Срочно
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <Building className="w-4 h-4 mr-1" />
                      {tender.organization}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-600 font-medium">
                        {Number(tender.budget).toLocaleString('ru-RU')} {tender.currency}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => navigate(`/tender/${tender.id}`)}
                        className="text-blue-600 border-blue-200 hover:bg-blue-50"
                      >
                        Подробнее
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
