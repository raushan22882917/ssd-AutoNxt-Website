import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  Send,
  Loader2,
} from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 9067404606",
    href: "tel:+919067404606",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "sales@autonxt.in",
    href: "mailto:sales@autonxt.in",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "704 & 705 Amfotech IT Park, Thane, MH",
    href: "#",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon – Sat, 9 AM – 6 PM IST",
    href: "#",
  },
];

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      setTimeout(() => setSuccess(false), 4000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* HERO SECTION */}
{/* HERO SECTION */}
<section className="relative overflow-hidden bg-black pt-28 pb-20">
  
  {/* Background Effects */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(239,68,68,0.18),transparent_35%)] pointer-events-none" />

  <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(220,38,38,0.12),transparent_35%)] pointer-events-none" />

  <div
    className="absolute inset-0 opacity-[0.04] pointer-events-none"
    style={{
      backgroundImage:
        "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
      backgroundSize: "60px 60px",
    }}
  />

  <div className="container mx-auto px-4 md:px-8 relative z-10">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

      {/* LEFT CONTENT */}
      <div>
        <motion.div
          className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />

          <span className="text-red-400 text-xs font-bold uppercase tracking-widest">
            Contact Autonxt
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Let’s Build The{" "}
          <span className="text-red-500">
            Future.
          </span>
        </motion.h1>

        <motion.p
          className="text-white/65 text-lg leading-relaxed max-w-xl mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Have questions about our electric tractors or want to
          schedule a demo? Connect with the Autonxt team and
          discover the future of sustainable mobility.
        </motion.p>

        {/* STATS */}
        <motion.div
          className="flex flex-wrap gap-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {[
            {
              icon: Phone,
              label: "Support",
              value: "24/7",
            },
            {
              icon: MapPin,
              label: "Locations",
              value: "India Wide",
            },
            {
              icon: Mail,
              label: "Response",
              value: "< 24 Hrs",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4"
            >
              <div className="w-11 h-11 rounded-xl bg-red-500/10 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-red-400" />
              </div>

              <div>
                <p className="text-white/40 text-[10px] uppercase tracking-widest font-semibold">
                  {item.label}
                </p>

                <p className="text-white font-bold text-sm">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* RIGHT IMAGE GRID */}
      <motion.div
        className="relative hidden lg:block"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        <div className="grid grid-cols-3 gap-3 h-[520px]">

          {/* Large Image */}
          <div className="col-span-2 row-span-2 rounded-[30px] overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900&q=80"
              alt="Autonxt"
              className="w-full h-full object-cover hover:scale-105 transition duration-700"
            />
          </div>

          {/* Top Right */}
          <div className="rounded-[26px] overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80"
              alt="Innovation"
              className="w-full h-full object-cover hover:scale-105 transition duration-700"
            />
          </div>

          {/* Bottom Right */}
          <div className="rounded-[26px] overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=600&q=80"
              alt="Technology"
              className="w-full h-full object-cover hover:scale-105 transition duration-700"
            />
          </div>
        </div>

        {/* Floating Card */}
        <div className="absolute -bottom-8 left-10 bg-zinc-900 border border-white/10 shadow-2xl rounded-3xl px-6 py-5 backdrop-blur-xl">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-1">
            Trusted Innovation
          </p>

          <h4 className="text-white font-bold text-lg">
            India’s Next EV Revolution
          </h4>
        </div>
      </motion.div>
    </div>
  </div>
</section>

      {/* CONTACT SECTION */}
      <section className="pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* FORM */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2"
            >
              <div className="rounded-[32px] border border-gray-200 bg-white shadow-xl p-8 md:p-10">
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="text-red-600 w-6 h-6" />

                  <h2 className="text-3xl font-bold text-gray-900">
                    Send Message
                  </h2>
                </div>

                <p className="text-gray-500 mb-8 text-sm">
                  Fill out the form below and our team will contact you
                  shortly.
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputField
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />

                    <InputField
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <InputField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                  />

                  <InputField
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                  />

                  {/* MESSAGE */}
                  <div className="relative">
                    <textarea
                      name="message"
                      rows={6}
                      placeholder=" "
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="peer w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-gray-900 outline-none focus:border-red-500 focus:bg-white resize-none transition-all"
                    />

                    <label className="absolute left-5 top-4 text-gray-400 text-sm transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-red-600 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-xs bg-white px-1">
                      Your Message
                    </label>
                  </div>

                  {/* SUCCESS */}
                  {success && (
                    <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-green-700 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      Message sent successfully!
                    </div>
                  )}

                  {/* BUTTON */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 rounded-2xl bg-red-600 text-white font-semibold text-base hover:bg-red-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* RIGHT SIDE */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* CONTACT CARD */}
              <div className="rounded-[32px] border border-gray-200 bg-white shadow-xl p-7">
                <h3 className="text-2xl font-bold text-gray-900 mb-7">
                  Get In Touch
                </h3>

                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <a
                      href={item.href}
                      key={index}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-red-600" />
                      </div>

                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">
                          {item.label}
                        </p>

                        <p className="text-gray-800 font-medium leading-relaxed group-hover:text-red-600 transition-colors">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* CTA CARD */}
              <div className="rounded-[32px] bg-gradient-to-br from-red-600 to-red-700 p-8 shadow-2xl text-white">
                <p className="uppercase tracking-[3px] text-xs font-semibold mb-2 text-red-100">
                  Test Drive
                </p>

                <h3 className="text-3xl font-bold mb-3">
                  Experience Innovation
                </h3>

                <p className="text-red-100 text-sm leading-relaxed mb-6">
                  Schedule a live electric tractor demo at your nearest
                  location.
                </p>

                <button className="w-full h-12 rounded-2xl bg-white text-red-600 font-semibold hover:bg-gray-100 transition-all">
                  Book Test Drive
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* INPUT FIELD */
function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  type?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}) {
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        placeholder=" "
        value={value}
        onChange={onChange}
        required
        className="peer w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 px-5 text-gray-900 outline-none focus:border-red-500 focus:bg-white transition-all"
      />

      <label className="absolute left-5 top-4 text-gray-400 text-sm transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-red-600 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-xs bg-white px-1">
        {label}
      </label>
    </div>
  );
}