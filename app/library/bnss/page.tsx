"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ChevronRight, BookOpen, ArrowLeft, Scale } from "lucide-react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { translations } from "@/translations";

type S = { num:string; title:string; titleHi:string; summary:string; summaryHi:string; };
type C = { id:string; chapter:string; chapterHi:string; sections:S[] };

const CHAPTERS: C[] = [
  { id:"ch-1", chapter:"Chapter I — Preliminary", chapterHi:"अध्याय I — प्रारंभिक", sections:[
    { num:"1", title:"Short title, commencement and application", titleHi:"संक्षिप्त नाम, प्रारंभ और लागू होना", summary:"Called the Bharatiya Nagarik Suraksha Sanhita 2023. Came into force on July 1, 2024. Replaces the Code of Criminal Procedure (CrPC) 1973.", summaryHi:"भारतीय नागरिक सुरक्षा संहिता 2023 — 1 जुलाई 2024 से लागू। दंड प्रक्रिया संहिता (CrPC) 1973 का स्थान लेती है।" },
    { num:"2", title:"Definitions", titleHi:"परिभाषाएं", summary:"Key definitions: 'audio-video electronic means' includes video conferencing; 'bail' includes personal bond; 'cognizable offence' = police can arrest without warrant; 'non-cognizable offence' = police cannot arrest without warrant; 'complaint' = allegation made to magistrate.", summaryHi:"प्रमुख परिभाषाएं: 'ऑडियो-वीडियो इलेक्ट्रॉनिक माध्यम' में वीडियो कॉन्फ्रेंसिंग शामिल; 'संज्ञेय अपराध' = पुलिस बिना वारंट गिरफ्तार कर सकती है; 'असंज्ञेय अपराध' = पुलिस बिना वारंट गिरफ्तार नहीं कर सकती।" },
  ]},
  { id:"ch-2", chapter:"Chapter II — Constitution of Criminal Courts", chapterHi:"अध्याय II — आपराधिक न्यायालयों का गठन", sections:[
    { num:"6", title:"Classes of Criminal Courts", titleHi:"आपराधिक न्यायालयों के वर्ग", summary:"Criminal courts in India: (1) High Courts; (2) Sessions Courts; (3) Judicial Magistrate First Class; (4) Judicial Magistrate Second Class; (5) Executive Magistrates. Each has defined jurisdiction and sentencing powers.", summaryHi:"भारत में आपराधिक न्यायालय: (1) उच्च न्यायालय; (2) सत्र न्यायालय; (3) प्रथम श्रेणी न्यायिक मजिस्ट्रेट; (4) द्वितीय श्रेणी न्यायिक मजिस्ट्रेट; (5) कार्यकारी मजिस्ट्रेट।" },
  ]},
  { id:"ch-3", chapter:"Chapter III — Power of Courts", chapterHi:"अध्याय III — न्यायालयों की शक्तियां", sections:[
    { num:"26", title:"Sentences which High Courts and Sessions Judges may pass", titleHi:"उच्च न्यायालय और सत्र न्यायाधीश द्वारा दिए जा सकने वाले दंड", summary:"High Court may pass any sentence authorised by law. Sessions Judge may pass any sentence authorised by law except death sentence without confirmation by High Court.", summaryHi:"उच्च न्यायालय कानून द्वारा अधिकृत कोई भी दंड दे सकता है। सत्र न्यायाधीश उच्च न्यायालय की पुष्टि के बिना मृत्युदंड नहीं दे सकता।" },
    { num:"29", title:"Sentences which Magistrates may pass", titleHi:"मजिस्ट्रेट द्वारा दिए जा सकने वाले दंड", summary:"Chief Judicial Magistrate: up to 7 years imprisonment. First Class Magistrate: up to 3 years imprisonment or fine up to Rs 10,000. Second Class Magistrate: up to 1 year imprisonment or fine up to Rs 5,000.", summaryHi:"मुख्य न्यायिक मजिस्ट्रेट: 7 वर्ष तक कारावास। प्रथम श्रेणी मजिस्ट्रेट: 3 वर्ष तक या 10,000 रुपये जुर्माना। द्वितीय श्रेणी मजिस्ट्रेट: 1 वर्ष तक या 5,000 रुपये जुर्माना।" },
  ]},
  { id:"ch-4", chapter:"Chapter IV — Arrest of Persons", chapterHi:"अध्याय IV — व्यक्तियों की गिरफ्तारी", sections:[
    { num:"35", title:"When police may arrest without warrant", titleHi:"पुलिस कब बिना वारंट गिरफ्तार कर सकती है", summary:"Police officer may arrest without warrant any person who: commits cognizable offence in presence; is accused of cognizable offence punishable with 3+ years; is a proclaimed offender; possesses stolen property; obstructs police officer in execution of duty.", summaryHi:"पुलिस अधिकारी बिना वारंट गिरफ्तार कर सकता है: संज्ञेय अपराध करने पर; 3+ वर्ष के संज्ञेय अपराध का आरोपी; घोषित अपराधी; चोरी की संपत्ति रखने पर; पुलिस अधिकारी को बाधा डालने पर।" },
    { num:"37", title:"Arrest — how made", titleHi:"गिरफ्तारी — कैसे की जाए", summary:"In making an arrest the police officer shall actually touch or confine the body of the person to be arrested unless there is a submission to custody by word or action. No handcuffing unless ordered by magistrate or in exceptional circumstances.", summaryHi:"गिरफ्तारी में पुलिस अधिकारी गिरफ्तार किए जाने वाले व्यक्ति के शरीर को वास्तव में स्पर्श या परिरुद्ध करेगा। मजिस्ट्रेट के आदेश के बिना हथकड़ी नहीं।" },
    { num:"47", title:"Rights of arrested person", titleHi:"गिरफ्तार व्यक्ति के अधिकार", summary:"Every arrested person has the right to: (1) be informed of grounds of arrest; (2) meet an advocate of his choice; (3) inform a friend or relative of arrest; (4) medical examination. Police must inform nearest relative within 24 hours.", summaryHi:"प्रत्येक गिरफ्तार व्यक्ति का अधिकार: (1) गिरफ्तारी के कारण जानना; (2) अपनी पसंद के वकील से मिलना; (3) मित्र या रिश्तेदार को सूचित करना; (4) चिकित्सा परीक्षण। पुलिस को 24 घंटे के भीतर निकटतम रिश्तेदार को सूचित करना होगा।" },
    { num:"48", title:"Medical examination of arrested person", titleHi:"गिरफ्तार व्यक्ति की चिकित्सा जांच", summary:"When any person is arrested, he shall be examined by a medical officer in the service of Central or State Government. The medical officer shall prepare a record of injuries found on the arrested person.", summaryHi:"गिरफ्तार व्यक्ति की सरकारी चिकित्सा अधिकारी द्वारा जांच की जाएगी। चिकित्सा अधिकारी गिरफ्तार व्यक्ति पर पाई गई चोटों का रिकॉर्ड तैयार करेगा।" },
  ]},
  { id:"ch-5", chapter:"Chapter V — Zero FIR (NEW)", chapterHi:"अध्याय V — जीरो एफआईआर (नया)", sections:[
    { num:"173", title:"Information in cognizable cases — Zero FIR", titleHi:"संज्ञेय मामलों में सूचना — जीरो एफआईआर", summary:"NEW in BNSS. Every information relating to the commission of a cognizable offence shall be recorded at any police station regardless of jurisdiction. The FIR shall be transferred to the appropriate police station within 15 days. This is called Zero FIR.", summaryHi:"BNSS में नया। संज्ञेय अपराध की सूचना किसी भी पुलिस स्टेशन में दर्ज की जा सकती है, चाहे क्षेत्राधिकार कुछ भी हो। FIR को 15 दिनों के भीतर उपयुक्त पुलिस स्टेशन को हस्तांतरित किया जाएगा। इसे जीरो FIR कहते हैं।" },
    { num:"174", title:"Police officer's power to investigate", titleHi:"पुलिस अधिकारी की जांच की शक्ति", summary:"Any police officer may, without the order of a Magistrate, investigate any cognizable case. Investigation must be completed within 60 days (extendable to 90 days by court). Chargesheet must be filed within this period.", summaryHi:"कोई भी पुलिस अधिकारी मजिस्ट्रेट के आदेश के बिना किसी भी संज्ञेय मामले की जांच कर सकता है। जांच 60 दिनों में पूरी होनी चाहिए (न्यायालय द्वारा 90 दिनों तक बढ़ाई जा सकती है)।" },
    { num:"176", title:"Mandatory audio-video recording of search and seizure", titleHi:"तलाशी और जब्ती की अनिवार्य ऑडियो-वीडियो रिकॉर्डिंग", summary:"NEW in BNSS. All search and seizure operations must be audio-video recorded. This ensures transparency and prevents tampering with evidence. The recording must be forwarded to the Magistrate.", summaryHi:"BNSS में नया। सभी तलाशी और जब्ती कार्यों की ऑडियो-वीडियो रिकॉर्डिंग अनिवार्य है। यह पारदर्शिता सुनिश्चित करता है और सबूतों के साथ छेड़छाड़ को रोकता है।" },
  ]},
  { id:"ch-6", chapter:"Chapter VI — Bail and Bonds", chapterHi:"अध्याय VI — जमानत और बंधपत्र", sections:[
    { num:"478", title:"Bail in bailable offences", titleHi:"जमानती अपराधों में जमानत", summary:"When any person other than a person accused of a non-bailable offence is arrested or detained without warrant, such person is entitled to be released on bail. The police officer or court shall release him on bail.", summaryHi:"जब कोई व्यक्ति जो गैर-जमानती अपराध का आरोपी नहीं है, बिना वारंट गिरफ्तार या हिरासत में लिया जाए, तो वह जमानत पर रिहाई का हकदार है।" },
    { num:"479", title:"Bail in non-bailable offences", titleHi:"गैर-जमानती अपराधों में जमानत", summary:"When any person accused of any non-bailable offence is arrested or detained without warrant, he may be released on bail by the High Court or Sessions Court. Bail may be refused if there are reasonable grounds to believe the accused is guilty of an offence punishable with death or life imprisonment.", summaryHi:"गैर-जमानती अपराध के आरोपी को उच्च न्यायालय या सत्र न्यायालय जमानत दे सकता है। मृत्युदंड या आजीवन कारावास वाले अपराध में जमानत अस्वीकार की जा सकती है।" },
    { num:"480", title:"Bail to person accused of non-bailable offence — first time offender", titleHi:"पहली बार अपराधी को जमानत", summary:"NEW in BNSS. A person who has not previously been convicted of an offence punishable with death, life imprisonment or imprisonment of 7 years or more shall be released on bail after serving half the maximum period of imprisonment.", summaryHi:"BNSS में नया। जिस व्यक्ति को पहले मृत्युदंड, आजीवन कारावास या 7 वर्ष या अधिक के कारावास की सजा नहीं हुई है, उसे अधिकतम कारावास की आधी अवधि पूरी करने के बाद जमानत पर रिहा किया जाएगा।" },
  ]},
  { id:"ch-7", chapter:"Chapter VII — Trial in Absentia (NEW)", chapterHi:"अध्याय VII — अनुपस्थिति में सुनवाई (नया)", sections:[
    { num:"356", title:"Trial of proclaimed offender in absentia", titleHi:"घोषित अपराधी की अनुपस्थिति में सुनवाई", summary:"NEW in BNSS. Where a person declared as a proclaimed offender has absconded, the court may proceed with the trial in his absence. The court shall appoint an advocate to defend the accused. Judgment may be pronounced in absentia.", summaryHi:"BNSS में नया। जहां घोषित अपराधी फरार हो गया हो, न्यायालय उसकी अनुपस्थिति में सुनवाई कर सकता है। न्यायालय आरोपी का बचाव करने के लिए एक वकील नियुक्त करेगा। अनुपस्थिति में निर्णय सुनाया जा सकता है।" },
  ]},
  { id:"ch-8", chapter:"Chapter VIII — Victim Rights (NEW)", chapterHi:"अध्याय VIII — पीड़ित के अधिकार (नया)", sections:[
    { num:"397", title:"Victim's right to information", titleHi:"पीड़ित का सूचना का अधिकार", summary:"NEW in BNSS. Every victim has the right to: (1) receive a free copy of the FIR; (2) receive a free copy of the chargesheet; (3) receive a free copy of the judgment; (4) be informed of the progress of the case at every stage.", summaryHi:"BNSS में नया। प्रत्येक पीड़ित का अधिकार: (1) FIR की मुफ्त प्रति; (2) आरोप पत्र की मुफ्त प्रति; (3) निर्णय की मुफ्त प्रति; (4) हर चरण में मामले की प्रगति की जानकारी।" },
    { num:"398", title:"Victim compensation", titleHi:"पीड़ित मुआवजा", summary:"The State Government shall prepare a scheme for providing funds for the purpose of compensation to the victims or their dependants who have suffered loss or injury as a result of the crime.", summaryHi:"राज्य सरकार अपराध के परिणामस्वरूप नुकसान या चोट उठाने वाले पीड़ितों या उनके आश्रितों को मुआवजा प्रदान करने के लिए एक योजना तैयार करेगी।" },
  ]},
  { id:"ch-9", chapter:"Chapter IX — Electronic Proceedings (NEW)", chapterHi:"अध्याय IX — इलेक्ट्रॉनिक कार्यवाही (नया)", sections:[
    { num:"530", title:"Trial and proceedings through electronic mode", titleHi:"इलेक्ट्रॉनिक माध्यम से सुनवाई और कार्यवाही", summary:"NEW in BNSS. All trials, inquiries and proceedings may be held through electronic mode including video conferencing. Summons, warrants, and other documents may be served electronically. This reduces the need for physical presence in courts.", summaryHi:"BNSS में नया। सभी सुनवाई, जांच और कार्यवाही वीडियो कॉन्फ्रेंसिंग सहित इलेक्ट्रॉनिक माध्यम से हो सकती है। समन, वारंट और अन्य दस्तावेज इलेक्ट्रॉनिक रूप से भेजे जा सकते हैं।" },
    { num:"531", title:"Saving of inherent powers of High Court", titleHi:"उच्च न्यायालय की अंतर्निहित शक्तियों की बचत", summary:"Nothing in this Sanhita shall be deemed to limit or affect the inherent powers of the High Court to make such orders as may be necessary to give effect to any order under this Code, or to prevent abuse of the process of any Court or otherwise to secure the ends of justice.", summaryHi:"इस संहिता में कुछ भी उच्च न्यायालय की अंतर्निहित शक्तियों को सीमित या प्रभावित नहीं करेगा।" },
  ]},
  { id:"ch-10", chapter:"Chapter X — Key Timelines", chapterHi:"अध्याय X — प्रमुख समय-सीमाएं", sections:[
    { num:"T-1", title:"Chargesheet filing deadline", titleHi:"आरोप पत्र दाखिल करने की समय सीमा", summary:"Police must file chargesheet within 60 days of arrest. Court may extend to 90 days on application. If chargesheet not filed within time, accused is entitled to bail as a matter of right.", summaryHi:"पुलिस को गिरफ्तारी के 60 दिनों के भीतर आरोप पत्र दाखिल करना होगा। न्यायालय आवेदन पर 90 दिनों तक बढ़ा सकता है। समय पर आरोप पत्र न दाखिल होने पर आरोपी को जमानत का अधिकार।" },
    { num:"T-2", title:"Zero FIR transfer timeline", titleHi:"जीरो FIR हस्तांतरण समय सीमा", summary:"A Zero FIR filed at any police station must be transferred to the appropriate police station within 15 days. The receiving station must acknowledge receipt and begin investigation.", summaryHi:"किसी भी पुलिस स्टेशन में दर्ज जीरो FIR को 15 दिनों के भीतर उपयुक्त पुलिस स्टेशन को हस्तांतरित किया जाना चाहिए।" },
    { num:"T-3", title:"Judgment delivery timeline", titleHi:"निर्णय देने की समय सीमा", summary:"After conclusion of arguments, judgment must be delivered within 45 days. In exceptional cases, it may be extended to 90 days with reasons recorded in writing.", summaryHi:"तर्क समाप्त होने के बाद 45 दिनों के भीतर निर्णय दिया जाना चाहिए। असाधारण मामलों में लिखित कारणों के साथ 90 दिनों तक बढ़ाया जा सकता है।" },
    { num:"T-4", title:"Forensic investigation timeline", titleHi:"फोरेंसिक जांच समय सीमा", summary:"NEW in BNSS. For offences punishable with 7 or more years, forensic experts must visit the crime scene and collect evidence. Forensic report must be submitted within 90 days.", summaryHi:"BNSS में नया। 7 या अधिक वर्ष की सजा वाले अपराधों के लिए फोरेंसिक विशेषज्ञों को अपराध स्थल पर जाना और सबूत एकत्र करना होगा। फोरेंसिक रिपोर्ट 90 दिनों के भीतर जमा करनी होगी।" },
  ]},
];

export default function BNSSPage() {
  const { language } = useLanguageStore();
  const t = translations[language].library;
  const [search, setSearch] = useState("");
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);

  const filtered = useMemo(() => CHAPTERS.map((c) => ({
    ...c,
    sections: c.sections.filter((s) =>
      !search ||
      s.num.includes(search) ||
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.titleHi.includes(search) ||
      s.summary.toLowerCase().includes(search.toLowerCase()) ||
      s.summaryHi.includes(search)
    ),
  })).filter((c) => c.sections.length > 0), [search]);

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px 80px" }}>

      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "28px", fontSize: "0.85rem" }}>
        <Link href="/library" style={{ display: "flex", alignItems: "center", gap: "4px", color: "#7ea8c9", textDecoration: "none" }}>
          <ArrowLeft size={14} /> {t.title}
        </Link>
        <ChevronRight size={14} color="#4a6a8a" />
        <span style={{ color: "#0066ff" }}>{language === "hi" ? "भारतीय नागरिक सुरक्षा संहिता (BNSS)" : "BNSS 2023"}</span>
      </div>

      {/* Header */}
      <div style={{ background: "rgba(10,22,40,0.85)", backdropFilter: "blur(16px)", border: "1px solid rgba(0,102,255,0.25)", borderRadius: "20px", padding: "28px", marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
          <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: "rgba(0,102,255,0.12)", border: "1px solid rgba(0,102,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Scale size={26} color="#0066ff" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", marginBottom: "8px" }}>
              <h1 style={{ fontSize: "1.5rem", fontWeight: 900, color: "#e8f4fd" }}>
                {language === "hi" ? "भारतीय नागरिक सुरक्षा संहिता" : "Bharatiya Nagarik Suraksha Sanhita"}
              </h1>
              <span style={{ fontSize: "0.7rem", fontWeight: 700, padding: "4px 12px", borderRadius: "50px", background: "rgba(0,102,255,0.12)", color: "#0066ff", border: "1px solid rgba(0,102,255,0.3)" }}>BNSS 2023</span>
            </div>
            <p style={{ fontSize: "0.82rem", color: "#0066ff", marginBottom: "10px", fontWeight: 600 }}>
              {language === "hi" ? "CrPC 1973 का स्थान · 531 धाराएं · 1 जुलाई 2024 से लागू" : "Replaces CrPC 1973 · 531 Sections · Effective July 1, 2024"}
            </p>
            <p style={{ fontSize: "0.9rem", color: "#7ea8c9", lineHeight: 1.7 }}>
              {language === "hi"
                ? "भारतीय नागरिक सुरक्षा संहिता 2023 भारत की नई आपराधिक प्रक्रिया संहिता है। प्रमुख नई विशेषताएं: जीरो FIR (किसी भी थाने में), अनुपस्थिति में सुनवाई, अनिवार्य ऑडियो-वीडियो रिकॉर्डिंग, 60-दिवसीय आरोप पत्र समय सीमा, पीड़ित के अधिकार और इलेक्ट्रॉनिक कार्यवाही।"
                : "India's new criminal procedure code effective July 1, 2024. Key new features: Zero FIR at any police station, trial in absentia for proclaimed offenders, mandatory audio-video recording of searches, 60-day chargesheet deadline, enhanced victim rights, and electronic proceedings."}
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 20px", background: "rgba(10,22,40,0.9)", border: "1px solid rgba(0,212,255,0.2)", borderRadius: "50px", marginBottom: "8px" }}>
        <Search size={17} color="#00d4ff" style={{ flexShrink: 0 }} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={language === "hi" ? "धारा संख्या या कीवर्ड खोजें... जैसे bail, FIR, जमानत" : "Search section or keyword... e.g. bail, FIR, Zero FIR, arrest"}
          style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: "0.9rem", color: "#e8f4fd" }}
        />
        {search && (
          <button onClick={() => setSearch("")} style={{ background: "none", border: "none", color: "#4a6a8a", cursor: "pointer", fontSize: "1rem" }}>✕</button>
        )}
      </div>
      <p style={{ fontSize: "0.78rem", color: "#4a6a8a", marginBottom: "20px", paddingLeft: "8px" }}>
        {filtered.reduce((a, c) => a + c.sections.length, 0)} {language === "hi" ? "धाराएं मिलीं" : "sections found"} · {CHAPTERS.length} {language === "hi" ? "अध्याय" : "chapters"}
      </p>

      {/* Chapters Accordion */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {filtered.map((chapter) => {
          const isOpen = expandedChapter === chapter.id;
          return (
            <div key={chapter.id} style={{ background: "rgba(10,22,40,0.85)", backdropFilter: "blur(16px)", border: `1px solid ${isOpen ? "rgba(0,102,255,0.35)" : "rgba(0,212,255,0.1)"}`, borderRadius: "16px", overflow: "hidden", transition: "border-color 0.2s" }}>
              <button
                onClick={() => setExpandedChapter(isOpen ? null : chapter.id)}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px", background: isOpen ? "rgba(0,102,255,0.06)" : "transparent", border: "none", cursor: "pointer", textAlign: "left" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <BookOpen size={16} color="#0066ff" style={{ flexShrink: 0 }} />
                  <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "#e8f4fd" }}>
                    {language === "hi" ? chapter.chapterHi : chapter.chapter}
                  </span>
                  <span style={{ fontSize: "0.7rem", padding: "2px 8px", borderRadius: "50px", background: "rgba(0,102,255,0.12)", color: "#0066ff", border: "1px solid rgba(0,102,255,0.25)", flexShrink: 0 }}>
                    
                    {chapter.sections.length} {language === "hi" ? "धाराएं" : "sections"}
                  </span>
                </div>
                <ChevronRight size={16} color="#0066ff" style={{ transform: isOpen ? "rotate(90deg)" : "none", transition: "transform 0.2s ease", flexShrink: 0 }} />
              </button>

              {isOpen && (
                <div style={{ borderTop: "1px solid rgba(0,102,255,0.15)" }}>
                  {chapter.sections.map((s, i) => (
                    <div key={s.num} style={{ display: "flex", alignItems: "flex-start", gap: "16px", padding: "18px 22px", borderBottom: i < chapter.sections.length - 1 ? "1px solid rgba(0,212,255,0.06)" : "none" }}>
                      <span style={{ fontSize: "0.72rem", fontWeight: 800, padding: "4px 10px", borderRadius: "8px", background: "rgba(0,102,255,0.12)", color: "#0066ff", border: "1px solid rgba(0,102,255,0.25)", flexShrink: 0, marginTop: "2px", whiteSpace: "nowrap" }}>
                        {language === "hi" ? "धारा" : "§"} {s.num}
                      </span>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontWeight: 700, fontSize: "0.9rem", color: "#e8f4fd", marginBottom: "6px" }}>
                          {language === "hi" ? s.titleHi : s.title}
                        </h3>
                        <p style={{ fontSize: "0.82rem", color: "#7ea8c9", lineHeight: 1.7 }}>
                          {language === "hi" ? s.summaryHi : s.summary}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
