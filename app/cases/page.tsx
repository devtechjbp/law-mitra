"use client";

import { useState, useMemo } from "react";
import { Search, Gavel, Calendar, User, ChevronDown } from "lucide-react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { translations } from "@/translations";

export default function CasesPage() {
  const { language } = useLanguageStore();
  const t = translations[language].cases_page;
  
  const [search, setSearch] = useState("");
  const [selectedYear, setSelectedYear] = useState("All Years");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedCase, setExpandedCase] = useState<number | null>(null);

  const yearFilters = useMemo(() => [
    { id: "All Years", label: language === 'hi' ? "सभी वर्ष" : "All Years" },
    { id: "2020s", label: "2020s" },
    { id: "2010s", label: "2010s" },
    { id: "2000s", label: "2000s" },
    { id: "1990s", label: "1990s" },
    { id: "1980s", label: "1980s" },
    { id: "1970s", label: "1970s" },
    { id: "Pre-1970", label: language === 'hi' ? "1970 से पहले" : "Pre-1970" },
  ], [language]);

  const categories = useMemo(() => [
    { id: "All", label: language === 'hi' ? "सभी" : "All" },
    { id: "Constitutional", label: language === 'hi' ? "संवैधानिक" : "Constitutional" },
    { id: "Fundamental Rights", label: language === 'hi' ? "मौलिक अधिकार" : "Fundamental Rights" },
    { id: "Privacy", label: language === 'hi' ? "निजता" : "Privacy" },
    { id: "Civil Rights", label: language === 'hi' ? "नागरिक अधिकार" : "Civil Rights" },
    { id: "Women's Rights", label: language === 'hi' ? "महिलाओं के अधिकार" : "Women's Rights" },
    { id: "Reservation", label: language === 'hi' ? "आरक्षण" : "Reservation" },
    { id: "Federalism", label: language === 'hi' ? "संघवाद" : "Federalism" },
    { id: "Socio-Economic Rights", label: language === 'hi' ? "सामाजिक-आर्थिक अधिकार" : "Socio-Economic Rights" },
    { id: "Criminal Law", label: language === 'hi' ? "आपराधिक कानून" : "Criminal Law" },
    { id: "Environment", label: language === 'hi' ? "पर्यावरण" : "Environment" },
    { id: "Media & Speech", label: language === 'hi' ? "मीडिया और भाषण" : "Media & Speech" },
  ], [language]);

  const allCases = useMemo(() => [
    {
      id: 1,
      title: language === 'hi' ? "केशवानंद भारती बनाम केरल राज्य" : "Kesavananda Bharati v. State of Kerala",
      citation: "AIR 1973 SC 1461",
      year: 1973,
      court: language === 'hi' ? "सुप्रीम कोर्ट" : "Supreme Court",
      judge: language === 'hi' ? "सीजे एस.एम. सीकरी (13-न्यायाधीशों की पीठ)" : "CJ S.M. Sikri (13-Judge Bench)",
      category: "Constitutional",
      categoryLabel: language === 'hi' ? "संवैधानिक" : "Constitutional",
      keywords: language === 'hi' ? ["मूल संरचना", "संवैधानिक संशोधन", "संसद"] : ["Basic Structure", "Constitutional Amendment", "Parliament"],
      summary: language === 'hi' 
        ? "मूल संरचना सिद्धांत (Basic Structure Doctrine) की स्थापना की। संसद के पास संविधान में संशोधन करने की शक्ति है लेकिन वह इसकी मूल संरचना को नष्ट नहीं कर सकती - जिसमें संविधान की सर्वोच्चता, सरकार का गणतांत्रिक और लोकतांत्रिक स्वरूप, धर्मनिरपेक्ष चरित्र और शक्तियों का पृथक्करण शामिल है।"
        : "Established the Basic Structure Doctrine. Parliament has the power to amend the Constitution but cannot destroy its basic structure — including supremacy of the Constitution, republican and democratic form of government, secular character, and separation of powers.",
      significance: language === 'hi' ? "ऐतिहासिक" : "Landmark",
      color: "#00d4ff",
    },
    {
      id: 2,
      title: language === 'hi' ? "मेनका गांधी बनाम भारत संघ" : "Maneka Gandhi v. Union of India",
      citation: "AIR 1978 SC 597",
      year: 1978,
      court: language === 'hi' ? "सुप्रीम कोर्ट" : "Supreme Court",
      judge: "CJ M.H. Beg",
      category: "Fundamental Rights",
      categoryLabel: language === 'hi' ? "मौलिक अधिकार" : "Fundamental Rights",
      keywords: language === 'hi' ? ["अनुच्छेद 21", "व्यक्तिगत स्वतंत्रता", "उचित प्रक्रिया", "पासपोर्ट"] : ["Article 21", "Personal Liberty", "Due Process", "Passport"],
      summary: language === 'hi'
        ? "अनुच्छेद 21 के दायरे का विस्तार किया। कानून द्वारा स्थापित प्रक्रिया निष्पक्ष, न्यायपूर्ण और उचित होनी चाहिए। अनुच्छेद 14, 19 और 21 परस्पर अनन्य नहीं हैं बल्कि एक 'स्वर्ण त्रिभुज' बनाते हैं। व्यक्तिगत स्वतंत्रता छीनने वाले किसी भी कानून को इन तीनों अनुच्छेदों को संतुष्ट करना चाहिए।"
        : "Expanded the scope of Article 21. The procedure established by law must be fair, just, and reasonable. Articles 14, 19, and 21 are not mutually exclusive but form a golden triangle. Any law depriving personal liberty must satisfy all three articles.",
      significance: language === 'hi' ? "ऐतिहासिक" : "Landmark",
      color: "#0066ff",
    },
    {
      id: 3,
      title: language === 'hi' ? "के.एस. पुट्टास्वामी बनाम भारत संघ" : "K.S. Puttaswamy v. Union of India",
      citation: "(2017) 10 SCC 1",
      year: 2017,
      court: language === 'hi' ? "सुप्रीम कोर्ट" : "Supreme Court",
      judge: language === 'hi' ? "9-न्यायाधीशों की संविधान पीठ" : "9-Judge Constitution Bench",
      category: "Privacy",
      categoryLabel: language === 'hi' ? "निजता" : "Privacy",
      keywords: language === 'hi' ? ["निजता का अधिकार", "अनुच्छेद 21", "आधार", "मौलिक अधिकार"] : ["Right to Privacy", "Article 21", "Aadhaar", "Fundamental Right"],
      summary: language === 'hi'
        ? "सर्वसम्मति से माना गया कि निजता का अधिकार अनुच्छेद 21 के तहत एक मौलिक अधिकार है। एम.पी. शर्मा (1954) और खड़क सिंह (1962) के निर्णयों को पलट दिया। निजता में सूचनात्मक निजता, शारीरिक अखंडता और निर्णयात्मक स्वायत्तता शामिल है।"
        : "Unanimously held that the Right to Privacy is a fundamental right under Article 21. Overruled M.P. Sharma (1954) and Kharak Singh (1962). Privacy includes informational privacy, bodily integrity, and decisional autonomy.",
      significance: language === 'hi' ? "ऐतिहासिक" : "Landmark",
      color: "#7c3aed",
    },
    {
      id: 4,
      title: language === 'hi' ? "नवतेज सिंह जौहर बनाम भारत संघ" : "Navtej Singh Johar v. Union of India",
      citation: "(2018) 10 SCC 1",
      year: 2018,
      court: language === 'hi' ? "सुप्रीम कोर्ट" : "Supreme Court",
      judge: "CJ Dipak Misra",
      category: "Civil Rights",
      categoryLabel: language === 'hi' ? "नागरिक अधिकार" : "Civil Rights",
      keywords: language === 'hi' ? ["धारा 377", "LGBTQ+", "विशिष्तीकरण", "अनुच्छेद 14", "अनुच्छेद 21"] : ["Section 377", "LGBTQ+", "Decriminalization", "Article 14", "Article 21"],
      summary: language === 'hi'
        ? "आईपीसी की धारा 377 को वयस्कों के बीच सहमति से समलैंगिक संबंधों को अपराध की श्रेणी से बाहर करने के लिए पढ़ा गया था। अदालत ने माना कि यौन अभिविन्यास पहचान का एक अनिवार्य गुण है और इस आधार पर भेदभाव अनुच्छेद 14, 15, 19 और 21 का उल्लंघन करता है।"
        : "Section 377 IPC was read down to decriminalize consensual same-sex relations between adults. The court held that sexual orientation is an essential attribute of identity and discrimination on this ground violates Articles 14, 15, 19, and 21.",
      significance: language === 'hi' ? "ऐतिहासिक" : "Landmark",
      color: "#f472b6",
    },
    {
      id: 5,
      title: language === 'hi' ? "विशाखा बनाम राजस्थान राज्य" : "Vishaka v. State of Rajasthan",
      citation: "AIR 1997 SC 3011",
      year: 1997,
      court: language === 'hi' ? "सुप्रीम कोर्ट" : "Supreme Court",
      judge: "CJ J.S. Verma",
      category: "Women's Rights",
      categoryLabel: language === 'hi' ? "महिलाओं के अधिकार" : "Women's Rights",
      keywords: language === 'hi' ? ["यौन उत्पीड़न", "कार्यस्थल", "POSH अधिनियम", "अनुच्छेद 19", "अनुच्छेद 21"] : ["Sexual Harassment", "Workplace", "POSH Act", "Article 19", "Article 21"],
      summary: language === 'hi'
        ? "कार्यस्थल पर यौन उत्पीड़न की रोकथाम के लिए विशाखा दिशानिर्देश निर्धारित किए गए। इन दिशानिर्देशों को बाद में POSH अधिनियम 2013 में संहिताबद्ध किया गया। माना गया कि यौन उत्पीड़न अनुच्छेद 14, 15, 19 और 21 के तहत महिलाओं के मौलिक अधिकारों का उल्लंघन करता है।"
        : "Laid down the Vishaka Guidelines for prevention of sexual harassment at workplace. These guidelines were later codified into the POSH Act 2013. Held that sexual harassment violates the fundamental rights of women under Articles 14, 15, 19, and 21.",
      significance: language === 'hi' ? "ऐतिहासिक" : "Landmark",
      color: "#f59e0b",
    },
    {
      id: 6,
      title: language === 'hi' ? "इंद्रा साहनी बनाम भारत संघ" : "Indra Sawhney v. Union of India",
      citation: "AIR 1993 SC 477",
      year: 1992,
      court: language === 'hi' ? "सुप्रीम कोर्ट" : "Supreme Court",
      judge: language === 'hi' ? "सीजे एम.एच. कनिया (9-न्यायाधीशों की पीठ)" : "CJ M.H. Kania (9-Judge Bench)",
      category: "Reservation",
      categoryLabel: language === 'hi' ? "आरक्षण" : "Reservation",
      keywords: language === 'hi' ? ["OBC आरक्षण", "मंडल आयोग", "50% सीमा", "अनुच्छेद 16"] : ["OBC Reservation", "Mandal Commission", "50% Cap", "Article 16"],
      summary: language === 'hi'
        ? "ओबीसी के लिए 27% आरक्षण को बरकरार रखा लेकिन सवर्ण जातियों में आर्थिक रूप से कमजोर वर्गों के लिए 10% आरक्षण को रद्द कर दिया। आरक्षण पर 50% की सीमा तय की। ओबीसी आरक्षण से 'क्रीमी लेयर' को बाहर रखा।"
        : "Upheld 27% reservation for OBCs but struck down 10% reservation for economically weaker sections among forward castes. Laid down the 50% ceiling on reservations. Excluded the 'creamy layer' from OBC reservations.",
      significance: language === 'hi' ? "ऐतिहासिक" : "Landmark",
      color: "#4ade80",
    },
    {
      id: 7,
      title: language === 'hi' ? "एस.आर. बोम्मई बनाम भारत संघ" : "S.R. Bommai v. Union of India",
      citation: "AIR 1994 SC 1918",
      year: 1994,
      court: language === 'hi' ? "सुप्रीम कोर्ट" : "Supreme Court",
      judge: language === 'hi' ? "9-न्यायाधीशों की पीठ" : "9-Judge Bench",
      category: "Federalism",
      categoryLabel: language === 'hi' ? "संघवाद" : "Federalism",
      keywords: language === 'hi' ? ["अनुच्छेद 356", "राष्ट्रपति शासन", "संघवाद", "फ्लोर टेस्ट"] : ["Article 356", "President's Rule", "Federalism", "Floor Test"],
      summary: language === 'hi'
        ? "अनुच्छेद 356 (राष्ट्रपति शासन) के दुरुपयोग को प्रतिबंधित किया। माना गया कि विधानसभा का पटल ही सरकार के बहुमत का परीक्षण करने की एकमात्र जगह है। धर्मनिरपेक्षता संविधान की एक बुनियादी विशेषता है। राष्ट्रपति की घोषणा न्यायिक समीक्षा के अधीन है।"
        : "Restricted the misuse of Article 356 (President's Rule). Held that the floor of the Assembly is the only place to test the majority of a government. Secularism is a basic feature of the Constitution. Presidential proclamation is subject to judicial review.",
      significance: language === 'hi' ? "ऐतिहासिक" : "Landmark",
      color: "#00b4d8",
    },
    {
      id: 8,
      title: language === 'hi' ? "ओल्गा टेलिस बनाम बॉम्बे नगर निगम" : "Olga Tellis v. Bombay Municipal Corporation",
      citation: "AIR 1986 SC 180",
      year: 1985,
      court: language === 'hi' ? "सुप्रीम कोर्ट" : "Supreme Court",
      judge: "CJ Y.V. Chandrachud",
      category: "Socio-Economic Rights",
      categoryLabel: language === 'hi' ? "सामाजिक-आर्थिक अधिकार" : "Socio-Economic Rights",
      keywords: language === 'hi' ? ["आजीविका का अधिकार", "अनुच्छेद 21", "फुटपाथ निवासी", "बेदखली"] : ["Right to Livelihood", "Article 21", "Pavement Dwellers", "Eviction"],
      summary: language === 'hi'
        ? "माना गया कि आजीविका का अधिकार अनुच्छेद 21 के तहत जीवन के अधिकार का एक अभिन्न अंग है। वैकल्पिक आवास प्रदान किए बिना फुटपाथ निवासियों की बेदखली अनुच्छेद 21 का उल्लंघन करती है। राज्य को बेदखली से पहले उचित प्रक्रिया का पालन करना चाहिए।"
        : "Held that the right to livelihood is an integral part of the right to life under Article 21. Eviction of pavement dwellers without providing alternative accommodation violates Article 21. The State must follow due process before eviction.",
      significance: language === 'hi' ? "ऐतिहासिक" : "Landmark",
      color: "#4f46e5",
    },
    {
      id: 9,
      title: language === 'hi' ? "ए.के. गोपालन बनाम मद्रास राज्य" : "A.K. Gopalan v. State of Madras",
      citation: "AIR 1950 SC 27",
      year: 1950,
      court: language === 'hi' ? "सुप्रीम कोर्ट" : "Supreme Court",
      judge: "CJ H.J. Kania",
      category: "Fundamental Rights",
      categoryLabel: language === 'hi' ? "मौलिक अधिकार" : "Fundamental Rights",
      keywords: language === 'hi' ? ["अनुच्छेद 21", "निवारक निरोध", "व्यक्तिगत स्वतंत्रता"] : ["Article 21", "Preventive Detention", "Personal Liberty"],
      summary: language === 'hi' ? "सुप्रीम कोर्ट का पहला बड़ा संवैधानिक मामला। माना गया कि अनुच्छेद 21 के तहत कानून द्वारा स्थापित प्रक्रिया का अर्थ केवल विधायिका द्वारा बनाई गई प्रक्रिया है। बाद में मेनका गांधी मामले में इसे पलट दिया गया।" : "First major constitutional case of the Supreme Court. Held that procedure established by law under Article 21 means only the procedure enacted by the legislature. Later overruled in Maneka Gandhi case.",
      significance: language === 'hi' ? "ऐतिहासिक" : "Landmark",
      color: "#0066ff",
    },
    {
      id: 10,
      title: language === 'hi' ? "गोलकनाथ बनाम पंजाब राज्य" : "Golaknath v. State of Punjab",
      citation: "AIR 1967 SC 1643",
      year: 1967,
      court: language === 'hi' ? "सुप्रीम कोर्ट" : "Supreme Court",
      judge: "CJ K. Subba Rao (11-Judge Bench)",
      category: "Constitutional",
      categoryLabel: language === 'hi' ? "संवैधानिक" : "Constitutional",
      keywords: language === 'hi' ? ["मौलिक अधिकार", "संवैधानिक संशोधन", "अनुच्छेद 368"] : ["Fundamental Rights", "Constitutional Amendment", "Article 368"],
      summary: language === 'hi' ? "माना गया कि संसद मौलिक अधिकारों में संशोधन नहीं कर सकती। यह निर्णय बाद में केशवानंद भारती मामले में पलट दिया गया, लेकिन मूल संरचना सिद्धांत की नींव रखी।" : "Held that Parliament cannot amend Fundamental Rights. This decision was later overruled in Kesavananda Bharati, but laid the foundation for the Basic Structure doctrine.",
      significance: language === 'hi' ? "ऐतिहासिक" : "Landmark",
      color: "#7c3aed",
    },
    {
      id: 11,
      title: language === 'hi' ? "मिनर्वा मिल्स बनाम भारत संघ" : "Minerva Mills v. Union of India",
      citation: "AIR 1980 SC 1789",
      year: 1980,
      court: language === 'hi' ? "सुप्रीम कोर्ट" : "Supreme Court",
      judge: "CJ Y.V. Chandrachud",
      category: "Constitutional",
      categoryLabel: language === 'hi' ? "संवैधानिक" : "Constitutional",
      keywords: language === 'hi' ? ["मूल संरचना", "42वां संशोधन", "न्यायिक समीक्षा"] : ["Basic Structure", "42nd Amendment", "Judicial Review"],
      summary: language === 'hi' ? "42वें संशोधन की धाराओं को रद्द किया जो न्यायिक समीक्षा को सीमित करती थीं। माना गया कि मौलिक अधिकारों और निदेशक तत्वों के बीच सामंजस्य संविधान की मूल संरचना का हिस्सा है।" : "Struck down provisions of the 42nd Amendment that curtailed judicial review. Held that harmony between Fundamental Rights and Directive Principles is part of the basic structure.",
      significance: language === 'hi' ? "ऐतिहासिक" : "Landmark",
      color: "#ff4d6d",
    },
    {
      id: 12,
      title: language === 'hi' ? "एम.सी. मेहता बनाम भारत संघ (ताज ट्रेपेज़ियम)" : "M.C. Mehta v. Union of India (Taj Trapezium)",
      citation: "(1997) 2 SCC 353",
      year: 1997,
      court: language === 'hi' ? "सुप्रीम कोर्ट" : "Supreme Court",
      judge: "J. Kuldip Singh",
      category: "Environment",
      categoryLabel: language === 'hi' ? "पर्यावरण" : "Environment",
      keywords: language === 'hi' ? ["पर्यावरण संरक्षण", "ताज महल", "प्रदूषण", "अनुच्छेद 21"] : ["Environmental Protection", "Taj Mahal", "Pollution", "Article 21"],
      summary: language === 'hi' ? "ताज महल के आसपास प्रदूषण फैलाने वाले उद्योगों को बंद करने या स्थानांतरित करने का आदेश दिया। माना गया कि स्वच्छ पर्यावरण का अधिकार अनुच्छेद 21 के तहत जीवन के अधिकार का हिस्सा है।" : "Ordered closure or relocation of polluting industries around the Taj Mahal. Held that the right to a clean environment is part of the right to life under Article 21.",
      significance: language === 'hi' ? "ऐतिहासिक" : "Landmark",
      color: "#4ade80",
    },
    {
      id: 13,
      title: language === 'hi' ? "एम.सी. मेहता बनाम भारत संघ (गंगा प्रदूषण)" : "M.C. Mehta v. Union of India (Ganga Pollution)",
      citation: "AIR 1988 SC 1037",
      year: 1988,
      court: language === 'hi' ? "सुप्रीम कोर्ट" : "Supreme Court",
      judge: "J. E.S. Venkataramiah",
      category: "Environment",
      categoryLabel: language === 'hi' ? "पर्यावरण" : "Environment",
      keywords: language === 'hi' ? ["गंगा प्रदूषण", "पर्यावरण", "जनहित याचिका"] : ["Ganga Pollution", "Environment", "PIL"],
      summary: language === 'hi' ? "गंगा नदी में प्रदूषण फैलाने वाले टेनरियों और उद्योगों को बंद करने का आदेश दिया। पर्यावरण संरक्षण के लिए जनहित याचिका के उपयोग को स्थापित किया। प्रदूषक भुगतान सिद्धांत लागू किया।" : "Ordered closure of tanneries and industries polluting the Ganga river. Established the use of PIL for environmental protection. Applied the polluter pays principle.",
      significance: language === 'hi' ? "ऐतिहासिक" : "Landmark",
      color: "#4ade80",
    },
    {
      id: 14,
      title: language === 'hi' ? "हुसैनारा खातून बनाम बिहार राज्य" : "Hussainara Khatoon v. State of Bihar",
      citation: "AIR 1979 SC 1360",
      year: 1979,
      court: language === 'hi' ? "सुप्रीम कोर्ट" : "Supreme Court",
      judge: "J. P.N. Bhagwati",
      category: "Criminal Law",
      categoryLabel: language === 'hi' ? "आपराधिक कानून" : "Criminal Law",
      keywords: language === 'hi' ? ["त्वरित सुनवाई", "विचाराधीन कैदी", "अनुच्छेद 21", "जमानत"] : ["Speedy Trial", "Undertrial Prisoners", "Article 21", "Bail"],
      summary: language === 'hi' ? "माना गया कि त्वरित सुनवाई अनुच्छेद 21 के तहत एक मौलिक अधिकार है। बिहार की जेलों में वर्षों से बंद विचाराधीन कैदियों को रिहा करने का आदेश दिया।" : "Held that speedy trial is a fundamental right under Article 21. Ordered release of undertrial prisoners languishing in Bihar jails for years.",
      significance: language === 'hi' ? "ऐतिहासिक" : "Landmark",
      color: "#0066ff",
    },
    {
      id: 15,
      title: language === 'hi' ? "डी.के. बसु बनाम पश्चिम बंगाल राज्य" : "D.K. Basu v. State of West Bengal",
      citation: "(1997) 1 SCC 416",
      year: 1997,
      court: language === 'hi' ? "सुप्रीम कोर्ट" : "Supreme Court",
      judge: "J. A.S. Anand",
      category: "Criminal Law",
      categoryLabel: language === 'hi' ? "आपराधिक कानून" : "Criminal Law",
      keywords: language === 'hi' ? ["पुलिस हिरासत", "हिरासत में मौत", "गिरफ्तारी दिशानिर्देश", "अनुच्छेद 21"] : ["Police Custody", "Custodial Death", "Arrest Guidelines", "Article 21"],
      summary: language === 'hi' ? "पुलिस गिरफ्तारी और हिरासत के लिए विस्तृत दिशानिर्देश जारी किए। गिरफ्तार व्यक्ति को गिरफ्तारी का कारण बताना, परिवार को सूचित करना, चिकित्सा जांच अनिवार्य। हिरासत में यातना और मौत के लिए राज्य उत्तरदायी।" : "Issued detailed guidelines for police arrest and detention. Mandatory to inform arrested person of grounds, notify family, conduct medical examination. State liable for custodial torture and death.",
      significance: language === 'hi' ? "ऐतिहासिक" : "Landmark",
      color: "#ff4d6d",
    },
    {
      id: 16,
      title: language === 'hi' ? "बंधुआ मुक्ति मोर्चा बनाम भारत संघ" : "Bandhua Mukti Morcha v. Union of India",
      citation: "AIR 1984 SC 802",
      year: 1984,
      court: language === 'hi' ? "सुप्रीम कोर्ट" : "Supreme Court",
      judge: "J. P.N. Bhagwati",
      category: "Socio-Economic Rights",
      categoryLabel: language === 'hi' ? "सामाजिक-आर्थिक अधिकार" : "Socio-Economic Rights",
      keywords: language === 'hi' ? ["बंधुआ मजदूरी", "अनुच्छेद 21", "अनुच्छेद 23", "मानव गरिमा"] : ["Bonded Labour", "Article 21", "Article 23", "Human Dignity"],
      summary: language === 'hi' ? "बंधुआ मजदूरी को अनुच्छेद 21 और 23 का उल्लंघन माना। सरकार को बंधुआ मजदूरों की पहचान, मुक्ति और पुनर्वास का निर्देश दिया।" : "Held bonded labour to be a violation of Articles 21 and 23. Directed the government to identify, release, and rehabilitate bonded labourers.",
      significance: language === 'hi' ? "ऐतिहासिक" : "Landmark",
      color: "#f59e0b",
    },
    {
      id: 17,
      title: language === 'hi' ? "शायरा बानो बनाम भारत संघ (तीन तलाक)" : "Shayara Bano v. Union of India (Triple Talaq)",
      citation: "(2017) 9 SCC 1",
      year: 2017,
      court: language === 'hi' ? "सुप्रीम कोर्ट" : "Supreme Court",
      judge: language === 'hi' ? "5-न्यायाधीशों की संविधान पीठ" : "5-Judge Constitution Bench",
      category: "Women's Rights",
      categoryLabel: language === 'hi' ? "महिलाओं के अधिकार" : "Women's Rights",
      keywords: language === 'hi' ? ["तीन तलाक", "मुस्लिम महिला", "अनुच्छेद 14", "मनमाना"] : ["Triple Talaq", "Muslim Women", "Article 14", "Arbitrary"],
      summary: language === 'hi' ? "तत्काल तीन तलाक को 3:2 बहुमत से असंवैधानिक घोषित किया। माना गया कि यह प्रथा मनमाना और अनुच्छेद 14 का उल्लंघन है। इसके बाद मुस्लिम महिला संरक्षण अधिनियम 2019 पारित किया गया।" : "Declared instant triple talaq unconstitutional by 3:2 majority. Held the practice to be arbitrary and violative of Article 14. Led to the Muslim Women Protection Act 2019.",
      significance: language === 'hi' ? "ऐतिहासिक" : "Landmark",
      color: "#f472b6",
    },
    {
      id: 18,
      title: language === 'hi' ? "श्रेया सिंघल बनाम भारत संघ" : "Shreya Singhal v. Union of India",
      citation: "(2015) 5 SCC 1",
      year: 2015,
      court: language === 'hi' ? "सुप्रीम कोर्ट" : "Supreme Court",
      judge: "J. J. Chelameswar",
      category: "Media & Speech",
      categoryLabel: language === 'hi' ? "मीडिया और भाषण" : "Media & Speech",
      keywords: language === 'hi' ? ["धारा 66A", "IT अधिनियम", "इंटरनेट स्वतंत्रता", "अभिव्यक्ति"] : ["Section 66A", "IT Act", "Internet Freedom", "Expression"],
      summary: language === 'hi' ? "IT अधिनियम की धारा 66A को असंवैधानिक घोषित किया जो ऑनलाइन आपत्तिजनक सामग्री पोस्ट करने को अपराध बनाती थी। माना गया कि यह अनुच्छेद 19(1)(a) के तहत अभिव्यक्ति की स्वतंत्रता का उल्लंघन है।" : "Struck down Section 66A of the IT Act which criminalized posting offensive content online. Held it to be a violation of freedom of expression under Article 19(1)(a).",
      significance: language === 'hi' ? "ऐतिहासिक" : "Landmark",
      color: "#4f46e5",
    },
    {
      id: 19,
      title: language === 'hi' ? "इंडियन यंग लॉयर्स एसोसिएशन बनाम केरल राज्य (सबरीमाला)" : "Indian Young Lawyers Association v. State of Kerala (Sabarimala)",
      citation: "(2019) 11 SCC 1",
      year: 2018,
      court: language === 'hi' ? "सुप्रीम कोर्ट" : "Supreme Court",
      judge: "CJ Dipak Misra (5-Judge Bench)",
      category: "Civil Rights",
      categoryLabel: language === 'hi' ? "नागरिक अधिकार" : "Civil Rights",
      keywords: language === 'hi' ? ["सबरीमाला", "महिला प्रवेश", "अनुच्छेद 25", "धार्मिक स्वतंत्रता"] : ["Sabarimala", "Women Entry", "Article 25", "Religious Freedom"],
      summary: language === 'hi' ? "4:1 बहुमत से माना गया कि सबरीमाला मंदिर में 10-50 वर्ष की महिलाओं के प्रवेश पर प्रतिबंध असंवैधानिक है। भक्ति और पूजा का अधिकार लिंग के आधार पर प्रतिबंधित नहीं किया जा सकता।" : "Held by 4:1 majority that the ban on entry of women aged 10-50 in Sabarimala temple is unconstitutional. The right to devotion and worship cannot be restricted on the basis of gender.",
      significance: language === 'hi' ? "ऐतिहासिक" : "Landmark",
      color: "#f59e0b",
    },
    {
      id: 20,
      title: language === 'hi' ? "सुप्रीम कोर्ट एडवोकेट्स-ऑन-रिकॉर्ड बनाम भारत संघ (NJAC)" : "Supreme Court Advocates-on-Record v. Union of India (NJAC)",
      citation: "(2016) 5 SCC 1",
      year: 2015,
      court: language === 'hi' ? "सुप्रीम कोर्ट" : "Supreme Court",
      judge: language === 'hi' ? "5-न्यायाधीशों की संविधान पीठ" : "5-Judge Constitution Bench",
      category: "Constitutional",
      categoryLabel: language === 'hi' ? "संवैधानिक" : "Constitutional",
      keywords: language === 'hi' ? ["न्यायिक नियुक्ति", "NJAC", "कॉलेजियम", "न्यायपालिका की स्वतंत्रता"] : ["Judicial Appointment", "NJAC", "Collegium", "Judicial Independence"],
      summary: language === 'hi' ? "99वें संवैधानिक संशोधन और NJAC अधिनियम को रद्द किया। माना गया कि न्यायपालिका की स्वतंत्रता संविधान की मूल संरचना का हिस्सा है। कॉलेजियम प्रणाली को बहाल किया।" : "Struck down the 99th Constitutional Amendment and the NJAC Act. Held that independence of judiciary is part of the basic structure. Restored the collegium system.",
      significance: language === 'hi' ? "ऐतिहासिक" : "Landmark",
      color: "#00d4ff",
    },
    {
      id: 21,
      title: language === 'hi' ? "रोमेश थापर बनाम मद्रास राज्य" : "Romesh Thappar v. State of Madras",
      citation: "AIR 1950 SC 124",
      year: 1950,
      court: language === 'hi' ? "सुप्रीम कोर्ट" : "Supreme Court",
      judge: "CJ H.J. Kania",
      category: "Media & Speech",
      categoryLabel: language === 'hi' ? "मीडिया और भाषण" : "Media & Speech",
      keywords: language === 'hi' ? ["प्रेस की स्वतंत्रता", "अनुच्छेद 19", "अभिव्यक्ति की स्वतंत्रता"] : ["Press Freedom", "Article 19", "Freedom of Expression"],
      summary: language === 'hi' ? "प्रेस की स्वतंत्रता को अनुच्छेद 19(1)(a) के तहत अभिव्यक्ति की स्वतंत्रता का हिस्सा माना। माना गया कि सार्वजनिक व्यवस्था के आधार पर प्रतिबंध केवल तभी वैध है जब यह राज्य की सुरक्षा को खतरे से जुड़ा हो।" : "Held that freedom of press is part of freedom of expression under Article 19(1)(a). Restriction on grounds of public order is valid only when connected to a threat to the security of the State.",
      significance: language === 'hi' ? "ऐतिहासिक" : "Landmark",
      color: "#4f46e5",
    },
    {
      id: 22,
      title: language === 'hi' ? "अरुणा शानबाग बनाम भारत संघ" : "Aruna Shanbaug v. Union of India",
      citation: "(2011) 4 SCC 454",
      year: 2011,
      court: language === 'hi' ? "सुप्रीम कोर्ट" : "Supreme Court",
      judge: "J. Markandey Katju",
      category: "Fundamental Rights",
      categoryLabel: language === 'hi' ? "मौलिक अधिकार" : "Fundamental Rights",
      keywords: language === 'hi' ? ["इच्छामृत्यु", "जीवन का अधिकार", "अनुच्छेद 21", "गरिमा"] : ["Euthanasia", "Right to Life", "Article 21", "Dignity"],
      summary: language === 'hi' ? "निष्क्रिय इच्छामृत्यु को कड़े दिशानिर्देशों के साथ अनुमति दी। माना गया कि गरिमा के साथ मरने का अधिकार अनुच्छेद 21 के तहत जीवन के अधिकार का हिस्सा है। सक्रिय इच्छामृत्यु को अवैध माना।" : "Permitted passive euthanasia with strict guidelines. Held that the right to die with dignity is part of the right to life under Article 21. Active euthanasia held to be illegal.",
      significance: language === 'hi' ? "ऐतिहासिक" : "Landmark",
      color: "#7c3aed",
    },
    {
      id: 23,
      title: language === 'hi' ? "पीपुल्स यूनियन फॉर सिविल लिबर्टीज बनाम भारत संघ (PUCL)" : "PUCL v. Union of India (Right to Food)",
      citation: "(2003) 2 SCC 1",
      year: 2001,
      court: language === 'hi' ? "सुप्रीम कोर्ट" : "Supreme Court",
      judge: "J. Kirpal",
      category: "Socio-Economic Rights",
      categoryLabel: language === 'hi' ? "सामाजिक-आर्थिक अधिकार" : "Socio-Economic Rights",
      keywords: language === 'hi' ? ["भोजन का अधिकार", "अनुच्छेद 21", "मध्याह्न भोजन", "भूख"] : ["Right to Food", "Article 21", "Mid-Day Meal", "Hunger"],
      summary: language === 'hi' ? "भोजन के अधिकार को अनुच्छेद 21 के तहत जीवन के अधिकार का हिस्सा माना। सभी सरकारी स्कूलों में मध्याह्न भोजन योजना लागू करने का आदेश दिया। खाद्य सुरक्षा कानून की नींव रखी।" : "Held the right to food as part of the right to life under Article 21. Ordered implementation of mid-day meal scheme in all government schools. Laid the foundation for food security legislation.",
      significance: language === 'hi' ? "ऐतिहासिक" : "Landmark",
      color: "#4ade80",
    },
    {
      id: 24,
      title: language === 'hi' ? "नाज फाउंडेशन बनाम दिल्ली सरकार" : "Naz Foundation v. Government of NCT of Delhi",
      citation: "160 (2009) DLT 277",
      year: 2009,
      court: language === 'hi' ? "दिल्ली उच्च न्यायालय" : "Delhi High Court",
      judge: "CJ A.P. Shah",
      category: "Civil Rights",
      categoryLabel: language === 'hi' ? "नागरिक अधिकार" : "Civil Rights",
      keywords: language === 'hi' ? ["धारा 377", "LGBTQ+", "समलैंगिकता", "अनुच्छेद 21"] : ["Section 377", "LGBTQ+", "Homosexuality", "Article 21"],
      summary: language === 'hi' ? "दिल्ली उच्च न्यायालय ने IPC की धारा 377 को वयस्कों के बीच सहमति से समलैंगिक संबंधों के लिए असंवैधानिक माना। यह निर्णय बाद में सुरेश कुमार कौशल मामले में पलट दिया गया, लेकिन नवतेज जौहर मामले में फिर से बहाल किया गया।" : "Delhi High Court held Section 377 IPC unconstitutional for consensual same-sex relations between adults. This was later overruled in Suresh Kumar Koushal but restored in Navtej Johar.",
      significance: language === 'hi' ? "ऐतिहासिक" : "Landmark",
      color: "#f472b6",
    },
    {
      id: 25,
      title: language === 'hi' ? "राजस्थान राज्य बनाम विद्यावती" : "State of Rajasthan v. Vidyawati",
      citation: "AIR 1962 SC 933",
      year: 1962,
      court: language === 'hi' ? "सुप्रीम कोर्ट" : "Supreme Court",
      judge: "J. S.K. Das",
      category: "Fundamental Rights",
      categoryLabel: language === 'hi' ? "मौलिक अधिकार" : "Fundamental Rights",
      keywords: language === 'hi' ? ["राज्य दायित्व", "सरकारी वाहन", "टोर्ट", "मुआवजा"] : ["State Liability", "Government Vehicle", "Tort", "Compensation"],
      summary: language === 'hi' ? "माना गया कि राज्य अपने कर्मचारियों के लापरवाही भरे कार्यों के लिए उत्तरदायी है। सरकारी वाहन से दुर्घटना में मृत्यु के लिए राज्य को मुआवजा देना होगा। राज्य की संप्रभु प्रतिरक्षा को सीमित किया।" : "Held that the State is liable for negligent acts of its employees. State must pay compensation for death caused by a government vehicle accident. Limited the doctrine of sovereign immunity.",
      significance: language === 'hi' ? "ऐतिहासिक" : "Landmark",
      color: "#00b4d8",
    },
    {
      id: 26,
      title: language === 'hi' ? "मोहम्मद अहमद खान बनाम शाह बानो बेगम" : "Mohd. Ahmed Khan v. Shah Bano Begum",
      citation: "AIR 1985 SC 945",
      year: 1985,
      court: language === 'hi' ? "सुप्रीम कोर्ट" : "Supreme Court",
      judge: "CJ Y.V. Chandrachud",
      category: "Women's Rights",
      categoryLabel: language === 'hi' ? "महिलाओं के अधिकार" : "Women's Rights",
      keywords: language === 'hi' ? ["शाह बानो", "मुस्लिम महिला", "भरण-पोषण", "धारा 125 CrPC"] : ["Shah Bano", "Muslim Women", "Maintenance", "Section 125 CrPC"],
      summary: language === 'hi' ? "माना गया कि तलाकशुदा मुस्लिम महिला धारा 125 CrPC के तहत भरण-पोषण की हकदार है। इस निर्णय के बाद मुस्लिम महिला (तलाक पर अधिकारों का संरक्षण) अधिनियम 1986 पारित किया गया। महिलाओं के अधिकारों और धार्मिक कानून के बीच तनाव को उजागर किया।" : "Held that a divorced Muslim woman is entitled to maintenance under Section 125 CrPC. Led to the Muslim Women (Protection of Rights on Divorce) Act 1986. Highlighted the tension between women's rights and personal law.",
      significance: language === 'hi' ? "ऐतिहासिक" : "Landmark",
      color: "#f472b6",
    },
    {
      id: 27,
      title: language === 'hi' ? "उनिकृष्णन बनाम आंध्र प्रदेश राज्य" : "Unnikrishnan v. State of Andhra Pradesh",
      citation: "AIR 1993 SC 2178",
      year: 1993,
      court: language === 'hi' ? "सुप्रीम कोर्ट" : "Supreme Court",
      judge: "J. B.P. Jeevan Reddy",
      category: "Fundamental Rights",
      categoryLabel: language === 'hi' ? "मौलिक अधिकार" : "Fundamental Rights",
      keywords: language === 'hi' ? ["शिक्षा का अधिकार", "अनुच्छेद 21", "निजी स्कूल", "फीस"] : ["Right to Education", "Article 21", "Private Schools", "Fees"],
      summary: language === 'hi' ? "माना गया कि शिक्षा का अधिकार अनुच्छेद 21 के तहत जीवन के अधिकार का हिस्सा है। 14 वर्ष तक के बच्चों को मुफ्त और अनिवार्य शिक्षा का अधिकार है। बाद में अनुच्छेद 21A और शिक्षा का अधिकार अधिनियम 2009 की नींव रखी।" : "Held that the right to education is part of the right to life under Article 21. Children up to 14 years have the right to free and compulsory education. Laid the foundation for Article 21A and the Right to Education Act 2009.",
      significance: language === 'hi' ? "ऐतिहासिक" : "Landmark",
      color: "#00d4ff",
    },
    {
      id: 28,
      title: language === 'hi' ? "एम. नागराज बनाम भारत संघ" : "M. Nagaraj v. Union of India",
      citation: "(2006) 8 SCC 212",
      year: 2006,
      court: language === 'hi' ? "सुप्रीम कोर्ट" : "Supreme Court",
      judge: language === 'hi' ? "5-न्यायाधीशों की संविधान पीठ" : "5-Judge Constitution Bench",
      category: "Reservation",
      categoryLabel: language === 'hi' ? "आरक्षण" : "Reservation",
      keywords: language === 'hi' ? ["SC/ST पदोन्नति आरक्षण", "अनुच्छेद 16(4A)", "पिछड़ापन", "अपर्याप्त प्रतिनिधित्व"] : ["SC/ST Promotion Reservation", "Article 16(4A)", "Backwardness", "Inadequate Representation"],
      summary: language === 'hi' ? "SC/ST के लिए पदोन्नति में आरक्षण को बरकरार रखा लेकिन शर्तें लगाईं। राज्य को पिछड़ापन, अपर्याप्त प्रतिनिधित्व और प्रशासनिक दक्षता पर डेटा एकत्र करना होगा। क्रीमी लेयर अवधारणा SC/ST पर लागू नहीं होती।" : "Upheld reservation in promotion for SC/ST but imposed conditions. State must collect data on backwardness, inadequate representation, and administrative efficiency. Creamy layer concept does not apply to SC/ST.",
      significance: language === 'hi' ? "ऐतिहासिक" : "Landmark",
      color: "#4ade80",
    },
    {
      id: 29,
      title: language === 'hi' ? "सुभाष कुमार बनाम बिहार राज्य" : "Subhash Kumar v. State of Bihar",
      citation: "AIR 1991 SC 420",
      year: 1991,
      court: language === 'hi' ? "सुप्रीम कोर्ट" : "Supreme Court",
      judge: "J. K.N. Singh",
      category: "Environment",
      categoryLabel: language === 'hi' ? "पर्यावरण" : "Environment",
      keywords: language === 'hi' ? ["स्वच्छ पर्यावरण", "अनुच्छेद 21", "जल प्रदूषण", "जनहित याचिका"] : ["Clean Environment", "Article 21", "Water Pollution", "PIL"],
      summary: language === 'hi' ? "माना गया कि प्रदूषण मुक्त पानी और हवा का अधिकार अनुच्छेद 21 के तहत जीवन के अधिकार का हिस्सा है। पर्यावरण संरक्षण के लिए जनहित याचिका दायर करने का अधिकार स्थापित किया।" : "Held that the right to pollution-free water and air is part of the right to life under Article 21. Established the right to file PIL for environmental protection.",
      significance: language === 'hi' ? "ऐतिहासिक" : "Landmark",
      color: "#4ade80",
    },
    {
      id: 30,
      title: language === 'hi' ? "पीपुल्स यूनियन फॉर डेमोक्रेटिक राइट्स बनाम भारत संघ (ASIAD)" : "PUDR v. Union of India (ASIAD Workers)",
      citation: "AIR 1982 SC 1473",
      year: 1982,
      court: language === 'hi' ? "सुप्रीम कोर्ट" : "Supreme Court",
      judge: "J. P.N. Bhagwati",
      category: "Socio-Economic Rights",
      categoryLabel: language === 'hi' ? "सामाजिक-आर्थिक अधिकार" : "Socio-Economic Rights",
      keywords: language === 'hi' ? ["न्यूनतम मजदूरी", "बाल श्रम", "अनुच्छेद 23", "ASIAD"] : ["Minimum Wages", "Child Labour", "Article 23", "ASIAD"],
      summary: language === 'hi' ? "ASIAD निर्माण स्थलों पर श्रमिकों के शोषण के खिलाफ। माना गया कि न्यूनतम मजदूरी से कम भुगतान बलात् श्रम है। बाल श्रम को अनुच्छेद 24 का उल्लंघन माना। जनहित याचिका के माध्यम से श्रमिकों के अधिकारों की रक्षा।" : "Against exploitation of workers at ASIAD construction sites. Held that payment below minimum wages constitutes forced labour. Child labour held to be violation of Article 24. Protection of workers rights through PIL.",
      significance: language === 'hi' ? "ऐतिहासिक" : "Landmark",
      color: "#f59e0b",
    },
  ], [language]);

  const filtered = allCases.filter((c) => {
    const matchSearch =
      !search ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.keywords.some((k) => k.toLowerCase().includes(search.toLowerCase())) ||
      c.summary.toLowerCase().includes(search.toLowerCase());

    const matchCategory = selectedCategory === "All" || c.category === selectedCategory;

    const matchYear =
      selectedYear === "All Years" ||
      (selectedYear === "2020s" && c.year >= 2020) ||
      (selectedYear === "2010s" && c.year >= 2010 && c.year < 2020) ||
      (selectedYear === "2000s" && c.year >= 2000 && c.year < 2010) ||
      (selectedYear === "1990s" && c.year >= 1990 && c.year < 2000) ||
      (selectedYear === "1980s" && c.year >= 1980 && c.year < 1990) ||
      (selectedYear === "1970s" && c.year >= 1970 && c.year < 1980) ||
      (selectedYear === "Pre-1970" && c.year < 1970);

    return matchSearch && matchCategory && matchYear;
  });

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px 80px" }}>

      {/* Page Header */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <div className="badge-cyan" style={{ marginBottom: "16px" }}>
          <Gavel size={13} />
          {t.badge}
        </div>
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, marginBottom: "12px", color: "#e8f4fd" }}>
          {t.title}
          <span className="text-cyan-gradient">{t.titleHighlight}</span>
        </h1>
        <p style={{ fontSize: "1rem", color: "#7ea8c9", maxWidth: "520px", margin: "0 auto" }}>
          {t.description}
        </p>
      </div>

      {/* Filter Bar */}
      <div
        style={{
          background: "rgba(10, 22, 40, 0.85)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(0, 212, 255, 0.15)",
          borderRadius: "16px",
          padding: "20px 24px",
          marginBottom: "28px",
          display: "flex",
          flexWrap: "wrap",
          gap: "14px",
          alignItems: "center",
        }}
      >
        {/* Search */}
        <div
          style={{
            flex: "1 1 240px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "rgba(0, 212, 255, 0.04)",
            border: "1px solid rgba(0, 212, 255, 0.18)",
            borderRadius: "10px",
            padding: "10px 16px",
          }}
        >
          <Search size={16} color="#00d4ff" style={{ flexShrink: 0 }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.searchPlaceholder}
            style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: "0.9rem", color: "#e8f4fd" }}
          />
        </div>

        {/* Year Filter */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            style={{
              appearance: "none",
              padding: "10px 36px 10px 14px",
              borderRadius: "10px",
              fontSize: "0.875rem",
              outline: "none",
              cursor: "pointer",
              background: "rgba(0, 212, 255, 0.06)",
              border: "1px solid rgba(0, 212, 255, 0.18)",
              color: "#e8f4fd",
              fontWeight: 500,
            }}
          >
            {yearFilters.map((y) => (
              <option key={y.id} value={y.id} style={{ background: "#0a1628" }}>{y.label}</option>
            ))}
          </select>
          <ChevronDown size={14} color="#00d4ff" style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
        </div>

        {/* Category Filter */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              appearance: "none",
              padding: "10px 36px 10px 14px",
              borderRadius: "10px",
              fontSize: "0.875rem",
              outline: "none",
              cursor: "pointer",
              background: "rgba(0, 212, 255, 0.06)",
              border: "1px solid rgba(0, 212, 255, 0.18)",
              color: "#e8f4fd",
              fontWeight: 500,
            }}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id} style={{ background: "#0a1628" }}>{c.label}</option>
            ))}
          </select>
          <ChevronDown size={14} color="#00d4ff" style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
        </div>
      </div>

      {/* Results count */}
      <p style={{ fontSize: "0.85rem", color: "#4a6a8a", marginBottom: "16px" }}>
        {filtered.length} {t.casesFound}
      </p>

      {/* Cases List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {filtered.map((c) => (
          <div
            key={c.id}
            style={{
              background: "rgba(10, 22, 40, 0.85)",
              backdropFilter: "blur(16px)",
              border: `1px solid ${expandedCase === c.id ? c.color + "40" : "rgba(0, 212, 255, 0.12)"}`,
              borderRadius: "16px",
              overflow: "hidden",
              transition: "border-color 0.2s ease",
            }}
          >
            {/* Case Header — clickable */}
            <button
              onClick={() => setExpandedCase(expandedCase === c.id ? null : c.id)}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "20px 24px",
                background: expandedCase === c.id ? `${c.color}06` : "transparent",
                border: "none",
                cursor: "pointer",
                transition: "background 0.2s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px" }}>
                <div style={{ flex: 1 }}>
                  {/* Badges */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "10px" }}>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        padding: "3px 10px",
                        borderRadius: "50px",
                        background: `${c.color}15`,
                        color: c.color,
                        border: `1px solid ${c.color}35`,
                      }}
                    >
                      {c.categoryLabel}
                    </span>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        padding: "3px 10px",
                        borderRadius: "50px",
                        background: "rgba(255, 77, 109, 0.12)",
                        color: "#ff4d6d",
                        border: "1px solid rgba(255, 77, 109, 0.25)",
                      }}
                    >
                      {c.significance}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#e8f4fd", marginBottom: "4px", lineHeight: 1.3 }}>
                    {c.title}
                  </h3>
                  <p style={{ fontSize: "0.78rem", color: c.color, marginBottom: "10px", fontWeight: 600 }}>
                    {c.citation}
                  </p>

                  {/* Meta */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", fontSize: "0.78rem", color: "#4a6a8a" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <Calendar size={12} color={c.color} /> {c.year}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <User size={12} color={c.color} /> {c.judge}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <Gavel size={12} color={c.color} /> {c.court}
                    </span>
                  </div>

                  {/* Keywords */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "12px" }}>
                    {c.keywords.map((kw) => (
                      <span
                        key={kw}
                        style={{
                          fontSize: "0.7rem",
                          padding: "3px 8px",
                          borderRadius: "6px",
                          background: "rgba(255,255,255,0.04)",
                          color: "#4a6a8a",
                          border: "1px solid rgba(255,255,255,0.07)",
                        }}
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <ChevronDown
                  size={18}
                  color="#00d4ff"
                  style={{
                    flexShrink: 0,
                    transform: expandedCase === c.id ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.25s ease",
                    marginTop: "4px",
                  }}
                />
              </div>
            </button>

            {/* Expanded Summary */}
            {expandedCase === c.id && (
              <div
                style={{
                  padding: "0 24px 24px",
                  borderTop: `1px solid ${c.color}20`,
                }}
              >
                <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: c.color, marginBottom: "10px", marginTop: "16px" }}>
                  {t.summaryTitle}
                </h4>
                <p style={{ fontSize: "0.9rem", color: "#7ea8c9", lineHeight: 1.75 }}>
                  {c.summary}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <Gavel size={48} color="rgba(0,212,255,0.2)" style={{ margin: "0 auto 16px", display: "block" }} />
          <p style={{ fontSize: "1rem", color: "#7ea8c9" }}>{t.noResults}</p>
        </div>
      )}
    </div>
  );
}
