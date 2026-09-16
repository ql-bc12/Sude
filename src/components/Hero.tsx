import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 md:py-28 pt-32">
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 radial-glow" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-stride-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-stride-glow/10 rounded-full blur-[100px] animate-pulse-slow" />

      {/* Floating orbs */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-32 right-10 w-24 h-24 rounded-full border border-stride-primary/20 bg-stride-primary/5 backdrop-blur-sm"
      />
      <motion.div
        animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-40 left-10 w-32 h-32 rounded-full border border-stride-glow/20 bg-stride-glow/5 backdrop-blur-sm"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
        >
          <Sparkles className="w-4 h-4 text-stride-primary" />
          <span className="text-sm font-medium text-stride-text-muted">
            استوديو مواقع وأتمتة بالذكاء الاصطناعي
          </span>
        </motion.div>

        <div className="relative">
          <div className="absolute inset-0 -z-10 bg-radial from-[#FF5528]/15 via-transparent to-transparent blur-2xl scale-150" />
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.3] mb-8 text-white"
          >
            ابنِ مواقع فاخرة وأتمتة ذكية
            <br />
            <span className="text-[#FF5528]">بقيمة 10,000 دولار</span>
            <br />
            <span className="text-gradient">بتكلفة اقتصادية</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl text-[#D1C7C2] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          نستخدم أحدث تقنيات الذكاء الاصطناعي لتطوير مواقع فائقة السرعة وأتمتة خطوط
          العمل لشركتك بأعلى جودة وأقل تكلفة.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="bg-[#FF5528] text-white px-8 py-3.5 rounded-xl font-medium shadow-lg shadow-[#FF5528]/20 hover:scale-105 transition-all inline-flex items-center gap-2 group"
          >
            ابدأ الآن
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </a>
          <a
            href="#workflows"
            className="border border-[#2E1E17] bg-[#18100C]/60 text-gray-200 px-8 py-3.5 rounded-xl font-medium backdrop-blur-sm hover:border-stride-primary/30 transition-all inline-flex items-center gap-2"
          >
            <Play className="w-4 h-4 text-stride-primary" fill="currentColor" />
            استكشف سيناريوهات الأتمتة
          </a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 flex flex-wrap items-center justify-center gap-4 md:gap-6"
        >
          {[
            { value: '+50', label: 'مشروع منجز' },
            { value: '70%', label: 'تخفيض التكلفة' },
            { value: '48 ساعة', label: 'متوسط التسليم' },
            { value: '99.9%', label: 'وقت التشغيل' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-[#18100C]/80 border border-[#2E1E17] rounded-2xl p-5 backdrop-blur-md hover:border-[#FF5528]/40 transition-all shadow-lg text-center min-w-[130px]"
            >
              <div className="text-3xl font-bold text-[#FF5528]">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-stride-dark to-transparent pointer-events-none" />
    </section>
  );
}
