"use client";

import { useState, useMemo } from "react";
import { FileText, Download, Search, Copy, CheckCircle } from "lucide-react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { translations } from "@/translations";

export default function DocumentsPage() {
  const { language } = useLanguageStore();
  const t = translations[language].documents_page;

  const allDocuments = useMemo(() => [
    {
      id: "affidavit-general",
      title: language === 'hi' ? "सामान्य हलफनामा" : "General Affidavit",
      category: language === 'hi' ? "हलफनामा" : "Affidavit",
      description: language === 'hi' ? "विभिन्न कानूनी उद्देश्यों के लिए एक सामान्य उद्देश्य वाला शपथ बयान।" : "A general-purpose sworn statement for various legal purposes.",
      color: "#00d4ff",
      template: language === 'hi' ? `हलफनामा (AFFIDAVIT)

मैं, [पूरा नाम], पुत्र/पुत्री [पिता का नाम], आयु [उम्र] वर्ष, निवासी [पूरा पता], इसके द्वारा सत्यनिष्ठा से प्रतिज्ञान और घोषणा करता हूँ:

1. यह कि मैं यहाँ अभिसाक्षी हूँ और इसमें बताए गए तथ्यों से पूरी तरह परिचित हूँ।

2. यह कि [तथ्यों को स्पष्ट और विशिष्ट रूप से बताएं]।

3. यह कि इस हलफनामे की सामग्री मेरे ज्ञान और विश्वास के अनुसार सत्य और सही है और इसमें से कुछ भी महत्वपूर्ण छिपाया नहीं गया है।

अभिसाक्षी (DEPONENT)

आज दिनांक [तारीख] [महीना], [वर्ष] को [शहर] में सत्यापित किया जाता है कि उपरोक्त हलफनामे की सामग्री मेरे सर्वोत्तम ज्ञान और विश्वास के अनुसार सत्य और सही है।

अभिसाक्षी (DEPONENT)

मेरे सामने,
[नोटरी/शपथ आयुक्त]
[मोहर और हस्ताक्षर]` : `AFFIDAVIT

I, [Full Name], son/daughter of [Father's Name], aged [Age] years, residing at [Full Address], do hereby solemnly affirm and declare as under:

1. That I am the deponent herein and am fully conversant with the facts stated herein.

2. That [State the facts clearly and specifically].

3. That the contents of this affidavit are true and correct to the best of my knowledge and belief and nothing material has been concealed therefrom.

DEPONENT

Verified at [City] on this [Date] day of [Month], [Year] that the contents of the above affidavit are true and correct to the best of my knowledge and belief.

DEPONENT

Before me,
[Notary/Oath Commissioner]
[Seal & Signature]`,
    },
    {
      id: "legal-notice",
      title: language === 'hi' ? "कानूनी नोटिस" : "Legal Notice",
      category: language === 'hi' ? "नोटिस" : "Notice",
      description: language === 'hi' ? "कानूनी कार्यवाही शुरू करने से पहले भेजा जाने वाला औपचारिक कानूनी नोटिस।" : "Formal legal notice to be sent before initiating legal proceedings.",
      color: "#ff4d6d",
      template: language === 'hi' ? `कानूनी नोटिस (LEGAL NOTICE)

दिनांक: [तारीख]

सेवा में,
[प्राप्तकर्ता का नाम]
[प्राप्तकर्ता का पता]

विषय: [विषय वस्तु] के लिए कानूनी नोटिस

महोदय/महोदया,

अपने मुवक्किल [मुवक्किल का नाम], निवासी [मुवक्किल का पता] के निर्देशों के तहत और उनकी ओर से, मैं इसके द्वारा आपको निम्नलिखित कानूनी नोटिस देता हूँ:

1. यह कि मेरे मुवक्किल [संबंध/पृष्ठभूमि का वर्णन करें]।

2. यह कि [शिकायत/मुद्दे का विस्तार से वर्णन करें]।

3. यह कि बार-बार अनुरोध के बावजूद, आप [विफलता/चूक का वर्णन करें] में विफल रहे हैं।

4. यह कि मेरे मुवक्किल को [नुकसान/क्षति का वर्णन करें] उठाना पड़ा है।

आपको इसके द्वारा इस नोटिस की प्राप्ति से [संख्या] दिनों के भीतर [मांग/उपचार की मांग] करने के लिए कहा जाता है, विफल रहने पर मेरा मुवक्किल आपके विरुद्ध उचित कानूनी कार्यवाही शुरू करने के लिए बाध्य होगा।

भवदीय,

[अधिवक्ता का नाम]
अधिवक्ता, बार काउंसिल नंबर [नंबर]
[पता] | [फोन]` : `LEGAL NOTICE

Date: [Date]

To,
[Recipient Name]
[Recipient Address]

Subject: Legal Notice for [Subject Matter]

Sir/Madam,

Under instructions from and on behalf of my client, [Client Name], residing at [Client Address], I hereby serve upon you the following legal notice:

1. That my client [describe the relationship/background].

2. That [describe the grievance/issue in detail].

3. That despite repeated requests, you have failed to [describe the failure/default].

4. That my client has suffered [describe the loss/damage].

You are hereby called upon to [state the demand/remedy sought] within [number] days from the receipt of this notice, failing which my client shall be constrained to initiate appropriate legal proceedings against you.

Yours faithfully,

[Advocate Name]
Advocate, Bar Council No. [Number]
[Address] | [Phone]`,
    },
    {
      id: "rent-agreement",
      title: language === 'hi' ? "किरायानामा (Rent Agreement)" : "Rent Agreement",
      category: language === 'hi' ? "अनुबंध" : "Contract",
      description: language === 'hi' ? "मानक आवासीय किराया/लीज़ समझौता टेम्पलेट।" : "Standard residential rent/lease agreement template.",
      color: "#0066ff",
      template: language === 'hi' ? `किरायानामा (RENT AGREEMENT)

यह किरायानामा आज दिनांक [تारीख] को [शहर] में बनाया गया है।

इनके बीच:

[मकान मालिक का नाम], आयु [उम्र] वर्ष, निवासी [मकान मालिक का पता]
(जिन्हें बाद में "मकान मालिक" कहा जाएगा)

और

[किरायेदार का नाम], आयु [उम्र] वर्ष, निवासी [किरायेदार का पता]
(जिन्हें बाद में "किरायेदार" कहा जाएगा)

चूंकि मकान मालिक [संपत्ति का पता] स्थित परिसर का मालिक है।

नियम और शर्तें:

1. अवधि: यह समझौता [अवधि] महीनों के लिए है जो [शुरू होने की तारीख] से प्रभावी होगा।

2. किराया: मासिक किराया [राशि]/- रुपये होगा जो प्रत्येक महीने की [तारीख] को या उससे पहले देय होगा।

3. सुरक्षा जमा: किरायेदार ने सुरक्षा जमा के रूप में [राशि]/- रुपये का भुगतान किया है, जो बकाया कटौती के बाद खाली करने पर वापस किया जाएगा।

4. उपयोग: किरायेदार परिसर का उपयोग केवल आवासीय उद्देश्यों के लिए करेगा।

5. रखरखाव: किरायेदार परिसर को अच्छी स्थिति में बनाए रखेगा।

6. समाप्ति: कोई भी पक्ष [नोटिस अवधि] दिनों का लिखित नोटिस देकर समाप्त कर सकता है।

मकान मालिक                    किरायेदार
[हस्ताक्षर]                   [हस्ताक्षर]

गवाह:
1. _______________
2. _______________` : `RENT AGREEMENT

This Rent Agreement is made on [Date] at [City].

BETWEEN

[Landlord Name], aged [Age] years, residing at [Landlord Address]
(hereinafter referred to as the "LANDLORD")

AND

[Tenant Name], aged [Age] years, residing at [Tenant Address]
(hereinafter referred to as the "TENANT")

WHEREAS the Landlord is the owner of the premises at [Property Address].

TERMS AND CONDITIONS:

1. TERM: This agreement is for [Duration] months commencing from [Start Date].

2. RENT: Monthly rent shall be Rs. [Amount]/- payable on or before the [Date] of every month.

3. SECURITY DEPOSIT: The Tenant has paid Rs. [Amount]/- as security deposit, refundable on vacating after deducting dues.

4. USE: The Tenant shall use the premises only for residential purposes.

5. MAINTENANCE: The Tenant shall maintain the premises in good condition.

6. TERMINATION: Either party may terminate by giving [Notice Period] days written notice.

LANDLORD                    TENANT
[Signature]                 [Signature]

WITNESSES:
1. _______________
2. _______________`,
    },
  ], [language]);

  const categories = useMemo(() => ["All", ...Array.from(new Set(allDocuments.map((d) => d.category)))], [allDocuments]);

  const [search, setSearch] = useState("");
  const [selectedDocId, setSelectedDocId] = useState(allDocuments[0].id);
  const [copied, setCopied] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const selectedDoc = useMemo(() => 
    allDocuments.find(d => d.id === selectedDocId) || allDocuments[0], 
    [selectedDocId, allDocuments]
  );

  const filtered = allDocuments.filter((d) => {
    const matchSearch = !search || d.title.toLowerCase().includes(search.toLowerCase()) || d.category.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === "All" || d.category === activeCategory;
    return matchSearch && matchCategory;
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedDoc.template);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px 80px" }}>

      {/* Page Header */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <div className="badge-cyan" style={{ marginBottom: "16px" }}>
          <FileText size={13} />
          {t.badge}
        </div>
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, marginBottom: "12px", color: "#e8f4fd" }}>
          {t.title}
          <span className="text-cyan-gradient">{t.titleHighlight}</span>
        </h1>
        <p style={{ fontSize: "1rem", color: "#7ea8c9" }}>
          {t.description}
        </p>
      </div>

      {/* Two-column layout */}
      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: "24px", alignItems: "start" }}>

        {/* LEFT — Document List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

          {/* Search */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 16px",
              background: "rgba(10, 22, 40, 0.9)",
              border: "1px solid rgba(0, 212, 255, 0.2)",
              borderRadius: "12px",
            }}
          >
            <Search size={16} color="#00d4ff" style={{ flexShrink: 0 }} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.searchPlaceholder}
              style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: "0.875rem", color: "#e8f4fd" }}
            />
          </div>

          {/* Category Filter */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: "5px 12px",
                    borderRadius: "50px",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    background: isActive ? "linear-gradient(135deg, #0066ff, #00d4ff)" : "rgba(0, 212, 255, 0.06)",
                    color: isActive ? "#ffffff" : "#7ea8c9",
                    border: isActive ? "none" : "1px solid rgba(0, 212, 255, 0.15)",
                    transition: "all 0.2s",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Document List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {filtered.map((doc) => {
              const isSelected = selectedDoc.id === doc.id;
              return (
                <button
                  key={doc.id}
                  onClick={() => setSelectedDocId(doc.id)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "14px 16px",
                    borderRadius: "12px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    background: isSelected ? `${doc.color}12` : "rgba(10, 22, 40, 0.7)",
                    border: isSelected ? `1px solid ${doc.color}45` : "1px solid rgba(0, 212, 255, 0.1)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "8px",
                        background: `${doc.color}18`,
                        border: `1px solid ${doc.color}35`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <FileText size={15} color={doc.color} />
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: "0.875rem", color: "#e8f4fd", marginBottom: "2px" }}>
                        {doc.title}
                      </p>
                      <p style={{ fontSize: "0.72rem", color: doc.color, fontWeight: 600 }}>
                        {doc.category}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT — Preview */}
        <div
          style={{
            background: "rgba(10, 22, 40, 0.9)",
            backdropFilter: "blur(16px)",
            border: `1px solid ${selectedDoc.color}30`,
            borderRadius: "20px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            minHeight: "600px",
          }}
        >
          {/* Preview Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "18px 24px",
              background: `${selectedDoc.color}08`,
              borderBottom: `1px solid ${selectedDoc.color}20`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: `${selectedDoc.color}18`,
                  border: `1px solid ${selectedDoc.color}40`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FileText size={18} color={selectedDoc.color} />
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: "1rem", color: "#e8f4fd" }}>{selectedDoc.title}</p>
                <p style={{ fontSize: "0.75rem", color: selectedDoc.color, fontWeight: 600 }}>{selectedDoc.category}</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={handleCopy}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 16px",
                  borderRadius: "10px",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  background: copied ? "rgba(74, 222, 128, 0.12)" : "rgba(0, 212, 255, 0.08)",
                  color: copied ? "#4ade80" : "#00d4ff",
                  border: copied ? "1px solid rgba(74,222,128,0.3)" : "1px solid rgba(0, 212, 255, 0.2)",
                }}
              >
                {copied ? <CheckCircle size={13} /> : <Copy size={13} />}
                {copied ? t.copied : t.copy}
              </button>
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 16px",
                  borderRadius: "10px",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  background: "linear-gradient(135deg, #0066ff, #00d4ff)",
                  color: "#ffffff",
                  border: "none",
                }}
              >
                <Download size={13} /> {t.download}
              </button>
            </div>
          </div>

          {/* Template Content */}
          <div style={{ flex: 1, padding: "24px", overflowY: "auto" }}>
            <p style={{ fontSize: "0.82rem", color: "#4a6a8a", marginBottom: "16px", lineHeight: 1.6 }}>
              {selectedDoc.description} — {t.bracketNote}
            </p>
            <pre
              style={{
                fontSize: "0.82rem",
                lineHeight: 1.8,
                whiteSpace: "pre-wrap",
                fontFamily: "'Courier New', Courier, monospace",
                color: "#c8dff0",
                background: "rgba(0, 0, 0, 0.25)",
                padding: "20px",
                borderRadius: "12px",
                border: "1px solid rgba(0, 212, 255, 0.08)",
              }}
            >
              {selectedDoc.template}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
