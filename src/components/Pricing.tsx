import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Rocket, Building2, Sparkles } from 'lucide-react';

type Plan = {
  name: string;
  icon: typeof Zap;
  tagline: string;
  oneTime: number;
  monthly: number;
  features: string[];
  featured?: boolean;
};

const plans: Plan[] = [
  {
    name: 'البداية',
    icon: Zap,
    tagline: 'حضور رقمي أساسي',
    oneTime: 499,
    monthly: 0,
    features: [
      'موقع مخصص من 1-3 صفحات',
      'تصميم متجاوب',
      'دمج نموذج التواصل',
      'إعداد تحسين محركات البحث',
      'جولة تعديلات واحدة',
      'تسليم خلال 3-5 أيام',
    ],
  },
  {
    name: 'النمو',
    icon: Rocket,
    tagline: 'موقع + أتمتة ذكية أساسية',
    oneTime: 1499,
    monthly: 49,
    features: [
      'موقع مخصص حتى 8 صفحات',
      'دمج روبوت محادثة ذكي',
      'سير عمل توليد العملاء',
      'مزامنة تلقائية مع CRM',
      'إعداد أتمتة البريد',
      '3 جولات تعديلات',
      'تسليم خلال 5-7 أيام',
      '30 يوم دعم بعد الإطلاق',
    ],
    featured: true,
  },
  {
    name: 'المؤسسات',
    icon: Building2,
    tagline: 'منظومة ذكاء اصطناعي مخصصة',
    oneTime: 4999,
    monthly: 199,
    features: [
      'صفحات وميزات غير محدودة',
      'تدريب نموذج ذكاء اصطناعي مخصص',
      'أتمتة متعددة المسارات',
      'لوحة تحليلات متقدمة',
      'مدير مشروع مخصص',
      'تعديلات غير محدودة',
      'تسليم بأولوية قصوى',
      '90 يوم دعم بعد الإطلاق',
      'جلسات استراتيجية شهرية',
    ],
  },
];

export default function Pricing() {
  const [billing, setBilling] = useState<'oneTime' | 'monthly'>('oneTime');

  return (
    <section id="pricing" className="relative py-24 px-6 lg:px-8 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-stride-primary/8 rounded-full blur-[120px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold text-stride-primary uppercase tracking-wider">
            خطط الأسعار
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            باقات مرنة <span className="text-gradient-orange">تناسب جميع الأحجام</span>
          </h2>
          <p className="text-stride-text-muted max-w-2xl mx-auto">
            أسعار شفافة لكل مرحلة. بدّل بين الدفع لمرة واحدة والاشتراك الشهري.
          </p>
        </motion.div>

        {/* Billing toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="glass-card rounded-full p-1.5 flex items-center gap-1">
            <button
              onClick={() => setBilling('oneTime')}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                billing === 'oneTime'
                  ? 'bg-gradient-to-r from-stride-primary to-stride-glow text-white shadow-lg shadow-stride-primary/30'
                  : 'text-stride-text-muted hover:text-white'
              }`}
            >
              دفع لمرة واحدة
            </button>
            <button
              onClick={() => setBilling('monthly')}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                billing === 'monthly'
                  ? 'bg-gradient-to-r from-stride-primary to-stride-glow text-white shadow-lg shadow-stride-primary/30'
                  : 'text-stride-text-muted hover:text-white'
              }`}
            >
              اشتراك شهري
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            const price = billing === 'oneTime' ? plan.oneTime : plan.monthly;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative rounded-2xl p-8 ${
                  plan.featured
                    ? 'glass-card border-stride-primary/40 shadow-2xl shadow-stride-primary/10 lg:scale-105'
                    : 'glass-card-hover'
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-stride-primary to-stride-glow text-xs font-bold text-white flex items-center gap-1.5 shadow-lg shadow-stride-primary/40">
                      <Sparkles className="w-3.5 h-3.5" />
                      الأكثر شيوعاً
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4 flex-row-reverse justify-end">
                  <div>
                    <h3 className="text-xl font-bold text-white text-right">{plan.name}</h3>
                    <p className="text-sm text-stride-text-muted text-right">{plan.tagline}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-stride-primary/20 to-stride-glow/10 border border-stride-primary/30 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-stride-primary" />
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1 flex-row-reverse justify-end">
                    <span className="text-sm text-stride-text-muted">
                      {billing === 'monthly' ? '/شهر' : ''}
                    </span>
                    <span className="text-4xl font-bold text-white">
                      ${price.toLocaleString()}
                    </span>
                  </div>
                  {billing === 'monthly' && plan.oneTime > 0 && (
                    <p className="text-xs text-stride-text-muted mt-1 text-right">
                      + ${plan.oneTime.toLocaleString()} رسوم إعداد
                    </p>
                  )}
                  {billing === 'oneTime' && plan.monthly > 0 && (
                    <p className="text-xs text-stride-text-muted mt-1 text-right">
                      أو ${plan.monthly}/شهر خطة مُدارة
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm flex-row-reverse justify-end">
                      <span className="text-stride-text-muted flex-1 text-right">{feature}</span>
                      <div className="w-5 h-5 rounded-full bg-stride-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-stride-primary" strokeWidth={3} />
                      </div>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`w-full px-6 py-3.5 rounded-full text-sm font-semibold text-center block transition-all ${
                    plan.featured
                      ? 'glow-button text-white'
                      : 'glass-card-hover text-white hover:border-stride-primary/40'
                  }`}
                >
                  اختر {plan.name}
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
