
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function ArticlePage({ params }: PageProps) {
  const { locale, slug } = await params;
  
  const article = await prisma.article.findFirst({
    where: { slug },
    include: { signals: true, sources: true },
  });

  if (!article) {
    notFound();
  }

  const isUrdu = locale === "ur";
  const title = isUrdu ? article.titleUrdu || article.title : article.title;
  const content = isUrdu ? article.contentUrdu || article.content : article.content;

  return (
    <div className={`min-h-screen ${isUrdu ? "rtl font-urdu" : "ltr"}`}>
      <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href={`/${locale}`} className="text-2xl font-bold text-white">
              FinSignals
            </a>
            <a
              href={isUrdu ? "/en" : "/ur"}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
            >
              {isUrdu ? "🇺🇸 English" : "🇵🇰 اردو"}
            </a>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-6">{title}</h1>
          <div className="article-content text-gray-300 mb-8" dangerouslySetInnerHTML={{ __html: content }} />
          
          {article.signals.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {article.signals.map((signal) => (
                <div key={signal.id} className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                  <h3 className="text-white font-bold text-xl mb-4">{signal.instrument}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Entry:</span>
                      <span className="text-white">{signal.entry.toFixed(4)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Stop Loss:</span>
                      <span className="text-red-400">{signal.stopLoss.toFixed(4)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Take Profit:</span>
                      <span className="text-green-400">{signal.takeProfit1.toFixed(4)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Bias:</span>
                      <span className={`${signal.bias === "BULLISH" ? "text-green-400" : "text-red-400"}`}>
                        {signal.bias}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
