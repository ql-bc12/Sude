import { motion } from 'framer-motion';
import {
  Globe,
  Brain,
  MessageSquare,
  CalendarCheck,
  Mail,
  Filter,
  Zap,
  ArrowLeft,
} from 'lucide-react';

type Node = {
  icon: typeof Globe;
  label: string;
  sublabel: string;
};

const workflows: {
  title: string;
  description: string;
  nodes: Node[];
  tag: string;
}[] = [
  {
    title: 'محرك تأهيل العملاء',
    description: 'يتم تأهيل زوار الموقع تلقائياً بالذكاء الاصطناعي وتوجيههم لفريقك في الوقت الفعلي.',
    tag: 'أتمتة المبيعات',
    nodes: [
      { icon: Globe, label: 'زائر الموقع', sublabel: 'زيارات صفحة الهبوط' },
      { icon: Brain, label: 'تأهيل بالذكاء الاصطناعي', sublabel: 'تقييم وتوجيه ذكي' },
      { icon: MessageSquare, label: 'تنبيه واتساب', sublabel: 'إشعار فوري' },
      { icon: CalendarCheck, label: 'حجز تلقائي', sublabel: 'موعد مجدول' },
    ],
  },
  {
    title: 'خط أنابيب الدعم',
    description: 'الاستفسارات الواردة يتم فرزها والإجابة عليها بالذكاء الاصطناعي، مع التصعيد عند الحاجة للخبرة البشرية.',
    tag: 'أتمتة الدعم',
    nodes: [
      { icon: Mail, label: 'بريد / نموذج', sublabel: 'استفسار العميل' },
      { icon: Filter, label: 'فرز ذكي', sublabel: 'تصنيف وأولوية' },
      { icon: Brain, label: 'رد آلي', sublabel: 'إجابة فورية' },
      { icon: Zap, label: 'تصعيد', sublabel: 'تحويل بشري' },
    ],
  },
  {
    title: 'حلقة المحتوى والتسويق',
    description: 'الذكاء الاصطناعي يولّد المحتوى وينشره، يلتقط العملاء، ويرعاهم تلقائياً.',
    tag: 'أتمتة التسويق',
    nodes: [
      { icon: Brain, label: 'محتوى ذكي', sublabel: 'مقالات ومنشورات' },
      { icon: Globe, label: 'نشر تلقائي', sublabel: 'الموقع والتواصل' },
      { icon: Filter, label: 'التقاط العملاء', sublabel: 'تسجيل النماذج' },
      { icon: Mail, label: 'حملة متدرجة', sublabel: 'متابعة آلية' },
    ],
  },
];

export default function AutomationShowcase() {
  return (
    <section id="workflows" className="relative py-24 px-6 lg:px-8 overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-stride-primary/10 rounded-full blur-[150px] -translate-y-1/2" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-stride-primary uppercase tracking-wider">
            نماذج الأتمتة والذكاء الاصطناعي
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            شاهد أعمالك <span className="text-gradient-orange">تدير نفسها</span>
          </h2>
          <p className="text-stride-text-muted max-w-2xl mx-auto">
            عقد سير العمل توضح كيف يربط الذكاء الاصطناعي كل خطوة — من الزائر إلى
            التحويل — مع محاكاة تدفق البيانات المباشر.
          </p>
        </motion.div>

        <div className="space-y-6">
          {workflows.map((wf, wfIdx) => (
            <motion.div
              key={wf.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: wfIdx * 0.1 }}
              className="glass-card rounded-2xl p-6 md:p-8"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 rounded-full bg-stride-primary/10 border border-stride-primary/30 text-xs font-medium text-stride-primary">
                      {wf.tag}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{wf.title}</h3>
                  <p className="text-stride-text-muted mt-1">{wf.description}</p>
                </div>
              </div>

              {/* Workflow nodes */}
              <div className="relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {wf.nodes.map((node, i) => {
                    const Icon = node.icon;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.15 }}
                        className="relative"
                      >
                        {/* Connection line */}
                        {i < wf.nodes.length - 1 && (
                          <div className="hidden lg:block absolute top-1/2 -left-4 w-8 h-px z-0">
                            <svg className="w-full h-2 overflow-visible" viewBox="0 0 32 8">
                              <line
                                x1="0"
                                y1="4"
                                x2="32"
                                y2="4"
                                stroke="#FF5528"
                                strokeWidth="2"
                                strokeDasharray="4 4"
                                className="animate-flow"
                                opacity="0.5"
                              />
                              <motion.circle
                                r="2"
                                fill="#FF7338"
                                initial={{ cx: 32 }}
                                animate={{ cx: [32, 0] }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  delay: i * 0.3,
                                  ease: 'linear',
                                }}
                                cy="4"
                              />
                            </svg>
                          </div>
                        )}

                        <div className="glass-card-hover rounded-xl p-4 h-full">
                          <div className="flex items-center gap-3 mb-2 flex-row-reverse justify-end">
                            <span className="text-xs text-stride-text-muted font-mono">
                              خطوة {i + 1}
                            </span>
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-stride-primary/20 to-stride-glow/10 border border-stride-primary/30 flex items-center justify-center">
                              <Icon className="w-5 h-5 text-stride-primary" />
                            </div>
                          </div>
                          <h4 className="font-semibold text-white text-sm text-right">{node.label}</h4>
                          <p className="text-xs text-stride-text-muted mt-0.5 text-right">
                            {node.sublabel}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-stride-primary font-semibold hover:gap-3 transition-all"
          >
            ابنِ سير عملك المخصص
            <ArrowLeft className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
