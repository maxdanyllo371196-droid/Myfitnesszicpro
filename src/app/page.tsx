"use client";

import { useState } from "react";
import { 
  Activity, 
  Check, 
  Star, 
  Shield, 
  Zap, 
  Users, 
  ArrowRight,
  Camera,
  TrendingUp,
  Bell,
  Heart,
  Smartphone,
  Crown,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});

  const quizQuestions = [
    {
      question: "Há quanto tempo você usa Ozempic?",
      options: ["Menos de 1 mês", "1-3 meses", "3-6 meses", "Mais de 6 meses"]
    },
    {
      question: "Qual é sua maior dificuldade no tratamento?",
      options: [
        "Lembrar das injeções",
        "Controlar a alimentação",
        "Acompanhar o progresso",
        "Todas as opções"
      ]
    },
    {
      question: "Você já usa algum app de acompanhamento?",
      options: ["Sim, mas não é específico", "Não, uso papel", "Não acompanho", "Tento lembrar de cabeça"]
    },
    {
      question: "O que mais te motivaria a usar um app?",
      options: [
        "Facilidade de uso",
        "Lembretes automáticos",
        "Visualizar progresso",
        "Tudo isso junto"
      ]
    }
  ];

  const handleQuizAnswer = (answer: string) => {
    setQuizAnswers({ ...quizAnswers, [quizStep]: answer });
    
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      // Quiz finalizado - redirecionar para o app
      setTimeout(() => {
        router.push("/app");
      }, 500);
    }
  };

  if (showQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4">
        <Card className="max-w-2xl w-full shadow-2xl border-0">
          <CardContent className="p-8">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-500">
                  Pergunta {quizStep + 1} de {quizQuestions.length}
                </span>
                <span className="text-sm font-medium text-blue-600">
                  {Math.round(((quizStep + 1) / quizQuestions.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((quizStep + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
              {quizQuestions[quizStep].question}
            </h2>

            <div className="space-y-3">
              {quizQuestions[quizStep].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleQuizAnswer(option)}
                  className="w-full p-4 text-left rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-blue-500 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="font-medium text-gray-700 group-hover:text-blue-600">
                      {option}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setShowQuiz(false);
                setQuizStep(0);
                setQuizAnswers({});
              }}
              className="mt-6 text-sm text-gray-500 hover:text-gray-700"
            >
              ← Voltar para o site
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 py-16 sm:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
              <span className="text-sm font-medium">Mais de 10.000 usuários satisfeitos</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Transforme Sua Jornada com
              <span className="block mt-2 bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                Ozempic Tracker
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl mb-8 text-blue-50 max-w-2xl mx-auto">
              O aplicativo completo para acompanhar seu tratamento com Ozempic de forma simples, intuitiva e eficaz.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={() => setShowQuiz(true)}
                className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6 rounded-full shadow-2xl group"
              >
                Começar Quiz de Compra
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => router.push("/app")}
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6 rounded-full"
              >
                Testar App Grátis
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-300" />
                <span>Pagamento único</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-300" />
                <span>Suporte 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-300" />
                <span>Garantia 30 dias</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Tudo que você precisa em um só lugar
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Funcionalidades pensadas especialmente para quem usa Ozempic
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Activity,
                title: "Registro Diário Completo",
                description: "Acompanhe proteínas, fibras e água com botões rápidos e intuitivos",
                color: "from-rose-500 to-pink-500"
              },
              {
                icon: Camera,
                title: "Fotos das Injeções",
                description: "Registre visualmente suas aplicações com data e hora automáticas",
                color: "from-purple-500 to-indigo-500"
              },
              {
                icon: TrendingUp,
                title: "Gráficos de Progresso",
                description: "Visualize sua evolução dos últimos 7 dias de forma clara",
                color: "from-emerald-500 to-teal-500"
              },
              {
                icon: Bell,
                title: "Lembretes Inteligentes",
                description: "Notificações para nunca esquecer suas injeções e metas diárias",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: Smartphone,
                title: "100% Responsivo",
                description: "Funciona perfeitamente em celular, tablet e computador",
                color: "from-amber-500 to-orange-500"
              },
              {
                icon: Shield,
                title: "Dados Seguros",
                description: "Suas informações ficam salvas localmente no seu dispositivo",
                color: "from-violet-500 to-purple-500"
              }
            ].map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 sm:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Escolha o plano ideal para você
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Investimento único com acesso vitalício. Sem mensalidades!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Plano Básico */}
            <Card className="border-2 border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 mb-4">
                    <Activity className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Básico</h3>
                  <p className="text-gray-600 mb-4">Para quem está começando</p>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-gray-900">R$ 47</span>
                    <span className="text-gray-600 ml-2">pagamento único</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {[
                    "Registro diário completo",
                    "Fotos das injeções",
                    "Gráficos básicos",
                    "Lembretes simples",
                    "Suporte por email"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  onClick={() => setShowQuiz(true)}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-6 rounded-xl"
                >
                  Começar Agora
                </Button>
              </CardContent>
            </Card>

            {/* Plano Premium - DESTAQUE */}
            <Card className="border-4 border-purple-500 shadow-2xl hover:shadow-3xl transition-all duration-300 relative transform md:scale-105">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                  <Crown className="w-4 h-4" />
                  MAIS POPULAR
                </div>
              </div>
              
              <CardContent className="p-8 pt-12">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mb-4">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium</h3>
                  <p className="text-gray-600 mb-4">Recomendado para resultados</p>
                  <div className="mb-6">
                    <span className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">R$ 97</span>
                    <span className="text-gray-600 ml-2">pagamento único</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {[
                    "Tudo do plano Básico",
                    "Gráficos avançados e insights",
                    "Lembretes inteligentes personalizados",
                    "Exportação de relatórios PDF",
                    "Suporte prioritário 24/7",
                    "Atualizações vitalícias",
                    "Acesso a novos recursos"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  onClick={() => setShowQuiz(true)}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6 rounded-xl text-lg font-bold"
                >
                  Começar Agora
                </Button>
              </CardContent>
            </Card>

            {/* Plano Profissional */}
            <Card className="border-2 border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 mb-4">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Profissional</h3>
                  <p className="text-gray-600 mb-4">Para profissionais de saúde</p>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-gray-900">R$ 197</span>
                    <span className="text-gray-600 ml-2">pagamento único</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {[
                    "Tudo do plano Premium",
                    "Gestão de múltiplos pacientes",
                    "Dashboard profissional",
                    "Relatórios personalizados",
                    "API de integração",
                    "Treinamento exclusivo",
                    "Suporte dedicado"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  onClick={() => setShowQuiz(true)}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-6 rounded-xl"
                >
                  Começar Agora
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Garantia */}
          <div className="mt-16 text-center">
            <Card className="max-w-2xl mx-auto border-2 border-green-200 bg-green-50">
              <CardContent className="p-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                  <h3 className="text-2xl font-bold text-gray-900">Garantia de 30 Dias</h3>
                </div>
                <p className="text-gray-700 text-lg">
                  Experimente sem riscos! Se não ficar satisfeito, devolvemos 100% do seu dinheiro. Sem perguntas, sem complicações.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                O que nossos usuários dizem
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Maria Silva",
                  text: "Mudou completamente minha rotina! Agora consigo acompanhar tudo facilmente.",
                  rating: 5
                },
                {
                  name: "João Santos",
                  text: "O melhor app para quem usa Ozempic. Interface linda e muito fácil de usar.",
                  rating: 5
                },
                {
                  name: "Ana Costa",
                  text: "Os lembretes me ajudaram muito a não esquecer as injeções. Recomendo!",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Users, value: "10.000+", label: "Usuários Ativos" },
              { icon: Heart, value: "98%", label: "Satisfação" },
              { icon: Zap, value: "50.000+", label: "Registros Diários" },
              { icon: Star, value: "4.9", label: "Avaliação" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl sm:text-5xl font-bold mb-6">
              Pronto para transformar sua jornada?
            </h2>
            <p className="text-xl mb-8 text-blue-50">
              Junte-se a milhares de pessoas que já estão tendo resultados incríveis
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => setShowQuiz(true)}
                className="bg-white text-purple-600 hover:bg-gray-100 text-xl px-12 py-7 rounded-full shadow-2xl group"
              >
                Começar Agora - Quiz Rápido
                <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => router.push("/app")}
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-xl px-12 py-7 rounded-full"
              >
                Testar Grátis
              </Button>
            </div>
            <p className="mt-6 text-sm text-blue-100">
              ✓ Sem compromisso • ✓ Garantia de 30 dias • ✓ Suporte incluído
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Activity className="w-6 h-6 text-purple-400" />
              <span className="text-xl font-bold">Ozempic Tracker</span>
            </div>
            <p className="text-gray-400 mb-6">
              Transformando vidas através da tecnologia
            </p>
            <div className="flex justify-center gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-white transition-colors">Privacidade</a>
              <a href="#" className="hover:text-white transition-colors">Contato</a>
            </div>
            <p className="mt-6 text-sm text-gray-500">
              © 2024 Ozempic Tracker. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
