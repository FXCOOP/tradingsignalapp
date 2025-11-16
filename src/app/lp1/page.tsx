'use client'

import { useEffect } from 'react'
import Script from 'next/script'

export default function LP1Page() {
  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2" />

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #1a1a1a;
          background: #fff;
        }

        .hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 60px 20px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0.3;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .hero-badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          padding: 8px 20px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 20px;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .hero h1 {
          font-size: 48px;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 20px;
          text-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .hero-highlight {
          color: #ffd700;
          display: block;
        }

        .hero p {
          font-size: 20px;
          margin-bottom: 30px;
          opacity: 0.95;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 40px;
          margin-top: 40px;
          flex-wrap: wrap;
        }

        .stat {
          text-align: center;
        }

        .stat-number {
          font-size: 36px;
          font-weight: 800;
          color: #ffd700;
          display: block;
        }

        .stat-label {
          font-size: 14px;
          opacity: 0.9;
        }

        .form-section {
          background: white;
          padding: 60px 20px;
        }

        .form-container {
          max-width: 600px;
          margin: 0 auto;
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.1);
          padding: 40px;
          border: 1px solid #e5e7eb;
        }

        .form-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .form-header h2 {
          font-size: 28px;
          color: #1a1a1a;
          margin-bottom: 10px;
        }

        .form-header p {
          color: #6b7280;
          font-size: 16px;
        }

        .trust-line {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 15px;
          color: #10b981;
          font-size: 14px;
          font-weight: 600;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          font-weight: 600;
          margin-bottom: 8px;
          color: #374151;
          font-size: 14px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        input, select {
          width: 100%;
          padding: 14px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 16px;
          transition: all 0.2s;
          font-family: inherit;
        }

        input:focus, select:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .submit-btn {
          width: 100%;
          padding: 18px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          margin-top: 10px;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .form-footer {
          text-align: center;
          margin-top: 20px;
          font-size: 13px;
          color: #6b7280;
        }

        .benefits {
          background: #f9fafb;
          padding: 80px 20px;
        }

        .section-title {
          text-align: center;
          font-size: 36px;
          font-weight: 800;
          margin-bottom: 50px;
          color: #1a1a1a;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .benefit-card {
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          transition: all 0.3s;
        }

        .benefit-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .benefit-icon {
          font-size: 40px;
          margin-bottom: 15px;
        }

        .benefit-card h3 {
          font-size: 20px;
          margin-bottom: 10px;
          color: #1a1a1a;
        }

        .benefit-card p {
          color: #6b7280;
          line-height: 1.6;
        }

        .social-proof {
          background: white;
          padding: 80px 20px;
        }

        .testimonials {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .testimonial {
          background: #f9fafb;
          padding: 30px;
          border-radius: 12px;
          border-left: 4px solid #667eea;
        }

        .testimonial-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 15px;
        }

        .testimonial-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 20px;
        }

        .testimonial-name {
          font-weight: 600;
          color: #1a1a1a;
        }

        .testimonial-role {
          font-size: 14px;
          color: #6b7280;
        }

        .testimonial-stars {
          color: #fbbf24;
          margin-bottom: 10px;
        }

        .testimonial-text {
          color: #4b5563;
          line-height: 1.6;
          font-style: italic;
        }

        .trust-section {
          background: #f9fafb;
          padding: 60px 20px;
          text-align: center;
        }

        .trust-badges {
          display: flex;
          justify-content: center;
          gap: 50px;
          flex-wrap: wrap;
          max-width: 900px;
          margin: 0 auto;
        }

        .trust-badge {
          text-align: center;
        }

        .trust-badge-icon {
          font-size: 50px;
          margin-bottom: 10px;
        }

        .trust-badge-text {
          font-size: 14px;
          font-weight: 600;
          color: #6b7280;
        }

        .success-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          z-index: 10000;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .success-overlay.active {
          display: flex;
        }

        .success-message {
          background: white;
          padding: 50px;
          border-radius: 16px;
          text-align: center;
          max-width: 500px;
          animation: slideUp 0.5s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .success-icon {
          font-size: 80px;
          margin-bottom: 20px;
        }

        .success-message h3 {
          font-size: 28px;
          color: #1a1a1a;
          margin-bottom: 15px;
        }

        .success-message p {
          color: #6b7280;
          line-height: 1.6;
        }

        /* Advanced Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
          }
          50% {
            box-shadow: 0 0 40px rgba(102, 126, 234, 0.8);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        @keyframes fillProgress {
          from { width: 0%; }
          to { width: 53%; }
        }

        /* Scroll Reveal Classes */
        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .reveal.active {
          opacity: 1;
          transform: translateY(0);
        }

        /* Enhanced Hero Animations */
        .hero-badge {
          animation: fadeInDown 0.8s ease-out, pulse 2s ease-in-out infinite 1s;
        }

        .hero h1 {
          animation: fadeInUp 0.8s ease-out 0.2s both;
        }

        .hero p {
          animation: fadeInUp 0.8s ease-out 0.4s both;
        }

        .hero-stats {
          animation: fadeInUp 0.8s ease-out 0.6s both;
        }

        .stat {
          transition: all 0.3s ease;
        }

        .stat:hover {
          transform: scale(1.1);
        }

        /* How It Works Section */
        .how-it-works {
          background: white;
          padding: 80px 20px;
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 40px;
          max-width: 1200px;
          margin: 0 auto 40px;
        }

        .step-card {
          background: white;
          padding: 40px 30px;
          border-radius: 16px;
          border: 2px solid #e5e7eb;
          text-align: center;
          position: relative;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          overflow: hidden;
        }

        .step-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #667eea, #764ba2);
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 0;
        }

        .step-card > * {
          position: relative;
          z-index: 1;
        }

        .step-card:hover {
          transform: translateY(-15px) scale(1.05);
          box-shadow: 0 20px 50px rgba(102, 126, 234, 0.3);
          border-color: transparent;
        }

        .step-card:hover::before {
          opacity: 1;
        }

        .step-card:hover h3,
        .step-card:hover p,
        .step-card:hover .step-number {
          color: white;
        }

        .step-number {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          font-weight: 800;
          margin-bottom: 20px;
          animation: bounce 2s ease-in-out infinite;
        }

        .step-icon {
          font-size: 48px;
          margin-bottom: 15px;
          animation: float 3s ease-in-out infinite;
        }

        .step-card h3 {
          font-size: 22px;
          color: #1a1a1a;
          margin-bottom: 12px;
          transition: color 0.4s ease;
        }

        .step-card p {
          color: #6b7280;
          line-height: 1.6;
          transition: color 0.4s ease;
        }

        .steps-cta {
          text-align: center;
          margin-top: 40px;
        }

        .steps-cta .submit-btn {
          width: auto;
          padding: 18px 50px;
          font-size: 18px;
          animation: pulse 2s ease-in-out infinite;
        }

        /* Transformation Section */
        .transformation {
          background: #f9fafb;
          padding: 80px 20px;
        }

        .transformation-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
          gap: 40px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .transformation-card {
          background: white;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          transition: all 0.4s ease;
        }

        .transformation-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.15);
        }

        .transformation-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 30px;
        }

        .transformation-before,
        .transformation-after {
          flex: 1;
        }

        .transformation-label {
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 15px;
          letter-spacing: 1px;
        }

        .transformation-before .transformation-label {
          color: #ef4444;
        }

        .transformation-after .transformation-label {
          color: #10b981;
        }

        .transformation-metric {
          margin-bottom: 15px;
        }

        .metric-value {
          font-size: 36px;
          font-weight: 800;
          margin-bottom: 5px;
        }

        .metric-value.negative {
          color: #ef4444;
        }

        .metric-value.positive {
          color: #10b981;
          animation: pulse 2s ease-in-out infinite;
        }

        .metric-label {
          font-size: 14px;
          color: #6b7280;
        }

        .transformation-arrow {
          font-size: 48px;
          color: #667eea;
          text-align: center;
          animation: bounce 2s ease-in-out infinite;
        }

        .transformation-info {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 2px solid #e5e7eb;
          color: #6b7280;
          font-size: 14px;
        }

        /* Live Results Section */
        .live-results {
          background: white;
          padding: 80px 20px;
        }

        .results-ticker {
          background: linear-gradient(135deg, #667eea, #764ba2);
          padding: 30px;
          border-radius: 16px;
          margin-bottom: 40px;
          overflow: hidden;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }

        .ticker-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px 20px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          margin-bottom: 15px;
          animation: slideInFromRight 0.8s ease-out;
        }

        .ticker-item:last-child {
          margin-bottom: 0;
        }

        .ticker-icon {
          font-size: 24px;
        }

        .ticker-text {
          color: white;
          font-size: 16px;
        }

        .live-stats {
          display: flex;
          justify-content: center;
          gap: 60px;
          flex-wrap: wrap;
          max-width: 1200px;
          margin: 0 auto;
        }

        .live-stat {
          text-align: center;
        }

        .live-stat-value {
          font-size: 48px;
          font-weight: 800;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: block;
          margin-bottom: 10px;
        }

        .live-stat-label {
          font-size: 16px;
          color: #6b7280;
        }

        /* Guarantee Section */
        .guarantee {
          background: linear-gradient(135deg, #10b981, #059669);
          padding: 80px 20px;
          color: white;
          position: relative;
          overflow: hidden;
        }

        .guarantee::before {
          content: '';
          position: absolute;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          border-radius: 50%;
          top: -250px;
          right: -250px;
          animation: float 6s ease-in-out infinite;
        }

        .guarantee-content {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .guarantee-icon {
          font-size: 80px;
          margin-bottom: 20px;
          animation: float 3s ease-in-out infinite;
        }

        .guarantee h2 {
          font-size: 36px;
          font-weight: 800;
          margin-bottom: 20px;
        }

        .guarantee p {
          font-size: 18px;
          line-height: 1.6;
          opacity: 0.95;
          margin-bottom: 40px;
        }

        .guarantee-features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .guarantee-feature {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: 20px;
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .guarantee-feature:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateX(10px);
        }

        .guarantee-feature .feature-icon {
          width: 30px;
          height: 30px;
          background: white;
          color: #10b981;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          flex-shrink: 0;
        }

        /* Limited Offer Section */
        .limited-offer {
          background: white;
          padding: 80px 20px;
        }

        .offer-card {
          max-width: 700px;
          margin: 0 auto;
          background: linear-gradient(135deg, #fff 0%, #f9fafb 100%);
          border: 3px solid #667eea;
          border-radius: 20px;
          padding: 50px 40px;
          text-align: center;
          box-shadow: 0 20px 60px rgba(102, 126, 234, 0.2);
          position: relative;
          overflow: hidden;
        }

        .offer-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: shimmer 3s infinite;
        }

        .offer-badge {
          display: inline-block;
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: white;
          padding: 10px 30px;
          border-radius: 25px;
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 1px;
          margin-bottom: 20px;
          animation: pulse 2s ease-in-out infinite;
        }

        .offer-card h2 {
          font-size: 32px;
          font-weight: 800;
          color: #1a1a1a;
          margin-bottom: 20px;
        }

        .countdown-number {
          color: #ef4444;
          font-size: 48px;
        }

        .urgency-bar {
          width: 100%;
          height: 12px;
          background: #e5e7eb;
          border-radius: 10px;
          overflow: hidden;
          margin: 30px 0;
        }

        .urgency-fill {
          height: 100%;
          background: linear-gradient(90deg, #ef4444, #dc2626);
          width: 53%;
          border-radius: 10px;
          animation: fillProgress 3s ease-out;
        }

        .urgency-labels {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: #6b7280;
          margin-bottom: 30px;
        }

        .spots-taken {
          color: #ef4444;
          font-weight: 600;
        }

        .spots-remaining {
          color: #10b981;
          font-weight: 600;
        }

        .offer-timer {
          background: linear-gradient(135deg, #f9fafb, #fff);
          border: 2px solid #e5e7eb;
          border-radius: 16px;
          padding: 30px;
          margin: 30px 0;
        }

        .timer-label {
          font-size: 16px;
          color: #6b7280;
          margin-bottom: 15px;
          font-weight: 600;
        }

        .timer-display {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
        }

        .timer-unit {
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 12px;
          padding: 20px;
          min-width: 80px;
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }

        .timer-value {
          font-size: 48px;
          font-weight: 800;
          color: white;
          line-height: 1;
        }

        .timer-label-small {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.8);
          margin-top: 4px;
        }

        .timer-separator {
          font-size: 48px;
          font-weight: 800;
          color: #667eea;
          animation: blink 1s ease-in-out infinite;
        }

        .pulse-btn {
          animation: pulse 2s ease-in-out infinite !important;
        }

        @media (max-width: 768px) {
          .hero h1 {
            font-size: 32px;
          }

          .hero p {
            font-size: 16px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .hero-stats {
            gap: 20px;
          }

          .stat-number {
            font-size: 28px;
          }

          .transformation-grid {
            grid-template-columns: 1fr;
          }

          .transformation-header {
            flex-direction: column;
          }

          .transformation-arrow {
            transform: rotate(90deg);
          }

          .timer-value {
            font-size: 36px;
          }

          .countdown-number {
            font-size: 36px;
          }

          .offer-card {
            padding: 40px 20px;
          }

          .steps-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <section className="hero">
        <div className="container">
          <div className="hero-badge">🔥 Limited Spots - Only 47 Remaining This Week</div>
          <h1>
            Stop Losing Money on Bad Trades
            <span className="hero-highlight">Start Earning $2,500-$10,000/Month</span>
          </h1>
          <p>
            Get matched with elite brokers, receive professional signals, and access 1-on-1 mentorship from traders who've made millions. 100% Free. No strings attached.
          </p>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">5,247+</span>
              <span className="stat-label">Active Traders</span>
            </div>
            <div className="stat">
              <span className="stat-number">78%</span>
              <span className="stat-label">Average Win Rate</span>
            </div>
            <div className="stat">
              <span className="stat-number">$4.2M+</span>
              <span className="stat-label">Total Profits Generated</span>
            </div>
          </div>
        </div>
      </section>

      <section className="form-section">
        <div className="form-container">
          <div className="form-header">
            <h2>Claim Your Free Elite Broker Match</h2>
            <p>Takes 30 seconds. Get instant access to premium trading tools.</p>
            <div className="trust-line">
              <span>🔒</span>
              <span>Your data is 100% secure & never shared</span>
            </div>
          </div>

          <form id="leadForm">
            <div className="form-row">
              <div className="form-group">
                <label>First Name *</label>
                <input type="text" id="firstName" required placeholder="John" />
              </div>
              <div className="form-group">
                <label>Last Name *</label>
                <input type="text" id="lastName" required placeholder="Doe" />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address *</label>
              <input type="email" id="email" required placeholder="john@example.com" />
            </div>

            <div className="form-group">
              <label>Phone Number *</label>
              <input type="tel" id="phone" required placeholder="+1 234 567 8900" />
            </div>

            <div className="form-group">
              <label>Country *</label>
              <select id="country" required>
                <option value="">Select your country</option>
                <option value="US">🇺🇸 United States</option>
                <option value="UK">🇬🇧 United Kingdom</option>
                <option value="CA">🇨🇦 Canada</option>
                <option value="AU">🇦🇺 Australia</option>
                <option value="SG">🇸🇬 Singapore</option>
                <option value="MY">🇲🇾 Malaysia</option>
                <option value="HK">🇭🇰 Hong Kong</option>
                <option value="TW">🇹🇼 Taiwan</option>
                <option value="IT">🇮🇹 Italy</option>
                <option value="FR">🇫🇷 France</option>
                <option value="DE">🇩🇪 Germany</option>
                <option value="ES">🇪🇸 Spain</option>
                <option value="BR">🇧🇷 Brazil</option>
                <option value="TR">🇹🇷 Turkey</option>
                <option value="OTHER">🌍 Other</option>
              </select>
            </div>

            <button type="submit" className="submit-btn" id="submitBtn">
              🚀 Get My Free Broker Match Now
            </button>

            <div className="form-footer">
              By submitting, you agree to receive trading insights via email & SMS.
              <br />Unsubscribe anytime. We respect your privacy.
            </div>
          </form>
        </div>
      </section>

      <section className="how-it-works reveal">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '18px', marginBottom: '50px', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
            Get started in 3 simple steps. Takes less than 2 minutes to unlock elite trading resources.
          </p>

          <div className="steps-grid">
            <div className="step-card reveal">
              <div className="step-number">1</div>
              <div className="step-icon">📝</div>
              <h3>Fill Out Quick Form</h3>
              <p>Share basic info about your trading goals and experience level in 60 seconds</p>
            </div>

            <div className="step-card reveal">
              <div className="step-number">2</div>
              <div className="step-icon">🎯</div>
              <h3>Get Matched Instantly</h3>
              <p>Our AI matches you with the perfect broker and mentor based on your profile</p>
            </div>

            <div className="step-card reveal">
              <div className="step-number">3</div>
              <div className="step-icon">📈</div>
              <h3>Start Earning Today</h3>
              <p>Receive your first premium signals and start trading with professional guidance</p>
            </div>
          </div>

          <div className="steps-cta">
            <button className="submit-btn" onClick={() => {
              const form = document.getElementById('leadForm');
              if (form) form.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}>
              🚀 Get Started Now - It&apos;s 100% Free
            </button>
          </div>
        </div>
      </section>

      <section className="transformation reveal">
        <div className="container">
          <h2 className="section-title">Real Traders, Real Results</h2>
          <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '18px', marginBottom: '50px', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
            See how our traders transformed their trading results in just a few months
          </p>

          <div className="transformation-grid">
            <div className="transformation-card reveal">
              <div className="transformation-header">
                <div className="transformation-before">
                  <div className="transformation-label">Before</div>
                  <div className="transformation-metric">
                    <div className="metric-value negative">-$850</div>
                    <div className="metric-label">Monthly Loss</div>
                  </div>
                  <div className="transformation-metric">
                    <div className="metric-value negative">42%</div>
                    <div className="metric-label">Win Rate</div>
                  </div>
                </div>
                <div className="transformation-arrow">→</div>
                <div className="transformation-after">
                  <div className="transformation-label">After</div>
                  <div className="transformation-metric">
                    <div className="metric-value positive">+$4,200</div>
                    <div className="metric-label">Monthly Profit</div>
                  </div>
                  <div className="transformation-metric">
                    <div className="metric-value positive">81%</div>
                    <div className="metric-label">Win Rate</div>
                  </div>
                </div>
              </div>
              <div className="transformation-info">
                <strong>David L.</strong> · USA · 3 months with mentor
              </div>
            </div>

            <div className="transformation-card reveal">
              <div className="transformation-header">
                <div className="transformation-before">
                  <div className="transformation-label">Before</div>
                  <div className="transformation-metric">
                    <div className="metric-value negative">-$1,200</div>
                    <div className="metric-label">Monthly Loss</div>
                  </div>
                  <div className="transformation-metric">
                    <div className="metric-value negative">38%</div>
                    <div className="metric-label">Win Rate</div>
                  </div>
                </div>
                <div className="transformation-arrow">→</div>
                <div className="transformation-after">
                  <div className="transformation-label">After</div>
                  <div className="transformation-metric">
                    <div className="metric-value positive">+$7,850</div>
                    <div className="metric-label">Monthly Profit</div>
                  </div>
                  <div className="transformation-metric">
                    <div className="metric-value positive">85%</div>
                    <div className="metric-label">Win Rate</div>
                  </div>
                </div>
              </div>
              <div className="transformation-info">
                <strong>Maria S.</strong> · Singapore · 4 months with signals
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="live-results reveal">
        <div className="container">
          <h2 className="section-title">Live Trading Results</h2>
          <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '18px', marginBottom: '50px', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
            Real-time updates from our community of traders
          </p>

          <div className="results-ticker">
            <div className="ticker-item" style={{ animationDelay: '0s' }}>
              <div className="ticker-icon">✅</div>
              <div className="ticker-text"><strong>EUR/USD</strong> +$420 profit · 5 min ago</div>
            </div>
            <div className="ticker-item" style={{ animationDelay: '0.2s' }}>
              <div className="ticker-icon">✅</div>
              <div className="ticker-text"><strong>GBP/JPY</strong> +$680 profit · 12 min ago</div>
            </div>
            <div className="ticker-item" style={{ animationDelay: '0.4s' }}>
              <div className="ticker-icon">✅</div>
              <div className="ticker-text"><strong>Gold (XAU)</strong> +$1,240 profit · 28 min ago</div>
            </div>
            <div className="ticker-item" style={{ animationDelay: '0.6s' }}>
              <div className="ticker-icon">✅</div>
              <div className="ticker-text"><strong>BTC/USD</strong> +$890 profit · 1 hour ago</div>
            </div>
          </div>

          <div className="live-stats">
            <div className="live-stat">
              <div className="live-stat-value" data-target="1247">0</div>
              <div className="live-stat-label">Trades Today</div>
            </div>
            <div className="live-stat">
              <div className="live-stat-value" data-target="87" data-percent="true">0%</div>
              <div className="live-stat-label">Win Rate</div>
            </div>
            <div className="live-stat">
              <div className="live-stat-value" data-target="184250" data-dollar="true">$0</div>
              <div className="live-stat-label">Total Profits This Month</div>
            </div>
          </div>
        </div>
      </section>

      <section className="benefits">
        <div className="container">
          <h2 className="section-title">Why Elite Traders Choose Us</h2>

          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">🎯</div>
              <h3>Daily Premium Signals</h3>
              <p>Receive 5-10 high-probability trading signals daily with exact entry, stop-loss, and take-profit levels.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">💎</div>
              <h3>Elite Broker Matching</h3>
              <p>Get matched with top-tier regulated brokers offering the best spreads, execution, and trading conditions.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">📚</div>
              <h3>1-on-1 Mentorship</h3>
              <p>Personal guidance from traders who've made millions. Learn their exact strategies and risk management.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">📊</div>
              <h3>Live Market Analysis</h3>
              <p>Daily market breakdowns, economic calendar insights, and real-time trading opportunities.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🛡️</div>
              <h3>Risk Management Tools</h3>
              <p>Professional position sizing calculators, risk/reward analyzers, and portfolio trackers.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🌍</div>
              <h3>24/7 Support</h3>
              <p>Access our dedicated support team anytime. Get help with trades, platform issues, or strategy questions.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="social-proof">
        <div className="container">
          <h2 className="section-title">Success Stories from Real Traders</h2>

          <div className="testimonials">
            <div className="testimonial">
              <div className="testimonial-header">
                <div className="testimonial-avatar">M</div>
                <div>
                  <div className="testimonial-name">Michael Chen</div>
                  <div className="testimonial-role">Singapore · Verified Trader</div>
                </div>
              </div>
              <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "Made $8,400 in my first month following their signals. The broker they matched me with has incredible execution speed. This is a game-changer!"
              </p>
            </div>

            <div className="testimonial">
              <div className="testimonial-header">
                <div className="testimonial-avatar">S</div>
                <div>
                  <div className="testimonial-name">Sarah Rodriguez</div>
                  <div className="testimonial-role">Spain · Verified Trader</div>
                </div>
              </div>
              <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "I was losing money for 2 years. After getting my free mentor, I'm finally profitable. Up $12,000 in 3 months. Thank you!"
              </p>
            </div>

            <div className="testimonial">
              <div className="testimonial-header">
                <div className="testimonial-avatar">J</div>
                <div>
                  <div className="testimonial-name">James Wilson</div>
                  <div className="testimonial-role">UK · Verified Trader</div>
                </div>
              </div>
              <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "Best decision ever. The signals are accurate, the broker is top-tier, and the mentorship is worth thousands. All completely free!"
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="guarantee reveal">
        <div className="guarantee-content">
          <div className="guarantee-icon">🛡️</div>
          <h2>100% Risk-Free Guarantee</h2>
          <p>
            We&apos;re so confident in our mentorship program and broker matching that we offer an ironclad guarantee.
            If you&apos;re not satisfied within your first 30 days, we&apos;ll work with you until you are.
          </p>

          <div className="guarantee-features">
            <div className="guarantee-feature">
              <div className="feature-icon">✓</div>
              <div>30-Day Money-Back Guarantee</div>
            </div>
            <div className="guarantee-feature">
              <div className="feature-icon">✓</div>
              <div>Regulated Brokers Only</div>
            </div>
            <div className="guarantee-feature">
              <div className="feature-icon">✓</div>
              <div>No Hidden Fees Ever</div>
            </div>
            <div className="guarantee-feature">
              <div className="feature-icon">✓</div>
              <div>24/7 Dedicated Support</div>
            </div>
          </div>
        </div>
      </section>

      <section className="limited-offer reveal">
        <div className="offer-card">
          <div className="offer-badge">⚡ LIMITED TIME OFFER</div>
          <h2>Only <span className="countdown-number" id="spotsLeft">47</span> Spots Left Today!</h2>
          <p style={{ color: '#6b7280', fontSize: '16px', marginBottom: '20px' }}>
            Due to high demand and personalized service, we can only accept a limited number of new traders daily.
          </p>

          <div className="urgency-bar">
            <div className="urgency-fill"></div>
          </div>
          <div className="urgency-labels">
            <span className="spots-taken">53 spots taken today</span>
            <span className="spots-remaining">47 remaining</span>
          </div>

          <div className="offer-timer">
            <div className="timer-label">⏰ This offer expires in:</div>
            <div className="timer-display">
              <div className="timer-unit">
                <div className="timer-value" id="minutes">14</div>
                <div className="timer-label-small">MIN</div>
              </div>
              <div className="timer-separator">:</div>
              <div className="timer-unit">
                <div className="timer-value" id="seconds">59</div>
                <div className="timer-label-small">SEC</div>
              </div>
            </div>
          </div>

          <button className="submit-btn pulse-btn" onClick={() => {
            const form = document.getElementById('leadForm');
            if (form) form.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }}>
            🔥 Secure My Spot Now - Before It&apos;s Gone!
          </button>
        </div>
      </section>

      <section className="trust-section">
        <div className="container">
          <div className="trust-badges">
            <div className="trust-badge">
              <div className="trust-badge-icon">🔒</div>
              <div className="trust-badge-text">256-bit SSL Encrypted</div>
            </div>
            <div className="trust-badge">
              <div className="trust-badge-icon">✅</div>
              <div className="trust-badge-text">Regulated Brokers Only</div>
            </div>
            <div className="trust-badge">
              <div className="trust-badge-icon">🏆</div>
              <div className="trust-badge-text">5-Star Rated Service</div>
            </div>
            <div className="trust-badge">
              <div className="trust-badge-icon">💯</div>
              <div className="trust-badge-text">100% Free Forever</div>
            </div>
          </div>
        </div>
      </section>

      <div className="success-overlay" id="successOverlay">
        <div className="success-message">
          <div className="success-icon">✅</div>
          <h3>Welcome to Elite Trading!</h3>
          <p>
            Thank you for joining! Our team will contact you within 24 hours to match you with your perfect broker and personal trading mentor.
            <br /><br />
            <strong>Check your email and phone for next steps!</strong>
          </p>
        </div>
      </div>

      <Script id="lp1-script" strategy="afterInteractive">
        {`
          const SUPABASE_URL = 'https://bsupjdeayuylynsdmfdx.supabase.co';
          const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzdXBqZGVheXV5bHluc2RtZmR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2NDg4OTgsImV4cCI6MjA3NTIyNDg5OH0.9GYAHxRfLjoSlxmgsb3HTDoTeLcy3pnhYNvT59obIxY';

          let supabase;
          let detectedIPData = null;

          async function initSupabase() {
            if (window.supabase) {
              supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
              await detectIP();
              setupForm();
            } else {
              setTimeout(initSupabase, 100);
            }
          }

          async function detectIP() {
            try {
              const response = await fetch('https://ipapi.co/json/');
              detectedIPData = await response.json();

              const countrySelect = document.getElementById('country');
              let countryCode = detectedIPData.country_code;
              if (countryCode === 'GB') countryCode = 'UK';

              const supported = ['US', 'UK', 'CA', 'AU', 'SG', 'MY', 'HK', 'TW', 'IT', 'FR', 'DE', 'ES', 'BR', 'TR'];
              if (supported.includes(countryCode)) {
                countrySelect.value = countryCode;
              } else {
                countrySelect.value = 'OTHER';
              }

              const phonePrefixes = {
                'US': '+1', 'CA': '+1', 'GB': '+44', 'AU': '+61', 'SG': '+65',
                'MY': '+60', 'HK': '+852', 'TW': '+886', 'IT': '+39', 'FR': '+33',
                'DE': '+49', 'ES': '+34', 'BR': '+55', 'TR': '+90'
              };

              const phoneInput = document.getElementById('phone');
              const prefix = phonePrefixes[detectedIPData.country_code];
              if (prefix) {
                phoneInput.value = prefix + ' ';
                phoneInput.placeholder = prefix + ' 123 456 7890';
              }
            } catch (error) {
              console.error('IP detection failed:', error);
            }
          }

          function setupForm() {
            document.getElementById('leadForm').addEventListener('submit', async function(event) {
              event.preventDefault();

              const submitBtn = document.getElementById('submitBtn');
              submitBtn.disabled = true;
              submitBtn.textContent = '⏳ Processing...';

              const data = {
                first_name: document.getElementById('firstName').value.trim(),
                last_name: document.getElementById('lastName').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone_number: document.getElementById('phone').value.trim(),
                country: document.getElementById('country').value,
                country_code: document.getElementById('phone').value.substring(0, 4),
                trading_experience: 'Not specified',
                account_size: 'Not specified',
                lead_source: 'lp1-elite',
                lead_type: 'elite-broker-matching',
                lead_status: 'new',
                ip_address: detectedIPData?.ip || 'Unknown',
                user_agent: navigator.userAgent,
                referrer: document.referrer || 'Direct',
                landing_page: window.location.href,
                created_at: new Date().toISOString()
              };

              try {
                const { data: result, error } = await supabase
                  .from('signups')
                  .insert([data])
                  .select();

                if (error) throw error;

                document.getElementById('successOverlay').classList.add('active');

                if (typeof dataLayer !== 'undefined') {
                  dataLayer.push({
                    'event': 'conversion',
                    'conversion_type': 'lp1_lead_submit',
                    'value': 1.0,
                    'currency': 'USD'
                  });
                }
              } catch (error) {
                console.error('Submission error:', error);
                alert('Oops! Something went wrong. Please try again.');
                submitBtn.disabled = false;
                submitBtn.textContent = '🚀 Get My Free Broker Match Now';
              }
            });
          }

          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initSupabase);
          } else {
            initSupabase();
          }

          // Counter Animation for Live Stats
          function animateCounter(element, target, duration = 2000, isPercent = false, isDollar = false) {
            const start = 0;
            const increment = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }

              let displayValue = Math.floor(current);
              if (isDollar) {
                displayValue = '$' + displayValue.toLocaleString();
              } else if (isPercent) {
                displayValue = displayValue + '%';
              } else {
                displayValue = displayValue.toLocaleString();
              }

              element.textContent = displayValue;
            }, 16);
          }

          // Countdown Timer
          let timeLeft = 14 * 60 + 59; // 14 minutes 59 seconds

          function updateCountdown() {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;

            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');

            if (minutesEl && secondsEl) {
              minutesEl.textContent = String(minutes).padStart(2, '0');
              secondsEl.textContent = String(seconds).padStart(2, '0');
            }

            if (timeLeft > 0) {
              timeLeft--;
            } else {
              timeLeft = 14 * 60 + 59; // Reset
            }
          }

          // Start countdown
          setInterval(updateCountdown, 1000);

          // Spots Counter
          let spotsLeft = 47;
          function updateSpots() {
            const spotsEl = document.getElementById('spotsLeft');
            if (spotsEl && spotsLeft > 35) {
              spotsLeft--;
              spotsEl.textContent = spotsLeft;

              // Update urgency bar and labels
              const urgencyFill = document.querySelector('.urgency-fill');
              const spotsTaken = document.querySelector('.spots-taken');
              const spotsRemaining = document.querySelector('.spots-remaining');

              if (urgencyFill) {
                const percentage = ((100 - spotsLeft) / 100) * 100;
                urgencyFill.style.width = percentage + '%';
              }

              if (spotsTaken) spotsTaken.textContent = (100 - spotsLeft) + ' spots taken today';
              if (spotsRemaining) spotsRemaining.textContent = spotsLeft + ' remaining';
            }
          }

          // Decrease spots every 30-90 seconds
          setInterval(updateSpots, Math.random() * 60000 + 30000);

          // Scroll Reveal Animation
          function revealOnScroll() {
            const reveals = document.querySelectorAll('.reveal');

            reveals.forEach(element => {
              const windowHeight = window.innerHeight;
              const elementTop = element.getBoundingClientRect().top;
              const elementVisible = 150;

              if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
              }
            });
          }

          window.addEventListener('scroll', revealOnScroll);

          // Initial reveal check
          setTimeout(revealOnScroll, 100);

          // Counter Animation for Live Stats (triggered on scroll)
          const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting && !entry.target.dataset.animated) {
                const target = parseInt(entry.target.dataset.target);
                const isDollar = entry.target.dataset.dollar === 'true';
                const isPercent = entry.target.dataset.percent === 'true';

                animateCounter(entry.target, target, 2500, isPercent, isDollar);
                entry.target.dataset.animated = 'true';
                statsObserver.unobserve(entry.target);
              }
            });
          }, { threshold: 0.5 });

          // Observe live stats for counter animation
          setTimeout(() => {
            const liveStatValues = document.querySelectorAll('.live-stat-value');
            liveStatValues.forEach(stat => {
              statsObserver.observe(stat);
            });
          }, 500);
        `}
      </Script>
    </>
  )
}
