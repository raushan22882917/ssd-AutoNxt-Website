/** Patches n8n workflow for 4 languages: hi, en, mr, ta */
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const envPath = join(process.env.HOME || "", ".cursor/.env");
for (const line of readFileSync(envPath, "utf8").split("\n")) {
  const t = line.trim();
  if (!t || t.startsWith("#")) continue;
  const i = t.indexOf("=");
  if (i < 0) continue;
  if (!process.env[t.slice(0, i).trim()]) process.env[t.slice(0, i).trim()] = t.slice(i + 1).trim();
}

const TWILIO_LANG =
  "var twilioLang={hi:'hi-IN',en:'en-IN',mr:'mr-IN',ta:'ta-IN'};var supported=['hi','en','mr','ta'];";
const NORM_LANG = `function normLang(raw){
  var s=(raw||'').toString().trim().toLowerCase();
  if(s.length===2&&twilioLang[s])return s;
  var a={hindi:'hi',english:'en',marathi:'mr',tamil:'ta',hinglish:'hi'};
  if(a[s])return a[s];
  if(/[\\u0B80-\\u0BFF]/.test(s))return'ta';
  if(/[\\u0900-\\u097F]/.test(s))return'hi';
  return'en';
}`;
const DETECT_LANG = `function detectLang(t){
  var s=(t||'').toString();
  var m=s.match(/lang:([a-z]{2})/i);
  if(m&&twilioLang[m[1].toLowerCase()])return m[1].toLowerCase();
  if(/[\\u0B80-\\u0BFF]/.test(s))return'ta';
  if(/[\\u0900-\\u097F]/.test(s))return'hi';
  return'en';
}`;

const PARSE_FORM = `const req=$('Form Submit Callback').first().json||{};const b=req.body&&typeof req.body==='object'?req.body:req;
function normPhone(p){let s=(p||'').toString().replace(/[^0-9+]/g,'');if(!s)return'';if(s.startsWith('+'))return s;if(s.length===10)return'+91'+s;if(s.length===12&&s.startsWith('91'))return'+'+s;return s.startsWith('0')?'+91'+s.slice(1):'+91'+s;}
${TWILIO_LANG}
${NORM_LANG}
const name=(b.customer_name||b.name||'').toString().trim();
const email=(b.customer_email||b.email||'').toString().trim();
const phone=normPhone(b.customer_phone||b.phone||b.mobile||'');
const message=(b.message||b.notes||b.description||'Customer requested a callback').toString().trim();
if(!phone)throw new Error('customer_phone is required');
const userLanguage=normLang(b.language||b.user_language||b.userLanguage||b.preferred_language||'');
const gatherLanguage=twilioLang[userLanguage]||'en-IN';
function enc(v){var s=(v||'').toString(),o='';for(var i=0;i<s.length;i++){var c=s.charAt(i);if(/[a-zA-Z0-9-_.~]/.test(c))o+=c;else{var h=s.charCodeAt(i).toString(16).toUpperCase();o+='%'+(h.length<2?'0':'')+h;}}return o;}
const qs='formName='+enc(name||'Customer')+'&formEmail='+enc(email)+'&formMsg='+enc(message)+'&formLang='+enc(userLanguage);
const callbackUrl='https://autonxt.app.n8n.cloud/webhook/autonxt-tractor-call?'+qs;
return[{json:{customerName:name,customerEmail:email,customerPhone:phone,message,userLanguage,gatherLanguage,callbackUrl,formId:'FF-'+Date.now().toString(36).toUpperCase(),submittedAt:new Date().toISOString()}}];`;

const BASE = process.env.N8N_BASE_URL || "https://autonxt.app.n8n.cloud/api/v1";
const KEY = process.env.N8N_API_KEY;
// "Parse Form Submission" moved to the split Call workflow (AutonXT Tractor Sales Call).
const ID = process.env.N8N_CALL_WORKFLOW_ID || "boGZF4Po9RULFLii";

const r = await fetch(`${BASE}/workflows/${ID}`, { headers: { "X-N8N-API-KEY": KEY } });
const wf = await r.json();
const node = wf.nodes.find((n) => n.name === "Parse Form Submission");
if (node) {
  node.parameters.jsCode = PARSE_FORM;
  node.parameters.mode = "runOnceForAllItems";
}
const r2 = await fetch(`${BASE}/workflows/${ID}`, {
  method: "PUT",
  headers: { "X-N8N-API-KEY": KEY, "Content-Type": "application/json" },
  body: JSON.stringify({
    name: wf.name,
    nodes: wf.nodes,
    connections: wf.connections,
    settings: { executionOrder: "v1" },
  }),
});
console.log(r2.ok ? "n8n: 4 languages (hi, en, mr, ta)" : await r2.text());
