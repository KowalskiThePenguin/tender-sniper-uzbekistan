
import { Calendar, MapPin, DollarSign, Building, FileText, Clock } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

interface TenderCardProps {
  tender: Tender;
}

export const TenderCard = ({ tender }: TenderCardProps) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getDaysLeft = (dateString: string) => {
    const deadline = new Date(dateString);
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = getDaysLeft(tender.deadline);
  const isUrgent = daysLeft <= 7;

  const handleDetailsClick = () => {
    navigate(`/tender/${tender.id}`);
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border border-blue-100 hover:shadow-xl transition-all duration-300 hover:border-blue-300 group">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge 
                variant={tender.status === 'active' ? 'default' : 'secondary'}
                className={tender.status === 'active' ? 'bg-green-100 text-green-800 border-green-200' : ''}
              >
                {tender.status === 'active' ? 'Активный' : 'Неактивный'}
              </Badge>
              <Badge variant="outline" className="border-blue-200 text-blue-700">
                {tender.category}
              </Badge>
              {isUrgent && (
                <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">
                  <Clock className="w-3 h-3 mr-1" />
                  Срочно
                </Badge>
              )}
            </div>
            <h3 
              className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors cursor-pointer"
              onClick={handleDetailsClick}
            >
              {tender.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">{tender.description}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center text-gray-600">
              <Building className="w-4 h-4 mr-2 text-blue-500" />
              <span className="text-sm">{tender.organization}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-2 text-blue-500" />
              <span className="text-sm">Дедлайн: {formatDate(tender.deadline)}</span>
              <span className={`ml-2 text-xs font-medium ${isUrgent ? 'text-red-600' : 'text-gray-500'}`}>
                ({daysLeft} дн.)
              </span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center text-gray-600">
              <DollarSign className="w-4 h-4 mr-2 text-green-500" />
              <span className="text-sm font-medium">
                {Number(tender.budget).toLocaleString('ru-RU')} {tender.currency}
              </span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2 text-purple-500" />
              <span className="text-sm">Узбекистан</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
          <Button 
            onClick={handleDetailsClick}
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
          >
            <FileText className="w-4 h-4 mr-2" />
            Подробнее
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300"
          >
            Добавить в избранное
          </Button>
          <Button 
            variant="outline" 
            className="border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300"
          >
            Собрать документы
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
