import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Mail,
  Building2,
  ShoppingCart,
  Bot,
  Megaphone,
  Database,
  Globe,
  DollarSign,
  Calendar,
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

type Step = 0 | 1 | 2 | 3;

const projectTypes = [
  { id: 'متجر إلكتروني', icon: ShoppingCart },
  { id: 'روبوت محادثة ذكي', icon: Bot },
  { id: 'أتمتة توليد العملاء', icon: Megaphone },
  { id: 'أتمتة إدارة العملاء', icon: Database },
  { id: 'صفحة هبوط', icon: Globe },
  { id: 'أخرى / لست متأكداً', icon: Building2 },
];

const budgetRanges = ['أقل من $500', '$500 - $1,500', '$1,500 - $5,000', '$5,000 فأكثر'];
const timelines = ['عاجل (1-3 أيام)', 'أسبوع واحد', '2-4 أسابيع', 'مرن'];

const featureOptions = [
  { id: 'website', label: 'موقع' },
  { id: 'chatbot', label: 'روبوت محادثة' },
  { id: 'leadgen', label: 'توليد عملاء' },
  { id: 'crm', label: 'أتمتة CRM' },
  { id: 'landing', label: 'صفحة هبوط' },
  { id: 'email', label: 'أتمتة بريد' },
  { id: 'booking', label: 'حجز مواعيد' },
];

export default function LeadForm() {
  const [step, setStep] = useState<Step>(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [projectType, setProjectType] = useState('');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [requirements, setRequirements] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(new Set());

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const canProceed = (): boolean => {
    if (step === 0) return name.trim().length > 0 && email.trim().length > 0;
    if (step === 1) return projectType.length > 0;
    if (step === 2) return budget.length > 0 && timeline.length > 0;
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);

    try {
      const { error: insertError } = await supabase.from('leads').insert({
        name,
        email,
        company: company || null,
        project_type: projectType,
        budget_range: budget,
        timeline,
        requirements: requirements || null,
        selected_features: selectedFeatures.size > 0 ? [...selectedFeatures] : null,
      });

      if (insertError) throw insertError;
      setSubmitted(true);
    } catch {
      setError('حدث خطأ أثناء إرسال طلبك. يرجى المحاولة مرة أخرى.');
    } finally {
      setSubmitting(false);
    }
  };

  const steps = ['التواصل', 'المشروع', 'الميزانية', 'المراجعة'];

  return (
    <section id="contact" className="relative py-24 px-6 lg:px-8 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-stride-primary/10 rounded-full blur-[150px]" />

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold text-stride-primary uppercase tracking-wider">
            ابدأ البناء
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            لنبنِ <span className="text-gradient-orange">مشروعك القادم</span>
          </h2>
          <p className="text-stride-text-muted max-w-2xl mx-auto">
            أخبرنا عن مشروعك وسنعاود التواصل معك خلال 24 ساعة بخطة عمل.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-2xl p-12 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-stride-primary to-stride-glow flex items-center justify-center mx-auto mb-6 shadow-lg shadow-stride-primary/30">
              <Check className="w-10 h-10 text-white" strokeWidth={3} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">تم استلام طلبك!</h3>
            <p className="text-stride-text-muted max-w-md mx-auto">
              شكراً لك يا {name.split(' ')[0]}! لقد استلمنا تفاصيل مشروعك وسنتواصل معك
              على <span className="text-stride-primary">{email}</span> خلال 24 ساعة.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setStep(0);
                setName('');
                setEmail('');
                setCompany('');
                setProjectType('');
                setBudget('');
                setTimeline('');
                setRequirements('');
                setSelectedFeatures(new Set());
              }}
              className="glass-card-hover mt-8 px-6 py-3 rounded-full text-sm font-semibold text-white"
            >
              إرسال طلب آخر
            </button>
          </motion.div>
        ) : (
          <div className="glass-card rounded-2xl p-6 md:p-8">
            {/* Progress bar */}
            <div className="flex items-center justify-between mb-8">
              {steps.map((label, i) => (
                <div key={label} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        i <= step
                          ? 'bg-gradient-to-br from-stride-primary to-stride-glow text-white shadow-lg shadow-stride-primary/30'
                          : 'bg-stride-border/50 text-stride-text-muted'
                      }`}
                    >
                      {i < step ? <Check className="w-4 h-4" strokeWidth={3} /> : i + 1}
                    </div>
                    <span
                      className={`text-xs mt-1.5 hidden sm:block ${
                        i <= step ? 'text-white' : 'text-stride-text-muted'
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className={`h-0.5 flex-1 mx-2 transition-colors duration-300 ${
                        i < step ? 'bg-stride-primary' : 'bg-stride-border'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {/* Step 0: Contact */}
              {step === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">الاسم الكامل</label>
                    <div className="relative">
                      <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stride-text-muted" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="محمد أحمد"
                        className="w-full pr-12 pl-4 py-3.5 rounded-xl bg-stride-dark/60 border border-stride-border text-white placeholder:text-stride-text-muted/50 focus:outline-none focus:border-stride-primary/50 focus:ring-2 focus:ring-stride-primary/20 transition-all text-right"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">البريد الإلكتروني</label>
                    <div className="relative">
                      <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stride-text-muted" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="mohamed@company.com"
                        className="w-full pr-12 pl-4 py-3.5 rounded-xl bg-stride-dark/60 border border-stride-border text-white placeholder:text-stride-text-muted/50 focus:outline-none focus:border-stride-primary/50 focus:ring-2 focus:ring-stride-primary/20 transition-all text-right"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">
                      الشركة <span className="text-stride-text-muted">(اختياري)</span>
                    </label>
                    <div className="relative">
                      <Building2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stride-text-muted" />
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="شركة الأفق"
                        className="w-full pr-12 pl-4 py-3.5 rounded-xl bg-stride-dark/60 border border-stride-border text-white placeholder:text-stride-text-muted/50 focus:outline-none focus:border-stride-primary/50 focus:ring-2 focus:ring-stride-primary/20 transition-all text-right"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 1: Project Type */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  <div>
                    <label className="text-sm font-medium text-white mb-3 block">
                      ماذا تحتاج؟
                    </label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {projectTypes.map((pt) => {
                        const Icon = pt.icon;
                        const isSelected = projectType === pt.id;
                        return (
                          <button
                            key={pt.id}
                            onClick={() => setProjectType(pt.id)}
                            className={`flex items-center gap-3 p-4 rounded-xl text-right transition-all ${
                              isSelected
                                ? 'glass-card border-stride-primary/50 shadow-lg shadow-stride-primary/10'
                                : 'glass-card-hover'
                            }`}
                          >
                            <div
                              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                                isSelected
                                  ? 'bg-gradient-to-br from-stride-primary to-stride-glow'
                                  : 'bg-stride-border/50'
                              }`}
                            >
                              <Icon
                                className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-stride-text-muted'}`}
                              />
                            </div>
                            <span className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-stride-text-muted'}`}>
                              {pt.id}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">
                      ميزات محددة <span className="text-stride-text-muted">(اختياري)</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {featureOptions.map((f) => {
                        const isSelected = selectedFeatures.has(f.id);
                        return (
                          <button
                            key={f.id}
                            onClick={() => toggleFeature(f.id)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                              isSelected
                                ? 'bg-stride-primary/20 border border-stride-primary/50 text-white'
                                : 'glass-card-hover text-stride-text-muted'
                            }`}
                          >
                            {f.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Budget & Timeline */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  <div>
                    <label className="text-sm font-medium text-white mb-3 block">نطاق الميزانية</label>
                    <div className="grid grid-cols-2 gap-3">
                      {budgetRanges.map((b) => {
                        const isSelected = budget === b;
                        return (
                          <button
                            key={b}
                            onClick={() => setBudget(b)}
                            className={`flex items-center gap-2 p-4 rounded-xl text-sm font-medium transition-all ${
                              isSelected
                                ? 'glass-card border-stride-primary/50 text-white'
                                : 'glass-card-hover text-stride-text-muted'
                            }`}
                          >
                            <DollarSign
                              className={`w-4 h-4 ${isSelected ? 'text-stride-primary' : 'text-stride-text-muted'}`}
                            />
                            {b}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-white mb-3 block">الجدول الزمني</label>
                    <div className="grid grid-cols-2 gap-3">
                      {timelines.map((t) => {
                        const isSelected = timeline === t;
                        return (
                          <button
                            key={t}
                            onClick={() => setTimeline(t)}
                            className={`flex items-center gap-2 p-4 rounded-xl text-sm font-medium transition-all ${
                              isSelected
                                ? 'glass-card border-stride-primary/50 text-white'
                                : 'glass-card-hover text-stride-text-muted'
                            }`}
                          >
                            <Calendar
                              className={`w-4 h-4 ${isSelected ? 'text-stride-primary' : 'text-stride-text-muted'}`}
                            />
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  <div className="space-y-3">
                    {[
                      { label: 'الاسم', value: name },
                      { label: 'البريد', value: email },
                      { label: 'الشركة', value: company || '—' },
                      { label: 'نوع المشروع', value: projectType },
                      { label: 'الميزانية', value: budget },
                      { label: 'الجدول الزمني', value: timeline },
                      {
                        label: 'الميزات',
                        value:
                          selectedFeatures.size > 0
                            ? [...selectedFeatures].map((f) => featureOptions.find((fo) => fo.id === f)?.label).join('، ')
                            : 'لا يوجد',
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-start justify-between gap-4 py-2 border-b border-stride-border/50"
                      >
                        <span className="text-sm font-medium text-white text-left">
                          {item.value}
                        </span>
                        <span className="text-sm text-stride-text-muted shrink-0">{item.label}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">
                      متطلبات إضافية <span className="text-stride-text-muted">(اختياري)</span>
                    </label>
                    <textarea
                      value={requirements}
                      onChange={(e) => setRequirements(e.target.value)}
                      rows={3}
                      placeholder="أخبرنا أي شيء آخر عن مشروعك..."
                      className="w-full px-4 py-3.5 rounded-xl bg-stride-dark/60 border border-stride-border text-white placeholder:text-stride-text-muted/50 focus:outline-none focus:border-stride-primary/50 focus:ring-2 focus:ring-stride-primary/20 transition-all resize-none text-right"
                    />
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-400">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {error}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1) as Step)}
                disabled={step === 0}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all ${
                  step === 0
                    ? 'opacity-30 cursor-not-allowed text-stride-text-muted'
                    : 'glass-card-hover text-white'
                }`}
              >
                <ArrowRight className="w-4 h-4" />
                السابق
              </button>

              {step < 3 ? (
                <button
                  onClick={() => setStep((s) => Math.min(3, s + 1) as Step)}
                  disabled={!canProceed()}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                    canProceed()
                      ? 'glow-button text-white'
                      : 'opacity-40 cursor-not-allowed glass-card text-stride-text-muted'
                  }`}
                >
                  التالي
                  <ArrowLeft className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="glow-button flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      جاري الإرسال...
                    </>
                  ) : (
                    <>
                      أرسل الطلب
                      <ArrowLeft className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
