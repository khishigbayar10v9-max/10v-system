"use client";
import React, { useState } from "react";
import { 
  Users, Calendar, CheckSquare, Trophy, FileText, 
  MessageSquare, Lock, LogOut, Download, Plus, Star 
} from "lucide-react";
import * as XLSX from "xlsx";

export default function Home() {
  const [activeTab, setActiveTab] = useState("news");
  const [role, setRole] = useState<"guest" | "teacher" | "leader">("guest");
  const [pinInput, setPinInput] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Жишээ өгөгдөл
  const [teacherName] = useState("С.Хишигбаяр");
  const [leaderName, setLeaderName] = useState("О. Мандахнаран");
  const [feedbacks, setFeedbacks] = useState([
    { id: 1, author: "Эцэг эх", text: "Аялалын цагийг наашлуулж болох уу?", date: "2026-09-07" }
  ]);
  const [feedbackInput, setFeedbackInput] = useState("");

  // Нэвтрэх шалгах
  const handleLogin = () => {
    if (pinInput === "2222") {
      setRole("teacher");
      setShowLoginModal(false);
      setPinInput("");
    } else if (pinInput === "4321") {
      setRole("leader");
      setShowLoginModal(false);
      setPinInput("");
    } else {
      alert("Нууц код буруу байна!");
    }
  };

  // Excel татах
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(feedbacks);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Санал гомдол");
    XLSX.writeFile(workbook, "10V_Sanal_Gomdol.xlsx");
  };

  // Санал нэмэх
  const addFeedback = () => {
    if (!feedbackInput.trim()) return;
    setFeedbacks([
      ...feedbacks,
      { id: Date.now(), author: role === "guest" ? "Сурагч/Эцэг эх" : role, text: feedbackInput, date: "2026-09-07" }
    ]);
    setFeedbackInput("");
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      {/* Толгой хэсэг */}
      <header className="bg-indigo-600 text-white p-4 shadow-md flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">10В Ангийн Систем</h1>
          <p className="text-sm text-indigo-200">
            Багш: {teacherName} | Ангийн ахлагч: {leaderName} (37 сурагч)
          </p>
        </div>
        <div>
          {role === "guest" ? (
            <button 
              onClick={() => setShowLoginModal(true)}
              className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-indigo-50"
            >
              <Lock size={18} /> Нэвтрэх
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <span className="bg-indigo-800 px-3 py-1 rounded-full text-xs font-semibold">
                {role === "teacher" ? "Багш" : "Ангийн ахлагч"}
              </span>
              <button 
                onClick={() => setRole("guest")}
                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
              >
                <LogOut size={18} />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Навигаци Цэс */}
      <nav className="bg-white shadow-sm p-2 flex flex-wrap gap-2 justify-center border-b">
        {[
          { id: "news", label: "Мэдээлэл", color: "bg-blue-500", icon: MessageSquare },
          { id: "rules", label: "Ангийн дүрэм", color: "bg-purple-500", icon: FileText },
          { id: "schedule", label: "Хичээлийн хуваарь", color: "bg-emerald-500", icon: Calendar },
          { id: "duty", label: "Жижүүрийн хуваарь", color: "bg-amber-500", icon: CheckSquare },
          { id: "achievements", label: "Амжилт бахархал", color: "bg-rose-500", icon: Trophy },
          { id: "attendance", label: "Ирц", color: "bg-teal-500", icon: Users },
          { id: "feedback", label: "Санал хүсэлт", color: "bg-indigo-500", icon: MessageSquare },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-white font-medium transition-transform active:scale-95 ${item.color} ${
                activeTab === item.id ? "ring-4 ring-offset-1 ring-indigo-300" : "opacity-90 hover:opacity-100"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Үндсэн агуулга */}
      <main className="max-w-5xl mx-auto p-4">
        {activeTab === "news" && (
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Ангийн мэдээ, мэдээлэл</h2>
            <p className="text-gray-600">Энд багш болон ангийн ахлагч нийтлэл оруулна.</p>
          </div>
        )}

        {activeTab === "schedule" && (
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold mb-2 text-gray-800">Хичээлийн хуваарь</h2>
            <p className="text-sm text-gray-500 mb-4">Цаг: 08:30 - 13:40 | Их завсарлага: 11:15 - 11:30 (40 мин)</p>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {["Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан"].map((day, index) => (
                <div key={index} className="border rounded-xl p-3 bg-slate-50">
                  <h3 className="font-bold text-center text-indigo-600 mb-2 border-b pb-1">{day}</h3>
                  <ol className="text-xs space-y-2 text-gray-700">
                    <li>1. Математик</li>
                    <li>2. Физик</li>
                    <li>3. Монгол хэл</li>
                    <li>4. Англи хэл</li>
                    <li>5. Хими</li>
                    <li>6. Биологи</li>
                    <li>7. Түүх</li>
                  </ol>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "feedback" && (
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Санал хүсэлт</h2>
              {(role === "teacher" || role === "leader") && (
                <button 
                  onClick={exportToExcel}
                  className="bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 hover:bg-emerald-700"
                >
                  <Download size={16} /> Excel-ээр татах
                </button>
              )}
            </div>

            <div className="flex gap-2 mb-6">
              <input 
                type="text" 
                value={feedbackInput}
                onChange={(e) => setFeedbackInput(e.target.value)}
                placeholder="Саналаа бичнэ үү..." 
                className="flex-1 border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button 
                onClick={addFeedback}
                className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700"
              >
                Илгээх
              </button>
            </div>

            <div className="space-y-3">
              {feedbacks.map((item) => (
                <div key={item.id} className="p-3 bg-slate-50 border rounded-xl">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span className="font-bold text-indigo-600">{item.author}</span>
                    <span>{item.date}</span>
                  </div>
                  <p className="text-sm text-gray-800">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Нэвтрэх Модал */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="text-lg font-bold mb-4 text-center">Системд нэвтрэх</h3>
            <p className="text-xs text-gray-500 mb-4 text-center">Багшийн код: 2222 | Ахлагчийн код: 4321</p>
            <input 
              type="password" 
              placeholder="Нууц код оруулна уу" 
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              className="w-full border rounded-xl p-2.5 text-center text-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex gap-2">
              <button 
                onClick={() => setShowLoginModal(false)}
                className="flex-1 border py-2 rounded-xl text-sm font-semibold hover:bg-gray-50"
              >
                Цуцлах
              </button>
              <button 
                onClick={handleLogin}
                className="flex-1 bg-indigo-600 text-white py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700"
              >
                Нэвтрэх
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}