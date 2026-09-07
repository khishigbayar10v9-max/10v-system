"use client";
import React, { useState } from "react";
import {
  Users, Calendar, CheckSquare, Trophy, FileText,
  MessageSquare, Lock, LogOut, Plus, Star, Sparkles,
  School, Send, Upload, Trash2, BookOpen, ShieldCheck,
  Moon, Heart, Download, Smile
} from "lucide-react";

interface CommentItem {
  author: string;
  text: string;
}

interface PostItem {
  id: number;
  category?: string;
  title: string;
  text: string;
  image: string;
  date: string;
  comments: CommentItem[];
}

interface FeedbackItem {
  id: number;
  author: string;
  text: string;
  date: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("news");
  const [role, setRole] = useState<"guest" | "teacher" | "leader">("guest");
  const [pinInput, setPinInput] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);

  // --- Dynamic Data States ---
  const [posts, setPosts] = useState<PostItem[]>([
    {
      id: 1,
      category: "news",
      title: " Эцэг эхийн нэгдсэн хурал зарлагдлаа",
      text: "Ирэх баасан гарагийн 18:00 цагаас 10В ангийн эцэг эхийн хуралтай тул идэвхтэй хамрагдана уу. ❤️",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800",
      date: "2026-09-07",
      comments: [{ author: "Сурагчийн аав", text: "Онлайн хэлбэрээр орох боломжтой юу? ✨" }]
    }
  ]);

  const [achievements, setAchievements] = useState<PostItem[]>([
    {
      id: 1,
      title: " Волейболын тэмцээний Аварга",
      text: "Сургуулийн аварга шалгаруулах тэмцээнээс 10В ангийн баг тамирчид 1-р байр эзэлж шилжин явдах цом хүртлээ! 🏆🎉",
      image: "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?w=800",
      date: "2026-09-05",
      comments: []
    }
  ]);

  const [reports, setReports] = useState<PostItem[]>([
    {
      id: 1,
      title: " 1-р улирлын сурлагын тайлан мэдээ",
      text: "Ангийн нийт сурагчдын чанар 85%-ийн амжилттай гарлаа. 💖",
      image: "",
      date: "2026-09-01",
      comments: []
    }
  ]);

  const [rules, setRules] = useState<string[]>([
    "Хичээлээс хоцрохгүй, цагтаа ирэх ⏰",
    "Бусдыгаа хүндэтгэж, сургуулийн дүрмийг баримтлах 🤝",
    "Анги хамт олноороо цэвэрч орон зайг бүрдүүлэх 🧹",
    "Нэг нэгэндээ тусалж, эерэг уур амьсгал бүтээх ❤️"
  ]);

  const [schedule, setSchedule] = useState<Record<string, string>>({
    "Даваа 🌟": "Математик, Физик, Монгол хэл, Англи хэл, Биологи",
    "Мягмар ⚡": "Хими, Түүх, Нийгэм, Биеийн тамир, Геометр",
    "Лхагва 🚀": "Англи хэл, Математик, Мэдээлэл зүй, Уран зохиол",
    "Пүрэв 🎨": "Физик, Хими, Дүрслэх урлаг, Газарзүй",
    "Баасан 💖": "Монгол хэл, Математик, Арга зүй, Спортын секц"
  });

  const [duty, setDuty] = useState<Record<string, string>>({
    "Даваа 🌟": "Болд, Сүрэн",
    "Мягмар ⚡": "Ананд, Номин",
    "Лхагва 🚀": "Бат, Туяа",
    "Пүрэв 🎨": "Дорж, Цэцэг",
    "Баасан 💖": "Тэмүүлэн, Хулан"
  });

  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([
    { id: 1, author: "Сурагч", text: "Ангийн аялалын цагийг наашлуулах боломжтой юу? 😊", date: "2026-09-07" },
    { id: 2, author: "Эцэг эх", text: "Ангийн цахим систем маш гоё болсон байна, баярлалаа! ❤️", date: "2026-09-07" }
  ]);

  // Input states
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostText, setNewPostText] = useState("");
  const [newPostImg, setNewPostImg] = useState("");
  const [commentInput, setCommentInput] = useState<{ [key: number]: string }>({});
  const [newRule, setNewRule] = useState("");
  const [feedbackInput, setFeedbackInput] = useState("");

  // Handle local image file upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPostImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Export Feedback to Excel / CSV
  const exportToExcel = () => {
    if (feedbacks.length === 0) {
      alert("Татах санал хүсэлт одоогоор байхгүй байна! ❤️");
      return;
    }
    let csvContent = "\uFEFFОгноо,Илгээгч,Санал хүсэлт\n";
    feedbacks.forEach((item) => {
      const cleanText = `"${item.text.replace(/"/g, '""')}"`;
      csvContent += `${item.date},${item.author},${cleanText}\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `10V_Ангийн_Санал_Хүсэлт_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Login handler
  const handleLogin = () => {
    if (pinInput === "1010") {
      setRole("teacher");
      setShowLoginModal(false);
      setPinInput("");
    } else if (pinInput === "2020") {
      setRole("leader");
      setShowLoginModal(false);
      setPinInput("");
    } else {
      alert("Нууц код буруу байна! ❤️");
    }
  };

  // Delete helpers
  const deletePost = (id: number) => setPosts(posts.filter(p => p.id !== id));
  const deleteAchievement = (id: number) => setAchievements(achievements.filter(a => a.id !== id));
  const deleteReport = (id: number) => setReports(reports.filter(r => r.id !== id));
  const deleteFeedback = (id: number) => setFeedbacks(feedbacks.filter(f => f.id !== id));
  const deleteRule = (index: number) => setRules(rules.filter((_, i) => i !== index));

  const addComment = (
    list: PostItem[],
    setList: React.Dispatch<React.SetStateAction<PostItem[]>>,
    postId: number
  ) => {
    const text = commentInput[postId];
    if (!text) return;
    setList(list.map(p => p.id === postId ? {
      ...p,
      comments: [...p.comments, { author: role === "teacher" ? "Багш 👑" : "Сурагч/Эцэг эх ❤️", text }]
    } : p));
    setCommentInput({ ...commentInput, [postId]: "" });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans relative overflow-x-hidden">
      
      {/* Animated Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
        <Moon className="absolute top-10 left-10 w-16 h-16 text-yellow-300 animate-pulse" />
        <Star className="absolute top-20 right-20 w-8 h-8 text-yellow-200 animate-bounce" />
        <Star className="absolute top-1/3 left-1/4 w-7 h-7 text-pink-400 animate-ping" />
        <Heart className="absolute top-1/2 right-12 w-10 h-10 text-rose-400 animate-pulse" />
        <BookOpen className="absolute bottom-20 left-12 w-12 h-12 text-indigo-400 animate-bounce" />
        <Sparkles className="absolute bottom-1/3 right-1/4 w-10 h-10 text-amber-300 animate-pulse" />
        <Star className="absolute bottom-10 right-10 w-8 h-8 text-cyan-300 animate-spin" />
        <Heart className="absolute top-1/4 left-10 w-8 h-8 text-purple-400 animate-bounce" />
      </div>

      <div className="relative z-10">

        {/* Header Banner */}
        <header className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white shadow-2xl border-b border-white/10">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              
              <div className="flex items-center space-x-5">
                <div className="p-4 bg-white/20 backdrop-blur-md rounded-3xl border border-white/30 shadow-lg transform hover:scale-105 transition duration-300">
                  <School className="w-12 h-12 text-yellow-300 animate-bounce" />
                </div>
                <div>
                  <div className="inline-flex items-center space-x-2 bg-yellow-400/20 text-yellow-200 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm mb-2 border border-yellow-300/40">
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                    <span>Албан ёсны цахим орон зай ❤️</span>
                  </div>
                  <h1 className="text-2xl md:text-4xl font-extrabold tracking-wide drop-shadow-md">
                    Хөвсгөл аймаг • Эрдмийн далай сургууль
                  </h1>
                  <p className="text-pink-100 text-sm mt-1 font-semibold flex flex-wrap items-center gap-2">
                    <span>🎒 10В Анги</span> • <span>👑 Багш: С.Хишигбаяр</span> • <span>⭐ Ахлагч: О.Мандахнаран (37 сурагч)</span>
                  </p>
                </div>
              </div>

              {/* Login/Role Status */}
              <div>
                {role === "guest" ? (
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 font-extrabold px-6 py-3 rounded-2xl shadow-xl hover:opacity-95 transition transform hover:-translate-y-1"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Нэвтрэх 🔑</span>
                  </button>
                ) : (
                  <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/30 shadow-lg">
                    <ShieldCheck className="w-5 h-5 text-green-300 animate-pulse" />
                    <span className="font-bold text-sm">
                      {role === "teacher" ? "Багшийн эрх 👑" : "Ахлагчийн эрх ⭐"}
                    </span>
                    <button
                      onClick={() => setRole("guest")}
                      className="p-1.5 hover:bg-white/20 rounded-xl text-red-200 transition"
                      title="Гарах"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        </header>

        {/* Fully Visible Responsive Navigation Bar */}
        <nav className="bg-slate-800/90 backdrop-blur-lg border-b border-slate-700 sticky top-0 z-20 shadow-xl py-3">
          <div className="max-w-6xl mx-auto px-2 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "news", label: "Мэдээлэл ❤️", icon: FileText, color: "from-blue-500 to-indigo-600" },
              { id: "rules", label: "Ангийн дүрэм 📚", icon: BookOpen, color: "from-emerald-500 to-teal-600" },
              { id: "schedule", label: "Хичээлийн хуваарь 🗓️", icon: Calendar, color: "from-amber-500 to-orange-600" },
              { id: "duty", label: "Жижүүрийн хуваарь 🧹", icon: CheckSquare, color: "from-purple-500 to-pink-600" },
              { id: "achievements", label: "Амжилт бахархал 🏆", icon: Trophy, color: "from-yellow-400 to-amber-500" },
              { id: "reports", label: "Тайлан мэдээ 📊", icon: Star, color: "from-rose-500 to-red-600" },
              { id: "feedback", label: "Санал хүсэлт 💬", icon: MessageSquare, color: "from-cyan-500 to-blue-600" },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-2xl font-extrabold text-sm transition-all duration-300 transform hover:scale-105 ${
                    active
                      ? `bg-gradient-to-r ${tab.color} text-white shadow-lg ring-2 ring-white/50 scale-105`
                      : "bg-slate-700/60 text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="max-w-6xl mx-auto px-4 py-8">

          {/* TAB 1: МЭДЭЭЛЭЛ */}
          {activeTab === "news" && (
            <div className="space-y-6">
              {role === "teacher" && (
                <div className="bg-slate-800/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-blue-500/30 space-y-4">
                  <h3 className="font-extrabold text-lg flex items-center gap-2 text-blue-400">
                    <Plus className="w-5 h-5" /> Шинэ мэдээлэл нийтлэх ✨
                  </h3>
                  <input
                    type="text"
                    placeholder="Мэдээний гарчиг бичих..."
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    className="w-full p-3 bg-slate-900 border border-slate-700 rounded-2xl text-white outline-none focus:border-blue-500"
                  />
                  <textarea
                    placeholder="Мэдээллийн агуулга, дэлгэрэнгүй..."
                    value={newPostText}
                    onChange={(e) => setNewPostText(e.target.value)}
                    className="w-full p-3 bg-slate-900 border border-slate-700 rounded-2xl text-white outline-none focus:border-blue-500 h-24"
                  />
                  
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-bold px-4 py-2.5 rounded-2xl cursor-pointer transition">
                      <Upload className="w-4 h-4 text-blue-400" />
                      <span>Компьютер / Утаснаас зураг сонгох</span>
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                    {newPostImg && <span className="text-xs text-green-400 font-bold">Зураг сонгогдлоо! ✅</span>}
                  </div>

                  <button
                    onClick={() => {
                      if (!newPostTitle) return;
                      setPosts([
                        {
                          id: Date.now(),
                          category: "news",
                          title: newPostTitle,
                          text: newPostText,
                          image: newPostImg,
                          date: new Date().toISOString().split("T")[0],
                          comments: []
                        },
                        ...posts
                      ]);
                      setNewPostTitle(""); setNewPostText(""); setNewPostImg("");
                    }}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-extrabold px-8 py-3 rounded-2xl shadow-lg hover:opacity-95 transition transform hover:scale-105"
                  >
                    Нийтлэх 🚀
                  </button>
                </div>
              )}

              {posts.map((post) => (
                <div key={post.id} className="bg-slate-800/80 backdrop-blur-md rounded-3xl shadow-xl border border-slate-700 overflow-hidden relative">
                  {role === "teacher" && (
                    <button
                      onClick={() => deletePost(post.id)}
                      className="absolute top-4 right-4 bg-red-600/80 hover:bg-red-600 text-white p-2.5 rounded-2xl backdrop-blur-md transition shadow-lg z-10"
                      title="Устгах"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                  {post.image && (
                    <img src={post.image} alt="" className="w-full h-72 object-cover" />
                  )}
                  <div className="p-6">
                    <div className="text-xs text-blue-400 font-bold mb-1 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {post.date}
                    </div>
                    <h3 className="font-extrabold text-2xl mb-3 text-white">{post.title}</h3>
                    <p className="text-slate-300 mb-6 leading-relaxed text-base">{post.text}</p>

                    <div className="border-t border-slate-700/60 pt-4 bg-slate-900/60 -mx-6 -mb-6 p-6 space-y-4">
                      <h4 className="font-bold text-sm text-pink-400 flex items-center gap-1">
                        <Smile className="w-4 h-4" /> Сэтгэгдэл, санал бодол:
                      </h4>
                      {post.comments.map((c, i) => (
                        <div key={i} className="bg-slate-800 p-3 rounded-2xl border border-slate-700 text-sm">
                          <span className="font-bold text-blue-400">{c.author}: </span>
                          <span className="text-slate-200">{c.text}</span>
                        </div>
                      ))}

                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Сэтгэгдэл үлдээх... ❤️"
                          value={commentInput[post.id] || ""}
                          onChange={(e) => setCommentInput({ ...commentInput, [post.id]: e.target.value })}
                          className="flex-1 p-3 bg-slate-800 border border-slate-700 rounded-2xl text-sm outline-none focus:border-blue-500 text-white"
                        />
                        <button
                          onClick={() => addComment(posts, setPosts, post.id)}
                          className="bg-blue-600 text-white px-5 py-3 rounded-2xl hover:bg-blue-500 transition flex items-center"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: АНГИЙН ДҮРЭМ */}
          {activeTab === "rules" && (
            <div className="bg-slate-800/90 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-emerald-500/30 space-y-6">
              <h3 className="font-extrabold text-2xl text-emerald-400 flex items-center gap-2">
                <BookOpen className="w-7 h-7 text-emerald-400" /> 10В Ангийн Дүрэм Ба Журам 📚
              </h3>

              {(role === "teacher" || role === "leader") && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Шинэ дүрэм нэмэх..."
                    value={newRule}
                    onChange={(e) => setNewRule(e.target.value)}
                    className="flex-1 p-3 bg-slate-900 border border-slate-700 rounded-2xl outline-none focus:border-emerald-500 text-white"
                  />
                  <button
                    onClick={() => {
                      if (!newRule) return;
                      setRules([...rules, newRule]);
                      setNewRule("");
                    }}
                    className="bg-emerald-600 text-white font-extrabold px-6 py-3 rounded-2xl hover:bg-emerald-500 transition"
                  >
                    Нэмэх ✨
                  </button>
                </div>
              )}

              <div className="grid gap-4">
                {rules.map((rule, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-slate-900/80 rounded-2xl border border-slate-700/80">
                    <div className="flex items-center space-x-4">
                      <span className="w-9 h-9 bg-emerald-500/20 text-emerald-300 font-extrabold rounded-xl flex items-center justify-center text-base border border-emerald-500/30">
                        {idx + 1}
                      </span>
                      <span className="font-bold text-slate-200 text-base">{rule}</span>
                    </div>
                    {(role === "teacher" || role === "leader") && (
                      <button
                        onClick={() => deleteRule(idx)}
                        className="text-red-400 hover:text-red-300 p-2 transition"
                        title="Устгах"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ХИЧЭЭЛИЙН ХУВААРЬ */}
          {activeTab === "schedule" && (
            <div className="bg-slate-800/90 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-amber-500/30 space-y-6">
              <h3 className="font-extrabold text-2xl text-amber-400 flex items-center gap-2">
                <Calendar className="w-7 h-7" /> Хичээлийн Хуваарь 🗓️
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(schedule).map(([day, list]) => (
                  <div key={day} className="p-5 bg-slate-900/80 rounded-2xl border border-slate-700">
                    <h4 className="font-extrabold text-amber-300 mb-2 text-lg">{day}</h4>
                    {role === "teacher" || role === "leader" ? (
                      <input
                        type="text"
                        value={list}
                        onChange={(e) => setSchedule({ ...schedule, [day]: e.target.value })}
                        className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
                      />
                    ) : (
                      <p className="text-slate-200 font-semibold text-base">{list}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ЖИЖҮҮРИЙН ХУВААРЬ */}
          {activeTab === "duty" && (
            <div className="bg-slate-800/90 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-purple-500/30 space-y-6">
              <h3 className="font-extrabold text-2xl text-purple-400 flex items-center gap-2">
                <CheckSquare className="w-7 h-7" /> Жижүүрийн Хуваарь 🧹
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {Object.entries(duty).map(([day, names]) => (
                  <div key={day} className="p-5 bg-slate-900/80 rounded-2xl border border-slate-700">
                    <h4 className="font-extrabold text-purple-300 mb-2 text-lg">{day}</h4>
                    {role === "teacher" || role === "leader" ? (
                      <input
                        type="text"
                        value={names}
                        onChange={(e) => setDuty({ ...duty, [day]: e.target.value })}
                        className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
                      />
                    ) : (
                      <p className="text-slate-100 font-bold text-base">{names}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: АМЖИЛТ БАХАРХАЛ */}
          {activeTab === "achievements" && (
            <div className="space-y-6">
              {role === "teacher" && (
                <div className="bg-slate-800/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-amber-500/30 space-y-4">
                  <h3 className="font-extrabold text-lg text-amber-400 flex items-center gap-2">
                    <Trophy className="w-5 h-5" /> Шинэ бахархал, амжилт нэмэх 🏆
                  </h3>
                  <input
                    type="text"
                    placeholder="Амжилтын гарчиг..."
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    className="w-full p-3 bg-slate-900 border border-slate-700 rounded-2xl text-white outline-none"
                  />
                  <textarea
                    placeholder="Дэлгэрэнгүй тайлбар..."
                    value={newPostText}
                    onChange={(e) => setNewPostText(e.target.value)}
                    className="w-full p-3 bg-slate-900 border border-slate-700 rounded-2xl text-white outline-none h-20"
                  />
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-bold px-4 py-2.5 rounded-2xl cursor-pointer transition">
                      <Upload className="w-4 h-4 text-amber-400" />
                      <span>Зураг оруулах</span>
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                    {newPostImg && <span className="text-xs text-green-400 font-bold">Зураг сонгогдлоо! ✅</span>}
                  </div>
                  <button
                    onClick={() => {
                      if (!newPostTitle) return;
                      setAchievements([
                        {
                          id: Date.now(),
                          title: newPostTitle,
                          text: newPostText,
                          image: newPostImg,
                          date: new Date().toISOString().split("T")[0],
                          comments: []
                        },
                        ...achievements
                      ]);
                      setNewPostTitle(""); setNewPostText(""); setNewPostImg("");
                    }}
                    className="bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 font-extrabold px-8 py-3 rounded-2xl shadow-lg hover:opacity-95 transition"
                  >
                    Нэмэх 🎉
                  </button>
                </div>
              )}

              {achievements.map((item) => (
                <div key={item.id} className="bg-slate-800/80 backdrop-blur-md rounded-3xl shadow-xl border border-slate-700 overflow-hidden relative">
                  {role === "teacher" && (
                    <button
                      onClick={() => deleteAchievement(item.id)}
                      className="absolute top-4 right-4 bg-red-600/80 hover:bg-red-600 text-white p-2.5 rounded-2xl backdrop-blur-md transition shadow-lg z-10"
                      title="Устгах"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                  {item.image && <img src={item.image} alt="" className="w-full h-72 object-cover" />}
                  <div className="p-6">
                    <div className="text-xs text-amber-400 font-bold mb-1">{item.date}</div>
                    <h3 className="font-extrabold text-2xl mb-2 text-white">{item.title}</h3>
                    <p className="text-slate-300 mb-6">{item.text}</p>

                    <div className="border-t border-slate-700 pt-4 bg-slate-900/60 -mx-6 -mb-6 p-6 space-y-4">
                      <h4 className="font-bold text-sm text-amber-300">Баяр хүргэх сэтгэгдэл ❤️:</h4>
                      {item.comments.map((c, i) => (
                        <div key={i} className="bg-slate-800 p-3 rounded-2xl border border-slate-700 text-sm">
                          <span className="font-bold text-amber-400">{c.author}: </span>
                          <span className="text-slate-200">{c.text}</span>
                        </div>
                      ))}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Баяр хүргэх сэтгэгдэл үлдээх..."
                          value={commentInput[item.id] || ""}
                          onChange={(e) => setCommentInput({ ...commentInput, [item.id]: e.target.value })}
                          className="flex-1 p-3 bg-slate-800 border border-slate-700 rounded-2xl text-sm outline-none text-white"
                        />
                        <button
                          onClick={() => addComment(achievements, setAchievements, item.id)}
                          className="bg-amber-500 text-slate-900 font-bold px-5 py-3 rounded-2xl hover:bg-amber-400 transition"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 6: ТАЙЛАН МЭДЭЭ */}
          {activeTab === "reports" && (
            <div className="space-y-6">
              {role === "teacher" && (
                <div className="bg-slate-800/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-rose-500/30 space-y-4">
                  <h3 className="font-extrabold text-lg text-rose-400 flex items-center gap-2">
                    <Star className="w-5 h-5" /> Шинэ тайлан мэдээ оруулах 📊
                  </h3>
                  <input
                    type="text"
                    placeholder="Тайлангийн нэр..."
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    className="w-full p-3 bg-slate-900 border border-slate-700 rounded-2xl text-white outline-none"
                  />
                  <textarea
                    placeholder="Дэлгэрэнгүй тайлан..."
                    value={newPostText}
                    onChange={(e) => setNewPostText(e.target.value)}
                    className="w-full p-3 bg-slate-900 border border-slate-700 rounded-2xl text-white outline-none h-20"
                  />
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-bold px-4 py-2.5 rounded-2xl cursor-pointer transition">
                      <Upload className="w-4 h-4 text-rose-400" />
                      <span>Зураг оруулах</span>
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                    {newPostImg && <span className="text-xs text-green-400 font-bold">Зураг сонгогдлоо! ✅</span>}
                  </div>
                  <button
                    onClick={() => {
                      if (!newPostTitle) return;
                      setReports([
                        {
                          id: Date.now(),
                          title: newPostTitle,
                          text: newPostText,
                          image: newPostImg,
                          date: new Date().toISOString().split("T")[0],
                          comments: []
                        },
                        ...reports
                      ]);
                      setNewPostTitle(""); setNewPostText(""); setNewPostImg("");
                    }}
                    className="bg-gradient-to-r from-rose-500 to-red-600 text-white font-extrabold px-8 py-3 rounded-2xl shadow-lg hover:opacity-95 transition"
                  >
                    Оруулах 📊
                  </button>
                </div>
              )}

              {reports.map((item) => (
                <div key={item.id} className="bg-slate-800/80 backdrop-blur-md rounded-3xl shadow-xl border border-slate-700 overflow-hidden relative">
                  {role === "teacher" && (
                    <button
                      onClick={() => deleteReport(item.id)}
                      className="absolute top-4 right-4 bg-red-600/80 hover:bg-red-600 text-white p-2.5 rounded-2xl backdrop-blur-md transition shadow-lg z-10"
                      title="Устгах"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                  {item.image && <img src={item.image} alt="" className="w-full h-72 object-cover" />}
                  <div className="p-6">
                    <div className="text-xs text-rose-400 font-bold mb-1">{item.date}</div>
                    <h3 className="font-extrabold text-2xl mb-2 text-white">{item.title}</h3>
                    <p className="text-slate-300 mb-6">{item.text}</p>

                    <div className="border-t border-slate-700 pt-4 bg-slate-900/60 -mx-6 -mb-6 p-6 space-y-4">
                      <h4 className="font-bold text-sm text-rose-300">Сэтгэгдэл:</h4>
                      {item.comments.map((c, i) => (
                        <div key={i} className="bg-slate-800 p-3 rounded-2xl border border-slate-700 text-sm">
                          <span className="font-bold text-rose-400">{c.author}: </span>
                          <span className="text-slate-200">{c.text}</span>
                        </div>
                      ))}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Сэтгэгдэл бичих..."
                          value={commentInput[item.id] || ""}
                          onChange={(e) => setCommentInput({ ...commentInput, [item.id]: e.target.value })}
                          className="flex-1 p-3 bg-slate-800 border border-slate-700 rounded-2xl text-sm outline-none text-white"
                        />
                        <button
                          onClick={() => addComment(reports, setReports, item.id)}
                          className="bg-rose-600 text-white font-bold px-5 py-3 rounded-2xl hover:bg-rose-500 transition"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 7: САНАЛ ХҮСЭЛТ МЭДЭЭЛЭЛ (ЭКСЕЛ ТАТАХ & УСТГАХ ЭРХТЭЙ) */}
          {activeTab === "feedback" && (
            <div className="bg-slate-800/90 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-cyan-500/30 space-y-6">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h3 className="font-extrabold text-2xl text-cyan-400 flex items-center gap-2">
                  <MessageSquare className="w-7 h-7" /> Санал Хүсэлтийн Цонх 💬
                </h3>

                {/* Excel Download Button (Багшид болон бүх хэрэглэгчид нээлттэй) */}
                <button
                  onClick={exportToExcel}
                  className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold px-5 py-3 rounded-2xl shadow-lg hover:opacity-95 transition transform hover:scale-105"
                >
                  <Download className="w-5 h-5" />
                  <span>Экселээр Татах (Excel/CSV) 📊</span>
                </button>
              </div>

              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Ангийн хамт олондоо санал хүсэлтээ үлдээгээрэй... ❤️"
                  value={feedbackInput}
                  onChange={(e) => setFeedbackInput(e.target.value)}
                  className="flex-1 p-4 bg-slate-900 border border-slate-700 rounded-2xl outline-none focus:border-cyan-500 text-white"
                />
                <button
                  onClick={() => {
                    if (!feedbackInput) return;
                    setFeedbacks([
                      ...feedbacks,
                      {
                        id: Date.now(),
                        author: role === "teacher" ? "Багш 👑" : "Сурагч/Эцэг эх ❤️",
                        text: feedbackInput,
                        date: new Date().toISOString().split("T")[0]
                      }
                    ]);
                    setFeedbackInput("");
                  }}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold px-8 py-4 rounded-2xl shadow-lg hover:opacity-95 transition"
                >
                  Илгээх 🚀
                </button>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-700">
                <h4 className="font-bold text-slate-400 text-sm">Ирүүлсэн бүх санал хүсэлтүүд:</h4>
                {feedbacks.map((f) => (
                  <div key={f.id} className="p-4 bg-slate-900/80 rounded-2xl border border-slate-700/80 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-xs mb-1">
                        <span className="font-extrabold text-cyan-300">{f.author}</span>
                        <span className="text-slate-400">{f.date}</span>
                      </div>
                      <p className="text-slate-200 font-medium text-base">{f.text}</p>
                    </div>

                    {role === "teacher" && (
                      <button
                        onClick={() => deleteFeedback(f.id)}
                        className="text-red-400 hover:text-red-300 p-2 transition"
                        title="Устгах"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

            </div>
          )}

        </main>
      </div>

      {/* LOGIN MODAL */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-5 border border-slate-700">
            <h3 className="font-extrabold text-2xl text-center text-white">Системд нэвтрэх 🔑</h3>
            <p className="text-xs text-center text-slate-400">
              Багш эсвэл Ангийн ахлагчийн PIN кодоо оруулна уу
            </p>
            <input
              type="password"
              placeholder="****"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              className="w-full p-4 bg-slate-900 border border-slate-700 rounded-2xl text-center text-2xl tracking-widest outline-none focus:border-pink-500 text-white"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowLoginModal(false)}
                className="flex-1 py-3 bg-slate-700 text-slate-300 font-bold rounded-2xl hover:bg-slate-600"
              >
                Цуцлах
              </button>
              <button
                onClick={handleLogin}
                className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-extrabold rounded-2xl hover:opacity-90"
              >
                Нэвтрэх ❤️
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}