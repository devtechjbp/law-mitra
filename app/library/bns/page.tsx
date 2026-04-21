"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ChevronRight, BookOpen, ArrowLeft, Scale } from "lucide-react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { translations } from "@/translations";

type S = { num:string; title:string; titleHi:string; summary:string; summaryHi:string; punishment?:string; punishmentHi?:string };
type C = { id:string; chapter:string; chapterHi:string; sections:S[] };

const CHAPTERS: C[] = [
  { id:"ch-1", chapter:"Chapter I — Preliminary", chapterHi:"अध्याय I — प्रारंभिक", sections:[
    { num:"1", title:"Short title, commencement and application", titleHi:"संक्षिप्त नाम, प्रारंभ और लागू होना", summary:"Called the Bharatiya Nyaya Sanhita 2023. Came into force on July 1, 2024. Applies to whole of India including J&K.", summaryHi:"भारतीय न्याय संहिता 2023 — 1 जुलाई 2024 से लागू। जम्मू-कश्मीर सहित पूरे भारत पर लागू।" },
    { num:"2", title:"Definitions", titleHi:"परिभाषाएं", summary:"Child = under 18. Document includes electronic records. Gender includes transgender. Injury = harm to body/mind/reputation/property.", summaryHi:"बच्चा = 18 वर्ष से कम। दस्तावेज़ में इलेक्ट्रॉनिक रिकॉर्ड शामिल। लिंग में ट्रांसजेंडर शामिल।" },
  ]},
  { id:"ch-2", chapter:"Chapter II — Punishments", chapterHi:"अध्याय II — दंड", sections:[
    { num:"4", title:"Punishments", titleHi:"दंड के प्रकार", summary:"(a) Death (b) Life imprisonment (c) Imprisonment rigorous or simple (d) Forfeiture of property (e) Fine (f) Community service — NEW, not in IPC 1860.", summaryHi:"(क) मृत्युदंड (ख) आजीवन कारावास (ग) कारावास (घ) संपत्ति जब्ती (ङ) जुर्माना (च) सामुदायिक सेवा — IPC में नहीं थी।" },
    { num:"5", title:"Community Service", titleHi:"सामुदायिक सेवा", summary:"Work directed by court for benefit of community without remuneration. Alternative to imprisonment for minor offences.", summaryHi:"न्यायालय द्वारा निर्देशित समाज की भलाई के लिए बिना पारिश्रमिक का कार्य। छोटे अपराधों के लिए जेल का विकल्प।" },
    { num:"6", title:"Imprisonment for life", titleHi:"आजीवन कारावास", summary:"Imprisonment for the remainder of the convicted person's natural life unless remitted by Government.", summaryHi:"दोषी के शेष प्राकृतिक जीवन के लिए कारावास, जब तक सरकार द्वारा माफ न किया जाए।" },
    { num:"8", title:"Fine — default imprisonment", titleHi:"जुर्माना — चूक पर कारावास", summary:"Where fine is not paid, court may order imprisonment in default. Fine may be unlimited where not specified.", summaryHi:"जुर्माना न देने पर न्यायालय चूक में कारावास का आदेश दे सकता है।" },
  ]},
  { id:"ch-3", chapter:"Chapter III — General Exceptions", chapterHi:"अध्याय III — सामान्य अपवाद", sections:[
    { num:"14", title:"Act of child under seven years", titleHi:"सात वर्ष से कम आयु के बच्चे का कार्य", summary:"Nothing is an offence done by a child under 7 years of age. No criminal liability below age 7.", summaryHi:"7 वर्ष से कम आयु के बच्चे द्वारा किया गया कोई भी कार्य अपराध नहीं।" },
    { num:"15", title:"Act of child above seven and under twelve", titleHi:"सात से बारह वर्ष के बच्चे का कार्य", summary:"Child above 7 and under 12 who has not attained sufficient maturity to judge the nature of the act is not criminally liable.", summaryHi:"7 से 12 वर्ष का बच्चा जिसने पर्याप्त परिपक्वता नहीं पाई — आपराधिक रूप से उत्तरदायी नहीं।" },
    { num:"16", title:"Act of person of unsound mind", titleHi:"विकृतचित्त व्यक्ति का कार्य", summary:"Nothing is an offence done by a person who at the time of doing it by reason of unsoundness of mind is incapable of knowing the nature of the act.", summaryHi:"विकृतचित्त व्यक्ति जो कार्य की प्रकृति न जान सके — अपराध नहीं।" },
    { num:"17", title:"Act of intoxication", titleHi:"नशे की अवस्था में किया गया कार्य", summary:"Intoxication is a defence only if the substance was administered without the person's knowledge or against their will.", summaryHi:"नशा तभी बचाव है जब पदार्थ व्यक्ति की जानकारी के बिना या इच्छा के विरुद्ध दिया गया हो।" },
    { num:"34", title:"Right of private defence", titleHi:"निजी प्रतिरक्षा का अधिकार", summary:"Every person has the right to defend their own body and property and that of others. Right extends to causing death when there is reasonable apprehension of death or grievous hurt.", summaryHi:"प्रत्येक व्यक्ति को अपने और दूसरों के शरीर और संपत्ति की रक्षा का अधिकार। मृत्यु या गंभीर चोट की आशंका पर मृत्यु कारित करने तक का अधिकार।" },
  ]},
  { id:"ch-4", chapter:"Chapter IV — Abetment and Criminal Conspiracy", chapterHi:"अध्याय IV — दुष्प्रेरण और आपराधिक षड्यंत्र", sections:[
    { num:"45", title:"Abetment of a thing", titleHi:"दुष्प्रेरण", summary:"A person abets an offence who: (a) instigates another to commit it; (b) engages in conspiracy; (c) intentionally aids by act or omission.", summaryHi:"दुष्प्रेरण: (क) उकसाना (ख) षड्यंत्र में भाग लेना (ग) जानबूझकर कार्य या चूक से सहायता करना।" },
    { num:"61", title:"Criminal conspiracy", titleHi:"आपराधिक षड्यंत्र", summary:"When two or more persons agree to do an illegal act or a legal act by illegal means, they conspire. If conspiracy to commit offence punishable with death/life — same punishment as that offence.", summaryHi:"दो या अधिक व्यक्तियों का अवैध कार्य करने पर सहमत होना। मृत्युदंड/आजीवन वाले अपराध के षड्यंत्र पर — उसी अपराध जितना दंड।", punishment:"Up to 6 months or fine or both", punishmentHi:"6 माह तक या जुर्माना या दोनों" },
  ]},
  { id:"ch-5", chapter:"Chapter V — Offences Against State", chapterHi:"अध्याय V — राज्य के विरुद्ध अपराध", sections:[
    { num:"147", title:"Waging war against Government of India", titleHi:"भारत सरकार के विरुद्ध युद्ध छेड़ना", summary:"Whoever wages war against the Government of India or attempts to wage such war or abets the waging of such war shall be punished with death or imprisonment for life.", summaryHi:"भारत सरकार के विरुद्ध युद्ध छेड़ना, प्रयास या दुष्प्रेरण — मृत्युदंड या आजीवन कारावास।", punishment:"Death or life imprisonment", punishmentHi:"मृत्युदंड या आजीवन कारावास" },
    { num:"152", title:"Acts endangering sovereignty, unity and integrity of India", titleHi:"भारत की संप्रभुता, एकता और अखंडता को खतरे में डालने वाले कार्य", summary:"Whoever excites secession, armed rebellion or subversive activities. REPLACES old sedition law IPC Section 124A.", summaryHi:"अलगाव, सशस्त्र विद्रोह या विध्वंसक गतिविधियों को उकसाना। पुराने राजद्रोह कानून IPC 124A का स्थान लेता है।", punishment:"Life imprisonment or up to 7 years + fine", punishmentHi:"आजीवन कारावास या 7 वर्ष तक + जुर्माना" },
  ]},
  { id:"ch-6", chapter:"Chapter VI — Organised Crime and Terrorism (NEW)", chapterHi:"अध्याय VI — संगठित अपराध और आतंकवाद (नया)", sections:[
    { num:"111", title:"Organised crime", titleHi:"संगठित अपराध", summary:"NEW in BNS. Continuing unlawful activity by a syndicate using violence, intimidation, coercion. If it causes death: death or life. Min fine Rs 5 lakh.", summaryHi:"BNS में नया। संगठित अपराध सिंडिकेट द्वारा हिंसा, धमकी, जबरदस्ती। मृत्यु होने पर: मृत्युदंड या आजीवन। न्यूनतम जुर्माना: 5 लाख।", punishment:"Death or life if causes death; otherwise 5 yrs to life + min Rs 5 lakh fine", punishmentHi:"मृत्यु होने पर मृत्युदंड या आजीवन; अन्यथा 5 वर्ष से आजीवन + न्यूनतम 5 लाख" },
    { num:"113", title:"Terrorist act", titleHi:"आतंकवादी कार्य", summary:"NEW in BNS. Whoever commits a terrorist act intending to threaten unity/integrity/security of India or to strike terror in people.", summaryHi:"BNS में नया। भारत की एकता/अखंडता/सुरक्षा को खतरा या लोगों में आतंक फैलाने का इरादा।", punishment:"Death or life if causes death; otherwise life + fine", punishmentHi:"मृत्यु होने पर मृत्युदंड या आजीवन; अन्यथा आजीवन + जुर्माना" },
    { num:"117", title:"Petty organised crime", titleHi:"छोटे संगठित अपराध", summary:"NEW in BNS. Organised pickpocketing, snatching, card skimming, illegal SIM card sales committed by a group.", summaryHi:"BNS में नया। संगठित जेब कतरना, छीनाझपटी, कार्ड स्किमिंग, अवैध SIM बिक्री।", punishment:"1 to 7 years + fine", punishmentHi:"1 से 7 वर्ष + जुर्माना" },
  ]},
  { id:"ch-7", chapter:"Chapter VII — Offences Against Public Tranquility", chapterHi:"अध्याय VII — लोक शांति के विरुद्ध अपराध", sections:[
    { num:"189", title:"Unlawful assembly", titleHi:"विधिविरुद्ध जमाव", summary:"Assembly of 5 or more persons is unlawful if common object is to overawe government, resist legal process, commit mischief, or use force to compel any person.", summaryHi:"5 या अधिक व्यक्तियों का जमाव विधिविरुद्ध है यदि उद्देश्य सरकार को डराना, कानूनी प्रक्रिया का विरोध, शरारत या बल प्रयोग हो।" },
    { num:"191", title:"Rioting", titleHi:"दंगा", summary:"When a mob of 5 or more uses force or violence in prosecution of a common object, every member is guilty of rioting.", summaryHi:"5 या अधिक का दल जब सामान्य उद्देश्य में बल या हिंसा का प्रयोग करे — प्रत्येक सदस्य दंगे का दोषी।", punishment:"Up to 2 years or fine or both", punishmentHi:"2 वर्ष तक या जुर्माना या दोनों" },
    { num:"197", title:"Promoting enmity between groups", titleHi:"समूहों के बीच शत्रुता को बढ़ावा देना", summary:"Whoever promotes enmity between different groups on grounds of religion, race, place of birth, residence, language, caste or community.", summaryHi:"धर्म, जाति, जन्म स्थान, भाषा के आधार पर समूहों में शत्रुता बढ़ाना।", punishment:"Up to 3 years or fine; in place of worship: up to 5 years + fine", punishmentHi:"3 वर्ष तक या जुर्माना; पूजा स्थल पर: 5 वर्ष तक + जुर्माना" },
  ]},
  { id:"ch-8", chapter:"Chapter VIII — Offences Against Human Body", chapterHi:"अध्याय VIII — मानव शरीर के विरुद्ध अपराध", sections:[
    { num:"100", title:"Culpable homicide", titleHi:"आपराधिक मानव वध", summary:"Whoever causes death by doing an act with intention of causing death, or with intention of causing bodily injury likely to cause death, commits culpable homicide.", summaryHi:"मृत्यु कारित करने के इरादे से या ऐसी शारीरिक चोट के इरादे से जो मृत्यु का कारण बन सकती है — आपराधिक मानव वध।" },
    { num:"101", title:"Murder", titleHi:"हत्या", summary:"Culpable homicide is murder if: done with intention of causing death; or causing bodily injury sufficient in ordinary course to cause death; or done with knowledge that it is imminently dangerous.", summaryHi:"आपराधिक मानव वध हत्या है यदि: मृत्यु का इरादा हो; या ऐसी चोट जो सामान्यतः मृत्यु का कारण बने।" },
    { num:"103", title:"Punishment for murder", titleHi:"हत्या के लिए दंड", summary:"Murder: death or life imprisonment + fine. Mob lynching (group of 5 or more): each member punished with death or life imprisonment.", summaryHi:"हत्या: मृत्युदंड या आजीवन + जुर्माना। मॉब लिंचिंग (5 या अधिक): प्रत्येक सदस्य को मृत्युदंड या आजीवन।", punishment:"Death or life + fine; Mob lynching: death or life", punishmentHi:"मृत्युदंड या आजीवन + जुर्माना; मॉब लिंचिंग: मृत्युदंड या आजीवन" },
    { num:"104", title:"Culpable homicide not amounting to murder", titleHi:"हत्या की कोटि में न आने वाला आपराधिक मानव वध", summary:"Whoever commits culpable homicide not amounting to murder shall be punished with life imprisonment or imprisonment up to 10 years and fine.", summaryHi:"हत्या की कोटि में न आने वाला आपराधिक मानव वध — आजीवन कारावास या 10 वर्ष तक और जुर्माना।", punishment:"Life or up to 10 years + fine", punishmentHi:"आजीवन या 10 वर्ष तक + जुर्माना" },
    { num:"105", title:"Causing death by negligence", titleHi:"उपेक्षा द्वारा मृत्यु", summary:"Whoever causes death by rash or negligent act: up to 5 years + fine. Registered medical practitioner during medical procedure: up to 2 years + fine.", summaryHi:"उतावलेपन या उपेक्षा से मृत्यु — 5 वर्ष तक। पंजीकृत चिकित्सक द्वारा चिकित्सा प्रक्रिया में: 2 वर्ष तक।", punishment:"Up to 5 years + fine; Doctor during procedure: up to 2 years", punishmentHi:"5 वर्ष तक + जुर्माना; चिकित्सक: 2 वर्ष तक" },
    { num:"109", title:"Attempt to murder", titleHi:"हत्या का प्रयास", summary:"Whoever attempts to commit murder: up to 10 years + fine. If the attempt causes hurt to any person: up to life imprisonment.", summaryHi:"हत्या का प्रयास — 10 वर्ष तक + जुर्माना। यदि प्रयास से चोट हो: आजीवन कारावास तक।", punishment:"Up to 10 years + fine; if hurt caused: life imprisonment", punishmentHi:"10 वर्ष तक + जुर्माना; चोट होने पर: आजीवन" },
    { num:"115", title:"Voluntarily causing grievous hurt", titleHi:"स्वेच्छया घोर उपहति", summary:"Grievous hurt includes: emasculation, permanent loss of sight or hearing, loss of limb, permanent disfiguration of face, fracture of bone, any hurt endangering life.", summaryHi:"घोर उपहति: नपुंसकता, दृष्टि/श्रवण की स्थायी हानि, अंग की हानि, चेहरे का स्थायी विरूपण, हड्डी का फ्रैक्चर।", punishment:"Up to 7 years + fine", punishmentHi:"7 वर्ष तक + जुर्माना" },
    { num:"118", title:"Voluntarily causing hurt", titleHi:"स्वेच्छया उपहति", summary:"Whoever voluntarily causes hurt shall be punished with imprisonment up to 1 year or fine up to Rs 10,000 or both.", summaryHi:"स्वेच्छया उपहति — 1 वर्ष तक या 10,000 रुपये जुर्माना या दोनों।", punishment:"Up to 1 year or fine up to Rs 10,000 or both", punishmentHi:"1 वर्ष तक या 10,000 रुपये जुर्माना या दोनों" },
    { num:"124", title:"Acid attack", titleHi:"तेजाब हमला", summary:"Whoever throws or administers acid on any person with intent to cause permanent damage, deformity, burns or disfigurement. Min 10 years to life + fine min Rs 10 lakh for medical expenses.", summaryHi:"तेजाब हमला — न्यूनतम 10 वर्ष से आजीवन + न्यूनतम 10 लाख रुपये जुर्माना चिकित्सा खर्च के लिए।", punishment:"Min 10 years to life + fine min Rs 10 lakh", punishmentHi:"न्यूनतम 10 वर्ष से आजीवन + न्यूनतम 10 लाख रुपये जुर्माना" },
    { num:"130", title:"Kidnapping", titleHi:"अपहरण", summary:"Kidnapping from India: taking any person beyond limits of India without consent. Kidnapping from lawful guardianship: taking any minor out of keeping of lawful guardian without consent.", summaryHi:"भारत से अपहरण: बिना सहमति के किसी को भारत की सीमाओं से बाहर ले जाना। वैध संरक्षकता से अपहरण: नाबालिग को संरक्षक की सहमति के बिना ले जाना।" },
    { num:"137", title:"Kidnapping or abducting in order to murder", titleHi:"हत्या के लिए अपहरण", summary:"Whoever kidnaps or abducts any person in order that such person may be murdered shall be punished with death or life imprisonment and fine.", summaryHi:"हत्या के लिए अपहरण — मृत्युदंड या आजीवन कारावास और जुर्माना।", punishment:"Death or life imprisonment + fine", punishmentHi:"मृत्युदंड या आजीवन कारावास + जुर्माना" },
    { num:"143", title:"Trafficking of person", titleHi:"व्यक्ति की तस्करी", summary:"Whoever recruits, transports, harbours or receives a person by means of threat, force, fraud or deception for exploitation commits trafficking. Child victim: min 10 years to life.", summaryHi:"धमकी, बल, धोखाधड़ी से व्यक्ति की तस्करी। पीड़ित बच्चा हो तो: न्यूनतम 10 वर्ष से आजीवन।", punishment:"Min 7 years to life + fine; child victim: min 10 years to life", punishmentHi:"न्यूनतम 7 वर्ष से आजीवन + जुर्माना; बच्चा पीड़ित: न्यूनतम 10 वर्ष से आजीवन" },
  ]},
  { id:"ch-9", chapter:"Chapter IX — Offences Against Women and Children", chapterHi:"अध्याय IX — महिलाओं और बच्चों के विरुद्ध अपराध", sections:[
    { num:"63", title:"Rape", titleHi:"बलात्कार", summary:"A man is said to commit rape if he penetrates without consent or against will. Punishment: min 10 years to life + fine.", summaryHi:"बिना सहमति या इच्छा के विरुद्ध — बलात्कार। दंड: न्यूनतम 10 वर्ष से आजीवन + जुर्माना।", punishment:"Min 10 years to life + fine", punishmentHi:"न्यूनतम 10 वर्ष से आजीवन + जुर्माना" },
    { num:"70", title:"Gang rape", titleHi:"सामूहिक बलात्कार", summary:"Where a woman is raped by one or more persons constituting a group, each person shall be deemed to have committed rape. Punishment: min 20 years to life natural life + fine.", summaryHi:"एक या अधिक व्यक्तियों द्वारा सामूहिक बलात्कार — प्रत्येक व्यक्ति दोषी। दंड: न्यूनतम 20 वर्ष से आजीवन + जुर्माना।", punishment:"Min 20 years to life natural life + fine", punishmentHi:"न्यूनतम 20 वर्ष से आजीवन + जुर्माना" },
    { num:"74", title:"Assault or criminal force to outrage modesty of woman", titleHi:"महिला की लज्जा भंग करने के इरादे से हमला", summary:"Whoever assaults or uses criminal force to any woman intending to outrage her modesty. Punishment: min 1 year to 5 years + fine.", summaryHi:"महिला की लज्जा भंग करने के इरादे से हमला — न्यूनतम 1 वर्ष से 5 वर्ष तक और जुर्माना।", punishment:"Min 1 year to 5 years + fine", punishmentHi:"न्यूनतम 1 वर्ष से 5 वर्ष + जुर्माना" },
    { num:"75", title:"Sexual harassment", titleHi:"यौन उत्पीड़न", summary:"Any man who makes unwelcome physical contact, demand for sexual favours, shows pornography, or makes sexually coloured remarks commits sexual harassment.", summaryHi:"अवांछित शारीरिक संपर्क, यौन एहसान की मांग, अश्लील सामग्री दिखाना, यौन टिप्पणी — यौन उत्पीड़न।", punishment:"Up to 3 years or fine or both", punishmentHi:"3 वर्ष तक या जुर्माना या दोनों" },
    { num:"77", title:"Voyeurism", titleHi:"दृश्यरतिकता", summary:"Whoever watches or captures the image of a woman engaging in a private act without her consent commits voyeurism.", summaryHi:"महिला की निजी अवस्था में बिना सहमति के देखना या छवि कैप्चर करना।", punishment:"1st offence: 1-3 years + fine; subsequent: 3-7 years + fine", punishmentHi:"पहली बार: 1-3 वर्ष + जुर्माना; बाद में: 3-7 वर्ष + जुर्माना" },
    { num:"78", title:"Stalking", titleHi:"पीछा करना", summary:"Any man who follows a woman and contacts or attempts to contact her repeatedly despite a clear indication of disinterest commits stalking.", summaryHi:"महिला का बार-बार पीछा करना या संपर्क करने का प्रयास करना।", punishment:"1st offence: up to 3 years + fine; subsequent: up to 5 years + fine", punishmentHi:"पहली बार: 3 वर्ष तक + जुर्माना; बाद में: 5 वर्ष तक + जुर्माना" },
    { num:"84", title:"Dowry death", titleHi:"दहेज मृत्यु", summary:"Where the death of a woman is caused by burns or bodily injury within 7 years of marriage and it is shown that she was subjected to cruelty or harassment for dowry, it is dowry death.", summaryHi:"विवाह के 7 वर्ष के भीतर जलने या शारीरिक चोट से मृत्यु और दहेज के लिए क्रूरता — दहेज मृत्यु।", punishment:"Min 7 years to life imprisonment", punishmentHi:"न्यूनतम 7 वर्ष से आजीवन कारावास" },
    { num:"85", title:"Husband or relative subjecting woman to cruelty", titleHi:"पति या रिश्तेदार द्वारा क्रूरता", summary:"Whoever being the husband or relative of the husband subjects a woman to cruelty — wilful conduct likely to drive her to suicide, or harassment for dowry.", summaryHi:"पति या उसके रिश्तेदार द्वारा क्रूरता — आत्महत्या के लिए प्रेरित करने वाला आचरण या दहेज के लिए उत्पीड़न।", punishment:"Up to 3 years + fine", punishmentHi:"3 वर्ष तक + जुर्माना" },
  ]},
  { id:"ch-10", chapter:"Chapter X — Offences Against Property", chapterHi:"अध्याय X — संपत्ति के विरुद्ध अपराध", sections:[
    { num:"303", title:"Theft", titleHi:"चोरी", summary:"Whoever intending to take dishonestly any movable property out of the possession of any person without that person's consent commits theft.", summaryHi:"किसी व्यक्ति की सहमति के बिना उसके कब्जे से चल संपत्ति बेईमानी से लेना — चोरी।", punishment:"Up to 3 years or fine or both", punishmentHi:"3 वर्ष तक या जुर्माना या दोनों" },
    { num:"304", title:"Theft in dwelling house", titleHi:"आवास में चोरी", summary:"Whoever commits theft in any building, tent or vessel used as a human dwelling or for custody of property shall be punished with imprisonment up to 7 years and fine.", summaryHi:"मानव आवास या संपत्ति की अभिरक्षा के लिए उपयोग किए जाने वाले भवन, तंबू या जहाज में चोरी — 7 वर्ष तक और जुर्माना।", punishment:"Up to 7 years + fine", punishmentHi:"7 वर्ष तक + जुर्माना" },
    { num:"309", title:"Dacoity", titleHi:"डकैती", summary:"When five or more persons conjointly commit or attempt to commit robbery, every person is said to commit dacoity.", summaryHi:"पांच या अधिक व्यक्तियों द्वारा संयुक्त रूप से डकैती — आजीवन कारावास या 10 वर्ष तक + जुर्माना।", punishment:"Life or up to 10 years + fine", punishmentHi:"आजीवन या 10 वर्ष तक + जुर्माना" },
    { num:"316", title:"Criminal breach of trust", titleHi:"आपराधिक न्यासभंग", summary:"Whoever being entrusted with property dishonestly misappropriates or converts it to his own use commits criminal breach of trust.", summaryHi:"संपत्ति की अभिरक्षा सौंपे जाने पर बेईमानी से उसका दुरुपयोग — आपराधिक न्यासभंग।", punishment:"Up to 7 years + fine", punishmentHi:"7 वर्ष तक + जुर्माना" },
    { num:"318", title:"Cheating", titleHi:"धोखाधड़ी", summary:"Whoever by deceiving any person fraudulently or dishonestly induces the person to deliver any property or to do or omit to do anything commits cheating.", summaryHi:"धोखे से किसी व्यक्ति को संपत्ति देने या कोई कार्य करने के लिए प्रेरित करना — धोखाधड़ी।", punishment:"Up to 3 years or fine or both", punishmentHi:"3 वर्ष तक या जुर्माना या दोनों" },
    { num:"319", title:"Cheating by personation", titleHi:"प्रतिरूपण द्वारा धोखाधड़ी", summary:"Whoever cheats by pretending to be some other person or by knowingly substituting one person for another shall be punished with imprisonment up to 5 years or fine or both.", summaryHi:"किसी अन्य व्यक्ति का रूप धारण करके धोखाधड़ी — 5 वर्ष तक या जुर्माना या दोनों।", punishment:"Up to 5 years or fine or both", punishmentHi:"5 वर्ष तक या जुर्माना या दोनों" },
    { num:"323", title:"Mischief", titleHi:"शरारत", summary:"Whoever with intent to cause wrongful loss or damage to the public or any person causes destruction of any property commits mischief.", summaryHi:"गलत नुकसान या क्षति पहुंचाने के इरादे से संपत्ति का विनाश — शरारत।", punishment:"Up to 6 months or fine or both", punishmentHi:"6 माह तक या जुर्माना या दोनों" },
    { num:"329", title:"Criminal trespass", titleHi:"आपराधिक अतिचार", summary:"Whoever enters into or upon property in possession of another with intent to commit an offence or to intimidate, insult or annoy any person in possession commits criminal trespass.", summaryHi:"किसी के कब्जे वाली संपत्ति में अपराध करने या डराने के इरादे से प्रवेश — आपराधिक अतिचार।", punishment:"Up to 3 months or fine up to Rs 500 or both", punishmentHi:"3 माह तक या 500 रुपये जुर्माना या दोनों" },
    { num:"336", title:"Forgery", titleHi:"जालसाजी", summary:"Whoever makes any false document or false electronic record with intent to cause damage or injury to the public or any person commits forgery.", summaryHi:"नुकसान पहुंचाने के इरादे से झूठा दस्तावेज़ या इलेक्ट्रॉनिक रिकॉर्ड बनाना — जालसाजी।", punishment:"Up to 2 years or fine or both", punishmentHi:"2 वर्ष तक या जुर्माना या दोनों" },
    { num:"340", title:"Forgery for purpose of cheating", titleHi:"धोखाधड़ी के उद्देश्य से जालसाजी", summary:"Whoever commits forgery intending that the document or electronic record forged shall be used for the purpose of cheating shall be punished with imprisonment up to 7 years and fine.", summaryHi:"धोखाधड़ी के उद्देश्य से जालसाजी — 7 वर्ष तक और जुर्माना।", punishment:"Up to 7 years + fine", punishmentHi:"7 वर्ष तक + जुर्माना" },
  ]},
  { id:"ch-11", chapter:"Chapter XI — Criminal Intimidation, Insult, Annoyance", chapterHi:"अध्याय XI — आपराधिक अभित्रास, अपमान, क्षोभ", sections:[
    { num:"351", title:"Criminal intimidation", titleHi:"आपराधिक अभित्रास", summary:"Whoever threatens another with injury to his person, reputation or property with intent to cause alarm or to do any act which he is not legally bound to do commits criminal intimidation.", summaryHi:"किसी को उसके व्यक्ति, प्रतिष्ठा या संपत्ति को नुकसान की धमकी देना — आपराधिक अभित्रास।", punishment:"Up to 2 years or fine or both", punishmentHi:"2 वर्ष तक या जुर्माना या दोनों" },
    { num:"356", title:"Defamation", titleHi:"मानहानि", summary:"Whoever by words spoken or intended to be read, or by signs or visible representations makes or publishes any imputation concerning any person intending to harm their reputation commits defamation. Truth published for public good is NOT defamation.", summaryHi:"किसी व्यक्ति की प्रतिष्ठा को नुकसान पहुंचाने के इरादे से लांछन लगाना — मानहानि। सार्वजनिक भलाई के लिए प्रकाशित सत्य मानहानि नहीं।", punishment:"Up to 2 years simple imprisonment or fine or both", punishmentHi:"2 वर्ष तक साधारण कारावास या जुर्माना या दोनों" },
    { num:"358", title:"Assault", titleHi:"हमला", summary:"Whoever makes any gesture or preparation intending or knowing it to be likely that such gesture or preparation will cause any person present to apprehend that he is about to use criminal force to that person commits assault.", summaryHi:"कोई इशारा या तैयारी जिससे उपस्थित व्यक्ति को आपराधिक बल के उपयोग की आशंका हो — हमला।", punishment:"Up to 3 months or fine up to Rs 1000 or both", punishmentHi:"3 माह तक या 1000 रुपये जुर्माना या दोनों" },
  ]},
];

export default function BNSPage() {
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
        <span style={{ color: "#ff4d6d" }}>{language === "hi" ? "भारतीय न्याय संहिता (BNS)" : "BNS 2023"}</span>
      </div>

      {/* Header */}
      <div style={{ background: "rgba(10,22,40,0.85)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,77,109,0.25)", borderRadius: "20px", padding: "28px", marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
          <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: "rgba(255,77,109,0.12)", border: "1px solid rgba(255,77,109,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Scale size={26} color="#ff4d6d" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", marginBottom: "8px" }}>
              <h1 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#e8f4fd" }}>
                {language === "hi" ? "भारतीय न्याय संहिता" : "Bharatiya Nyaya Sanhita"}
              </h1>
              <span style={{ fontSize: "0.7rem", fontWeight: 700, padding: "4px 12px", borderRadius: "50px", background: "rgba(255,77,109,0.12)", color: "#ff4d6d", border: "1px solid rgba(255,77,109,0.3)" }}>BNS 2023</span>
            </div>
            <p style={{ fontSize: "0.82rem", color: "#ff4d6d", marginBottom: "10px", fontWeight: 600 }}>
              {language === "hi" ? "IPC 1860 का स्थान · 358 धाराएं · 20 अध्याय · 1 जुलाई 2024 से लागू" : "Replaces IPC 1860 · 358 Sections · 20 Chapters · Effective July 1, 2024"}
            </p>
            <p style={{ fontSize: "0.9rem", color: "#7ea8c9", lineHeight: 1.7 }}>
              {language === "hi"
                ? "भारतीय न्याय संहिता 2023 भारत की नई आपराधिक संहिता है। नई विशेषताएं: सामुदायिक सेवा, संगठित अपराध, आतंकवाद, मॉब लिंचिंग और साइबर अपराध के प्रावधान। पुराने राजद्रोह कानून (IPC 124A) को नई धारा 152 से बदला गया।"
                : "India's new criminal code effective July 1, 2024. Key additions: community service as punishment, organised crime (Sec 111), terrorism (Sec 113), mob lynching provisions, cyber offences. Old sedition law (IPC 124A) replaced by Section 152."}
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
          placeholder={language === "hi" ? "धारा संख्या या कीवर्ड खोजें... जैसे 103, murder, हत्या" : "Search section number or keyword... e.g. 103, murder, theft"}
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
            <div key={chapter.id} style={{ background: "rgba(10,22,40,0.85)", backdropFilter: "blur(16px)", border: `1px solid ${isOpen ? "rgba(255,77,109,0.35)" : "rgba(0,212,255,0.1)"}`, borderRadius: "16px", overflow: "hidden", transition: "border-color 0.2s" }}>
              <button
                onClick={() => setExpandedChapter(isOpen ? null : chapter.id)}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px", background: isOpen ? "rgba(255,77,109,0.06)" : "transparent", border: "none", cursor: "pointer", textAlign: "left" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <BookOpen size={16} color="#ff4d6d" style={{ flexShrink: 0 }} />
                  <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "#e8f4fd" }}>
                    {language === "hi" ? chapter.chapterHi : chapter.chapter}
                  </span>
                  <span style={{ fontSize: "0.7rem", padding: "2px 8px", borderRadius: "50px", background: "rgba(255,77,109,0.12)", color: "#ff4d6d", border: "1px solid rgba(255,77,109,0.25)", flexShrink: 0 }}>
                    {chapter.sections.length} {language === "hi" ? "धाराएं" : "sections"}
                  </span>
                </div>
                <ChevronRight size={16} color="#ff4d6d" style={{ transform: isOpen ? "rotate(90deg)" : "none", transition: "transform 0.2s ease", flexShrink: 0 }} />
              </button>

              {isOpen && (
                <div style={{ borderTop: "1px solid rgba(255,77,109,0.15)" }}>
                  {chapter.sections.map((s, i) => (
                    <div key={s.num} style={{ display: "flex", alignItems: "flex-start", gap: "16px", padding: "18px 22px", borderBottom: i < chapter.sections.length - 1 ? "1px solid rgba(0,212,255,0.06)" : "none" }}>
                      <span style={{ fontSize: "0.72rem", fontWeight: 800, padding: "4px 10px", borderRadius: "8px", background: "rgba(255,77,109,0.12)", color: "#ff4d6d", border: "1px solid rgba(255,77,109,0.25)", flexShrink: 0, marginTop: "2px", whiteSpace: "nowrap" }}>
                        {language === "hi" ? "धारा" : "§"} {s.num}
                      </span>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontWeight: 700, fontSize: "0.9rem", color: "#e8f4fd", marginBottom: "6px" }}>
                          {language === "hi" ? s.titleHi : s.title}
                        </h3>
                        <p style={{ fontSize: "0.82rem", color: "#7ea8c9", lineHeight: 1.7 }}>
                          {language === "hi" ? s.summaryHi : s.summary}
                        </p>
                        {s.punishment && (
                          <p style={{ fontSize: "0.78rem", color: "#ff4d6d", marginTop: "8px", fontWeight: 600 }}>
                            ⚖ {language === "hi" ? `दंड: ${s.punishmentHi}` : `Punishment: ${s.punishment}`}
                          </p>
                        )}
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
