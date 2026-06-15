/**
 * Patches AutonXT Support Call Center workflow:
 * - International phone (any country with +code)
 * - Female voice on Vapi outbound (11labs)
 * Run: node src/lib/patch-n8n-call-voice.mjs
 */
import { readFileSync } from "fs";
import { join } from "path";
import { homedir } from "os";

const envPath = join(homedir(), ".cursor/.env");
try {
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i < 0) continue;
    const k = t.slice(0, i).trim();
    if (!process.env[k]) process.env[k] = t.slice(i + 1).trim();
  }
} catch {
  /* optional env file */
}

const BASE = process.env.N8N_BASE_URL || "https://autonxt.app.n8n.cloud/api/v1";
const KEY = process.env.N8N_API_KEY;
const WORKFLOW_ID = "mFC16BycIFxFkdeE";

if (!KEY) {
  console.error("Set N8N_API_KEY in ~/.cursor/.env");
  process.exit(1);
}

const NORM_PHONE = `function normPhone(p){let s=(p||'').toString().replace(/[^0-9+]/g,'');if(!s)return'';if(s.startsWith('+')){const d=s.slice(1).replace(/\\D/g,'');return d.length>=8&&d.length<=15?('+'+d):'';}const d=s.replace(/\\D/g,'');if(d.length===10)return'+91'+d;if(d.length>=8&&d.length<=15)return'+'+d;return'';}`;

const PARSE_FORM = `const req=$('Form Submit Callback').first().json||{};const b=req.body&&typeof req.body==='object'?req.body:req;
${NORM_PHONE}
const name=(b.customer_name||b.name||'').toString().trim();
const email=(b.customer_email||b.email||'').toString().trim();
const phone=normPhone(b.customer_phone||b.phone||b.mobile||'');
const requestType=(b.request_type||b.topic||'support').toString().toLowerCase();
const route=requestType.includes('sale')||requestType.includes('demo')||requestType.includes('book')?'sales':'support';
const message=(b.message||b.notes||b.description||'Customer requested a callback').toString().trim();
if(!phone)throw new Error('customer_phone is required');
const voiceGender=(b.voice_gender||b.voiceGender||'female').toString().toLowerCase();
var twilioLang={hi:'hi-IN',en:'en-IN',mr:'mr-IN',ta:'ta-IN'};
function normLang(raw){var s=(raw||'').toString().trim().toLowerCase();if(twilioLang[s])return s;var a={hindi:'hi',english:'en',marathi:'mr',tamil:'ta'};if(a[s])return a[s];if(/[\\u0B80-\\u0BFF]/.test(s))return'ta';if(/[\\u0900-\\u097F]/.test(s))return'hi';return'en';}
const userLanguage=normLang(b.language||b.user_language||b.userLanguage||'');
const gatherLanguage=twilioLang[userLanguage]||'en-IN';
function enc(v){var s=(v||'').toString(),o='';for(var i=0;i<s.length;i++){var c=s.charAt(i);if(/[a-zA-Z0-9-_.~]/.test(c))o+=c;else{var h=s.charCodeAt(i).toString(16).toUpperCase();o+='%'+(h.length<2?'0':'')+h;}}return o;}
const qs='formName='+enc(name||'Customer')+'&formEmail='+enc(email)+'&formMsg='+enc(message)+'&formRoute='+enc(route)+'&formLang='+enc(userLanguage);
const callbackUrl='https://autonxt.app.n8n.cloud/webhook/autonxt-tractor-call?'+qs;
return[{json:{customerName:name,customerEmail:email,customerPhone:phone,requestType,route,message,voiceGender,userLanguage,gatherLanguage,callbackUrl,formId:'FF-'+Date.now().toString(36).toUpperCase(),submittedAt:new Date().toISOString()}}];`;

const BUILD_VAPI = `const f=$('Parse Form Submission').first().json;
const VAPI_PHONE_NUMBER_ID='REPLACE_VAPI_PHONE_NUMBER_ID';
const VAPI_ASSISTANT_ID='REPLACE_VAPI_ASSISTANT_ID';
if(!VAPI_PHONE_NUMBER_ID||VAPI_PHONE_NUMBER_ID.indexOf('REPLACE')>=0)throw new Error('Set VAPI_PHONE_NUMBER_ID in Build Vapi Call Payload node');
if(!VAPI_ASSISTANT_ID||VAPI_ASSISTANT_ID.indexOf('REPLACE')>=0)throw new Error('Set VAPI_ASSISTANT_ID in Build Vapi Call Payload node');
const lang=(f.userLanguage||'hi').toString();
const voiceGender=(f.voiceGender||'female').toString().toLowerCase();
const femaleVoice={provider:'11labs',voiceId:'EXAVITQu4vr4xnSDxMaL'};
const voiceOverride=voiceGender!=='male'?femaleVoice:undefined;
const firstMsg=lang==='en'?'Hello '+f.customerName+'. Thank you for contacting AutonXT India. How may I help you with your tractor today?':'Namaste '+f.customerName+' ji. AutonXT electric tractor support mein aapka swagat hai. Main aapki kaise madad kar sakti hoon?';
const overrides={firstMessage:firstMsg,variableValues:{customerName:f.customerName,route:f.route,language:lang,message:f.message,voiceGender}};
if(voiceOverride)overrides.voice=voiceOverride;
return[{json:{vapiBody:{phoneNumberId:VAPI_PHONE_NUMBER_ID,customer:{number:f.customerPhone,name:f.customerName||'Customer'},assistantId:VAPI_ASSISTANT_ID,assistantOverrides:overrides,metadata:{formId:f.formId,route:f.route,language:lang,voiceGender,source:'form_callback'}},customerPhone:f.customerPhone,formId:f.formId,route:f.route}}];`;

const r = await fetch(`${BASE}/workflows/${WORKFLOW_ID}`, {
  headers: { "X-N8N-API-KEY": KEY },
});
if (!r.ok) {
  console.error(await r.text());
  process.exit(1);
}
const wf = await r.json();

for (const n of wf.nodes) {
  if (n.name === "Parse Form Submission") {
    n.parameters.jsCode = PARSE_FORM;
    n.parameters.mode = "runOnceForAllItems";
  }
  if (n.name === "Build Vapi Call Payload") {
    const existing = n.parameters.jsCode || "";
    const keepPhone = existing.match(/VAPI_PHONE_NUMBER_ID='([^']+)'/);
    const keepAsst = existing.match(/VAPI_ASSISTANT_ID='([^']+)'/);
    let code = BUILD_VAPI;
    if (keepPhone && !keepPhone[1].includes("REPLACE")) {
      code = code.replace("REPLACE_VAPI_PHONE_NUMBER_ID", keepPhone[1]);
    }
    if (keepAsst && !keepAsst[1].includes("REPLACE")) {
      code = code.replace("REPLACE_VAPI_ASSISTANT_ID", keepAsst[1]);
    }
    n.parameters.jsCode = code;
    n.parameters.mode = "runOnceForAllItems";
  }
}

const r2 = await fetch(`${BASE}/workflows/${WORKFLOW_ID}`, {
  method: "PUT",
  headers: { "X-N8N-API-KEY": KEY, "Content-Type": "application/json" },
  body: JSON.stringify({
    name: wf.name,
    nodes: wf.nodes,
    connections: wf.connections,
    settings: wf.settings || { executionOrder: "v1" },
  }),
});

console.log(r2.ok ? "Patched n8n: international phone + female voice" : await r2.text());
