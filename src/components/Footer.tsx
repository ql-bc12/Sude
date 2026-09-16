import { Zap, Twitter, Linkedin, Github, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-stride-border py-16 px-6 lg:px-8">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-stride-primary/50 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-stride-primary to-stride-glow flex items-center justify-center shadow-lg shadow-stride-primary/30">
                <Zap className="w-5 h-5 text-white" fill="white" />
              </div>
              <span className="text-xl font-bold text-white">سترايد</span>
            </div>
            <p className="text-stride-text-muted max-w-sm leading-relaxed">
              نبني مواقع فاخرة وأتمتة ذكية بقيمة 10,000$ بتكلفة اقتصادية.
              مدعوم بأحدث تقنيات الذكاء الاصطناعي.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[Twitter, Linkedin, Github, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-lg glass-card-hover flex items-center justify-center text-stride-text-muted hover:text-stride-primary"
                >
                  <Icon className="w-4.5 h-4.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">الخدمات</h4>
            <ul className="space-y-2">
              {['تطوير المواقع', 'روبوتات المحادثة', 'توليد العملاء', 'أتمتة CRM', 'أتمتة البريد'].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#services"
                      className="text-sm text-stride-text-muted hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">الشركة</h4>
            <ul className="space-y-2">
              {[
                { label: 'معرض الأعمال', href: '#showcase' },
                { label: 'خطط الأسعار', href: '#pricing' },
                { label: 'أتمتة الذكاء', href: '#workflows' },
                { label: 'عرض مباشر', href: '#demo' },
                { label: 'تواصل معنا', href: '#contact' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-stride-text-muted hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-stride-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-stride-text-muted">
            2026 سترايد. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-6 text-sm text-stride-text-muted">
            <a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a>
            <a href="#" className="hover:text-white transition-colors">شروط الخدمة</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
