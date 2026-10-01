import React, { useState } from 'react';
import { Phone, Mail, MapPin, Navigation, Send, CheckCircle2, MessageSquare, AlertCircle, Clock } from 'lucide-react';

interface ContactSectionProps {
  initialService?: string;
}

export function ContactSection({ initialService }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: initialService || 'Digital Printing',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync if parent passes changed initialService
  React.useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  const serviceOptions = [
    'Digital Printing',
    'Flex Banner',
    'Hoarding',
    'Signage',
    'Visiting Card',
    'Letterhead',
    'Brochure',
    'Invitation',
    'Other'
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number';
    } else if (!/^[0-9+ -]{8,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please tell us what you need printed';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate instantaneous clean local dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  const generateWhatsAppFromForm = () => {
    const text = `Hello SM Graphics, I have submitted an enquiry from your website:\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email || 'N/A'}\n*Service:* ${formData.service}\n*Message:* ${formData.message}`;
    return `https://wa.me/919437390950?text=${encodeURIComponent(text)}`;
  };

  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Menrva Complex, CDA Sector-9, Cuttack, Odisha 753014'
  )}`;

  return (
    <section id="contact" className="py-20 sm:py-28 bg-slate-950 text-white relative overflow-hidden">
      {/* Background CMYK glow effects */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400">
            <span>Get In Touch</span>
            <span>·</span>
            <span>Fast Turnaround</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-heading leading-tight">
            Let's Print Something Great
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Reach out by phone, WhatsApp, or through the form below. We provide immediate cost estimates and design
            consultations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Contact Cards, Actions & Map */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Details Card */}
            <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
              <h3 className="text-lg font-bold text-white font-heading tracking-tight border-b border-slate-800 pb-3">
                Business Information
              </h3>

              <div className="space-y-4">
                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Phone</div>
                    <a
                      href="tel:9437390950"
                      className="text-base font-bold text-white hover:text-cyan-400 transition-colors font-mono"
                    >
                      9437390950
                    </a>
                    <div className="text-[11px] text-slate-500">Mon - Sat: 9:30 AM – 8:30 PM</div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Email</div>
                    <a
                      href="mailto:smgraphicscda@gmail.com"
                      className="text-base font-bold text-white hover:text-cyan-400 transition-colors break-all"
                    >
                      smgraphicscda@gmail.com
                    </a>
                    <div className="text-[11px] text-slate-500">Send files & custom artwork</div>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Address</div>
                    <div className="text-sm font-semibold text-white leading-snug">
                      Menrva Complex, CDA Sector-9,
                      <br />
                      Cuttack, Odisha – 753014
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Landmark: CDA Sector-9 Market Area</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="grid grid-cols-2 gap-2.5 pt-2">
                <a
                  href="tel:9437390950"
                  className="py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </a>

                <a
                  href="https://wa.me/919437390950?text=Hello%20SM%20Graphics%2C%20I%20would%20like%20to%20enquire%20about%20your%20printing%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Us</span>
                </a>

                <a
                  href="mailto:smgraphicscda@gmail.com"
                  className="py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-all flex items-center justify-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Email Us</span>
                </a>

                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-all flex items-center justify-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5 text-pink-400" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>

            {/* Google Maps Embed / Interactive Preview */}
            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-lg">
              <div className="p-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 font-semibold text-slate-200">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Cuttack Workshop Location
                </span>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline flex items-center gap-1 text-[11px]"
                >
                  <span>Open Maps</span>
                  <Navigation className="w-3 h-3" />
                </a>
              </div>
              <div className="relative h-56 w-full bg-slate-900">
                <iframe
                  title="SM Graphics Location Map - Menrva Complex, CDA Sector-9, Cuttack"
                  src="https://maps.google.com/maps?q=Menrva%20Complex%2C%20CDA%20Sector-9%2C%20Cuttack%2C%20Odisha%20753014&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 filter grayscale contrast-125 opacity-85"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Quote Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-9 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
              {isSuccess ? (
                <div className="py-10 text-center space-y-5 animate-in fade-in zoom-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold font-heading text-white">
                      Enquiry Received!
                    </h3>
                    <p className="text-sm text-slate-300 max-w-md mx-auto">
                      Thank you, <span className="text-white font-semibold">{formData.name}</span>. Our team at SM
                      Graphics CDA Sector-9 will review your request and contact you at{' '}
                      <span className="text-cyan-400 font-mono">{formData.phone}</span> promptly.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-left max-w-md mx-auto space-y-1.5">
                    <div className="text-slate-400 uppercase tracking-wider font-semibold text-[10px]">
                      Enquiry Summary
                    </div>
                    <div><span className="text-slate-400">Service:</span> <span className="text-white font-semibold">{formData.service}</span></div>
                    <div><span className="text-slate-400">Message:</span> <span className="text-slate-200">{formData.message}</span></div>
                  </div>

                  <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={generateWhatsAppFromForm()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto py-3 px-6 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Send Copy via WhatsApp</span>
                    </a>

                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        setFormData({
                          name: '',
                          phone: '',
                          email: '',
                          service: 'Digital Printing',
                          message: ''
                        });
                      }}
                      className="w-full sm:w-auto py-3 px-5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-all"
                    >
                      Send Another Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold font-heading text-white">
                        Send Printing Enquiry
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Fill in your requirements for a quick rate quote and timeline.
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/80">
                      Cuttack Workshop
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="text-xs font-semibold text-slate-300">
                        Full Name <span className="text-pink-400">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="e.g. Ramesh Mohanty"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border ${
                          errors.name ? 'border-pink-500 focus:ring-pink-500' : 'border-slate-700 focus:border-cyan-400 focus:ring-cyan-400'
                        } text-white text-sm focus:outline-none focus:ring-1 transition-all placeholder:text-slate-600`}
                      />
                      {errors.name && (
                        <p className="text-[11px] text-pink-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-phone" className="text-xs font-semibold text-slate-300">
                        Phone Number <span className="text-pink-400">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        placeholder="e.g. 9437390950"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border ${
                          errors.phone ? 'border-pink-500 focus:ring-pink-500' : 'border-slate-700 focus:border-cyan-400 focus:ring-cyan-400'
                        } text-white text-sm focus:outline-none focus:ring-1 transition-all placeholder:text-slate-600`}
                      />
                      {errors.phone && (
                        <p className="text-[11px] text-pink-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="text-xs font-semibold text-slate-300">
                        Email Address <span className="text-slate-500 font-normal">(Optional)</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="e.g. yourname@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border ${
                          errors.email ? 'border-pink-500 focus:ring-pink-500' : 'border-slate-700 focus:border-cyan-400 focus:ring-cyan-400'
                        } text-white text-sm focus:outline-none focus:ring-1 transition-all placeholder:text-slate-600`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-pink-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Service Required Dropdown */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-service" className="text-xs font-semibold text-slate-300">
                        Service Required <span className="text-pink-400">*</span>
                      </label>
                      <select
                        id="contact-service"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-all cursor-pointer"
                      >
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-slate-950 text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="text-xs font-semibold text-slate-300">
                      Message & Print Requirements <span className="text-pink-400">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={3}
                      placeholder="Specify dimensions (e.g., 6x3 ft flex banner), quantity (e.g., 500 visiting cards), finish requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border ${
                        errors.message ? 'border-pink-500 focus:ring-pink-500' : 'border-slate-700 focus:border-cyan-400 focus:ring-cyan-400'
                      } text-white text-sm focus:outline-none focus:ring-1 transition-all placeholder:text-slate-600 resize-none`}
                    />
                    {errors.message && (
                      <p className="text-[11px] text-pink-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 active:scale-98 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Enquiry to SM Graphics</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span>Direct phone inquiries: 9437390950</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-cyan-400" /> Fast Response
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
