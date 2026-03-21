import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  MapPin,
  Phone,
  Globe,
  BadgeDollarSign,
  Car,
  ShieldCheck,
  Trees,
  ChevronRight,
  BedDouble,
  Landmark,
  Mail,
  User,
  Home,
  CalendarDays,
} from "lucide-react";

type Language = "ka" | "en" | "ru";

type Message = {
  id: string;
  role: "assistant" | "user";
  text: string;
};

type LeadForm = {
  name: string;
  phone: string;
  email: string;
  budget: string;
  apartmentType: string;
  preferredDate: string;
};

const content = {
  ka: {
    brand: "Skyline Residence",
    subtitle: "უძრავი ქონების გაყიდვების AI ასისტენტი",
    welcome:
      "მოგესალმებით Skyline Residence-ში. დაგეხმარებით ბინების ტიპებში, ფასების დიაპაზონში, გადახდის პირობებში, პროექტის დეტალებში და ვიზიტის დაჯავშნაში.",
    placeholder: "დაწერეთ თქვენი კითხვა...",
    send: "გაგზავნა",
    language: "ენა",
    actions: {
      units: "ბინების ტიპები",
      prices: "ფასები",
      payment: "გადახდის გეგმა",
      amenities: "ინფრასტრუქტურა",
      viewing: "ვიზიტის დაჯავშნა",
      location: "ლოკაცია",
    },
    panel: {
      city: "თბილისი",
      projectType: "პრემიუმ საცხოვრებელი პროექტი",
      salesLine: "გაყიდვების ხაზი",
      availability: "კონსულტაცია ღიაა",
      hero1: "ინვესტიციისთვის კარგი არჩევანი",
      hero2: "მოქნილი გადახდის პირობები",
      hero3: "ოჯახზე მორგებული გარემო",
    },
    thinking: "მუშავდება...",
    assistantTitle: "Sales Concierge",
    assistantSubtitle: "ლიდები, ვიზიტები და გაყიდვების კომუნიკაცია",
    liveDemo: "Developer Demo",
    chatHint: "ესაუბრეთ Skyline Residence-ის გაყიდვების ასისტენტს",
    formTitle: "სწრაფი მოთხოვნა",
    formSubtitle: "დატოვეთ თქვენი მონაცემები და გაყიდვების გუნდი დაგიკავშირდებათ",
    labels: {
      name: "სრული სახელი",
      phone: "ტელეფონი",
      email: "ელფოსტა",
      budget: "ბიუჯეტის დიაპაზონი",
      apartmentType: "სასურველი ბინის ტიპი",
      preferredDate: "ვიზიტის სასურველი თარიღი",
      submit: "მოთხოვნის გაგზავნა",
    },
    success:
      "გმადლობთ. თქვენი მოთხოვნა მიღებულია და გაყიდვების გუნდი მალე დაგიკავშირდებათ.",
  },
  en: {
    brand: "Skyline Residence",
    subtitle: "Real Estate AI Sales Assistant",
    welcome:
      "Welcome to Skyline Residence. I can help with apartment types, price ranges, payment plans, project details, and booking a viewing.",
    placeholder: "Type your question...",
    send: "Send",
    language: "Language",
    actions: {
      units: "Unit Types",
      prices: "Prices",
      payment: "Payment Plan",
      amenities: "Amenities",
      viewing: "Book a Viewing",
      location: "Location",
    },
    panel: {
      city: "Tbilisi",
      projectType: "Premium residential development",
      salesLine: "Sales line",
      availability: "Consultations open",
      hero1: "Strong investment appeal",
      hero2: "Flexible payment options",
      hero3: "Family-oriented living",
    },
    thinking: "Thinking...",
    assistantTitle: "Sales Concierge",
    assistantSubtitle: "Leads, viewings, and sales communication",
    liveDemo: "Developer Demo",
    chatHint: "Chat with Skyline Residence sales assistant",
    formTitle: "Quick Inquiry",
    formSubtitle: "Leave your details and the sales team will contact you",
    labels: {
      name: "Full Name",
      phone: "Phone",
      email: "Email",
      budget: "Budget Range",
      apartmentType: "Preferred Apartment Type",
      preferredDate: "Preferred Viewing Date",
      submit: "Submit Inquiry",
    },
    success:
      "Thank you. Your request has been received and the sales team will contact you shortly.",
  },
  ru: {
    brand: "Skyline Residence",
    subtitle: "AI-помощник по продажам недвижимости",
    welcome:
      "Добро пожаловать в Skyline Residence. Я помогу с типами квартир, диапазоном цен, планами оплаты, деталями проекта и бронированием просмотра.",
    placeholder: "Введите ваш вопрос...",
    send: "Отправить",
    language: "Язык",
    actions: {
      units: "Типы квартир",
      prices: "Цены",
      payment: "План оплаты",
      amenities: "Инфраструктура",
      viewing: "Записаться на просмотр",
      location: "Локация",
    },
    panel: {
      city: "Тбилиси",
      projectType: "Премиальный жилой проект",
      salesLine: "Отдел продаж",
      availability: "Консультации открыты",
      hero1: "Инвестиционная привлекательность",
      hero2: "Гибкие условия оплаты",
      hero3: "Комфорт для семьи",
    },
    thinking: "Обработка...",
    assistantTitle: "Sales Concierge",
    assistantSubtitle: "Лиды, просмотры и продажи",
    liveDemo: "Developer Demo",
    chatHint: "Напишите помощнику Skyline Residence",
    formTitle: "Быстрый запрос",
    formSubtitle: "Оставьте данные, и отдел продаж свяжется с вами",
    labels: {
      name: "Полное имя",
      phone: "Телефон",
      email: "Email",
      budget: "Диапазон бюджета",
      apartmentType: "Желаемый тип квартиры",
      preferredDate: "Предпочтительная дата просмотра",
      submit: "Отправить запрос",
    },
    success:
      "Спасибо. Ваш запрос получен, и отдел продаж скоро свяжется с вами.",
  },
} as const;

function detectLanguage(text: string): Language {
  if (/[а-яё]/i.test(text)) return "ru";
  if (/[ა-ჰ]/i.test(text)) return "ka";
  return "en";
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top left, #dbeafe 0%, #eff6ff 35%, #ffffff 70%)",
    padding: "24px",
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    color: "#0f172a",
  } as React.CSSProperties,
  grid: {
    maxWidth: 1400,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "380px 1fr",
    gap: 24,
    alignItems: "start",
  } as React.CSSProperties,
  card: {
    background: "rgba(255,255,255,0.92)",
    border: "1px solid rgba(191,219,254,0.9)",
    borderRadius: 28,
    boxShadow: "0 20px 80px rgba(37,99,235,0.12)",
    overflow: "hidden",
    backdropFilter: "blur(10px)",
  } as React.CSSProperties,
  blueHeader: {
    padding: 24,
    background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #38bdf8 100%)",
    color: "white",
  } as React.CSSProperties,
  whiteSection: {
    padding: 24,
  } as React.CSSProperties,
  badge: {
    display: "inline-flex",
    alignItems: "center",
    padding: "6px 12px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.14)",
    color: "white",
    fontSize: 12,
    fontWeight: 600,
    border: "1px solid rgba(255,255,255,0.15)",
  } as React.CSSProperties,
  heroBox: {
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 18,
    padding: 14,
    fontSize: 14,
    fontWeight: 600,
  } as React.CSSProperties,
  langButton: (active: boolean): React.CSSProperties => ({
    padding: "10px 14px",
    borderRadius: 16,
    border: active ? "1px solid #1d4ed8" : "1px solid #dbeafe",
    background: active ? "#1d4ed8" : "white",
    color: active ? "white" : "#0f172a",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 14,
  }),
  snapshot: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 22,
    padding: 18,
  } as React.CSSProperties,
  statGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
  } as React.CSSProperties,
  statBox: {
    background: "#eff6ff",
    border: "1px solid #dbeafe",
    borderRadius: 18,
    padding: 14,
    fontSize: 12,
    fontWeight: 600,
  } as React.CSSProperties,
  formCard: {
    background: "white",
    border: "1px solid #dbeafe",
    borderRadius: 22,
    padding: 18,
    boxShadow: "0 10px 30px rgba(37,99,235,0.06)",
  } as React.CSSProperties,
  input: {
    width: "100%",
    height: 46,
    borderRadius: 16,
    border: "1px solid #dbeafe",
    background: "white",
    padding: "0 14px",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
  } as React.CSSProperties,
  iconInputWrap: {
    position: "relative",
  } as React.CSSProperties,
  iconInputIcon: {
    position: "absolute",
    left: 12,
    top: "50%",
    transform: "translateY(-50%)",
    color: "#94a3b8",
    width: 16,
    height: 16,
  } as React.CSSProperties,
  iconInput: {
    width: "100%",
    height: 46,
    borderRadius: 16,
    border: "1px solid #dbeafe",
    background: "white",
    padding: "0 14px 0 40px",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
  } as React.CSSProperties,
  primaryButton: {
    height: 46,
    borderRadius: 16,
    border: "none",
    background: "#1d4ed8",
    color: "white",
    padding: "0 18px",
    fontWeight: 700,
    cursor: "pointer",
  } as React.CSSProperties,
  outlineButton: {
    height: 40,
    borderRadius: 16,
    border: "1px solid #dbeafe",
    background: "white",
    color: "#0f172a",
    padding: "0 14px",
    fontWeight: 600,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
  } as React.CSSProperties,
  chatCard: {
    background: "rgba(255,255,255,0.92)",
    border: "1px solid rgba(191,219,254,0.9)",
    borderRadius: 28,
    boxShadow: "0 20px 80px rgba(37,99,235,0.12)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    height: "78vh",
  } as React.CSSProperties,
  chatHeader: {
    padding: 24,
    borderBottom: "1px solid #dbeafe",
    background: "rgba(255,255,255,0.84)",
  } as React.CSSProperties,
  quickActions: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 14,
  } as React.CSSProperties,
  messagesWrap: {
    flex: 1,
    minHeight: 0,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    padding: 16,
  } as React.CSSProperties,
  scrollArea: {
    flex: 1,
    overflowY: "auto",
    borderRadius: 24,
    background: "linear-gradient(to bottom, #f8fafc, #ffffff)",
    border: "1px solid #dbeafe",
    padding: 16,
  } as React.CSSProperties,
  msgRowLeft: {
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: 12,
  } as React.CSSProperties,
  msgRowRight: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: 12,
  } as React.CSSProperties,
  msgAssistant: {
    maxWidth: "85%",
    padding: "14px 16px",
    borderRadius: 20,
    background: "white",
    color: "#1e293b",
    border: "1px solid #dbeafe",
    boxShadow: "0 4px 12px rgba(15,23,42,0.04)",
    whiteSpace: "pre-line",
    fontSize: 14,
    lineHeight: 1.5,
  } as React.CSSProperties,
  msgUser: {
    maxWidth: "85%",
    padding: "14px 16px",
    borderRadius: 20,
    background: "#1d4ed8",
    color: "white",
    boxShadow: "0 6px 18px rgba(29,78,216,0.22)",
    whiteSpace: "pre-line",
    fontSize: 14,
    lineHeight: 1.5,
  } as React.CSSProperties,
  composer: {
    border: "1px solid #dbeafe",
    borderRadius: 24,
    background: "white",
    padding: 14,
    boxShadow: "0 10px 30px rgba(37,99,235,0.06)",
  } as React.CSSProperties,
  composerRow: {
    display: "flex",
    gap: 12,
  } as React.CSSProperties,
};

export default function RealEstateChatbotDemo() {
  const [language, setLanguage] = useState<Language>("ka");
  const t = content[language];

  const initialMessages = useMemo<Message[]>(
    () => [{ id: "welcome", role: "assistant", text: t.welcome }],
    [t.welcome]
  );

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [leadForm, setLeadForm] = useState<LeadForm>({
    name: "",
    phone: "",
    email: "",
    budget: "",
    apartmentType: "",
    preferredDate: "",
  });

  useEffect(() => {
    setMessages([{ id: `welcome-${language}`, role: "assistant", text: t.welcome }]);
    setInput("");
  }, [language, t.welcome]);

  const pushMessage = (role: "assistant" | "user", text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: `${role}-${Date.now()}-${Math.random()}`, role, text },
    ]);
  };

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const detected = detectLanguage(trimmed);
    setLanguage(detected);

    const history = messages.map((m) => ({
      role: m.role,
      text: m.text,
    }));

    pushMessage("user", trimmed);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmed,
          history,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Request failed");
      }

      pushMessage(
        "assistant",
        data.reply || "უკაცრავად, პასუხის მიღება ვერ მოხერხდა."
      );
    } catch (error) {
      console.error(error);
      pushMessage(
        "assistant",
        detected === "ru"
          ? "Извините, сейчас не удалось получить ответ."
          : detected === "en"
          ? "Sorry, I could not get a response right now."
          : "უკაცრავად, პასუხის მიღება ახლა ვერ მოხერხდა."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const quickActionMap = {
    ka: {
      units: "რა ტიპის ბინებია ხელმისაწვდომი?",
      prices: "ფასების დიაპაზონი მაინტერესებს",
      payment: "გადახდის პირობები რა არის?",
      amenities: "რა ინფრასტრუქტურა აქვს პროექტს?",
      viewing: "მინდა ვიზიტის დაჯავშნა",
      location: "სად მდებარეობს პროექტი?",
    },
    en: {
      units: "What unit types are available?",
      prices: "I want to know the price range",
      payment: "What payment plans are available?",
      amenities: "What amenities does the project offer?",
      viewing: "I want to book a viewing",
      location: "Where is the project located?",
    },
    ru: {
      units: "Какие типы квартир доступны?",
      prices: "Интересует диапазон цен",
      payment: "Какие есть условия оплаты?",
      amenities: "Какая инфраструктура есть у проекта?",
      viewing: "Хочу записаться на просмотр",
      location: "Где расположен проект?",
    },
  } as const;

  const submitLeadForm = () => {
    const summary = [
      t.success,
      "",
      `${t.labels.name}: ${leadForm.name || "—"}`,
      `${t.labels.phone}: ${leadForm.phone || "—"}`,
      `${t.labels.email}: ${leadForm.email || "—"}`,
      `${t.labels.budget}: ${leadForm.budget || "—"}`,
      `${t.labels.apartmentType}: ${leadForm.apartmentType || "—"}`,
      `${t.labels.preferredDate}: ${leadForm.preferredDate || "—"}`,
    ].join("\n");

    pushMessage("assistant", summary);

    setLeadForm({
      name: "",
      phone: "",
      email: "",
      budget: "",
      apartmentType: "",
      preferredDate: "",
    });
  };

  return (
    <div style={styles.page}>
      <div style={styles.grid}>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
          <div style={styles.card}>
            <div style={styles.blueHeader}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                    <span style={styles.badge}>Developer AI</span>
                    <span style={styles.badge}>Multilingual</span>
                  </div>
                  <div style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.1 }}>
                    {t.brand}
                  </div>
                  <div style={{ marginTop: 6, color: "#dbeafe", fontSize: 14 }}>
                    {t.subtitle}
                  </div>
                </div>
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 20,
                    background: "rgba(255,255,255,0.14)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgba(255,255,255,0.18)",
                    flexShrink: 0,
                  }}
                >
                  <Building2 />
                </div>
              </div>

              <div style={{ display: "grid", gap: 10, marginTop: 18 }}>
                <div style={styles.heroBox}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Landmark size={16} />
                    {t.panel.hero1}
                  </div>
                </div>
                <div style={styles.heroBox}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <BadgeDollarSign size={16} />
                    {t.panel.hero2}
                  </div>
                </div>
                <div style={styles.heroBox}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Home size={16} />
                    {t.panel.hero3}
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.whiteSection}>
              <div style={{ marginBottom: 20 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#334155",
                    marginBottom: 10,
                  }}
                >
                  <Globe size={16} color="#1d4ed8" />
                  {t.language}
                </div>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button style={styles.langButton(language === "ka")} onClick={() => setLanguage("ka")}>
                    ქართული
                  </button>
                  <button style={styles.langButton(language === "en")} onClick={() => setLanguage("en")}>
                    English
                  </button>
                  <button style={styles.langButton(language === "ru")} onClick={() => setLanguage("ru")}>
                    Русский
                  </button>
                </div>
              </div>

              <div style={styles.snapshot}>
                <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 14 }}>
                  Project Snapshot
                </div>

                <div style={{ display: "grid", gap: 14, fontSize: 14 }}>
                  <div style={{ display: "flex", gap: 12 }}>
                    <MapPin size={16} color="#1d4ed8" style={{ marginTop: 2 }} />
                    <div>
                      <div style={{ fontWeight: 700 }}>{t.panel.city}</div>
                      <div style={{ color: "#64748b" }}>{t.panel.projectType}</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 12 }}>
                    <BadgeDollarSign size={16} color="#1d4ed8" style={{ marginTop: 2 }} />
                    <div>
                      <div style={{ fontWeight: 700 }}>{t.panel.availability}</div>
                      <div style={{ color: "#64748b" }}>Prices and plans via inquiry</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 12 }}>
                    <Phone size={16} color="#1d4ed8" style={{ marginTop: 2 }} />
                    <div>
                      <div style={{ fontWeight: 700 }}>{t.panel.salesLine}</div>
                      <div style={{ color: "#64748b" }}>+995 555 98 76 54</div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ ...styles.statGrid, marginTop: 14 }}>
                <div style={styles.statBox}>
                  <Car size={16} color="#1d4ed8" style={{ marginBottom: 8 }} />
                  Parking
                </div>
                <div style={styles.statBox}>
                  <ShieldCheck size={16} color="#1d4ed8" style={{ marginBottom: 8 }} />
                  Security
                </div>
                <div style={styles.statBox}>
                  <Trees size={16} color="#1d4ed8" style={{ marginBottom: 8 }} />
                  Green Areas
                </div>
                <div style={styles.statBox}>
                  <BedDouble size={16} color="#1d4ed8" style={{ marginBottom: 8 }} />
                  Family Layouts
                </div>
              </div>

              <div style={{ ...styles.formCard, marginTop: 16 }}>
                <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 4 }}>
                  {t.formTitle}
                </div>
                <div style={{ fontSize: 12, color: "#64748b", marginBottom: 14 }}>
                  {t.formSubtitle}
                </div>

                <div style={{ display: "grid", gap: 10 }}>
                  <div style={styles.iconInputWrap}>
                    <User style={styles.iconInputIcon} />
                    <input
                      style={styles.iconInput}
                      placeholder={t.labels.name}
                      value={leadForm.name}
                      onChange={(e) =>
                        setLeadForm((prev) => ({ ...prev, name: e.target.value }))
                      }
                    />
                  </div>

                  <div style={styles.iconInputWrap}>
                    <Phone style={styles.iconInputIcon} />
                    <input
                      style={styles.iconInput}
                      placeholder={t.labels.phone}
                      value={leadForm.phone}
                      onChange={(e) =>
                        setLeadForm((prev) => ({ ...prev, phone: e.target.value }))
                      }
                    />
                  </div>

                  <div style={styles.iconInputWrap}>
                    <Mail style={styles.iconInputIcon} />
                    <input
                      style={styles.iconInput}
                      placeholder={t.labels.email}
                      value={leadForm.email}
                      onChange={(e) =>
                        setLeadForm((prev) => ({ ...prev, email: e.target.value }))
                      }
                    />
                  </div>

                  <input
                    style={styles.input}
                    placeholder={t.labels.budget}
                    value={leadForm.budget}
                    onChange={(e) =>
                      setLeadForm((prev) => ({ ...prev, budget: e.target.value }))
                    }
                  />

                  <input
                    style={styles.input}
                    placeholder={t.labels.apartmentType}
                    value={leadForm.apartmentType}
                    onChange={(e) =>
                      setLeadForm((prev) => ({
                        ...prev,
                        apartmentType: e.target.value,
                      }))
                    }
                  />

                  <div style={styles.iconInputWrap}>
                    <CalendarDays style={styles.iconInputIcon} />
                    <input
                      type="date"
                      style={styles.iconInput}
                      value={leadForm.preferredDate}
                      onChange={(e) =>
                        setLeadForm((prev) => ({
                          ...prev,
                          preferredDate: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <button style={{ ...styles.primaryButton, width: "100%" }} onClick={submitLeadForm}>
                    {t.labels.submit}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
          <div style={styles.chatCard}>
            <div style={styles.chatHeader}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  marginBottom: 14,
                }}
              >
                <div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#0f172a" }}>
                    {t.assistantTitle}
                  </div>
                  <div style={{ fontSize: 14, color: "#64748b" }}>
                    {t.assistantSubtitle}
                  </div>
                </div>
                <div
                  style={{
                    padding: "8px 12px",
                    borderRadius: 16,
                    background: "#eff6ff",
                    color: "#1d4ed8",
                    border: "1px solid #dbeafe",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  {t.liveDemo}
                </div>
              </div>

              <div style={styles.quickActions}>
                <button style={styles.outlineButton} onClick={() => sendMessage(quickActionMap[language].units)}>
                  {t.actions.units}
                </button>
                <button style={styles.outlineButton} onClick={() => sendMessage(quickActionMap[language].prices)}>
                  {t.actions.prices}
                </button>
                <button style={styles.outlineButton} onClick={() => sendMessage(quickActionMap[language].payment)}>
                  {t.actions.payment}
                </button>
                <button style={styles.outlineButton} onClick={() => sendMessage(quickActionMap[language].amenities)}>
                  {t.actions.amenities}
                </button>
                <button style={styles.outlineButton} onClick={() => sendMessage(quickActionMap[language].viewing)}>
                  {t.actions.viewing}
                </button>
                <button style={styles.outlineButton} onClick={() => sendMessage(quickActionMap[language].location)}>
                  {t.actions.location}
                </button>
              </div>
            </div>

            <div style={styles.messagesWrap}>
              <div style={styles.scrollArea}>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    style={message.role === "user" ? styles.msgRowRight : styles.msgRowLeft}
                  >
                    <div style={message.role === "user" ? styles.msgUser : styles.msgAssistant}>
                      {message.text}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div style={styles.msgRowLeft}>
                    <div style={styles.msgAssistant}>{t.thinking}</div>
                  </div>
                )}
              </div>

              <div style={styles.composer}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#64748b",
                    marginBottom: 10,
                  }}
                >
                  <ChevronRight size={16} color="#1d4ed8" />
                  {t.chatHint}
                </div>

                <div style={styles.composerRow}>
                  <input
                    style={styles.input}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t.placeholder}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") sendMessage(input);
                    }}
                  />
                  <button style={styles.primaryButton} onClick={() => sendMessage(input)}>
                    {t.send}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}