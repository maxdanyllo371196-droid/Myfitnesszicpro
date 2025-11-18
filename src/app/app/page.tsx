"use client";

import { useState, useEffect } from "react";
import {
  Activity,
  Camera,
  TrendingUp,
  Calendar,
  Droplet,
  Apple,
  Wheat,
  Plus,
  Minus,
  Bell,
  Settings,
  BarChart3,
  Trash2,
  ChevronLeft,
  ChevronRight,
  User,
  Target,
  Scale,
  Ruler,
  Cake,
  Dumbbell,
  X,
  Utensils,
  Coffee,
  Moon,
  Sun,
  Search,
  BookOpen,
  Award,
  Heart,
  Flame,
  Zap,
  TrendingDown,
  Edit,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
  type: "breakfast" | "lunch" | "dinner" | "snack";
}

interface Exercise {
  id: string;
  name: string;
  duration: number;
  caloriesBurned: number;
  time: string;
  category?: string;
}

interface DailyRecord {
  date: string;
  meals: Meal[];
  exercises: Exercise[];
  water: number;
  weight?: number;
  notes?: string;
}

interface UserProfile {
  name: string;
  age: number;
  height: number;
  currentWeight: number;
  targetWeight: number;
  activityLevel: "sedentary" | "light" | "moderate" | "active" | "very-active";
  gender: "male" | "female";
  goal: "lose" | "maintain" | "gain";
}

interface FoodDatabase {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  serving: string;
}

interface ExerciseDatabase {
  id: string;
  name: string;
  category: string;
  caloriesPerMinute: number;
  description: string;
  muscleGroup?: string;
}

// Banco de dados de alimentos comum no Brasil
const foodDatabase: FoodDatabase[] = [
  { id: "1", name: "Arroz branco (1 xícara)", calories: 206, protein: 4.3, carbs: 45, fat: 0.4, serving: "1 xícara" },
  { id: "2", name: "Feijão preto (1 concha)", calories: 132, protein: 8.9, carbs: 23, fat: 0.5, serving: "1 concha" },
  { id: "3", name: "Peito de frango grelhado (100g)", calories: 165, protein: 31, carbs: 0, fat: 3.6, serving: "100g" },
  { id: "4", name: "Ovo cozido (1 unidade)", calories: 78, protein: 6.3, carbs: 0.6, fat: 5.3, serving: "1 unidade" },
  { id: "5", name: "Banana (1 unidade)", calories: 105, protein: 1.3, carbs: 27, fat: 0.4, serving: "1 unidade" },
  { id: "6", name: "Maçã (1 unidade)", calories: 95, protein: 0.5, carbs: 25, fat: 0.3, serving: "1 unidade" },
  { id: "7", name: "Pão francês (1 unidade)", calories: 135, protein: 4.5, carbs: 26, fat: 1.5, serving: "1 unidade" },
  { id: "8", name: "Leite integral (1 copo)", calories: 149, protein: 7.7, carbs: 11.7, fat: 8, serving: "1 copo" },
  { id: "9", name: "Iogurte natural (1 pote)", calories: 59, protein: 3.5, carbs: 4.7, fat: 3.3, serving: "1 pote" },
  { id: "10", name: "Batata doce (100g)", calories: 86, protein: 1.6, carbs: 20, fat: 0.1, serving: "100g" },
  { id: "11", name: "Aveia (1/2 xícara)", calories: 150, protein: 5, carbs: 27, fat: 3, serving: "1/2 xícara" },
  { id: "12", name: "Queijo minas (1 fatia)", calories: 72, protein: 6.5, carbs: 1.5, fat: 4.5, serving: "1 fatia" },
  { id: "13", name: "Tomate (1 unidade)", calories: 22, protein: 1.1, carbs: 4.8, fat: 0.2, serving: "1 unidade" },
  { id: "14", name: "Alface (1 xícara)", calories: 5, protein: 0.5, carbs: 1, fat: 0.1, serving: "1 xícara" },
  { id: "15", name: "Azeite de oliva (1 colher)", calories: 119, protein: 0, carbs: 0, fat: 13.5, serving: "1 colher" },
];

// Banco de dados de exercícios para ganhar massa muscular
const muscleGainExercises: ExerciseDatabase[] = [
  { id: "m1", name: "Supino Reto", category: "Ganho de Massa", caloriesPerMinute: 6, description: "Peito, tríceps e ombros", muscleGroup: "Peito" },
  { id: "m2", name: "Agachamento Livre", category: "Ganho de Massa", caloriesPerMinute: 8, description: "Pernas completas e core", muscleGroup: "Pernas" },
  { id: "m3", name: "Levantamento Terra", category: "Ganho de Massa", caloriesPerMinute: 9, description: "Costas, pernas e core", muscleGroup: "Costas" },
  { id: "m4", name: "Desenvolvimento com Barra", category: "Ganho de Massa", caloriesPerMinute: 6, description: "Ombros e tríceps", muscleGroup: "Ombros" },
  { id: "m5", name: "Remada Curvada", category: "Ganho de Massa", caloriesPerMinute: 7, description: "Costas e bíceps", muscleGroup: "Costas" },
  { id: "m6", name: "Rosca Direta", category: "Ganho de Massa", caloriesPerMinute: 4, description: "Bíceps", muscleGroup: "Bíceps" },
  { id: "m7", name: "Tríceps Testa", category: "Ganho de Massa", caloriesPerMinute: 4, description: "Tríceps", muscleGroup: "Tríceps" },
  { id: "m8", name: "Leg Press", category: "Ganho de Massa", caloriesPerMinute: 7, description: "Quadríceps e glúteos", muscleGroup: "Pernas" },
  { id: "m9", name: "Pulldown", category: "Ganho de Massa", caloriesPerMinute: 5, description: "Costas e bíceps", muscleGroup: "Costas" },
  { id: "m10", name: "Elevação Lateral", category: "Ganho de Massa", caloriesPerMinute: 4, description: "Ombros laterais", muscleGroup: "Ombros" },
  { id: "m11", name: "Crucifixo", category: "Ganho de Massa", caloriesPerMinute: 5, description: "Peito", muscleGroup: "Peito" },
  { id: "m12", name: "Stiff", category: "Ganho de Massa", caloriesPerMinute: 7, description: "Posterior de coxa e glúteos", muscleGroup: "Pernas" },
];

// Banco de dados de exercícios para perder gordura
const fatLossExercises: ExerciseDatabase[] = [
  { id: "f1", name: "Corrida", category: "Perda de Gordura", caloriesPerMinute: 12, description: "Cardio intenso", muscleGroup: "Cardio" },
  { id: "f2", name: "Caminhada Rápida", category: "Perda de Gordura", caloriesPerMinute: 5, description: "Cardio leve", muscleGroup: "Cardio" },
  { id: "f3", name: "Ciclismo", category: "Perda de Gordura", caloriesPerMinute: 10, description: "Cardio moderado", muscleGroup: "Cardio" },
  { id: "f4", name: "Pular Corda", category: "Perda de Gordura", caloriesPerMinute: 13, description: "Cardio intenso", muscleGroup: "Cardio" },
  { id: "f5", name: "Burpees", category: "Perda de Gordura", caloriesPerMinute: 14, description: "HIIT corpo inteiro", muscleGroup: "Full Body" },
  { id: "f6", name: "Mountain Climbers", category: "Perda de Gordura", caloriesPerMinute: 11, description: "HIIT core e cardio", muscleGroup: "Core" },
  { id: "f7", name: "Jumping Jacks", category: "Perda de Gordura", caloriesPerMinute: 9, description: "Cardio moderado", muscleGroup: "Cardio" },
  { id: "f8", name: "Natação", category: "Perda de Gordura", caloriesPerMinute: 11, description: "Cardio completo", muscleGroup: "Full Body" },
  { id: "f9", name: "Spinning", category: "Perda de Gordura", caloriesPerMinute: 12, description: "Cardio intenso", muscleGroup: "Cardio" },
  { id: "f10", name: "Elíptico", category: "Perda de Gordura", caloriesPerMinute: 8, description: "Cardio baixo impacto", muscleGroup: "Cardio" },
  { id: "f11", name: "Remo Indoor", category: "Perda de Gordura", caloriesPerMinute: 10, description: "Cardio e força", muscleGroup: "Full Body" },
  { id: "f12", name: "Boxe", category: "Perda de Gordura", caloriesPerMinute: 13, description: "Cardio e coordenação", muscleGroup: "Full Body" },
  { id: "f13", name: "HIIT Circuit", category: "Perda de Gordura", caloriesPerMinute: 15, description: "Alta intensidade", muscleGroup: "Full Body" },
  { id: "f14", name: "Escada", category: "Perda de Gordura", caloriesPerMinute: 11, description: "Cardio intenso", muscleGroup: "Pernas" },
];

export default function AppPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dailyRecords, setDailyRecords] = useState<Record<string, DailyRecord>>({});
  const [activeTab, setActiveTab] = useState<"home" | "food" | "exercise" | "progress" | "profile">("home");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [showAddExercise, setShowAddExercise] = useState(false);
  const [showFoodSearch, setShowFoodSearch] = useState(false);
  const [showExerciseLibrary, setShowExerciseLibrary] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [exerciseSearchQuery, setExerciseSearchQuery] = useState("");
  const [selectedMealType, setSelectedMealType] = useState<"breakfast" | "lunch" | "dinner" | "snack">("breakfast");
  const [selectedExerciseCategory, setSelectedExerciseCategory] = useState<"all" | "muscle" | "fat">("all");
  
  // Carregar dados do localStorage
  useEffect(() => {
    const savedRecords = localStorage.getItem("fitness_records");
    const savedProfile = localStorage.getItem("fitness_profile");
    
    if (savedRecords) {
      setDailyRecords(JSON.parse(savedRecords));
    }
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
      setShowOnboarding(false);
    }
  }, []);

  // Salvar dados no localStorage
  useEffect(() => {
    localStorage.setItem("fitness_records", JSON.stringify(dailyRecords));
  }, [dailyRecords]);

  useEffect(() => {
    if (userProfile) {
      localStorage.setItem("fitness_profile", JSON.stringify(userProfile));
    }
  }, [userProfile]);

  const dateKey = currentDate.toISOString().split("T")[0];
  const currentRecord = dailyRecords[dateKey] || { 
    date: dateKey, 
    meals: [], 
    exercises: [], 
    water: 0 
  };

  const updateRecord = (updates: Partial<DailyRecord>) => {
    setDailyRecords({
      ...dailyRecords,
      [dateKey]: { ...currentRecord, ...updates }
    });
  };

  const addMeal = (meal: Omit<Meal, "id">) => {
    const newMeal: Meal = {
      ...meal,
      id: Date.now().toString()
    };
    updateRecord({ meals: [...currentRecord.meals, newMeal] });
    setShowAddMeal(false);
    setShowFoodSearch(false);
  };

  const deleteMeal = (id: string) => {
    updateRecord({ meals: currentRecord.meals.filter(m => m.id !== id) });
  };

  const addExercise = (exercise: Omit<Exercise, "id">) => {
    const newExercise: Exercise = {
      ...exercise,
      id: Date.now().toString()
    };
    updateRecord({ exercises: [...currentRecord.exercises, newExercise] });
    setShowAddExercise(false);
    setShowExerciseLibrary(false);
  };

  const deleteExercise = (id: string) => {
    updateRecord({ exercises: currentRecord.exercises.filter(e => e.id !== id) });
  };

  const incrementWater = () => {
    updateRecord({ water: currentRecord.water + 250 });
  };

  const changeDate = (days: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  // Cálculos nutricionais
  const getTotalCalories = () => {
    return currentRecord.meals.reduce((sum, meal) => sum + meal.calories, 0);
  };

  const getTotalProtein = () => {
    return currentRecord.meals.reduce((sum, meal) => sum + meal.protein, 0);
  };

  const getTotalCarbs = () => {
    return currentRecord.meals.reduce((sum, meal) => sum + meal.carbs, 0);
  };

  const getTotalFat = () => {
    return currentRecord.meals.reduce((sum, meal) => sum + meal.fat, 0);
  };

  const getCaloriesBurned = () => {
    return currentRecord.exercises.reduce((sum, ex) => sum + ex.caloriesBurned, 0);
  };

  const getNetCalories = () => {
    return getTotalCalories() - getCaloriesBurned();
  };

  // Cálculos de metas
  const calculateBMI = () => {
    if (!userProfile) return 0;
    const heightInMeters = userProfile.height / 100;
    return userProfile.currentWeight / (heightInMeters * heightInMeters);
  };

  const calculateTMB = () => {
    if (!userProfile) return 0;
    
    let tmb = 0;
    if (userProfile.gender === "male") {
      tmb = 88.362 + (13.397 * userProfile.currentWeight) + (4.799 * userProfile.height) - (5.677 * userProfile.age);
    } else {
      tmb = 447.593 + (9.247 * userProfile.currentWeight) + (3.098 * userProfile.height) - (4.330 * userProfile.age);
    }

    const activityMultipliers = {
      "sedentary": 1.2,
      "light": 1.375,
      "moderate": 1.55,
      "active": 1.725,
      "very-active": 1.9
    };

    return Math.round(tmb * activityMultipliers[userProfile.activityLevel]);
  };

  const getCalorieGoal = () => {
    if (!userProfile) return 2000;
    const tmb = calculateTMB();
    
    if (userProfile.goal === "lose") {
      return Math.round(tmb - 500);
    } else if (userProfile.goal === "gain") {
      return Math.round(tmb + 500);
    }
    return tmb;
  };

  const getProteinGoal = () => {
    if (!userProfile) return 150;
    return Math.round(userProfile.currentWeight * 1.6); // 1.6g por kg
  };

  const getCarbsGoal = () => {
    const calorieGoal = getCalorieGoal();
    return Math.round((calorieGoal * 0.45) / 4); // 45% das calorias
  };

  const getFatGoal = () => {
    const calorieGoal = getCalorieGoal();
    return Math.round((calorieGoal * 0.30) / 9); // 30% das calorias
  };

  const getLast7DaysData = () => {
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const key = date.toISOString().split("T")[0];
      const record = dailyRecords[key];
      
      const calories = record ? record.meals.reduce((sum, m) => sum + m.calories, 0) : 0;
      const burned = record ? record.exercises.reduce((sum, e) => sum + e.caloriesBurned, 0) : 0;
      
      data.push({
        date: date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
        calories,
        burned,
        net: calories - burned,
        water: record?.water || 0
      });
    }
    return data;
  };

  const filteredFoods = foodDatabase.filter(food =>
    food.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filtrar exercícios baseado no objetivo do usuário
  const getRecommendedExercises = () => {
    if (!userProfile) return [...muscleGainExercises, ...fatLossExercises];
    
    if (selectedExerciseCategory === "muscle") {
      return muscleGainExercises;
    } else if (selectedExerciseCategory === "fat") {
      return fatLossExercises;
    }
    
    // Se "all", mostrar baseado no objetivo do usuário
    if (userProfile.goal === "gain") {
      return [...muscleGainExercises, ...fatLossExercises];
    } else if (userProfile.goal === "lose") {
      return [...fatLossExercises, ...muscleGainExercises];
    }
    return [...muscleGainExercises, ...fatLossExercises];
  };

  const filteredExercises = getRecommendedExercises().filter(exercise =>
    exercise.name.toLowerCase().includes(exerciseSearchQuery.toLowerCase()) ||
    exercise.description.toLowerCase().includes(exerciseSearchQuery.toLowerCase())
  );

  // Onboarding
  if (showOnboarding) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl border-0 shadow-2xl">
          <CardHeader className="text-center pb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-4">
              <Activity className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-3xl">Bem-vindo ao NutriTrack</CardTitle>
            <p className="text-gray-500 mt-2">Configure seu perfil para começar sua jornada de saúde</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nome</Label>
                <Input id="name" placeholder="Seu nome" />
              </div>
              <div>
                <Label htmlFor="age">Idade</Label>
                <Input id="age" type="number" placeholder="Ex: 35" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="height">Altura (cm)</Label>
                <Input id="height" type="number" placeholder="Ex: 170" />
              </div>
              <div>
                <Label htmlFor="gender">Sexo</Label>
                <select
                  id="gender"
                  className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white"
                >
                  <option value="female">Feminino</option>
                  <option value="male">Masculino</option>
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="currentWeight">Peso Atual (kg)</Label>
                <Input id="currentWeight" type="number" placeholder="Ex: 85" />
              </div>
              <div>
                <Label htmlFor="targetWeight">Peso Desejado (kg)</Label>
                <Input id="targetWeight" type="number" placeholder="Ex: 70" />
              </div>
            </div>

            <div>
              <Label htmlFor="goal">Objetivo</Label>
              <select
                id="goal"
                className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white"
              >
                <option value="lose">Perder peso</option>
                <option value="maintain">Manter peso</option>
                <option value="gain">Ganhar peso</option>
              </select>
            </div>

            <div>
              <Label htmlFor="activityLevel">Nível de Atividade</Label>
              <select
                id="activityLevel"
                className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white"
              >
                <option value="sedentary">Sedentário (pouco ou nenhum exercício)</option>
                <option value="light">Leve (exercício 1-3 dias/semana)</option>
                <option value="moderate">Moderado (exercício 3-5 dias/semana)</option>
                <option value="active">Ativo (exercício 6-7 dias/semana)</option>
                <option value="very-active">Muito Ativo (exercício intenso diário)</option>
              </select>
            </div>

            <Button
              className="w-full h-12 text-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
              onClick={() => {
                const profile: UserProfile = {
                  name: (document.getElementById("name") as HTMLInputElement).value,
                  age: parseInt((document.getElementById("age") as HTMLInputElement).value),
                  height: parseInt((document.getElementById("height") as HTMLInputElement).value),
                  currentWeight: parseFloat((document.getElementById("currentWeight") as HTMLInputElement).value),
                  targetWeight: parseFloat((document.getElementById("targetWeight") as HTMLInputElement).value),
                  activityLevel: (document.getElementById("activityLevel") as HTMLSelectElement).value as any,
                  gender: (document.getElementById("gender") as HTMLSelectElement).value as any,
                  goal: (document.getElementById("goal") as HTMLSelectElement).value as any
                };
                setUserProfile(profile);
                setShowOnboarding(false);
              }}
            >
              Começar Jornada
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">NutriTrack</h1>
                <p className="text-sm text-gray-500">Olá, {userProfile?.name || "Usuário"}!</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowSettings(true)}
              >
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md border-0 shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle>Configurações</CardTitle>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowSettings(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => {
                  setShowSettings(false);
                  setShowOnboarding(true);
                }}
              >
                <User className="w-5 h-5 mr-2" />
                Editar Perfil
              </Button>
              
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => {
                  if (confirm("Tem certeza que deseja limpar todos os dados?")) {
                    localStorage.clear();
                    setDailyRecords({});
                    setUserProfile(null);
                    setShowOnboarding(true);
                    setShowSettings(false);
                  }
                }}
              >
                <Trash2 className="w-5 h-5 mr-2" />
                Limpar Todos os Dados
              </Button>

              <div className="pt-4 border-t">
                <p className="text-sm text-gray-500 text-center">
                  Versão 1.0.0 • NutriTrack Pro
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add Meal Modal */}
      {showAddMeal && !showFoodSearch && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md border-0 shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle>Adicionar Refeição</CardTitle>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowAddMeal(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Tipo de Refeição</Label>
                <select
                  className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white mt-1"
                  value={selectedMealType}
                  onChange={(e) => setSelectedMealType(e.target.value as any)}
                >
                  <option value="breakfast">Café da Manhã</option>
                  <option value="lunch">Almoço</option>
                  <option value="dinner">Jantar</option>
                  <option value="snack">Lanche</option>
                </select>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600"
                onClick={() => setShowFoodSearch(true)}
              >
                <Search className="w-5 h-5 mr-2" />
                Buscar Alimento
              </Button>

              <div className="text-center text-sm text-gray-500">ou</div>

              <Button
                className="w-full"
                variant="outline"
                onClick={() => {
                  const name = prompt("Nome do alimento:");
                  if (!name) return;
                  const calories = parseInt(prompt("Calorias:") || "0");
                  const protein = parseFloat(prompt("Proteínas (g):") || "0");
                  const carbs = parseFloat(prompt("Carboidratos (g):") || "0");
                  const fat = parseFloat(prompt("Gorduras (g):") || "0");
                  
                  addMeal({
                    name,
                    calories,
                    protein,
                    carbs,
                    fat,
                    time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
                    type: selectedMealType
                  });
                }}
              >
                <Plus className="w-5 h-5 mr-2" />
                Adicionar Manualmente
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Food Search Modal */}
      {showFoodSearch && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl border-0 shadow-2xl max-h-[80vh] overflow-hidden flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle>Banco de Alimentos</CardTitle>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowFoodSearch(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto">
              <div className="mb-4">
                <Input
                  placeholder="Buscar alimento..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                {filteredFoods.map((food) => (
                  <Card
                    key={food.id}
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      addMeal({
                        name: food.name,
                        calories: food.calories,
                        protein: food.protein,
                        carbs: food.carbs,
                        fat: food.fat,
                        time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
                        type: selectedMealType
                      });
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-gray-900">{food.name}</p>
                          <p className="text-sm text-gray-500">{food.serving}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-emerald-600">{food.calories} kcal</p>
                          <p className="text-xs text-gray-500">
                            P: {food.protein}g • C: {food.carbs}g • G: {food.fat}g
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add Exercise Modal */}
      {showAddExercise && !showExerciseLibrary && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md border-0 shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle>Adicionar Exercício</CardTitle>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowAddExercise(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600"
                onClick={() => setShowExerciseLibrary(true)}
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Biblioteca de Exercícios
              </Button>

              <div className="text-center text-sm text-gray-500">ou</div>

              <div>
                <Label htmlFor="exerciseName">Nome do Exercício</Label>
                <Input id="exerciseName" placeholder="Ex: Corrida, Musculação..." />
              </div>

              <div>
                <Label htmlFor="duration">Duração (minutos)</Label>
                <Input id="duration" type="number" placeholder="Ex: 30" />
              </div>

              <div>
                <Label htmlFor="caloriesBurned">Calorias Queimadas</Label>
                <Input id="caloriesBurned" type="number" placeholder="Ex: 250" />
              </div>

              <Button
                className="w-full"
                variant="outline"
                onClick={() => {
                  const name = (document.getElementById("exerciseName") as HTMLInputElement).value;
                  const duration = parseInt((document.getElementById("duration") as HTMLInputElement).value);
                  const caloriesBurned = parseInt((document.getElementById("caloriesBurned") as HTMLInputElement).value);
                  
                  if (name && duration && caloriesBurned) {
                    addExercise({
                      name,
                      duration,
                      caloriesBurned,
                      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
                    });
                  }
                }}
              >
                Adicionar Manualmente
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Exercise Library Modal */}
      {showExerciseLibrary && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl border-0 shadow-2xl max-h-[80vh] overflow-hidden flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle>Biblioteca de Exercícios</CardTitle>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowExerciseLibrary(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto">
              <div className="mb-4 space-y-3">
                <Input
                  placeholder="Buscar exercício..."
                  value={exerciseSearchQuery}
                  onChange={(e) => setExerciseSearchQuery(e.target.value)}
                  className="w-full"
                />
                
                <div className="flex gap-2">
                  <Button
                    variant={selectedExerciseCategory === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedExerciseCategory("all")}
                    className={selectedExerciseCategory === "all" ? "bg-gradient-to-r from-emerald-500 to-teal-600" : ""}
                  >
                    Todos
                  </Button>
                  <Button
                    variant={selectedExerciseCategory === "muscle" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedExerciseCategory("muscle")}
                    className={selectedExerciseCategory === "muscle" ? "bg-gradient-to-r from-orange-500 to-red-500" : ""}
                  >
                    Ganho de Massa
                  </Button>
                  <Button
                    variant={selectedExerciseCategory === "fat" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedExerciseCategory("fat")}
                    className={selectedExerciseCategory === "fat" ? "bg-gradient-to-r from-blue-500 to-cyan-500" : ""}
                  >
                    Perda de Gordura
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                {filteredExercises.map((exercise) => (
                  <Card
                    key={exercise.id}
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      const duration = parseInt(prompt("Duração em minutos:") || "30");
                      if (duration) {
                        addExercise({
                          name: exercise.name,
                          duration,
                          caloriesBurned: Math.round(exercise.caloriesPerMinute * duration),
                          time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
                          category: exercise.category
                        });
                      }
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-gray-900">{exercise.name}</p>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              exercise.category === "Ganho de Massa" 
                                ? "bg-orange-100 text-orange-700" 
                                : "bg-blue-100 text-blue-700"
                            }`}>
                              {exercise.category}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">{exercise.description}</p>
                          {exercise.muscleGroup && (
                            <p className="text-xs text-gray-400 mt-1">
                              <Dumbbell className="w-3 h-3 inline mr-1" />
                              {exercise.muscleGroup}
                            </p>
                          )}
                        </div>
                        <div className="text-right ml-4">
                          <p className="text-lg font-bold text-emerald-600">
                            {exercise.caloriesPerMinute}
                          </p>
                          <p className="text-xs text-gray-500">kcal/min</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="bg-white border-b sticky top-[73px] z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {[
              { id: "home", label: "Início", icon: Activity },
              { id: "food", label: "Alimentação", icon: Utensils },
              { id: "exercise", label: "Exercícios", icon: Dumbbell },
              { id: "progress", label: "Progresso", icon: TrendingUp },
              { id: "profile", label: "Perfil", icon: User }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-emerald-600 border-b-2 border-emerald-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Home Tab */}
        {activeTab === "home" && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Date Selector */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => changeDate(-1)}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Data selecionada</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {currentDate.toLocaleDateString("pt-BR", { 
                        day: "2-digit", 
                        month: "long", 
                        year: "numeric" 
                      })}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => changeDate(1)}
                    disabled={dateKey === new Date().toISOString().split("T")[0]}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Calorie Summary */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <p className="text-sm opacity-90 mb-2">Calorias Restantes</p>
                  <p className="text-5xl font-bold">
                    {Math.max(0, getCalorieGoal() - getNetCalories())}
                  </p>
                  <p className="text-sm opacity-90 mt-2">
                    Meta: {getCalorieGoal()} kcal
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold">{getTotalCalories()}</p>
                    <p className="text-xs opacity-90">Consumidas</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{getCaloriesBurned()}</p>
                    <p className="text-xs opacity-90">Queimadas</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{getNetCalories()}</p>
                    <p className="text-xs opacity-90">Líquidas</p>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div
                      className="bg-white h-3 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((getNetCalories() / getCalorieGoal()) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Macros */}
            <div className="grid sm:grid-cols-3 gap-4">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center mx-auto mb-3">
                    <Flame className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm text-gray-500 mb-1">Proteínas</p>
                  <p className="text-2xl font-bold text-gray-900">{getTotalProtein().toFixed(1)}g</p>
                  <p className="text-xs text-gray-400 mt-1">Meta: {getProteinGoal()}g</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-gradient-to-r from-rose-500 to-pink-500 h-2 rounded-full"
                      style={{ width: `${Math.min((getTotalProtein() / getProteinGoal()) * 100, 100)}%` }}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-3">
                    <Wheat className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm text-gray-500 mb-1">Carboidratos</p>
                  <p className="text-2xl font-bold text-gray-900">{getTotalCarbs().toFixed(1)}g</p>
                  <p className="text-xs text-gray-400 mt-1">Meta: {getCarbsGoal()}g</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full"
                      style={{ width: `${Math.min((getTotalCarbs() / getCarbsGoal()) * 100, 100)}%` }}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm text-gray-500 mb-1">Gorduras</p>
                  <p className="text-2xl font-bold text-gray-900">{getTotalFat().toFixed(1)}g</p>
                  <p className="text-xs text-gray-400 mt-1">Meta: {getFatGoal()}g</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full"
                      style={{ width: `${Math.min((getTotalFat() / getFatGoal()) * 100, 100)}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Water */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Droplet className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xl">Água</p>
                    <p className="text-sm text-gray-500 font-normal">Meta: 2000ml</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-center flex-1">
                    <p className="text-5xl font-bold text-gray-900">{currentRecord.water}</p>
                    <p className="text-sm text-gray-500 mt-1">ml</p>
                  </div>
                  <Button
                    size="lg"
                    onClick={incrementWater}
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500"
                  >
                    <Plus className="w-6 h-6" />
                  </Button>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progresso</span>
                    <span>{Math.round((currentRecord.water / 2000) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((currentRecord.water / 2000) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Button
                className="h-20 text-lg bg-gradient-to-r from-emerald-500 to-teal-600"
                onClick={() => setShowAddMeal(true)}
              >
                <Plus className="w-6 h-6 mr-2" />
                Adicionar Refeição
              </Button>
              <Button
                className="h-20 text-lg"
                variant="outline"
                onClick={() => setShowAddExercise(true)}
              >
                <Plus className="w-6 h-6 mr-2" />
                Adicionar Exercício
              </Button>
            </div>
          </div>
        )}

        {/* Food Tab */}
        {activeTab === "food" && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Refeições de Hoje</h2>
              <Button
                className="bg-gradient-to-r from-emerald-500 to-teal-600"
                onClick={() => setShowAddMeal(true)}
              >
                <Plus className="w-5 h-5 mr-2" />
                Adicionar
              </Button>
            </div>

            {/* Meals by Type */}
            {["breakfast", "lunch", "dinner", "snack"].map((type) => {
              const meals = currentRecord.meals.filter(m => m.type === type);
              const typeLabels = {
                breakfast: { label: "Café da Manhã", icon: Coffee },
                lunch: { label: "Almoço", icon: Sun },
                dinner: { label: "Jantar", icon: Moon },
                snack: { label: "Lanches", icon: Apple }
              };
              const typeInfo = typeLabels[type as keyof typeof typeLabels];
              const Icon = typeInfo.icon;

              return (
                <Card key={type} className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Icon className="w-6 h-6 text-emerald-600" />
                      {typeInfo.label}
                      <span className="text-sm font-normal text-gray-500 ml-auto">
                        {meals.reduce((sum, m) => sum + m.calories, 0)} kcal
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {meals.length === 0 ? (
                      <p className="text-gray-400 text-center py-4">Nenhuma refeição registrada</p>
                    ) : (
                      <div className="space-y-3">
                        {meals.map((meal) => (
                          <div
                            key={meal.id}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                          >
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900">{meal.name}</p>
                              <p className="text-sm text-gray-500">
                                {meal.time} • P: {meal.protein}g • C: {meal.carbs}g • G: {meal.fat}g
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <p className="text-lg font-bold text-emerald-600">{meal.calories} kcal</p>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteMeal(meal.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="w-5 h-5" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Exercise Tab */}
        {activeTab === "exercise" && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Exercícios de Hoje</h2>
              <Button
                className="bg-gradient-to-r from-emerald-500 to-teal-600"
                onClick={() => setShowAddExercise(true)}
              >
                <Plus className="w-5 h-5 mr-2" />
                Adicionar
              </Button>
            </div>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-red-500 text-white">
              <CardContent className="p-6 text-center">
                <Flame className="w-12 h-12 mx-auto mb-3" />
                <p className="text-sm opacity-90 mb-2">Total Queimado Hoje</p>
                <p className="text-5xl font-bold">{getCaloriesBurned()}</p>
                <p className="text-sm opacity-90 mt-1">calorias</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                {currentRecord.exercises.length === 0 ? (
                  <div className="text-center py-12">
                    <Dumbbell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Nenhum exercício registrado hoje</p>
                    <p className="text-sm text-gray-400 mt-2">Adicione seus exercícios para acompanhar o progresso</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {currentRecord.exercises.map((exercise) => (
                      <div
                        key={exercise.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-gray-900">{exercise.name}</p>
                            {exercise.category && (
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                exercise.category === "Ganho de Massa" 
                                  ? "bg-orange-100 text-orange-700" 
                                  : "bg-blue-100 text-blue-700"
                              }`}>
                                {exercise.category}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">
                            {exercise.time} • {exercise.duration} minutos
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="text-lg font-bold text-orange-600">{exercise.caloriesBurned}</p>
                            <p className="text-xs text-gray-500">kcal</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteExercise(exercise.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Progress Tab */}
        {activeTab === "progress" && (
          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <BarChart3 className="w-6 h-6 text-emerald-600" />
                  Últimos 7 Dias
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getLast7DaysData().map((day, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">{day.date}</span>
                        <span className="font-semibold text-gray-900">{day.net} kcal líquidas</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(day.net / getCalorieGoal()) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Stats */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                <CardContent className="p-6 text-center">
                  <Flame className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-3xl font-bold">
                    {getLast7DaysData().reduce((sum, d) => sum + d.calories, 0)}
                  </p>
                  <p className="text-sm opacity-90">Total Consumido</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-red-500 text-white">
                <CardContent className="p-6 text-center">
                  <Dumbbell className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-3xl font-bold">
                    {getLast7DaysData().reduce((sum, d) => sum + d.burned, 0)}
                  </p>
                  <p className="text-sm opacity-90">Total Queimado</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                <CardContent className="p-6 text-center">
                  <Droplet className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-3xl font-bold">
                    {getLast7DaysData().reduce((sum, d) => sum + d.water, 0)}
                  </p>
                  <p className="text-sm opacity-90">Total Água (ml)</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                <CardContent className="p-6 text-center">
                  <TrendingDown className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-3xl font-bold">
                    {Math.round(getLast7DaysData().reduce((sum, d) => sum + d.net, 0) / 7)}
                  </p>
                  <p className="text-sm opacity-90">Média Diária</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && userProfile && (
          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12" />
                </div>
                <h2 className="text-3xl font-bold mb-2">{userProfile.name}</h2>
                <p className="text-lg opacity-90">{userProfile.age} anos • {userProfile.gender === "male" ? "Masculino" : "Feminino"}</p>
              </CardContent>
            </Card>

            <div className="grid sm:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <Scale className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Peso Atual</p>
                      <p className="text-3xl font-bold text-gray-900">{userProfile.currentWeight} kg</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                      <Target className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Peso Meta</p>
                      <p className="text-3xl font-bold text-gray-900">{userProfile.targetWeight} kg</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Ruler className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Altura</p>
                      <p className="text-3xl font-bold text-gray-900">{userProfile.height} cm</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                      <Cake className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Idade</p>
                      <p className="text-3xl font-bold text-gray-900">{userProfile.age} anos</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Métricas de Saúde</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-600">IMC</p>
                      <p className="text-2xl font-bold text-gray-900">{calculateBMI().toFixed(1)}</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full"
                        style={{ width: `${Math.min((calculateBMI() / 40) * 100, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {calculateBMI() < 18.5 ? "Abaixo do peso" : 
                       calculateBMI() < 25 ? "Peso normal" : 
                       calculateBMI() < 30 ? "Sobrepeso" : "Obesidade"}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-600">TMB</p>
                      <p className="text-2xl font-bold text-gray-900">{calculateTMB()}</p>
                    </div>
                    <p className="text-xs text-gray-500">kcal/dia para manter peso</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Meta Calórica Diária</p>
                    <p className="text-2xl font-bold text-emerald-600">{getCalorieGoal()}</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    {userProfile.goal === "lose" ? "Para perda de peso (déficit de 500 kcal)" :
                     userProfile.goal === "gain" ? "Para ganho de peso (superávit de 500 kcal)" :
                     "Para manutenção de peso"}
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center gap-3 mb-2">
                    <Dumbbell className="w-5 h-5 text-gray-600" />
                    <p className="text-sm text-gray-600">Nível de Atividade</p>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {userProfile.activityLevel === "sedentary" ? "Sedentário" :
                     userProfile.activityLevel === "light" ? "Leve" :
                     userProfile.activityLevel === "moderate" ? "Moderado" :
                     userProfile.activityLevel === "active" ? "Ativo" : "Muito Ativo"}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Progresso até a Meta</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">
                        {userProfile.goal === "lose" ? "Peso a perder" : 
                         userProfile.goal === "gain" ? "Peso a ganhar" : "Mantendo peso"}
                      </span>
                      <span className="font-semibold text-gray-900">
                        {Math.abs(userProfile.currentWeight - userProfile.targetWeight).toFixed(1)} kg
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 h-4 rounded-full transition-all duration-300 flex items-center justify-end pr-2"
                        style={{ 
                          width: `${Math.max(10, 100 - (Math.abs(userProfile.currentWeight - userProfile.targetWeight) / userProfile.currentWeight) * 100)}%` 
                        }}
                      >
                        <span className="text-xs text-white font-semibold">
                          {Math.round(100 - (Math.abs(userProfile.currentWeight - userProfile.targetWeight) / userProfile.currentWeight) * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    Continue firme! Você está no caminho certo para alcançar {userProfile.targetWeight} kg.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
