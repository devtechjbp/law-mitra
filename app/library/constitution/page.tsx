"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ChevronRight, BookOpen, ArrowLeft, Scale } from "lucide-react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { translations } from "@/translations";

type A = { num:string; title:string; titleHi:string; summary:string; summaryHi:string; };
type P = { id:string; part:string; partHi:string; color:string; articles:A[] };

const PARTS: P[] = [
  { id:"p-1", part:"Part I — The Union and its Territory (Articles 1-4)", partHi:"भाग I — संघ और उसका क्षेत्र (अनुच्छेद 1-4)", color:"#00d4ff", articles:[
    { num:"1", title:"Name and territory of the Union", titleHi:"संघ का नाम और क्षेत्र", summary:"India, that is Bharat, shall be a Union of States. The States and territories shall be as specified in the First Schedule. Territory of India comprises: territories of States, Union territories, and any other territories acquired.", summaryHi:"इंडिया, अर्थात भारत, राज्यों का एक संघ होगा। भारत के क्षेत्र में राज्यों के क्षेत्र, केंद्र शासित प्रदेश और अधिग्रहित अन्य क्षेत्र शामिल हैं।" },
    { num:"2", title:"Admission or establishment of new States", titleHi:"नए राज्यों का प्रवेश या स्थापना", summary:"Parliament may by law admit into the Union, or establish, new States on such terms and conditions as it thinks fit.", summaryHi:"संसद कानून द्वारा नए राज्यों को संघ में प्रवेश दे सकती है या उनकी स्थापना कर सकती है।" },
    { num:"3", title:"Formation of new States and alteration of areas, boundaries or names", titleHi:"नए राज्यों का निर्माण और क्षेत्रों, सीमाओं या नामों में परिवर्तन", summary:"Parliament may by law form a new State by separation of territory from any State, or by uniting two or more States or parts of States. Parliament may also increase or diminish the area of any State and alter the boundaries or name of any State.", summaryHi:"संसद कानून द्वारा किसी राज्य से क्षेत्र अलग करके, या दो या अधिक राज्यों को एकजुट करके नया राज्य बना सकती है। किसी राज्य का क्षेत्र, सीमा या नाम बदल सकती है।" },
  ]},
  { id:"p-2", part:"Part II — Citizenship (Articles 5-11)", partHi:"भाग II — नागरिकता (अनुच्छेद 5-11)", color:"#4ade80", articles:[
    { num:"5", title:"Citizenship at commencement of Constitution", titleHi:"संविधान के प्रारंभ में नागरिकता", summary:"At commencement of Constitution, every person who has domicile in India and was born in India, or whose parents were born in India, or who has been ordinarily resident in India for not less than 5 years, shall be a citizen of India.", summaryHi:"संविधान के प्रारंभ में, प्रत्येक व्यक्ति जिसका भारत में अधिवास है और जो भारत में पैदा हुआ, या जिसके माता-पिता भारत में पैदा हुए, या जो 5 वर्ष से भारत में निवासी है — भारत का नागरिक होगा।" },
    { num:"11", title:"Parliament to regulate citizenship by law", titleHi:"संसद द्वारा नागरिकता का विनियमन", summary:"Parliament has the power to make any provision with respect to the acquisition and termination of citizenship and all other matters relating to citizenship.", summaryHi:"संसद को नागरिकता के अधिग्रहण और समाप्ति तथा नागरिकता से संबंधित सभी अन्य मामलों के बारे में कोई भी प्रावधान करने की शक्ति है।" },
  ]},
  { id:"p-3", part:"Part III — Fundamental Rights (Articles 12-35)", partHi:"भाग III — मौलिक अधिकार (अनुच्छेद 12-35)", color:"#ff4d6d", articles:[
    { num:"12", title:"Definition of State", titleHi:"राज्य की परिभाषा", summary:"'State' includes the Government and Parliament of India, the Government and Legislature of each State, and all local or other authorities within the territory of India or under the control of the Government of India.", summaryHi:"'राज्य' में भारत सरकार और संसद, प्रत्येक राज्य की सरकार और विधानमंडल, और भारत के क्षेत्र के भीतर या भारत सरकार के नियंत्रण में सभी स्थानीय या अन्य अधिकारी शामिल हैं।" },
    { num:"13", title:"Laws inconsistent with or in derogation of fundamental rights", titleHi:"मौलिक अधिकारों से असंगत या उनका अल्पीकरण करने वाले कानून", summary:"All laws in force before commencement of Constitution, in so far as they are inconsistent with fundamental rights, shall be void. The State shall not make any law which takes away or abridges the rights conferred by Part III.", summaryHi:"संविधान के प्रारंभ से पहले लागू सभी कानून, जो मौलिक अधिकारों से असंगत हैं, शून्य होंगे। राज्य कोई ऐसा कानून नहीं बनाएगा जो भाग III द्वारा प्रदत्त अधिकारों को छीने या कम करे।" },
    { num:"14", title:"Equality before law", titleHi:"कानून के समक्ष समानता", summary:"The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India. This article embodies the principle of equality and prohibits class legislation.", summaryHi:"राज्य भारत के क्षेत्र के भीतर किसी भी व्यक्ति को कानून के समक्ष समानता या कानूनों के समान संरक्षण से वंचित नहीं करेगा।" },
    { num:"15", title:"Prohibition of discrimination on grounds of religion, race, caste, sex or place of birth", titleHi:"धर्म, मूलवंश, जाति, लिंग या जन्म स्थान के आधार पर भेदभाव का निषेध", summary:"The State shall not discriminate against any citizen on grounds only of religion, race, caste, sex, place of birth or any of them. No citizen shall be subjected to any disability, liability, restriction or condition on these grounds.", summaryHi:"राज्य किसी भी नागरिक के साथ केवल धर्म, मूलवंश, जाति, लिंग, जन्म स्थान के आधार पर भेदभाव नहीं करेगा।" },
    { num:"16", title:"Equality of opportunity in matters of public employment", titleHi:"लोक नियोजन के विषय में अवसर की समानता", summary:"There shall be equality of opportunity for all citizens in matters relating to employment or appointment to any office under the State. No citizen shall be discriminated against in respect of any employment or office under the State on grounds of religion, race, caste, sex, descent, place of birth or residence.", summaryHi:"राज्य के अधीन किसी पद पर नियोजन या नियुक्ति से संबंधित विषयों में सभी नागरिकों के लिए अवसर की समानता होगी।" },
    { num:"17", title:"Abolition of Untouchability", titleHi:"अस्पृश्यता का अंत", summary:"Untouchability is abolished and its practice in any form is forbidden. The enforcement of any disability arising out of Untouchability shall be an offence punishable in accordance with law.", summaryHi:"अस्पृश्यता को समाप्त किया जाता है और किसी भी रूप में इसका अभ्यास निषिद्ध है। अस्पृश्यता से उत्पन्न किसी भी विकलांगता को लागू करना दंडनीय अपराध होगा।" },
    { num:"19", title:"Protection of certain rights regarding freedom of speech etc.", titleHi:"वाक् स्वातंत्र्य आदि विषयक कुछ अधिकारों का संरक्षण", summary:"All citizens shall have the right to: (a) freedom of speech and expression; (b) assemble peaceably and without arms; (c) form associations or unions; (d) move freely throughout India; (e) reside and settle in any part of India; (g) practise any profession, or to carry on any occupation, trade or business.", summaryHi:"सभी नागरिकों को अधिकार होगा: (क) वाक् और अभिव्यक्ति की स्वतंत्रता; (ख) शांतिपूर्वक और निरायुध सम्मेलन; (ग) संगम या संघ बनाना; (घ) भारत में स्वतंत्र रूप से भ्रमण; (ङ) भारत के किसी भाग में निवास; (छ) कोई वृत्ति, उपजीविका, व्यापार या कारोबार।" },
    { num:"20", title:"Protection in respect of conviction for offences", titleHi:"अपराधों के लिए दोषसिद्धि के संबंध में संरक्षण", summary:"No person shall be convicted of any offence except for violation of a law in force at the time of the commission of the act. No person shall be prosecuted and punished for the same offence more than once (Double Jeopardy). No person accused of any offence shall be compelled to be a witness against himself (Self-incrimination).", summaryHi:"कोई व्यक्ति किसी अपराध के लिए दोषी नहीं ठहराया जाएगा जब तक कि उसने उस समय लागू कानून का उल्लंघन न किया हो। एक ही अपराध के लिए दो बार अभियोजन नहीं (दोहरे दंड से संरक्षण)। कोई व्यक्ति अपने विरुद्ध साक्षी बनने के लिए बाध्य नहीं।" },
    { num:"21", title:"Protection of life and personal liberty", titleHi:"प्राण और दैहिक स्वतंत्रता का संरक्षण", summary:"No person shall be deprived of his life or personal liberty except according to procedure established by law. This is the most important fundamental right. Supreme Court has expanded it to include: right to privacy, right to livelihood, right to health, right to education, right to a clean environment.", summaryHi:"किसी व्यक्ति को उसके प्राण या दैहिक स्वतंत्रता से विधि द्वारा स्थापित प्रक्रिया के अनुसार ही वंचित किया जाएगा। सर्वोच्च न्यायालय ने इसमें शामिल किया: निजता का अधिकार, आजीविका का अधिकार, स्वास्थ्य का अधिकार, शिक्षा का अधिकार।" },
    { num:"21A", title:"Right to Education", titleHi:"शिक्षा का अधिकार", summary:"The State shall provide free and compulsory education to all children of the age of six to fourteen years in such manner as the State may, by law, determine. Added by 86th Constitutional Amendment 2002.", summaryHi:"राज्य 6 से 14 वर्ष की आयु के सभी बच्चों को निःशुल्क और अनिवार्य शिक्षा प्रदान करेगा। 86वें संविधान संशोधन 2002 द्वारा जोड़ा गया।" },
    { num:"22", title:"Protection against arrest and detention in certain cases", titleHi:"कुछ दशाओं में गिरफ्तारी और निरोध से संरक्षण", summary:"No person who is arrested shall be detained in custody without being informed of the grounds of arrest. Every arrested person has the right to consult and be defended by a legal practitioner of his choice. Every arrested person must be produced before the nearest magistrate within 24 hours.", summaryHi:"गिरफ्तार व्यक्ति को गिरफ्तारी के कारण बताए बिना हिरासत में नहीं रखा जाएगा। अपनी पसंद के वकील से परामर्श का अधिकार। 24 घंटे के भीतर निकटतम मजिस्ट्रेट के सामने पेश करना अनिवार्य।" },
    { num:"23", title:"Prohibition of traffic in human beings and forced labour", titleHi:"मानव के दुर्व्यापार और बलात्श्रम का प्रतिषेध", summary:"Traffic in human beings and begar and other similar forms of forced labour are prohibited and any contravention of this provision shall be an offence punishable in accordance with law.", summaryHi:"मानव का दुर्व्यापार और बेगार तथा इसी प्रकार का अन्य बलात्श्रम प्रतिषिद्ध है और इस उपबंध का कोई भी उल्लंघन विधि के अनुसार दंडनीय अपराध होगा।" },
    { num:"24", title:"Prohibition of employment of children in factories etc.", titleHi:"कारखानों आदि में बालकों के नियोजन का प्रतिषेध", summary:"No child below the age of fourteen years shall be employed to work in any factory or mine or engaged in any other hazardous employment.", summaryHi:"14 वर्ष से कम आयु के किसी बालक को किसी कारखाने या खान में काम करने के लिए या किसी अन्य परिसंकटमय नियोजन में नहीं लगाया जाएगा।" },
    { num:"25", title:"Freedom of conscience and free profession, practice and propagation of religion", titleHi:"अंतःकरण की और धर्म के अबाध रूप से मानने, आचरण और प्रचार करने की स्वतंत्रता", summary:"Subject to public order, morality and health, all persons are equally entitled to freedom of conscience and the right freely to profess, practise and propagate religion.", summaryHi:"लोक व्यवस्था, सदाचार और स्वास्थ्य के अधीन रहते हुए, सभी व्यक्तियों को अंतःकरण की स्वतंत्रता का और धर्म के अबाध रूप से मानने, आचरण करने और प्रचार करने का समान अधिकार होगा।" },
    { num:"32", title:"Remedies for enforcement of rights — Right to Constitutional Remedies", titleHi:"अधिकारों को प्रवर्तित कराने के उपाय — संवैधानिक उपचारों का अधिकार", summary:"The right to move the Supreme Court by appropriate proceedings for the enforcement of fundamental rights is guaranteed. The Supreme Court shall have power to issue directions or orders or writs including writs of habeas corpus, mandamus, prohibition, quo warranto and certiorari.", summaryHi:"मौलिक अधिकारों के प्रवर्तन के लिए उचित कार्यवाही द्वारा सर्वोच्च न्यायालय में जाने का अधिकार प्रत्याभूत है। सर्वोच्च न्यायालय बंदी प्रत्यक्षीकरण, परमादेश, प्रतिषेध, अधिकार पृच्छा और उत्प्रेषण रिट जारी कर सकता है।" },
  ]},
  { id:"p-4", part:"Part IV — Directive Principles of State Policy (Articles 36-51)", partHi:"भाग IV — राज्य की नीति के निदेशक तत्व (अनुच्छेद 36-51)", color:"#f59e0b", articles:[
    { num:"38", title:"State to secure a social order for the promotion of welfare of the people", titleHi:"लोक कल्याण की अभिवृद्धि के लिए राज्य द्वारा सामाजिक व्यवस्था", summary:"The State shall strive to promote the welfare of the people by securing and protecting as effectively as it may a social order in which justice — social, economic and political — shall inform all the institutions of the national life.", summaryHi:"राज्य ऐसी सामाजिक व्यवस्था की, जिसमें सामाजिक, आर्थिक और राजनैतिक न्याय राष्ट्रीय जीवन की सभी संस्थाओं को अनुप्राणित करे, भरसक प्रभावी रूप में स्थापना और संरक्षण करके लोक कल्याण की अभिवृद्धि का प्रयास करेगा।" },
    { num:"39", title:"Certain principles of policy to be followed by the State", titleHi:"राज्य द्वारा अनुसरणीय कुछ नीति तत्व", summary:"The State shall direct its policy towards securing: (a) adequate means of livelihood for all citizens; (b) equitable distribution of material resources; (c) prevention of concentration of wealth; (d) equal pay for equal work for men and women; (e) protection of health and strength of workers.", summaryHi:"राज्य अपनी नीति का संचालन इस प्रकार करेगा: सभी नागरिकों को आजीविका के पर्याप्त साधन; भौतिक संसाधनों का न्यायसंगत वितरण; धन का केंद्रीकरण रोकना; पुरुषों और महिलाओं के लिए समान कार्य के लिए समान वेतन।" },
    { num:"44", title:"Uniform civil code for the citizens", titleHi:"नागरिकों के लिए एक समान सिविल संहिता", summary:"The State shall endeavour to secure for the citizens a uniform civil code throughout the territory of India. This is a directive principle and not enforceable in court, but the State should work towards it.", summaryHi:"राज्य भारत के समस्त राज्यक्षेत्र में नागरिकों के लिए एक समान सिविल संहिता प्राप्त कराने का प्रयास करेगा। यह निदेशक तत्व है, न्यायालय में प्रवर्तनीय नहीं।" },
    { num:"45", title:"Provision for early childhood care and education to children below the age of six years", titleHi:"छह वर्ष से कम आयु के बालकों के लिए प्रारंभिक बाल्यावस्था देखभाल और शिक्षा", summary:"The State shall endeavour to provide early childhood care and education for all children until they complete the age of six years.", summaryHi:"राज्य सभी बालकों के लिए जब तक वे छह वर्ष की आयु पूरी नहीं कर लेते, प्रारंभिक बाल्यावस्था देखभाल और शिक्षा देने के लिए प्रयास करेगा।" },
    { num:"51A", title:"Fundamental Duties", titleHi:"मूल कर्तव्य", summary:"It shall be the duty of every citizen of India to: abide by the Constitution; cherish the noble ideals of freedom struggle; uphold sovereignty and integrity of India; defend the country; promote harmony; preserve composite culture; protect natural environment; develop scientific temper; safeguard public property; strive towards excellence.", summaryHi:"प्रत्येक भारतीय नागरिक का कर्तव्य: संविधान का पालन; स्वतंत्रता संग्राम के आदर्शों को संजोना; भारत की संप्रभुता और अखंडता की रक्षा; देश की रक्षा; सद्भाव को बढ़ावा; प्राकृतिक पर्यावरण की रक्षा; वैज्ञानिक दृष्टिकोण विकसित करना।" },
  ]},
  { id:"p-5", part:"Part V — The Union (Articles 52-151)", partHi:"भाग V — संघ (अनुच्छेद 52-151)", color:"#7c3aed", articles:[
    { num:"52", title:"The President of India", titleHi:"भारत का राष्ट्रपति", summary:"There shall be a President of India. The President is the constitutional head of the executive of the Union. The President is elected by an electoral college consisting of elected members of both Houses of Parliament and elected members of the Legislative Assemblies of the States.", summaryHi:"भारत का एक राष्ट्रपति होगा। राष्ट्रपति संघ की कार्यपालिका का संवैधानिक प्रमुख है। राष्ट्रपति का चुनाव संसद के दोनों सदनों के निर्वाचित सदस्यों और राज्य विधान सभाओं के निर्वाचित सदस्यों से मिलकर बने निर्वाचक मंडल द्वारा होता है।" },
    { num:"74", title:"Council of Ministers to aid and advise President", titleHi:"राष्ट्रपति को सहायता और सलाह देने के लिए मंत्रि-परिषद", summary:"There shall be a Council of Ministers with the Prime Minister at the head to aid and advise the President who shall, in the exercise of his functions, act in accordance with such advice. The President may require the Council of Ministers to reconsider such advice.", summaryHi:"राष्ट्रपति को सहायता और सलाह देने के लिए प्रधानमंत्री की अध्यक्षता में एक मंत्रि-परिषद होगी। राष्ट्रपति ऐसी सलाह के अनुसार कार्य करेगा।" },
    { num:"79", title:"Constitution of Parliament", titleHi:"संसद का गठन", summary:"There shall be a Parliament for the Union which shall consist of the President and two Houses to be known respectively as the Council of States (Rajya Sabha) and the House of the People (Lok Sabha).", summaryHi:"संघ के लिए एक संसद होगी जो राष्ट्रपति और दो सदनों से मिलकर बनेगी — राज्य सभा और लोक सभा।" },
    { num:"124", title:"Establishment and constitution of Supreme Court", titleHi:"उच्चतम न्यायालय की स्थापना और गठन", summary:"There shall be a Supreme Court of India consisting of a Chief Justice of India and, until Parliament by law prescribes a larger number, of not more than thirty-three other Judges. Every Judge of the Supreme Court shall be appointed by the President.", summaryHi:"भारत का एक उच्चतम न्यायालय होगा जिसमें भारत का मुख्य न्यायमूर्ति और अधिकतम 33 अन्य न्यायाधीश होंगे। प्रत्येक न्यायाधीश की नियुक्ति राष्ट्रपति द्वारा होगी।" },
  ]},
  { id:"p-6", part:"Part VI — The States (Articles 152-237)", partHi:"भाग VI — राज्य (अनुच्छेद 152-237)", color:"#00b4d8", articles:[
    { num:"153", title:"Governors of States", titleHi:"राज्यों के राज्यपाल", summary:"There shall be a Governor for each State. The Governor is the constitutional head of the State executive. The Governor is appointed by the President and holds office during the pleasure of the President.", summaryHi:"प्रत्येक राज्य के लिए एक राज्यपाल होगा। राज्यपाल राज्य की कार्यपालिका का संवैधानिक प्रमुख है। राज्यपाल की नियुक्ति राष्ट्रपति द्वारा होती है।" },
        { num:"163", title:"Council of Ministers to aid and advise Governor", titleHi:"राज्यपाल को सहायता और सलाह देने के लिए मंत्रि-परिषद", summary:"There shall be a Council of Ministers with the Chief Minister at the head to aid and advise the Governor in the exercise of his functions, except in so far as he is required to exercise his functions in his discretion.", summaryHi:"राज्यपाल को सहायता और सलाह देने के लिए मुख्यमंत्री की अध्यक्षता में एक मंत्रि-परिषद होगी।" },
    { num:"214", title:"High Courts for States", titleHi:"राज्यों के लिए उच्च न्यायालय", summary:"There shall be a High Court for each State. Every High Court shall be a court of record and shall have all the powers of such a court including the power to punish for contempt of itself.", summaryHi:"प्रत्येक राज्य के लिए एक उच्च न्यायालय होगा। प्रत्येक उच्च न्यायालय अभिलेख न्यायालय होगा।" },
  ]},
  { id:"p-7", part:"Part XI — Relations between Union and States (Articles 245-263)", partHi:"भाग XI — संघ और राज्यों के बीच संबंध (अनुच्छेद 245-263)", color:"#f472b6", articles:[
    { num:"245", title:"Extent of laws made by Parliament and by Legislatures of States", titleHi:"संसद और राज्य विधानमंडलों द्वारा बनाई गई विधियों की सीमा", summary:"Parliament may make laws for the whole or any part of the territory of India. The Legislature of a State may make laws for the whole or any part of the State. No law made by Parliament shall be deemed to be invalid on the ground that it would have extra-territorial operation.", summaryHi:"संसद पूरे भारत या उसके किसी भाग के लिए कानून बना सकती है। राज्य विधानमंडल पूरे राज्य या उसके किसी भाग के लिए कानून बना सकता है।" },
    { num:"246", title:"Subject-matter of laws made by Parliament and by Legislatures of States", titleHi:"संसद और राज्य विधानमंडलों द्वारा बनाई गई विधियों की विषय-वस्तु", summary:"Parliament has exclusive power to make laws with respect to matters in List I (Union List). Parliament and State Legislatures have concurrent power for List III (Concurrent List). State Legislatures have exclusive power for List II (State List).", summaryHi:"संसद को सूची I (संघ सूची) के विषयों पर विशेष शक्ति। संसद और राज्य विधानमंडल दोनों को सूची III (समवर्ती सूची) पर शक्ति। राज्य विधानमंडल को सूची II (राज्य सूची) पर विशेष शक्ति।" },
  ]},
  { id:"p-8", part:"Part XVIII — Emergency Provisions (Articles 352-360)", partHi:"भाग XVIII — आपात उपबंध (अनुच्छेद 352-360)", color:"#ff4d6d", articles:[
    { num:"352", title:"Proclamation of Emergency — National Emergency", titleHi:"आपात उद्घोषणा — राष्ट्रीय आपात", summary:"If the President is satisfied that a grave emergency exists whereby the security of India or of any part of the territory thereof is threatened, whether by war or external aggression or armed rebellion, he may make a Proclamation of Emergency. Requires approval of Parliament within one month by 2/3 majority.", summaryHi:"यदि राष्ट्रपति को विश्वास हो कि युद्ध, बाहरी आक्रमण या सशस्त्र विद्रोह से भारत की सुरक्षा को गंभीर खतरा है, तो वह आपात उद्घोषणा कर सकता है। एक माह के भीतर संसद की 2/3 बहुमत से स्वीकृति आवश्यक।" },
    { num:"356", title:"Provisions in case of failure of constitutional machinery in State — President's Rule", titleHi:"राज्य में संवैधानिक तंत्र के विफल होने की दशा में उपबंध — राष्ट्रपति शासन", summary:"If the President, on receipt of report from the Governor of a State or otherwise, is satisfied that the government of the State cannot be carried on in accordance with the provisions of the Constitution, he may by Proclamation assume to himself all or any of the functions of the Government of that State.", summaryHi:"यदि राष्ट्रपति को संतोष हो कि किसी राज्य का शासन संविधान के उपबंधों के अनुसार नहीं चलाया जा सकता, तो वह उद्घोषणा द्वारा उस राज्य सरकार के सभी या कोई कार्य अपने हाथ में ले सकता है — राष्ट्रपति शासन।" },
    { num:"360", title:"Provisions as to Financial Emergency", titleHi:"वित्तीय आपात के बारे में उपबंध", summary:"If the President is satisfied that a situation has arisen whereby the financial stability or credit of India or of any part thereof is threatened, he may by a Proclamation make a declaration to that effect — Financial Emergency.", summaryHi:"यदि राष्ट्रपति को संतोष हो कि भारत या उसके किसी भाग की वित्तीय स्थिरता या साख को खतरा है, तो वह वित्तीय आपात की उद्घोषणा कर सकता है।" },
  ]},
  { id:"p-9", part:"Part XX — Amendment of the Constitution (Article 368)", partHi:"भाग XX — संविधान का संशोधन (अनुच्छेद 368)", color:"#4ade80", articles:[
    { num:"368", title:"Power of Parliament to amend the Constitution", titleHi:"संविधान का संशोधन करने की संसद की शक्ति", summary:"Parliament may in exercise of its constituent power amend by way of addition, variation or repeal any provision of this Constitution in accordance with the procedure laid down in this article. Amendment requires 2/3 majority of members present and voting in each House, and majority of total membership of each House.", summaryHi:"संसद इस अनुच्छेद में दी गई प्रक्रिया के अनुसार संविधान के किसी उपबंध का संशोधन कर सकती है। संशोधन के लिए प्रत्येक सदन में उपस्थित और मत देने वाले सदस्यों का 2/3 बहुमत और प्रत्येक सदन की कुल सदस्यता का बहुमत आवश्यक।" },
  ]},
  { id:"p-10", part:"Key Constitutional Writs (Article 32 & 226)", partHi:"प्रमुख संवैधानिक रिट (अनुच्छेद 32 और 226)", color:"#00d4ff", articles:[
    { num:"W-1", title:"Habeas Corpus — Produce the body", titleHi:"बंदी प्रत्यक्षीकरण — शरीर को प्रस्तुत करो", summary:"A writ of habeas corpus is issued to produce a person who has been detained, before the court. The court examines the legality of the detention. If detention is found illegal, the person is released. Most important writ for personal liberty.", summaryHi:"बंदी प्रत्यक्षीकरण रिट हिरासत में लिए गए व्यक्ति को न्यायालय के सामने पेश करने के लिए जारी की जाती है। यदि हिरासत अवैध पाई जाए तो व्यक्ति को रिहा किया जाता है। व्यक्तिगत स्वतंत्रता के लिए सबसे महत्वपूर्ण रिट।" },
    { num:"W-2", title:"Mandamus — We command", titleHi:"परमादेश — हम आदेश देते हैं", summary:"A writ of mandamus is issued to a public authority directing it to perform a public duty which it has failed to perform. It can be issued against any public body, corporation, inferior court, tribunal or government.", summaryHi:"परमादेश रिट किसी सार्वजनिक प्राधिकरण को उस सार्वजनिक कर्तव्य का पालन करने का निर्देश देने के लिए जारी की जाती है जिसे उसने पूरा नहीं किया।" },
    { num:"W-3", title:"Prohibition — Stop proceedings", titleHi:"प्रतिषेध — कार्यवाही रोको", summary:"A writ of prohibition is issued by a superior court to an inferior court or tribunal directing it to stop proceedings in a case which is beyond its jurisdiction. It prevents excess of jurisdiction.", summaryHi:"प्रतिषेध रिट उच्च न्यायालय द्वारा अधीनस्थ न्यायालय या न्यायाधिकरण को उस मामले में कार्यवाही रोकने का निर्देश देने के लिए जारी की जाती है जो उसके क्षेत्राधिकार से बाहर है।" },
    { num:"W-4", title:"Certiorari — To be certified", titleHi:"उत्प्रेषण — प्रमाणित किया जाए", summary:"A writ of certiorari is issued by a superior court to an inferior court or tribunal to transfer a case to itself or to quash the order of the inferior court. It is issued when there is an error of jurisdiction or error of law apparent on the face of the record.", summaryHi:"उत्प्रेषण रिट उच्च न्यायालय द्वारा अधीनस्थ न्यायालय को मामला अपने पास स्थानांतरित करने या अधीनस्थ न्यायालय के आदेश को रद्द करने के लिए जारी की जाती है।" },
    { num:"W-5", title:"Quo Warranto — By what authority", titleHi:"अधिकार पृच्छा — किस अधिकार से", summary:"A writ of quo warranto is issued to inquire into the legality of the claim of a person to a public office. It prevents illegal usurpation of public office. It can be issued only in respect of a substantive public office of a permanent character.", summaryHi:"अधिकार पृच्छा रिट किसी व्यक्ति के सार्वजनिक पद के दावे की वैधता की जांच के लिए जारी की जाती है। यह सार्वजनिक पद के अवैध अधिग्रहण को रोकती है।" },
  ]},
];

export default function ConstitutionPage() {
  const { language } = useLanguageStore();
  const t = translations[language].library;
  const [search, setSearch] = useState("");
  const [expandedPart, setExpandedPart] = useState<string | null>(null);

  const filtered = useMemo(() => PARTS.map((p) => ({
    ...p,
    articles: p.articles.filter((a) =>
      !search ||
      a.num.includes(search) ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.titleHi.includes(search) ||
      a.summary.toLowerCase().includes(search.toLowerCase()) ||
      a.summaryHi.includes(search)
    ),
  })).filter((p) => p.articles.length > 0), [search]);

  return (
    <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 24px 80px" }}>

      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "28px", fontSize: "0.85rem" }}>
        <Link href="/library" style={{ display: "flex", alignItems: "center", gap: "4px", color: "#7ea8c9", textDecoration: "none" }}>
          <ArrowLeft size={14} /> {t.title}
        </Link>
        <ChevronRight size={14} color="#4a6a8a" />
        <span style={{ color: "#00d4ff" }}>{language === "hi" ? "भारत का संविधान" : "Constitution of India"}</span>
      </div>

      <div style={{ background: "rgba(10,22,40,0.85)", backdropFilter: "blur(16px)", border: "1px solid rgba(0,212,255,0.2)", borderRadius: "20px", padding: "28px", marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
          <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: "rgba(0,212,255,0.12)", border: "1px solid rgba(0,212,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Scale size={26} color="#00d4ff" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", marginBottom: "8px" }}>
              <h1 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#e8f4fd" }}>
                {language === "hi" ? "भारत का संविधान" : "Constitution of India"}
              </h1>
              <span style={{ fontSize: "0.7rem", fontWeight: 700, padding: "4px 12px", borderRadius: "50px", background: "rgba(0,212,255,0.12)", color: "#00d4ff", border: "1px solid rgba(0,212,255,0.3)" }}>
                {language === "hi" ? "सर्वोच्च कानून" : "Supreme Law"}
              </span>
            </div>
            <p style={{ fontSize: "0.82rem", color: "#00d4ff", marginBottom: "10px", fontWeight: 600 }}>
              {language === "hi" ? "26 जनवरी 1950 से लागू · 448 अनुच्छेद · 25 भाग · 12 अनुसूचियां · 105 संशोधन" : "Enacted January 26, 1950 · 448 Articles · 25 Parts · 12 Schedules · 105 Amendments"}
            </p>
            <p style={{ fontSize: "0.9rem", color: "#7ea8c9", lineHeight: 1.7 }}>
              {language === "hi"
                ? "भारत का संविधान विश्व का सबसे लंबा लिखित संविधान है। यह मौलिक अधिकार, राज्य नीति के निदेशक तत्व, मूल कर्तव्य, संघीय ढांचा, न्यायपालिका की स्वतंत्रता और आपात उपबंध प्रदान करता है।"
                : "The world's longest written constitution. Provides Fundamental Rights, Directive Principles, Fundamental Duties, federal structure, judicial independence, and emergency provisions. Drafted by Dr. B.R. Ambedkar's committee over 2 years 11 months 18 days."}
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
          placeholder={language === "hi" ? "अनुच्छेद संख्या या कीवर्ड खोजें... जैसे 21, equality, मौलिक अधिकार" : "Search article number or keyword... e.g. 21, equality, fundamental rights, writ"}
          style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: "0.9rem", color: "#e8f4fd" }}
        />
        {search && (
          <button onClick={() => setSearch("")} style={{ background: "none", border: "none", color: "#4a6a8a", cursor: "pointer", fontSize: "1rem" }}>✕</button>
        )}
      </div>
      <p style={{ fontSize: "0.78rem", color: "#4a6a8a", marginBottom: "20px", paddingLeft: "8px" }}>
        {filtered.reduce((a, p) => a + p.articles.length, 0)} {language === "hi" ? "अनुच्छेद मिले" : "articles found"} · {PARTS.length} {language === "hi" ? "भाग" : "parts"}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {filtered.map((part) => {
          const isOpen = expandedPart === part.id;
          return (
            <div key={part.id} style={{ background: "rgba(10,22,40,0.85)", backdropFilter: "blur(16px)", border: `1px solid ${isOpen ? part.color + "50" : "rgba(0,212,255,0.1)"}`, borderRadius: "16px", overflow: "hidden", transition: "border-color 0.2s" }}>
              <button
                onClick={() => setExpandedPart(isOpen ? null : part.id)}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px", background: isOpen ? `${part.color}08` : "transparent", border: "none", cursor: "pointer", textAlign: "left" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <BookOpen size={16} color={part.color} style={{ flexShrink: 0 }} />
                  <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "#e8f4fd" }}>
                    {language === "hi" ? part.partHi : part.part}
                  </span>
                  <span style={{ fontSize: "0.7rem", padding: "2px 8px", borderRadius: "50px", background: `${part.color}15`, color: part.color, border: `1px solid ${part.color}30`, flexShrink: 0 }}>
                    {part.articles.length} {language === "hi" ? "अनुच्छेद" : "articles"}
                  </span>
                </div>
                <ChevronRight size={16} color={part.color} style={{ transform: isOpen ? "rotate(90deg)" : "none", transition: "transform 0.2s ease", flexShrink: 0 }} />
              </button>
              {isOpen && (
                <div style={{ borderTop: `1px solid ${part.color}20` }}>
                  {part.articles.map((a, i) => (
                    <div key={a.num} style={{ display: "flex", alignItems: "flex-start", gap: "16px", padding: "18px 22px", borderBottom: i < part.articles.length - 1 ? "1px solid rgba(0,212,255,0.06)" : "none" }}>
                      <span style={{ fontSize: "0.72rem", fontWeight: 800, padding: "4px 10px", borderRadius: "8px", background: `${part.color}15`, color: part.color, border: `1px solid ${part.color}30`, flexShrink: 0, marginTop: "2px", whiteSpace: "nowrap" }}>
                        {language === "hi" ? "अनु." : "Art."} {a.num}
                      </span>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontWeight: 700, fontSize: "0.9rem", color: "#e8f4fd", marginBottom: "6px" }}>
                          {language === "hi" ? a.titleHi : a.title}
                        </h3>
                        <p style={{ fontSize: "0.82rem", color: "#7ea8c9", lineHeight: 1.75 }}>
                          {language === "hi" ? a.summaryHi : a.summary}
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
