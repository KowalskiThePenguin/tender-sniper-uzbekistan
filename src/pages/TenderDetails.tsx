
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, DollarSign, Building, FileText, Clock, Users, Target, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const TenderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Демо данные тендеров (в реальном приложении будут загружаться из API)
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
      description: "Поставка компьютеров, принтеров и сетевого оборудования для образовательных учреждений",
      fullDescription: "Министерство образования Республики Узбекистан объявляет открытый конкурс на поставку компьютерного оборудования. Требуется поставка 500 компьютеров, 100 принтеров, сетевого оборудования и сопутствующих товаров для оснащения учебных заведений.",
      requirements: [
        "Опыт работы в сфере IT не менее 3 лет",
        "Наличие лицензии на торговую деятельность",
        "Гарантия на оборудование не менее 2 лет",
        "Сертификаты качества на все виды оборудования"
      ],
      specifications: [
        "Компьютеры: Intel Core i5, 8GB RAM, 256GB SSD",
        "Принтеры: Лазерные, черно-белые, А4",
        "Сетевое оборудование: Коммутаторы 24-port",
        "Мониторы: 21.5 дюйма, Full HD"
      ],
      documents: [
        "Техническое задание",
        "Форма заявки",
        "Образец договора",
        "Спецификация оборудования"
      ],
      publishDate: "2024-12-15",
      participantsCount: 12
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
      description: "Строительство и реконструкция автомобильной дороги протяженностью 25 км",
      fullDescription: "Комитет автомобильных дорог при Министерстве транспорта объявляет тендер на строительство автомобильной дороги. Проект включает строительство 25 км новой дороги и реконструкцию существующих участков.",
      requirements: [
        "Опыт строительства дорог не менее 5 лет",
        "Наличие строительной лицензии категории А",
        "Собственная техника и оборудование",
        "Штат квалифицированных специалистов"
      ],
      specifications: [
        "Протяженность: 25 км",
        "Ширина проезжей части: 7 м",
        "Тип покрытия: асфальтобетон",
        "Включает мосты и водопропускные трубы"
      ],
      documents: [
        "Проектная документация",
        "Смета работ",
        "Технические условия",
        "Экологическое заключение"
      ],
      publishDate: "2024-12-10",
      participantsCount: 8
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
      description: "Поставка современного медицинского оборудования для поликлиник",
      fullDescription: "Министерство здравоохранения проводит конкурс на поставку медицинского оборудования для районных поликлиник. Требуется современное диагностическое и лечебное оборудование.",
      requirements: [
        "Дилерские соглашения с производителями",
        "Сертификаты соответствия МЗ РУз",
        "Опыт поставок медтехники не менее 2 лет",
        "Сервисное обслуживание в течение 5 лет"
      ],
      specifications: [
        "УЗИ аппараты: 4D, цветной допплер",
        "Рентген аппараты: цифровые",
        "Анализаторы крови: автоматические",
        "Стоматологические установки"
      ],
      documents: [
        "Техническое задание",
        "Сертификаты оборудования",
        "Гарантийные обязательства",
        "План поставки"
      ],
      publishDate: "2024-12-12",
      participantsCount: 15
    }
  ];

  const tender = mockTenders.find(t => t.id === id);

  if (!tender) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Тендер не найден</h3>
            <p className="text-gray-600 mb-4">Тендер с указанным ID не существует</p>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Вернуться к поиску
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate('/')} className="text-blue-600 hover:bg-blue-50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад к поиску
            </Button>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="border-green-200 text-green-600 hover:bg-green-50">
                <FileText className="w-4 h-4 mr-2" />
                Собрать документы
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                Подать заявку
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Main Info Card */}
        <Card className="mb-8 bg-white/90 backdrop-blur-sm border-blue-100 shadow-xl">
          <CardHeader className="pb-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
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
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{tender.title}</h1>
                <p className="text-gray-600 text-lg leading-relaxed">{tender.fullDescription}</p>
              </div>

              <div className="lg:w-80 space-y-4">
                <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {Number(tender.budget).toLocaleString('ru-RU')}
                        </div>
                        <div className="text-sm text-gray-600">{tender.currency}</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${isUrgent ? 'text-red-600' : 'text-gray-900'}`}>
                          {daysLeft}
                        </div>
                        <div className="text-sm text-gray-600">дней осталось</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center text-gray-600">
                    <Building className="w-5 h-5 mr-3 text-blue-500" />
                    <span>{tender.organization}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-3 text-blue-500" />
                    <span>Дедлайн: {formatDate(tender.deadline)}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-3 text-purple-500" />
                    <span>Узбекистан</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-5 h-5 mr-3 text-green-500" />
                    <span>{tender.participantsCount} участников</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Requirements */}
          <Card className="bg-white/90 backdrop-blur-sm border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Target className="w-5 h-5 mr-2 text-blue-500" />
                Требования
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {tender.requirements.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-4 h-4 mt-1 mr-3 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Specifications */}
          <Card className="bg-white/90 backdrop-blur-sm border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <FileText className="w-5 h-5 mr-2 text-blue-500" />
                Спецификации
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {tender.specifications.map((spec, index) => (
                  <li key={index} className="text-sm text-gray-700 border-l-2 border-blue-200 pl-3">
                    {spec}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card className="bg-white/90 backdrop-blur-sm border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <FileText className="w-5 h-5 mr-2 text-blue-500" />
                Документы
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tender.documents.map((doc, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left h-auto p-3 border-blue-200 hover:bg-blue-50"
                  >
                    <FileText className="w-4 h-4 mr-3 text-blue-500" />
                    <span className="text-sm">{doc}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <Card className="mt-8 bg-white/90 backdrop-blur-sm border-blue-100">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8">
                <FileText className="w-5 h-5 mr-2" />
                Подать заявку
              </Button>
              <Button variant="outline" size="lg" className="border-green-200 text-green-600 hover:bg-green-50 px-8">
                <CheckCircle className="w-5 h-5 mr-2" />
                Собрать документы
              </Button>
              <Button variant="outline" size="lg" className="border-blue-200 text-blue-600 hover:bg-blue-50 px-8">
                Добавить в избранное
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TenderDetails;
