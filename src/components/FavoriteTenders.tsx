
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, HeartOff, Building, Calendar, DollarSign, Trash2 } from "lucide-react";
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

interface FavoriteTendersProps {
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  allTenders: Tender[];
}

export const FavoriteTenders = ({ favorites, onToggleFavorite, allTenders }: FavoriteTendersProps) => {
  const navigate = useNavigate();

  const favoriteTenders = allTenders.filter(tender => favorites.includes(tender.id));

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

  if (favoriteTenders.length === 0) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm border-blue-100">
        <CardContent className="text-center py-12">
          <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Нет избранных тендеров</h3>
          <p className="text-gray-600">Добавьте тендеры в избранное, чтобы отслеживать их здесь</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="bg-white/90 backdrop-blur-sm border-blue-100">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Heart className="w-5 h-5 mr-2 text-red-500" />
            Избранные тендеры ({favoriteTenders.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {favoriteTenders.map((tender) => {
              const daysLeft = getDaysLeft(tender.deadline);
              const isUrgent = daysLeft <= 7;
              
              return (
                <Card key={tender.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="border-blue-200 text-blue-700">
                          {tender.category}
                        </Badge>
                        {isUrgent && (
                          <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">
                            Срочно
                          </Badge>
                        )}
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onToggleFavorite(tender.id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm leading-tight">
                      {tender.title}
                    </h4>
                    
                    <div className="space-y-2 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <Building className="w-4 h-4 mr-2 text-blue-500" />
                        <span className="truncate">{tender.organization}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                        <span>{formatDate(tender.deadline)}</span>
                        <span className={`ml-2 text-xs font-medium ${isUrgent ? 'text-red-600' : 'text-gray-500'}`}>
                          ({daysLeft} дн.)
                        </span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                        <span className="font-medium">
                          {Number(tender.budget).toLocaleString('ru-RU')} {tender.currency}
                        </span>
                      </div>
                    </div>
                    
                    <Button
                      size="sm"
                      onClick={() => navigate(`/tender/${tender.id}`)}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    >
                      Подробнее
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
