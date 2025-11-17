'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';

export default function TaboolaLandingPage() {
  const [currentLang, setCurrentLang] = useState('en');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    tradingExperience: '',
    accountSize: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const translations = {
    en: {
      badge: '🔥 EXCLUSIVE TRADING OPPORTUNITY',
      headline: 'Get Matched With Elite Brokers',
      subheadline: 'Join 50,000+ Traders Worldwide Making Smarter Trading Decisions',
      cta: 'START YOUR JOURNEY NOW',
      howItWorks: 'How It Works',
      step1Title: 'Discover Your Match',
      step1Desc: 'Answer a few quick questions about your trading goals and experience level',
      step2Title: 'Get Matched Instantly',
      step2Desc: 'Our AI algorithm connects you with the perfect broker for your needs',
      step3Title: 'Start Trading',
      step3Desc: 'Begin your trading journey with a trusted, regulated broker',
      transformationTitle: 'Real Results From Real Traders',
      beforeLabel: 'Before',
      afterLabel: 'After',
      liveResultsTitle: 'Live Trading Results',
      liveResultsSubtitle: 'Updated Every 24 Hours',
      guaranteeTitle: '100% Risk-Free Guarantee',
      guaranteeBadge: '✓ 100% FREE SERVICE',
      guaranteePoint1: 'No Hidden Fees',
      guaranteePoint2: 'Regulated Brokers Only',
      guaranteePoint3: 'Secure & Confidential',
      guaranteePoint4: '24/7 Support',
      limitedOfferTitle: 'Limited Time Opportunity',
      spotsLeft: 'Spots Left Today',
      offerExpires: 'This Offer Expires In:',
      featuredIn: 'As Featured In',
      testimonialTitle: 'What Traders Are Saying',
      testimonial1: '"Found my perfect broker in under 5 minutes. The matching system is incredible!"',
      testimonial1Name: 'Sarah M., New York',
      testimonial2: '"Finally, a service that actually understands my trading needs. Highly recommended!"',
      testimonial2Name: 'David L., London',
      testimonial3: '"The best decision I made for my trading career. Professional and fast!"',
      testimonial3Name: 'Michael R., Singapore',
      faqTitle: 'Frequently Asked Questions',
      faq1Q: 'Is this service really free?',
      faq1A: 'Yes! Our broker matching service is 100% free. We never charge traders.',
      faq2Q: 'How long does it take to get matched?',
      faq2A: 'Most traders get matched with their ideal broker in less than 5 minutes.',
      faq3Q: 'Are the brokers regulated?',
      faq3A: 'Absolutely. We only work with licensed, regulated brokers from top-tier jurisdictions.',
      faq4Q: 'What if I don\'t like my match?',
      faq4A: 'You can request a new match anytime. We want you to find the perfect broker.',
      footerDisclaimer: 'Trading involves risk. Past performance does not guarantee future results.',
      formTitle: 'Get Your Free Broker Match',
      formSubtitle: 'Fill out the form below and get matched with your perfect broker in under 5 minutes',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      phone: 'Phone Number',
      country: 'Country',
      selectCountry: 'Select your country',
      tradingExperience: 'Trading Experience',
      selectExperience: 'Select your experience',
      exp0: 'No Experience',
      exp1: '0-1 Year',
      exp2: '1-3 Years',
      exp3: '3-5 Years',
      exp4: '5-10 Years',
      exp5: '10+ Years',
      accountSize: 'Account Size',
      selectAccountSize: 'Select account size',
      size1: '$0 - $1,000',
      size2: '$1,000 - $5,000',
      size3: '$5,000 - $10,000',
      size4: '$10,000 - $50,000',
      size5: '$50,000 - $100,000',
      size6: '$100,000+',
      submitButton: 'GET MATCHED NOW',
      submitting: 'Submitting...',
      successMessage: 'Success! We\'ll match you with the perfect broker shortly.',
      errorMessage: 'Something went wrong. Please try again.',
    },
    es: {
      badge: '🔥 OPORTUNIDAD EXCLUSIVA DE TRADING',
      headline: 'Encuentra Tu Bróker Elite Perfecto',
      subheadline: 'Únete a 50,000+ Traders en Todo el Mundo Tomando Decisiones Más Inteligentes',
      cta: 'COMIENZA TU VIAJE AHORA',
      howItWorks: 'Cómo Funciona',
      step1Title: 'Descubre Tu Match',
      step1Desc: 'Responde algunas preguntas rápidas sobre tus objetivos y nivel de experiencia',
      step2Title: 'Emparejamiento Instantáneo',
      step2Desc: 'Nuestro algoritmo AI te conecta con el bróker perfecto para tus necesidades',
      step3Title: 'Comienza a Operar',
      step3Desc: 'Inicia tu viaje de trading con un bróker confiable y regulado',
      transformationTitle: 'Resultados Reales de Traders Reales',
      beforeLabel: 'Antes',
      afterLabel: 'Después',
      liveResultsTitle: 'Resultados de Trading en Vivo',
      liveResultsSubtitle: 'Actualizado Cada 24 Horas',
      guaranteeTitle: 'Garantía 100% Sin Riesgo',
      guaranteeBadge: '✓ SERVICIO 100% GRATIS',
      guaranteePoint1: 'Sin Tarifas Ocultas',
      guaranteePoint2: 'Solo Brókers Regulados',
      guaranteePoint3: 'Seguro y Confidencial',
      guaranteePoint4: 'Soporte 24/7',
      limitedOfferTitle: 'Oportunidad por Tiempo Limitado',
      spotsLeft: 'Espacios Disponibles Hoy',
      offerExpires: 'Esta Oferta Expira En:',
      featuredIn: 'Destacado En',
      testimonialTitle: 'Lo Que Dicen Los Traders',
      testimonial1: '"Encontré mi bróker perfecto en menos de 5 minutos. ¡El sistema es increíble!"',
      testimonial1Name: 'Sarah M., Nueva York',
      testimonial2: '"Finalmente, un servicio que entiende mis necesidades. ¡Muy recomendado!"',
      testimonial2Name: 'David L., Londres',
      testimonial3: '"La mejor decisión para mi carrera. ¡Profesional y rápido!"',
      testimonial3Name: 'Michael R., Singapur',
      faqTitle: 'Preguntas Frecuentes',
      faq1Q: '¿Este servicio es realmente gratis?',
      faq1A: '¡Sí! Nuestro servicio es 100% gratis. Nunca cobramos a los traders.',
      faq2Q: '¿Cuánto tiempo toma el emparejamiento?',
      faq2A: 'La mayoría de traders encuentran su bróker ideal en menos de 5 minutos.',
      faq3Q: '¿Los brókers están regulados?',
      faq3A: 'Absolutamente. Solo trabajamos con brókers licenciados y regulados.',
      faq4Q: '¿Qué pasa si no me gusta mi match?',
      faq4A: 'Puedes solicitar un nuevo match en cualquier momento.',
      footerDisclaimer: 'El trading implica riesgo. Los resultados pasados no garantizan resultados futuros.',
      formTitle: 'Obtén Tu Emparejamiento Gratuito',
      formSubtitle: 'Completa el formulario y encuentra tu bróker perfecto en menos de 5 minutos',
      firstName: 'Nombre',
      lastName: 'Apellido',
      email: 'Correo Electrónico',
      phone: 'Teléfono',
      country: 'País',
      selectCountry: 'Selecciona tu país',
      tradingExperience: 'Experiencia en Trading',
      selectExperience: 'Selecciona tu experiencia',
      exp0: 'Sin Experiencia',
      exp1: '0-1 Año',
      exp2: '1-3 Años',
      exp3: '3-5 Años',
      exp4: '5-10 Años',
      exp5: '10+ Años',
      accountSize: 'Tamaño de Cuenta',
      selectAccountSize: 'Selecciona tamaño de cuenta',
      size1: '$0 - $1,000',
      size2: '$1,000 - $5,000',
      size3: '$5,000 - $10,000',
      size4: '$10,000 - $50,000',
      size5: '$50,000 - $100,000',
      size6: '$100,000+',
      submitButton: 'COMENZAR AHORA',
      submitting: 'Enviando...',
      successMessage: '¡Éxito! Te emparejaremos con el bróker perfecto pronto.',
      errorMessage: 'Algo salió mal. Por favor intenta de nuevo.',
    },
    fr: {
      badge: '🔥 OPPORTUNITÉ DE TRADING EXCLUSIVE',
      headline: 'Trouvez Votre Courtier Elite Parfait',
      subheadline: 'Rejoignez 50 000+ Traders dans le Monde Prenant des Décisions Plus Intelligentes',
      cta: 'COMMENCEZ VOTRE VOYAGE MAINTENANT',
      howItWorks: 'Comment Ça Marche',
      step1Title: 'Découvrez Votre Match',
      step1Desc: 'Répondez à quelques questions sur vos objectifs et votre niveau d\'expérience',
      step2Title: 'Correspondance Instantanée',
      step2Desc: 'Notre algorithme IA vous connecte avec le courtier parfait pour vos besoins',
      step3Title: 'Commencez à Trader',
      step3Desc: 'Commencez votre voyage de trading avec un courtier réglementé et fiable',
      transformationTitle: 'Résultats Réels de Vrais Traders',
      beforeLabel: 'Avant',
      afterLabel: 'Après',
      liveResultsTitle: 'Résultats de Trading en Direct',
      liveResultsSubtitle: 'Mis à Jour Toutes Les 24 Heures',
      guaranteeTitle: 'Garantie 100% Sans Risque',
      guaranteeBadge: '✓ SERVICE 100% GRATUIT',
      guaranteePoint1: 'Pas de Frais Cachés',
      guaranteePoint2: 'Courtiers Réglementés Uniquement',
      guaranteePoint3: 'Sécurisé et Confidentiel',
      guaranteePoint4: 'Support 24/7',
      limitedOfferTitle: 'Opportunité à Durée Limitée',
      spotsLeft: 'Places Disponibles Aujourd\'hui',
      offerExpires: 'Cette Offre Expire Dans:',
      featuredIn: 'En Vedette Dans',
      testimonialTitle: 'Ce Que Disent Les Traders',
      testimonial1: '"J\'ai trouvé mon courtier parfait en moins de 5 minutes. Le système est incroyable!"',
      testimonial1Name: 'Sarah M., New York',
      testimonial2: '"Enfin, un service qui comprend mes besoins. Hautement recommandé!"',
      testimonial2Name: 'David L., Londres',
      testimonial3: '"La meilleure décision pour ma carrière. Professionnel et rapide!"',
      testimonial3Name: 'Michael R., Singapour',
      faqTitle: 'Questions Fréquemment Posées',
      faq1Q: 'Ce service est-il vraiment gratuit?',
      faq1A: 'Oui! Notre service est 100% gratuit. Nous ne facturons jamais les traders.',
      faq2Q: 'Combien de temps prend la correspondance?',
      faq2A: 'La plupart des traders trouvent leur courtier idéal en moins de 5 minutes.',
      faq3Q: 'Les courtiers sont-ils réglementés?',
      faq3A: 'Absolument. Nous travaillons uniquement avec des courtiers licenciés et réglementés.',
      faq4Q: 'Et si je n\'aime pas mon match?',
      faq4A: 'Vous pouvez demander un nouveau match à tout moment.',
      footerDisclaimer: 'Le trading comporte des risques. Les performances passées ne garantissent pas les résultats futurs.',
      formTitle: 'Obtenez Votre Correspondance Gratuite',
      formSubtitle: 'Remplissez le formulaire et trouvez votre courtier parfait en moins de 5 minutes',
      firstName: 'Prénom',
      lastName: 'Nom',
      email: 'Email',
      phone: 'Téléphone',
      country: 'Pays',
      selectCountry: 'Sélectionnez votre pays',
      tradingExperience: 'Expérience en Trading',
      selectExperience: 'Sélectionnez votre expérience',
      exp0: 'Aucune Expérience',
      exp1: '0-1 An',
      exp2: '1-3 Ans',
      exp3: '3-5 Ans',
      exp4: '5-10 Ans',
      exp5: '10+ Ans',
      accountSize: 'Taille du Compte',
      selectAccountSize: 'Sélectionnez la taille du compte',
      size1: '$0 - $1,000',
      size2: '$1,000 - $5,000',
      size3: '$5,000 - $10,000',
      size4: '$10,000 - $50,000',
      size5: '$50,000 - $100,000',
      size6: '$100,000+',
      submitButton: 'COMMENCER MAINTENANT',
      submitting: 'Envoi en cours...',
      successMessage: 'Succès! Nous vous mettrons en contact avec le courtier parfait bientôt.',
      errorMessage: 'Quelque chose s\'est mal passé. Veuillez réessayer.',
    },
    de: {
      badge: '🔥 EXKLUSIVE TRADING-MÖGLICHKEIT',
      headline: 'Finden Sie Ihren Perfekten Elite-Broker',
      subheadline: 'Treten Sie 50.000+ Händlern Weltweit Bei, Die Intelligentere Entscheidungen Treffen',
      cta: 'STARTEN SIE JETZT IHRE REISE',
      howItWorks: 'Wie Es Funktioniert',
      step1Title: 'Entdecken Sie Ihr Match',
      step1Desc: 'Beantworten Sie ein paar schnelle Fragen zu Ihren Zielen und Erfahrungen',
      step2Title: 'Sofortige Zuordnung',
      step2Desc: 'Unser KI-Algorithmus verbindet Sie mit dem perfekten Broker für Ihre Bedürfnisse',
      step3Title: 'Beginnen Sie zu Handeln',
      step3Desc: 'Beginnen Sie Ihre Trading-Reise mit einem vertrauenswürdigen, regulierten Broker',
      transformationTitle: 'Echte Ergebnisse Von Echten Händlern',
      beforeLabel: 'Vorher',
      afterLabel: 'Nachher',
      liveResultsTitle: 'Live-Trading-Ergebnisse',
      liveResultsSubtitle: 'Alle 24 Stunden Aktualisiert',
      guaranteeTitle: '100% Risikofreie Garantie',
      guaranteeBadge: '✓ 100% KOSTENLOSER SERVICE',
      guaranteePoint1: 'Keine Versteckten Gebühren',
      guaranteePoint2: 'Nur Regulierte Broker',
      guaranteePoint3: 'Sicher & Vertraulich',
      guaranteePoint4: '24/7 Support',
      limitedOfferTitle: 'Zeitlich Begrenzte Gelegenheit',
      spotsLeft: 'Verfügbare Plätze Heute',
      offerExpires: 'Dieses Angebot Läuft Ab In:',
      featuredIn: 'Vorgestellt In',
      testimonialTitle: 'Was Händler Sagen',
      testimonial1: '"Habe meinen perfekten Broker in unter 5 Minuten gefunden. Das System ist unglaublich!"',
      testimonial1Name: 'Sarah M., New York',
      testimonial2: '"Endlich ein Service, der meine Bedürfnisse versteht. Sehr empfehlenswert!"',
      testimonial2Name: 'David L., London',
      testimonial3: '"Die beste Entscheidung für meine Karriere. Professionell und schnell!"',
      testimonial3Name: 'Michael R., Singapur',
      faqTitle: 'Häufig Gestellte Fragen',
      faq1Q: 'Ist dieser Service wirklich kostenlos?',
      faq1A: 'Ja! Unser Service ist 100% kostenlos. Wir berechnen Händlern niemals etwas.',
      faq2Q: 'Wie lange dauert die Zuordnung?',
      faq2A: 'Die meisten Händler finden ihren idealen Broker in weniger als 5 Minuten.',
      faq3Q: 'Sind die Broker reguliert?',
      faq3A: 'Absolut. Wir arbeiten nur mit lizenzierten, regulierten Brokern.',
      faq4Q: 'Was ist, wenn mir mein Match nicht gefällt?',
      faq4A: 'Sie können jederzeit ein neues Match anfordern.',
      footerDisclaimer: 'Trading birgt Risiken. Vergangene Leistungen garantieren keine zukünftigen Ergebnisse.',
      formTitle: 'Erhalten Sie Ihre Kostenlose Zuordnung',
      formSubtitle: 'Füllen Sie das Formular aus und finden Sie Ihren perfekten Broker in unter 5 Minuten',
      firstName: 'Vorname',
      lastName: 'Nachname',
      email: 'E-Mail',
      phone: 'Telefon',
      country: 'Land',
      selectCountry: 'Wählen Sie Ihr Land',
      tradingExperience: 'Trading-Erfahrung',
      selectExperience: 'Wählen Sie Ihre Erfahrung',
      exp0: 'Keine Erfahrung',
      exp1: '0-1 Jahr',
      exp2: '1-3 Jahre',
      exp3: '3-5 Jahre',
      exp4: '5-10 Jahre',
      exp5: '10+ Jahre',
      accountSize: 'Kontogröße',
      selectAccountSize: 'Wählen Sie Kontogröße',
      size1: '$0 - $1,000',
      size2: '$1,000 - $5,000',
      size3: '$5,000 - $10,000',
      size4: '$10,000 - $50,000',
      size5: '$50,000 - $100,000',
      size6: '$100,000+',
      submitButton: 'JETZT STARTEN',
      submitting: 'Wird gesendet...',
      successMessage: 'Erfolg! Wir werden Sie bald mit dem perfekten Broker verbinden.',
      errorMessage: 'Etwas ist schief gelaufen. Bitte versuchen Sie es erneut.',
    },
    it: {
      badge: '🔥 OPPORTUNITÀ DI TRADING ESCLUSIVA',
      headline: 'Trova Il Tuo Broker Elite Perfetto',
      subheadline: 'Unisciti a 50.000+ Trader in Tutto il Mondo Che Prendono Decisioni Più Intelligenti',
      cta: 'INIZIA IL TUO VIAGGIO ORA',
      howItWorks: 'Come Funziona',
      step1Title: 'Scopri Il Tuo Match',
      step1Desc: 'Rispondi ad alcune domande sui tuoi obiettivi e livello di esperienza',
      step2Title: 'Abbinamento Istantaneo',
      step2Desc: 'Il nostro algoritmo AI ti connette con il broker perfetto per le tue esigenze',
      step3Title: 'Inizia a Fare Trading',
      step3Desc: 'Inizia il tuo viaggio di trading con un broker affidabile e regolamentato',
      transformationTitle: 'Risultati Reali da Trader Reali',
      beforeLabel: 'Prima',
      afterLabel: 'Dopo',
      liveResultsTitle: 'Risultati di Trading in Diretta',
      liveResultsSubtitle: 'Aggiornato Ogni 24 Ore',
      guaranteeTitle: 'Garanzia 100% Senza Rischi',
      guaranteeBadge: '✓ SERVIZIO 100% GRATUITO',
      guaranteePoint1: 'Nessun Costo Nascosto',
      guaranteePoint2: 'Solo Broker Regolamentati',
      guaranteePoint3: 'Sicuro e Riservato',
      guaranteePoint4: 'Supporto 24/7',
      limitedOfferTitle: 'Opportunità a Tempo Limitato',
      spotsLeft: 'Posti Disponibili Oggi',
      offerExpires: 'Questa Offerta Scade Tra:',
      featuredIn: 'In Evidenza Su',
      testimonialTitle: 'Cosa Dicono I Trader',
      testimonial1: '"Ho trovato il mio broker perfetto in meno di 5 minuti. Il sistema è incredibile!"',
      testimonial1Name: 'Sarah M., New York',
      testimonial2: '"Finalmente, un servizio che capisce le mie esigenze. Altamente raccomandato!"',
      testimonial2Name: 'David L., Londra',
      testimonial3: '"La migliore decisione per la mia carriera. Professionale e veloce!"',
      testimonial3Name: 'Michael R., Singapore',
      faqTitle: 'Domande Frequenti',
      faq1Q: 'Questo servizio è davvero gratuito?',
      faq1A: 'Sì! Il nostro servizio è 100% gratuito. Non addebitiamo mai i trader.',
      faq2Q: 'Quanto tempo ci vuole per l\'abbinamento?',
      faq2A: 'La maggior parte dei trader trova il broker ideale in meno di 5 minuti.',
      faq3Q: 'I broker sono regolamentati?',
      faq3A: 'Assolutamente. Lavoriamo solo con broker autorizzati e regolamentati.',
      faq4Q: 'Cosa succede se non mi piace il mio match?',
      faq4A: 'Puoi richiedere un nuovo match in qualsiasi momento.',
      footerDisclaimer: 'Il trading comporta rischi. I risultati passati non garantiscono risultati futuri.',
      formTitle: 'Ottieni La Tua Corrispondenza Gratuita',
      formSubtitle: 'Compila il modulo e trova il tuo broker perfetto in meno di 5 minuti',
      firstName: 'Nome',
      lastName: 'Cognome',
      email: 'Email',
      phone: 'Telefono',
      country: 'Paese',
      selectCountry: 'Seleziona il tuo paese',
      tradingExperience: 'Esperienza nel Trading',
      selectExperience: 'Seleziona la tua esperienza',
      exp0: 'Nessuna Esperienza',
      exp1: '0-1 Anno',
      exp2: '1-3 Anni',
      exp3: '3-5 Anni',
      exp4: '5-10 Anni',
      exp5: '10+ Anni',
      accountSize: 'Dimensione del Conto',
      selectAccountSize: 'Seleziona dimensione del conto',
      size1: '$0 - $1,000',
      size2: '$1,000 - $5,000',
      size3: '$5,000 - $10,000',
      size4: '$10,000 - $50,000',
      size5: '$50,000 - $100,000',
      size6: '$100,000+',
      submitButton: 'INIZIA ORA',
      submitting: 'Invio in corso...',
      successMessage: 'Successo! Ti metteremo in contatto con il broker perfetto a breve.',
      errorMessage: 'Qualcosa è andato storto. Riprova.',
    },
    pt: {
      badge: '🔥 OPORTUNIDADE EXCLUSIVA DE TRADING',
      headline: 'Encontre Seu Corretor Elite Perfeito',
      subheadline: 'Junte-se a 50.000+ Traders em Todo o Mundo Tomando Decisões Mais Inteligentes',
      cta: 'COMECE SUA JORNADA AGORA',
      howItWorks: 'Como Funciona',
      step1Title: 'Descubra Sua Combinação',
      step1Desc: 'Responda algumas perguntas rápidas sobre seus objetivos e nível de experiência',
      step2Title: 'Correspondência Instantânea',
      step2Desc: 'Nosso algoritmo de IA conecta você com o corretor perfeito para suas necessidades',
      step3Title: 'Comece a Negociar',
      step3Desc: 'Inicie sua jornada de trading com um corretor confiável e regulamentado',
      transformationTitle: 'Resultados Reais de Traders Reais',
      beforeLabel: 'Antes',
      afterLabel: 'Depois',
      liveResultsTitle: 'Resultados de Trading ao Vivo',
      liveResultsSubtitle: 'Atualizado a Cada 24 Horas',
      guaranteeTitle: 'Garantia 100% Sem Risco',
      guaranteeBadge: '✓ SERVIÇO 100% GRÁTIS',
      guaranteePoint1: 'Sem Taxas Ocultas',
      guaranteePoint2: 'Apenas Corretores Regulamentados',
      guaranteePoint3: 'Seguro e Confidencial',
      guaranteePoint4: 'Suporte 24/7',
      limitedOfferTitle: 'Oportunidade por Tempo Limitado',
      spotsLeft: 'Vagas Disponíveis Hoje',
      offerExpires: 'Esta Oferta Expira Em:',
      featuredIn: 'Destaque Em',
      testimonialTitle: 'O Que Os Traders Estão Dizendo',
      testimonial1: '"Encontrei meu corretor perfeito em menos de 5 minutos. O sistema é incrível!"',
      testimonial1Name: 'Sarah M., Nova York',
      testimonial2: '"Finalmente, um serviço que entende minhas necessidades. Altamente recomendado!"',
      testimonial2Name: 'David L., Londres',
      testimonial3: '"A melhor decisão para minha carreira. Profissional e rápido!"',
      testimonial3Name: 'Michael R., Cingapura',
      faqTitle: 'Perguntas Frequentes',
      faq1Q: 'Este serviço é realmente grátis?',
      faq1A: 'Sim! Nosso serviço é 100% grátis. Nunca cobramos dos traders.',
      faq2Q: 'Quanto tempo leva para encontrar uma correspondência?',
      faq2A: 'A maioria dos traders encontra seu corretor ideal em menos de 5 minutos.',
      faq3Q: 'Os corretores são regulamentados?',
      faq3A: 'Absolutamente. Trabalhamos apenas com corretores licenciados e regulamentados.',
      faq4Q: 'E se eu não gostar da minha correspondência?',
      faq4A: 'Você pode solicitar uma nova correspondência a qualquer momento.',
      footerDisclaimer: 'Trading envolve risco. O desempenho passado não garante resultados futuros.',
      formTitle: 'Obtenha Sua Correspondência Gratuita',
      formSubtitle: 'Preencha o formulário e encontre seu corretor perfeito em menos de 5 minutos',
      firstName: 'Primeiro Nome',
      lastName: 'Sobrenome',
      email: 'Email',
      phone: 'Telefone',
      country: 'País',
      selectCountry: 'Selecione seu país',
      tradingExperience: 'Experiência em Trading',
      selectExperience: 'Selecione sua experiência',
      exp0: 'Sem Experiência',
      exp1: '0-1 Ano',
      exp2: '1-3 Anos',
      exp3: '3-5 Anos',
      exp4: '5-10 Anos',
      exp5: '10+ Anos',
      accountSize: 'Tamanho da Conta',
      selectAccountSize: 'Selecione o tamanho da conta',
      size1: '$0 - $1,000',
      size2: '$1,000 - $5,000',
      size3: '$5,000 - $10,000',
      size4: '$10,000 - $50,000',
      size5: '$50,000 - $100,000',
      size6: '$100,000+',
      submitButton: 'COMEÇAR AGORA',
      submitting: 'Enviando...',
      successMessage: 'Sucesso! Vamos conectá-lo com o corretor perfeito em breve.',
      errorMessage: 'Algo deu errado. Tente novamente.',
    },
    ru: {
      badge: '🔥 ЭКСКЛЮЗИВНАЯ ВОЗМОЖНОСТЬ ТРЕЙДИНГА',
      headline: 'Найдите Своего Идеального Элитного Брокера',
      subheadline: 'Присоединяйтесь к 50 000+ Трейдерам по Всему Миру, Принимающим Более Умные Решения',
      cta: 'НАЧНИТЕ СВОЕ ПУТЕШЕСТВИЕ СЕЙЧАС',
      howItWorks: 'Как Это Работает',
      step1Title: 'Откройте Ваше Совпадение',
      step1Desc: 'Ответьте на несколько быстрых вопросов о ваших целях и уровне опыта',
      step2Title: 'Мгновенное Совпадение',
      step2Desc: 'Наш ИИ-алгоритм подключает вас к идеальному брокеру для ваших нужд',
      step3Title: 'Начните Торговать',
      step3Desc: 'Начните свой путь в трейдинге с надежным регулируемым брокером',
      transformationTitle: 'Реальные Результаты от Реальных Трейдеров',
      beforeLabel: 'До',
      afterLabel: 'После',
      liveResultsTitle: 'Результаты Торговли в Реальном Времени',
      liveResultsSubtitle: 'Обновляется Каждые 24 Часа',
      guaranteeTitle: '100% Гарантия Без Риска',
      guaranteeBadge: '✓ 100% БЕСПЛАТНЫЙ СЕРВИС',
      guaranteePoint1: 'Без Скрытых Комиссий',
      guaranteePoint2: 'Только Регулируемые Брокеры',
      guaranteePoint3: 'Безопасно и Конфиденциально',
      guaranteePoint4: 'Поддержка 24/7',
      limitedOfferTitle: 'Ограниченное Предложение',
      spotsLeft: 'Доступных Мест Сегодня',
      offerExpires: 'Это Предложение Истекает Через:',
      featuredIn: 'Упоминается В',
      testimonialTitle: 'Что Говорят Трейдеры',
      testimonial1: '"Нашел своего идеального брокера менее чем за 5 минут. Система невероятная!"',
      testimonial1Name: 'Сара М., Нью-Йорк',
      testimonial2: '"Наконец-то сервис, который понимает мои потребности. Очень рекомендую!"',
      testimonial2Name: 'Дэвид Л., Лондон',
      testimonial3: '"Лучшее решение для моей карьеры. Профессионально и быстро!"',
      testimonial3Name: 'Майкл Р., Сингапур',
      faqTitle: 'Часто Задаваемые Вопросы',
      faq1Q: 'Этот сервис действительно бесплатный?',
      faq1A: 'Да! Наш сервис 100% бесплатный. Мы никогда не берем плату с трейдеров.',
      faq2Q: 'Сколько времени занимает совпадение?',
      faq2A: 'Большинство трейдеров находят идеального брокера менее чем за 5 минут.',
      faq3Q: 'Брокеры регулируются?',
      faq3A: 'Абсолютно. Мы работаем только с лицензированными регулируемыми брокерами.',
      faq4Q: 'Что если мне не понравится мое совпадение?',
      faq4A: 'Вы можете запросить новое совпадение в любое время.',
      footerDisclaimer: 'Торговля связана с риском. Прошлые результаты не гарантируют будущих результатов.',
      formTitle: 'Получите Бесплатное Совпадение',
      formSubtitle: 'Заполните форму и найдите своего идеального брокера менее чем за 5 минут',
      firstName: 'Имя',
      lastName: 'Фамилия',
      email: 'Email',
      phone: 'Телефон',
      country: 'Страна',
      selectCountry: 'Выберите вашу страну',
      tradingExperience: 'Опыт Трейдинга',
      selectExperience: 'Выберите ваш опыт',
      exp0: 'Без Опыта',
      exp1: '0-1 Год',
      exp2: '1-3 Года',
      exp3: '3-5 Лет',
      exp4: '5-10 Лет',
      exp5: '10+ Лет',
      accountSize: 'Размер Счета',
      selectAccountSize: 'Выберите размер счета',
      size1: '$0 - $1,000',
      size2: '$1,000 - $5,000',
      size3: '$5,000 - $10,000',
      size4: '$10,000 - $50,000',
      size5: '$50,000 - $100,000',
      size6: '$100,000+',
      submitButton: 'НАЧАТЬ СЕЙЧАС',
      submitting: 'Отправка...',
      successMessage: 'Успех! Мы свяжем вас с идеальным брокером в ближайшее время.',
      errorMessage: 'Что-то пошло не так. Пожалуйста, попробуйте снова.',
    },
    zh: {
      badge: '🔥 独家交易机会',
      headline: '找到您的完美精英经纪商',
      subheadline: '加入全球50,000+交易者，做出更明智的交易决策',
      cta: '立即开始您的旅程',
      howItWorks: '如何运作',
      step1Title: '发现您的匹配',
      step1Desc: '回答几个关于您的交易目标和经验水平的快速问题',
      step2Title: '即时匹配',
      step2Desc: '我们的AI算法为您连接完美的经纪商',
      step3Title: '开始交易',
      step3Desc: '与值得信赖的受监管经纪商开始您的交易之旅',
      transformationTitle: '真实交易者的真实结果',
      beforeLabel: '之前',
      afterLabel: '之后',
      liveResultsTitle: '实时交易结果',
      liveResultsSubtitle: '每24小时更新',
      guaranteeTitle: '100%无风险保证',
      guaranteeBadge: '✓ 100%免费服务',
      guaranteePoint1: '无隐藏费用',
      guaranteePoint2: '仅受监管经纪商',
      guaranteePoint3: '安全和保密',
      guaranteePoint4: '24/7支持',
      limitedOfferTitle: '限时机会',
      spotsLeft: '今日剩余名额',
      offerExpires: '此优惠到期时间：',
      featuredIn: '特色报道',
      testimonialTitle: '交易者怎么说',
      testimonial1: '"在不到5分钟内找到了我的完美经纪商。系统太棒了！"',
      testimonial1Name: 'Sarah M., 纽约',
      testimonial2: '"终于有一个真正理解我需求的服务。强烈推荐！"',
      testimonial2Name: 'David L., 伦敦',
      testimonial3: '"我职业生涯中最好的决定。专业而快速！"',
      testimonial3Name: 'Michael R., 新加坡',
      faqTitle: '常见问题',
      faq1Q: '这项服务真的免费吗？',
      faq1A: '是的！我们的服务100%免费。我们从不向交易者收费。',
      faq2Q: '匹配需要多长时间？',
      faq2A: '大多数交易者在不到5分钟内找到理想的经纪商。',
      faq3Q: '经纪商受监管吗？',
      faq3A: '绝对。我们只与持牌受监管的经纪商合作。',
      faq4Q: '如果我不喜欢我的匹配怎么办？',
      faq4A: '您可以随时请求新的匹配。',
      footerDisclaimer: '交易涉及风险。过去的表现不保证未来的结果。',
      formTitle: '获得您的免费匹配',
      formSubtitle: '填写表格，在5分钟内找到您的完美经纪商',
      firstName: '名',
      lastName: '姓',
      email: '电子邮件',
      phone: '电话',
      country: '国家',
      selectCountry: '选择您的国家',
      tradingExperience: '交易经验',
      selectExperience: '选择您的经验',
      exp0: '无经验',
      exp1: '0-1年',
      exp2: '1-3年',
      exp3: '3-5年',
      exp4: '5-10年',
      exp5: '10年以上',
      accountSize: '账户规模',
      selectAccountSize: '选择账户规模',
      size1: '$0 - $1,000',
      size2: '$1,000 - $5,000',
      size3: '$5,000 - $10,000',
      size4: '$10,000 - $50,000',
      size5: '$50,000 - $100,000',
      size6: '$100,000+',
      submitButton: '立即开始',
      submitting: '提交中...',
      successMessage: '成功！我们很快会为您匹配完美的经纪商。',
      errorMessage: '出了点问题。请重试。',
    },
    ja: {
      badge: '🔥 限定トレーディング機会',
      headline: '完璧なエリートブローカーを見つける',
      subheadline: '世界中の50,000+トレーダーと共により賢い取引決定を',
      cta: '今すぐ始める',
      howItWorks: '仕組み',
      step1Title: 'マッチを発見',
      step1Desc: 'あなたの取引目標と経験レベルについていくつかの簡単な質問に答える',
      step2Title: '即座にマッチング',
      step2Desc: '私たちのAIアルゴリズムがあなたのニーズに完璧なブローカーと接続',
      step3Title: '取引開始',
      step3Desc: '信頼できる規制されたブローカーで取引の旅を始める',
      transformationTitle: '実際のトレーダーからの実際の結果',
      beforeLabel: '前',
      afterLabel: '後',
      liveResultsTitle: 'ライブトレーディング結果',
      liveResultsSubtitle: '24時間ごとに更新',
      guaranteeTitle: '100%リスクフリー保証',
      guaranteeBadge: '✓ 100%無料サービス',
      guaranteePoint1: '隠れた料金なし',
      guaranteePoint2: '規制されたブローカーのみ',
      guaranteePoint3: '安全で機密',
      guaranteePoint4: '24/7サポート',
      limitedOfferTitle: '期間限定の機会',
      spotsLeft: '今日の残り枠',
      offerExpires: 'このオファーの有効期限：',
      featuredIn: '掲載メディア',
      testimonialTitle: 'トレーダーの声',
      testimonial1: '"5分以内に完璧なブローカーを見つけました。システムは素晴らしい！"',
      testimonial1Name: 'Sarah M., ニューヨーク',
      testimonial2: '"ついに私のニーズを理解するサービス。強くお勧めします！"',
      testimonial2Name: 'David L., ロンドン',
      testimonial3: '"私のキャリアで最高の決断。プロフェッショナルで迅速！"',
      testimonial3Name: 'Michael R., シンガポール',
      faqTitle: 'よくある質問',
      faq1Q: 'このサービスは本当に無料ですか？',
      faq1A: 'はい！私たちのサービスは100%無料です。トレーダーに請求することはありません。',
      faq2Q: 'マッチングにどのくらい時間がかかりますか？',
      faq2A: 'ほとんどのトレーダーは5分以内に理想的なブローカーを見つけます。',
      faq3Q: 'ブローカーは規制されていますか？',
      faq3A: '絶対に。私たちはライセンスを持つ規制されたブローカーとのみ働いています。',
      faq4Q: 'マッチが気に入らない場合はどうなりますか？',
      faq4A: 'いつでも新しいマッチをリクエストできます。',
      footerDisclaimer: '取引にはリスクが伴います。過去の実績は将来の結果を保証するものではありません。',
      formTitle: '無料マッチングを取得',
      formSubtitle: 'フォームに記入して、5分以内に完璧なブローカーを見つけましょう',
      firstName: '名',
      lastName: '姓',
      email: 'メール',
      phone: '電話',
      country: '国',
      selectCountry: '国を選択',
      tradingExperience: '取引経験',
      selectExperience: '経験を選択',
      exp0: '経験なし',
      exp1: '0-1年',
      exp2: '1-3年',
      exp3: '3-5年',
      exp4: '5-10年',
      exp5: '10年以上',
      accountSize: '口座サイズ',
      selectAccountSize: '口座サイズを選択',
      size1: '$0 - $1,000',
      size2: '$1,000 - $5,000',
      size3: '$5,000 - $10,000',
      size4: '$10,000 - $50,000',
      size5: '$50,000 - $100,000',
      size6: '$100,000+',
      submitButton: '今すぐ始める',
      submitting: '送信中...',
      successMessage: '成功！すぐに完璧なブローカーとマッチングします。',
      errorMessage: '問題が発生しました。もう一度お試しください。',
    },
    ko: {
      badge: '🔥 독점 트레이딩 기회',
      headline: '완벽한 엘리트 브로커를 찾으세요',
      subheadline: '전 세계 50,000+ 트레이더와 함께 더 스마트한 거래 결정을',
      cta: '지금 시작하기',
      howItWorks: '작동 방식',
      step1Title: '매치 발견',
      step1Desc: '거래 목표와 경험 수준에 대한 몇 가지 간단한 질문에 답하기',
      step2Title: '즉시 매칭',
      step2Desc: '우리의 AI 알고리즘이 귀하의 필요에 완벽한 브로커와 연결',
      step3Title: '거래 시작',
      step3Desc: '신뢰할 수 있는 규제된 브로커로 거래 여정 시작',
      transformationTitle: '실제 트레이더의 실제 결과',
      beforeLabel: '전',
      afterLabel: '후',
      liveResultsTitle: '실시간 트레이딩 결과',
      liveResultsSubtitle: '24시간마다 업데이트',
      guaranteeTitle: '100% 무위험 보증',
      guaranteeBadge: '✓ 100% 무료 서비스',
      guaranteePoint1: '숨겨진 수수료 없음',
      guaranteePoint2: '규제된 브로커만',
      guaranteePoint3: '안전하고 기밀',
      guaranteePoint4: '24/7 지원',
      limitedOfferTitle: '기간 한정 기회',
      spotsLeft: '오늘 남은 자리',
      offerExpires: '이 제안 만료:',
      featuredIn: '소개된 곳',
      testimonialTitle: '트레이더들의 평가',
      testimonial1: '"5분 이내에 완벽한 브로커를 찾았습니다. 시스템이 놀랍습니다!"',
      testimonial1Name: 'Sarah M., 뉴욕',
      testimonial2: '"마침내 제 필요를 이해하는 서비스. 강력 추천!"',
      testimonial2Name: 'David L., 런던',
      testimonial3: '"제 경력에서 최고의 결정. 전문적이고 빠름!"',
      testimonial3Name: 'Michael R., 싱가포르',
      faqTitle: '자주 묻는 질문',
      faq1Q: '이 서비스는 정말 무료인가요?',
      faq1A: '네! 우리 서비스는 100% 무료입니다. 트레이더에게 청구하지 않습니다.',
      faq2Q: '매칭에 얼마나 걸리나요?',
      faq2A: '대부분의 트레이더는 5분 이내에 이상적인 브로커를 찾습니다.',
      faq3Q: '브로커는 규제되나요?',
      faq3A: '절대적으로. 우리는 라이선스가 있는 규제된 브로커와만 일합니다.',
      faq4Q: '매치가 마음에 들지 않으면 어떻게 하나요?',
      faq4A: '언제든지 새로운 매치를 요청할 수 있습니다.',
      footerDisclaimer: '거래에는 위험이 따릅니다. 과거 성과가 미래 결과를 보장하지 않습니다.',
      formTitle: '무료 매칭 받기',
      formSubtitle: '양식을 작성하고 5분 이내에 완벽한 브로커를 찾으세요',
      firstName: '이름',
      lastName: '성',
      email: '이메일',
      phone: '전화',
      country: '국가',
      selectCountry: '국가를 선택하세요',
      tradingExperience: '거래 경험',
      selectExperience: '경험을 선택하세요',
      exp0: '경험 없음',
      exp1: '0-1년',
      exp2: '1-3년',
      exp3: '3-5년',
      exp4: '5-10년',
      exp5: '10년 이상',
      accountSize: '계좌 규모',
      selectAccountSize: '계좌 규모 선택',
      size1: '$0 - $1,000',
      size2: '$1,000 - $5,000',
      size3: '$5,000 - $10,000',
      size4: '$10,000 - $50,000',
      size5: '$50,000 - $100,000',
      size6: '$100,000+',
      submitButton: '지금 시작하기',
      submitting: '제출 중...',
      successMessage: '성공! 곧 완벽한 브로커와 매칭해 드리겠습니다.',
      errorMessage: '문제가 발생했습니다. 다시 시도해 주세요.',
    },
    ar: {
      badge: '🔥 فرصة تداول حصرية',
      headline: 'اعثر على وسيطك النخبة المثالي',
      subheadline: 'انضم إلى 50,000+ متداول حول العالم يتخذون قرارات تداول أذكى',
      cta: 'ابدأ رحلتك الآن',
      howItWorks: 'كيف يعمل',
      step1Title: 'اكتشف مطابقتك',
      step1Desc: 'أجب على بعض الأسئلة السريعة حول أهدافك ومستوى خبرتك',
      step2Title: 'مطابقة فورية',
      step2Desc: 'تقوم خوارزمية الذكاء الاصطناعي بتوصيلك بالوسيط المثالي لاحتياجاتك',
      step3Title: 'ابدأ التداول',
      step3Desc: 'ابدأ رحلة التداول مع وسيط موثوق ومنظم',
      transformationTitle: 'نتائج حقيقية من متداولين حقيقيين',
      beforeLabel: 'قبل',
      afterLabel: 'بعد',
      liveResultsTitle: 'نتائج التداول المباشرة',
      liveResultsSubtitle: 'يتم التحديث كل 24 ساعة',
      guaranteeTitle: 'ضمان 100٪ خالٍ من المخاطر',
      guaranteeBadge: '✓ خدمة مجانية 100٪',
      guaranteePoint1: 'لا رسوم خفية',
      guaranteePoint2: 'وسطاء منظمون فقط',
      guaranteePoint3: 'آمن وسري',
      guaranteePoint4: 'دعم 24/7',
      limitedOfferTitle: 'فرصة لفترة محدودة',
      spotsLeft: 'الأماكن المتبقية اليوم',
      offerExpires: 'ينتهي هذا العرض في:',
      featuredIn: 'مميز في',
      testimonialTitle: 'ماذا يقول المتداولون',
      testimonial1: '"وجدت وسيطي المثالي في أقل من 5 دقائق. النظام رائع!"',
      testimonial1Name: 'سارة م.، نيويورك',
      testimonial2: '"أخيرًا، خدمة تفهم احتياجاتي. موصى به بشدة!"',
      testimonial2Name: 'ديفيد ل.، لندن',
      testimonial3: '"أفضل قرار لمسيرتي المهنية. محترف وسريع!"',
      testimonial3Name: 'مايكل ر.، سنغافورة',
      faqTitle: 'الأسئلة الشائعة',
      faq1Q: 'هل هذه الخدمة مجانية حقًا؟',
      faq1A: 'نعم! خدمتنا مجانية 100٪. لا نفرض رسومًا على المتداولين أبدًا.',
      faq2Q: 'كم من الوقت تستغرق المطابقة؟',
      faq2A: 'يجد معظم المتداولين وسيطهم المثالي في أقل من 5 دقائق.',
      faq3Q: 'هل الوسطاء منظمون؟',
      faq3A: 'تمامًا. نعمل فقط مع وسطاء مرخصين ومنظمين.',
      faq4Q: 'ماذا لو لم تعجبني مطابقتي؟',
      faq4A: 'يمكنك طلب مطابقة جديدة في أي وقت.',
      footerDisclaimer: 'ينطوي التداول على مخاطر. الأداء السابق لا يضمن النتائج المستقبلية.',
      formTitle: 'احصل على مطابقة مجانية',
      formSubtitle: 'املأ النموذج واعثر على وسيطك المثالي في أقل من 5 دقائق',
      firstName: 'الاسم الأول',
      lastName: 'اسم العائلة',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف',
      country: 'البلد',
      selectCountry: 'اختر بلدك',
      tradingExperience: 'خبرة التداول',
      selectExperience: 'اختر خبرتك',
      exp0: 'بدون خبرة',
      exp1: '0-1 سنة',
      exp2: '1-3 سنوات',
      exp3: '3-5 سنوات',
      exp4: '5-10 سنوات',
      exp5: '10+ سنوات',
      accountSize: 'حجم الحساب',
      selectAccountSize: 'اختر حجم الحساب',
      size1: '$0 - $1,000',
      size2: '$1,000 - $5,000',
      size3: '$5,000 - $10,000',
      size4: '$10,000 - $50,000',
      size5: '$50,000 - $100,000',
      size6: '$100,000+',
      submitButton: 'ابدأ الآن',
      submitting: 'جاري الإرسال...',
      successMessage: 'نجح! سنقوم بمطابقتك مع الوسيط المثالي قريبًا.',
      errorMessage: 'حدث خطأ. يرجى المحاولة مرة أخرى.',
    },
  };

  const t = translations[currentLang as keyof typeof translations];

  const countries = [
    'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France',
    'Spain', 'Italy', 'Netherlands', 'Belgium', 'Switzerland', 'Austria', 'Sweden',
    'Norway', 'Denmark', 'Finland', 'Poland', 'Czech Republic', 'Portugal', 'Ireland',
    'Singapore', 'Hong Kong', 'Japan', 'South Korea', 'Malaysia', 'Thailand', 'Indonesia',
    'Philippines', 'Vietnam', 'India', 'United Arab Emirates', 'Saudi Arabia', 'Qatar',
    'Kuwait', 'Israel', 'Turkey', 'South Africa', 'Nigeria', 'Kenya', 'Egypt',
    'Brazil', 'Mexico', 'Argentina', 'Chile', 'Colombia', 'Peru', 'New Zealand'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/send-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone_number: formData.phone,
          country: formData.country,
          trading_experience: formData.tradingExperience,
          account_size: formData.accountSize,
          source: 'tb1',
          language: currentLang,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitSuccess(true);
        setSubmitMessage(t.successMessage);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          country: '',
          tradingExperience: '',
          accountSize: '',
        });

        // Redirect to thank you page after 2 seconds
        setTimeout(() => {
          window.location.href = '/thank-you';
        }, 2000);
      } else {
        setSubmitSuccess(false);
        setSubmitMessage(t.errorMessage);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitSuccess(false);
      setSubmitMessage(t.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const languages = [
    { code: 'en', flag: '🇬🇧', name: 'English' },
    { code: 'es', flag: '🇪🇸', name: 'Español' },
    { code: 'fr', flag: '🇫🇷', name: 'Français' },
    { code: 'de', flag: '🇩🇪', name: 'Deutsch' },
    { code: 'it', flag: '🇮🇹', name: 'Italiano' },
    { code: 'pt', flag: '🇵🇹', name: 'Português' },
    { code: 'ru', flag: '🇷🇺', name: 'Русский' },
    { code: 'zh', flag: '🇨🇳', name: '中文' },
    { code: 'ja', flag: '🇯🇵', name: '日本語' },
    { code: 'ko', flag: '🇰🇷', name: '한국어' },
    { code: 'ar', flag: '🇸🇦', name: 'العربية' },
  ];

  return (
    <>
      <div className="tb1-container">
        {/* Language Selector */}
        <div className="language-selector">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`lang-btn ${currentLang === lang.code ? 'active' : ''}`}
              onClick={() => setCurrentLang(lang.code)}
              title={lang.name}
            >
              <span className="flag">{lang.flag}</span>
            </button>
          ))}
        </div>

        {/* Hero Section */}
        <section className="hero">
          <div className="hero-badge">{t.badge}</div>
          <h1 className="hero-title">{t.headline}</h1>
          <p className="hero-subtitle">{t.subheadline}</p>
          <a href="/tb1-signup" className="cta-button">
            {t.cta}
          </a>

          {/* Trust Badges */}
          <div className="trust-badges">
            <div className="trust-badge">
              <div className="trust-icon">🔒</div>
              <div className="trust-text">SSL Encrypted</div>
            </div>
            <div className="trust-badge">
              <div className="trust-icon">✓</div>
              <div className="trust-text">Regulated</div>
            </div>
            <div className="trust-badge">
              <div className="trust-icon">⭐</div>
              <div className="trust-text">4.9/5 Rating</div>
            </div>
          </div>
        </section>

        {/* Signup Form Section */}
        <section className="signup-form-section reveal">
          <div className="form-container">
            <div className="form-header">
              <h2 className="form-title">{t.formTitle}</h2>
              <p className="form-subtitle">{t.formSubtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="signup-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">{t.firstName}</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder={t.firstName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">{t.lastName}</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder={t.lastName}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">{t.email}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder={t.email}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">{t.phone}</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder={t.phone}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="country">{t.country}</label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                  className="form-select"
                >
                  <option value="">{t.selectCountry}</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="tradingExperience">{t.tradingExperience}</label>
                  <select
                    id="tradingExperience"
                    name="tradingExperience"
                    value={formData.tradingExperience}
                    onChange={handleInputChange}
                    required
                    className="form-select"
                  >
                    <option value="">{t.selectExperience}</option>
                    <option value="0">{t.exp0}</option>
                    <option value="0-1">{t.exp1}</option>
                    <option value="1-3">{t.exp2}</option>
                    <option value="3-5">{t.exp3}</option>
                    <option value="5-10">{t.exp4}</option>
                    <option value="10+">{t.exp5}</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="accountSize">{t.accountSize}</label>
                  <select
                    id="accountSize"
                    name="accountSize"
                    value={formData.accountSize}
                    onChange={handleInputChange}
                    required
                    className="form-select"
                  >
                    <option value="">{t.selectAccountSize}</option>
                    <option value="0-1k">{t.size1}</option>
                    <option value="1k-5k">{t.size2}</option>
                    <option value="5k-10k">{t.size3}</option>
                    <option value="10k-50k">{t.size4}</option>
                    <option value="50k-100k">{t.size5}</option>
                    <option value="100k+">{t.size6}</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? t.submitting : t.submitButton}
              </button>

              {submitMessage && (
                <div className={`submit-message ${submitSuccess ? 'success' : 'error'}`}>
                  {submitMessage}
                </div>
              )}
            </form>

            <div className="form-trust-indicators">
              <div className="trust-indicator">
                <span className="check-icon">✓</span>
                <span>100% Free Service</span>
              </div>
              <div className="trust-indicator">
                <span className="check-icon">✓</span>
                <span>No Credit Card Required</span>
              </div>
              <div className="trust-indicator">
                <span className="check-icon">✓</span>
                <span>Secure & Confidential</span>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="how-it-works reveal">
          <h2>{t.howItWorks}</h2>
          <div className="steps-grid">
            <div className="step-card reveal">
              <div className="step-number">1</div>
              <div className="step-icon">🎯</div>
              <h3>{t.step1Title}</h3>
              <p>{t.step1Desc}</p>
            </div>
            <div className="step-card reveal">
              <div className="step-number">2</div>
              <div className="step-icon">⚡</div>
              <h3>{t.step2Title}</h3>
              <p>{t.step2Desc}</p>
            </div>
            <div className="step-card reveal">
              <div className="step-number">3</div>
              <div className="step-icon">🚀</div>
              <h3>{t.step3Title}</h3>
              <p>{t.step3Desc}</p>
            </div>
          </div>
        </section>

        {/* Transformation Section */}
        <section className="transformation reveal">
          <h2>{t.transformationTitle}</h2>
          <div className="transformation-grid">
            <div className="transformation-card reveal">
              <div className="transformation-before">
                <div className="label">{t.beforeLabel}</div>
                <div className="metric-value negative">-$2,450</div>
                <div className="metric-label">Monthly Loss</div>
              </div>
              <div className="transformation-arrow">→</div>
              <div className="transformation-after">
                <div className="label">{t.afterLabel}</div>
                <div className="metric-value positive">+$8,920</div>
                <div className="metric-label">Monthly Profit</div>
              </div>
            </div>
            <div className="transformation-card reveal">
              <div className="transformation-before">
                <div className="label">{t.beforeLabel}</div>
                <div className="metric-value negative">28%</div>
                <div className="metric-label">Win Rate</div>
              </div>
              <div className="transformation-arrow">→</div>
              <div className="transformation-after">
                <div className="label">{t.afterLabel}</div>
                <div className="metric-value positive">73%</div>
                <div className="metric-label">Win Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Live Results */}
        <section className="live-results reveal">
          <h2>{t.liveResultsTitle}</h2>
          <p className="section-subtitle">{t.liveResultsSubtitle}</p>
          <div className="results-ticker">
            <div className="ticker-item">
              <span className="ticker-emoji">📈</span>
              <span className="ticker-text">+$12,450</span>
              <span className="ticker-label">EUR/USD</span>
            </div>
            <div className="ticker-item">
              <span className="ticker-emoji">💰</span>
              <span className="ticker-text">+$8,920</span>
              <span className="ticker-label">GBP/JPY</span>
            </div>
            <div className="ticker-item">
              <span className="ticker-emoji">🎯</span>
              <span className="ticker-text">+$15,780</span>
              <span className="ticker-label">Gold</span>
            </div>
          </div>
          <div className="stats-grid">
            <div className="stat-card reveal">
              <div className="stat-value" data-target="50000">0</div>
              <div className="stat-label">Active Traders</div>
            </div>
            <div className="stat-card reveal">
              <div className="stat-value" data-target="97">0</div>
              <div className="stat-label">Satisfaction Rate</div>
            </div>
            <div className="stat-card reveal">
              <div className="stat-value" data-target="24">0</div>
              <div className="stat-label">Countries Served</div>
            </div>
          </div>
        </section>

        {/* Guarantee Section */}
        <section className="guarantee reveal">
          <div className="guarantee-badge">{t.guaranteeBadge}</div>
          <h2>{t.guaranteeTitle}</h2>
          <div className="guarantee-grid">
            <div className="guarantee-item reveal">
              <div className="guarantee-icon">✓</div>
              <p>{t.guaranteePoint1}</p>
            </div>
            <div className="guarantee-item reveal">
              <div className="guarantee-icon">✓</div>
              <p>{t.guaranteePoint2}</p>
            </div>
            <div className="guarantee-item reveal">
              <div className="guarantee-icon">✓</div>
              <p>{t.guaranteePoint3}</p>
            </div>
            <div className="guarantee-item reveal">
              <div className="guarantee-icon">✓</div>
              <p>{t.guaranteePoint4}</p>
            </div>
          </div>
        </section>

        {/* Limited Offer */}
        <section className="limited-offer reveal">
          <div className="offer-card">
            <div className="offer-badge">⚡ {t.limitedOfferTitle}</div>
            <h2>
              <span id="spotsLeft">47</span> {t.spotsLeft}
            </h2>
            <div className="urgency-bar">
              <div className="urgency-fill"></div>
            </div>
            <p className="offer-timer-label">{t.offerExpires}</p>
            <div className="offer-timer">
              <div className="timer-segment">
                <div id="minutes" className="timer-value">14</div>
                <div className="timer-label">MIN</div>
              </div>
              <div className="timer-colon">:</div>
              <div className="timer-segment">
                <div id="seconds" className="timer-value">59</div>
                <div className="timer-label">SEC</div>
              </div>
            </div>
            <a href="/tb1-signup" className="cta-button pulse">
              {t.cta}
            </a>
          </div>
        </section>

        {/* Testimonials */}
        <section className="testimonials reveal">
          <h2>{t.testimonialTitle}</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card reveal">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">{t.testimonial1}</p>
              <p className="testimonial-author">{t.testimonial1Name}</p>
            </div>
            <div className="testimonial-card reveal">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">{t.testimonial2}</p>
              <p className="testimonial-author">{t.testimonial2Name}</p>
            </div>
            <div className="testimonial-card reveal">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">{t.testimonial3}</p>
              <p className="testimonial-author">{t.testimonial3Name}</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq reveal">
          <h2>{t.faqTitle}</h2>
          <div className="faq-grid">
            <div className="faq-item reveal">
              <h3>{t.faq1Q}</h3>
              <p>{t.faq1A}</p>
            </div>
            <div className="faq-item reveal">
              <h3>{t.faq2Q}</h3>
              <p>{t.faq2A}</p>
            </div>
            <div className="faq-item reveal">
              <h3>{t.faq3Q}</h3>
              <p>{t.faq3A}</p>
            </div>
            <div className="faq-item reveal">
              <h3>{t.faq4Q}</h3>
              <p>{t.faq4A}</p>
            </div>
          </div>
        </section>

        {/* Featured In */}
        <section className="featured reveal">
          <p className="featured-label">{t.featuredIn}</p>
          <div className="featured-logos">
            <div className="logo">Forbes</div>
            <div className="logo">Bloomberg</div>
            <div className="logo">Reuters</div>
            <div className="logo">CNBC</div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <p className="disclaimer">{t.footerDisclaimer}</p>
        </footer>
      </div>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          overflow-x: hidden;
        }

        .tb1-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        /* Language Selector */
        .language-selector {
          position: fixed;
          top: 20px;
          right: 20px;
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          max-width: 400px;
          background: rgba(255, 255, 255, 0.95);
          padding: 10px;
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          z-index: 1000;
        }

        .lang-btn {
          background: transparent;
          border: 2px solid transparent;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 20px;
        }

        .lang-btn:hover {
          transform: scale(1.1);
          background: rgba(102, 126, 234, 0.1);
        }

        .lang-btn.active {
          border-color: #667eea;
          background: rgba(102, 126, 234, 0.2);
          transform: scale(1.15);
        }

        /* Hero Section */
        .hero {
          text-align: center;
          padding: 100px 20px 60px;
          animation: fadeInUp 0.8s ease-out;
        }

        .hero-badge {
          display: inline-block;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
          padding: 12px 30px;
          border-radius: 50px;
          font-weight: 600;
          margin-bottom: 30px;
          animation: pulse 2s ease-in-out infinite;
          box-shadow: 0 4px 20px rgba(245, 87, 108, 0.4);
        }

        .hero-title {
          font-size: clamp(32px, 6vw, 64px);
          font-weight: 800;
          color: white;
          margin-bottom: 20px;
          line-height: 1.2;
          text-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
          animation: fadeInDown 0.8s ease-out 0.2s both;
        }

        .hero-subtitle {
          font-size: clamp(16px, 3vw, 24px);
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 40px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          animation: fadeInUp 0.8s ease-out 0.4s both;
        }

        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
          padding: 20px 50px;
          border-radius: 50px;
          font-size: 20px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          box-shadow: 0 10px 30px rgba(245, 87, 108, 0.4);
          animation: fadeInUp 0.8s ease-out 0.6s both;
          border: none;
          cursor: pointer;
        }

        .cta-button:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 15px 40px rgba(245, 87, 108, 0.6);
        }

        .cta-button.pulse {
          animation: pulse 2s ease-in-out infinite;
        }

        .trust-badges {
          display: flex;
          justify-content: center;
          gap: 30px;
          margin-top: 50px;
          flex-wrap: wrap;
          animation: fadeInUp 0.8s ease-out 0.8s both;
        }

        .trust-badge {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.2);
          padding: 12px 24px;
          border-radius: 30px;
          backdrop-filter: blur(10px);
        }

        .trust-icon {
          font-size: 24px;
        }

        .trust-text {
          color: white;
          font-weight: 600;
          font-size: 16px;
        }

        /* How It Works */
        .how-it-works {
          padding: 80px 20px;
          text-align: center;
        }

        .how-it-works h2 {
          font-size: clamp(32px, 5vw, 48px);
          color: white;
          margin-bottom: 60px;
          font-weight: 700;
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 40px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .step-card {
          background: rgba(255, 255, 255, 0.95);
          padding: 40px 30px;
          border-radius: 20px;
          position: relative;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .step-card:hover {
          transform: translateY(-15px) scale(1.05);
          box-shadow: 0 20px 50px rgba(102, 126, 234, 0.3);
        }

        .step-number {
          position: absolute;
          top: -20px;
          right: 20px;
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: 700;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .step-icon {
          font-size: 60px;
          margin-bottom: 20px;
        }

        .step-card h3 {
          font-size: 24px;
          color: #2d3748;
          margin-bottom: 15px;
        }

        .step-card p {
          color: #4a5568;
          line-height: 1.6;
          font-size: 16px;
        }

        /* Transformation Section */
        .transformation {
          padding: 80px 20px;
          text-align: center;
        }

        .transformation h2 {
          font-size: clamp(32px, 5vw, 48px);
          color: white;
          margin-bottom: 60px;
          font-weight: 700;
        }

        .transformation-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 40px;
          max-width: 900px;
          margin: 0 auto;
        }

        .transformation-card {
          background: rgba(255, 255, 255, 0.95);
          padding: 40px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          transition: all 0.4s ease;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .transformation-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .transformation-before,
        .transformation-after {
          flex: 1;
          text-align: center;
        }

        .label {
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          margin-bottom: 10px;
          color: #718096;
        }

        .metric-value {
          font-size: 36px;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .metric-value.negative {
          color: #e53e3e;
        }

        .metric-value.positive {
          color: #38a169;
        }

        .metric-label {
          font-size: 14px;
          color: #4a5568;
        }

        .transformation-arrow {
          font-size: 32px;
          color: #667eea;
          font-weight: 700;
        }

        /* Live Results */
        .live-results {
          padding: 80px 20px;
          text-align: center;
        }

        .live-results h2 {
          font-size: clamp(32px, 5vw, 48px);
          color: white;
          margin-bottom: 10px;
          font-weight: 700;
        }

        .section-subtitle {
          color: rgba(255, 255, 255, 0.9);
          font-size: 18px;
          margin-bottom: 40px;
        }

        .results-ticker {
          background: rgba(255, 255, 255, 0.95);
          padding: 30px;
          border-radius: 20px;
          display: flex;
          justify-content: space-around;
          gap: 30px;
          margin-bottom: 60px;
          overflow-x: auto;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .ticker-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          min-width: 150px;
        }

        .ticker-emoji {
          font-size: 32px;
        }

        .ticker-text {
          font-size: 24px;
          font-weight: 700;
          color: #38a169;
        }

        .ticker-label {
          font-size: 14px;
          color: #718096;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 30px;
          max-width: 900px;
          margin: 0 auto;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.95);
          padding: 40px;
          border-radius: 20px;
          transition: all 0.4s ease;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .stat-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .stat-value {
          font-size: 48px;
          font-weight: 800;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 10px;
        }

        .stat-label {
          font-size: 16px;
          color: #4a5568;
          font-weight: 500;
        }

        /* Guarantee */
        .guarantee {
          padding: 80px 20px;
          text-align: center;
        }

        .guarantee-badge {
          display: inline-block;
          background: linear-gradient(135deg, #38a169 0%, #2f855a 100%);
          color: white;
          padding: 10px 25px;
          border-radius: 50px;
          font-weight: 600;
          margin-bottom: 20px;
          box-shadow: 0 4px 15px rgba(56, 161, 105, 0.4);
        }

        .guarantee h2 {
          font-size: clamp(32px, 5vw, 48px);
          color: white;
          margin-bottom: 60px;
          font-weight: 700;
        }

        .guarantee-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 30px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .guarantee-item {
          background: rgba(255, 255, 255, 0.95);
          padding: 30px;
          border-radius: 15px;
          transition: all 0.4s ease;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .guarantee-item:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .guarantee-icon {
          font-size: 48px;
          color: #38a169;
          margin-bottom: 15px;
        }

        .guarantee-item p {
          font-size: 18px;
          color: #2d3748;
          font-weight: 600;
        }

        /* Limited Offer */
        .limited-offer {
          padding: 80px 20px;
          text-align: center;
        }

        .offer-card {
          background: rgba(255, 255, 255, 0.95);
          padding: 60px 40px;
          border-radius: 30px;
          max-width: 600px;
          margin: 0 auto;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
          position: relative;
          overflow: hidden;
        }

        .offer-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: linear-gradient(90deg, #f093fb 0%, #f5576c 100%);
        }

        .offer-badge {
          display: inline-block;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
          padding: 10px 25px;
          border-radius: 50px;
          font-weight: 600;
          margin-bottom: 20px;
          animation: pulse 2s ease-in-out infinite;
        }

        .offer-card h2 {
          font-size: 32px;
          color: #2d3748;
          margin-bottom: 30px;
        }

        #spotsLeft {
          color: #e53e3e;
          font-weight: 800;
        }

        .urgency-bar {
          width: 100%;
          height: 10px;
          background: #e2e8f0;
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 30px;
        }

        .urgency-fill {
          height: 100%;
          width: 53%;
          background: linear-gradient(90deg, #f093fb 0%, #f5576c 100%);
          border-radius: 10px;
          transition: width 1s ease;
        }

        .offer-timer-label {
          font-size: 16px;
          color: #718096;
          margin-bottom: 15px;
        }

        .offer-timer {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 40px;
          font-size: 48px;
          font-weight: 800;
          color: #2d3748;
        }

        .timer-segment {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .timer-value {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 20px 30px;
          border-radius: 15px;
          min-width: 100px;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        .timer-label {
          font-size: 14px;
          color: #718096;
          margin-top: 8px;
        }

        .timer-colon {
          display: flex;
          align-items: center;
          font-size: 48px;
          color: #667eea;
        }

        /* Testimonials */
        .testimonials {
          padding: 80px 20px;
          text-align: center;
        }

        .testimonials h2 {
          font-size: clamp(32px, 5vw, 48px);
          color: white;
          margin-bottom: 60px;
          font-weight: 700;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          max-width: 1100px;
          margin: 0 auto;
        }

        .testimonial-card {
          background: rgba(255, 255, 255, 0.95);
          padding: 40px;
          border-radius: 20px;
          transition: all 0.4s ease;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .testimonial-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .stars {
          font-size: 24px;
          margin-bottom: 20px;
        }

        .testimonial-text {
          font-size: 16px;
          color: #2d3748;
          line-height: 1.6;
          margin-bottom: 20px;
          font-style: italic;
        }

        .testimonial-author {
          font-size: 14px;
          color: #718096;
          font-weight: 600;
        }

        /* FAQ */
        .faq {
          padding: 80px 20px;
          text-align: center;
        }

        .faq h2 {
          font-size: clamp(32px, 5vw, 48px);
          color: white;
          margin-bottom: 60px;
          font-weight: 700;
        }

        .faq-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          max-width: 1100px;
          margin: 0 auto;
          text-align: left;
        }

        .faq-item {
          background: rgba(255, 255, 255, 0.95);
          padding: 30px;
          border-radius: 15px;
          transition: all 0.4s ease;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .faq-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
        }

        .faq-item h3 {
          font-size: 18px;
          color: #2d3748;
          margin-bottom: 15px;
        }

        .faq-item p {
          font-size: 16px;
          color: #4a5568;
          line-height: 1.6;
        }

        /* Featured */
        .featured {
          padding: 60px 20px;
          text-align: center;
        }

        .featured-label {
          color: rgba(255, 255, 255, 0.8);
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 30px;
        }

        .featured-logos {
          display: flex;
          justify-content: center;
          gap: 50px;
          flex-wrap: wrap;
        }

        .logo {
          font-size: 24px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.9);
          font-family: Georgia, serif;
        }

        /* Signup Form */
        .signup-form-section {
          padding: 80px 20px;
        }

        .form-container {
          max-width: 700px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.98);
          padding: 50px;
          border-radius: 30px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
          animation: fadeInUp 0.8s ease-out;
          position: relative;
        }

        .form-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
          border-radius: 30px 30px 0 0;
        }

        .form-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .form-title {
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 800;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 15px;
        }

        .form-subtitle {
          font-size: 16px;
          color: #4a5568;
          line-height: 1.6;
        }

        .signup-form {
          margin-bottom: 30px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-size: 14px;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 8px;
        }

        .form-input,
        .form-select {
          padding: 15px 20px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 16px;
          font-family: inherit;
          transition: all 0.3s ease;
          background: white;
        }

        .form-input:focus,
        .form-select:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .form-input::placeholder {
          color: #a0aec0;
        }

        .form-select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%234a5568' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 15px center;
          padding-right: 45px;
        }

        .submit-button {
          width: 100%;
          padding: 18px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 50px;
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
          margin-top: 10px;
        }

        .submit-button:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
        }

        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .submit-message {
          margin-top: 20px;
          padding: 15px;
          border-radius: 12px;
          text-align: center;
          font-weight: 600;
          animation: fadeInUp 0.4s ease-out;
        }

        .submit-message.success {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .submit-message.error {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        .form-trust-indicators {
          display: flex;
          justify-content: center;
          gap: 30px;
          flex-wrap: wrap;
          padding-top: 30px;
          border-top: 1px solid #e2e8f0;
        }

        .trust-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #4a5568;
          font-size: 14px;
        }

        .check-icon {
          width: 24px;
          height: 24px;
          background: linear-gradient(135deg, #38a169 0%, #2f855a 100%);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 16px;
        }

        /* Footer */
        .footer {
          padding: 40px 20px;
          text-align: center;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
        }

        .disclaimer {
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Animations */
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

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease-out;
        }

        .reveal.active {
          opacity: 1;
          transform: translateY(0);
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .language-selector {
            max-width: calc(100vw - 40px);
            right: 10px;
            top: 10px;
          }

          .lang-btn {
            width: 35px;
            height: 35px;
            font-size: 18px;
          }

          .hero {
            padding: 80px 20px 40px;
          }

          .trust-badges {
            gap: 15px;
          }

          .trust-badge {
            padding: 10px 16px;
          }

          .transformation-card {
            flex-direction: column;
            padding: 30px 20px;
          }

          .transformation-arrow {
            transform: rotate(90deg);
          }

          .results-ticker {
            flex-direction: column;
            gap: 20px;
          }

          .offer-card {
            padding: 40px 20px;
          }

          .offer-timer {
            font-size: 36px;
          }

          .timer-value {
            padding: 15px 20px;
            min-width: 80px;
            font-size: 36px;
          }

          .faq-grid,
          .testimonials-grid {
            grid-template-columns: 1fr;
          }

          .form-container {
            padding: 30px 20px;
          }

          .form-row {
            grid-template-columns: 1fr;
            gap: 15px;
          }

          .form-trust-indicators {
            flex-direction: column;
            gap: 15px;
          }
        }

        @media (max-width: 480px) {
          .language-selector {
            padding: 8px;
            gap: 6px;
          }

          .lang-btn {
            width: 32px;
            height: 32px;
            font-size: 16px;
          }
        }
      `}</style>

      <Script id="tb1-animations" strategy="afterInteractive">
        {`
          // Counter Animation
          function animateCounter(element, target, duration = 2500, suffix = '') {
            const increment = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              element.textContent = Math.floor(current) + suffix;
            }, 16);
          }

          // Countdown Timer
          let timeLeft = 14 * 60 + 59;
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
              timeLeft = 14 * 60 + 59;
            }
          }

          // Spots Counter
          let spotsLeft = 47;
          function updateSpots() {
            if (spotsLeft > 35) {
              spotsLeft--;
              const spotsEl = document.getElementById('spotsLeft');
              if (spotsEl) {
                spotsEl.textContent = spotsLeft;
              }

              const percentage = ((100 - spotsLeft) / 100) * 100;
              const fillEl = document.querySelector('.urgency-fill');
              if (fillEl) {
                fillEl.style.width = percentage + '%';
              }
            }
          }

          // Scroll Reveal
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

          // Stats Counter Observer
          const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                const target = parseInt(entry.target.dataset.target);
                const hasPercent = entry.target.parentElement.textContent.includes('Rate');
                animateCounter(entry.target, target, 2500, hasPercent ? '%' : '');
              }
            });
          }, { threshold: 0.5 });

          // Initialize
          document.addEventListener('DOMContentLoaded', () => {
            // Start countdown
            setInterval(updateCountdown, 1000);
            updateCountdown();

            // Start spots counter
            setInterval(updateSpots, Math.random() * 60000 + 30000);

            // Observe stat cards
            document.querySelectorAll('.stat-value').forEach(stat => {
              statsObserver.observe(stat);
            });

            // Initial reveal check
            revealOnScroll();
          });

          // Scroll listener
          window.addEventListener('scroll', revealOnScroll);
        `}
      </Script>
    </>
  );
}
