import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { useLang } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Zap, BatteryCharging, Shield, Activity, Clock, Weight, Wrench,
  Thermometer, Settings, CheckCircle2, ArrowRight, ChevronDown,
  Info, Leaf, Sparkles, ShieldAlert, Award
} from "lucide-react";

// Localized strings dictionary to keep all translation logic clean and local
const CONTENT: Record<string, any> = {
  en: {
    metaTitle: "Electric Tractors for Modern Farming — AutoNxt",
    metaDesc: "Discover AutoNxt's lineup of high-performance electric tractors. Zero emissions, up to 10 hours runtime, and massive savings compared to diesel tractors.",
    metaKeywords: "electric tractor, electric tractor India, AutoNxt, zero emission farming, electric tractor price, LFP battery tractor",
    heroTitle: "Electric Tractors for Modern Farming",
    heroSubtitle: "AutoNXT Electric Tractors are India's next-generation battery-powered tractors designed for agriculture and industrial applications. Experience zero direct emissions, instant torque, lower operating costs, and high-performance electric farming technology.",
    bookDemo: "Book a Demo",
    viewModels: "Explore Models",
    
    whatIsTitle: "What is an Electric Tractor?",
    whatIsP1: "An electric tractor is a modern utility vehicle that replaces the traditional internal combustion (diesel) engine with an advanced battery-powered electric motor drivetrain. Instead of burning fossil fuels, it utilizes clean energy stored in high-performance lithium-ion cells, driving electric motors that deliver peak power and instant torque.",
    whatIsP2: "Built on high-voltage architectures, AutoNxt electric tractors achieve high efficiency with zero exhaust fumes, minimal moving parts, and whisper-quiet operation. This transition doesn't just protect the environment — it drastically improves driver comfort and lowers running costs to a fraction of a diesel equivalent.",

    benefitsTitle: "Benefits of Electric Tractors",
    benefits: [
      {
        title: "Zero Direct Emissions",
        desc: "Protect your crops, soil, and operators from toxic diesel fumes. Ideal for greenhouses, indoor industrial plants, and sustainable organic farming."
      },
      {
        title: "Up to 80% Cost Savings",
        desc: "Say goodbye to rising diesel prices. Electric charging costs up to 5x less per hour, combined with virtually zero drivetrain maintenance."
      },
      {
        title: "Instant Drivetrain Torque",
        desc: "Electric motors deliver full torque instantly from 0 RPM, providing superior pulling power and control in heavy soil and steep terrains."
      },
      {
        title: "Enhanced Operator Health",
        desc: "Reduced engine noise and low vibration levels significantly lower driver fatigue, preventing long-term physical strain and hearing damage."
      }
    ],

    whyChooseTitle: "Why Choose AutoNxt Electric Tractors?",
    whyChoosePoints: [
      "iCAT Certified: The world's first certified high-voltage commercial electric tractor.",
      "Smart Telematics: Real-time GPS, geo-fencing, and battery health tracking on your phone.",
      "Active Liquid Cooling: Thermal management that preserves battery health in peak Indian summer.",
      "NXT-Drive PMSM Motors: High-efficiency Permanent Magnet Synchronous Motors reaching 96% peak efficiency."
    ],

    ourModelsTitle: "Our Electric Tractor Lineup",
    ourModelsSubtitle: "Choose the perfect electric tractor for your farm or industrial operations.",
    modelSpecsLabel: "Key Specifications:",
    learnMore: "Learn More",
    reserveNow: "Reserve Now",

    specTableTitle: "Electric Tractor Specifications",
    specTableTag: "Comparison",
    priceLabel: "Available on Request",
    fastCharging: "Fast",
    hours: "Hours",
    minutes: "Minutes",
    labelPower: "Power",
    labelBattery: "Battery Capacity",
    labelRange: "Range",
    labelTransmission: "Transmission",
    labelLifting: "Lifting Capacity",

    techTitle: "Cutting-Edge Technology Inside",
    techBatteryTitle: "Active-Liquid Cooled LFP Battery",
    techBatteryDesc: "We use Lithium Iron Phosphate (LFP) chemistry which is globally recognized as the safest and longest-lasting option for heavy-duty machinery. Our active thermal management prevents overheating and ensures a lifespan of 1500+ charge cycles.",
    techMotorTitle: "Permanent Magnet Synchronous Motors",
    techMotorDesc: "NXT-Drive PMSM motors deliver instant pulling power. Unlike diesel engines that require high RPMs to reach max torque, our electric tractors pull with maximum power from the very moment you start.",

    appsTitle: "Agricultural & Industrial Applications",
    apps: [
      { title: "Commercial Farming", desc: "Ploughing, tilling, spraying, and seeding with absolute precision and low soil compaction." },
      { title: "Sugarcane Haulage", desc: "Heavy-duty load pulling with instant torque, ideal for sugar mills and transport." },
      { title: "Biomass Processing", desc: "Safe indoor operations inside processing facilities due to zero carbon emissions." },
      { title: "Airports & Logistics", desc: "Zero-emission ground support towing and internal logistics for plants and ports." }
    ],

    dieselTitle: "AutoNXT Electric vs. Traditional Diesel Tractor",
    dieselTableSpec: "Feature / Specification",
    dieselTableElectric: "AutoNXT Electric",
    dieselTableDiesel: "Traditional Diesel",
    dieselRows: [
      {
        name: "Fuel / Energy Cost",
        electricMain: "₹1.2 – 2 Lakhs/year",
        electricSub: "(Highly economical electricity consumption)",
        dieselMain: "₹8 – 12 Lakhs/year",
        dieselSub: "(High and volatile diesel prices)"
      },
      {
        name: "Drivetrain Maintenance",
        electricMain: "Very Low",
        electricSub: "(No engine oil, air/fuel filters, or pistons)",
        dieselMain: "High",
        dieselSub: "(Frequent servicing, oil changes, and tune-ups)"
      },
      {
        name: "Carbon Emissions",
        electricMain: "Zero (100% Clean)",
        electricSub: "(Eco-friendly tailpipe, zero local footprint)",
        dieselMain: "High",
        dieselSub: "(Heavy CO₂, particulate matter, and smoke)"
      },
      {
        name: "Torque Delivery",
        electricMain: "Instantaneous",
        electricSub: "(Peak torque available right from 0 RPM)",
        dieselMain: "Delayed",
        dieselSub: "(Requires high RPM build-up to reach peak power)"
      },
      {
        name: "Operational Lifespan",
        electricMain: "Significantly Longer",
        electricSub: "(Fewer moving parts, minimal friction wear)",
        dieselMain: "Shorter",
        dieselSub: "(Continuous engine wear, tear, and mechanical heat)"
      },
      {
        name: "Vibration & Noise",
        electricMain: "Near-Silent",
        electricSub: "(Zero engine noise, minimal operator fatigue)",
        dieselMain: "Very High",
        dieselSub: "(Loud diesel engine clatter and heavy vibrations)"
      }
    ],

    faqTitle: "Frequently Asked Questions",
    faqs: [
      {
        q: "What is the battery life and warranty on AutoNxt tractors?",
        a: "We offer a comprehensive 3-year inbuilt + 2-year extended warranty on the motor, and up to 5-6 years on our LFP batteries, which are rated for 1500+ full charging-discharge cycles."
      },
      {
        q: "How long does it take to charge?",
        a: "Using a standard 6.6 kW AC charger takes around 4-6 hours. With our off-board DC fast charger, the tractor can be charged to 80% in under 2 hours."
      },
      {
        q: "What is the runtime on a single charge?",
        a: "Depending on the model and the payload, the X45H2 offers up to 10 hours of runtime or covers 10 acres of moderate field work per charge."
      },
      {
        q: "Are electric tractors eligible for government subsidies?",
        a: "Yes, AutoNxt electric tractors qualify for FAME-III schemes and state-level EV subsidies, significantly lowering the initial investment cost."
      }
    ],

    ctaTitle: "Experience the Power in Person",
    ctaDesc: "Book a live test drive or schedule a demo at your farm to see how much you can save with AutoNxt.",
    ctaButton: "Book Test Drive Now"
  },
  hi: {
    metaTitle: "आधुनिक खेती के लिए इलेक्ट्रिक ट्रैक्टर — AutoNxt",
    metaDesc: "ऑटोनेक्स्ट के उच्च प्रदर्शन वाले इलेक्ट्रिक ट्रैक्टरों की श्रृंखला का अनुभव करें। शून्य उत्सर्जन, 10 घंटे तक का रनटाइम और डीजल ट्रैक्टरों की तुलना में भारी बचत।",
    metaKeywords: "इलेक्ट्रिक ट्रैक्टर, इलेक्ट्रिक ट्रैक्टर भारत, ऑटोनेक्स्ट, शून्य उत्सर्जन खेती, इलेक्ट्रिक ट्रैक्टर की कीमत",
    heroTitle: "आधुनिक खेती के लिए इलेक्ट्रिक ट्रैक्टर",
    heroSubtitle: "ऑटोनेक्स्ट (AutoNXT) इलेक्ट्रिक ट्रैक्टर भारत के अगली पीढ़ी के बैटरी-संचालित ट्रैक्टर हैं जिन्हें कृषि और औद्योगिक अनुप्रयोगों के लिए डिज़ाइन किया गया है। शून्य प्रत्यक्ष उत्सर्जन, तत्काल टॉर्क, कम परिचालन लागत और उच्च-प्रदर्शन इलेक्ट्रिक खेती तकनीक का अनुभव करें।",
    bookDemo: "डेमो बुक करें",
    viewModels: "मॉडल देखें",
    
    whatIsTitle: "इलेक्ट्रिक ट्रैक्टर क्या है?",
    whatIsP1: "एक इलेक्ट्रिक ट्रैक्टर एक आधुनिक उपयोगिता वाहन है जो पारंपरिक आंतरिक दहन (डीजल) इंजन को एक उन्नत बैटरी-संचालित इलेक्ट्रिक motor ड्राइवट्रेन से बदल देता है। जीवाश्म ईंधन जलाने के बजाय, यह उच्च प्रदर्शन वाले लिथियम-आयन सेल में संग्रहीत स्वच्छ ऊर्जा का उपयोग करता है।",
    whatIsP2: "उच्च-वोल्टेज आर्किटेक्चर पर निर्मित, ऑटोनेक्स्ट इलेक्ट्रिक ट्रैक्टर शून्य निकास धुएं, न्यूनतम गतिशील भागों और बेहद शांत संचालन के साथ उच्च दक्षता प्राप्त करते हैं। यह बदलाव न केवल पर्यावरण की रक्षा करता है बल्कि चालक के स्वास्थ्य में भी सुधार करता है।",

    benefitsTitle: "इलेक्ट्रिक ट्रैक्टरों के लाभ",
    benefits: [
      {
        title: "शून्य प्रत्यक्ष उत्सर्जन",
        desc: "अपनी फसलों, मिट्टी और ऑपरेटरों को जहरीले डीजल धुएं से बचाएं। ग्रीनहाउस और जैविक खेती के लिए आदर्श।"
      },
      {
        title: "80% तक परिचालन बचत",
        desc: "डीजल की बढ़ती कीमतों को अलविदा कहें। बिजली से चार्ज करने की लागत प्रति घंटे 5 गुना तक कम होती है।"
      },
      {
        title: "तत्काल टॉर्क डिलीवरी",
        desc: "इलेक्ट्रिक मोटरें 0 आरपीएम से तुरंत पूर्ण टॉर्क प्रदान करती हैं, जिससे भारी मिट्टी में बेहतर खींचने की शक्ति मिलती है।"
      },
      {
        title: "ऑपरेटर का बेहतर स्वास्थ्य",
        desc: "कम इंजन शोर और कम कंपन स्तर ड्राइवर की थकान को काफी कम करते हैं, जिससे शरीर पर शारीरिक खिंचाव नहीं पड़ता।"
      }
    ],

    whyChooseTitle: "ऑटोनेक्स्ट इलेक्ट्रिक ट्रैक्टर क्यों चुनें?",
    whyChoosePoints: [
      "iCAT प्रमाणित: दुनिया का पहला प्रमाणित हाई-वोल्टेज वाणिज्यिक इलेक्ट्रिक ट्रैक्टर।",
      "स्मार्ट टेलीमैटिक्स: अपने फोन पर रीयल-टाइम जीपीएस, जियो-फेंसिंग और बैटरी स्वास्थ्य ट्रैकिंग।",
      "एक्टिव लिक्विड कूलिंग: थर्मल प्रबंधन जो भारतीय गर्मियों में बैटरी के स्वास्थ्य को सुरक्षित रखता है।",
      "NXT-Drive PMSM मोटर्स: उच्च दक्षता वाली मोटरें जो 96% चरम दक्षता प्रदान करती हैं।"
    ],

    ourModelsTitle: "हमारे इलेक्ट्रिक ट्रैक्टर मॉडल",
    ourModelsSubtitle: "अपने खेत या औद्योगिक कार्यों के लिए सही इलेक्ट्रिक ट्रैक्टर चुनें।",
    modelSpecsLabel: "मुख्य विशेषताएं:",
    learnMore: "और जानें",
    reserveNow: "अभी आरक्षित करें",

    specTableTitle: "इलेक्ट्रिक ट्रैक्टर विनिर्देश",
    specTableTag: "तुलना",
    priceLabel: "अनुरोध पर उपलब्ध",
    fastCharging: "फास्ट",
    hours: "घंटे",
    minutes: "मिनट",
    labelPower: "पावर",
    labelBattery: "बैटरी क्षमता",
    labelRange: "रेंज",
    labelTransmission: "ट्रांसमिशन",
    labelLifting: "उठाने की क्षमता",

    techTitle: "अत्याधुनिक तकनीक",
    techBatteryTitle: "एक्टिव-लिक्विड कूल्ड एलएफपी बैटरी",
    techBatteryDesc: "हम लिथियम आयरन फॉस्फेट (LFP) रसायन का उपयोग करते हैं जो भारी मशीनरी के लिए सबसे सुरक्षित विकल्प है। हमारी सक्रिय थर्मल कूलिंग ओवरहीटिंग को रोकती है और 1500+ चार्ज साइकिल का जीवन सुनिश्चित करती है।",
    techMotorTitle: "स्थायी चुंबक सिंक्रोनस मोटर्स",
    techMotorDesc: "NXT-Drive PMSM मोटरें तुरंत खींचने की शक्ति देती हैं। डीजल इंजनों के विपरीत, हमारे ट्रैक्टर शुरुआत से ही अधिकतम शक्ति के साथ खींचते हैं।",

    appsTitle: "कृषि और औद्योगिक अनुप्रयोग",
    apps: [
      { title: "वाणिज्यिक खेती", desc: "सटीक और कम मिट्टी के जमाव के साथ जुताई, बुवाई और छिड़काव।" },
      { title: "बायोमास प्रसंस्करण", desc: "शून्य कार्बन उत्सर्जन के कारण प्रसंस्करण सुविधाओं के अंदर सुरक्षित संचालन।" },
      { title: "चीनी मिल ढुलाई", desc: "गन्ना ढुलाई और परिवहन कार्यों के लिए आदर्श भारी-भरकम खिंचाव।" },
      { title: "हवाई अड्डे और रसद", desc: "संयंत्रों और बंदरगाहों के लिए शून्य-उत्सर्जन ग्राउंड सपोर्ट टोडिंग।" }
    ],

    dieselTitle: "ऑटोनेक्स्ट इलेक्ट्रिक बनाम पारंपरिक डीजल ट्रैक्टर",
    dieselTableSpec: "विशेषता / विनिर्देश",
    dieselTableElectric: "ऑटोनेक्स्ट इलेक्ट्रिक",
    dieselTableDiesel: "पारंपरिक डीजल",
    dieselRows: [
      {
        name: "ईंधन / ऊर्जा लागत",
        electricMain: "₹1.2 – 2 लाख/वर्ष",
        electricSub: "(अत्यंत किफायती बिजली खपत)",
        dieselMain: "₹8 – 12 लाख/वर्ष",
        dieselSub: "(उच्च और अस्थिर डीजल कीमतें)"
      },
      {
        name: "रखरखाव",
        electricMain: "बहुत कम",
        electricSub: "(कोई इंजन तेल, वायु/ईंधन फिल्टर, या पिस्टन नहीं)",
        dieselMain: "उच्च",
        dieselSub: "(बार-बार सर्विसिंग, तेल परिवर्तन, और ट्यून-अप)"
      },
      {
        name: "कार्बन उत्सर्जन",
        electricMain: "शून्य (100% स्वच्छ)",
        electricSub: "(पर्यावरण के अनुकूल टेलपाइप, शून्य स्थानीय पदचिह्न)",
        dieselMain: "उच्च",
        dieselSub: "(भारी CO₂, कणिका तत्व, और धुआं)"
      },
      {
        name: "टॉर्क डिलीवरी",
        electricMain: "तत्काल",
        electricSub: "(0 आरपीएम से ही उच्चतम टॉर्क उपलब्ध)",
        dieselMain: "देरी से",
        dieselSub: "(चरम शक्ति तक पहुँचने के लिए उच्च आरपीएम की आवश्यकता)"
      },
      {
        name: "परिचालन जीवनकाल",
        electricMain: "काफी लंबा",
        electricSub: "(कम गतिशील हिस्से, न्यूनतम घर्षण घिसाव)",
        dieselMain: "छोटा",
        dieselSub: "(लगातार इंजन का घिसाव और यांत्रिक गर्मी)"
      },
      {
        name: "कंपन और शोर",
        electricMain: "लगभग शांत",
        electricSub: "(शून्य इंजन शोर, न्यूनतम ऑपरेटर थकान)",
        dieselMain: "बहुत उच्च",
        dieselSub: "(तेज डीजल इंजन की खड़खड़ाहट और भारी कंपन)"
      }
    ],

    faqTitle: "अक्सर पूछे जाने वाले प्रश्न",
    faqs: [
      {
        q: "बैटरी लाइफ और वारंटी कितनी है?",
        a: "हम मोटर पर 3 साल की इनबिल्ट + 2 साल की विस्तारित वारंटी और अपनी एलएफपी बैटरी पर 5-6 साल तक की वारंटी प्रदान करते हैं।"
      },
      {
        q: "चार्ज होने में कितना समय लगता है?",
        a: "मानक चार्जर से लगभग 4-6 घंटे लगते हैं। हमारे डीसी फास्ट चार्जर से ट्रैक्टर को 2 घंटे से कम समय में 80% तक चार्ज किया जा सकता है।"
      },
      {
        q: "एक सिंगल चार्ज पर रनटाइम क्या है?",
        a: "मॉडल के आधार पर, X45H2 प्रति चार्ज 10 घंटे तक का रनटाइम या 10 एकड़ के खेत का काम प्रदान करता है।"
      },
      {
        q: "क्या इलेक्ट्रिक ट्रैक्टर सरकारी सब्सिडी के लिए पात्र हैं?",
        a: "हाँ, ये FAME-III योजनाओं और राज्य स्तरीय ईवी सब्सिडी के लिए पात्र हैं, जो निवेश लागत को काफी कम कर देते हैं।"
      }
    ],

    ctaTitle: "शक्ति का साक्षात अनुभव करें",
    ctaDesc: "अपने खेत पर लाइव टेस्ट ड्राइव बुक करें और देखें कि आप ऑटोनेक्स्ट से कितनी बचत कर सकते हैं।",
    ctaButton: "अभी टेस्ट ड्राइव बुक करें"
  },
  mr: {
    metaTitle: "आधुनिक शेतीसाठी इलेक्ट्रिक ट्रॅक्टर — AutoNxt",
    metaDesc: "ऑटोनेक्स्टच्या उच्च कार्यक्षम इलेक्ट्रिक ट्रॅक्टरची श्रेणी पहा. शून्य उत्सर्जन, 10 तासांपर्यंतचा रनटाइम आणि डिझेल ट्रॅक्टरच्या तुलनेत मोठी बचत.",
    metaKeywords: "इलेक्ट्रिक ट्रॅक्टर, इलेक्ट्रिक ट्रॅक्टर भारत, ऑटोनेक्स्ट, शून्य उत्सर्जन शेती, इलेक्ट्रिक ट्रॅक्टर किंमत",
    heroTitle: "आधुनिक शेतीसाठी इलेक्ट्रिक ट्रॅक्टर",
    heroSubtitle: "ऑटोनेक्स्ट (AutoNXT) इलेक्ट्रिक ट्रॅक्टर हे भारताचे पुढील पिढीचे बॅटरी-वर चालणारे ट्रॅक्टर आहेत जे शेती आणि औद्योगिक वापरासाठी डिझाइन केलेले आहेत. शून्य थेट उत्सर्जन, झटपट टॉर्क, कमी धावण्याचा खर्च आणि उच्च-कार्यक्षमता इलेक्ट्रिक शेती तंत्रज्ञानाचा अनुभव घ्या।",
    bookDemo: "डेमो बुक करा",
    viewModels: "मॉडेल पहा",
    
    whatIsTitle: "इलेक्ट्रिक ट्रॅक्टर म्हणजे काय?",
    whatIsP1: "इलेक्ट्रिक ट्रॅक्टर हे एक आधुनिक उपयुक्तता वाहन आहे जे पारंपारिक अंतर्गत ज्वलन (डिझेल) इंजिनला प्रगत बॅटरी-चालित इलेक्ट्रिक मोटर ड्राइव्हट्रेनसह बदलते. जीवाश्म इंधन जाळण्याऐवजी, ते स्वच्छ उर्जेचा वापर करते.",
    whatIsP2: "हाय-व्होल्टेज आर्किटेक्चरवर तयार केलेले, ऑटोनेक्स्ट इलेक्ट्रिक ट्रॅक्टर शून्य एक्झॉस्ट धूर, किमान हलणारे भाग आणि अत्यंत शांत ऑपरेशनसह उच्च कार्यक्षमता प्राप्त करतात. यामुळे धावण्याचा खर्चही मोठ्या प्रमाणात कमी होतो.",

    benefitsTitle: "इलेक्ट्रिक ट्रॅक्टरचे फायदे",
    benefits: [
      {
        title: "शून्य थेट उत्सर्जन",
        desc: "तुमची पिके, माती आणि चालकांना विषारी डिझेलच्या धुरापासून वाचवा. ग्रीनहाऊस आणि सेंद्रिय शेतीसाठी आदर्श."
      },
      {
        title: "80% पर्यंत operation बचत",
        desc: "डिझेलच्या वाढत्या किमतींना निरोप द्या. चार्जिंगचा खर्च ताशी 5 पटीने कमी असतो, आणि देखभाल खर्च शून्य असतो."
      },
      {
        title: "झटपट टॉर्क डिलिव्हरी",
        desc: "इलेक्ट्रिक मोटर 0 आरपीएम पासून त्वरित संपूर्ण टॉर्क प्रदान करतात, ज्यामुळे जड मातीमध्ये खेचण्याची उत्तम शक्ती मिळते."
      },
      {
        title: "चालकाचे चांगले आरोग्य",
        desc: "कमी इंजिनचा आवाज आणि कमी कंपनाचे प्रमाण चालकाचा थकवा कमी करतात, ज्यामुळे शारीरिक त्रास उद्भवत नाही."
      }
    ],

    whyChooseTitle: "ऑटोनेक्स्ट इलेक्ट्रिक ट्रॅक्टर का निवडावा?",
    whyChoosePoints: [
      "iCAT प्रमाणित: जगातील पहिला प्रमाणित हाय-व्होल्टेज व्यावसायिक इलेक्ट्रिक ट्रॅक्टर.",
      "स्मार्ट टेलिमॅटिक्स: तुमच्या फोनवर रिअल-टाइम जीपीएस, जिओ-फेन्सिंग आणि बॅटरी आरोग्य ट्रॅकिंग.",
      "सक्रिय लिक्विड कूलिंग: थर्मल व्यवस्थापन जे उन्हाळ्यात बॅटरीचे तापमान नियंत्रित ठेवते.",
      "NXT-Drive PMSM मोटर्स: उच्च कार्यक्षमतेच्या मोटर ज्या ९६% कमाल कार्यक्षमता देतात."
    ],

    ourModelsTitle: "आमचे इलेक्ट्रिक ट्रॅक्टर मॉडेल",
    ourModelsSubtitle: "तुमच्या शेतीसाठी किंवा औद्योगिक कामांसाठी योग्य इलेक्ट्रिक ट्रॅक्टर निवडा.",
    modelSpecsLabel: "मुख्य तपशील:",
    learnMore: "अधिक जाणून घ्या",
    reserveNow: "आता आरक्षित करा",

    specTableTitle: "इलेक्ट्रिक ट्रॅक्टर वैशिष्ट्ये",
    specTableTag: "तुलना",
    priceLabel: "विनंतीवर उपलब्ध",
    fastCharging: "फास्ट",
    hours: "तास",
    minutes: "मिनिटे",
    labelPower: "पॉवर",
    labelBattery: "बॅटरी क्षमता",
    labelRange: "रेंज",
    labelTransmission: "ट्रांसमिशन",
    labelLifting: "उचलण्याची क्षमता",

    techTitle: "प्रगत तंत्रज्ञान",
    techBatteryTitle: "अॅक्टिव्ह-लिक्विड कूल्ड एलएफपी बॅटरी",
    techBatteryDesc: "आम्ही लिथियम आयर्न फॉस्फेट (LFP) केमिस्ट्री वापरतो जी जड यंत्रसामग्रीसाठी सर्वात सुरक्षित मानली जाते. आमचे सक्रिय कूलिंग बॅटरी खराब होण्यापासून वाचवते.",
    techMotorTitle: "कायमस्वरूपी चुंबक सिंक्रोनस मोटर्स",
    techMotorDesc: "NXT-Drive PMSM मोटर्स त्वरित ओढण्याची शक्ती देतात. डिझेल इंजिनच्या विपरीत, आमचे ट्रॅक्टर पहिल्या सेकंदापासून कमाल पॉवर देतात.",

    appsTitle: "कृषी आणि औद्योगिक उपक्रम",
    apps: [
      { title: "व्यावसायिक शेती", desc: "उत्कृष्ट अचूकतेसह आणि कमी मातीच्या कडकपणासह नांगरणी, पेरणी आणि फवारणी." },
      { title: "बायोमास प्रक्रिया", desc: "शून्य कार्बन उत्सर्जनामुळे प्रक्रिया केंद्रांच्या आत सुरक्षित ऑपरेशन्स." },
      { title: "साखर कारखाना वाहतूक", desc: "ऊस वाहतूक आणि जड वजन ओढण्यासाठी आदर्श ट्रॅक्टर." },
      { title: "विमानतळ आणि लॉजिस्टिक्स", desc: "कारखाने आणि बंदरांसाठी शून्य-उत्सर्जन ग्राउंड सपोर्ट टोईंग." }
    ],

    dieselTitle: "ऑटोनेक्स्ट इलेक्ट्रिक विरुद्ध पारंपारिक डिझेल ट्रॅक्टर",
    dieselTableSpec: "वैशिष्ट्य / तपशील",
    dieselTableElectric: "ऑटोनेक्स्ट इलेक्ट्रिक",
    dieselTableDiesel: "पारंपारिक डिझेल",
    dieselRows: [
      {
        name: "इंधन / ऊर्जा खर्च",
        electricMain: "₹१.२ – २ लाख/वर्ष",
        electricSub: "(अत्यंत किफायतशीर विजेचा वापर)",
        dieselMain: "₹८ – १२ लाख/वर्ष",
        dieselSub: "(उच्च आणि अस्थिर डिझेलचे दर)"
      },
      {
        name: "देखभाल खर्च",
        electricMain: "अतिशय कमी",
        electricSub: "(इंजिन ऑइल, एअर/इंधन फिल्टर किंवा पिस्टन नाही)",
        dieselMain: "उच्च",
        dieselSub: "(वारंवार सर्व्हिसिंग, ऑइल बदल आणि ट्यून-अप)"
      },
      {
        name: "कार्बन उत्सर्जन",
        electricMain: "शून्य (१००% स्वच्छ)",
        electricSub: "(पर्यावरणपूरक एक्झॉस्ट, शून्य स्थानिक पाऊलखुणा)",
        dieselMain: "उच्च",
        dieselSub: "(मोठ्या प्रमाणात CO₂, धूलिकण आणि धूर)"
      },
      {
        name: "टॉर्क डिलिव्हरी",
        electricMain: "झटपट",
        electricSub: "(० आरपीएम पासूनच कमाल टॉर्क उपलब्ध)",
        dieselMain: "उशिरा",
        dieselSub: "(कमाल पॉवर मिळवण्यासाठी उच्च आरपीएम आवश्यक)"
      },
      {
        name: "वापरण्याचा कालावधी",
        electricMain: "खूप जास्त",
        electricSub: "(कमी हलणारे भाग, किमान घर्षण झीज)",
        dieselMain: "कमी",
        dieselSub: "(सतत इंजिनची झीज आणि यांत्रिक उष्णता)"
      },
      {
        name: "कंपन आणि आवाज",
        electricMain: "शांत",
        electricSub: "(शून्य इंजिन आवाज, ऑपरेटरचा कमी थकवा)",
        dieselMain: "खूप जास्त",
        dieselSub: "(मोठा डिझेल इंजिनचा आवाज आणि जड कंपन)"
      }
    ],

    faqTitle: "सतत विचारले जाणारे प्रश्न",
    faqs: [
      {
        q: "बॅटरीचे आयुष्य आणि वॉरंटी किती आहे?",
        a: "आम्ही मोटरवर ३ वर्षे अंगभूत + २ वर्षे विस्तारित वॉरंटी आणि बॅटरीवर ५-६ वर्षांपर्यंतची वॉरंटी देतो."
      },
      {
        q: "चार्ज होण्यासाठी किती वेळ लागतो?",
        a: "नॉर्मल चार्जरने सुमारे ४-६ तास लागतात. फास्ट चार्जरने ट्रॅक्टर २ तासांपेक्षा कमी वेळात ८०% चार्ज होतो."
      },
      {
        q: "एकदा चार्ज केल्यावर किती वेळ चालतो?",
        a: "मॉडेलनुसार, X45H2 एका चार्जवर १० तासांपर्यंत किंवा १० एकर क्षेत्रावर नांगरणीचे काम करू शकतो."
      },
      {
        q: "इलेक्ट्रिक ट्रॅक्टर सरकारी सबसिडीसाठी पात्र आहेत का?",
        a: "होय, आमचे ट्रॅक्टर FAME-III योजना आणि राज्यस्तरीय ईव्ही सबसिडीसाठी पात्र आहेत."
      }
    ],

    ctaTitle: "शांत शक्तीचा अनुभव घ्या",
    ctaDesc: "तुमच्या शेतात लाईव्ह टेस्ट ड्राइव्ह बुक करा आणि बघा तुम्ही ऑटोनेक्स्टच्या साहाय्याने किती बचत करू शकता.",
    ctaButton: "आता टेस्ट ड्राइव्ह बुक करा"
  },
  te: {
    metaTitle: "ఆధునిక వ్యవసాయం కోసం ఎలక్ట్రిక్ ట్రాక్టర్లు — AutoNxt",
    metaDesc: "ఆటోనెక్స్ట్ ఎలక్ట్రిక్ ట్రాక్టర్ల శ్రేణిని కనుగొనండి. సున్నా ఉద్గారాలు, 10 గంటల వరకు రన్‌టైమ్ మరియు డీజిల్ ట్రాక్టర్లతో పోలిస్తే భారీ పొదుపు.",
    metaKeywords: "ఎలక్ట్రిక్ ట్రాక్టర్, ఎలక్ట్రిక్ ట్రాక్టర్ ఇండియా, ఆటోనెక్స్ట్, సున్నా ఉద్గారాల వ్యవసాయం, ఎలక్ట్రిక్ ట్రాక్టర్ ధర",
    heroTitle: "ఆధునిక వ్యవసాయం కోసం ఎలక్ట్రిక్ ట్రాక్టర్లు",
    heroSubtitle: "ఆటోనెక్స్ట్ (AutoNXT) ఎలక్ట్రిక్ ట్రాక్టర్లు వ్యవసాయం మరియు పారిశ్రామిక అవసరాల కోసం రూపొందించబడిన భారతదేశపు తదుపరి తరం బ్యాటరీ-ఆధారిత ట్రాక్టర్లు. సున్నా ప్రత్యక్ష ఉద్గారాలు, తక్షణ టార్క్, తక్కువ నిర్వహణ ఖర్చులు మరియు అధిక-పనితీరు గల ఎలక్ట్రిక్ వ్యవసాయ సాంకేతికతను అనుభవించండి.",
    bookDemo: "డెమో బుక్ చేయండి",
    viewModels: "మోడల్స్ చూడండి",
    
    whatIsTitle: "ఎలక్ట్రిక్ ట్రాక్టర్ అంటే ఏమిటి?",
    whatIsP1: "ఎలక్ట్రిక్ ట్రాక్టర్ అనేది సంప్రదాయ డీజిల్ ఇంజిన్‌ను అధునాతన బ్యాటరీ-ఆధారిత ఎలక్ట్రిక్ మోటార్ డ్రైవ్‌ట్రెయిన్‌తో భర్తీ చేసే ఒక ఆధునిక వాహనం. ఇది శిలాజ ఇంధనాలను ఉపయోగించకుండా, బ్యాటరీలో నిల్వ చేయబడిన స్వచ్ఛమైన విద్యుత్ శక్తిని ఉపయోగిస్తుంది.",
    whatIsP2: "ఆటోనెక్స్ట్ ఎలక్ట్రిక్ ట్రాక్టర్లు సున్నా పొగలు, కనీస కదిలే భాగాలు మరియు నిశ్శబ్ద ఆపరేషన్‌తో అధిక సామర్థ్యాన్ని సాధిస్తాయి. ఇది పర్యావరణాన్ని రక్షించడమే కాకుండా, రన్నింగ్ ఖర్చులను భారీగా తగ్గిస్తుంది.",

    benefitsTitle: "ఎలక్ట్రిక్ ట్రాక్టర్ల ప్రయోజనాలు",
    benefits: [
      {
        title: "సున్నా ప్రత్యక్ష ఉద్గారాలు",
        desc: "మీ పంటలను, నేలను మరియు డ్రైవర్లను హానికరమైన డీజిల్ పొగల నుండి రక్షించండి. గ్రీన్‌హౌస్‌లు మరియు సేంద్రీయ వ్యవసాయానికి అనువైనది."
      },
      {
        title: "80% వరకు రన్నింగ్ ఖర్చుల పొదుపు",
        desc: "పెరుగుతున్న డీజిల్ ధరలకు గుడ్‌బై చెప్పండి. ఎలక్ట్రిక్ ఛార్జింగ్ ఖర్చు గంటకు 5 రెట్లు తక్కువగా ఉంటుంది మరియు మెయింటెనెన్స్ ఉండదు."
      },
      {
        title: "తక్షణ టార్క్ డెలివరీ",
        desc: "ఎలక్ట్రిక్ మోటార్లు 0 ఆర్‌పిఎమ్ నుండి తక్షణమే పూర్తి టార్క్‌ను అందిస్తాయి, ఇది నేలలో అత్యుత్తమ లాగే శక్తిని ఇస్తుంది."
      },
      {
        title: "డ్రైవర్ మెరుగైన ఆరోగ్యం",
        desc: "తక్కువ ఇంజన్ శబ్దం మరియు తక్కువ కంపనాలు డ్రైవర్ అలసటను తగ్గిస్తాయి, దీర్ఘకాలిక శారీరక ఒత్తిడి నుండి కాపాడతాయి."
      }
    ],

    whyChooseTitle: "ఆటోనెక్స్ట్ ఎలక్ట్రిక్ ట్రాక్టర్లను ఎందుకు ఎంచుకోవాలి?",
    whyChoosePoints: [
      "iCAT సర్టిఫైడ్: ప్రపంచంలోనే మొట్టమొదటి ధృవీకరించబడిన హై-వోల్టేజ్ వాణిజ్య ఎలక్ట్రిక్ ట్రాక్టర్.",
      "స్మార్ట్ టెలిమాటిక్స్: మీ ఫోన్లో నిజ-సమయ GPS, జియో-ఫెన్సింగ్ మరియు బ్యాటరీ ఆరోగ్య ట్రాకింగ్.",
      "యాక్టివ్ లిక్విడ్ కూలింగ్: భారతీయ వేసవిలో కూడా బ్యాటరీ జీవితకాలాన్ని రక్షించే థర్మల్ మేనేజ్‌మెంట్.",
      "NXT-Drive PMSM మోటార్లు: 96% గరిష్ట సామర్థ్యాన్ని చేరుకునే అత్యంత సమర్థమైన మోటార్లు."
    ],

    ourModelsTitle: "మా ఎలక్ట్రిక్ ట్రాక్టర్ మోడల్స్",
    ourModelsSubtitle: "మీ వ్యవసాయ లేదా పారిశ్రామిక పనుల కోసం సరైన ఎలక్ట్రిక్ ట్రాక్టర్‌ను ఎంచుకోండి.",
    modelSpecsLabel: "ముఖ్యమైన వివరాలు:",
    learnMore: "మరింత తెలుసుకోండి",
    reserveNow: "ఇప్పుడే బుక్ చేయండి",

    specTableTitle: "ఎలక్ట్రిక్ ట్రాక్టర్ స్పెసిఫికేషన్లు",
    specTableTag: "పోలిక",
    priceLabel: "అభ్యర్థనపై అందుబాటులో ఉంది",
    fastCharging: "ఫాస్ట్",
    hours: "గంటలు",
    minutes: "నిమిషాలు",
    labelPower: "పవర్",
    labelBattery: "బ్యాటరీ సామర్థ్యం",
    labelRange: "పరిధి (రేంజ్)",
    labelTransmission: "ట్రాన్స్మిషన్",
    labelLifting: "లిఫ్టింగ్ సామర్థ్యం",

    techTitle: "అధునాతన సాంకేతికత",
    techBatteryTitle: "యాక్టివ్-లిక్విడ్ కూల్డ్ LFP బ్యాటరీ",
    techBatteryDesc: "మేము లిథియం ఐరన్ ఫాస్ఫేట్ (LFP) బ్యాటరీలను ఉపయోగిస్తాము, ఇవి అత్యంత సురక్షితమైనవిగా గుర్తింపు పొందాయి. మా కూలింగ్ సిస్టమ్ ఓవర్ హీటింగ్‌ను అడ్డుకుంటుంది.",
    techMotorTitle: "పర్మనెంట్ మాగ్నెట్ సింక్రోనస్ మోటార్లు",
    techMotorDesc: "NXT-Drive PMSM మోటార్లు తక్షణ లాగే శక్తిని ఇస్తాయి. డీజిల్ ఇంజిన్‌లలా కాకుండా, ఇవి ప్రారంభం నుండే గరిష్ట శక్తిని అందిస్తాయి.",

    appsTitle: "వ్యవసాయ & పారిశ్రామిక అప్లికేషన్లు",
    apps: [
      { title: "వాణిజ్య వ్యవసాయం", desc: "నాగలి దున్నడం, విత్తనాలు చల్లడం మరియు మందులు పిచికారీ చేయడం వంటి పనులు ఖచ్చితత్వంతో చేయవచ్చు." },
      { title: "బయోమాస్ ప్రాసెసింగ్", desc: "సున్నా కార్బన్ ఉద్గారాల కారణంగా ప్రాసెసింగ్ ఫెసిలిటీల లోపల సురక్షితంగా ఉపయోగించవచ్చు." },
      { title: "చక్కెర మిల్లుల రవాణా", desc: "తక్షణ టార్క్‌తో చెరుకు రవాణా మరియు బరువైన లోడ్లను లాగడానికి అనువైనది." },
      { title: "విమానాశ్రయాలు & లాజిస్టిక్స్", desc: "ప్లాంట్లు మరియు పోర్టుల కోసం సున్నా-ఉద్గార గ్రౌండ్ సపోర్ట్ టోయింగ్ పనులు." }
    ],

    dieselTitle: "ఆటోనెక్స్ట్ ఎలక్ట్రిక్ వర్సెస్ సాధారణ డీజిల్ ట్రాక్టర్",
    dieselTableSpec: "లక్షణాలు / వివరాలు",
    dieselTableElectric: "ఆటోనెక్స్ట్ ఎలక్ట్రిక్",
    dieselTableDiesel: "సాధారణ డీజిల్",
    dieselRows: [
      {
        name: "ఇంధన / శక్తి ఖర్చు",
        electricMain: "₹1.2 – 2 లక్షలు/సంవత్సరానికి",
        electricSub: "(అత్యంత పొదుపైన విద్యుత్ వినియోగం)",
        dieselMain: "₹8 – 12 లక్షలు/సంవత్సరానికి",
        dieselSub: "(ఎక్కువ మరియు హెచ్చుతగ్గులుండే డీజిల్ ధరలు)"
      },
      {
        name: "మెయింటెనెన్స్ ఖర్చు",
        electricMain: "చాలా తక్కువ",
        electricSub: "(ఇంజన్ ఆయిల్, ఎయిర్/ఫ్యూయల్ ఫిల్టర్లు లేదా పిస్టన్లు అవసరం లేదు)",
        dieselMain: "ఎక్కువ",
        dieselSub: "(తరచుగా సర్వీసింగ్, ఆయిల్ చేంజ్ మరియు ట్యూన్-అప్స్)"
      },
      {
        name: "కార్బన్ ఉద్గారాలు",
        electricMain: "సున్నా (100% స్వచ్ఛమైనది)",
        electricSub: "(పర్యావరణ హితమైన టైల్‌పైప్, స్థానిక కాలుష్యం సున్నా)",
        dieselMain: "ఎక్కువ",
        dieselSub: "(భారీగా CO₂, కాలుష్య కణాలు మరియు పొగ)"
      },
      {
        name: "టార్క్ డెలివరీ",
        electricMain: "తక్షణం",
        electricSub: "(0 ఆర్‌పిఎమ్ నుండే గరిష్ట టార్క్ అందుబాటులో ఉంటుంది)",
        dieselMain: "ఆలస్యం",
        dieselSub: "(గరిష్ట శక్తిని అందుకోవడానికి ఎక్కువ ఆర్‌పిఎమ్ అవసరం)"
      },
      {
        name: "ఆపరేటింగ్ లైఫ్‌స్పాన్",
        electricMain: "చాలా ఎక్కువ కాలం",
        electricSub: "(తక్కువ కదిలే భాగాలు, కనీస ఘర్షణ అరుగుదల)",
        dieselMain: "తక్కువ కాలం",
        dieselSub: "(నిరంతరం ఇంజన్ అరుగుదల మరియు యాంత్రిక వేడి)"
      },
      {
        name: "కంపనాలు & శబ్దం",
        electricMain: "నిశ్శబ్దం",
        electricSub: "(ఇంజన్ శబ్దం సున్నా, కనీస డ్రైవర్ అలసట)",
        dieselMain: "సాధారణం కంటే ఎక్కువ",
        dieselSub: "(భారీ డీజిల్ ఇంజన్ శబ్దం మరియు ఎక్కువ కంపనాలు)"
      }
    ],

    faqTitle: "తరచుగా అడిగే ప్రశ్నలు",
    faqs: [
      {
        q: "బ్యాటరీ జీవితకాలం మరియు వారంటీ ఎంత?",
        a: "మేము మోటార్‌పై 3 సంవత్సరాల ఇన్‌బిల్ట్ + 2 సంవత్సరాల పొడిగించిన వారంటీని మరియు బ్యాటరీపై 5-6 సంవత్సరాల వారంటీని అందిస్తాము."
      },
      {
        q: "ఛార్జింగ్ కావడానికి ఎంత సమయం పడుతుంది?",
        a: "సాధారణ ఛార్జర్‌తో సుమారు 4-6 గంటలు పడుతుంది. మా ఫాస్ట్ ఛార్జర్‌తో ట్రాక్టర్‌ను 2 గంటల కంటే तక్కువ సమయంలో 80% ఛార్జ్ చేయవచ్చు."
      },
      {
        q: "ఒక్క ఛార్జ్‌తో ఎంత సమయం నడుస్తుంది?",
        a: "మోడల్‌ను బట్టి, X45H2 ఒక ఛార్జ్‌తో 10 గంటల వరకు లేదా 10 ఎకరాల పొలం పనిని పూర్తి చేయగలదు."
      },
      {
        q: "ఎలక్ట్రిక్ ట్రాక్టర్లకు ప్రభుత్వ సబ్సిడీలు లభిస్తాయా?",
        a: "అవును, మా ట్రాక్టర్లకు FAME-III పథకాలు మరియు రాష్ట్ర స్థాయి ఈవీ సబ్సిడీలు లభిస్తాయి, ఇవి పెట్టుబడి ఖర్చును తగ్గిస్తాయి."
      }
    ],

    ctaTitle: "నిజమైన శక్తిని అనుభవించండి",
    ctaDesc: "మీ పొలంలో ఉచిత టెస్ట్ డ్రైవ్ బుక్ చేసుకోండి మరియు ఆటోనెక్స్ట్‌తో ఎంత ఆదా అవుతుందో మీరే చూడండి.",
    ctaButton: "ఇప్పుడే టెస్ట్ డ్రైవ్ బుక్ చేయండి"
  }
};

export default function ElectricTractors() {
  const { lang, t } = useLang();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Fallback to English if language content is missing
  const content = CONTENT[lang] || CONTENT["en"];
  const texts = t.tractorDetailPage.texts;

  // Static definition of tractor models for this landing page (no implements/attachments)
  // All parameters matched strictly to user spreadsheet documents
  const tractorModels = [
    {
      slug: "x45h2",
      name: "AutoNxt X45H2",
      fullName: "AutoNxt X45H2 Electric Tractor",
      badge: t.tractorDetailPage.tractors.x45h2.badge || "Flagship",
      badgeColor: "bg-primary text-white",
      image: "/images/products/x45h2.webp",
      desc: t.tractorDetailPage.tractors.x45h2.desc,
      specs: [
        { label: content.labelPower || "Power", value: "32 kW (45HP Equiv)" },
        { label: content.labelBattery || "Battery Capacity", value: "38.4 kWh" },
        { label: content.labelRange || "Range", value: "50 km" }
      ],
      glowColor: "rgba(168,0,0,0.15)",
      borderHover: "hover:border-primary/50"
    },
    {
      slug: "x30c2",
      name: "AutoNxt X30C2",
      fullName: "AutoNxt X30C2 Commercial Tractor",
      badge: t.tractorDetailPage.tractors.x30c2.badge || "High Efficiency",
      badgeColor: "bg-emerald-700 text-white",
      image: "/images/3dtractorplaceholder.webp",
      desc: t.tractorDetailPage.tractors.x30c2.desc,
      specs: [
        { label: content.labelPower || "Power", value: "18 kW (30HP Equiv)" },
        { label: content.labelBattery || "Battery Capacity", value: "30.72 kWh" },
        { label: content.labelRange || "Range", value: "90 km" }
      ],
      glowColor: "rgba(5,150,105,0.15)",
      borderHover: "hover:border-emerald-500/50"
    },
    {
      slug: "x25h2",
      name: "AutoNxt X27H2",
      fullName: "AutoNxt X27H2 Compact Tractor",
      badge: t.tractorDetailPage.tractors.x25h2.badge || "Compact",
      badgeColor: "bg-accent text-white",
      image: "/images/products/x27h2.webp",
      desc: t.tractorDetailPage.tractors.x25h2.desc,
      specs: [
        { label: content.labelPower || "Power", value: "15 kW (25HP Equiv)" },
        { label: content.labelBattery || "Battery Capacity", value: "22.0 kWh" },
        { label: content.labelRange || "Range", value: "40-50 km" }
      ],
      glowColor: "rgba(30,64,175,0.15)",
      borderHover: "hover:border-accent/50"
    }
  ];

  // Specifications Comparison Table Data - strictly matched to user's spreadsheet screenshots
  const specTableData = [
    {
      model: "X27H2",
      power: "15 kW (25 HP Equivalent)",
      battery: "22 kWh",
      range: "40–50 km",
      transmission: "Sliding Mesh (8F + 2R)",
      charging: "AC Slow - 6.6 kW",
      lifting: "1000 kg",
      price: content.priceLabel || "Available on Request"
    },
    {
      model: "X30C2",
      power: "18 kW (30 HP Equivalent)",
      battery: "30.72 kWh (LFPO4)",
      range: "90 km (with Rated Load)",
      transmission: "Constant Mesh (Carraro) (8F + 2R)",
      charging: `2 ${content.hours || "Hours"}`,
      lifting: "1200 kg",
      price: content.priceLabel || "Available on Request"
    },
    {
      model: "X45H2",
      power: "32 kW (45 HP Equivalent)",
      battery: "38.4 kWh",
      range: "50 km",
      transmission: "Sliding Mesh (8F + 2R)",
      charging: `45 ${content.minutes || "Minutes"} (DC Fast)`,
      lifting: "1800 kg",
      price: content.priceLabel || "Available on Request"
    }
  ];

  return (
    <div className="w-full min-h-screen bg-background text-foreground pt-16">
      <SEO 
        title={content.metaTitle} 
        description={content.metaDesc} 
        keywords={content.metaKeywords}
      />

      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden pt-6 pb-28 lg:pt-12 lg:pb-44 bg-background text-foreground">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none scale-105 transition-transform duration-1000"
          style={{ backgroundImage: "url('/images/hero/image2.png')" }}
        />
        
        <div className="w-full max-w-[1500px] ml-0 mr-auto pl-3 pr-4 md:pl-10 md:pr-16 lg:pl-16 lg:pr-24 relative z-10 text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-primary text-xs font-bold uppercase tracking-widest">
                Zero Emissions · High Power
              </span>
            </div>
            {/* authoritative H1 targeting electric tractor */}
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15] tracking-tight text-foreground mb-6">
              {content.heroTitle}
            </h1>
            <p className="text-foreground/90 text-base md:text-lg leading-relaxed mb-10 max-w-2xl font-medium">
              {(() => {
                const words = content.heroSubtitle.split(" ");
                const chunks = [];
                for (let i = 0; i < words.length; i += 8) {
                  chunks.push(words.slice(i, i + 8).join(" "));
                }
                return chunks.map((chunk, idx) => (
                  <span key={idx} className="block md:inline">
                    {chunk}
                    {idx < chunks.length - 1 && <br className="hidden md:inline" />}{" "}
                  </span>
                ));
              })()}
            </p>
            <div className="flex flex-wrap justify-start gap-4">
              <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 font-semibold px-8 h-13 rounded-xl shadow-lg shadow-primary/25">
                <a href="#book-demo">{content.bookDemo}</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-border hover:bg-muted text-foreground font-semibold px-8 h-13 rounded-xl">
                <a href="#models">{content.viewModels}</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WHAT IS AN ELECTRIC TRACTOR ── */}
      <section className="py-20 border-t border-border bg-muted/20">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-primary rounded-full" />
                <p className="text-primary font-bold text-xs uppercase tracking-widest">Introduction</p>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                {content.whatIsTitle}
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                {content.whatIsP1}
              </p>
              <p className="text-muted-foreground text-base leading-relaxed">
                {content.whatIsP2}
              </p>
            </div>
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative border border-border bg-card rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center max-w-sm">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Leaf className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display font-bold text-xl mb-3 text-foreground">100% Clean Energy</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Replacing old internal combustion diesel engines with premium silent lithium cells and high-voltage PMSM drivetrains.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BENEFITS OF ELECTRIC TRACTORS ── */}
      <section className="py-20 border-t border-border bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-primary rounded-full" />
              <p className="text-primary font-bold text-xs uppercase tracking-widest">Key Advantages</p>
              <div className="h-px w-8 bg-primary rounded-full" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {content.benefitsTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {content.benefits.map((b: any, i: number) => (
              <div key={i} className="flex gap-5 items-start p-6 bg-card border border-border rounded-2xl hover:border-primary/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  {i === 0 && <Leaf className="w-6 h-6 text-primary" />}
                  {i === 1 && <Zap className="w-6 h-6 text-primary" />}
                  {i === 2 && <Activity className="w-6 h-6 text-primary" />}
                  {i === 3 && <Shield className="w-6 h-6 text-primary" />}
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg mb-2">{b.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE AUTONXT ── */}
      <section className="py-20 border-t border-border bg-muted/20">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="bg-card border border-border rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-primary" />
                <p className="text-primary font-bold text-xs uppercase tracking-widest">Certification & Excellence</p>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                {content.whyChooseTitle}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                {content.whyChoosePoints.map((pt: string, i: number) => (
                  <div key={i} className="flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-sm font-medium leading-relaxed">{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR MODELS SECTION ── */}
      <section id="models" className="py-20 border-t border-border bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-primary rounded-full" />
              <p className="text-primary font-bold text-xs uppercase tracking-widest">Drivetrains</p>
              <div className="h-px w-8 bg-primary rounded-full" />
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
              {content.ourModelsTitle}
            </h2>
            <p className="text-muted-foreground">
              {content.ourModelsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tractorModels.map((tractor) => (
              <div
                key={tractor.slug}
                className={`group flex flex-col justify-between bg-card border border-border rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 ${tractor.borderHover}`}
                style={{ boxShadow: `0 10px 30px -10px ${tractor.glowColor}` }}
              >
                <div>
                  {/* Image area */}
                  <div className="relative bg-muted/30 flex items-center justify-center px-6 py-10 overflow-hidden border-b border-border">
                    <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full ${tractor.badgeColor}`}>
                      {tractor.badge}
                    </span>
                    <img
                      src={tractor.image}
                      alt={tractor.fullName}
                      className="h-44 object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="font-display font-bold text-2xl text-foreground group-hover:text-primary transition-colors">
                      {tractor.name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {tractor.desc}
                    </p>

                    {/* Quick Specs */}
                    <div className="pt-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-foreground/80 mb-2">
                        {content.modelSpecsLabel}
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {tractor.specs.map((sp, idx) => (
                          <div key={idx} className="bg-muted/50 rounded-xl p-2 text-center border border-border/60">
                            <p className="text-[10px] text-muted-foreground font-semibold uppercase">{sp.label}</p>
                            <p className="text-xs text-foreground font-bold truncate mt-0.5">{sp.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="p-6 pt-0 flex gap-3">
                  <Button asChild variant="outline" className="flex-1 rounded-xl h-11 text-xs sm:text-sm">
                    <Link href={`/product/${tractor.slug}`}>
                      {content.learnMore} <ArrowRight className="ml-1 w-3.5 h-3.5" />
                    </Link>
                  </Button>
                  <Button asChild className="flex-1 rounded-xl h-11 text-xs sm:text-sm bg-primary text-white hover:bg-primary/90">
                    <Link href="/book">
                      {content.reserveNow}
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ELECTRIC TRACTOR SPECIFICATIONS (COMPARISON TABLE) ── */}
      <section className="py-20 border-t border-border bg-muted/20">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-primary rounded-full" />
              <p className="text-primary font-bold text-xs uppercase tracking-widest">{content.specTableTag}</p>
              <div className="h-px w-8 bg-primary rounded-full" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {content.specTableTitle}
            </h2>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border bg-muted/60">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Model</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">{content.labelPower}</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">{content.labelBattery}</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">{content.labelRange}</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">{content.labelTransmission}</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Charging</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">{content.labelLifting}</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-primary">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {specTableData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-muted/10 transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold text-foreground">{row.model}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{row.power}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{row.battery}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{row.range}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{row.transmission}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{row.charging}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{row.lifting}</td>
                      <td className="px-6 py-4 text-sm text-primary font-bold">{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── TECHNOLOGY SECTION ── */}
      <section className="py-20 border-t border-border bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-primary rounded-full" />
              <p className="text-primary font-bold text-xs uppercase tracking-widest">Engineering</p>
              <div className="h-px w-8 bg-primary rounded-full" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {content.techTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-card border-border overflow-hidden">
              <CardContent className="p-8 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <BatteryCharging className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground">{content.techBatteryTitle}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {content.techBatteryDesc}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border overflow-hidden">
              <CardContent className="p-8 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground">{content.techMotorTitle}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {content.techMotorDesc}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ── APPLICATIONS ── */}
      <section className="py-20 border-t border-border bg-muted/20">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-primary rounded-full" />
              <p className="text-primary font-bold text-xs uppercase tracking-widest">Utility</p>
              <div className="h-px w-8 bg-primary rounded-full" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {content.appsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.apps.map((app: any, idx: number) => (
              <div key={idx} className="bg-card border border-border rounded-2xl p-6 hover:border-primary/20 transition-all duration-300">
                <h3 className="font-bold text-foreground text-lg mb-2">{app.title}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{app.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIESEL COMPARISON TABLE ── */}
      <section className="py-20 border-t border-border bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-primary rounded-full" />
              <p className="text-primary font-bold text-xs uppercase tracking-widest">Performance comparison</p>
              <div className="h-px w-8 bg-primary rounded-full" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {content.dieselTitle}
            </h2>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border bg-muted/60">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">{content.dieselTableSpec}</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-primary">{content.dieselTableElectric}</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">{content.dieselTableDiesel}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {content.dieselRows.map((row: any, i: number) => (
                    <tr key={i} className="hover:bg-muted/10 transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold text-foreground">{row.name}</td>
                      <td className="px-6 py-4 text-sm text-primary font-medium">
                        <div className="font-bold">{row.electricMain}</div>
                        <div className="text-xs text-muted-foreground italic mt-0.5">{row.electricSub}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        <div className="font-semibold text-foreground/90">{row.dieselMain}</div>
                        <div className="text-xs text-muted-foreground/75 italic mt-0.5">{row.dieselSub}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section className="py-20 border-t border-border bg-muted/20">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-primary rounded-full" />
              <p className="text-primary font-bold text-xs uppercase tracking-widest">FAQ</p>
              <div className="h-px w-8 bg-primary rounded-full" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {content.faqTitle}
            </h2>
          </div>

          <div className="space-y-4">
            {content.faqs.map((faq: any, i: number) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="border border-border bg-card rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-foreground text-sm sm:text-base hover:bg-muted/20 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 pt-0 border-t border-border text-muted-foreground text-xs sm:text-sm leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BOOK DEMO / CTA SECTION ── */}
      <section id="book-demo" className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(0,72%,30%,0.5),transparent_65%)] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 text-center relative z-10 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold">
              {content.ctaTitle}
            </h2>
            <p className="text-white/80 text-sm sm:text-base">
              {content.ctaDesc}
            </p>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold h-13 px-8 rounded-xl shadow-2xl">
              <Link href="/book">
                {content.ctaButton} <ArrowRight className="ml-2 w-4.5 h-4.5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
