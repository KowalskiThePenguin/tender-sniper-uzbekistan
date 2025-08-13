
import { useState } from "react";
import { FileText, Download, CheckCircle2, AlertCircle, Upload, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export const DocumentHelper = () => {
  const [checkedDocs, setCheckedDocs] = useState<string[]>([]);

  const requiredDocuments = [
    {
      id: "company_registration",
      name: "Свидетельство о государственной регистрации",
      required: true,
      description: "Копия свидетельства о государственной регистрации юридического лица",
      status: "completed"
    },
    {
      id: "tax_certificate", 
      name: "Справка о налоговых обязательствах",
      required: true,
      description: "Справка об отсутствии налоговой задолженности",
      status: "pending"
    },
    {
      id: "bank_guarantee",
      name: "Банковская гарантия",
      required: true,
      description: "Банковская гарантия исполнения договора",
      status: "missing"
    },
    {
      id: "technical_proposal",
      name: "Техническое предложение",
      required: true,
      description: "Подробное техническое описание предлагаемых товаров/услуг",
      status: "pending"
    },
    {
      id: "price_proposal",
      name: "Ценовое предложение",
      required: true,
      description: "Детальная смета расходов",
      status: "missing"
    },
    {
      id: "experience_certificate",
      name: "Справка об опыте работы",
      required: false,
      description: "Документы, подтверждающие опыт выполнения аналогичных работ",
      status: "completed"
    },
    {
      id: "quality_certificates",
      name: "Сертификаты качества",
      required: false,
      description: "Сертификаты соответствия и качества продукции",
      status: "pending"
    }
  ];

  const completedCount = requiredDocuments.filter(doc => doc.status === "completed").length;
  const totalRequired = requiredDocuments.filter(doc => doc.required).length;
  const progress = (completedCount / requiredDocuments.length) * 100;

  const handleDocumentCheck = (docId: string) => {
    setCheckedDocs(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Готов</Badge>;
      case "pending":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">В работе</Badge>;
      case "missing":
        return <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">Отсутствует</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "pending":
        return <AlertCircle className="w-5 h-5 text-blue-500" />;
      case "missing":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="bg-white/90 backdrop-blur-sm border-blue-100 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Помощник по сбору документов
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
              <div className="text-2xl font-bold text-green-600">{completedCount}</div>
              <div className="text-sm text-gray-600">Готовых документов</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
              <div className="text-2xl font-bold text-blue-600">{totalRequired}</div>
              <div className="text-sm text-gray-600">Обязательных документов</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg border border-purple-100">
              <div className="text-2xl font-bold text-purple-600">{Math.round(progress)}%</div>
              <div className="text-sm text-gray-600">Готовности</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Общий прогресс</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Document Checklist */}
      <Card className="bg-white/90 backdrop-blur-sm border-blue-100 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Чек-лист документов</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {requiredDocuments.map((doc) => (
            <div key={doc.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
              <div className="flex items-start space-x-4">
                <Checkbox
                  checked={checkedDocs.includes(doc.id)}
                  onCheckedChange={() => handleDocumentCheck(doc.id)}
                  className="mt-1"
                />
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(doc.status)}
                      <h4 className="font-medium text-gray-900">{doc.name}</h4>
                      {doc.required && (
                        <Badge variant="outline" className="text-xs border-red-200 text-red-600">
                          Обязательный
                        </Badge>
                      )}
                    </div>
                    {getStatusBadge(doc.status)}
                  </div>
                  
                  <p className="text-sm text-gray-600">{doc.description}</p>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                      <Upload className="w-4 h-4 mr-2" />
                      Загрузить
                    </Button>
                    {doc.status === "completed" && (
                      <Button size="sm" variant="outline" className="border-green-200 text-green-600 hover:bg-green-50">
                        <Download className="w-4 h-4 mr-2" />
                        Скачать
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-white/90 backdrop-blur-sm border-blue-100 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Быстрые действия</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button className="h-16 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <Plus className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Создать новый пакет</div>
                <div className="text-xs opacity-80">Собрать документы для нового тендера</div>
              </div>
            </Button>
            
            <Button variant="outline" className="h-16 border-blue-200 hover:bg-blue-50">
              <Download className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Скачать шаблоны</div>
                <div className="text-xs text-gray-600">Загрузить стандартные формы</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
