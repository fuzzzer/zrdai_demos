import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MapPin,
  Clock3,
  Phone,
  Globe,
  UtensilsCrossed,
  ChefHat,
  Wine,
  Coffee,
  CalendarDays,
  Sparkles,
  Cake,
  Truck,
} from "lucide-react";

type Language = "en" | "ru" | "ka";
type Intent =
  | "reservation"
  | "menu"
  | "vegan"
  | "hours"
  | "events"
  | "delivery"
  | "other";

type Message = {
  id: string;
  role: "assistant" | "user";
  text: string;
};

type ReservationForm = {
  date: string;
  time: string;
  guests: string;
  name: string;
  contact: string;
};

const content = {
  en: {
    brand: "Luna Cafe",
    subtitle: "Restaurant & Cafe Assistant",
    welcome:
      "Welcome to Luna Cafe! I can help with table reservations, menu questions, opening hours, private events, and takeaway or delivery information.",
    placeholder: "Type your message...",
    send: "Send",
    quickActions: {
      reservation: "Book a Table",
      menu: "View Menu Info",
      vegan: "Vegan Options",
      hours: "Opening Hours",
      events: "Private Events",
      delivery: "Delivery & Takeaway",
    },
    side: {
      cuisine: "Cuisine",
      cuisineValue: "European • Brunch • Desserts",
      hours: "Hours",
      hoursValue: "Daily • 10:00 AM – 11:00 PM",
      address: "Address",
      addressValue: "12 Rustaveli Avenue, Tbilisi",
      phone: "Phone",
      phoneValue: "+995 555 12 34 56",
    },
    replies: {
      menu:
        "Our menu includes breakfast plates, fresh salads, pasta, grilled dishes, desserts, coffee, and signature drinks. I can also tell you about vegetarian, vegan, or gluten-friendly options.",
      vegan:
        "Yes, we offer vegan-friendly dishes, including fresh salads, grilled vegetables, pasta options, and plant-based desserts.",
      hours: "We are open every day from 10:00 AM to 11:00 PM.",
      events:
        "We can assist with birthday dinners, business lunches, and small private events. Please share your preferred date, guest count, and event type.",
      delivery:
        "Yes, we offer takeaway and selected delivery options. Typical preparation time is around 20–35 minutes depending on the order.",
      fallback:
        "I’d be happy to help. You can ask about reservations, menu options, opening hours, private events, or takeaway and delivery.",
      askReservation:
        "Great — please share your preferred date, time, number of guests, your full name, and a phone number or email for confirmation.",
      reservationSummaryTitle: "Thanks! Here is your reservation request summary:",
      reservationSubmitted:
        "Your request has been noted, and the restaurant team will confirm it shortly.",
    },
    labels: {
      date: "Date",
      time: "Time",
      guests: "Guests",
      name: "Full Name",
      contact: "Phone or Email",
      submit: "Submit Reservation Request",
      language: "Language",
      assistantTitle: "Guest Assistant",
      assistantSubtitle: "Reservations, menu, events and delivery",
      chatHint: "Chat with the restaurant assistant",
      demoBadge: "Live Demo UI",
      chefPicks: "Chef Picks",
      chefPicksSub: "Fresh daily",
      drinks: "Drinks",
      drinksSub: "Signature list",
      cafeStyle: "Cafe Style",
      cafeStyleSub: "Brunch & coffee",
      signatureDining: "Signature Dining",
      multilingual: "Multilingual",
    },
  },
  ru: {
    brand: "Luna Cafe",
    subtitle: "Помощник ресторана и кафе",
    welcome:
      "Добро пожаловать в Luna Cafe! Я помогу с бронированием столика, вопросами по меню, часами работы, частными мероприятиями, а также с информацией о самовывозе и доставке.",
    placeholder: "Введите сообщение...",
    send: "Отправить",
    quickActions: {
      reservation: "Забронировать стол",
      menu: "Информация о меню",
      vegan: "Веганские блюда",
      hours: "Часы работы",
      events: "Частные мероприятия",
      delivery: "Доставка и самовывоз",
    },
    side: {
      cuisine: "Кухня",
      cuisineValue: "Европейская • Бранч • Десерты",
      hours: "Часы работы",
      hoursValue: "Ежедневно • 10:00 – 23:00",
      address: "Адрес",
      addressValue: "проспект Руставели 12, Тбилиси",
      phone: "Телефон",
      phoneValue: "+995 555 12 34 56",
    },
    replies: {
      menu:
        "В нашем меню есть завтраки, свежие салаты, паста, блюда на гриле, десерты, кофе и фирменные напитки. Я также могу подсказать вегетарианские, веганские и безглютеновые варианты.",
      vegan:
        "Да, у нас есть веганские блюда: свежие салаты, овощи на гриле, некоторые варианты пасты и десерты на растительной основе.",
      hours: "Мы открыты каждый день с 10:00 до 23:00.",
      events:
        "Мы помогаем с днями рождения, бизнес-ланчами и небольшими частными мероприятиями. Пожалуйста, укажите желаемую дату, количество гостей и тип события.",
      delivery:
        "Да, у нас есть самовывоз и некоторые варианты доставки. Обычно приготовление занимает около 20–35 минут в зависимости от заказа.",
      fallback:
        "С удовольствием помогу. Вы можете спросить о бронировании, меню, часах работы, частных мероприятиях, самовывозе или доставке.",
      askReservation:
        "Отлично — пожалуйста, укажите желаемую дату, время, количество гостей, ваше полное имя и номер телефона или email для подтверждения.",
      reservationSummaryTitle:
        "Спасибо! Вот краткая информация по вашему запросу на бронирование:",
      reservationSubmitted:
        "Ваш запрос сохранён, и команда ресторана скоро свяжется с вами для подтверждения.",
    },
    labels: {
      date: "Дата",
      time: "Время",
      guests: "Гости",
      name: "Полное имя",
      contact: "Телефон или Email",
      submit: "Отправить запрос на бронирование",
      language: "Язык",
      assistantTitle: "Помощник для гостей",
      assistantSubtitle: "Бронирование, меню, мероприятия и доставка",
      chatHint: "Напишите ресторанному помощнику",
      demoBadge: "Демо интерфейс",
      chefPicks: "Выбор шефа",
      chefPicksSub: "Свежие блюда каждый день",
      drinks: "Напитки",
      drinksSub: "Фирменная карта",
      cafeStyle: "Формат кафе",
      cafeStyleSub: "Бранч и кофе",
      signatureDining: "Фирменный ресторан",
      multilingual: "Мультиязычно",
    },
  },
  ka: {
    brand: "Luna Cafe",
    subtitle: "რესტორნისა და კაფის ასისტენტი",
    welcome:
      "მოგესალმებით Luna Cafe-ში! დაგეხმარებით მაგიდის დაჯავშნაში, მენიუს შესახებ კითხვებში, სამუშაო საათებში, კერძო ღონისძიებების დაგეგმვაში და მიტანის ან წაღების ინფორმაციაში.",
    placeholder: "შეიყვანეთ შეტყობინება...",
    send: "გაგზავნა",
    quickActions: {
      reservation: "მაგიდის დაჯავშნა",
      menu: "მენიუს ინფორმაცია",
      vegan: "ვეგანური არჩევანი",
      hours: "სამუშაო საათები",
      events: "კერძო ღონისძიებები",
      delivery: "მიტანა და წაღება",
    },
    side: {
      cuisine: "სამზარეულო",
      cuisineValue: "ევროპული • ბრანჩი • დესერტები",
      hours: "სამუშაო საათები",
      hoursValue: "ყოველდღე • 10:00 – 23:00",
      address: "მისამართი",
      addressValue: "რუსთაველის გამზირი 12, თბილისი",
      phone: "ტელეფონი",
      phoneValue: "+995 555 12 34 56",
    },
    replies: {
      menu:
        "ჩვენს მენიუშია საუზმის კერძები, სალათები, პასტა, გრილზე მომზადებული კერძები, დესერტები, ყავა და საფირმო სასმელები. სურვილის შემთხვევაში ვეგეტარიანულ, ვეგანურ და გლუტენისგან თავისუფალ ვარიანტებზეც გეტყვით.",
      vegan:
        "დიახ, გვაქვს ვეგანური არჩევანი, მათ შორის ახალი სალათები, გრილზე მომზადებული ბოსტნეული, გარკვეული პასტები და მცენარეულ საფუძველზე მომზადებული დესერტები.",
      hours: "ვმუშაობთ ყოველდღე 10:00-დან 23:00-მდე.",
      events:
        "გეხმარებით დაბადების დღის ვახშმის, საქმიანი ლანჩისა და მცირე კერძო ღონისძიებების ორგანიზებაში. გთხოვთ მოგვწეროთ სასურველი თარიღი, სტუმრების რაოდენობა და ღონისძიების ტიპი.",
      delivery:
        "დიახ, გვაქვს როგორც წაღება, ასევე გარკვეული მიტანის სერვისი. შეკვეთის მომზადებას ჩვეულებრივ 20–35 წუთი სჭირდება.",
      fallback:
        "სიამოვნებით დაგეხმარებით. შეგიძლიათ გვკითხოთ ჯავშნის, მენიუს, სამუშაო საათების, კერძო ღონისძიებების, მიტანისა და წაღების შესახებ.",
      askReservation:
        "შესანიშნავია — გთხოვთ მოგვწეროთ სასურველი თარიღი, დრო, სტუმრების რაოდენობა, თქვენი სრული სახელი და ტელეფონის ნომერი ან ელფოსტა დასადასტურებლად.",
      reservationSummaryTitle: "გმადლობთ! თქვენი ჯავშნის მოთხოვნის შეჯამება:",
      reservationSubmitted:
        "თქვენი მოთხოვნა მიღებულია და რესტორნის გუნდი მალე დაგიკავშირდებათ დასადასტურებლად.",
    },
    labels: {
      date: "თარიღი",
      time: "დრო",
      guests: "სტუმრები",
      name: "სრული სახელი",
      contact: "ტელეფონი ან ელფოსტა",
      submit: "ჯავშნის მოთხოვნის გაგზავნა",
      language: "ენა",
      assistantTitle: "სტუმრების ასისტენტი",
      assistantSubtitle: "ჯავშანი, მენიუ, ღონისძიებები და მიტანა",
      chatHint: "ესაუბრეთ რესტორნის ასისტენტს",
      demoBadge: "დემო ინტერფეისი",
      chefPicks: "შეფის რჩეული",
      chefPicksSub: "ყოველდღიური ახალი კერძები",
      drinks: "სასმელები",
      drinksSub: "საფირმო სია",
      cafeStyle: "კაფეს სტილი",
      cafeStyleSub: "ბრანჩი და ყავა",
      signatureDining: "საფირმო სერვისი",
      multilingual: "მრავალენოვანი",
    },
  },
} as const;

const languageOptions: { code: Language; label: string }[] = [
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
  { code: "ka", label: "ქართული" },
];

const quickActionIcons = {
  reservation: CalendarDays,
  menu: ChefHat,
  vegan: Sparkles,
  hours: Clock3,
  events: Cake,
  delivery: Truck,
} as const;

function detectIntent(input: string): Intent {
  const text = input.toLowerCase();

  if (/book|reserve|reservation|table|брон|заброни|стол|ჯავშ|მაგიდ/.test(text)) {
    return "reservation";
  }
  if (/menu|меню|მენიუ/.test(text)) return "menu";
  if (/vegan|vegetarian|веган|вегетариан|ვეგან|ვეგეტარ/.test(text)) return "vegan";
  if (/hours|open|working|время|часы|საათ|მუშაობ/.test(text)) return "hours";
  if (/event|birthday|private|мероприят|событ|ივენთ|ღონისძიებ/.test(text)) return "events";
  if (/delivery|takeaway|pickup|самовывоз|доставк|მიტან|წაღებ/.test(text)) return "delivery";
  return "other";
}

function assistantReply(
  lang: Language,
  input: string
): { text: string; showReservationForm?: boolean } {
  const intent = detectIntent(input);
  const t = content[lang].replies;

  switch (intent) {
    case "reservation":
      return { text: t.askReservation, showReservationForm: true };
    case "menu":
      return { text: t.menu };
    case "vegan":
      return { text: t.vegan };
    case "hours":
      return { text: t.hours };
    case "events":
      return { text: t.events };
    case "delivery":
      return { text: t.delivery };
    default:
      return { text: t.fallback };
  }
}

export default function RestaurantCafeChatbotDemo() {
  const [language, setLanguage] = useState<Language>("en");
  const t = content[language];

  const initialMessages = useMemo<Message[]>(
    () => [
      {
        id: "welcome",
        role: "assistant",
        text: t.welcome,
      },
    ],
    [t.welcome]
  );

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [reservation, setReservation] = useState<ReservationForm>({
    date: "",
    time: "",
    guests: "",
    name: "",
    contact: "",
  });

  useEffect(() => {
    setMessages([
      {
        id: `welcome-${language}`,
        role: "assistant",
        text: t.welcome,
      },
    ]);
    setShowReservationForm(false);
    setReservation({
      date: "",
      time: "",
      guests: "",
      name: "",
      contact: "",
    });
    setInput("");
  }, [language, t.welcome]);

  const pushMessage = (role: "assistant" | "user", text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: `${role}-${Date.now()}-${Math.random()}`, role, text },
    ]);
  };

  const onSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    pushMessage("user", trimmed);
    setInput("");
    setLoading(true);

    try {
      const conversation = messages.map((m) => `${m.role}: ${m.text}`).join("\n") + `\nuser: ${trimmed}`;
      const res = await fetch(`${import.meta.env.VITE_API_URL}/interact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ demo_id: "cafe", user_input: conversation }),
      });
      const data = await res.json();
      pushMessage("assistant", data.response_content || "...");

      const intent = detectIntent(trimmed);
      if (intent === "reservation") setShowReservationForm(true);
    } catch (e) {
      pushMessage("assistant", "Sorry, I am having trouble connecting to the server.");
    } finally {
      setLoading(false);
    }
  };

  const onQuickAction = async (intent: Exclude<Intent, "other">) => {
    if (loading) return;
    const map = {
      reservation: t.quickActions.reservation,
      menu: t.quickActions.menu,
      vegan: t.quickActions.vegan,
      hours: t.quickActions.hours,
      events: t.quickActions.events,
      delivery: t.quickActions.delivery,
    };
    
    const text = map[intent];
    pushMessage("user", text);
    setLoading(true);

    try {
      const conversation = messages.map((m) => `${m.role}: ${m.text}`).join("\n") + `\nuser: ${text}`;
      const res = await fetch(`${import.meta.env.VITE_API_URL}/interact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ demo_id: "cafe", user_input: conversation }),
      });
      const data = await res.json();
      pushMessage("assistant", data.response_content || "...");
      if (intent === "reservation") setShowReservationForm(true);
    } catch (e) {
      pushMessage("assistant", "Sorry, I am having trouble connecting to the server.");
    } finally {
      setLoading(false);
    }
  };

  const submitReservation = () => {
    const summary = [
      t.replies.reservationSummaryTitle,
      `- ${t.labels.date}: ${reservation.date || "—"}`,
      `- ${t.labels.time}: ${reservation.time || "—"}`,
      `- ${t.labels.guests}: ${reservation.guests || "—"}`,
      `- ${t.labels.name}: ${reservation.name || "—"}`,
      `- ${t.labels.contact}: ${reservation.contact || "—"}`,
      "",
      t.replies.reservationSubmitted,
    ].join("\n");

    pushMessage("assistant", summary);
    setShowReservationForm(false);
    setReservation({
      date: "",
      time: "",
      guests: "",
      name: "",
      contact: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-6 md:p-10">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[320px_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Card className="overflow-hidden rounded-[28px] border border-white/60 bg-white/85 shadow-xl backdrop-blur">
            <CardHeader className="space-y-5 bg-gradient-to-br from-orange-100 via-amber-50 to-rose-100 p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="mb-3 flex flex-wrap gap-2">
                    <Badge className="border-0 bg-white/80 px-3 py-1 text-slate-700 shadow-sm">
                      {t.labels.signatureDining}
                    </Badge>
                    <Badge className="border-0 bg-white/80 px-3 py-1 text-slate-700 shadow-sm">
                      {t.labels.multilingual}
                    </Badge>
                  </div>
                  <CardTitle className="text-3xl font-semibold tracking-tight text-slate-900">
                    {t.brand}
                  </CardTitle>
                  <p className="mt-1 text-sm text-slate-600">{t.subtitle}</p>
                </div>
                <div className="rounded-[24px] bg-white/80 p-4 shadow-sm ring-1 ring-white/70">
                  <UtensilsCrossed className="h-6 w-6 text-slate-800" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-white/75 p-3 shadow-sm">
                  <ChefHat className="mb-2 h-4 w-4 text-slate-700" />
                  <div className="text-xs font-medium text-slate-800">{t.labels.chefPicks}</div>
                  <div className="text-xs text-slate-500">{t.labels.chefPicksSub}</div>
                </div>
                <div className="rounded-2xl bg-white/75 p-3 shadow-sm">
                  <Wine className="mb-2 h-4 w-4 text-slate-700" />
                  <div className="text-xs font-medium text-slate-800">{t.labels.drinks}</div>
                  <div className="text-xs text-slate-500">{t.labels.drinksSub}</div>
                </div>
                <div className="rounded-2xl bg-white/75 p-3 shadow-sm">
                  <Coffee className="mb-2 h-4 w-4 text-slate-700" />
                  <div className="text-xs font-medium text-slate-800">{t.labels.cafeStyle}</div>
                  <div className="text-xs text-slate-500">{t.labels.cafeStyleSub}</div>
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Globe className="h-4 w-4" />
                  {t.labels.language}
                </div>
                <div className="flex flex-wrap gap-2">
                  {languageOptions.map((option) => (
                    <Button
                      key={option.code}
                      variant={language === option.code ? "default" : "outline"}
                      className="rounded-2xl"
                      onClick={() => setLanguage(option.code)}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 p-6">
              <div className="rounded-[24px] bg-gradient-to-r from-slate-900 to-slate-800 p-5 text-white shadow-lg">
                <div className="mb-3 flex items-center gap-2 text-sm font-medium">
                  <Sparkles className="h-4 w-4" />
                  <span>{t.side.cuisine}</span>
                </div>
                <p className="text-sm text-slate-200">{t.side.cuisineValue}</p>
              </div>

              <div className="space-y-3 text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <Clock3 className="mt-0.5 h-4 w-4" />
                  <div>
                    <div className="font-medium">{t.side.hours}</div>
                    <div className="text-slate-500">{t.side.hoursValue}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4" />
                  <div>
                    <div className="font-medium">{t.side.address}</div>
                    <div className="text-slate-500">{t.side.addressValue}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4" />
                  <div>
                    <div className="font-medium">{t.side.phone}</div>
                    <div className="text-slate-500">{t.side.phoneValue}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
        >
          <Card className="flex h-[78vh] flex-col overflow-hidden rounded-[28px] border border-white/60 bg-white/85 shadow-xl backdrop-blur">
            <CardHeader className="border-b border-orange-100/80 bg-white/70 pb-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <div className="text-lg font-semibold text-slate-900">{t.labels.assistantTitle}</div>
                  <div className="text-sm text-slate-500">{t.labels.assistantSubtitle}</div>
                </div>
                <div className="rounded-2xl bg-orange-50 px-3 py-2 text-xs font-medium text-orange-700 ring-1 ring-orange-100">
                  {t.labels.demoBadge}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {(
                  ["reservation", "menu", "vegan", "hours", "events", "delivery"] as const
                ).map((item) => {
                  const Icon = quickActionIcons[item];
                  return (
                    <Button
                      key={item}
                      className="rounded-2xl border-orange-200 bg-white/80 text-slate-800 hover:bg-orange-50"
                      variant="outline"
                      onClick={() => onQuickAction(item)}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {t.quickActions[item]}
                    </Button>
                  );
                })}
              </div>
            </CardHeader>

            <CardContent className="flex min-h-0 flex-1 flex-col gap-4 p-4">
              <ScrollArea className="flex-1 rounded-[24px] bg-gradient-to-b from-amber-50 to-white p-4 ring-1 ring-orange-100/70">
                <div className="space-y-3 pr-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-3 text-sm shadow-sm ${
                          message.role === "user"
                            ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white"
                            : "bg-white text-slate-800 ring-1 ring-orange-100"
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                </div>
                {loading && (
                  <div className="flex justify-start mt-4">
                    <div className="rounded-2xl border border-orange-100 bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
                      {t.brand} is typing...
                    </div>
                  </div>
                )}
              </ScrollArea>

              {showReservationForm && (
                <div className="grid gap-3 rounded-[24px] border border-orange-100 bg-white/95 p-4 shadow-sm md:grid-cols-2">
                  <Input
                    type="date"
                    value={reservation.date}
                    onChange={(e) =>
                      setReservation((prev) => ({ ...prev, date: e.target.value }))
                    }
                  />
                  <Input
                    type="time"
                    value={reservation.time}
                    onChange={(e) =>
                      setReservation((prev) => ({ ...prev, time: e.target.value }))
                    }
                  />
                  <Input
                    placeholder={t.labels.guests}
                    value={reservation.guests}
                    onChange={(e) =>
                      setReservation((prev) => ({ ...prev, guests: e.target.value }))
                    }
                  />
                  <Input
                    placeholder={t.labels.name}
                    value={reservation.name}
                    onChange={(e) =>
                      setReservation((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                  <div className="md:col-span-2">
                    <Input
                      placeholder={t.labels.contact}
                      value={reservation.contact}
                      onChange={(e) =>
                        setReservation((prev) => ({ ...prev, contact: e.target.value }))
                      }
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Button className="w-full rounded-2xl" onClick={submitReservation}>
                      {t.labels.submit}
                    </Button>
                  </div>
                </div>
              )}

              <div className="rounded-[24px] border border-orange-100 bg-white/90 p-3 shadow-sm">
                <div className="mb-3 flex items-center gap-2 text-xs font-medium text-slate-500">
                  <UtensilsCrossed className="h-4 w-4" />
                  {t.labels.chatHint}
                </div>
                <div className="flex gap-3">
                  <Input
                    disabled={loading}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t.placeholder}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") onSend();
                    }}
                  />
                  <Button disabled={loading} className="rounded-2xl px-6" onClick={onSend}>
                    {t.send}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}