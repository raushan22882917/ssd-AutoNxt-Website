import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Book() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    vehicleType: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.vehicleType) return;
    setSubmitted(true);
  };

  const contactInfo = [
    { icon: Phone, label: "Call Us", value: "+91 20 4567 8900" },
    { icon: Mail, label: "Email Us", value: "hello@autonxt.in" },
    { icon: MapPin, label: "Visit Us", value: "Hinjewadi Phase 2, Pune — 411057" },
    { icon: Clock, label: "Hours", value: "Mon–Sat, 9 AM – 6 PM IST" },
  ];

  return (
    <div className="w-full min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <motion.p
            className="text-primary font-semibold tracking-widest uppercase text-sm mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Book Now
          </motion.p>
          <motion.h1
            className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Reserve Your <span className="text-primary">Future.</span>
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Whether you're an individual buyer, fleet operator, or government partner — we're ready to build something great together.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">

          {/* Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {submitted ? (
              <motion.div
                className="bg-card border border-primary/30 rounded-3xl p-12 flex flex-col items-center text-center h-full justify-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">Request Received!</h2>
                <p className="text-muted-foreground text-lg max-w-md">
                  Thank you, <span className="text-foreground font-semibold">{form.name}</span>. Our team will reach out to you at <span className="text-primary">{form.email}</span> within 24 hours.
                </p>
                <Button
                  className="mt-8 bg-primary text-primary-foreground"
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", company: "", vehicleType: "", message: "" }); }}
                  data-testid="btn-submit-another"
                >
                  Submit Another Request
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-card border border-border rounded-3xl p-8 md:p-10 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground font-medium">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Arjun Mehta"
                      required
                      className="bg-background border-border focus:border-primary h-12"
                      data-testid="input-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground font-medium">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="arjun@company.in"
                      required
                      className="bg-background border-border focus:border-primary h-12"
                      data-testid="input-email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground font-medium">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="bg-background border-border focus:border-primary h-12"
                      data-testid="input-phone"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-foreground font-medium">Company / Organisation</Label>
                    <Input
                      id="company"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Acme Logistics Pvt. Ltd."
                      className="bg-background border-border focus:border-primary h-12"
                      data-testid="input-company"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vehicleType" className="text-foreground font-medium">Vehicle / Solution Interest *</Label>
                  <Select
                    value={form.vehicleType}
                    onValueChange={(v) => setForm({ ...form, vehicleType: v })}
                    required
                  >
                    <SelectTrigger className="bg-background border-border h-12" data-testid="select-vehicle-type">
                      <SelectValue placeholder="Select what you're interested in..." />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="sedan">Autonxt One — Premium Sedan</SelectItem>
                      <SelectItem value="suv">Autonxt X-Series — Electric SUV</SelectItem>
                      <SelectItem value="commercial">Autonxt Fleet Pro — Commercial Van</SelectItem>
                      <SelectItem value="fleet">Fleet Management Solutions</SelectItem>
                      <SelectItem value="bus">Public Transit / Electric Buses</SelectItem>
                      <SelectItem value="infra">Charging Infrastructure</SelectItem>
                      <SelectItem value="partnership">Government / B2B Partnership</SelectItem>
                      <SelectItem value="other">Other / General Inquiry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-foreground font-medium">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your requirements, fleet size, timeline, or any questions you have..."
                    className="bg-background border-border focus:border-primary min-h-[140px] resize-none"
                    data-testid="textarea-message"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-14 text-lg bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                  data-testid="btn-submit-booking"
                >
                  Submit Booking Request
                </Button>
                <p className="text-muted-foreground text-xs text-center">
                  We'll respond within 24 hours. No commitment required.
                </p>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
              <h3 className="font-display text-xl font-bold text-foreground">Get in Touch</h3>
              {contactInfo.map((info, i) => (
                <div key={i} className="flex items-start gap-4" data-testid={`contact-info-${i}`}>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <info.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide mb-1">{info.label}</p>
                    <p className="text-foreground font-medium">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8">
              <p className="text-primary font-bold text-sm uppercase tracking-widest mb-3">Test Drive Program</p>
              <p className="text-foreground font-display text-lg font-semibold mb-3">Experience it first-hand.</p>
              <p className="text-muted-foreground text-sm mb-4">
                Book a no-obligation test drive at our nearest experience center or at your location.
              </p>
              <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" data-testid="btn-test-drive">
                Schedule Test Drive
              </Button>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
