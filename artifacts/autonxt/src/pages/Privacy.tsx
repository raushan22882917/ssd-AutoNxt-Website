import { motion } from "framer-motion";
import { Link } from "wouter";
import { Shield, ArrowLeft } from "lucide-react";

const SECTIONS = [
  {
    title: "1. Information We Collect",
    body: `When you visit the AutoNxt website, submit an enquiry, or book a demo, we may collect the following information:
• Personal identification information: name, email address, phone number, and organisation name.
• Usage data: pages visited, time spent, browser type, and IP address collected automatically via analytics tools.
• Communication records: any messages, queries, or feedback you submit through our contact or booking forms.

We do not collect payment card details directly; any transactions are processed through certified payment gateways.`,
  },
  {
    title: "2. How We Use Your Information",
    body: `We use collected information for the following purposes:
• To respond to your enquiries and provide product information or quotations.
• To process demo bookings, test-drive requests, and purchase orders.
• To send relevant product updates, news, and offers — only where you have consented to receive such communications.
• To improve the functionality and content of our website through aggregated, anonymised analytics.
• To comply with legal obligations under applicable Indian law, including the Information Technology Act, 2000.`,
  },
  {
    title: "3. Data Sharing and Disclosure",
    body: `AutoNxt Automation Pvt. Ltd. does not sell, rent, or trade your personal data to third parties. We may share data in the following limited circumstances:
• With authorised service partners (e.g. CRM, email, and cloud hosting providers) who process data solely on our behalf under confidentiality agreements.
• With government authorities or regulatory bodies when required by law or court order.
• In the event of a merger, acquisition, or asset sale, in which case users will be notified prior to any transfer.`,
  },
  {
    title: "4. Data Retention",
    body: `We retain your personal data only for as long as necessary to fulfil the purpose for which it was collected, or as required by applicable law. Enquiry records are typically retained for up to 3 years. You may request deletion of your data at any time by contacting us at sales@autonxt.in.`,
  },
  {
    title: "5. Cookies and Tracking",
    body: `Our website uses cookies and similar tracking technologies to enhance your browsing experience and gather analytics data. These include:
• Essential cookies: required for the website to function correctly.
• Analytics cookies: help us understand how visitors interact with the site (e.g. Google Analytics).
• Marketing cookies: used to deliver relevant content and measure campaign effectiveness.

You may disable cookies through your browser settings at any time; however, certain site features may not function as intended.`,
  },
  {
    title: "6. Data Security",
    body: `We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. Our website uses HTTPS encryption for all data transmissions. Despite these measures, no internet transmission is completely secure, and we cannot guarantee absolute security.`,
  },
  {
    title: "7. Your Rights",
    body: `You have the right to:
• Access the personal data we hold about you.
• Request correction of inaccurate or incomplete data.
• Request deletion of your personal data, subject to legal retention obligations.
• Withdraw consent for marketing communications at any time.
• Lodge a complaint with the relevant data protection authority.

To exercise any of these rights, contact us at sales@autonxt.in or call +91 9067404606.`,
  },
  {
    title: "8. Third-Party Links",
    body: `Our website may contain links to third-party websites, including LinkedIn, YouTube, and other partner platforms. We are not responsible for the privacy practices of these sites and encourage you to review their respective privacy policies.`,
  },
  {
    title: "9. Changes to This Policy",
    body: `AutoNxt Automation Pvt. Ltd. reserves the right to update this Privacy Policy at any time. Any changes will be published on this page with an updated effective date. We encourage you to review this policy periodically.`,
  },
  {
    title: "10. Contact Us",
    body: `For any questions, concerns, or requests relating to this Privacy Policy, please contact:\n\nAutoNxt Automation Pvt. Ltd.\n704 & 705, Amfotech IT Park, Rd 8, Wagle Estate Rd,\nPadwal Nagar, Thane West, Thane, Maharashtra 400604\nPhone: +91 9067404606\nEmail: sales@autonxt.in`,
  },
];

export default function Privacy() {
  return (
    <div className="w-full min-h-screen bg-background">

      {/* ── HEADER ── */}
      <section className="bg-surface-dark relative overflow-hidden pt-28 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,hsl(214,65%,32%,0.15),transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(hsl(0,0%,100%) 1px,transparent 1px),linear-gradient(90deg,hsl(0,0%,100%) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-4xl">
          <motion.div
            className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 rounded-full px-4 py-1.5 mb-6"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          >
            <Shield className="w-3.5 h-3.5 text-accent" />
            <span className="text-accent text-xs font-bold uppercase tracking-widest">Legal</span>
          </motion.div>
          <motion.h1
            className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            className="text-white/55 text-lg"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }}
          >
            Effective date: 1 January 2025 &nbsp;·&nbsp; AutoNxt Automation Pvt. Ltd.
          </motion.p>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <motion.p
            className="text-muted-foreground leading-relaxed mb-12 text-base border-l-4 border-primary pl-5 italic"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            AutoNxt Automation Pvt. Ltd. ("AutoNxt", "we", "our", or "us") is committed to protecting the privacy of visitors to our website and users of our services. This Privacy Policy explains what data we collect, how we use it, and your rights in relation to it.
          </motion.p>
          <div className="space-y-10">
            {SECTIONS.map((s, i) => (
              <motion.div
                key={i}
                className="border-b border-border pb-10 last:border-0"
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.04 }}
              >
                <h2 className="font-display font-bold text-foreground text-xl mb-4">{s.title}</h2>
                <p className="text-muted-foreground leading-relaxed text-base whitespace-pre-line">{s.body}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
            </Link>
            <p className="text-xs text-muted-foreground">© 2025 AutoNxt Automation Pvt. Ltd. All rights reserved.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
