import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Star, Sun, Coffee, ShieldCheck } from 'lucide-react';
import { soundEngine } from '../../lib/soundEngine';

interface ReasonItem {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  titleAr: string;
  titleEn: string;
  textAr: string;
  color: string;
}

const reasons: ReasonItem[] = [
  {
    id: 1,
    icon: Sun,
    titleAr: 'ضحكتك اللي بتنوّر الدنيا',
    titleEn: 'Your Radiant Smile',
    textAr: 'ابتسامتك هي أول حاجة بتخليني أنسى أي تعب أو ضغط، وبتحلي الدنيا كلها في عيني أول ما بشوفك.',
    color: '#D81B60',
  },
  {
    id: 2,
    icon: Heart,
    titleAr: 'قلبك الأبيض والحنين',
    titleEn: 'Your Gentle Heart',
    textAr: 'فيكِ رقة وطيبة حقيقية ونادرة، ودفء بيحسس أي حد جنبك بالأمان والراحة النفسية.',
    color: '#7E57C2',
  },
  {
    id: 3,
    icon: Coffee,
    titleAr: 'تفاصيلنا البسيطة والضحك سوا',
    titleEn: 'Our Little Moments',
    textAr: 'أحلى الأوقات اللي عشتها هي اللي قضيناها بنضحك على أبسط الحاجات من غير أي تكلف.',
    color: '#E64A19',
  },
  {
    id: 4,
    icon: ShieldCheck,
    titleAr: 'الأمان وراحة البال معاكِ',
    titleEn: 'My Safe Place',
    textAr: 'معاكِ بس بحس إني في بيتي، وبكون على طبيعتي من غير ما أفكر.. وجودك في حياتي سكينة.',
    color: '#0288D1',
  },
  {
    id: 5,
    icon: Star,
    titleAr: 'فخري بيكِ وبطموحك',
    titleEn: 'So Proud of You',
    textAr: 'قوتك، إصرارك، وعفويتك بيخلوني فخور بيكِ في كل خطوة بتوصلي ليها وبتمنى لك دايماً أعلى المراتب.',
    color: '#F57F17',
  },
  {
    id: 6,
    icon: Sparkles,
    titleAr: 'أعظم هدية في حياتي كلها',
    titleEn: 'My Greatest Gift',
    textAr: 'من سنة 2019 لحد النهاردة ولكل السنين اللي جاية، إنتِ أجمل حكاية عشتها واختياري الأول والأخير دايماً.',
    color: '#D81B60',
  },
];

export const ReasonsCardSection: React.FC = () => {
  const [revealedIds, setRevealedIds] = useState<number[]>([]);

  const toggleReveal = (id: number) => {
    soundEngine.playChime(600 + (id * 40));
    setRevealedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4">
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#F48FB1] shadow-sm">
          <Heart className="w-3.5 h-3.5 text-[#D81B60] fill-[#D81B60]" />
          <span className="text-xs uppercase font-sans tracking-widest text-[#D81B60] font-bold">
            Little Keepsakes
          </span>
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1A0D18]">
          Reasons You Mean the World to Me
        </h2>
        <p dir="auto" className="font-sans text-xs sm:text-sm text-[#5C354E]">
          اضغطي على الكروت عشان تكتشفي رسايل صغيرة مكتوبة ليكي من القلب ✨
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reasons.map((item) => {
          const isRevealed = revealedIds.includes(item.id);
          const Icon = item.icon;

          return (
            <motion.div
              key={item.id}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              onClick={() => toggleReveal(item.id)}
              className="relative cursor-pointer rounded-2xl p-5 bg-white border border-[#F8BBD0] shadow-[0_6px_20px_rgba(216,27,96,0.08)] hover:shadow-[0_10px_25px_rgba(216,27,96,0.16)] transition-all duration-300 text-center flex flex-col justify-between min-h-[160px]"
            >
              <div className="flex items-center justify-between w-full mb-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-sm"
                  style={{ backgroundColor: item.color }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#D81B60]">
                  #{item.id}
                </span>
              </div>

              <div>
                <h3
                  dir="auto"
                  className="font-display text-base sm:text-lg text-[#1A0D18] font-bold mb-1"
                >
                  {item.titleAr}
                </h3>
                <p className="font-sans text-[11px] text-[#5C354E] font-medium tracking-wide">
                  {item.titleEn}
                </p>
              </div>

              <AnimatePresence>
                {isRevealed ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 pt-3 border-t border-[#F8BBD0]"
                  >
                    <p
                      dir="auto"
                      className="font-sans text-xs sm:text-sm text-[#2B1525] font-medium leading-relaxed"
                    >
                      {item.textAr}
                    </p>
                  </motion.div>
                ) : (
                  <div className="mt-3 pt-2 text-center">
                    <span className="text-[11px] font-sans text-[#D81B60] font-semibold underline underline-offset-2">
                      Tap to open note 💌
                    </span>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
