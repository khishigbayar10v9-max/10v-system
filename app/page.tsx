"use client";
import React, { useState } from "react";
import {
  Users, Calendar, CheckSquare, Trophy, FileText,
  MessageSquare, Lock, LogOut, Plus, Star, Sparkles,
  School, Send, Image as ImageIcon, BookOpen, ShieldCheck
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

  // --- States for dynamic data ---
  const [posts, setPosts] = useState<PostItem[]>([
    {
      id: 1,
      category: "news",
      title: "Эцэг эхийн хурал зарлагдлаа",
      text: "Ирэх баасан гарагийн 18:00 цагаас 10В ангийн эцэг эхийн хуралтай тул идэвхтэй хамрагдана уу.",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800",
      date: "2026-09-07",
      comments: [{ author: "Сурагчийн аав", text: "Онлайн хэлбэрээр орох боломжтой юу?" }]
    }
  ]);

  const [achievements, setAchievements] = useState<PostItem[]>([
    {
      id: 1,
      title: "Волейболын тэмцээний Аварга",
      text: "Сургуулийн аварга шалгаруулах тэмцээнээс 10В ангийн баг 1-р байр эзэллээ!",
      image: "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?w=800",
      date: "2026-09-05",
      comments: []
    }
  ]);

  const [reports, setReports] = useState<PostItem[]>([
    {
      id: 1,
      title: "1-р улирлын сурлагын тайлан",
      text: "Ангийн нийт сурагчдын чанар 85%-ийн амжилттайтай гарлаа.",
      image: "",
      date: "2026-09-01",
      comments: []
    }
  ]);

  const [rules, setRules] = useState<string[]>([
    "Хичээлээс хоцрохгүй, цагтаа ирэх",
    "Бусдыгаа хүндэтгэж, сургуулийн дүрмийг баримтлах",
    "Цэвэрч орон зайг бүрдүүлэх"
  ]);

  const [schedule, setSchedule] = useState<Record<string, string>>({
    "Даваа": "Математик, Физик, Монгол хэл, Англи хэл, Биологи",
    "Мягмар": "Хими, Түүх, Нийгэм, Биеийн тамир, Геометр",
    "Лхагва": "Англи хэл, Математик, Мэдээлэл зүй, Уран зохиол",
    "Пүрэв": "Физик, Хими, Дүрслэх урлаг, Газарзүй",
    "Баасан": "Монгол хэл, Математик, Арга зүй, Спортын секц"
  });

  const [duty, setDuty] = useState<Record<string, string>>({
    "Даваа": "Болд, Сүрэн",
    "Мягмар": "Ананд, Номин",
    "Лхагва": "Бат, Туяа",
    "Пүрэв": "Дорж, Цэцэг",
    "Баасан": "Тэмүүлэн, Хулан"
  });

  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([
    { id: 1, author: "Сурагч", text: "Аялалын цагийг наашлуулах боломжтой юу?", date: "2026-09-07" }
  ]);

  // Input states for creation
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostText, setNewPostText] = useState("");
  const [newPostImg, setNewPostImg] = useState("");
  const [commentInput, setCommentInput] = useState<{ [key: number]: string }>({});
  const [newRule, setNewRule] = useState("");
  const [feedbackInput, setFeedbackInput] = useState("");

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
      alert("Нууц код буруу байна!");
    }
  };

  // Generic comment adder
  const addComment = (
    list: PostItem[],
    setList: React.Dispatch<React.SetStateAction<PostItem[]>>,
    postId: number
  ) => {
    const text = commentInput[postId];
    if (!text) return;
    setList(list.map(p => p.id === postId ? {
      ...p,
      comments: [...p.comments, { author: role === "teacher" ? "Багш" : "Сурагч/Эцэг эх", text }]
    } : p));
    setCommentInput({ ...commentInput, [postId]: "" });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Header Banner */}
      <header className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-inner">
                <School className="w-12 h-12 text-yellow-300 animate-bounce" />
              </div>
              <div>
                <div className="inline-flex items-center space-x-2 bg-yellow-400/20 text-yellow-200 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm mb-1 border border-yellow-300/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Албан ёсны цахим систем</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                  Хөвсгөл аймгийн Эрдмийн далай сургууль
                </h1>
                <p className="text-blue-100 text-sm mt-1 font-medium">
                  10В Анги • Багш: С.Хишигбаяр • Ахлагч: О.Мандахнаран (37 сурагч)
                </p>
              </div>
            </div>

            {/* Login Status */}
            <div>
              {role === "guest" ? (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="flex items-center space-x-2 bg-white text-blue-700 font-bold px-5 py-2.5 rounded-xl shadow-md hover:bg-blue-50 transition transform hover:-translate-y-0.5"
                >
                  <Lock className="w-4 h-4" />
                  <span>Нэвтрэх</span>
                </button>
              ) : (
                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                  <ShieldCheck className="w-5 h-5 text-green-300" />
                  <span className="font-semibold text-sm">
                    {role === "teacher" ? "Багшийн эрх" : "Ахлагчийн эрх"}
                  </span>
                  <button
                    onClick={() => setRole("guest")}
                    className="p-1 hover:bg-white/20 rounded-lg text-red-200 transition"
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

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 flex space-x-1 overflow-x-auto py-2 scrollbar-none">
          {[
            { id: "news", label: "Мэдээлэл", icon: FileText },
            { id: "rules", label: "Ангийн дүрэм", icon: BookOpen },
            { id: "schedule", label: "Хичээлийн хуваарь", icon: Calendar },
            { id: "duty", label: "Жижүүрийн хуваарь", icon: CheckSquare },
            { id: "achievements", label: "Амжилт бахархал", icon: Trophy },
            { id: "reports", label: "Тайлан", icon: Star },
            { id: "feedback", label: "Санал хүсэлт", icon: MessageSquare },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition ${
                  active
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
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
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-blue-700">
                  <Plus className="w-5 h-5" /> Шинэ мэдээлэл нийтлэх
                </h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Гарчиг..."
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <textarea
                    placeholder="Мэдээллийн агуулга..."
                    value={newPostText}
                    onChange={(e) => setNewPostText(e.target.value)}
                    className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none h-24"
                  />
                  <input
                    type="text"
                    placeholder="Зургийн холбоос (URL)..."
                    value={newPostImg}
                    onChange={(e) => setNewPostImg(e.target.value)}
                    className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
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
                    className="bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-blue-700 transition"
                  >
                    Нийтлэх
                  </button>
                </div>
              </div>
            )}

            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                {post.image && (
                  <img src={post.image} alt="" className="w-full h-64 object-cover" />
                )}
                <div className="p-6">
                  <div className="text-xs text-blue-600 font-semibold mb-1">{post.date}</div>
                  <h3 className="font-bold text-xl mb-2">{post.title}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">{post.text}</p>

                  {/* Comments Section */}
                  <div className="border-t pt-4 bg-slate-50 -mx-6 -mb-6 p-6 space-y-4">
                    <h4 className="font-bold text-sm text-slate-700">Сэтгэгдэл, санал:</h4>
                    {post.comments.map((c, i) => (
                      <div key={i} className="bg-white p-3 rounded-xl border text-sm">
                        <span className="font-bold text-blue-600">{c.author}: </span>
                        <span className="text-slate-700">{c.text}</span>
                      </div>
                    ))}

                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Сэтгэгдэл үлдээх..."
                        value={commentInput[post.id] || ""}
                        onChange={(e) => setCommentInput({ ...commentInput, [post.id]: e.target.value })}
                        className="flex-1 p-2.5 border rounded-xl text-sm outline-none bg-white"
                      />
                      <button
                        onClick={() => addComment(posts, setPosts, post.id)}
                        className="bg-blue-600 text-white px-4 py-2.5 rounded-xl hover:bg-blue-700 transition flex items-center"
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
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
            <h3 className="font-bold text-xl text-slate-800 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" /> 10В Ангийн Дүрэм
            </h3>

            {(role === "teacher" || role === "leader") && (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Шинэ дүрэм нэмэх..."
                  value={newRule}
                  onChange={(e) => setNewRule(e.target.value)}
                  className="flex-1 p-3 border rounded-xl outline-none"
                />
                <button
                  onClick={() => {
                    if (!newRule) return;
                    setRules([...rules, newRule]);
                    setNewRule("");
                  }}
                  className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition"
                >
                  Нэмэх
                </button>
              </div>
            )}

            <ul className="space-y-3">
              {rules.map((rule, idx) => (
                <li key={idx} className="flex items-center space-x-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="w-7 h-7 bg-blue-100 text-blue-700 font-bold rounded-full flex items-center justify-center text-sm">
                    {idx + 1}
                  </span>
                  <span className="font-medium text-slate-700">{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* TAB 3: ХИЧЭЭЛИЙН ХУВААРЬ */}
        {activeTab === "schedule" && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
            <h3 className="font-bold text-xl text-slate-800">Хичээлийн хуваарь</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(schedule).map(([day, list]) => (
                <div key={day} className="p-4 bg-slate-50 rounded-xl border">
                  <h4 className="font-bold text-blue-700 mb-2">{day}</h4>
                  {role === "teacher" || role === "leader" ? (
                    <input
                      type="text"
                      value={list}
                      onChange={(e) => setSchedule({ ...schedule, [day]: e.target.value })}
                      className="w-full p-2 border rounded-lg bg-white text-sm"
                    />
                  ) : (
                    <p className="text-slate-700 text-sm font-medium">{list}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ЖИЖҮҮРИЙН ХУВААРЬ */}
        {activeTab === "duty" && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
            <h3 className="font-bold text-xl text-slate-800">Жижүүрийн хуваарь</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {Object.entries(duty).map(([day, names]) => (
                <div key={day} className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                  <h4 className="font-bold text-blue-800 mb-2">{day}</h4>
                  {role === "teacher" || role === "leader" ? (
                    <input
                      type="text"
                      value={names}
                      onChange={(e) => setDuty({ ...duty, [day]: e.target.value })}
                      className="w-full p-2 border rounded-lg bg-white text-sm"
                    />
                  ) : (
                    <p className="text-slate-700 font-semibold">{names}</p>
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
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-3">
                <h3 className="font-bold text-lg text-amber-600 flex items-center gap-2">
                  <Trophy className="w-5 h-5" /> Шинэ амжилт нэмэх
                </h3>
                <input
                  type="text"
                  placeholder="Амжилтын нэр..."
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  className="w-full p-3 border rounded-xl outline-none"
                />
                <textarea
                  placeholder="Тайлбар..."
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  className="w-full p-3 border rounded-xl outline-none h-20"
                />
                <input
                  type="text"
                  placeholder="Зургийн URL..."
                  value={newPostImg}
                  onChange={(e) => setNewPostImg(e.target.value)}
                  className="w-full p-3 border rounded-xl outline-none"
                />
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
                  className="bg-amber-500 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-amber-600 transition"
                >
                  Нэмэх
                </button>
              </div>
            )}

            {achievements.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                {item.image && <img src={item.image} alt="" className="w-full h-64 object-cover" />}
                <div className="p-6">
                  <div className="text-xs text-amber-600 font-semibold mb-1">{item.date}</div>
                  <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                  <p className="text-slate-600 mb-6">{item.text}</p>

                  <div className="border-t pt-4 bg-slate-50 -mx-6 -mb-6 p-6 space-y-4">
                    <h4 className="font-bold text-sm text-slate-700">Баяр хүргэх, сэтгэгдэл:</h4>
                    {item.comments.map((c, i) => (
                      <div key={i} className="bg-white p-3 rounded-xl border text-sm">
                        <span className="font-bold text-amber-600">{c.author}: </span>
                        <span>{c.text}</span>
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Баяр хүргэх сэтгэгдэл..."
                        value={commentInput[item.id] || ""}
                        onChange={(e) => setCommentInput({ ...commentInput, [item.id]: e.target.value })}
                        className="flex-1 p-2.5 border rounded-xl text-sm outline-none bg-white"
                      />
                      <button
                        onClick={() => addComment(achievements, setAchievements, item.id)}
                        className="bg-amber-500 text-white px-4 py-2.5 rounded-xl hover:bg-amber-600 transition"
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

        {/* TAB 6: ТАЙЛАН */}
        {activeTab === "reports" && (
          <div className="space-y-6">
            {role === "teacher" && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-3">
                <h3 className="font-bold text-lg text-purple-700 flex items-center gap-2">
                  <Star className="w-5 h-5" /> Шинэ тайлан оруулах
                </h3>
                <input
                  type="text"
                  placeholder="Тайлангийн нэр..."
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  className="w-full p-3 border rounded-xl outline-none"
                />
                <textarea
                  placeholder="Дэлгэрэнгүй агуулга..."
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  className="w-full p-3 border rounded-xl outline-none h-20"
                />
                <input
                  type="text"
                  placeholder="Зургийн URL..."
                  value={newPostImg}
                  onChange={(e) => setNewPostImg(e.target.value)}
                  className="w-full p-3 border rounded-xl outline-none"
                />
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
                  className="bg-purple-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-purple-700 transition"
                >
                  Нэмэх
                </button>
              </div>
            )}

            {reports.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                {item.image && <img src={item.image} alt="" className="w-full h-64 object-cover" />}
                <div className="p-6">
                  <div className="text-xs text-purple-600 font-semibold mb-1">{item.date}</div>
                  <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                  <p className="text-slate-600 mb-6">{item.text}</p>

                  <div className="border-t pt-4 bg-slate-50 -mx-6 -mb-6 p-6 space-y-4">
                    <h4 className="font-bold text-sm text-slate-700">Сэтгэгдэл, санал:</h4>
                    {item.comments.map((c, i) => (
                      <div key={i} className="bg-white p-3 rounded-xl border text-sm">
                        <span className="font-bold text-purple-600">{c.author}: </span>
                        <span>{c.text}</span>
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Сэтгэгдэл бичих..."
                        value={commentInput[item.id] || ""}
                        onChange={(e) => setCommentInput({ ...commentInput, [item.id]: e.target.value })}
                        className="flex-1 p-2.5 border rounded-xl text-sm outline-none bg-white"
                      />
                      <button
                        onClick={() => addComment(reports, setReports, item.id)}
                        className="bg-purple-600 text-white px-4 py-2.5 rounded-xl hover:bg-purple-700 transition"
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

        {/* TAB 7: САНАЛ ХҮСЭЛТ */}
        {activeTab === "feedback" && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
            <h3 className="font-bold text-xl text-slate-800">Санал хүсэлт үлдээх</h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Санал, хүсэлтээ бичнэ үү..."
                value={feedbackInput}
                onChange={(e) => setFeedbackInput(e.target.value)}
                className="flex-1 p-3 border rounded-xl outline-none"
              />
              <button
                onClick={() => {
                  if (!feedbackInput) return;
                  setFeedbacks([
                    ...feedbacks,
                    {
                      id: Date.now(),
                      author: "Сурагч/Эцэг эх",
                      text: feedbackInput,
                      date: new Date().toISOString().split("T")[0]
                    }
                  ]);
                  setFeedbackInput("");
                }}
                className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition"
              >
                Илгээх
              </button>
            </div>

            <div className="space-y-3 pt-4 border-t">
              {feedbacks.map((f) => (
                <div key={f.id} className="p-4 bg-slate-50 rounded-xl border">
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span className="font-bold text-slate-700">{f.author}</span>
                    <span>{f.date}</span>
                  </div>
                  <p className="text-slate-700 text-sm">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* LOGIN MODAL */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-4">
            <h3 className="font-bold text-xl text-center text-slate-800">Системд нэвтрэх</h3>
            <p className="text-xs text-center text-slate-500">
              Багш болон Ангийн ахлагчийн нууц кодоо оруулна уу
            </p>
            <input
              type="password"
              placeholder="PIN код..."
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              className="w-full p-3 border rounded-xl text-center text-lg tracking-widest outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setShowLoginModal(false)}
                className="flex-1 py-2.5 border rounded-xl font-semibold hover:bg-slate-50"
              >
                Цуцлах
              </button>
              <button
                onClick={handleLogin}
                className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700"
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