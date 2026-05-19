import { motion } from "framer-motion";
import { Link } from "wouter";
import { FileText, ArrowLeft } from "lucide-react";

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: `By accessing or using the AutoNxt website (autonxt.in) and any associated services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, you must not use our website or services. These terms apply to all visitors, users, and customers of AutoNxt Automation Pvt. Ltd.`,
  },
  {
    title: "2. About AutoNxt",
    body: `AutoNxt Automation Pvt. Ltd. is a company incorporated under the Companies Act, 2013, with its registered office at:\n\n704 & 705, Amfotech IT Park, Rd 8, Wagle Estate Rd,\nPadwal Nagar, Thane West, Thane, Maharashtra 400604\nCIN: [U29301MH2016PTC XXXXXX]\nGSTIN: [27XXXXX]`,
  },
  {
    title: "3. Use of the Website",
    body: `You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others. You must not:
• Use the site in any way that violates applicable local, national, or international law or regulation.
• Transmit unsolicited promotional material or spam.
• Attempt to gain unauthorised access to any part of the website or its related systems.
• Reproduce, duplicate, copy, or re-sell any part of this website without our express written consent.

AutoNxt reserves the right to suspend or restrict access to the website for any user who violates these conditions.`,
  },
  {
    title: "4. Product Information and Pricing",
    body: `All product specifications, performance figures, and pricing shown on this website are indicative and subject to change without notice. Final pricing, delivery timelines, and warranty terms will be confirmed in writing at the time of order. AutoNxt reserves the right to withdraw or modify any product, offer, or specification at any time.`,
  },
  {
    title: "5. Demo Bookings and Enquiries",
    body: `Submitting a demo booking or product enquiry through this website does not constitute a binding contract or purchase order. All bookings are subject to availability and confirmation by an AutoNxt representative. AutoNxt reserves the right to decline any booking request at its discretion.`,
  },
  {
    title: "6. Intellectual Property",
    body: `All content on this website — including but not limited to text, images, graphics, logos, videos, and software — is the intellectual property of AutoNxt Automation Pvt. Ltd. or its licensors, and is protected by applicable Indian and international intellectual property laws. You may not use, reproduce, or distribute any content without prior written permission from AutoNxt.`,
  },
  {
    title: "7. Disclaimers and Limitation of Liability",
    body: `This website and its content are provided "as is" without any warranties, express or implied. AutoNxt does not warrant that the website will be error-free, uninterrupted, or free of viruses or other harmful components.

To the maximum extent permitted by applicable law, AutoNxt shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of this website or our products and services.`,
  },
  {
    title: "8. Third-Party Links",
    body: `This website may contain links to external websites operated by third parties. These links are provided for convenience only. AutoNxt does not endorse, and is not responsible for, the content or practices of any linked third-party websites.`,
  },
  {
    title: "9. Governing Law and Jurisdiction",
    body: `These Terms and Conditions are governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts in Thane, Maharashtra.`,
  },
  {
    title: "10. Amendments",
    body: `AutoNxt reserves the right to modify these Terms and Conditions at any time. Updated terms will be posted on this page with a revised effective date. Continued use of the website following any changes constitutes your acceptance of the revised terms.`,
  },
  {
    title: "11. Contact",
    body: `For any questions regarding these Terms and Conditions:\n\nAutoNxt Automation Pvt. Ltd.\n704 & 705, Amfotech IT Park, Rd 8, Wagle Estate Rd,\nPadwal Nagar, Thane West, Thane, Maharashtra 400604\nPhone: +91 9067404606\nEmail: sales@autonxt.in`,
  },
];

export default function Terms() {
  return (
    <div className="w-full min-h-screen bg-background">

      {/* ── HEADER ── */}
      <section className="bg-surface-dark relative overflow-hidden pt-28 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,hsl(0,72%,40%,0.10),transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(hsl(0,0%,100%) 1px,transparent 1px),linear-gradient(90deg,hsl(0,0%,100%) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-4xl">
          <motion.div
            className="inline-flex items-center gap-2 bg-primary/15 border border-primary/25 rounded-full px-4 py-1.5 mb-6"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          >
            <FileText className="w-3.5 h-3.5 text-primary" />
            <span className="text-primary text-xs font-bold uppercase tracking-widest">Legal</span>
          </motion.div>
          <motion.h1
            className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
          >
            Terms &amp; Conditions
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
            Please read these Terms and Conditions carefully before using the AutoNxt website. By accessing this site, you acknowledge that you have read, understood, and agree to be bound by these terms.
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
