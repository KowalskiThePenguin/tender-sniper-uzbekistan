
import { Calendar, MapPin, DollarSign, Building, FileText, Clock, Heart } from "lucide-react";
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
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

export const TenderCard = ({ tender, isFavorite = false, onToggleFavorite }: TenderCardProps) => {
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

  const handleFavoriteClick = () => {
    if (onToggleFavorite) {
      onToggleFavorite(tender.id);
    }
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm border border-yellow-200 hover:shadow-xl transition-all duration-300 hover:border-yellow-400 group">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge 
                variant={tender.status === 'active' ? 'default' : 'secondary'}
                className={tender.status === 'active' ? 'bg-green-100 text-green-800 border-green-300' : 'bg-gray-100 text-gray-800 border-gray-300'}
              >
                {tender.status === 'active' ? 'Активный' : 'Неактивный'}
              </Badge>
              <Badge variant="outline" className="border-yellow-400 text-yellow-800 bg-yellow-50">
                {tender.category}
              </Badge>
              {isUrgent && (
                <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-300">
                  <Clock className="w-3 h-3 mr-1" />
                  Срочно
                </Badge>
              )}
            </div>
            <h3 
              className="text-lg font-semibold text-black mb-2 group-hover:text-yellow-700 transition-colors cursor-pointer"
              onClick={handleDetailsClick}
            >
              {tender.title}
            </h3>
            <p className="text-sm text-gray-700 line-clamp-2">{tender.description}</p>
          </div>
          {onToggleFavorite && (
            <Button
              size="sm"
              variant="ghost"
              onClick={handleFavoriteClick}
              className={`ml-2 ${isFavorite ? 'text-red-500 hover:text-red-600' : 'text-gray-500 hover:text-red-500'}`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center text-gray-700">
              <Building className="w-4 h-4 mr-2 text-yellow-600" />
              <span className="text-sm">{tender.organization}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Calendar className="w-4 h-4 mr-2 text-yellow-600" />
              <span className="text-sm">Дедлайн: {formatDate(tender.deadline)}</span>
              <span className={`ml-2 text-xs font-medium ${isUrgent ? 'text-red-600' : 'text-gray-600'}`}>
                ({daysLeft} дн.)
              </span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center text-gray-700">
              <DollarSign className="w-4 h-4 mr-2 text-green-600" />
              <span className="text-sm font-medium">
                {Number(tender.budget).toLocaleString('ru-RU')} {tender.currency}
              </span>
            </div>
            <div className="flex items-center text-gray-700">
              <MapPin className="w-4 h-4 mr-2 text-purple-600" />
              <span className="text-sm">Узбекистан</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-yellow-200">
          <Button 
            onClick={handleDetailsClick}
            className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 text-black"
          >
            <FileText className="w-4 h-4 mr-2" />
            Подробнее
          </Button>
          <Button 
            variant="outline" 
            className="border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400"
          >
            Собрать документы
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
