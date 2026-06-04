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
  AlertCircle,
  User,
  Calendar,
  MessageSquare,
  Tag,
  Copy,
  Check,
} from "lucide-react";
import { submitBooking } from "../api/bookings";
import { useLang } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";

export default function ContactPage() {
  const { t } = useLang();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    tractorModel: "",
    preferredDate: "",
    location: "",
  });

  const handleCopy = (text: string, index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const contactInfo = [
    {
      icon: Phone,
      label: t.bookPage.contactInfo.call,
      value: "+91 9067404606",
      href: "tel:+919067404606",
      copyable: true,
    },
    {
      icon: Mail,
      label: t.bookPage.contactInfo.email,
      value: "sales@autonxt.in",
      href: "mailto:sales@autonxt.in",
      copyable: true,
    },
    {
      icon: MapPin,
      label: t.bookPage.contactInfo.visit,
      value: t.bookPage.contactInfo.visitVal,
      href: "#",
      copyable: false,
    },
    {
      icon: Clock,
      label: t.bookPage.contactInfo.hours,
      value: t.bookPage.contactInfo.hoursVal,
      href: "#",
      copyable: false,
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Submit booking to DynamoDB
      const result = await submitBooking({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        tractorModel: formData.tractorModel,
        preferredDate: formData.preferredDate,
        location: formData.location,
      });

      if (result.success) {
        setSuccess(true);
        console.log("Booking ID:", result.bookingId);

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          tractorModel: "",
          preferredDate: "",
          location: "",
        });

        // Hide success message after 4 seconds
        setTimeout(() => setSuccess(false), 4000);
      } else {
        setError(result.error || "Failed to submit booking");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <SEO title={t.nav.bookNow} description="Book a test drive or pre-book your AutoNxt electric tractor. Join the switch to sustainable, smart agriculture today." />
      {/* CONTACT SECTION */}
      <section className="pt-[80px] pb-12 px-4 bg-white relative overflow-hidden min-h-[calc(100vh-72px)] flex items-center justify-center">
        {/* Subtle dot-matrix engineering pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* FORM */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2"
            >
              <div className="rounded-[32px] border border-gray-100 bg-slate-50/40 p-8 md:p-10 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="text-red-600 w-6 h-6 animate-pulse" />

                  <h2 className="text-3xl font-bold text-gray-900">
                    {t.bookPage.form.send}
                  </h2>
                </div>

                <p className="text-gray-500 mb-8 text-sm">
                  {t.bookPage.form.desc}
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputField
                      label={t.bookPage.form.name}
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      icon={User}
                    />

                    <InputField
                      label={t.bookPage.form.email}
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      icon={Mail}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputField
                      label={t.bookPage.form.phone}
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      icon={Phone}
                    />

                    <InputField
                      label={t.bookPage.form.location}
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      icon={MapPin}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Styled Select Dropdown for Tractor Model */}
                    <div className="relative flex items-center">
                      <Tag className="absolute left-4 text-gray-400 peer-focus:text-red-600 transition-colors pointer-events-none w-5 h-5 z-10" />
                      <select
                        name="tractorModel"
                        value={formData.tractorModel}
                        onChange={handleChange}
                        className="peer w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 pl-12 pr-10 text-gray-955 outline-none focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 transition-all appearance-none cursor-pointer text-sm"
                      >
                        <option value="" disabled hidden></option>
                        <option value="AutoNxt X45H2">AutoNxt X45H2 (45HP)</option>
                        <option value="AutoNxt X60H2">AutoNxt X60H2 (60HP)</option>
                        <option value="AutoNxt X25H2">AutoNxt X25H2 (25HP)</option>
                        <option value="General Inquiry">General Inquiry / Other</option>
                      </select>
                      
                      <div className="absolute right-4 pointer-events-none text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>

                      <label className={`absolute text-gray-400 text-sm transition-all bg-white px-1 pointer-events-none ${
                        formData.tractorModel ? "-top-2.5 text-xs text-red-600 left-5 z-10" : "left-12 top-[17px]"
                      }`}>
                        {t.bookPage.form.model}
                      </label>
                    </div>

                    <InputField
                      label={t.bookPage.form.date}
                      name="preferredDate"
                      type="date"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      icon={Calendar}
                    />
                  </div>

                  <InputField
                    label={t.bookPage.form.subject}
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    icon={MessageSquare}
                  />

                  {/* MESSAGE */}
                  <div className="relative flex items-start">
                    <MessageSquare className="absolute left-4 top-4 text-gray-400 peer-focus:text-red-600 transition-colors pointer-events-none w-5 h-5 z-10" />
                    <textarea
                      name="message"
                      rows={4}
                      placeholder=" "
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="peer w-full rounded-2xl border border-gray-200 bg-gray-50 pl-12 pr-5 py-4 text-gray-900 outline-none focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 resize-none transition-all text-sm"
                    />

                    <label className={`absolute text-gray-400 text-sm transition-all bg-white px-1 pointer-events-none ${
                      formData.message ? "-top-2.5 text-xs text-red-600 left-5 z-10" : "left-12 top-[15px]"
                    }`}>
                      {t.bookPage.form.message}
                    </label>
                  </div>

                  {/* ERROR MESSAGE */}
                  {error && (
                    <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {error}
                    </div>
                  )}

                  {/* SUCCESS MESSAGE */}
                  {success && (
                    <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-green-700 text-sm">
                      <CheckCircle className="w-4 h-4 animate-bounce" />
                      {t.bookPage.form.success}
                    </div>
                  )}

                  {/* BUTTON */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold text-base hover:from-red-700 hover:to-red-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg cursor-pointer hover:shadow-red-500/10"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {t.bookPage.form.submitting}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        {t.bookPage.form.submitBtn}
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
              <div className="rounded-[32px] border border-gray-200 bg-white shadow-xl p-8 relative overflow-hidden group hover:border-red-500/25 transition duration-300">
                {/* Subtle top indicator bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 to-red-600" />
                
                <h3 className="text-2xl font-bold text-gray-900 mb-7">
                  {t.bookPage.contactInfo.title}
                </h3>

                <div className="space-y-6">
                  {contactInfo.map((item, index) => {
                    const isCopied = copiedIndex === index;
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between group/item w-full"
                      >
                        <a
                          href={item.href}
                          onClick={(e) => {
                            if (item.href === "#") e.preventDefault();
                          }}
                          className="flex items-start gap-4 group/link flex-1 min-w-0"
                        >
                          <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center group-hover/link:bg-red-600 group-hover/link:border-red-600 transition-all duration-300 shadow-sm shrink-0">
                            <item.icon className="w-5 h-5 text-red-600 group-hover/link:text-white transition-all duration-300" />
                          </div>

                          <div className="min-w-0">
                            <p className="text-gray-400 text-xs uppercase tracking-widest mb-0.5">
                              {item.label}
                            </p>

                            <p className="text-gray-800 font-semibold leading-relaxed group-hover/link:text-red-600 transition-colors break-words text-sm">
                              {item.value}
                            </p>
                          </div>
                        </a>

                        {item.copyable && (
                          <button
                            onClick={(e) => handleCopy(item.value, index, e)}
                            className="ml-2 p-2 rounded-lg border border-gray-150 bg-gray-50 text-gray-400 hover:text-red-600 hover:bg-red-50 hover:border-red-100 transition-all duration-200 shrink-0 cursor-pointer"
                            title="Copy to clipboard"
                          >
                            {isCopied ? (
                              <Check className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
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
  required = false,
  icon: Icon,
}: {
  label: string;
  name: string;
  value: string;
  type?: string;
  required?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}) {
  return (
    <div className="relative flex items-center w-full">
      {Icon && (
        <div className="absolute left-4 text-gray-400 peer-focus:text-red-600 transition-colors pointer-events-none z-10">
          <Icon className="w-5 h-5" />
        </div>
      )}
      <input
        type={type}
        name={name}
        placeholder=" "
        value={value}
        onChange={onChange}
        required={required}
        className={`peer w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 outline-none focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 transition-all text-sm ${
          Icon ? "pl-12 pr-5" : "px-5"
        }`}
      />

      <label className={`absolute text-gray-400 text-sm transition-all bg-white px-1 pointer-events-none ${
        (type === "date" || value)
          ? "-top-2.5 text-xs text-red-600 left-5 z-10"
          : Icon
          ? "left-12 top-[17px] peer-focus:-top-2.5 peer-focus:left-5 peer-focus:text-xs peer-focus:text-red-600 peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:left-5 peer-not-placeholder-shown:text-xs z-10"
          : "left-5 top-[17px] peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-red-600 peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:text-xs z-10"
      }`}>
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
      </label>
    </div>
  );
}