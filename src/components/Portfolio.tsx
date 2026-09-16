import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Eye } from 'lucide-react';

type Project = {
  id: number;
  title: string;
  category: string;
  image: string;
  tags: string[];
};

const categories = ['الكل', 'متاجر إلكترونية', 'برمجيات', 'أتمتة ذكية', 'صفحات هبوط'];

const projects: Project[] = [
  {
    id: 1,
    title: 'نوفا كوميرس',
    category: 'متاجر إلكترونية',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['React', 'Stripe', 'Supabase'],
  },
  {
    id: 2,
    title: 'لوحة تحكم FlowAI',
    category: 'برمجيات',
    image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['ذكاء اصطناعي', 'تحليلات', 'فوري'],
  },
  {
    id: 3,
    title: 'محرك عملاء Pulse',
    category: 'أتمتة ذكية',
    image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['N8N', 'واتساب', 'تقويم'],
  },
  {
    id: 4,
    title: 'متجر Zenith',
    category: 'متاجر إلكترونية',
    image: 'https://images.pexels.com/photos/264547/pexels-photo-264547.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Shopify', 'واجهة مخصصة'],
  },
  {
    id: 5,
    title: 'Orbit SaaS',
    category: 'برمجيات',
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['متعدد المستخدمين', 'فوترة'],
  },
  {
    id: 6,
    title: 'صفحة Apex',
    category: 'صفحات هبوط',
    image: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['ثلاثي الأبعاد', 'حركات'],
  },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('الكل');

  const filtered =
    activeCategory === 'الكل'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="showcase" className="relative py-24 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold text-stride-primary uppercase tracking-wider">
            معرض الأعمال
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            أعمال <span className="text-gradient-orange">تتحدث عن نفسها</span>
          </h2>
          <p className="text-stride-text-muted max-w-2xl mx-auto">
            مجموعة منتقاة من تصاميم الويب الحديثة وأنظمة أتمتة الذكاء الاصطناعي التي بنيناها.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-stride-primary to-stride-glow text-white shadow-lg shadow-stride-primary/30'
                  : 'glass-card-hover text-stride-text-muted hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative rounded-2xl overflow-hidden glass-card-hover"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stride-dark via-stride-dark/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-3">
                      <div className="w-11 h-11 rounded-full glass-card flex items-center justify-center hover:bg-stride-primary/20 transition-colors">
                        <Eye className="w-5 h-5 text-white" />
                      </div>
                      <div className="w-11 h-11 rounded-full glass-card flex items-center justify-center hover:bg-stride-primary/20 transition-colors">
                        <ExternalLink className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-stride-dark/80 backdrop-blur-sm border border-stride-border text-xs font-medium text-stride-primary">
                    {project.category}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-stride-primary transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-stride-border/40 text-xs text-stride-text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
