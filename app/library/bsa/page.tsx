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
    { num:"1", title:"Short title, commencement and application", titleHi:"संक्षिप्त नाम, प्रारंभ और लागू होना", summary:"Called the Bharatiya Sakshya Adhiniyam 2023. Came into force on July 1, 2024. Replaces the Indian Evidence Act 1872.", summaryHi:"भारतीय साक्ष्य अधिनियम 2023 — 1 जुलाई 2024 से लागू। भारतीय साक्ष्य अधिनियम 1872 का स्थान लेता है।" },
    { num:"2", title:"Definitions", titleHi:"परिभाषाएं", summary:"Key definitions: 'document' includes electronic records; 'evidence' includes oral and documentary evidence; 'electronic record' means data recorded or stored in any medium by a computer system; 'fact' includes any state of things or relation of things capable of being perceived by the senses.", summaryHi:"प्रमुख परिभाषाएं: 'दस्तावेज़' में इलेक्ट्रॉनिक रिकॉर्ड शामिल; 'साक्ष्य' में मौखिक और दस्तावेजी साक्ष्य शामिल; 'इलेक्ट्रॉनिक रिकॉर्ड' = कंप्यूटर सिस्टम द्वारा किसी भी माध्यम में रिकॉर्ड या संग्रहीत डेटा।" },
  ]},
  { id:"ch-2", chapter:"Chapter II — Relevancy of Facts", chapterHi:"अध्याय II — तथ्यों की प्रासंगिकता", sections:[
    { num:"3", title:"Facts in issue", titleHi:"विवादग्रस्त तथ्य", summary:"Facts in issue means any fact from which, either by itself or in connection with other facts, the existence, non-existence, nature, or extent of any right, liability, or disability asserted or denied in any suit or proceeding necessarily follows.", summaryHi:"विवादग्रस्त तथ्य वह तथ्य है जिससे किसी मुकदमे या कार्यवाही में दावा किए गए या अस्वीकार किए गए किसी अधिकार, दायित्व या विकलांगता का अस्तित्व, अनुपस्थिति, प्रकृति या सीमा आवश्यक रूप से अनुसरण करती है।" },
    { num:"4", title:"Relevant facts", titleHi:"प्रासंगिक तथ्य", summary:"One fact is said to be relevant to another when the one is connected with the other in any of the ways referred to in the provisions of this Adhiniyam relating to the relevancy of facts.", summaryHi:"एक तथ्य दूसरे के लिए प्रासंगिक कहा जाता है जब एक इस अधिनियम के प्रावधानों में उल्लिखित किसी भी तरीके से दूसरे से जुड़ा हो।" },
    { num:"5", title:"Evidence may be given of facts in issue and relevant facts", titleHi:"विवादग्रस्त और प्रासंगिक तथ्यों का साक्ष्य", summary:"Evidence may be given in any suit or proceeding of the existence or non-existence of every fact in issue and of such other facts as are declared to be relevant, and of no others.", summaryHi:"किसी भी मुकदमे या कार्यवाही में प्रत्येक विवादग्रस्त तथ्य और प्रासंगिक घोषित अन्य तथ्यों के अस्तित्व या अनुपस्थिति का साक्ष्य दिया जा सकता है।" },
    { num:"6", title:"Relevancy of facts forming part of same transaction", titleHi:"एक ही लेनदेन का हिस्सा बनने वाले तथ्यों की प्रासंगिकता", summary:"Facts which, though not in issue, are so connected with a fact in issue as to form part of the same transaction, are relevant, whether they occurred at the same time and place or at different times and places.", summaryHi:"तथ्य जो विवादग्रस्त नहीं हैं लेकिन एक ही लेनदेन का हिस्सा बनने के लिए विवादग्रस्त तथ्य से इतने जुड़े हैं — प्रासंगिक हैं।" },
    { num:"8", title:"Motive, preparation and previous or subsequent conduct", titleHi:"उद्देश्य, तैयारी और पूर्व या बाद का आचरण", summary:"Any fact is relevant which shows or constitutes a motive or preparation for any fact in issue or relevant fact. The conduct of any party, or of any agent to any party, to any suit or proceeding, in reference to such suit or proceeding, or in reference to any fact in issue therein or relevant thereto, is relevant.", summaryHi:"कोई भी तथ्य प्रासंगिक है जो किसी विवादग्रस्त या प्रासंगिक तथ्य के लिए उद्देश्य या तैयारी दिखाता है। किसी पक्ष का आचरण प्रासंगिक है।" },
  ]},
  { id:"ch-3", chapter:"Chapter III — Admissions", chapterHi:"अध्याय III — स्वीकृतियां", sections:[
    { num:"17", title:"Admission defined", titleHi:"स्वीकृति की परिभाषा", summary:"An admission is a statement, oral or documentary or contained in electronic form, which suggests any inference as to any fact in issue or relevant fact, and which is made by any of the persons and under the circumstances hereinafter mentioned.", summaryHi:"स्वीकृति एक मौखिक, दस्तावेजी या इलेक्ट्रॉनिक रूप में कथन है जो किसी विवादग्रस्त या प्रासंगिक तथ्य के बारे में कोई निष्कर्ष सुझाता है।" },
    { num:"22", title:"When oral admissions as to contents of documents are relevant", titleHi:"दस्तावेजों की सामग्री के बारे में मौखिक स्वीकृतियां कब प्रासंगिक हैं", summary:"Oral admissions as to the contents of a document are not relevant unless and until the party proposing to prove them shows that he is entitled to give secondary evidence of the contents of such document.", summaryHi:"दस्तावेजों की सामग्री के बारे में मौखिक स्वीकृतियां तब तक प्रासंगिक नहीं हैं जब तक कि पक्ष द्वितीयक साक्ष्य देने का हकदार न हो।" },
  ]},
  { id:"ch-4", chapter:"Chapter IV — Electronic Evidence (NEW)", chapterHi:"अध्याय IV — इलेक्ट्रॉनिक साक्ष्य (नया)", sections:[
    { num:"57", title:"Admissibility of electronic records", titleHi:"इलेक्ट्रॉनिक रिकॉर्ड की स्वीकार्यता", summary:"Any information contained in an electronic record which is printed on a paper, stored, recorded or copied in optical or magnetic media produced by a computer shall be deemed to be also a document and shall be admissible in any proceedings without further proof.", summaryHi:"कंप्यूटर द्वारा उत्पादित इलेक्ट्रॉनिक रिकॉर्ड में निहित कोई भी जानकारी दस्तावेज़ मानी जाएगी और बिना किसी अतिरिक्त प्रमाण के किसी भी कार्यवाही में स्वीकार्य होगी।" },
    { num:"58", title:"Proof of electronic records — Certificate requirement removed", titleHi:"इलेक्ट्रॉनिक रिकॉर्ड का प्रमाण — प्रमाण पत्र की आवश्यकता हटाई गई", summary:"KEY CHANGE in BSA. The old requirement of a certificate under Section 65B of Indian Evidence Act for electronic records has been REMOVED. Electronic records are now admissible without a certificate in most cases. This makes it easier to present digital evidence in court.", summaryHi:"BSA में प्रमुख बदलाव। पुराने भारतीय साक्ष्य अधिनियम की धारा 65B के तहत इलेक्ट्रॉनिक रिकॉर्ड के लिए प्रमाण पत्र की आवश्यकता हटा दी गई है। अब अधिकांश मामलों में बिना प्रमाण पत्र के डिजिटल साक्ष्य स्वीकार्य है।" },
    { num:"59", title:"Digital documents as evidence", titleHi:"डिजिटल दस्तावेज़ साक्ष्य के रूप में", summary:"Emails, WhatsApp messages, SMS, social media posts, screenshots, CCTV footage, call recordings, and other digital communications are recognized as documentary evidence. They can be produced in court as primary evidence.", summaryHi:"ईमेल, व्हाट्सएप संदेश, SMS, सोशल मीडिया पोस्ट, स्क्रीनशॉट, CCTV फुटेज, कॉल रिकॉर्डिंग और अन्य डिजिटल संचार दस्तावेजी साक्ष्य के रूप में मान्यता प्राप्त हैं।" },
  ]},
  { id:"ch-5", chapter:"Chapter V — Oral Evidence via Video", chapterHi:"अध्याय V — वीडियो के माध्यम से मौखिक साक्ष्य", sections:[
    { num:"60", title:"Oral evidence — electronic means", titleHi:"मौखिक साक्ष्य — इलेक्ट्रॉनिक माध्यम", summary:"NEW in BSA. Oral evidence may now be given through electronic means including video conferencing. A witness does not need to be physically present in court. This is especially useful for witnesses who are abroad, elderly, or disabled.", summaryHi:"BSA में नया। मौखिक साक्ष्य अब वीडियो कॉन्फ्रेंसिंग सहित इलेक्ट्रॉनिक माध्यमों से दिया जा सकता है। गवाह को अदालत में शारीरिक रूप से उपस्थित होने की आवश्यकता नहीं है।" },
  ]},
  { id:"ch-6", chapter:"Chapter VI — Documentary Evidence", chapterHi:"अध्याय VI — दस्तावेजी साक्ष्य", sections:[
    { num:"61", title:"Proof of contents of documents", titleHi:"दस्तावेजों की सामग्री का प्रमाण", summary:"The contents of documents may be proved either by primary or by secondary evidence.", summaryHi:"दस्तावेजों की सामग्री प्राथमिक या द्वितीयक साक्ष्य द्वारा सिद्ध की जा सकती है।" },
    { num:"62", title:"Primary evidence", titleHi:"प्राथमिक साक्ष्य", summary:"Primary evidence means the document itself produced for the inspection of the Court. Where a document is executed in several parts, each part is primary evidence of the document. Electronic records stored in multiple storage devices — each is primary evidence.", summaryHi:"प्राथमिक साक्ष्य का अर्थ है न्यायालय के निरीक्षण के लिए प्रस्तुत दस्तावेज़ स्वयं। कई भागों में निष्पादित दस्तावेज़ में प्रत्येक भाग प्राथमिक साक्ष्य है।" },
    { num:"63", title:"Secondary evidence", titleHi:"द्वितीयक साक्ष्य", summary:"Secondary evidence includes: certified copies; copies made by mechanical processes; copies made from or compared with the original; counterparts of documents; oral accounts of the contents of a document given by some person who has himself seen it. Electronic copies and printouts are now included.", summaryHi:"द्वितीयक साक्ष्य में शामिल हैं: प्रमाणित प्रतियां; यांत्रिक प्रक्रियाओं द्वारा बनाई गई प्रतियां; मूल से बनाई गई प्रतियां; इलेक्ट्रॉनिक प्रतियां और प्रिंटआउट।" },
  ]},
  { id:"ch-7", chapter:"Chapter VII — Burden of Proof", chapterHi:"अध्याय VII — सबूत का भार", sections:[
    { num:"101", title:"Burden of proof", titleHi:"सबूत का भार", summary:"Whoever desires any Court to give judgment as to any legal right or liability dependent on the existence of facts which he asserts, must prove that those facts exist. The burden of proof lies on the person who asserts the fact.", summaryHi:"जो कोई भी न्यायालय से किसी कानूनी अधिकार या दायित्व के बारे में निर्णय चाहता है, उसे उन तथ्यों को सिद्ध करना होगा। सबूत का भार उस व्यक्ति पर है जो तथ्य का दावा करता है।" },
    { num:"103", title:"Burden of proof as to particular fact", titleHi:"विशेष तथ्य के बारे में सबूत का भार", summary:"The burden of proof as to any particular fact lies on that person who wishes the Court to believe in its existence, unless it is provided by any law that the proof of that fact shall lie on any particular person.", summaryHi:"किसी विशेष तथ्य के बारे में सबूत का भार उस व्यक्ति पर है जो न्यायालय को उसके अस्तित्व में विश्वास दिलाना चाहता है।" },
    { num:"105", title:"Burden of proving that case of accused comes within exceptions", titleHi:"आरोपी का मामला अपवादों के अंतर्गत आता है — सबूत का भार", summary:"When a person is accused of any offence, the burden of proving the existence of circumstances bringing the case within any of the General Exceptions in the BNS, or within any special exception or proviso contained in any other part of the same Code, is upon him.", summaryHi:"जब किसी व्यक्ति पर किसी अपराध का आरोप लगाया जाता है, तो BNS के सामान्य अपवादों के अंतर्गत मामले को लाने वाली परिस्थितियों को सिद्ध करने का भार उस पर है।" },
  ]},
  { id:"ch-8", chapter:"Chapter VIII — Estoppel", chapterHi:"अध्याय VIII — विबंध", sections:[
    { num:"115", title:"Estoppel", titleHi:"विबंध", summary:"When one person has, by his declaration, act, or omission, intentionally caused or permitted another person to believe a thing to be true and to act upon such belief, neither he nor his representative shall be allowed, in any suit or proceeding between himself and such person or his representative, to deny the truth of that thing.", summaryHi:"जब एक व्यक्ति ने अपनी घोषणा, कार्य या चूक से जानबूझकर दूसरे व्यक्ति को किसी बात को सच मानने और उस पर कार्य करने के लिए प्रेरित किया हो, तो वह उस बात की सत्यता से इनकार नहीं कर सकता।" },
  ]},
  { id:"ch-9", chapter:"Chapter IX — Witnesses", chapterHi:"अध्याय IX — गवाह", sections:[
    { num:"118", title:"Who may testify", titleHi:"कौन गवाही दे सकता है", summary:"All persons shall be competent to testify unless the Court considers that they are prevented from understanding the questions put to them, or from giving rational answers to those questions, by tender years, extreme old age, disease, whether of body or mind, or any other cause of the same kind.", summaryHi:"सभी व्यक्ति गवाही देने के लिए सक्षम हैं जब तक कि न्यायालय यह न समझे कि वे अत्यंत कम आयु, अत्यधिक वृद्धावस्था, बीमारी या किसी अन्य कारण से प्रश्नों को समझने या उचित उत्तर देने में असमर्थ हैं।" },
    { num:"119", title:"Dumb witnesses", titleHi:"मूक गवाह", summary:"A witness who is unable to speak may give his evidence in any other manner in which he can make it intelligible, as by writing or by signs; and such evidence shall be deemed to be oral evidence.", summaryHi:"बोलने में असमर्थ गवाह लिखकर या संकेतों द्वारा साक्ष्य दे सकता है; ऐसा साक्ष्य मौखिक साक्ष्य माना जाएगा।" },
    { num:"132", title:"Witness not excused from answering on ground that answer will criminate", titleHi:"गवाह को आत्म-दोषारोपण के आधार पर उत्तर देने से छूट नहीं", summary:"A witness shall not be excused from answering any question as to any matter relevant to the matter in issue in any suit or in any civil or criminal proceeding, upon the ground that the answer to such question will criminate, or may tend directly or indirectly to criminate, such witness.", summaryHi:"गवाह को इस आधार पर उत्तर देने से छूट नहीं दी जाएगी कि उत्तर उसे दोषी ठहरा सकता है। हालांकि, ऐसा उत्तर उसके विरुद्ध उपयोग नहीं किया जाएगा।" },
  ]},
  { id:"ch-10", chapter:"Chapter X — Examination of Witnesses", chapterHi:"अध्याय X — गवाहों की परीक्षा", sections:[
    { num:"137", title:"Examination-in-chief, cross-examination, re-examination", titleHi:"मुख्य परीक्षा, जिरह, पुनः परीक्षा", summary:"The examination of a witness by the party who calls him shall be called his examination-in-chief. The examination of a witness by the adverse party shall be called his cross-examination. The examination of a witness, subsequent to the cross-examination by the party who called him, shall be called his re-examination.", summaryHi:"बुलाने वाले पक्ष द्वारा परीक्षा = मुख्य परीक्षा। विपरीत पक्ष द्वारा परीक्षा = जिरह। जिरह के बाद बुलाने वाले पक्ष द्वारा परीक्षा = पुनः परीक्षा।" },
    { num:"143", title:"Leading questions", titleHi:"प्रमुख प्रश्न", summary:"Any question suggesting the answer which the person putting it wishes or expects to receive is called a leading question. Leading questions must not, if objected to by the adverse party, be asked in an examination-in-chief or in a re-examination, except with the permission of the Court.", summaryHi:"वह प्रश्न जो उत्तर का सुझाव देता है — प्रमुख प्रश्न। मुख्य परीक्षा या पुनः परीक्षा में प्रमुख प्रश्न नहीं पूछे जा सकते, जब तक न्यायालय अनुमति न दे।" },
  ]},
];

export default function BSAPage() {
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

      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "28px", fontSize: "0.85rem" }}>
        <Link href="/library" style={{ display: "flex", alignItems: "center", gap: "4px", color: "#7ea8c9", textDecoration: "none" }}>
          <ArrowLeft size={14} /> {t.title}
        </Link>
        <ChevronRight size={14} color="#4a6a8a" />
        <span style={{ color: "#00b4d8" }}>{language === "hi" ? "भारतीय साक्ष्य अधिनियम (BSA)" : "BSA 2023"}</span>
      </div>

      <div style={{ background: "rgba(10,22,40,0.85)", backdropFilter: "blur(16px)", border: "1px solid rgba(0,180,216,0.25)", borderRadius: "20px", padding: "28px", marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
          <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: "rgba(0,180,216,0.12)", border: "1px solid rgba(0,180,216,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Scale size={26} color="#00b4d8" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", marginBottom: "8px" }}>
              <h1 style={{ fontSize: "1.5rem", fontWeight: 900, color: "#e8f4fd" }}>
                {language === "hi" ? "भारतीय साक्ष्य अधिनियम" : "Bharatiya Sakshya Adhiniyam"}
              </h1>
              <span style={{ fontSize: "0.7rem", fontWeight: 700, padding: "4px 12px", borderRadius: "50px", background: "rgba(0,180,216,0.12)", color: "#00b4d8", border: "1px solid rgba(0,180,216,0.3)" }}>BSA 2023</span>
            </div>
            <p style={{ fontSize: "0.82rem", color: "#00b4d8", marginBottom: "10px", fontWeight: 600 }}>
              {language === "hi" ? "Indian Evidence Act 1872 का स्थान · 170 धाराएं · 1 जुलाई 2024 से लागू" : "Replaces Indian Evidence Act 1872 · 170 Sections · Effective July 1, 2024"}
            </p>
            <p style={{ fontSize: "0.9rem", color: "#7ea8c9", lineHeight: 1.7 }}>
              {language === "hi"
                ? "भारतीय साक्ष्य अधिनियम 2023 भारत में साक्ष्य के कानून को आधुनिक बनाता है। प्रमुख बदलाव: इलेक्ट्रॉनिक रिकॉर्ड के लिए 65B प्रमाण पत्र की आवश्यकता हटाई गई, WhatsApp/Email/CCTV को प्राथमिक साक्ष्य माना गया, वीडियो कॉन्फ्रेंसिंग से गवाही की अनुमति।"
                : "Modernizes India's law of evidence. Key changes: Section 65B certificate requirement for electronic records removed, WhatsApp/Email/CCTV recognized as primary evidence, testimony via video conferencing allowed."}
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 20px", background: "rgba(10,22,40,0.9)", border: "1px solid rgba(0,212,255,0.2)", borderRadius: "50px", marginBottom: "8px" }}>
        <Search size={17} color="#00d4ff" style={{ flexShrink: 0 }} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={language === "hi" ? "धारा संख्या या कीवर्ड खोजें... जैसे electronic, witness, burden" : "Search section or keyword... e.g. electronic, witness, burden of proof"}
          style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: "0.9rem", color: "#e8f4fd" }}
        />
        {search && (
          <button onClick={() => setSearch("")} style={{ background: "none", border: "none", color: "#4a6a8a", cursor: "pointer", fontSize: "1rem" }}>✕</button>
        )}
      </div>
      <p style={{ fontSize: "0.78rem", color: "#4a6a8a", marginBottom: "20px", paddingLeft: "8px" }}>
               {filtered.reduce((a, c) => a + c.sections.length, 0)} {language === "hi" ? "धाराएं मिलीं" : "sections found"} · {CHAPTERS.length} {language === "hi" ? "अध्याय" : "chapters"}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {filtered.map((chapter) => {
          const isOpen = expandedChapter === chapter.id;
          return (
            <div key={chapter.id} style={{ background: "rgba(10,22,40,0.85)", backdropFilter: "blur(16px)", border: `1px solid ${isOpen ? "rgba(0,180,216,0.35)" : "rgba(0,212,255,0.1)"}`, borderRadius: "16px", overflow: "hidden", transition: "border-color 0.2s" }}>
              <button
                onClick={() => setExpandedChapter(isOpen ? null : chapter.id)}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px", background: isOpen ? "rgba(0,180,216,0.06)" : "transparent", border: "none", cursor: "pointer", textAlign: "left" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <BookOpen size={16} color="#00b4d8" style={{ flexShrink: 0 }} />
                  <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "#e8f4fd" }}>
                    {language === "hi" ? chapter.chapterHi : chapter.chapter}
                  </span>
                  <span style={{ fontSize: "0.7rem", padding: "2px 8px", borderRadius: "50px", background: "rgba(0,180,216,0.12)", color: "#00b4d8", border: "1px solid rgba(0,180,216,0.25)", flexShrink: 0 }}>
                    {chapter.sections.length} {language === "hi" ? "धाराएं" : "sections"}
                  </span>
                </div>
                <ChevronRight size={16} color="#00b4d8" style={{ transform: isOpen ? "rotate(90deg)" : "none", transition: "transform 0.2s ease", flexShrink: 0 }} />
              </button>
              {isOpen && (
                <div style={{ borderTop: "1px solid rgba(0,180,216,0.15)" }}>
                  {chapter.sections.map((s, i) => (
                    <div key={s.num} style={{ display: "flex", alignItems: "flex-start", gap: "16px", padding: "18px 22px", borderBottom: i < chapter.sections.length - 1 ? "1px solid rgba(0,212,255,0.06)" : "none" }}>
                      <span style={{ fontSize: "0.72rem", fontWeight: 800, padding: "4px 10px", borderRadius: "8px", background: "rgba(0,180,216,0.12)", color: "#00b4d8", border: "1px solid rgba(0,180,216,0.25)", flexShrink: 0, marginTop: "2px", whiteSpace: "nowrap" }}>
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

