import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { useLang } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CustomSelect } from "@/components/ui/custom-select";
import {
  Zap, BatteryCharging, Shield, Activity, Clock, Weight, Wrench,
  Thermometer, Settings, CheckCircle2, ArrowRight, ChevronDown,
  Info, Leaf, Sparkles, ShieldAlert, Award, HelpCircle, Calculator, Check
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
      {
        title: "iCAT Certified",
        desc: "World's first high-voltage electric tractor certified for commercial deployment."
      },
      {
        title: "45 HP Equivalent",
        desc: "Instant electric torque with heavy-duty agricultural performance."
      },
      {
        title: "1500+ Charge Cycles",
        desc: "Long-life LFP battery engineered for Indian operating conditions."
      },
      {
        title: "Up to 80% Lower Running Cost",
        desc: "Lower fuel and maintenance costs compared to diesel tractors."
      }
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
        q: "What is an electric tractor?",
        a: "An electric tractor is a battery-powered agricultural and industrial vehicle that functions without a conventional diesel internal combustion engine. Powered by advanced high-torque electric motors (such as Permanent Magnet Synchronous Motors) and high-density rechargeable battery packs, it delivers instant maximum torque at zero RPM. This design ensures highly responsive and precise operation, near-silent performance, and zero direct tailpipe emissions. AutoNXT electric tractors, like the X45H2, are engineered to handle a variety of heavy-duty tasks such as primary and secondary tillage, transport, and spraying while lowering operating costs and minimizing environmental impact. By replacing the complex transmission and engine components of diesel tractors with solid-state electric drivetrains, electric tractors offer a cleaner, more efficient, and structurally simpler solution for modern sustainable farming and commercial logistics operations."
      },
      {
        q: "How does an electric tractor work?",
        a: "Unlike diesel tractors that burn fuel to drive pistons and a mechanical transmission, an electric tractor works through a streamlined electric drivetrain. The system is powered by a high-voltage Lithium Ferro Phosphate (LFP) battery pack, which stores electrical energy. When the operator presses the accelerator, an electronic controller regulates the flow of current from the battery to a high-efficiency electric motor, such as a PMSM (Permanent Magnet Synchronous Motor). The motor converts this electrical energy into rotational force, delivering high torque directly to the wheels via a simplified gearbox. Since electric motors produce maximum torque instantly from a standstill, there is no need to build up engine RPM. Auxiliary power systems, such as hydraulics for lifting and the Power Take-Off (PTO) shaft for running implements, are driven either by the main motor or dedicated auxiliary motors, providing precise control and high efficiency without mechanical power loss."
      },
      {
        q: "What are the benefits of electric tractors over diesel tractors?",
        a: "Electric tractors offer several distinct advantages over traditional diesel tractors. First, they eliminate direct tailpipe emissions, helping reduce carbon footprint and allowing safe operation inside greenhouses, warehouses, and closed industrial facilities. Second, they produce near-silent operation with minimal vibration, reducing operator fatigue and noise pollution. Third, they provide significant cost savings. Without diesel fuel costs and with fewer moving mechanical parts (no engine oil, filters, spark plugs, or complex exhaust systems), routine maintenance costs are cut by up to 60-80%. Fourth, they deliver instant torque for immediate pulling power, making them highly responsive under heavy loads. Finally, they incorporate smart digital features like telematics, live GPS tracking, and geofencing to manage operations remotely. Combined, these benefits make electric tractors a cleaner, quieter, more cost-effective, and smarter alternative for modern agriculture and industrial tasks."
      },
      {
        q: "How long does it take to charge an AutoNXT electric tractor?",
        a: "The charging time for an AutoNXT electric tractor depends on the battery capacity of the specific model and the charging infrastructure used. AutoNXT tractors support both AC slow charging and DC fast charging. For example, charging a tractor with a standard 6.6 kW AC charger or a typical 15 Ampere farm/home socket takes approximately 4 to 6 hours for a full charge from 0 to 100% (or up to 8 hours for larger battery capacities). For faster turnarounds, AutoNXT tractors equipped with liquid-cooled batteries support off-board DC fast charging of up to 60 kW. Using a DC fast charger, the battery can reach 80% capacity in 45 minutes to 2 hours. This dual-charging capability provides operators with the flexibility of overnight charging at the farm or quick top-ups during intense working shifts."
      },
      {
        q: "What is the battery life of an AutoNXT electric tractor?",
        a: "AutoNXT electric tractors utilize high-grade Lithium Ferro Phosphate (LFP) battery technology, which is known for its thermal stability, safety, and long lifecycle under demanding conditions. LFP chemistry is ideally suited for agricultural environments because it can withstand high operating temperatures without risk. The battery packs are rated for 1500+ full charge-discharge cycles. Under normal operating conditions, this cycle life translates to an expected service life of approximately 6 to 8 years before the battery's capacity naturally degrades to 80% of its original rating. To ensure long-term peace of mind, AutoNXT provides robust warranties. For instance, the X45H2 model features a battery warranty of 6 years, 6000 hours, or 1500 charging cycles (whichever occurs earlier), ensuring reliable performance season after season."
      },
      {
        q: "Which farming implements are compatible?",
        a: "AutoNXT electric tractors are designed to be fully compatible with standard category-1 and category-2 three-point linkage systems and conventional Power Take-Off (PTO) shafts. This ensures that you do not need to purchase specialized tools and can continue using your existing implements. Compatible farming implements include primary and secondary tillage tools like reversible ploughs, rotary tillers (rotavators), and disc harrows, as well as sowing and seeding equipment like seed drills. They also support crop protection and management tools such as boom sprayers, square balers, and trailers for post-harvest crop transport. For industrial and material handling operations, AutoNXT tractors support specialized hydraulic attachments including loader buckets, grabbers, catchers, and catchers for waste management, construction, and biomass transport."
      },
      {
        q: "What is the operating cost of an electric tractor?",
        a: "The operating cost of an electric tractor is substantially lower than that of a diesel tractor, offering a highly attractive return on investment (ROI). In India, diesel tractors consume between 2.5 to 4.0 litres of fuel per hour, translating to an hourly running cost of ₹250 to ₹400 based on diesel prices. In contrast, an AutoNXT electric tractor consumes between 3.0 to 5.5 units (kWh) of electricity per hour. With agricultural electricity tariffs ranging from ₹4 to ₹8 per unit, the energy cost is only ₹12 to ₹44 per hour. Furthermore, because electric drivetrains have fewer moving parts, routine maintenance expenses (filters, lubricants, engine servicing) are reduced by approximately 70-80%. Over a year of typical operation (e.g., 200 to 250 working days), these savings in energy and maintenance can add up to ₹1.5 lakh to ₹2.5 lakh annually."
      },
      {
        q: "Is financing available for AutoNXT electric tractors?",
        a: "Yes, financing options are available for purchasing AutoNXT electric tractors. To facilitate the transition to electric farming, AutoNXT works in partnership with leading public and private sector banks, as well as Non-Banking Financial Companies (NBFCs) specializing in agricultural and electric vehicle loans. Customers can access customized loan packages with competitive interest rates, flexible repayment options aligned with harvesting seasons, and loan tenures ranging from 3 to 5 years. Additionally, because AutoNXT tractors qualify for central government incentives such as the FAME-III scheme and various state-specific EV subsidies (including road tax and registration fee exemptions), the overall financed amount is reduced, making monthly EMI payments affordable for farmers and commercial fleet operators."
      },
      {
        q: "What maintenance is required?",
        a: "Electric tractors require significantly less maintenance than diesel tractors because they eliminate the internal combustion engine and its complex mechanical transmission. There is no need for regular engine oil changes, oil filter replacements, fuel filters, spark plugs, or exhaust system upkeep. The primary maintenance required for an AutoNXT electric tractor is periodic inspection of the liquid cooling system (if equipped), checking hydraulic fluid levels for the 3-point linkage, inspecting brakes, and maintaining tyre pressure. The electric motor and battery pack are sealed units and do not require routine servicing, having a service interval of 1000 hours. AutoNXT recommends keeping the battery clean, avoiding complete discharges below 10%, and performing regular software diagnostics via the onboard telematics system."
      },
      {
        q: "Why choose AutoNXT electric tractors?",
        a: "Choosing AutoNXT means investing in India's leading indigenous electric tractor technology built specifically for demanding tropical conditions. Unlike retrofitted options, AutoNXT tractors are designed from the ground up to integrate high-efficiency PMSM motors and robust LFP battery chemistry, backed by a 6-year battery warranty on prime models. AutoNXT stands out by offering advanced liquid cooling for battery stability, smart telematics for live GPS tracking, geo-fencing, and battery health monitoring. In addition, AutoNXT tractors deliver instant maximum torque, silent operations, and low running costs that slash bills by up to 80%. Backed by iCAT certification and a growing network of service touchpoints, AutoNXT offers a technically mature, certified, and financially viable path to sustainable agriculture and industrial haulage."
      }
    ],

    ctaTitle: "Experience the Power in Person",
    ctaDesc: "Book a live test drive or schedule a demo at your farm to see how much you can save with AutoNxt.",
    ctaButton: "Book Test Drive Now",
    
    // Savings Calculator & Pricing Section (CHANGE 3 & 4)
    calculatorTitle: "Electric Tractor Running Cost Calculator",
    calculatorSubtitle: "See how much you can save by switching from a traditional diesel tractor to an AutoNXT electric tractor.",
    modelLabel: "Select Tractor Model / HP Class",
    dieselCostLabel: "Current Diesel Price (₹/litre)",
    electricityCostLabel: "Electricity Cost (₹/kWh unit)",
    usageHoursLabel: "Usage Hours per Day",
    usageDaysLabel: "Working Days per Year",
    dieselTractorCost: "Diesel Tractor Cost",
    autoNxtElectricCost: "AutoNXT Electric Cost",
    annualSavings: "Estimated Annual Savings",
    perYear: "/year",
    savingsDisclaimer: "*Calculations are based on estimated fuel consumption, charging efficiencies, and standard wear-and-tear maintenance rates. Individual results may vary depending on operational load, soil condition, and implement usage.",
    assumptionsTitle: "Calculation Assumptions",
    dieselConsumptionRate: "Diesel consumption rate",
    electricConsumptionRate: "Electricity consumption rate",
    dieselMaintRate: "Diesel maintenance rate",
    electricMaintRate: "Electric maintenance rate",
    hr: "hr",
    ltr: "L",
    unit: "unit",
    bookDemoBtn: "Book Free Consultation",

    priceTitle: "Electric Tractor Price in India",
    priceDescP1: "The price of an electric tractor depends on several factors including horsepower, battery capacity, operating hours, charging configuration, and the attachments required for your farming or industrial operations.",
    priceDescP2: "AutoNXT offers multiple electric tractor platforms for commercial agriculture, biomass handling, airports, logistics, and industrial applications. Because every deployment has different operational requirements, pricing is provided based on your use case.",
    priceDescP3: "Book a free consultation to receive model recommendations, estimated operating costs, financing options, and the latest pricing.",
    priceDependsTitle: "Price depends on:",
    priceDependsItems: [
      "Model & HP Equivalent",
      "Battery Capacity",
      "Horsepower & Torque Requirements",
      "Application (Agri / Industrial)",
      "Required Attachments"
    ],
    requestPriceBtn: "Request Price",
    bookFreeDemoBtn: "Book Free Demo"
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
      {
        title: "iCAT प्रमाणित",
        desc: "व्यावसायिक उपयोग के लिए प्रमाणित दुनिया का पहला हाई-वोल्टेज इलेक्ट्रिक ट्रैक्टर।"
      },
      {
        title: "45 HP के समकक्ष",
        desc: "भारी कृषि कार्यों के लिए तत्काल इलेक्ट्रिक टॉर्क और उच्च प्रदर्शन।"
      },
      {
        title: "1500+ चार्ज साइकिल",
        desc: "भारतीय कृषि परिस्थितियों के अनुकूल लंबे जीवन वाली LFP बैटरी तकनीक।"
      },
      {
        title: "80% तक कम रनिंग कॉस्ट",
        desc: "डीजल ट्रैक्टरों की तुलना में ईंधन और रखरखाव लागत में भारी बचत।"
      }
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
        q: "इलेक्ट्रिक ट्रैक्टर क्या है?",
        a: "इलेक्ट्रिक ट्रैक्टर एक बैटरी-चालित कृषि और औद्योगिक वाहन है जो पारंपरिक डीजल दहन इंजन के बिना काम करता है। यह उन्नत इलेक्ट्रिक मोटर (जैसे स्थायी चुंबक सिंक्रोनस मोटर्स) और उच्च-घनत्व वाली रिचार्जेबल बैटरी पैक द्वारा संचालित होता है, जो शून्य आरपीएम पर भी तत्काल अधिकतम टॉर्क प्रदान करता है। यह डिज़ाइन शांत संचालन, न्यूनतम कंपन और शून्य प्रत्यक्ष टेलपाइप उत्सर्जन सुनिश्चित करता है। ऑटोनेक्स्ट इलेक्ट्रिक ट्रैक्टरों को जुताई, ढुलाई, छिड़काव और अन्य कृषि कार्यों के लिए डिज़ाइन किया गया है, जो ईंधन और रखरखाव की लागत को काफी कम करते हैं। यह आधुनिक टिकाऊ खेती के लिए एक स्मार्ट समाधान है।"
      },
      {
        q: "इलेक्ट्रिक ट्रैक्टर कैसे काम करता है?",
        a: "डीजल ट्रैक्टरों के विपरीत जो गियरबॉक्स और यांत्रिक ट्रांसमिशन को चलाने के लिए ईंधन जलाते हैं, इलेक्ट्रिक ट्रैक्टर एक सरल इलेक्ट्रिक ड्राइवट्रेन का उपयोग करता है। यह लिथियम फेरो फॉस्फेट (LFP) बैटरी पैक से ऊर्जा प्राप्त करता है। जब ऑपरेटर एक्सीलेटर दबाता है, तो इलेक्ट्रॉनिक कंट्रोलर बैटरी से मोटर (जैसे PMSM) में करंट के प्रवाह को नियंत्रित करता है, जो तुरंत पहियों को टॉर्क प्रदान करती है। इसमें आरपीएम बढ़ाने की आवश्यकता नहीं होती है, जिससे संचालन अधिक सुचारू और ऊर्जा-कुशल हो जाता है।"
      },
      {
        q: "डीजल ट्रैक्टरों की तुलना में इलेक्ट्रिक ट्रैक्टरों के क्या लाभ हैं?",
        a: "इलेक्ट्रिक ट्रैक्टर कई बड़े लाभ प्रदान करते हैं: वे कोई प्रदूषण नहीं फैलाते हैं (शून्य उत्सर्जन), जिससे पर्यावरण सुरक्षित रहता है; वे बहुत शांत चलते हैं और कंपन नहीं करते हैं, जिससे ऑपरेटर को थकान नहीं होती है; उनके चलने का खर्च डीजल की तुलना में 80% तक कम होता है; और उनमें इंजन ऑयल, फिल्टर या जटिल गियरबॉक्स नहीं होने के कारण रखरखाव का खर्च भी 70-80% तक कम हो जाता है। इसके अलावा, इनमें लाइव जीपीएस ट्रैकिंग और स्मार्ट टेलीमैटिक्स जैसी डिजिटल सुविधाएं भी होती हैं।"
      },
      {
        q: "ऑटोनेक्स्ट इलेक्ट्रिक ट्रैक्टर को चार्ज करने में कितना समय लगता है?",
        a: "चार्जिंग का समय मुख्य रूप से चार्जर के प्रकार और बैटरी की क्षमता पर निर्भर करता है। साधारण 6.6 kW AC चार्जर या 15 एम्पियर के घरेलू सॉकेट का उपयोग करके बैटरी को पूरी तरह (0 से 100%) चार्ज करने में 4 से 6 घंटे का समय लगता है। हालांकि, यदि आप ऑटोनेक्स्ट के लिक्विड-कूल्ड बैटरी सिस्टम के साथ 60 kW डीसी फास्ट चार्जर का उपयोग करते हैं, तो ट्रैक्टर को 80% तक केवल 45 मिनट से 2 घंटे में चार्ज किया जा सकता है, जो व्यस्त सीज़न में बहुत उपयोगी है।"
      },
      {
        q: "ऑटोनेक्स्ट इलेक्ट्रिक ट्रैक्टर की बैटरी लाइफ क्या है?",
        a: "ऑटोनेक्स्ट इलेक्ट्रिक ट्रैक्टर उच्च गुणवत्ता वाली लिथियम फेरो फॉस्फेट (LFP) बैटरी का उपयोग करते हैं, जो भारतीय कृषि परिस्थितियों के लिए सबसे सुरक्षित और टिकाऊ मानी जाती हैं। ये बैटरी पैक 1500 से अधिक पूर्ण चार्ज-डिस्चार्ज चक्रों के लिए रेटेड हैं, जिसका अर्थ है कि सामान्य उपयोग में इनका जीवनकाल लगभग 6 से 8 वर्ष होता है। ऑटोनेक्स्ट अपने प्रमुख मॉडल जैसे X45H2 पर 6 वर्ष, 6000 घंटे या 1500 चार्जिंग चक्र (जो भी पहले हो) की बैटरी वारंटी प्रदान करता है।"
      },
      {
        q: "कौन से कृषि उपकरण (इम्प्लीमेंट्स) इसके साथ काम कर सकते हैं?",
        a: "ऑटोनेक्स्ट इलेक्ट्रिक ट्रैक्टर मानक श्रेणी-1 और श्रेणी-2 के थ्री-पॉइंट लिंकेज और पारंपरिक पावर टेक-ऑफ (PTO) शाफ्ट के साथ आते हैं। इसका मतलब है कि आप अपने मौजूदा सभी कृषि उपकरणों का उपयोग कर सकते हैं। यह रोटावेटर, कल्टीवेटर, हल, सीड ड्रिल, बूम स्प्रेयर, और थ्रेशर के साथ पूरी तरह से काम करता है। औद्योगिक कार्यों के लिए, इसे लोडर बकेट, ग्रैबर और कचरा प्रबंधन उपकरणों के साथ भी जोड़ा जा सकता है।"
      },
      {
        q: "इलेक्ट्रिक ट्रैक्टर को चलाने का खर्च कितना है?",
        a: "डीजल ट्रैक्टर का औसत खर्च ₹250 से ₹400 प्रति घंटा होता है, जबकि ऑटोनेक्स्ट इलेक्ट्रिक ट्रैक्टर केवल ₹12 से ₹44 प्रति घंटे के बिजली खर्च पर चलता है (कृषि बिजली दरों के अनुसार)। इसके इलेक्ट्रिक सिस्टम में कम पुर्जे होने के कारण, मोबिल ऑयल और बार-बार होने वाले सर्विस का खर्च भी 80% तक बचता है। इससे सालाना ₹1.5 लाख से ₹2.5 लाख तक की सीधी बचत होती है।"
      },
      {
        q: "क्या ऑटोनेक्स्ट इलेक्ट्रिक ट्रैक्टर के लिए लोन/फाइनेंस की सुविधा उपलब्ध है?",
        a: "हाँ, ऑटोनेक्स्ट देश के प्रमुख सार्वजनिक और निजी बैंकों तथा गैर-बैंकिंग वित्तीय कंपनियों (NBFCs) के साथ मिलकर आसान फाइनेंसिंग और लोन विकल्प प्रदान करता है। किसान फसल कटाई के सीजन के अनुसार लचीली ईएमआई (EMI) योजनाएं चुन सकते हैं। इसके अलावा, ट्रैक्टर FAME-III योजना और राज्य स्तरीय ईवी सब्सिडी के तहत रोड टैक्स और रजिस्ट्रेशन छूट के लिए पात्र है, जिससे कुल लोन राशि कम हो जाती है।"
      },
      {
        q: "इलेक्ट्रिक ट्रैक्टर में किस प्रकार के रखरखाव की आवश्यकता होती है?",
        a: "इलेक्ट्रिक ट्रैक्टर में इंजन नहीं होने के कारण बहुत कम रखरखाव की आवश्यकता होती है। आपको मोबाइल ऑयल, एयर फिल्टर या स्पार्क प्लग बदलने की कोई आवश्यकता नहीं है। केवल हाइड्रोलिक ऑयल स्तर, ब्रेक की स्थिति, टायर प्रेशर और कूलिंग सिस्टम की समय-समय पर जांच करनी होती है। इसका सर्विस इंटरवल 1000 घंटे का है, और टेलीमैटिक्स के जरिए किसी भी खराबी का पता पहले ही लग जाता है।"
      },
      {
        q: "ऑटोनेक्स्ट इलेक्ट्रिक ट्रैक्टर ही क्यों चुनें?",
        a: "ऑटोनेक्स्ट भारत का पहला स्वदेशी तकनीक से बना इलेक्ट्रिक ट्रैक्टर है जो भारतीय खेतों के लिए पूरी तरह अनुकूल है। इसमें उच्च-दक्षता वाली PMSM मोटर, सुरक्षित LFP लिक्विड-कूल्ड बैटरी और 6 साल तक की वारंटी मिलती है। इसके स्मार्ट टेलीमैटिक्स सॉफ्टवेयर के जरिए आप घर बैठे मोबाइल ऐप पर लाइव जीपीएस लोकेशन, बैटरी चार्ज और ट्रैक्टर की सेहत देख सकते हैं। यह iCAT प्रमाणित है और कंपनी का सर्विस नेटवर्क पूरे भारत में बढ़ रहा है।"
      }
    ],

    ctaTitle: "शक्ति का साक्षात अनुभव करें",
    ctaDesc: "अपने खेत पर लाइव टेस्ट ड्राइव बुक करें और देखें कि आप ऑटोनेक्स्ट से कितनी बचत कर सकते हैं।",
    ctaButton: "अभी टेस्ट ड्राइव बुक करें",

    // Savings Calculator & Pricing Section (CHANGE 3 & 4)
    calculatorTitle: "इलेक्ट्रिक ट्रैक्टर रनिंग कॉस्ट कैलकुलेटर",
    calculatorSubtitle: "पारंपरिक डीजल ट्रैक्टर से ऑटोनेक्स्ट इलेक्ट्रिक ट्रैक्टर पर स्विच करके होने वाली अपनी बचत की गणना करें।",
    modelLabel: "ट्रैक्टर मॉडल / एचपी श्रेणी चुनें",
    dieselCostLabel: "डीजल की कीमत (₹/लीटर)",
    electricityCostLabel: "बिजली की दर (₹/यूनिट)",
    usageHoursLabel: "दैनिक उपयोग (घंटे/दिन)",
    usageDaysLabel: "वार्षिक कार्य दिवस (दिन/वर्ष)",
    dieselTractorCost: "डीजल ट्रैक्टर लागत",
    autoNxtElectricCost: "ऑटोनेक्स्ट इलेक्ट्रिक लागत",
    annualSavings: "अनुमानित वार्षिक बचत",
    perYear: "/वर्ष",
    savingsDisclaimer: "*यह गणना अनुमानित ईंधन खपत, चार्जिंग दक्षता और सामान्य रखरखाव दरों पर आधारित है। वास्तविक परिणाम काम के बोझ, मिट्टी की स्थिति और उपकरणों के आधार पर भिन्न हो सकते हैं।",
    assumptionsTitle: "गणना के लिए मानी गई दरें",
    dieselConsumptionRate: "डीजल खपत दर",
    electricConsumptionRate: "बिजली खपत दर",
    dieselMaintRate: "डीजल रखरखाव दर",
    electricMaintRate: "इलेक्ट्रिक रखरखाव दर",
    hr: "घंटा",
    ltr: "लीटर",
    unit: "यूनिट",
    bookDemoBtn: "निःशुल्क परामर्श बुक करें",

    priceTitle: "भारत में इलेक्ट्रिक ट्रैक्टर की कीमत",
    priceDescP1: "एक इलेक्ट्रिक ट्रैक्टर की कीमत अश्वशक्ति (horsepower), बैटरी क्षमता, परिचालन घंटे, चार्जिंग कॉन्फ़िगरेशन और आपकी खेती या औद्योगिक गतिविधियों के लिए आवश्यक उपकरणों जैसे कई कारकों पर निर्भर करती है।",
    priceDescP2: "ऑटोनेक्स्ट वाणिज्यिक कृषि, बायोमास हैंडलिंग, हवाई अड्डों, रसद और औद्योगिक अनुप्रयोगों के लिए कई इलेक्ट्रिक ट्रैक्टर प्लेटफॉर्म प्रदान करता है। चूंकि प्रत्येक उपयोग के लिए परिचालन आवश्यकताएं अलग होती हैं, इसलिए कीमत आपके उपयोग के मामले के आधार पर प्रदान की जाती है।",
    priceDescP3: "मॉडल की सिफारिशों, अनुमानित परिचालन लागत, वित्तपोषण (financing) विकल्पों और नवीनतम कीमतों को प्राप्त करने के लिए एक निःशुल्क परामर्श बुक करें।",
    priceDependsTitle: "कीमत इन कारकों पर निर्भर करती है:",
    priceDependsItems: [
      "मॉडल और एचपी श्रेणी",
      "बैटरी क्षमता",
      "अश्वशक्ति और टॉर्क आवश्यकताएं",
      "अनुप्रयोग (कृषि / औद्योगिक)",
      "आवश्यक उपकरण और अटैचमेंट्स"
    ],
    requestPriceBtn: "कीमत का अनुरोध करें",
    bookFreeDemoBtn: "निःशुल्क डेमो बुक करें"
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
      {
        title: "iCAT प्रमाणित",
        desc: "व्यावसायिक वापरासाठी प्रमाणित जगातील पहिला हाय-व्होल्टेज इलेक्ट्रिक ट्रॅक्टर."
      },
      {
        title: "45 HP च्या समतुल्य",
        desc: "मोठ्या शेतीकामांसाठी झटपट इलेक्ट्रिक टॉर्क आणि उत्कृष्ट कार्यक्षमता."
      },
      {
        title: "1500+ चार्ज सायकल्स",
        desc: "भारतीय शेतीच्या वातावरणासाठी डिझाइन केलेली दीर्घायुष्य देणारी LFP बॅटरी."
      },
      {
        title: "रनिंग कॉस्टमध्ये 80% पर्यंत बचत",
        desc: "डिझेल ट्रॅक्टरच्या तुलनेत इंधन आणि देखभालीचा खर्च अत्यंत कमी."
      }
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
        q: "इलेक्ट्रिक ट्रॅक्टर म्हणजे काय?",
        a: "इलेक्ट्रिक ट्रॅक्टर हे बॅटरीवर चालणारे कृषी आणि औद्योगिक वाहन आहे जे पारंपारिक डिझेल इंजिनशिवाय चालते. हे प्रगत इलेक्ट्रिक मोटर्स (जसे की परमनंट मॅग्नेट सिंक्रोनस मोटर्स) आणि रिचार्ज करण्यायोग्य बॅटरी पॅकद्वारे समर्थित आहे, जे शून्य आरपीएमवर त्वरित कमाल टॉर्क देते. हे शांत काम, कमी कंपन आणि शून्य थेट उत्सर्जन सुनिश्चित करते. ऑटोनेक्स्ट इलेक्ट्रिक ट्रॅक्टर शेती आणि जड कामांसाठी डिझाइन केलेले आहेत, जे इंधनावरील अवलंबित्व आणि देखभाल खर्च कमी करतात. हे आधुनिक शाश्वत शेतीसाठी एक स्मार्ट पाऊल आहे."
      },
      {
        q: "इलेक्ट्रिक ट्रॅक्टर कसे काम करतो?",
        a: "डिझेल ट्रॅक्टरच्या तुलनेत, इलेक्ट्रिक ट्रॅक्टरमध्ये अत्यंत सोपी रचना असते. यामध्ये लिथियम फेरो फॉस्फेट (LFP) बॅटरी पॅकमध्ये साठवलेली ऊर्जा थेट इलेक्ट्रिक मोटरला (PMSM) दिली जाते. जेव्हा ऑपरेटर प्रवेगक (accelerator) दाबतो, तेव्हा कंट्रोलर ऊर्जेचा प्रवाह नियंत्रित करतो आणि मोटर चाकांना त्वरित फिरवण्यास सुरवात करते. त्यामुळे गिअर बदलण्याची आणि इंजिन आरपीएम वाढवण्याची गरज नसते. हे डिझाइन अत्यंत ऊर्जा-कार्यक्षम ठरते."
      },
      {
        q: "डिझेल ट्रॅक्टरपेक्षा इलेक्ट्रिक ट्रॅक्टरचे काय फायदे आहेत?",
        a: "इलेक्ट्रिक ट्रॅक्टरचे अनेक फायदे आहेत: ते कोणत्याही प्रकारचे प्रदूषण करत नाहीत (शून्य उत्सर्जन); त्यांचा आवाज आणि कंपन अत्यंत कमी असते ज्यामुळे ड्रायव्हरला थकवा जाणवत नाही; डिझेलच्या तुलनेत विजेचा खर्च कमी असल्याने चालवण्याचा खर्च सुमारे ८०% कमी होतो; आणि इंजिन ऑईल, फिल्टर किंवा क्लिष्ट गिअरबॉक्स नसल्यामुळे देखभालीचा खर्च ७०-८०% वाचतो. यात जीपीएस ट्रॅकिंग सारखे स्मार्ट फीचर्स देखील मिळतात."
      },
      {
        q: "ऑटोनेक्स्ट इलेक्ट्रिक ट्रॅक्टर charge करण्यासाठी किती वेळ लागतो?",
        a: "चार्जिंगचा वेळ हा चार्जर आणि बॅटरीच्या क्षमतेवर अवलंबून असतो. ६.६ kW AC चार्जर किंवा घरगुती १५A सॉकेट वापरल्यास साधारणपणे ४ ते ६ तास लागतात. ऑटोनेक्स्टच्या लिक्विड-कूल्ड बॅटरी मॉडेलमध्ये ६० kW डीसी फास्ट चार्जरचा पर्याय मिळतो, ज्यामुळे ट्रॅक्टर केवळ ४५ मिनिटे ते २ तासांच्या आत ८०% पर्यंत चार्ज केला जाऊ शकतो."
      },
      {
        q: "ऑटोनेक्स्ट इलेक्ट्रिक ट्रॅक्टरच्या बॅटरीचे आयुष्य किती आहे?",
        a: "ऑटोनेक्स्ट ट्रॅक्टरमध्ये अत्यंत सुरक्षित मानली जाणारी लिथियम फेरो फॉस्फेट (LFP) बॅटरी वापरली जाते. या बॅटऱ्या १५००+ charge-discharge सायकलसाठी डिझाइन केलेल्या आहेत, ज्या सामान्यतः ६ ते ८ वर्षांपर्यंत उत्तम सेवा देतात. ऑटोनेक्स्ट X45H2 मॉडेलवर ६ वर्षे, ६००० तास किंवा १५०० चार्जिंग सायकल (जे आधी घडेल ते) ची भक्कम वॉरंटी देते."
      },
      {
        q: "कोणते शेतीचे अवजार या ट्रॅक्टरला जोडता येतात?",
        a: "ऑटोनेक्स्ट ट्रॅक्टर हे पानांनुसार श्रेणी-१ आणि श्रेणी-२ च्या थ्री-पॉइंट लिंकेज आणि पारंपारिक पीटीओ (PTO) शाफ्टसह येतात. त्यामुळे तुम्ही तुमचे सध्याचे रोटाव्हेटर, कल्टीव्हेटर, नांगर, पेरणी यंत्र, आणि स्प्रेयर सहज वापरू शकता. व्यावसायिक वापरासाठी, लोडर बकेट आणि ग्रॅबर सारखे हायड्रॉलिक अटॅचमेंट देखील सुसंगत आहेत."
      },
      {
        q: "इलेक्ट्रिक ट्रॅक्टर चालवण्याचा खर्च किती येतो?",
        a: "डिझेल ट्रॅक्टरचा प्रति तास खर्च ₹२५० ते ₹४०० दरम्यान येतो. याउलट, विजेच्या दरांनुसार ऑटोनेक्स्ट इलेक्ट्रिक ट्रॅक्टरचा प्रति तास वीज खर्च केवळ ₹१२ ते ₹४४ पर्यंत येतो. तसेच इंजिन ऑईल आणि इतर मेंटेनन्सचा खर्च कमी असल्याने, वर्षाला साधारणपणे ₹१.५ लाख ते ₹२.५ लाखांपर्यंत बचत होते."
      },
      {
        q: "लोन किंवा फायनान्सची सुविधा उपलब्ध आहे का?",
        a: "होय, ऑटोनेक्स्टने अग्रगण्य बँका आणि कृषी कर्ज पुरवणाऱ्या NBFCs सोबत भागीदारी केली आहे. ग्राहक ३ ते ५ वर्षांच्या मुदतीवर कमी व्याजदरात कर्ज मिळवू शकतात. तसेच, FAME-III आणि राज्यस्तरीय सबसिडीमुळे नोंदणी शुल्क आणि रोड टॅक्समध्ये सूट मिळते, ज्यामुळे सुरुवातीचा खर्च अजून कमी होतो."
      },
      {
        q: "यासाठी कोणत्या प्रकारच्या देखभालीची (maintenance) गरज असते?",
        a: "डिझेल इंजिन नसल्यामुळे मेंटेनन्स अतिशय मर्यादित असतो. ऑइल बदलणे, पिस्टन किंवा इंजिन बेल्ट दुरुस्तीची गरज नसते. केवळ टायर्स, ब्रेक ऑइल, हायड्रॉलिक ऑइल आणि बॅटरीच्या कूलिंग सिस्टमची अधूनमधून तपासणी करावी लागते. १००० तासांच्या मोठ्या सर्व्हिस इंटरव्हलमुळे देखभालीचा त्रास संपतो."
      },
      {
        q: "ऑटोनेक्स्ट इलेक्ट्रिक ट्रॅक्टरच का निवडावा?",
        a: "ऑटोनेक्स्ट हा भारतातील पहिला स्वदेशी तंत्रज्ञानाने बनवलेला इलेक्ट्रिक ट्रॅक्टर आहे. यात उत्तम कार्यक्षमतेची PMSM मोटर, लिक्विड-कूल्ड LFP बॅटरी आणि ६ वर्षांपर्यंतची दीर्घ वॉरंटी मिळते. जीपीएस ट्रॅकिंग, जिओ-फेन्सिंग आणि मोबाईल ॲप कनेक्टिव्हिटीमुळे हा एक स्मार्ट ट्रॅक्टर ठरतो. तसेच याला अधिकृत iCAT प्रमाणपत्र देखील मिळाले आहे."
      }
    ],

    ctaTitle: "शांत शक्तीचा अनुभव घ्या",
    ctaDesc: "तुमच्या शेतात लाईव्ह टेस्ट ड्राइव्ह बुक करा आणि बघा तुम्ही ऑटोनेक्स्टच्या साहाय्याने किती बचत करू शकता.",
    ctaButton: "आता टेस्ट ड्राइव्ह बुक करा",

    // Savings Calculator & Pricing Section (CHANGE 3 & 4)
    calculatorTitle: "इलेक्ट्रिक ट्रॅक्टर रनिंग कॉस्ट कॅल्क्युलेटर",
    calculatorSubtitle: "पारंपारिक डिझेल ट्रॅक्टरऐवजी ऑटोनेक्स्ट इलेक्ट्रिक ट्रॅक्टर वापरून होणाऱ्या तुमच्या बचतीची गणना करा.",
    modelLabel: "ट्रॅक्टर मॉडेल / एचपी श्रेणी निवडा",
    dieselCostLabel: "डिझेलचा दर (₹/लिटर)",
    electricityCostLabel: "विजेचा दर (₹/युनिट)",
    usageHoursLabel: "दैनिक वापर (तास/दिवस)",
    usageDaysLabel: "वर्षातील कामाचे दिवस (दिवस/वर्ष)",
    dieselTractorCost: "डिझेल ट्रॅक्टरचा खर्च",
    autoNxtElectricCost: "ऑटोनेक्स्ट इलेक्ट्रिकचा खर्च",
    annualSavings: "अंदाजे वार्षिक बचत",
    perYear: "/वर्ष",
    savingsDisclaimer: "*गणना अंदाजे इंधन वापर, चार्जिंग कार्यक्षमता आणि सामान्य देखभाल दरांवर आधारित आहे. जमिनीचा प्रकार आणि वापरलेल्या उपकरणांनुसार प्रत्यक्ष बचतीमध्ये बदल होऊ शकतो.",
    assumptionsTitle: "गणनेची गृहीतके",
    dieselConsumptionRate: "डिझेल वापर दर",
    electricConsumptionRate: "वीज वापर दर",
    dieselMaintRate: "डिझेल देखभाल दर",
    electricMaintRate: "इलेक्ट्रिक देखभाल दर",
    hr: "तास",
    ltr: "लिटर",
    unit: "युनिट",
    bookDemoBtn: "मोफत सल्लामसलत बुक करा",

    priceTitle: "भारतात इलेक्ट्रिक ट्रॅक्टरची किंमत",
    priceDescP1: "इलेक्ट्रिक ट्रॅक्टरची किंमत हॉर्सपॉवर, बॅटरी क्षमता, कामाचे तास, चार्जिंग कॉन्फिगरेशन आणि तुमच्या शेती किंवा औद्योगिक कामांसाठी लागणाऱ्या उपकरणांसह अनेक घटकांवर अवलंबून असते.",
    priceDescP2: "ऑटोनेक्स्ट व्यावसायिक शेती, बायोमास प्रक्रिया, विमानतळ, लॉजिस्टिक्स आणि औद्योगिक वापरासाठी विविध इलेक्ट्रिक ट्रॅक्टर प्लॅटफॉर्म ऑफर करते. प्रत्येक कामाची गरज वेगळी असल्याने, किंमत तुमच्या गरजेनुसार ठरवली जाते.",
    priceDescP3: "मॉडेल शिफारसी, अंदाजे ऑपरेटिंग खर्च, फायनान्सचे पर्याय आणि नवीनतम किंमती मिळवण्यासाठी मोफत सल्लामसलत बुक करा.",
    priceDependsTitle: "किंमत या घटकांवर अवलंबून असते:",
    priceDependsItems: [
      "मॉडेल आणि एचपी श्रेणी",
      "बॅटरी क्षमता",
      "हॉर्सपॉवर आणि टॉर्क आवश्यकता",
      "उपयोग (शेती / औद्योगिक)",
      "आवश्यक उपकरणे (अटॅचमेंट्स)"
    ],
    requestPriceBtn: "किंमत विचारा",
    bookFreeDemoBtn: "मोफत डेमो बुक करा"
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
      {
        title: "iCAT సర్టిఫైడ్",
        desc: "కమర్షియల్ వినియోగం కోసం ధృవీకరించబడిన ప్రపంచంలోనే మొట్టమొదటి హై-వోల్టేజ్ ఎలక్ట్రిక్ ట్రాక్టర్."
      },
      {
        title: "45 HP తో సమానం",
        desc: "భారీ వ్యవసాయ పనుల కోసం తక్షణ ఎలక్ట్రిక్ టార్క్ మరియు అధిక పనితీరు."
      },
      {
        title: "1500+ ఛార్జ్ సైకిల్స్",
        desc: "భారతీయ వాతావరణ పరిస్థితులకు అనుగుణంగా రూపొందించబడిన లాంగ్-లైఫ్ LFP బ్యాటరీ."
      },
      {
        title: "రన్నింగ్ ఖర్చుల్లో 80% వరకు పొదుపు",
        desc: "డీజిల్ ట్రాక్టర్లతో పోలిస్తే చాలా తక్కువ ఇంధనం మరియు మెయింటెనెన్స్ ఖర్చులు."
      }
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
        q: "ఎలక్ట్రిక్ ట్రాక్టర్ అంటే ఏమిటి?",
        a: "ఎలక్ట్రిక్ ట్రాక్టర్ అనేది సాంప్రదాయ డీజిల్ ఇంజన్‌తో కాకుండా బ్యాటరీతో నడిచే వ్యవసాయ మరియు పారిశ్రామిక వాహనం. ఇది అధునాతన ఎలక్ట్రిక్ మోటార్స్ (PMSM వంటివి) మరియు రీఛార్జ్ చేయగల బ్యాటరీ ప్యాక్‌ల ద్వారా శక్తిని పొందుతుంది. ఇది తక్షణ టార్క్, నిశ్శబ్ద ఆపరేషన్ మరియు శూన్య ఉద్గారాలను అందిస్తుంది. ఆటోనెక్స్ట్ ఎలక్ట్రిక్ ట్రాక్టర్లు వ్యవసాయ అవసరాలకు మరియు పారిశ్రామిక రవాణాకు అనుకూలంగా రూపొందించబడ్డాయి. ఇది పర్యావరణ రక్షణతో పాటు ఖర్చులను కూడా తగ్గిస్తుంది."
      },
      {
        q: "ఎలక్ట్రిక్ ట్రాక్టర్ ఎలా పనిచేస్తుంది?",
        a: "డీజిల్ ట్రాక్టర్లలా కాకుండా, ఎలక్ట్రిక్ ట్రాక్టర్ చాలా సరళమైన డ్రైవ్‌ట్రెయిన్‌ను కలిగి ఉంటుంది. ఇది లిథియం ఫెర్రో ఫాస్ఫేట్ (LFP) బ్యాటరీ ప్యాక్‌లో నిల్వ చేయబడిన విద్యుత్తుతో పనిచేస్తుంది. ఆపరేటర్ యాక్సిలరేటర్‌ను నొక్కినప్పుడు, కంట్రోలర్ బ్యాటరీ నుండి ఎలక్ట్రిక్ మోటార్‌కు విద్యుత్తును పంపిస్తుంది. మోటార్ చక్రాలకు తక్షణమే టార్క్ అందించి ట్రాక్టర్‌ను ముందుకు నడిపిస్తుంది."
      },
      {
        q: "డీజిల్ ట్రాక్టర్ల కంటే ఎలక్ట్రిక్ ట్రాక్టర్ల వల్ల కలిగే ప్రయోజనాలు ఏమిటి?",
        a: "ఎలక్ట్రిక్ ట్రాక్టర్లు అనేక ప్రయోజనాలను అందిస్తాయి: ఇవి శూన్య ఉద్గారాలతో పర్యావరణ అనుకూలమైనవి; నిశ్శబ్దంగా మరియు కంపనాలు లేకుండా నడుస్తాయి కాబట్టి డ్రైవర్‌కు అలసట ఉండదు; రన్నింగ్ ఖర్చు డీజిల్ కంటే 80% తక్కువగా ఉంటుంది; మరియు మోటార్ ఆయిల్, ఫిల్టర్లు లేకపోవడం వల్ల మెయింటెనెన్స్ ఖర్చు చాలా తక్కువ. ఇందులో లైవ్ జీపీఎస్ మరియు టెలిమాటిక్స్ ఫీచర్లు కూడా ఉన్నాయి."
      },
      {
        q: "ఆటోనెక్స్ట్ ఎలక్ట్రిక్ ట్రాక్టర్ ఛార్జ్ కావడానికి ఎంత సమయం పడుతుంది?",
        a: "ఛార్జింగ్ సమయం అనేది ఉపయోగించే ఛార్జర్ మరియు బ్యాటరీ సామర్థ్యంపై ఆధారపడి ఉంటుంది. సాధారణ 6.6 kW AC ఛార్జర్ లేదా 15A సాకెట్ ద్వారా పూర్తిగా ఛార్జ్ చేయడానికి 4 నుండి 6 గంటల సమయం పడుతుంది. అదే 60 kW DC ఫాస్ట్ ఛార్జర్ ద్వారా కేవలం 45 నిమిషాల నుండి 2 గంటల్లోనే బ్యాటరీని 80% వరకు ఛార్జ్ చేయవచ్చు."
      },
      {
        q: "ఆటోనెక్స్ట్ ఎలక్ట్రిక్ ట్రాక్టర్ బ్యాటరీ జీవితకాలం ఎంత?",
        a: "ఆటోనెక్స్ట్ ట్రాక్టర్లు అత్యంత సురక్షితమైన లిథియం ఫెర్రో ఫాస్ఫేట్ (LFP) బ్యాటరీ టెక్నాలజీని ఉపయోగిస్తాయి. ఇవి 1500+ పూర్తి ఛార్జింగ్ సైకిళ్లకు రేట్ చేయబడ్డాయి, అంటే ఇవి సుమారుగా 6 నుండి 8 సంవత్సరాల వరకు మన్నుతాయి. మోడల్ X45H2 పై ఆటోనెక్స్ట్ 6 సంవత్సరాలు లేదా 6000 గంటల బ్యాటరీ వారంటీని అందిస్తుంది."
      },
      {
        q: "ఏ వ్యవసాయ పరికరాలు దీనికి సరిపోతాయి?",
        a: "ఆటోనెక్స్ట్ ఎలక్ట్రిక్ ట్రాక్టర్లు ప్రామాణిక త్రీ-పాయింట్ లింకేజ్ మరియు సాంప్రదాయ PTO షాఫ్ట్‌తో వస్తాయి. దీనివల్ల రొటవేటర్, నాగలి, సీడ్ డ్రిల్, బూమ్ స్ప్రేయర్ మరియు బేలర్ వంటి సాధారణ వ్యవసాయ పరికరాలను సులభంగా వాడుకోవచ్చు. ఇండస్ట్రియల్ అటాచ్‌మెంట్‌లయిన లోడర్ బకెట్, గ్రాబర్ వంటి వాటికి కూడా ఇది అనుకూలంగా ఉంటుంది."
      },
      {
        q: "ఎలక్ట్రిక్ ట్రాక్టర్ రన్నింగ్ ఖర్చు ఎంత ఉంటుంది?",
        a: "సాధారణ డీజిల్ ట్రాక్టర్ల రన్నింగ్ ఖర్చు గంటకు ₹250 నుండి ₹400 వరకు ఉంటే, ఆటోనెక్స్ట్ ఎలక్ట్రిక్ ట్రాక్టర్ కేవలం ₹12 నుండి ₹44 విద్యుత్ ఖర్చుతో నడుస్తుంది. అలాగే ఇందులో మోటార్ ఆయిల్, ఫిల్టర్లు మార్చాల్సిన అవసరం లేదు కాబట్టి మెయింటెనెన్స్ ఖర్చు కూడా కలిసివచ్చి, సంవత్సరానికి ₹1.5 లక్షల నుండి ₹2.5 లక్షల వరకు ఆదా అవుతుంది."
      },
      {
        q: "ఫైనాన్స్ సదుపాయం ఉందా?",
        a: "అవును, ప్రముఖ ప్రభుత్వ మరియు ప్రైవేట్ బ్యాంకులు, అలాగే NBFCల భాగస్వామ్యంతో ఆటోనెక్స్ట్ ఫైనాన్స్ సదుపాయాలను అందిస్తోంది. పంట కోత సమయాలకు అనుగుణంగా సులభమైన ఈఎంఐ (EMI) ఆప్షన్లను ఎంచుకోవచ్చు. FAME-III మరియు రాష్ట్ర ప్రభుత్వ ఈవీ సబ్సిడీల ద్వారా పన్ను మినహాయింపులు కూడా లభిస్తాయి."
      },
      {
        q: "దీనికి ఎలాంటి మెయింటెనెన్స్ అవసరం?",
        a: "ఎలక్ట్రిక్ ట్రాక్టర్‌కు చాలా తక్కువ మెయింటెనెన్స్ అవసరం. ఇంజన్ ఆయిల్ మార్చడం, స్పార్క్ ప్లగ్స్ వంటివి ఇందులో ఉండవు. కేవలం బ్రేకులు, టైర్ల ప్రెజర్ మరియు హైడ్రాలిక్ ద్రవాల స్థాయిలను క్రమం తప్పకుండా తనిఖీ చేసుకుంటే సరిపోతుంది. దీని సర్వీస్ ఇంటర్వెల్ 1000 గంటలు."
      },
      {
        q: "ఆటోనెక్స్ట్‌నే ఎందుకు ఎంచుకోవాలి?",
        a: "ఆటోనెక్స్ట్ భారతదేశంలోనే పూర్తిగా అభివృద్ధి చేయబడిన సరికొత్త సాంకేతికతతో కూడిన ఎలక్ట్రిక్ ట్రాక్టర్. అధిక సామర్థ్యంగల PMSM మోటార్, లిక్విడ్ కూల్డ్ LFP బ్యాటరీ, మరియు 6 సంవత్సరాల బ్యాటరీ వారంటీ దీని ప్రత్యేకత. లైవ్ జీపీఎస్, మొబైల్ యాప్ కనెక్టివిటీ, మరియు iCAT సర్టిఫికేషన్ దీనిని నమ్మకమైన మరియు స్మార్ట్ ట్రాక్టర్‌గా మార్చాయి."
      }
    ],

    ctaTitle: "నిజమైన శక్తిని అనుభవించండి",
    ctaDesc: "మీ పొలంలో ఉచిత టెస్ట్ డ్రైవ్ బుక్ చేసుకోండి మరియు ఆటోనెక్స్ట్‌తో ఎంత ఆదా అవుతుందో మీరే చూడండి.",
    ctaButton: "ఇప్పుడే టెస్ట్ డ్రైవ్ బుక్ చేయండి",

    // Savings Calculator & Pricing Section (CHANGE 3 & 4)
    calculatorTitle: "ఎలక్ట్రిక్ ట్రాక్టర్ రన్నింగ్ కాస్ట్ కాలిక్యులేటర్",
    calculatorSubtitle: "సాధారణ డీజిల్ ట్రాక్టర్ నుండి ఆటోనెక్స్ట్ ఎలక్ట్రిక్ ట్రాక్టర్‌కు మారడం ద్వారా మీరు ఎంత పొదుపు చేయవచ్చో లెక్కించండి.",
    modelLabel: "ట్రాక్టర్ మోడల్ / హెచ్‌పి క్లాస్ ఎంచుకోండి",
    dieselCostLabel: "ప్రస్తుత డీజిల్ ధర (₹/లీటర్)",
    electricityCostLabel: "విద్యుత్ ఖర్చు (₹/kWh యూనిట్)",
    usageHoursLabel: "రోజువారీ వినియోగ గంటలు",
    usageDaysLabel: "సంవత్సరానికి పని దినాలు",
    dieselTractorCost: "డీజిల్ ట్రాక్టర్ ఖర్చు",
    autoNxtElectricCost: "ఆటోనెక్స్ట్ ఎలక్ట్రిక్ ఖర్చు",
    annualSavings: "అంచనా వేసిన వార్షిక పొదుపు",
    perYear: "/సంవత్సరానికి",
    savingsDisclaimer: "*గణనలు అంచనా వేసిన ఇంధన వినియోగం, ఛార్జింగ్ సామర్థ్యాలు మరియు ప్రామాణిక మెయింటెనెన్స్ రేట్లపై ఆధారపడి ఉంటాయి. పని భారం మరియు మట్టి స్వభావాన్ని బట్టి ఫలితాలు మారవచ్చు.",
    assumptionsTitle: "గణన అంచనాలు",
    dieselConsumptionRate: "డీజిల్ వినియోగ రేటు",
    electricConsumptionRate: "విద్యుత్ వినియోగ రేటు",
    dieselMaintRate: "డీజిల్ మెయింటెనెన్స్ రేటు",
    electricMaintRate: "ఎలక్ట్రిక్ మెయింటెనెన్స్ రేటు",
    hr: "గంట",
    ltr: "లీటరు",
    unit: "యూనిట్",
    bookDemoBtn: "ఉచిత సంప్రదింపు బుక్ చేయండి",

    priceTitle: "భారతదేశంలో ఎలక్ట్రిక్ ట్రాక్టర్ ధర",
    priceDescP1: "ఎలక్ట్రిక్ ట్రాక్టర్ ధర హార్స్‌పవర్, బ్యాటరీ సామర్థ్యం, ఆపరేటింగ్ గంటలు, ఛార్జింగ్ కాన్ఫిగరేషన్ మరియు మీ వ్యవసాయ లేదా పారిశ్రామిక పనులకు అవసరమైన పరికరాలపై ఆధారపడి ఉంటుంది.",
    priceDescP2: "ఆటోనెక్స్ట్ వాణిజ్య వ్యవసాయం, బయోమాస్ హ్యాండ్లింగ్, విమానాశ్రయాలు, లాజిస్టిక్స్ మరియు పారిశ్రామిక అనువర్తనాల కోసం బహుళ ఎలక్ట్రిక్ ట్రాక్టర్ ప్లాట్‌ఫారమ్‌లను అందిస్తుంది. ప్రతి పనికీ వేర్వేరు అవసరాలు ఉన్నందున, ధర మీ వినియోగం ఆధారంగా అందించబడుతుంది.",
    priceDescP3: "మోడల్ సిఫార్సులు, అంచనా వేసిన రన్నింగ్ ఖర్చులు, ఫైనాన్సింగ్ ఎంపికలు మరియు తాజా ధరలను పొందడానికి ఉచిత సంప్రదింపులను బుక్ చేసుకోండి.",
    priceDependsTitle: "ధర వీటిపై ఆధారపడి ఉంటుంది:",
    priceDependsItems: [
      "మోడల్ & హెచ్‌పి కేటగిరీ",
      "బ్యాటరీ సామర్థ్యం",
      "హార్స్‌పవర్ & టార్క్ అవసరాలు",
      "అప్లికేషన్ (వ్యవసాయ / పారిశ్రామిక)",
      "అవసరమైన పరికరాలు & అటాచ్‌మెంట్‌లు"
    ],
    requestPriceBtn: "ధర అభ్యర్థించండి",
    bookFreeDemoBtn: "ఉచిత డెమో బుక్ చేయండి"
  }
};

export default function ElectricTractors() {
  const { lang, t } = useLang();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Fallback to English if language content is missing
  const content = CONTENT[lang] || CONTENT["en"];
  const texts = t.tractorDetailPage.texts;

  // Calculator state variables
  const [selectedModel, setSelectedModel] = useState<string>("x45h2");
  const [dieselPrice, setDieselPrice] = useState<number>(100);
  const [electricityPrice, setElectricityPrice] = useState<number>(8);
  const [usageHours, setUsageHours] = useState<number>(8);
  const [usageDays, setUsageDays] = useState<number>(250);
  const [showAssumptions, setShowAssumptions] = useState<boolean>(false);

  // Calculator presets based on real business numbers
  const modelPresets: Record<string, {
    name: string;
    dieselConsumption: number; // Litres/hour
    electricConsumption: number; // kWh/hour
    dieselMaint: number; // ₹/hour
    electricMaint: number; // ₹/hour
  }> = {
    x45h2: {
      name: "AutoNxt X45H2 (45 HP Equivalent)",
      dieselConsumption: 3.5,
      electricConsumption: 5.5,
      dieselMaint: 50,
      electricMaint: 10,
    },
    x30c2: {
      name: "AutoNxt X30C2 (30 HP Equivalent)",
      dieselConsumption: 2.5,
      electricConsumption: 4.0,
      dieselMaint: 40,
      electricMaint: 8,
    },
    x25h2: {
      name: "AutoNxt X27H2 (25 HP Equivalent)",
      dieselConsumption: 2.0,
      electricConsumption: 3.0,
      dieselMaint: 35,
      electricMaint: 7,
    },
  };

  const preset = modelPresets[selectedModel] || modelPresets.x45h2;
  const totalHoursYear = usageHours * usageDays;

  const dieselYearlyCost = totalHoursYear * (preset.dieselConsumption * dieselPrice + preset.dieselMaint);
  const electricYearlyCost = totalHoursYear * (preset.electricConsumption * electricityPrice + preset.electricMaint);
  const yearlySavings = Math.max(0, dieselYearlyCost - electricYearlyCost);

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
                {content.whyChoosePoints.map((pt: any, i: number) => (
                  <div key={i} className="flex gap-4 items-start bg-muted/10 border border-border/40 p-5 rounded-2xl">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                    <div className="text-left">
                      <h3 className="font-bold text-foreground text-base mb-1">{pt.title}</h3>
                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{pt.desc}</p>
                    </div>
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

      {/* ── RUNNING COST CALCULATOR ── */}
      <section className="py-20 border-t border-border bg-muted/20">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-primary rounded-full" />
              <p className="text-primary font-bold text-xs uppercase tracking-widest">Savings Calculator</p>
              <div className="h-px w-8 bg-primary rounded-full" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {content.calculatorTitle}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {content.calculatorSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* INPUT PANEL */}
            <div className="lg:col-span-7 bg-card border border-border rounded-3xl p-6 md:p-8 space-y-6 flex flex-col justify-between shadow-lg">
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                    {content.modelLabel}
                  </label>
                  <CustomSelect
                    value={selectedModel}
                    onChange={(val) => setSelectedModel(val)}
                    options={[
                      { value: "x45h2", label: modelPresets.x45h2.name },
                      { value: "x30c2", label: modelPresets.x30c2.name },
                      { value: "x25h2", label: modelPresets.x25h2.name },
                    ]}
                    className="w-full"
                  />
                </div>

                {/* DIESEL PRICE SLIDER */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-muted-foreground">{content.dieselCostLabel}</span>
                    <span className="text-primary font-bold">₹{dieselPrice}/{content.ltr}</span>
                  </div>
                  <input
                    type="range"
                    min="80"
                    max="150"
                    value={dieselPrice}
                    onChange={(e) => setDieselPrice(Number(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground font-semibold">
                    <span>₹80</span>
                    <span>₹115</span>
                    <span>₹150</span>
                  </div>
                </div>

                {/* ELECTRICITY PRICE SLIDER */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-muted-foreground">{content.electricityCostLabel}</span>
                    <span className="text-primary font-bold">₹{electricityPrice}/{content.unit}</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="15"
                    value={electricityPrice}
                    onChange={(e) => setElectricityPrice(Number(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground font-semibold">
                    <span>₹5</span>
                    <span>₹10</span>
                    <span>₹15</span>
                  </div>
                </div>

                {/* RUNNING HOURS SLIDER */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-muted-foreground">{content.usageHoursLabel}</span>
                    <span className="text-primary font-bold">{usageHours} {content.hr}s/day</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="12"
                    value={usageHours}
                    onChange={(e) => setUsageHours(Number(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground font-semibold">
                    <span>2 {content.hr}s</span>
                    <span>7 {content.hr}s</span>
                    <span>12 {content.hr}s</span>
                  </div>
                </div>

                {/* RUNNING DAYS SLIDER */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-muted-foreground">{content.usageDaysLabel}</span>
                    <span className="text-primary font-bold">{usageDays} days/year</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="365"
                    value={usageDays}
                    onChange={(e) => setUsageDays(Number(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground font-semibold">
                    <span>50 days</span>
                    <span>200 days</span>
                    <span>365 days</span>
                  </div>
                </div>
              </div>

              {/* Collapsible Assumptions */}
              <div className="mt-8 border-t border-border pt-4">
                <button
                  onClick={() => setShowAssumptions(!showAssumptions)}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors cursor-pointer select-none"
                >
                  <Info className="w-4 h-4" />
                  <span>{content.assumptionsTitle}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showAssumptions ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {showAssumptions && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mt-4 text-xs text-muted-foreground space-y-3"
                    >
                      <div className="grid grid-cols-2 gap-4 bg-muted/30 p-4 rounded-2xl border border-border/50">
                        <div>
                          <p className="font-bold text-foreground mb-1">Diesel Tractor Specs:</p>
                          <ul className="space-y-1 font-medium">
                            <li>• {content.dieselConsumptionRate}: <span className="text-foreground font-bold">{preset.dieselConsumption} L/{content.hr}</span></li>
                            <li>• {content.dieselMaintRate}: <span className="text-foreground font-bold">₹{preset.dieselMaint}/{content.hr}</span></li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-bold text-foreground mb-1">AutoNXT Electric Specs:</p>
                          <ul className="space-y-1 font-medium">
                            <li>• {content.electricConsumptionRate}: <span className="text-foreground font-bold">{preset.electricConsumption} {content.unit}s/{content.hr}</span></li>
                            <li>• {content.electricMaintRate}: <span className="text-foreground font-bold">₹{preset.electricMaint}/{content.hr}</span></li>
                          </ul>
                        </div>
                      </div>
                      <p className="italic leading-normal text-[11px]">
                        {content.savingsDisclaimer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* RESULTS PANEL */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-card border border-border rounded-3xl p-6 md:p-8 flex flex-col justify-between flex-1 relative overflow-hidden shadow-xl">
                {/* Radial glow background */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="space-y-6">
                  {/* Diesel Cost Summary */}
                  <div className="flex justify-between items-center border-b border-border/60 pb-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{content.dieselTractorCost}</p>
                      <p className="text-sm font-semibold text-foreground/80 mt-1">{preset.name}</p>
                    </div>
                    <p className="text-lg font-bold text-foreground/90 shrink-0">
                      ₹{Math.round(dieselYearlyCost).toLocaleString("en-IN")}
                      <span className="text-xs text-muted-foreground font-normal">{content.perYear}</span>
                    </p>
                  </div>

                  {/* Electric Cost Summary */}
                  <div className="flex justify-between items-center border-b border-border/60 pb-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">AutoNXT Electric Cost</p>
                      <p className="text-sm font-semibold text-foreground/80 mt-1">{preset.name}</p>
                    </div>
                    <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                      ₹{Math.round(electricYearlyCost).toLocaleString("en-IN")}
                      <span className="text-xs text-muted-foreground font-normal">{content.perYear}</span>
                    </p>
                  </div>

                  {/* Savings Calculation Output */}
                  <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6 text-center shadow-inner relative overflow-hidden group">
                    {/* Pulsing light */}
                    <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2">
                      {content.annualSavings}
                    </p>
                    <p className="text-3xl md:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 tracking-tight">
                      ₹{Math.round(yearlySavings).toLocaleString("en-IN")}
                      <span className="text-sm text-muted-foreground font-bold tracking-normal">{content.perYear}</span>
                    </p>
                  </div>
                </div>

                <div className="pt-8">
                  <Button asChild size="lg" className="w-full bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white font-bold h-13 rounded-xl shadow-xl shadow-emerald-600/10">
                    <Link href={`/book?subject=Demo%20Inquiry%20from%20Savings%20Calculator&message=I%20used%20the%20savings%20calculator%20for%20the%20${preset.name}%20and%20calculated%20annual%20savings%20of%20about%20%E2%82%B9%20${Math.round(yearlySavings).toLocaleString("en-IN")}%2Fyear.%20I%20would%20like%20to%20schedule%20a%20free%20consultation%20and%20demo.`}>
                      {content.bookDemoBtn} <ArrowRight className="ml-2 w-4.5 h-4.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ELECTRIC TRACTOR PRICE SECTION ── */}
      <section className="py-20 border-t border-border bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            {/* CONTENT COLUMN */}
            <div className="md:col-span-7 space-y-6 text-left">
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-primary rounded-full" />
                <p className="text-primary font-bold text-xs uppercase tracking-widest">Pricing</p>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                {content.priceTitle}
              </h2>
              <div className="space-y-4 text-muted-foreground text-sm sm:text-base leading-relaxed font-medium">
                <p>{content.priceDescP1}</p>
                <p>{content.priceDescP2}</p>
                <p>{content.priceDescP3}</p>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 font-bold px-8 h-13 rounded-xl shadow-lg shadow-primary/25">
                  <Link href={`/book?subject=Price%20Quote%20Request%3A%20${preset.name}&message=I%20would%20like%20to%20request%20pricing%20details%20for%20the%20${preset.name}%20electric%20tractor%20based%20on%20my%20use%20case.`}>
                    {content.requestPriceBtn}
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-border hover:bg-muted text-foreground font-semibold px-8 h-13 rounded-xl">
                  <Link href={`/book?subject=Demo%20Request%3A%20${preset.name}&message=I%20would%20like%20to%20schedule%20a%20free%20live%20demo%20of%20the%20${preset.name}%20electric%20tractor%20at%20my%20site.`}>
                    {content.bookFreeDemoBtn}
                  </Link>
                </Button>
              </div>
            </div>

            {/* CHECKLIST PANEL */}
            <div className="md:col-span-5 bg-card border border-border rounded-3xl p-8 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <h3 className="font-bold text-foreground text-lg mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                <span>{content.priceDependsTitle}</span>
              </h3>
              
              <ul className="space-y-4">
                {content.priceDependsItems?.map((item: string, i: number) => (
                  <li key={i} className="flex gap-3 items-center">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-muted-foreground text-sm font-semibold">{item}</span>
                  </li>
                ))}
              </ul>
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
