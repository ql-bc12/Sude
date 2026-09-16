import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart,
  Bot,
  Megaphone,
  Database,
  Globe,
  Mail,
  Calendar,
  Check,
  Clock,
  DollarSign,
} from 'lucide-react';

type ServiceOption = {
  id: string;
  label: string;
  icon: typeof ShoppingCart;
  price: number;
  days: number;
  description: string;
};

const options: ServiceOption[] = [
  { id: 'website', label: 'متجر إلكتروني', icon: ShoppingCart, price: 1200, days: 7, description: 'واجهة متكاملة مع سلة ودفع' },
  { id: 'chatbot', label: 'روبوت محادثة ذكي', icon: Bot, price: 800, days: 5, description: 'دعم عملاء ذكي على مدار الساعة' },
  { id: 'leadgen', label: 'أتمتة توليد العملاء', icon: Megaphone, price: 600, days: 4, description: 'التقاط وتأهيل العملاء تلقائياً' },
  { id: 'crm', label: 'أتمتة إدارة العملاء', icon: Database, price: 900, days: 6, description: 'مزامنة جهات الاتصال مع نظامك' },
  { id: 'landing', label: 'صفحة هبوط', icon: Globe, price: 400, days: 3, description: 'صفحة واحدة عالية التحويل' },
  { id: 'email', label: 'أتمتة البريد', icon: Mail, price: 500, days: 3, description: 'حملات بريدية ونشرات تلقائية' },
  { id: 'booking', label: 'حجز المواعيد تلقائياً', icon: Calendar, price: 350, days: 2, description: 'جدولة مواعيد ذاتية الخدمة' },
];

export default function PriceCalculator() {
  const [selected, setSelected] = useState<Set<string>>(new Set(['website']));
  const [animateCost, setAnimateCost] = useState(0);
  const rafRef = useRef<number>(0);

  const { totalCost, totalDays } = useMemo(() => {
    let cost = 0;
    let days = 0;
    selected.forEach((id) => {
      const opt = options.find((o) => o.id === id);
      if (opt) {
        cost += opt.price;
        days = Math.max(days, opt.days);
      }
    });
    return { totalCost: cost, totalDays: days };
  }, [selected]);

  useEffect(() => {
    const start = animateCost;
    const diff = totalCost - start;
    const duration = 400;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimateCost(Math.round(start + diff * eased));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [totalCost]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section id="services" className="relative py-24 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold text-stride-primary uppercase tracking-wider">
            حاسبة تفاعلية
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            احسب تكلفة مشروعك <span className="text-gradient-orange">بشكل فوري</span>
          </h2>
          <p className="text-stride-text-muted max-w-2xl mx-auto">
            اختر الخدمات التي تحتاجها وشاهد تكلفة مشروعك ومدة التسليم تتحدث لحظياً.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Options grid */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            {options.map((opt, i) => {
              const isSelected = selected.has(opt.id);
              const Icon = opt.icon;
              return (
                <motion.button
                  key={opt.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  onClick={() => toggle(opt.id)}
                  className={`relative p-5 rounded-2xl text-right transition-all duration-300 ${
                    isSelected
                      ? 'glass-card border-stride-primary/50 shadow-lg shadow-stride-primary/10'
                      : 'glass-card-hover'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-stride-primary border-stride-primary'
                          : 'border-stride-border'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                    </div>
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-gradient-to-br from-stride-primary to-stride-glow'
                          : 'bg-stride-border/50'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-stride-text-muted'}`} />
                    </div>
                  </div>
                  <h3 className="font-semibold text-white mb-1">{opt.label}</h3>
                  <p className="text-sm text-stride-text-muted mb-3">{opt.description}</p>
                  <div className="flex items-center gap-4 text-sm flex-row-reverse justify-end">
                    <span className="text-stride-primary font-bold">${opt.price}</span>
                    <span className="text-stride-text-muted flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {opt.days} أيام
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Summary panel */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-2xl p-6 sticky top-24">
              <h3 className="text-lg font-bold text-white mb-1">ملخص المشروع</h3>
              <p className="text-sm text-stride-text-muted mb-6">
                {selected.size} {selected.size === 1 ? 'خدمة مختارة' : 'خدمات مختارة'}
              </p>

              <AnimatePresence mode="popLayout">
                {selected.size === 0 ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-stride-text-muted py-8 text-center"
                  >
                    اختر خدمات لعرض التقدير
                  </motion.p>
                ) : (
                  <motion.div className="space-y-2 mb-6">
                    <AnimatePresence>
                      {[...selected].map((id) => {
                        const opt = options.find((o) => o.id === id)!;
                        const Icon = opt.icon;
                        return (
                          <motion.div
                            key={id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center gap-3 text-sm flex-row-reverse justify-end"
                          >
                            <span className="text-white flex-1 text-right">{opt.label}</span>
                            <Icon className="w-4 h-4 text-stride-primary shrink-0" />
                            <span className="text-stride-text-muted">${opt.price}</span>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="border-t border-stride-border pt-6 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1 flex-row-reverse">
                    <span className="text-3xl font-bold text-gradient-orange">
                      ${animateCost.toLocaleString()}
                    </span>
                    <span className="text-sm text-stride-text-muted flex items-center gap-1.5">
                      <DollarSign className="w-4 h-4" />
                      التكلفة التقديرية
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1 flex-row-reverse">
                    <div className="text-2xl font-bold text-white">
                      {totalDays === 0 ? '—' : `${totalDays} أيام`}
                    </div>
                    <span className="text-sm text-stride-text-muted flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      مدة التسليم
                    </span>
                  </div>
                </div>
              </div>

              <a
                href="#contact"
                className="glow-button w-full mt-6 px-6 py-3 rounded-full text-sm font-semibold text-white text-center block"
              >
                ابدأ هذا المشروع
              </a>
              <p className="text-xs text-stride-text-muted text-center mt-3">
                السعر النهائي يؤكد بعد الاستشارة
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
