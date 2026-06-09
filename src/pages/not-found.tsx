import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";

export default function NotFound() {
  const { t } = useLang();
  const texts = t.notFoundPage;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <SEO title={texts.title} description={texts.desc} />
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">{texts.title}</h1>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            {texts.desc}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
