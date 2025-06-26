
import { Bell, Clock, TrendingUp, FileText, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const NotificationPanel = () => {
  const notifications = [
    {
      id: "1",
      type: "new_tender",
      title: "Новый тендер в вашей категории",
      message: "Опубликован тендер на поставку офисной мебели стоимостью 150,000,000 сум",
      time: "5 минут назад",
      priority: "high",
      read: false
    },
    {
      id: "2", 
      type: "deadline",
      title: "Приближается дедлайн",
      message: "До окончания подачи заявок на тендер 'Поставка компьютерного оборудования' осталось 2 дня",
      time: "1 час назад",
      priority: "urgent",
      read: false
    },
    {
      id: "3",
      type: "document",
      title: "Документ требует обновления",
      message: "Срок действия справки о налоговых обязательствах истекает через 10 дней",
      time: "3 часа назад", 
      priority: "medium",
      read: true
    },
    {
      id: "4",
      type: "status",
      title: "Результаты тендера опубликованы",
      message: "Опубликованы результаты тендера 'Строительство автомобильной дороги'",
      time: "1 день назад",
      priority: "low",
      read: true
    },
    {
      id: "5",
      type: "new_tender",
      title: "Рекомендуемый тендер",
      message: "Найден тендер, соответствующий вашему профилю: 'Поставка канцелярских товаров'",
      time: "2 дня назад",
      priority: "medium",
      read: true
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "new_tender":
        return <TrendingUp className="w-5 h-5 text-blue-500" />;
      case "deadline":
        return <Clock className="w-5 h-5 text-red-500" />;
      case "document":
        return <FileText className="w-5 h-5 text-orange-500" />;
      case "status":
        return <Bell className="w-5 h-5 text-green-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">Срочно</Badge>;
      case "high":
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">Важное</Badge>;
      case "medium":
        return <Badge variant="outline" className="border-yellow-200 text-yellow-700">Средний</Badge>;
      case "low":
        return <Badge variant="outline" className="border-gray-200 text-gray-600">Низкий</Badge>;
      default:
        return null;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-white/90 backdrop-blur-sm border-blue-100 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Уведомления
            </CardTitle>
            <div className="flex items-center space-x-3">
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                {unreadCount} непрочитанных
              </Badge>
              <Button variant="outline" size="sm">
                Отметить все как прочитанные
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
              <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-blue-600">12</div>
              <div className="text-sm text-gray-600">Новые тендеры</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-100">
              <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-red-600">3</div>
              <div className="text-sm text-gray-600">Срочные</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-100">
              <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-orange-600">5</div>
              <div className="text-sm text-gray-600">Дедлайны</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
              <FileText className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-green-600">8</div>
              <div className="text-sm text-gray-600">Документы</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notification) => (
          <Card 
            key={notification.id} 
            className={`transition-all duration-300 hover:shadow-lg cursor-pointer ${
              !notification.read 
                ? "bg-blue-50/80 backdrop-blur-sm border-blue-200 shadow-md" 
                : "bg-white/80 backdrop-blur-sm border-gray-200"
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                      {notification.title}
                    </h4>
                    <div className="flex items-center space-x-2">
                      {getPriorityBadge(notification.priority)}
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                  </div>
                  
                  <p className={`text-sm mb-2 ${!notification.read ? 'text-gray-700' : 'text-gray-600'}`}>
                    {notification.message}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{notification.time}</span>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
                        Подробнее
                      </Button>
                      {!notification.read && (
                        <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-50">
                          Отметить прочитанным
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
          Загрузить еще уведомления
        </Button>
      </div>
    </div>
  );
};
