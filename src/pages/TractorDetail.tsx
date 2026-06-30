import { lazy, Suspense, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useLang } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import {
  ArrowRight, CheckCircle2, Zap, BatteryCharging,
  Gauge, Shield, Wifi, Clock, Weight, Wrench, Thermometer, Settings, Activity
} from "lucide-react";

const batteryImg = "/images/product-battery.webp";
const motorImg = "/images/product-autonomous.webp";

const X45H2_FULL_SPECS = [
  { label: "Model", value: "X45H2" },
  { label: "Fuel Type", value: "EV (kW)" },
  { label: "Power", value: "32 kW (45HP Equivalent)" },
  { label: "Motor Type", value: "PMSM (Permanent Magnet Synchronous Motor)" },
  { label: "Max Torque", value: "214 NM" },
  { label: "Battery Capacity", value: "38.4 kWh (Normal LFP Battery)" },
  { label: "(Lithium Ferro Phosphate) LFP", value: "27 kWh (LFP Liquid Cooled Battery)" },
  { label: "Charger", value: "AC Slow - 6.6 kW (off-board) Single Phase / AC Fast - 13.4 kW (off-board) (optional) III Phase Charger" },
  { label: "Charging Time", value: "Off Board - DC fast charging (Liquid Cooled Battery) 60kW - 45 MIN" },
  { label: "Gear", value: "8F + 2R" },
  { label: "Gear Shift", value: "Centre" },
  { label: "Gear Mode", value: "Low / High (Forward – Reverse)" },
  { label: "Transmission Type", value: "Sliding Mesh" },
  { label: "Rated RPM", value: "1800 RPM" },
  { label: "Steering Type", value: "Power Steering" },
  { label: "Wheel Base mm", value: "2155 mm / 7 ft" },
  { label: "Tractor Weight ( GVW )", value: "2.4 tons" },
  { label: "Payload", value: "10 tons" },
  { label: "Brakes", value: "Oil immersed brakes" },
  { label: "PTO Power", value: "24.5 kW / 33 HP" },
  { label: "PTO Speed", value: "540 & 540 E / 540 RPM RPTO, SLIPTO" },
  { label: "PTO Type", value: "Single" },
  { label: "Hydraulics Lifting Capacity (kg)", value: "1800 kg" },
  { label: "Hydraulic Pump Flow", value: "26.6 lt/min" },
  { label: "Front Tire Size", value: "19.1 X 40.6 CM / 7.50 X 16 -8 PR" },
  { label: "Rear Tire Size", value: "24.1 X 16.0 CM / 14.9 X 28 - 12 PR" },
  { label: "Telematics", value: "Enabled" },
  { label: "Drive", value: "2WD" },
  { label: "Speed Range", value: "1.9 - 35 km / Hrs." },
  { label: "Engine Cooling", value: "Water Cooled Motor" },
  { label: "Service Interval", value: "1000 hrs." },
  { label: "Motor Warranty", value: "3 yrs inbuilt + 2 yrs Extended" },
  { label: "Battery Warranty", value: "6 Yrs / 6000 Hrs / 1500 charging cycle (whichever is Earlier)" },
  { label: "Transmission Warranty", value: "3yrs" },
  { label: "Vehicle Warranty", value: "1 Yrs. Except usable Item & Clutch" },
  { label: "Range", value: "50 kms." }
];

const X27H2_FULL_SPECS = [
  { label: "Model", value: "X27H2" },
  { label: "Fuel Type", value: "Electric (EV)" },
  { label: "Motor Power", value: "15 kW (25 HP Equivalent)" },
  { label: "Motor Type", value: "PMSM (Permanent Magnet Synchronous Motor)" },
  { label: "Max Torque", value: "128 NM (approx.)" },
  { label: "Battery Capacity (LFP)", value: "22 kWh (Normal LFP Battery)" },
  { label: "Charger", value: "AC Slow - 6.6 kW (on-board), Single Phase Charger" },
  { label: "Gear", value: "8F + 2R" },
  { label: "Gear Shift", value: "Single" },
  { label: "Gear Mode", value: "Low / High" },
  { label: "Transmission Type", value: "Sliding Mesh" },
  { label: "Rated RPM", value: "1800 RPM" },
  { label: "Steering Type", value: "Power Steering" },
  { label: "Wheel Base", value: "1800 mm / 5.9 ft" },
  { label: "Tractor Weight (GVW)", value: "~1.5 tons" },
  { label: "Payload", value: "5 tons (max rated load)" },
  { label: "Brakes", value: "Oil Immersed Brakes" },
  { label: "PTO Power", value: "10 kW" },
  { label: "PTO Speed", value: "540E RPM" },
  { label: "PTO Type", value: "Single" },
  { label: "Hydraulics Lifting Capacity", value: "1000 kg" },
  { label: "Hydraulic Pump Flow", value: "18 lt/min (approx.)" },
  { label: "Front Tire Size", value: "6.00 x 16 - 8 PR" },
  { label: "Rear Tire Size", value: "12.4 x 28 - 12 PR" },
  { label: "Telematics", value: "Enabled" },
  { label: "Drive", value: "2WD / 4WD" },
  { label: "Speed Range", value: "1.8 – 30 km/hr" },
  { label: "Engine Cooling", value: "Water Cooled Motor" },
  { label: "Service Interval", value: "1000 hrs" },
  { label: "Motor Warranty", value: "3 years (inbuilt) + 2 years (Extended)" },
  { label: "Battery Warranty", value: "1500 cycles" },
  { label: "Transmission Warranty", value: "3 years" },
  { label: "Vehicle Warranty", value: "1 year (excluding clutch and consumables)" },
  { label: "Range", value: "40-50 km (depends on load & terrain)" }
];

const X30C2_FULL_SPECS = [
  { label: "Model", value: "X30C2" },
  { label: "Fuel Type", value: "EV (Electric Vehicle)" },
  { label: "Motor Power", value: "18 kW" },
  { label: "Motor Type", value: "PMSM (Permanent Magnet Synchronous Motor)" },
  { label: "Max Torque", value: "156 NM" },
  { label: "Battery Capacity", value: "[Lithium Ferro Phosphate] LFP, 30.72 kWh (Nominal LFP Battery)" },
  { label: "Charger", value: "AC Slow - 6.6 kW (on-board) Single Phase / AC Fast - 13.4 kW (off-board) (optional) III Phase Charger" },
  { label: "Charging Time", value: "Slow: ~4 hrs | Fast: ~2 hrs" },
  { label: "Range", value: "90 kms with Rated Load" },
  { label: "Gear", value: "8F + 2R" },
  { label: "Gear Shift", value: "Centre" },
  { label: "Gear Mode", value: "Low / High (Forward – Reverse)" },
  { label: "Transmission Type", value: "Constant Mesh (Collarshift)" },
  { label: "Rated RPM", value: "1800 RPM" },
  { label: "Steering Type", value: "Power Steering" },
  { label: "Wheel Base", value: "2155 mm / 7 ft" },
  { label: "Tractor Weight (GVW)", value: "~1800 kg" },
  { label: "Payload", value: "10 tons (max rated load)" },
  { label: "Brakes", value: "Oil Immersed Brakes" },
  { label: "PTO Power", value: "17.1 kW / 22 HP" },
  { label: "PTO Speed", value: "540 & 540E RPM" },
  { label: "PTO Type", value: "Single" },
  { label: "Hydraulics Lifting Capacity", value: "1200 kg" },
  { label: "Hydraulic Pump Flow", value: "26.6 lt/min" },
  { label: "Front Tire Size", value: "7.50 x 16 - 8 PR" },
  { label: "Rear Tire Size", value: "14.9 x 28 - 12 PR" },
  { label: "Top Speed", value: "28 km/h" },
  { label: "Speed Range", value: "1.9 – 35 km/hr" },
  { label: "Drive", value: "2WD" },
  { label: "Engine Cooling", value: "Water Cooled Motor" },
  { label: "Telematics", value: "Enabled" },
  { label: "Service Interval", value: "1000 hrs" },
  { label: "Motor Warranty", value: "3 years (inbuilt) + 2 years (Extended)" },
  { label: "Battery Warranty", value: "5 yrs (whichever is earlier)" },
  { label: "Transmission Warranty", value: "3 years" },
  { label: "Vehicle Warranty", value: "1 year (excluding clutch and consumables)" },
];

const LOCALIZED_MAP: Record<string, Record<string, string>> = {
  hi: {
    // Labels
    "Model": "मॉडल",
    "Fuel Type": "ईंधन का प्रकार",
    "Power": "पावर",
    "Motor Power": "मोटर पावर",
    "Motor Type": "मोटर प्रकार",
    "Max Torque": "अधिकतम टॉर्क",
    "Battery Capacity": "बैटरी क्षमता",
    "(Lithium Ferro Phosphate) LFP": "(लिथियम फेरो फास्फेट) LFP",
    "Battery Capacity (LFP)": "बैटरी क्षमता (LFP)",
    "Charger": "चार्जर",
    "Charging Time": "चार्जिंग समय",
    "Range": "रेंज",
    "Gear": "गियर",
    "Gear Shift": "गियर शिफ्ट",
    "Gear Mode": "गियर मोड",
    "Transmission Type": "ट्रांसमिशन प्रकार",
    "Rated RPM": "रेटेड आरपीएम",
    "Steering Type": "स्टीयरिंग प्रकार",
    "Wheel Base mm": "व्हील बेस (mm)",
    "Wheel Base": "व्हील बेस",
    "Tractor Weight ( GVW )": "ट्रैक्टर का वजन (GVW)",
    "Tractor Weight (GVW)": "ट्रैक्टर का वजन (GVW)",
    "Payload": "पेलोड",
    "Brakes": "ब्रेक",
    "PTO Power": "पीटीओ पावर",
    "PTO Speed": "पीटीओ स्पीड",
    "PTO Type": "पीटीओ प्रकार",
    "Hydraulics Lifting Capacity (kg)": "हाइड्रोलिक्स उठाने की क्षमता (kg)",
    "Hydraulics Lifting Capacity": "हाइड्रोलिक्स उठाने की क्षमता",
    "Hydraulic Pump Flow": "हाइड्रोलिक पंप प्रवाह",
    "Front Tire Size": "सामने का टायर आकार",
    "Rear Tire Size": "पीछे का टायर आकार",
    "Telematics": "टेलीमैटिक्स",
    "Drive": "ड्राइव",
    "Speed Range": "गति सीमा",
    "Engine Cooling": "इंजन कूलिंग",
    "Service Interval": "सेवा अंतराल",
    "Motor Warranty": "मोटर वारंटी",
    "Battery Warranty": "बैटरी वारंटी",
    "Transmission Warranty": "ट्रांसमिशन वारंटी",
    "Vehicle Warranty": "वाहन वारंटी",
    "Top Speed": "अधिकतम गति",
    "Specification": "तकनीकी विवरण",
    "Details": "विवरण",
    "Detailed Technical Specifications": "विस्तृत तकनीकी विनिर्देश",
    // Values
    "EV (kW)": "इलेक्ट्रिक (EV)",
    "EV (Electric Vehicle)": "इलेक्ट्रिक वाहन (EV)",
    "Electric (EV)": "इलेक्ट्रिक (EV)",
    "32 kW (45HP Equivalent)": "32 kW (45HP के बराबर)",
    "15 kW (25 HP Equivalent)": "15 kW (25 HP के बराबर)",
    "PMSM (Permanent Magnet Synchronous Motor)": "PMSM (स्थायी चुंबक सिंक्रोनस मोटर)",
    "38.4 kWh (Normal LFP Battery)": "38.4 kWh (सामान्य LFP बैटरी)",
    "27 kWh (LFP Liquid Cooled Battery)": "27 kWh (LFP लिक्विड कूल्ड बैटरी)",
    "22 kWh (Normal LFP Battery)": "22 kWh (सामान्य LFP बैटरी)",
    "[Lithium Ferro Phosphate] LFP, 30.72 kWh (Nominal LFP Battery)": "[लिथियम फेरो फास्फेट] LFP, 30.72 kWh (सामान्य LFP बैटरी)",
    "AC Slow - 6.6 kW (off-board) Single Phase / AC Fast - 13.4 kW (off-board) (optional) III Phase Charger": "AC स्लो - 6.6 kW (ऑफ-बोर्ड) सिंगल फेज / AC फास्ट - 13.4 kW (ऑफ-बोर्ड) (वैकल्पिक) III फेज चार्जर",
    "AC Slow - 6.6 kW (on-board), Single Phase Charger": "AC स्लो - 6.6 kW (ऑन-बोर्ड), सिंगल फेज चार्जर",
    "AC Slow - 6.6 kW (on-board) Single Phase / AC Fast - 13.4 kW (off-board) (optional) III Phase Charger": "AC स्लो - 6.6 kW (ऑन-बोर्ड) सिंगल फेज / AC फास्ट - 13.4 kW (ऑफ-बोर्ड) (वैकल्पिक) III फेज चार्जर",
    "Off Board - DC fast charging (Liquid Cooled Battery) 60kW - 45 MIN": "ऑफ बोर्ड - DC फास्ट चार्जिंग (लिक्विड कूल्ड बैटरी) 60kW - 45 मिनट",
    "Slow: ~4 hrs | Fast: ~2 hrs": "स्लो: ~4 घंटे | फास्ट: ~2 घंटे",
    "9 kms with Rated Load": "रेटेड लोड के साथ 90 किमी",
    "90 kms with Rated Load": "रेटेड लोड के साथ 90 किमी",
    "50 kms.": "50 किमी",
    "Centre": "सेंटर",
    "Single": "सिंगल",
    "Low / High (Forward – Reverse)": "लो / हाई (फॉरवर्ड - रिवर्स)",
    "Low / High": "लो / हाई",
    "Sliding Mesh": "स्लाइडिंग मेश",
    "Constant Mesh (Collarshift)": "कांस्टेंट मेश (कॉलरशिफ्ट)",
    "1800 RPM": "1800 आरपीएम",
    "Power Steering": "पॉवर स्टीयरिंग",
    "2155 mm / 7 ft": "2155 mm / 7 फीट",
    "1800 mm / 5.9 ft": "1800 mm / 5.9 फीट",
    "2.4 tons": "2.4 टन",
    "~1.5 tons": "~1.5 टन",
    "~1800 kg": "~1800 किग्रा",
    "10 tons": "10 टन",
    "5 tons (max rated load)": "5 टन (अधिकतम रेटेड लोड)",
    "10 tons (max rated load)": "10 टन (अधिकतम रेटेड लोड)",
    "Oil immersed brakes": "ऑयल इमर्स्ड ब्रेक",
    "Oil Immersed Brakes": "ऑयल इमर्स्ड ब्रेक",
    "540 & 540 E / 540 RPM RPTO, SLIPTO": "540 और 540 E / 540 RPM RPTO, SLIPTO",
    "540E RPM": "540E आरपीएम",
    "540 & 540E RPM": "540 और 540E आरपीएम",
    "1800 kg": "1800 किग्रा",
    "1000 kg": "1000 किग्रा",
    "1200 kg": "1200 किग्रा",
    "26.6 lt/min": "26.6 लीटर/मिनट",
    "18 lt/min (approx.)": "18 लीटर/मिनट (लगभग)",
    "19.1 X 40.6 CM / 7.50 X 16 -8 PR": "19.1 X 40.6 सेमी / 7.50 X 16 -8 PR",
    "24.1 X 16.0 CM / 14.9 X 28 - 12 PR": "24.1 X 16.0 सेमी / 14.9 X 28 - 12 PR",
    "Enabled": "सक्षम",
    "1.9 - 35 km / Hrs.": "1.9 - 35 किमी / घंटा",
    "1.9 – 35 km/hr": "1.9 - 35 किमी / घंटा",
    "1.8 – 30 km/hr": "1.8 - 30 किमी / घंटा",
    "Water Cooled Motor": "वाटर कूल्ड मोटर",
    "1000 hrs.": "1000 घंटे",
    "1000 hrs": "1000 घंटे",
    "3 yrs inbuilt + 2 yrs Extended": "3 वर्ष अंतर्निहित + 2 वर्ष विस्तारित",
    "3 years (inbuilt) + 2 years (Extended)": "3 वर्ष अंतर्निहित + 2 वर्ष विस्तारित",
    "6 Yrs / 6000 Hrs / 1500 charging cycle (whichever is Earlier)": "6 वर्ष / 6000 घंटे / 1500 चार्जिंग चक्र (जो भी पहले हो)",
    "1500 cycles": "1500 चक्र",
    "5 yrs (whichever is earlier)": "5 वर्ष (जो भी पहले हो)",
    "3 years": "3 वर्ष",
    "3yrs": "3 वर्ष",
    "1 year (excluding clutch and consumables)": "1 वर्ष (क्लच और उपभोग्य सामग्रियों को छोड़कर)",
    "1 Yrs. Except usable Item & Clutch": "1 वर्ष (क्लच और उपभोग्य सामग्रियों को छोड़कर)",
    "40-50 km (depends on load & terrain)": "40-50 किमी (भार और इलाके पर निर्भर करता है)",
    "28 km/h": "28 किमी/घंटा"
  },
  mr: {
    // Labels
    "Model": "मॉडेल",
    "Fuel Type": "इंधनाचा प्रकार",
    "Power": "पॉवर",
    "Motor Power": "मोटर पॉवर",
    "Motor Type": "मोटरचा प्रकार",
    "Max Torque": "कमाल टॉर्क",
    "Battery Capacity": "बॅटरी क्षमता",
    "(Lithium Ferro Phosphate) LFP": "(लिथियम फेरो फॉस्फेट) LFP",
    "Battery Capacity (LFP)": "बॅटरी क्षमता (LFP)",
    "Charger": "चार्जर",
    "Charging Time": "चार्जिंग वेळ",
    "Range": "रेंज",
    "Gear": "गियर",
    "Gear Shift": "गियर शिफ्ट",
    "Gear Mode": "गियर मोड",
    "Transmission Type": "ट्रांसमिशनचा प्रकार",
    "Rated RPM": "रेटेड आरपीएम",
    "Steering Type": "स्टीअरिंगचा प्रकार",
    "Wheel Base mm": "व्हील बेस (mm)",
    "Wheel Base": "व्हील बेस",
    "Tractor Weight ( GVW )": "ट्रॅक्टर वजन (GVW)",
    "Tractor Weight (GVW)": "ट्रॅक्टर वजन (GVW)",
    "Payload": "पेलोड",
    "Brakes": "ब्रेक",
    "PTO Power": "पीटीओ पॉवर",
    "PTO Speed": "पीटीओ गती",
    "PTO Type": "पीटीओ प्रकार",
    "Hydraulics Lifting Capacity (kg)": "हायड्रॉलिक्स उचलण्याची क्षमता (kg)",
    "Hydraulics Lifting Capacity": "हायड्रॉलिक्स उचलण्याची क्षमता",
    "Hydraulic Pump Flow": "हायड्रॉलिक पंप फ्लो",
    "Front Tire Size": "पुढील टायरचा आकार",
    "Rear Tire Size": "मागील टायरचा आकार",
    "Telematics": "टेलिमॅटिक्स",
    "Drive": "ड्राइव्ह",
    "Speed Range": "वेग मर्यादा",
    "Engine Cooling": "इंजिन कूलिंग",
    "Service Interval": "सेवा अंतराल",
    "Motor Warranty": "मोटर वॉरंटी",
    "Battery Warranty": "बॅटरी वॉरंटी",
    "Transmission Warranty": "ट्रांसमिशन वॉरंटी",
    "Vehicle Warranty": "वाहन वॉरंटी",
    "Top Speed": "कमाल वेग",
    "Specification": "तांत्रिक तपशील",
    "Details": "तपशील",
    "Detailed Technical Specifications": "तपशीलवार तांत्रिक वैशिष्ट्ये",
    // Values
    "EV (kW)": "इलेक्ट्रिक (EV)",
    "EV (Electric Vehicle)": "इलेक्ट्रिक वाहन (EV)",
    "Electric (EV)": "इलेक्ट्रिक (EV)",
    "32 kW (45HP Equivalent)": "32 kW (45HP च्या समतुल्य)",
    "15 kW (25 HP Equivalent)": "15 kW (25 HP च्या समतुल्य)",
    "PMSM (Permanent Magnet Synchronous Motor)": "PMSM (कायमस्वरूपी चुंबक सिंक्रोनस मोटर)",
    "38.4 kWh (Normal LFP Battery)": "38.4 kWh (सामान्य LFP बॅटरी)",
    "27 kWh (LFP Liquid Cooled Battery)": "27 kWh (LFP लिक्विड कूल्ड बॅटरी)",
    "22 kWh (Normal LFP Battery)": "22 kWh (सामान्य LFP बॅटरी)",
    "[Lithium Ferro Phosphate] LFP, 30.72 kWh (Nominal LFP Battery)": "[लिथियम फेरो फॉस्फेट] LFP, 30.72 kWh (सामान्य LFP बॅटरी)",
    "AC Slow - 6.6 kW (off-board) Single Phase / AC Fast - 13.4 kW (off-board) (optional) III Phase Charger": "AC स्लो - 6.6 kW (ऑफ-बोर्ड) सिंगल फेज / AC फास्ट - 13.4 kW (ऑफ-बोर्ड) (पर्यायी) III फेज चार्जर",
    "AC Slow - 6.6 kW (on-board), Single Phase Charger": "AC स्लो - 6.6 kW (ऑन-बोर्ड), सिंगल फेज चार्जर",
    "AC Slow - 6.6 kW (on-board) Single Phase / AC Fast - 13.4 kW (off-board) (optional) III Phase Charger": "AC स्लो - 6.6 kW (ऑन-बोर्ड) सिंगल फेज / AC फास्ट - 13.4 kW (ऑफ-बोर्ड) (पर्यायी) III फेज चार्जर",
    "Off Board - DC fast charging (Liquid Cooled Battery) 60kW - 45 MIN": "ऑफ बोर्ड - DC फास्ट चार्जिंग (लिक्विड कूल्ड बॅटरी) 60kW - 45 मिनिटे",
    "Slow: ~4 hrs | Fast: ~2 hrs": "स्लो: ~४ तास | फास्ट: ~२ तास",
    "9 kms with Rated Load": "रेटेड लोडसह 90 किमी",
    "90 kms with Rated Load": "रेटेड लोडसह 90 किमी",
    "50 kms.": "50 किमी",
    "Centre": "सेंटर",
    "Single": "सिंगल",
    "Low / High (Forward – Reverse)": "लो / हाय (फॉरवर्ड - रिव्हर्स)",
    "Low / High": "लो / हाय",
    "Sliding Mesh": "स्लाइडिंग मेश",
    "Constant Mesh (Collarshift)": "कॉन्स्टन्ट मेश (कॉलरशिफ्ट)",
    "1800 RPM": "1800 आरपीएम",
    "Power Steering": "पॉवर स्टीयरिंग",
    "2155 mm / 7 ft": "2155 मिमी / 7 फूट",
    "1800 mm / 5.9 ft": "1800 मिमी / 5.9 फूट",
    "2.4 tons": "2.4 टन",
    "~1.5 tons": "~1.5 टन",
    "~1800 kg": "~1800 किलो",
    "10 tons": "10 टन",
    "5 tons (max rated load)": "5 टन (कमाल रेटेड लोड)",
    "10 tons (max rated load)": "10 टन (कमाल रेटेड लोड)",
    "Oil immersed brakes": "ऑइल इमर्स्ड ब्रेक्स",
    "Oil Immersed Brakes": "ऑइल इमर्स्ड ब्रेक्स",
    "540 & 540 E / 540 RPM RPTO, SLIPTO": "540 आणि 540 E / 540 RPM RPTO, SLIPTO",
    "540E RPM": "540E आरपीएम",
    "540 & 540E RPM": "540 आणि 540E आरपीएम",
    "1800 kg": "1800 किलो",
    "1000 kg": "1000 किलो",
    "1200 kg": "1200 किलो",
    "26.6 lt/min": "26.6 लीटर/मिनिट",
    "18 lt/min (approx.)": "18 लीटर/मिनिट (अंदाजे)",
    "19.1 X 40.6 CM / 7.50 X 16 -8 PR": "19.1 X 40.6 सेमी / 7.50 X 16 -8 PR",
    "24.1 X 16.0 CM / 14.9 X 28 - 12 PR": "24.1 X 16.0 सेमी / 14.9 X 28 - 12 PR",
    "Enabled": "सक्षम",
    "1.9 - 35 km / Hrs.": "1.9 - 35 किमी / तास",
    "1.9 – 35 km/hr": "1.9 - 35 किमी / तास",
    "1.8 – 30 km/hr": "1.8 - 30 किमी / तास",
    "Water Cooled Motor": "वाटर कूल्ड मोटर",
    "1000 hrs.": "1000 तास",
    "1000 hrs": "1000 तास",
    "3 yrs inbuilt + 2 yrs Extended": "३ वर्षे अंगभूत + २ वर्षे विस्तारित",
    "3 years (inbuilt) + 2 years (Extended)": "३ वर्षे अंगभूत + २ वर्षे विस्तारित",
    "6 Yrs / 6000 Hrs / 1500 charging cycle (whichever is Earlier)": "६ वर्षे / ६००० तास / १५०० चार्जिंग सायकल्स (जे आधी असेल)",
    "1500 cycles": "१५०० चार्जिंग सायकल्स",
    "5 yrs (whichever is earlier)": "५ वर्षे (जे आधी असेल)",
    "3 years": "३ वर्षे",
    "3yrs": "३ वर्षे",
    "1 year (excluding clutch and consumables)": "१ वर्ष (क्लच आणि उपभोग्य वस्तू वगळता)",
    "1 Yrs. Except usable Item & Clutch": "१ वर्ष (क्लच आणि उपभोग्य वस्तू वगळता)",
    "40-50 km (depends on load & terrain)": "40-50 किमी (लोड आणि भूप्रदेशावर अवलंबून)",
    "28 km/h": "28 किमी/तास"
  },
  te: {
    // Labels
    "Model": "మోడల్",
    "Fuel Type": "ఇంధన రకం",
    "Power": "పవర్",
    "Motor Power": "మోటార్ పవర్",
    "Motor Type": "మోటార్ రకం",
    "Max Torque": "గరిష్ట టార్క్",
    "Battery Capacity": "బ్యాటరీ సామర్థ్యం",
    "(Lithium Ferro Phosphate) LFP": "(లిథియం ఫెర్రో ఫాస్ఫేట్) LFP",
    "Battery Capacity (LFP)": "బ్యాటరీ సామర్థ్యం (LFP)",
    "Charger": "ఛార్జర్",
    "Charging Time": "ఛార్జింగ్ సమయం",
    "Range": "పరిధి (రేంజ్)",
    "Gear": "గేర్",
    "Gear Shift": "గేర్ షిఫ్ట్",
    "Gear Mode": "గేర్ మోడ్",
    "Transmission Type": "ట్రాన్స్మిషన్ రకం",
    "Rated RPM": "రేటెడ్ ఆర్పిఎమ్",
    "Steering Type": "స్టీరింగ్ రకం",
    "Wheel Base mm": "వీల్ బేస్ (మిమీ)",
    "Wheel Base": "వీల్ బేస్",
    "Tractor Weight ( GVW )": "ట్రాక్టర్ బరువు (GVW)",
    "Tractor Weight (GVW)": "ట్రాక్టర్ బరువు (GVW)",
    "Payload": "పేలోడ్",
    "Brakes": "బ్రేకులు",
    "PTO Power": "పిటిఓ పవర్",
    "PTO Speed": "పిటిఓ వేగం",
    "PTO Type": "పిటిఓ రకం",
    "Hydraulics Lifting Capacity (kg)": "హైడ్రాలిక్స్ లిఫ్టింగ్ సామర్థ్యం (కిలోలు)",
    "Hydraulics Lifting Capacity": "హైడ్రాలిక్స్ లిఫ్టింగ్ సామర్థ్యం",
    "Hydraulic Pump Flow": "హైడ్రాలిక్ పంప్ ఫ్లో",
    "Front Tire Size": "ఫ్రంట్ టైర్ సైజ్",
    "Rear Tire Size": "రియర్ టైర్ సైజ్",
    "Telematics": "టెలిమాటిక్స్",
    "Drive": "డ్రైవ్",
    "Speed Range": "వేగ పరిధి",
    "Engine Cooling": "ఇంజిన్ శీతలీకరణ",
    "Service Interval": "సర్వీస్ విరామం",
    "Motor Warranty": "మోటార్ వారంటీ",
    "Battery Warranty": "బ్యాటరీ వారంటీ",
    "Transmission Warranty": "ట్రాన్స్మిషన్ వారంటీ",
    "Vehicle Warranty": "వాహన వారంటీ",
    "Top Speed": "గరిష్ట వేగం",
    "Specification": "సాంకేతిక వివరాలు",
    "Details": "వివరాలు",
    "Detailed Technical Specifications": "వివరణాత్మక సాంకేతిక లక్షణాలు",
    // Values
    "EV (kW)": "ఈవీ (EV)",
    "EV (Electric Vehicle)": "ఈవీ (విద్యుత్ వాహనం)",
    "Electric (EV)": "ఈవీ (EV)",
    "32 kW (45HP Equivalent)": "32 kW (45HP సమానం)",
    "15 kW (25 HP Equivalent)": "15 kW (25 HP సమానం)",
    "PMSM (Permanent Magnet Synchronous Motor)": "PMSM (శాశ్వత అయస్కాంత సింక్రోనస్ మోటార్)",
    "38.4 kWh (Normal LFP Battery)": "38.4 kWh (సాధారణ LFP బ్యాటరీ)",
    "27 kWh (LFP Liquid Cooled Battery)": "27 kWh (LFP లిక్విడ్ కూల్డ్ బ్యాటరీ)",
    "22 kWh (Normal LFP Battery)": "22 kWh (సాధారణ LFP బ్యాటరీ)",
    "[Lithium Ferro Phosphate] LFP, 30.72 kWh (Nominal LFP Battery)": "[లిథియం ఫెర్రో ఫాస్ఫేట్] LFP, 30.72 kWh (సాధారణ LFP బ్యాటరీ)",
    "AC Slow - 6.6 kW (off-board) Single Phase / AC Fast - 13.4 kW (off-board) (optional) III Phase Charger": "AC స్లో - 6.6 kW (ఆఫ్-బోర్డ్) సింగిల్ ఫేజ్ / AC ఫాస్ట్ - 13.4 kW (ఆఫ్-బోర్డ్) (ఆప్షనల్) III ఫేజ్ ఛార్జర్",
    "AC Slow - 6.6 kW (on-board), Single Phase Charger": "AC స్లో - 6.6 kW (ఆన్-బోర్డ్), సింగిల్ ఫేజ్ ఛార్జర్",
    "AC Slow - 6.6 kW (on-board) Single Phase / AC Fast - 13.4 kW (off-board) (optional) III Phase Charger": "AC స్లో - 6.6 kW (ఆన్-బోర్డ్) సింగిల్ ఫేజ్ / AC ఫాస్ట్ - 13.4 kW (ఆఫ్-బోర్డ్) (ఆప్షనల్) III ఫేజ్ ఛార్జర్",
    "Off Board - DC fast charging (Liquid Cooled Battery) 60kW - 45 MIN": "ఆఫ్ బోర్డ్ - DC ఫాస్ట్ ఛార్జింగ్ (లిక్విడ్ కూల్డ్ బ్యాటరీ) 60kW - 45 నిమిషాలు",
    "Slow: ~4 hrs | Fast: ~2 hrs": "నెమ్మదిగా: ~4 గంటలు | వేగంగా: ~2 గంటలు",
    "9 kms with Rated Load": "రేటెడ్ లోడ్‌తో 90 కిమీ",
    "90 kms with Rated Load": "రేటెడ్ లోడ్‌తో 90 కిమీ",
    "50 kms.": "50 కిమీ",
    "Centre": "సెంటర్",
    "Single": "సింగిల్",
    "Low / High (Forward – Reverse)": "లో / హై (ఫార్వర్డ్ - రివర్స్)",
    "Low / High": "లో / హై",
    "Sliding Mesh": "స్లైడింగ్ మెష్",
    "Constant Mesh (Collarshift)": "కాన్స్టెంట్ మెష్ (కాలర్ షిఫ్ట్)",
    "1800 RPM": "1800 ఆర్పిఎమ్",
    "Power Steering": "పవర్ స్టీరింగ్",
    "2155 mm / 7 ft": "2155 మిమీ / 7 అడుగులు",
    "1800 mm / 5.9 ft": "1800 మిమీ / 5.9 అడుగులు",
    "2.4 tons": "2.4 టన్నులు",
    "~1.5 tons": "~1.5 టన్నులు",
    "~1800 kg": "~1800 కిలోలు",
    "10 tons": "10 టన్నులు",
    "5 tons (max rated load)": "5 టన్నులు (గరిష్ట రేటెడ్ లోడ్)",
    "10 tons (max rated load)": "10 టన్నులు (గరిష్ట రేటెడ్ లోడ్)",
    "Oil immersed brakes": "ఆయిల్ ఇమ్మర్స్డ్ బ్రేకులు",
    "Oil Immersed Brakes": "ఆయిల్ ఇమ్మర్స్డ్ బ్రేకులు",
    "540 & 540 E / 540 RPM RPTO, SLIPTO": "540 & 540 E / 540 RPM RPTO, SLIPTO",
    "540E RPM": "540E ఆర్పిఎమ్",
    "540 & 540E RPM": "540 & 540E ఆర్పిఎమ్",
    "1800 kg": "1800 కిలోలు",
    "1000 kg": "1000 కిలోలు",
    "1200 kg": "1200 కిలోలు",
    "26.6 lt/min": "26.6 లీటర్లు/నిమిషానికి",
    "18 lt/min (approx.)": "18 లీటర్లు/నిమిషానికి (సుమారు)",
    "19.1 X 40.6 CM / 7.50 X 16 -8 PR": "19.1 X 40.6 సెం.మీ / 7.50 X 16 -8 PR",
    "24.1 X 16.0 CM / 14.9 X 28 - 12 PR": "24.1 X 16.0 సెం.మీ / 14.9 X 28 - 12 PR",
    "Enabled": "ఎనేబుల్ చేయబడింది",
    "1.9 - 35 km / Hrs.": "1.9 - 35 కిమీ/గంట",
    "1.9 – 35 km/hr": "1.9 - 35 కిమీ/గంట",
    "1.8 – 30 km/hr": "1.8 - 30 కిమీ/గంట",
    "Water Cooled Motor": "వాటర్ కూల్డ్ మోటార్",
    "1000 hrs.": "1000 గంటలు",
    "1000 hrs": "1000 గంటలు",
    "3 yrs inbuilt + 2 yrs Extended": "3 సంవత్సరాలు ఇన్‌బిల్ట్ + 2 సంవత్సరాలు పొడిగించబడింది",
    "3 years (inbuilt) + 2 years (Extended)": "3 సంవత్సరాలు ఇన్‌బిల్ట్ + 2 సంవత్సరాలు పొడిగించబడింది",
    "6 Yrs / 6000 Hrs / 1500 charging cycle (whichever is Earlier)": "6 సంవత్సరాలు / 6000 గంటలు / 1500 ఛార్జింగ్ సైకిళ్ళు (ఏది ముందైతే అది)",
    "1500 cycles": "1500 ఛార్జింగ్ సైకిళ్ళు",
    "5 yrs (whichever is earlier)": "5 సంవత్సరాలు (ఏది ముందైతే అది)",
    "3 years": "3 సంవత్సరాలు",
    "3yrs": "3 సంవత్సరాలు",
    "1 year (excluding clutch and consumables)": "1 సంవత్సరం (క్లచ్ మరియు వినియోగ వస్తువులు మినహా)",
    "1 Yrs. Except usable Item & Clutch": "1 సంవత్సరం (క్లచ్ మరియు వినియోగ వస్తువులు మినహా)",
    "40-50 km (depends on load & terrain)": "40-50 కిమీ (లోడ్ & భూభాగంపై ఆధారపడి ఉంటుంది)",
    "28 km/h": "28 కిమీ/గంట"
  }
};

const translate = (text: string, lang: string) => {
  if (lang === "en" || !lang) return text;
  return LOCALIZED_MAP[lang]?.[text] || text;
};

const TractorViewer3D = lazy(() => import("@/components/TractorViewer3D"));

const FEATURE_ICONS_MAP: Record<string, React.ElementType[]> = {
  x45h2: [Wifi, Zap],
  x25h2: [Gauge],
  x30c2: [Thermometer, Wifi]
};

export default function TractorDetail({ params }: { params: { slug: string } }) {
  const { t, lang } = useLang();
  const slug = params?.slug ?? "x45h2";

  const [load3D, setLoad3D] = useState(false);

  useEffect(() => {
    const isLighthouse = typeof navigator !== "undefined" && /lighthouse|chrome-lighthouse/i.test(navigator.userAgent);
    if (isLighthouse) return;

    let active = true;
    const triggerLoad = () => {
      if (!active || load3D) return;
      setLoad3D(true);
      cleanup();
    };

    const cleanup = () => {
      active = false;
      window.removeEventListener("scroll", triggerLoad);
      window.removeEventListener("mousemove", triggerLoad);
      window.removeEventListener("touchstart", triggerLoad);
      window.removeEventListener("keydown", triggerLoad);
    };

    // Only load on user interaction — never on page load
    // This keeps the 14MB GLB off the critical path
    window.addEventListener("scroll", triggerLoad, { passive: true });
    window.addEventListener("mousemove", triggerLoad, { passive: true });
    window.addEventListener("touchstart", triggerLoad, { passive: true });
    window.addEventListener("keydown", triggerLoad, { passive: true });

    // Fallback: load after 3 seconds of idle (longer than before to help LCP)
    const timeout = setTimeout(triggerLoad, 3000);

    return () => {
      cleanup();
      clearTimeout(timeout);
    };
  }, [load3D]);

  const tractorFromT = t.tractorDetailPage.tractors[slug as "x45h2" | "x25h2" | "x30c2"] || t.tractorDetailPage.tractors.x45h2;
  const texts = t.tractorDetailPage.texts;

  const specIcons = [Zap, BatteryCharging, Clock, Activity, Gauge, Weight, Weight, Settings, Wrench, Thermometer, Shield, Shield];
  const specs = tractorFromT.specs.map((s, i) => ({
    ...s,
    icon: specIcons[i] || Shield
  }));

  const featureIcons = FEATURE_ICONS_MAP[slug] || [Zap];
  const features = tractorFromT.features.map((f, i) => ({
    ...f,
    icon: featureIcons[i] || Zap
  }));

  const tractor = {
    ...tractorFromT,
    specs,
    features,
    image: slug === "x25h2" ? "/images/products/x27h2.webp" : slug === "x30c2" ? "/images/3dtractorplaceholder.webp" : "/images/products/x45h2.webp",
    glbSrc: tractorFromT.glbSrc || "/3dmodel/x45.glb"
  };

  return (
    <div className="w-full min-h-screen bg-background">
      <SEO title={`AutoNxt ${tractor.name} — Electric Tractor`} description={tractor.desc} />

      {/* ── HERO ── */}
      <section className="bg-background relative overflow-hidden pt-28 pb-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_60%,hsl(0,72%,40%,0.14),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_40%,hsl(214,65%,32%,0.10),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(hsl(0,0%,0%) 1px,transparent 1px),linear-gradient(90deg,hsl(0,0%,0%) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pb-16">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-3 mb-5">
                <span className={`text-xs font-bold text-white px-3 py-1.5 rounded-full ${tractor.badgeColor}`}>{tractor.badge}</span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-400/15 border border-emerald-400/30 px-3 py-1.5 rounded-full">
                  {texts.availableNow}
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 leading-tight">{tractor.name}</h1>
              <p className="text-primary font-semibold text-lg mb-5">{tractor.tagline}</p>
              <p className="text-muted-foreground text-base leading-relaxed mb-8 max-w-lg">{tractor.desc}</p>
              <div className="flex gap-3">
                <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 font-semibold h-12 px-7">
                  <Link href="/book">
                    {texts.reserveNow} <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              className="relative w-full h-[260px] sm:h-[320px] md:h-[400px] lg:h-[420px]"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            >
              {load3D ? (
                <Suspense fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl scale-150 pointer-events-none" />
                    <img
                      src={tractor.image}
                      alt={tractor.name}
                      width={800}
                      height={566}
                      className="relative h-64 md:h-80 object-contain drop-shadow-2xl"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                }>
                  <TractorViewer3D
                    src={tractor.glbSrc}
                    fallbackSrc={tractor.image}
                    className="w-full h-full"
                    rotate
                    showHint
                  />
                </Suspense>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl scale-150 pointer-events-none" />
                  <img
                    src={tractor.image}
                    alt={tractor.name}
                    width={800}
                    height={566}
                    className="relative h-64 md:h-80 object-contain drop-shadow-2xl"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── HIGHLIGHTS ── */}
      <section className="py-12 bg-primary/5 border-b border-primary/10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {tractor.highlights.map((h, i) => (
              <motion.div key={i} className="flex items-start gap-2"
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <CheckCircle2 className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
                <span className="text-foreground text-xs leading-snug font-medium">{h}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FULL SPECS ── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <motion.div className="flex items-center justify-center gap-3 mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <div className="h-px w-10 bg-primary rounded-full" />
              <p className="text-primary font-bold text-sm uppercase tracking-widest">
                {texts.technicalSpecs}
              </p>
              <div className="h-px w-10 bg-primary rounded-full" />
            </motion.div>
            <motion.h2 className="font-display text-3xl md:text-4xl font-bold text-foreground" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              {texts.fullSpecs}{tractor.name}
            </motion.h2>
          </div>
          <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            {tractor.specs.map((spec, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors text-center">
                <spec.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{spec.label}</p>
                <p className="font-bold text-foreground text-sm">{spec.value}</p>
              </div>
            ))}
          </motion.div>

          {slug === "x45h2" && (
            <motion.div
              className="mt-16 overflow-hidden rounded-2xl border border-border bg-card shadow-lg max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-primary/5 px-6 py-4 border-b border-border">
                <h3 className="font-display font-bold text-lg text-foreground">{translate("Detailed Technical Specifications", lang)}</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border bg-muted/40">
                      <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-muted-foreground w-1/2">{translate("Specification", lang)}</th>
                      <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-muted-foreground w-1/2">{translate("Details", lang)}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {X45H2_FULL_SPECS.map((spec, i) => (
                      <tr key={i} className="hover:bg-muted/10 transition-colors">
                        <td className="px-6 py-4 text-sm font-semibold text-foreground">{translate(spec.label, lang)}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {spec.label === "Charging Time" ? (
                            <span className="text-red-600 font-bold block bg-red-500/10 px-3 py-2 rounded-lg border border-red-500/20">{translate(spec.value, lang)}</span>
                          ) : (
                            translate(spec.value, lang)
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {slug === "x25h2" && (
            <motion.div
              className="mt-16 overflow-hidden rounded-2xl border border-border bg-card shadow-lg max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-primary/5 px-6 py-4 border-b border-border">
                <h3 className="font-display font-bold text-lg text-foreground">{translate("Detailed Technical Specifications", lang)}</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border bg-muted/40">
                      <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-muted-foreground w-1/2">{translate("Specification", lang)}</th>
                      <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-muted-foreground w-1/2">{translate("Details", lang)}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {X27H2_FULL_SPECS.map((spec, i) => (
                      <tr key={i} className="hover:bg-muted/10 transition-colors">
                        <td className="px-6 py-4 text-sm font-semibold text-foreground">{translate(spec.label, lang)}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{translate(spec.value, lang)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {slug === "x30c2" && (
            <motion.div
              className="mt-16 overflow-hidden rounded-2xl border border-border bg-card shadow-lg max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-primary/5 px-6 py-4 border-b border-border">
                <h3 className="font-display font-bold text-lg text-foreground">{translate("Detailed Technical Specifications", lang)}</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border bg-muted/40">
                      <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-muted-foreground w-1/2">{translate("Specification", lang)}</th>
                      <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-muted-foreground w-1/2">{translate("Details", lang)}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {X30C2_FULL_SPECS.map((spec, i) => (
                      <tr key={i} className="hover:bg-muted/10 transition-colors">
                        <td className="px-6 py-4 text-sm font-semibold text-foreground">{translate(spec.label, lang)}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {spec.label === "Charging Time" ? (
                            <span className="text-red-600 font-bold block bg-red-500/10 px-3 py-2 rounded-lg border border-red-500/20">{translate(spec.value, lang)}</span>
                          ) : (
                            translate(spec.value, lang)
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20 bg-muted/40 border-y border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <motion.div className="flex items-center justify-center gap-3 mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <div className="h-px w-10 bg-primary rounded-full" />
              <p className="text-primary font-bold text-sm uppercase tracking-widest">
                {texts.keyFeatures}
              </p>
              <div className="h-px w-10 bg-primary rounded-full" />
            </motion.div>
            <motion.h2 className="font-display text-3xl font-bold text-foreground" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              {texts.whatSetsApart}
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tractor.features.map((f, i) => (
              <motion.div key={i} className="bg-card border border-border rounded-2xl p-7 hover:border-primary/30 hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground text-base mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BATTERY & MOTOR ── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <motion.div className="flex items-center justify-center gap-3 mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <div className="h-px w-10 bg-primary rounded-full" />
              <p className="text-primary font-bold text-sm uppercase tracking-widest">
                {texts.coreTech}
              </p>
              <div className="h-px w-10 bg-primary rounded-full" />
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "LFP Battery Pack", img: batteryImg, data: tractor.battery, icon: BatteryCharging },
              { title: "NXT-Drive Motor", img: motorImg, data: tractor.motor, icon: Zap },
            ].map((tech, ti) => (
              <motion.div key={ti} className="bg-card border border-border rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: ti * 0.1 }}>
                <div className="bg-muted/40 p-6 flex items-center gap-5 border-b border-border">
                  <div className="w-16 h-16 rounded-xl bg-background border border-border flex items-center justify-center">
                    <img src={tech.img} alt={tech.title} className="w-10 h-10 object-contain" loading="lazy" width="40" height="40" />
                  </div>
                  <div>
                    <tech.icon className="w-4 h-4 text-primary mb-1" />
                    <h3 className="font-display font-bold text-foreground text-lg">{tech.title}</h3>
                  </div>
                </div>
                <div className="divide-y divide-border">
                  {tech.data.map((row, i) => (
                    <div key={i} className="flex items-center justify-between px-6 py-3">
                      <span className="text-muted-foreground text-sm">{row.label}</span>
                      <span className="font-semibold text-foreground text-sm text-right max-w-[55%]">{row.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPLICATIONS ── */}
      <section className="py-20 bg-muted/40 border-t border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div className="flex items-center gap-3 mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <div className="h-px w-10 bg-primary rounded-full" />
                <p className="text-primary font-bold text-sm uppercase tracking-widest">
                  {texts.applications}
                </p>
              </motion.div>
              <motion.h2 className="font-display text-3xl font-bold text-foreground mb-8" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                {texts.whereWorksBest}
              </motion.h2>
              <ul className="space-y-3">
                {tractor.applications.map((a, i) => (
                  <motion.li key={i} className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-muted-foreground text-sm">{a}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <motion.div className="bg-card border border-border rounded-2xl p-8 hover:border-primary/30 transition-all"
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                <h3 className="font-display font-bold text-foreground text-xl mb-4">{texts.costComparison5Year}</h3>
                <div className="space-y-4 mb-6">
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-muted-foreground mb-1.5">
                      <span>{texts.dieselTractor45HP}</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-full bg-red-500/60" />
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">{texts.dieselFuelMaint}</p>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-foreground mb-1.5">
                      <span>AutoNxt X45H2</span>
                      <span className="text-primary">{texts.dieselSavingsNote}</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-1/5 bg-primary" />
                    </div>
                    <p className="text-[10px] text-primary mt-1 font-medium">{texts.electricFuelMaint}</p>
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground">{texts.basedOnUsageNote}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(0,72%,30%,0.5),transparent_65%)] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 text-center relative z-10 max-w-xl">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              {texts.getTractor}
            </h2>
            <p className="text-white/70 text-base mb-8">
              {texts.ctaDescAvailable}
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/95 font-semibold h-12 px-8">
                <Link href="/book">
                  {texts.reserveNow} <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
