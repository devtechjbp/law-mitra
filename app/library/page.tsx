"use client";
import { useState, Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, BookOpen, ChevronRight, FileText, Scale } from "lucide-react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { translations } from "@/translations";

type Act = {
  id: string; title: string; titleHi: string; year: number;
  sections: string; sectionsHi: string; category: string;
  description: string; descriptionHi: string; href: string; color: string;
  keywords?: string;
};

const ALL_ACTS: Act[] = [
  // ── CONSTITUTIONAL ──────────────────────────────────────────
  { id:"constitution", title:"Constitution of India", titleHi:"भारत का संविधान", year:1950, sections:"448 Articles", sectionsHi:"448 अनुच्छेद", category:"Constitutional", description:"Supreme law of India. Fundamental Rights, DPSP, federal structure, emergency provisions and 105 amendments.", descriptionHi:"भारत का सर्वोच्च कानून। मौलिक अधिकार, निदेशक तत्व, संघीय ढांचा, आपात उपबंध और 105 संशोधन।", href:"/library/constitution", color:"#00d4ff", keywords:"article 21 14 19 32 writ habeas corpus mandamus fundamental rights equality freedom speech president parliament supreme court high court emergency dpsp directive principles citizenship संविधान मौलिक अधिकार समानता स्वतंत्रता" },
  { id:"rti", title:"Right to Information Act", titleHi:"सूचना का अधिकार अधिनियम", year:2005, sections:"31 Sections", sectionsHi:"31 धाराएं", category:"Constitutional", description:"Empowers citizens to request information from any public authority within 30 days. Life/liberty matters: 48 hours.", descriptionHi:"नागरिकों को 30 दिनों के भीतर किसी भी सार्वजनिक प्राधिकरण से जानकारी प्राप्त करने का अधिकार। जीवन/स्वतंत्रता मामले: 48 घंटे।", href:"/library/constitution", color:"#00d4ff", keywords:"rti information transparency government public authority सूचना अधिकार" },
  { id:"pil", title:"Public Interest Litigation (PIL)", titleHi:"जनहित याचिका (PIL)", year:1979, sections:"Article 32 & 226", sectionsHi:"अनुच्छेद 32 और 226", category:"Constitutional", description:"Any citizen can file a PIL in High Court or Supreme Court for enforcement of public interest. No court fee required.", descriptionHi:"कोई भी नागरिक लोक हित के प्रवर्तन के लिए उच्च न्यायालय या सर्वोच्च न्यायालय में PIL दायर कर सकता है।", href:"/library/constitution", color:"#00d4ff", keywords:"pil public interest litigation writ petition court जनहित याचिका" },
  { id:"rpa", title:"Representation of the People Act", titleHi:"जन प्रतिनिधित्व अधिनियम", year:1951, sections:"171 Sections", sectionsHi:"171 धाराएं", category:"Constitutional", description:"Governs conduct of elections to Parliament and State Legislatures. Defines electoral offences, disqualifications and election disputes.", descriptionHi:"संसद और राज्य विधानमंडलों के चुनावों का संचालन। चुनावी अपराध, अयोग्यता और चुनाव विवाद।", href:"/library/constitution", color:"#00d4ff", keywords:"election vote bribery electoral offence चुनाव मतदान" },

  // ── CRIMINAL ────────────────────────────────────────────────
  { id:"bns", title:"Bharatiya Nyaya Sanhita (BNS)", titleHi:"भारतीय न्याय संहिता (BNS)", year:2023, sections:"358 Sections", sectionsHi:"358 धाराएं", category:"Criminal", description:"Replaces IPC 1860. New: community service, organised crime (Sec 111), terrorism (Sec 113), mob lynching, cyber offences. Effective July 1, 2024.", descriptionHi:"IPC 1860 का स्थान। नया: सामुदायिक सेवा, संगठित अपराध (धारा 111), आतंकवाद (धारा 113), मॉब लिंचिंग, साइबर अपराध। 1 जुलाई 2024 से लागू।", href:"/library/bns", color:"#ff4d6d", keywords:"ipc indian penal code murder theft cheating rape dowry kidnapping assault robbery dacoity forgery defamation stalking voyeurism acid attack trafficking mob lynching terrorism organised crime हत्या चोरी धोखाधड़ी बलात्कार दहेज अपहरण डकैती जालसाजी मानहानि" },
  { id:"bnss", title:"Bharatiya Nagarik Suraksha Sanhita (BNSS)", titleHi:"भारतीय नागरिक सुरक्षा संहिता (BNSS)", year:2023, sections:"531 Sections", sectionsHi:"531 धाराएं", category:"Criminal", description:"Replaces CrPC 1973. New: Zero FIR, trial in absentia, mandatory AV recording, 60-day chargesheet deadline, victim rights.", descriptionHi:"CrPC 1973 का स्थान। नया: जीरो FIR, अनुपस्थिति में सुनवाई, अनिवार्य AV रिकॉर्डिंग, 60-दिवसीय आरोप पत्र समय सीमा, पीड़ित अधिकार।", href:"/library/bnss", color:"#0066ff", keywords:"crpc criminal procedure bail arrest fir zero fir chargesheet magistrate sessions court trial warrant summons जमानत गिरफ्तारी एफआईआर आरोप पत्र मजिस्ट्रेट" },
  { id:"bsa", title:"Bharatiya Sakshya Adhiniyam (BSA)", titleHi:"भारतीय साक्ष्य अधिनियम (BSA)", year:2023, sections:"170 Sections", sectionsHi:"170 धाराएं", category:"Criminal", description:"Replaces Indian Evidence Act 1872. Electronic records (WhatsApp, email, CCTV) as primary evidence. Section 65B certificate removed.", descriptionHi:"Indian Evidence Act 1872 का स्थान। इलेक्ट्रॉनिक रिकॉर्ड (WhatsApp, email, CCTV) प्राथमिक साक्ष्य। धारा 65B प्रमाण पत्र हटाया।", href:"/library/bsa", color:"#00b4d8", keywords:"evidence witness proof document electronic whatsapp email cctv burden of proof confession admission साक्ष्य गवाह सबूत दस्तावेज" },
  { id:"pocso", title:"POCSO Act", titleHi:"पॉक्सो (POCSO) अधिनियम", year:2012, sections:"46 Sections", sectionsHi:"46 धाराएं", category:"Criminal", description:"Protection of Children from Sexual Offences. Special courts, fast-track trials, child-friendly procedures. Min punishment: 7 years.", descriptionHi:"बच्चों को यौन अपराधों से संरक्षण। विशेष अदालतें, फास्ट-ट्रैक ट्रायल, बाल-अनुकूल प्रक्रियाएं। न्यूनतम दंड: 7 वर्ष।", href:"/library/bns", color:"#f472b6", keywords:"child sexual abuse minor protection बच्चा यौन शोषण नाबालिग" },
  { id:"ndps", title:"NDPS Act", titleHi:"एनडीपीएस अधिनियम", year:1985, sections:"82 Sections", sectionsHi:"82 धाराएं", category:"Criminal", description:"Narcotic Drugs and Psychotropic Substances Act. Controls production, manufacture, possession, sale of narcotic drugs. Strict bail conditions.", descriptionHi:"मादक द्रव्य और मनःप्रभावी पदार्थ अधिनियम। नशीली दवाओं के उत्पादन, निर्माण, कब्जे, बिक्री पर नियंत्रण। कड़ी जमानत शर्तें।", href:"/library/bns", color:"#ff4d6d", keywords:"drugs narcotics cocaine heroin ganja marijuana drug trafficking नशा ड्रग्स" },
  { id:"uapa", title:"UAPA — Unlawful Activities Prevention Act", titleHi:"यूएपीए — गैरकानूनी गतिविधियां रोकथाम अधिनियम", year:1967, sections:"52 Sections", sectionsHi:"52 धाराएं", category:"Criminal", description:"Prevents unlawful activities against integrity and sovereignty of India. Designates terrorist organisations. Bail is extremely difficult to obtain.", descriptionHi:"भारत की अखंडता और संप्रभुता के विरुद्ध गैरकानूनी गतिविधियों को रोकता है। आतंकवादी संगठनों को नामित करता है।", href:"/library/bns", color:"#ff4d6d", keywords:"terrorism terrorist unlawful sedition आतंकवाद राजद्रोह" },
  { id:"ipc-old", title:"Indian Penal Code 1860 (Historical)", titleHi:"भारतीय दंड संहिता 1860 (ऐतिहासिक)", year:1860, sections:"511 Sections", sectionsHi:"511 धाराएं", category:"Criminal", description:"Replaced by BNS 2023 from July 1, 2024. Still applicable to offences committed before July 1, 2024. 163 years of criminal law history.", descriptionHi:"1 जुलाई 2024 से BNS 2023 द्वारा प्रतिस्थापित। 1 जुलाई 2024 से पहले किए गए अपराधों पर अभी भी लागू।", href:"/library/bns", color:"#4a6a8a", keywords:"ipc 302 420 376 498a section murder cheating rape cruelty आईपीसी धारा" },
  { id:"crpc-old", title:"CrPC 1973 (Historical)", titleHi:"CrPC 1973 (ऐतिहासिक)", year:1973, sections:"484 Sections", sectionsHi:"484 धाराएं", category:"Criminal", description:"Replaced by BNSS 2023 from July 1, 2024. Still applicable to proceedings initiated before July 1, 2024.", descriptionHi:"1 जुलाई 2024 से BNSS 2023 द्वारा प्रतिस्थापित। 1 जुलाई 2024 से पहले शुरू की गई कार्यवाही पर अभी भी लागू।", href:"/library/bnss", color:"#4a6a8a", keywords:"crpc bail arrest fir procedure सीआरपीसी जमानत" },
  { id:"dv-act", title:"Protection of Women from Domestic Violence Act", titleHi:"घरेलू हिंसा से महिलाओं का संरक्षण अधिनियम", year:2005, sections:"37 Sections", sectionsHi:"37 धाराएं", category:"Criminal", description:"Provides protection to women from domestic violence. Covers physical, sexual, verbal, emotional and economic abuse. Protection orders, residence orders.", descriptionHi:"महिलाओं को घरेलू हिंसा से संरक्षण। शारीरिक, यौन, मौखिक, भावनात्मक और आर्थिक दुर्व्यवहार। संरक्षण आदेश, निवास आदेश।", href:"/library/bns", color:"#f472b6", keywords:"domestic violence wife husband abuse women protection घरेलू हिंसा महिला पत्नी" },
  { id:"sc-st-act", title:"SC/ST (Prevention of Atrocities) Act", titleHi:"अनुसूचित जाति/जनजाति (अत्याचार निवारण) अधिनियम", year:1989, sections:"23 Sections", sectionsHi:"23 धाराएं", category:"Criminal", description:"Prevents atrocities against Scheduled Castes and Scheduled Tribes. Special courts, anticipatory bail not available to accused.", descriptionHi:"अनुसूचित जातियों और जनजातियों के विरुद्ध अत्याचारों को रोकता है। विशेष अदालतें, आरोपी को अग्रिम जमानत उपलब्ध नहीं।", href:"/library/bns", color:"#f59e0b", keywords:"dalit caste atrocity sc st scheduled caste tribe दलित जाति अत्याचार" },
  { id:"it-act", title:"Information Technology Act", titleHi:"सूचना प्रौद्योगिकी अधिनियम", year:2000, sections:"94 Sections", sectionsHi:"94 धाराएं", category:"Criminal", description:"Governs cyber crimes and electronic commerce. Covers hacking, data theft, cyber fraud, online defamation, and digital signatures.", descriptionHi:"साइबर अपराध और इलेक्ट्रॉनिक वाणिज्य। हैकिंग, डेटा चोरी, साइबर धोखाधड़ी, ऑनलाइन मानहानि और डिजिटल हस्ताक्षर।", href:"/library/bns", color:"#7c3aed", keywords:"cyber hacking internet online fraud digital signature social media साइबर हैकिंग इंटरनेट" },

  // ── CIVIL ───────────────────────────────────────────────────
  { id:"cpc", title:"Code of Civil Procedure (CPC)", titleHi:"सिविल प्रक्रिया संहिता (CPC)", year:1908, sections:"158 Sections + 51 Orders", sectionsHi:"158 धाराएं + 51 आदेश", category:"Civil", description:"Procedural law for civil courts. Governs how civil suits are filed, tried and decided. Includes temporary injunctions, execution of decrees.", descriptionHi:"दीवानी न्यायालयों के लिए प्रक्रियात्मक कानून। दीवानी मुकदमे कैसे दायर, परखे और तय किए जाते हैं। अस्थायी निषेधाज्ञा, डिक्री का निष्पादन।", href:"/library/civil", color:"#f59e0b" },
  { id:"contract", title:"Indian Contract Act", titleHi:"भारतीय अनुबंध अधिनियम", year:1872, sections:"238 Sections", sectionsHi:"238 धाराएं", category:"Civil", description:"Governs formation, performance and breach of contracts. Defines valid contracts, void agreements, and remedies for breach.", descriptionHi:"अनुबंधों के गठन, प्रदर्शन और उल्लंघन को नियंत्रित करता है। वैध अनुबंध, शून्य समझौते और उल्लंघन के उपचार।", href:"/library/civil", color:"#00d4ff" },
  { id:"tpa", title:"Transfer of Property Act", titleHi:"संपत्ति हस्तांतरण अधिनियम", year:1882, sections:"137 Sections", sectionsHi:"137 धाराएं", category:"Civil", description:"Governs transfer of immovable property in India. Covers sale, mortgage, lease, exchange and gift of property.", descriptionHi:"भारत में अचल संपत्ति के हस्तांतरण को नियंत्रित करता है। संपत्ति की बिक्री, बंधक, पट्टा, विनिमय और उपहार।", href:"/library/civil", color:"#4ade80" },
  { id:"limitation", title:"Limitation Act", titleHi:"सीमा अधिनियम", year:1963, sections:"32 Sections + Schedule", sectionsHi:"32 धाराएं + अनुसूची", category:"Civil", description:"Prescribes time limits for legal proceedings. 3 years for most civil suits, 12 years for property suits, 30 years for government suits.", descriptionHi:"कानूनी कार्यवाही के लिए समय सीमा। अधिकांश दीवानी मुकदमों के लिए 3 वर्ष, संपत्ति मुकदमों के लिए 12 वर्ष।", href:"/library/civil", color:"#ff4d6d" },
  { id:"consumer", title:"Consumer Protection Act", titleHi:"उपभोक्ता संरक्षण अधिनियम", year:2019, sections:"107 Sections", sectionsHi:"107 धाराएं", category:"Civil", description:"Protects consumer rights. District Commission up to Rs 1 crore, State Commission up to Rs 10 crore, National Commission above Rs 10 crore.", descriptionHi:"उपभोक्ता अधिकारों की रक्षा। जिला आयोग ₹1 करोड़ तक, राज्य आयोग ₹10 करोड़ तक, राष्ट्रीय आयोग ₹10 करोड़ से अधिक।", href:"/library/civil", color:"#0066ff" },
  { id:"rera", title:"Real Estate (Regulation and Development) Act — RERA", titleHi:"रियल एस्टेट (विनियमन और विकास) अधिनियम — RERA", year:2016, sections:"92 Sections", sectionsHi:"92 धाराएं", category:"Civil", description:"Regulates real estate sector. Mandatory registration of projects, builder accountability, homebuyer rights, penalty for delays.", descriptionHi:"रियल एस्टेट क्षेत्र का विनियमन। परियोजनाओं का अनिवार्य पंजीकरण, बिल्डर जवाबदेही, घर खरीदार अधिकार, देरी के लिए जुर्माना।", href:"/library/civil", color:"#f59e0b" },
  { id:"specific-relief", title:"Specific Relief Act", titleHi:"विशिष्ट अनुतोष अधिनियम", year:1963, sections:"44 Sections", sectionsHi:"44 धाराएं", category:"Civil", description:"Provides for specific performance of contracts and recovery of possession of property. Courts can order actual performance instead of damages.", descriptionHi:"अनुबंधों के विशिष्ट पालन और संपत्ति के कब्जे की वसूली का प्रावधान। न्यायालय हर्जाने के बजाय वास्तविक पालन का आदेश दे सकते हैं।", href:"/library/civil", color:"#00b4d8" },
  { id:"arbitration", title:"Arbitration and Conciliation Act", titleHi:"मध्यस्थता और सुलह अधिनियम", year:1996, sections:"86 Sections", sectionsHi:"86 धाराएं", category:"Civil", description:"Governs domestic and international arbitration. Arbitral awards are enforceable as court decrees. Fast alternative dispute resolution.", descriptionHi:"घरेलू और अंतर्राष्ट्रीय मध्यस्थता। मध्यस्थता पुरस्कार न्यायालय डिक्री के रूप में प्रवर्तनीय। त्वरित वैकल्पिक विवाद समाधान।", href:"/library/civil", color:"#7c3aed" },
  { id:"motor-vehicles", title:"Motor Vehicles Act", titleHi:"मोटर वाहन अधिनियम", year:1988, sections:"217 Sections", sectionsHi:"217 धाराएं", category:"Civil", description:"Governs road transport. Hit-and-run compensation Rs 2 lakh (death), Rs 50,000 (grievous hurt). Drunk driving: up to 6 months + Rs 10,000 fine.", descriptionHi:"सड़क परिवहन। हिट-एंड-रन मुआवजा ₹2 लाख (मृत्यु), ₹50,000 (गंभीर चोट)। शराब पीकर गाड़ी चलाना: 6 माह तक + ₹10,000 जुर्माना।", href:"/library/civil", color:"#f59e0b" },

  // ── CORPORATE ───────────────────────────────────────────────
  { id:"companies", title:"Companies Act", titleHi:"कंपनी अधिनियम", year:2013, sections:"470 Sections", sectionsHi:"470 धाराएं", category:"Corporate", description:"Governs incorporation, management, accounts, audit, mergers and winding up of companies. Includes CSR, NCLT, One Person Company.", descriptionHi:"कंपनियों के निगमन, प्रबंधन, खाते, ऑडिट, विलय और समापन। CSR, NCLT, एक व्यक्ति कंपनी शामिल।", href:"/library/corporate", color:"#7c3aed" },
  { id:"ibc", title:"Insolvency and Bankruptcy Code (IBC)", titleHi:"दिवाला और दिवालियापन संहिता (IBC)", year:2016, sections:"255 Sections", sectionsHi:"255 धाराएं", category:"Corporate", description:"Time-bound insolvency resolution for companies and individuals. 180-day resolution timeline. NCLT/NCLAT jurisdiction. Creditor-in-control model.", descriptionHi:"कंपनियों और व्यक्तियों के लिए समयबद्ध दिवाला समाधान। 180-दिवसीय समाधान समय सीमा। NCLT/NCLAT क्षेत्राधिकार।", href:"/library/corporate", color:"#ff4d6d" },
  { id:"sebi", title:"SEBI Act and Regulations", titleHi:"सेबी अधिनियम और विनियम", year:1992, sections:"Multiple Regulations", sectionsHi:"एकाधिक विनियम", category:"Corporate", description:"Regulates securities market. Prohibition of insider trading, SEBI LODR for listed companies, Takeover Code — 26% mandatory open offer.", descriptionHi:"प्रतिभूति बाजार का विनियमन। इनसाइडर ट्रेडिंग का निषेध, सूचीबद्ध कंपनियों के लिए SEBI LODR, टेकओवर कोड — 26% अनिवार्य ओपन ऑफर।", href:"/library/corporate", color:"#00d4ff" },
  { id:"gst", title:"GST Act", titleHi:"जीएसटी अधिनियम", year:2017, sections:"CGST + SGST + IGST", sectionsHi:"CGST + SGST + IGST", category:"Corporate", description:"Goods and Services Tax — comprehensive indirect tax. Input Tax Credit mechanism, GST Council, E-way bill, Annual return GSTR-9.", descriptionHi:"माल और सेवा कर — व्यापक अप्रत्यक्ष कर। इनपुट टैक्स क्रेडिट, GST परिषद, ई-वे बिल, वार्षिक रिटर्न GSTR-9।", href:"/library/corporate", color:"#4ade80" },
  { id:"fema", title:"Foreign Exchange Management Act (FEMA)", titleHi:"विदेशी मुद्रा प्रबंधन अधिनियम (FEMA)", year:1999, sections:"49 Sections", sectionsHi:"49 धाराएं", category:"Corporate", description:"Regulates foreign exchange transactions. Governs FDI, FPI, ECB and foreign investment. RBI regulates capital account transactions.", descriptionHi:"विदेशी मुद्रा लेनदेन का विनियमन। FDI, FPI, ECB और विदेशी निवेश। RBI पूंजी खाता लेनदेन को नियंत्रित करती है।", href:"/library/corporate", color:"#f59e0b" },
  { id:"competition", title:"Competition Act", titleHi:"प्रतिस्पर्धा अधिनियम", year:2002, sections:"66 Sections", sectionsHi:"66 धाराएं", category:"Corporate", description:"Prevents anti-competitive practices. Competition Commission of India (CCI) regulates mergers, cartels, abuse of dominant position.", descriptionHi:"प्रतिस्पर्धा-विरोधी प्रथाओं को रोकता है। भारतीय प्रतिस्पर्धा आयोग (CCI) विलय, कार्टेल, प्रभावी स्थिति के दुरुपयोग को नियंत्रित करता है।", href:"/library/corporate", color:"#7c3aed" },
  { id:"income-tax", title:"Income Tax Act", titleHi:"आयकर अधिनियम", year:1961, sections:"298 Sections", sectionsHi:"298 धाराएं", category:"Tax", description:"Governs income tax in India. Deductions under 80C, 80D, exemptions, TDS, advance tax, assessment and appeals.", descriptionHi:"भारत में आयकर। 80C, 80D के तहत कटौती, छूट, TDS, अग्रिम कर, मूल्यांकन और अपील।", href:"/library/corporate", color:"#4ade80" },
  { id:"customs", title:"Customs Act", titleHi:"सीमा शुल्क अधिनियम", year:1962, sections:"161 Sections", sectionsHi:"161 धाराएं", category:"Tax", description:"Governs levy and collection of customs duties on imports and exports. Customs Tariff Act determines rates of duty.", descriptionHi:"आयात और निर्यात पर सीमा शुल्क का उद्ग्रहण और संग्रह। सीमा शुल्क टैरिफ अधिनियम शुल्क की दरें निर्धारित करता है।", href:"/library/corporate", color:"#f59e0b" },

  // ── LABOUR ──────────────────────────────────────────────────
  { id:"industrial-disputes", title:"Industrial Disputes Act", titleHi:"औद्योगिक विवाद अधिनियम", year:1947, sections:"40 Sections", sectionsHi:"40 धाराएं", category:"Labour", description:"Governs industrial disputes, strikes, lockouts, layoffs and retrenchment. Conciliation, arbitration and adjudication of disputes.", descriptionHi:"औद्योगिक विवाद, हड़ताल, तालाबंदी, छंटनी और सेवा मुक्ति। विवादों का सुलह, मध्यस्थता और निर्णय।", href:"/library/civil", color:"#f59e0b" },
  { id:"factories", title:"Factories Act", titleHi:"कारखाना अधिनियम", year:1948, sections:"120 Sections", sectionsHi:"120 धाराएं", category:"Labour", description:"Regulates working conditions in factories. Maximum 48 hours/week, overtime pay, safety measures, health provisions, welfare facilities.", descriptionHi:"कारखानों में काम करने की स्थितियों का विनियमन। अधिकतम 48 घंटे/सप्ताह, ओवरटाइम वेतन, सुरक्षा उपाय, स्वास्थ्य प्रावधान।", href:"/library/civil", color:"#f59e0b" },
  { id:"minimum-wages", title:"Minimum Wages Act", titleHi:"न्यूनतम मजदूरी अधिनियम", year:1948, sections:"31 Sections", sectionsHi:"31 धाराएं", category:"Labour", description:"Fixes minimum wages for scheduled employments. Employers cannot pay below minimum wages. Violation is a criminal offence.", descriptionHi:"अनुसूचित रोजगारों के लिए न्यूनतम मजदूरी तय करता है। नियोक्ता न्यूनतम मजदूरी से कम नहीं दे सकते। उल्लंघन आपराधिक अपराध है।", href:"/library/civil", color:"#f59e0b" },
  { id:"epf", title:"Employees Provident Fund Act", titleHi:"कर्मचारी भविष्य निधि अधिनियम", year:1952, sections:"17 Sections", sectionsHi:"17 धाराएं", category:"Labour", description:"Mandatory provident fund for employees. Employee contributes 12% of basic salary, employer contributes 12%. Includes pension and insurance schemes.", descriptionHi:"कर्मचारियों के लिए अनिवार्य भविष्य निधि। कर्मचारी मूल वेतन का 12% योगदान, नियोक्ता 12% योगदान। पेंशन और बीमा योजनाएं शामिल।", href:"/library/civil", color:"#f59e0b" },
  { id:"gratuity", title:"Payment of Gratuity Act", titleHi:"उपदान भुगतान अधिनियम", year:1972, sections:"15 Sections", sectionsHi:"15 धाराएं", category:"Labour", description:"Provides for payment of gratuity to employees on retirement, resignation or death. Eligible after 5 years of continuous service. Formula: 15 days salary per year.", descriptionHi:"सेवानिवृत्ति, इस्तीफे या मृत्यु पर कर्मचारियों को उपदान का भुगतान। 5 वर्ष की निरंतर सेवा के बाद पात्र। सूत्र: प्रति वर्ष 15 दिन का वेतन।", href:"/library/civil", color:"#f59e0b" },

  { id:"posh", title:"POSH Act — Sexual Harassment at Workplace", titleHi:"POSH अधिनियम — कार्यस्थल पर यौन उत्पीड़न", year:2013, sections:"28 Sections", sectionsHi:"28 धाराएं", category:"Labour", description:"Prevention, prohibition and redressal of sexual harassment at workplace. Mandatory Internal Complaints Committee (ICC) for organisations with 10+ employees.", descriptionHi:"कार्यस्थल पर यौन उत्पीड़न की रोकथाम, निषेध और निवारण। 10+ कर्मचारियों वाले संगठनों के लिए अनिवार्य आंतरिक शिकायत समिति।", href:"/library/civil", color:"#f472b6" },

  // ── ENVIRONMENT ─────────────────────────────────────────────
  { id:"environment", title:"Environment Protection Act", titleHi:"पर्यावरण संरक्षण अधिनियम", year:1986, sections:"26 Sections", sectionsHi:"26 धाराएं", category:"Environment", description:"Framework for environmental protection and pollution control. Central Government can take measures to protect and improve environment quality.", descriptionHi:"पर्यावरण संरक्षण और प्रदूषण नियंत्रण के लिए ढांचा। केंद्र सरकार पर्यावरण की गुणवत्ता की रक्षा और सुधार के लिए उपाय कर सकती है।", href:"/library/civil", color:"#86efac" },
  { id:"water-act", title:"Water (Prevention and Control of Pollution) Act", titleHi:"जल (प्रदूषण निवारण और नियंत्रण) अधिनियम", year:1974, sections:"64 Sections", sectionsHi:"64 धाराएं", category:"Environment", description:"Prevents and controls water pollution. Central and State Pollution Control Boards. Discharge of pollutants into water bodies is an offence.", descriptionHi:"जल प्रदूषण की रोकथाम और नियंत्रण। केंद्रीय और राज्य प्रदूषण नियंत्रण बोर्ड। जल निकायों में प्रदूषकों का निर्वहन अपराध है।", href:"/library/civil", color:"#86efac" },
  { id:"forest", title:"Forest Conservation Act", titleHi:"वन संरक्षण अधिनियम", year:1980, sections:"5 Sections", sectionsHi:"5 धाराएं", category:"Environment", description:"Restricts de-reservation of forests and use of forest land for non-forest purposes without Central Government approval.", descriptionHi:"केंद्र सरकार की मंजूरी के बिना वनों की आरक्षण-मुक्ति और गैर-वन उद्देश्यों के लिए वन भूमि के उपयोग पर प्रतिबंध।", href:"/library/civil", color:"#86efac" },
  { id:"wildlife", title:"Wildlife Protection Act", titleHi:"वन्यजीव संरक्षण अधिनियम", year:1972, sections:"66 Sections", sectionsHi:"66 धाराएं", category:"Environment", description:"Provides for protection of wild animals, birds and plants. Establishes national parks, wildlife sanctuaries and tiger reserves.", descriptionHi:"वन्य जानवरों, पक्षियों और पौधों की सुरक्षा। राष्ट्रीय उद्यान, वन्यजीव अभयारण्य और बाघ अभयारण्य स्थापित करता है।", href:"/library/civil", color:"#86efac" },
];

function LibraryContent() {
  const { language } = useLanguageStore();
  const t = translations[language].library;
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    { id:"All", label: t.categories.all },
    { id:"Constitutional", label: t.categories.constitutional },
    { id:"Criminal", label: t.categories.criminal },
    { id:"Civil", label: t.categories.civil },
    { id:"Corporate", label: t.categories.corporate },
    { id:"Labour", label: t.categories.labour },
    { id:"Tax", label: t.categories.tax },
    { id:"Environment", label: t.categories.environment },
  ];

  const filtered = useMemo(() => ALL_ACTS.filter((act) => {
    const matchCat = activeCategory === "All" || act.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch = !search ||
      act.title.toLowerCase().includes(q) ||
      act.titleHi.includes(search) ||
      act.description.toLowerCase().includes(q) ||
      act.descriptionHi.includes(search) ||
      act.category.toLowerCase().includes(q) ||
      String(act.year).includes(search) ||
      (act.keywords && act.keywords.toLowerCase().includes(q));
    return matchCat && matchSearch;
  }), [search, activeCategory]);

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px 80px" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <div className="badge-cyan" style={{ marginBottom: "16px" }}>
          <BookOpen size={13} />
          {t.badge}
        </div>
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, marginBottom: "12px", color: "var(--text-primary)" }}>
          {language === "hi" ? "पूर्ण " : "Complete "}
          <span className="text-cyan-gradient">{language === "hi" ? "विधि पुस्तकालय" : "Law Library"}</span>
        </h1>
        <p style={{ fontSize: "1rem", color: "var(--text-secondary)", maxWidth: "560px", margin: "0 auto" }}>
          {language === "hi" ? "भारत के सभी प्रमुख अधिनियम, धाराएं और विधान — पूरी तरह से अनुक्रमित और खोजने योग्य।" : "Every major Indian Act, Section and Statute — fully indexed and searchable."}
        </p>
      </div>

      {/* Search */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 20px", maxWidth: "580px", margin: "0 auto 28px", background: "rgba(10,22,40,0.9)", backdropFilter: "blur(20px)", border: "1px solid rgba(0,212,255,0.25)", borderRadius: "50px" }}>
        <Search size={18} color="#00d4ff" style={{ flexShrink: 0 }} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={language === "hi" ? "अधिनियम, धारा, कीवर्ड खोजें... जैसे BNS, RTI, bail, जमानत" : "Search acts, sections, keywords... e.g. BNS, RTI, bail, murder"}
          style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: "0.95rem", color: "#e8f4fd" }}
        />
        {search && (
          <button onClick={() => setSearch("")} style={{ background: "none", border: "none", color: "#4a6a8a", cursor: "pointer", fontSize: "0.85rem" }}>
            ✕ {t.clear}
          </button>
        )}
      </div>

      {/* Category Filters */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", marginBottom: "36px" }}>
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: "8px 20px", borderRadius: "50px", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", transition: "all 0.2s ease",
                background: isActive ? "linear-gradient(135deg, #0066ff, #00d4ff)" : "rgba(0,212,255,0.06)",
                color: isActive ? "#ffffff" : "#7ea8c9",
                border: isActive ? "1px solid transparent" : "1px solid rgba(0,212,255,0.18)",
                boxShadow: isActive ? "0 0 16px rgba(0,212,255,0.3)" : "none",
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Count */}
      <p style={{ fontSize: "0.85rem", color: "#4a6a8a", marginBottom: "20px", textAlign: "center" }}>
        {filtered.length} {t.actsFound}
        {search && <span> {t.for} &quot;{search}"</span>}
        {activeCategory !== "All" && <span> {t.in} {categories.find(c => c.id === activeCategory)?.label}</span>}
        <span style={{ marginLeft: "8px", color: "#2a4a6a" }}>· {ALL_ACTS.length} total acts indexed</span>
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
          {filtered.map((act) => (
            <Link key={act.id} href={act.href} style={{ textDecoration: "none" }}>
              <div
                style={{ background: "rgba(10,22,40,0.8)", backdropFilter: "blur(16px)", border: "1px solid rgba(0,212,255,0.12)", borderRadius: "16px", padding: "24px", height: "100%", transition: "all 0.3s ease", cursor: "pointer" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `${act.color}60`; el.style.transform = "translateY(-3px)"; el.style.boxShadow = `0 8px 30px ${act.color}18`; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(0,212,255,0.12)"; el.style.transform = "translateY(0)"; el.style.boxShadow = "none"; }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px" }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: `${act.color}18`, border: `1px solid ${act.color}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <FileText size={18} color={act.color} />
                  </div>
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, padding: "4px 10px", borderRadius: "50px", background: `${act.color}15`, color: act.color, border: `1px solid ${act.color}35` }}>
                    {act.year}
                  </span>
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#e8f4fd", marginBottom: "4px", lineHeight: 1.3 }}>
                  {language === "hi" ? act.titleHi : act.title}
                </h3>
                <p style={{ fontSize: "0.75rem", color: act.color, marginBottom: "10px", fontWeight: 600 }}>
                  {language === "hi" ? act.sectionsHi : act.sections} · {act.category}
                </p>
                <p style={{ fontSize: "0.875rem", color: "#7ea8c9", lineHeight: 1.65, marginBottom: "20px" }}>
                  {language === "hi" ? act.descriptionHi : act.description}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", fontWeight: 600, color: act.color }}>
                  {t.readFull} <ChevronRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "80px 0" }}>
          <Scale size={48} color="rgba(0,212,255,0.2)" style={{ margin: "0 auto 16px", display: "block" }} />
          <p style={{ fontSize: "1.1rem", color: "#7ea8c9" }}>{t.noActs}</p>
          <p style={{ fontSize: "0.9rem", color: "#4a6a8a", marginTop: "8px" }}>{t.tryDifferent}</p>
          <button
            onClick={() => { setSearch(""); setActiveCategory("All"); }}
            style={{ marginTop: "20px", padding: "10px 24px", borderRadius: "50px", background: "linear-gradient(135deg, #0066ff, #00d4ff)", color: "#ffffff", border: "none", cursor: "pointer", fontSize: "0.9rem", fontWeight: 600 }}
          >
            {t.reset}
          </button>
        </div>
      )}
    </div>
  );
}

export default function LibraryPage() {
  const { language } = useLanguageStore();
  return (
    <Suspense fallback={
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh", color: "#00d4ff", fontSize: "1rem" }}>
        {language === "hi" ? "लॉ लाइब्रेरी लोड हो रही है..." : "Loading Law Library..."}
      </div>
    }>
      <LibraryContent />
    </Suspense>
  );
}
