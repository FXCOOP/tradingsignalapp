'use client';

import { useTranslations } from 'next-intl';
import { TrendingUp, TrendingDown, Minus, Target, Shield } from 'lucide-react';

interface Signal {
  id: string;
  instrument: string;
  class: string;
  bias: string;
  entry: number;
  stopLoss: number;
  takeProfit1: number;
  takeProfit2?: number;
  timeframe: string;
  confidence: number;
}

interface SignalCardProps {
  signal: Signal;
  locale: string;
  compact?: boolean;
}

export default function SignalCard({ signal, locale, compact = false }: SignalCardProps) {
  const t = useTranslations('signals');

  const getBiasIcon = (bias: string) => {
    switch (bias.toUpperCase()) {
      case 'BULLISH':
        return <TrendingUp className="w-4 h-4 text-success-400" />;
      case 'BEARISH':
        return <TrendingDown className="w-4 h-4 text-danger-400" />;
      default:
        return <Minus className="w-4 h-4 text-warning-400" />;
    }
  };

  const getBiasColor = (bias: string) => {
    switch (bias.toUpperCase()) {
      case 'BULLISH':
        return 'text-success-400 bg-success-500/20 border-success-500/30';
      case 'BEARISH':
        return 'text-danger-400 bg-danger-500/20 border-danger-500/30';
      default:
        return 'text-warning-400 bg-warning-500/20 border-warning-500/30';
    }
  };

  const getBiasText = (bias: string) => {
    switch (bias.toUpperCase()) {
      case 'BULLISH':
        return locale === 'ur' ? 'تیزی' : 'Bullish';
      case 'BEARISH':
        return locale === 'ur' ? 'مندی' : 'Bearish';
      default:
        return locale === 'ur' ? 'غیر جانبدار' : 'Neutral';
    }
  };

  const formatPrice = (price: number) => {
    // Format price based on instrument type
    if (signal.instrument.includes('USD') || signal.instrument.includes('EUR') || signal.instrument.includes('GBP')) {
      return price.toFixed(5);
    }
    return price.toFixed(2);
  };

  if (compact) {
    return (
      <div className="signal-card bg-gray-800/30 border border-gray-700 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="font-semibold text-white">{signal.instrument}</span>
            <span className={`px-2 py-1 text-xs font-medium rounded border ${getBiasColor(signal.bias)}`}>
              {getBiasText(signal.bias)}
            </span>
          </div>
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            <Shield className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-400">{signal.confidence}/10</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 text-sm">
          <div>
            <div className="text-gray-400 text-xs mb-1">
              {locale === 'ur' ? 'انٹری' : 'Entry'}
            </div>
            <div className="text-white font-medium">{formatPrice(signal.entry)}</div>
          </div>
          <div>
            <div className="text-gray-400 text-xs mb-1">
              {locale === 'ur' ? 'سٹاپ لاس' : 'SL'}
            </div>
            <div className="text-danger-400 font-medium">{formatPrice(signal.stopLoss)}</div>
          </div>
          <div>
            <div className="text-gray-400 text-xs mb-1">
              {locale === 'ur' ? 'ٹی پی' : 'TP'}
            </div>
            <div className="text-success-400 font-medium">{formatPrice(signal.takeProfit1)}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="signal-card bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          {getBiasIcon(signal.bias)}
          <div>
            <h3 className="text-xl font-bold text-white">{signal.instrument}</h3>
            <div className="flex items-center space-x-2 rtl:space-x-reverse mt-1">
              <span className="text-sm text-gray-400">{signal.class}</span>
              <span className="text-gray-600">•</span>
              <span className="text-sm text-gray-400">{signal.timeframe}</span>
            </div>
          </div>
        </div>

        <div className="text-right rtl:text-left">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getBiasColor(signal.bias)}`}>
            {getBiasText(signal.bias)}
          </div>
          <div className="flex items-center justify-end rtl:justify-start space-x-1 rtl:space-x-reverse mt-2">
            <Shield className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">
              {signal.confidence}/10 {locale === 'ur' ? 'اعتماد' : 'confidence'}
            </span>
          </div>
        </div>
      </div>

      {/* Signal Details */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-900/50 rounded-lg p-4">
          <div className="text-gray-400 text-sm mb-2">
            {t('entry')}
          </div>
          <div className="text-white text-lg font-semibold">
            {formatPrice(signal.entry)}
          </div>
        </div>

        <div className="bg-gray-900/50 rounded-lg p-4">
          <div className="text-gray-400 text-sm mb-2">
            {t('stopLoss')}
          </div>
          <div className="text-danger-400 text-lg font-semibold">
            {formatPrice(signal.stopLoss)}
          </div>
        </div>

        <div className="bg-gray-900/50 rounded-lg p-4">
          <div className="text-gray-400 text-sm mb-2">
            {t('takeProfit')} 1
          </div>
          <div className="text-success-400 text-lg font-semibold">
            {formatPrice(signal.takeProfit1)}
          </div>
        </div>

        {signal.takeProfit2 && (
          <div className="bg-gray-900/50 rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-2">
              {t('takeProfit')} 2
            </div>
            <div className="text-success-400 text-lg font-semibold">
              {formatPrice(signal.takeProfit2)}
            </div>
          </div>
        )}
      </div>

      {/* Risk/Reward Ratio */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">
            {locale === 'ur' ? 'خطرہ/منافع نسبت' : 'Risk/Reward Ratio'}
          </span>
          <span className="text-gray-300">
            1:{((signal.takeProfit1 - signal.entry) / Math.abs(signal.entry - signal.stopLoss)).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}