import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Container } from './ui/Container'
import { Badge } from './ui/Badge'
import { SafeImage } from './ui/SafeImage'
import { Clock, GraduationCap, Filter, Sparkles } from 'lucide-react'
import { formations, categoryColors } from './data/formations'

const categories = ['Tous', ...new Set(formations.map(f => f.category))]

export default function FormationsFilter() {
  const [activeCategory, setActiveCategory] = useState('Tous')

  const filtered = activeCategory === 'Tous'
    ? formations
    : formations.filter(f => f.category === activeCategory)

  return (


      <section className="py-[clamp(5rem,8vw,8rem)]! bg-[#f8f9fa]!">
        <Container>
          {/* Category Filter */}
          <div className="flex! flex-wrap! items-center! gap-2! mb-14! justify-center!">
            <Filter size={16} className="text-[#b0b0bd]! mr-1!" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4! py-2! rounded-lg! text-sm! font-medium! transition-all! duration-200! ${
                  activeCategory === cat
                    ? 'bg-[#00343b]! text-white! shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_32px_rgba(0,0,0,0.04)]!'
                    : 'bg-white! text-[#66667a]! border! border-[#d5d5dc]/60! hover:border-[#b0b0bd]! hover:text-[#434351]! hover:shadow-sm!'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="flex! flex-wrap! justify-center! gap-[clamp(1.75rem,3vw,2.5rem)]!">
            <AnimatePresence mode="popLayout">
              {filtered.map((formation, index) => {
                const colors = categoryColors[formation.category]
                return (
                  <motion.div
                    key={formation.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25, delay: index * 0.04 }}
                    className="w-full! md:basis-[calc((100%-clamp(1.75rem,3vw,2.5rem))/2)]! md:max-w-[calc((100%-clamp(1.75rem,3vw,2.5rem))/2)]! lg:basis-[calc((100%-2*clamp(1.75rem,3vw,2.5rem))/3)]! lg:max-w-[calc((100%-2*clamp(1.75rem,3vw,2.5rem))/3)]!"
                  >
                    <div className="group! bg-white! rounded-2xl! border! border-[#e5e7eb]/80! overflow-hidden! hover:shadow-[0_4px_16px_rgba(0,0,0,0.06),0_20px_60px_rgba(0,0,0,0.06)]! hover:border-[#d5d5dc]/80! transition-all! duration-300! h-full! flex! flex-col!">
                      {/* Image header with gradient overlay on hover */}
                      <div className="h-44! relative! overflow-hidden! shrink-0!">
                        <div className="absolute! inset-0! bg-gradient-to-t! from-black/40! via-transparent! to-transparent! opacity-0! group-hover:opacity-100! transition-opacity! duration-300! z-10!" />
                        <SafeImage
                          src={formation.image}
                          alt={formation.title}
                          className="w-full! h-full!"
                          fallback={
                            <div className={`w-full! h-full! bg-gradient-to-br! ${colors?.gradient || 'from-[#18181b]! to-[#3a3a45]!'} flex! items-center! justify-center!`}>
                              <div className="absolute! inset-0! opacity-[0.08]!" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)', backgroundSize: '20px 20px' }} />
                              <span className="text-white/20! font-bold! text-lg! text-center! px-4!">{formation.title.split(' ').slice(0, 2).join(' ')}</span>
                            </div>
                          }
                        />
                        {/* Category accent bar */}
                        <div className={`absolute! top-0! left-0! right-0! h-1! ${colors?.dot || 'bg-[#22c55e]!'}`} />
                        <div className="absolute! bottom-3! left-4! flex! gap-2!">
                          <Badge variant="accent">{formation.category}</Badge>
                          <Badge variant="default" className="bg-white/15! text-white/80! border-0! backdrop-blur-sm!">{formation.level}</Badge>
                        </div>
                      </div>
                      <div className="px-[clamp(1.75rem,3.5vw,2.5rem)]! py-[clamp(1.75rem,3.5vw,2.5rem)]! flex-1! flex! flex-col!">
                        <h3 className="text-[17px]! font-bold! text-[#18181b]! mb-3! group-hover:text-[#00343b]! transition-colors! duration-200! leading-snug!">{formation.title}</h3>
                        <p className="text-[#66667a]! text-sm! leading-[1.65]! mb-5! flex-1!">{formation.description}</p>
                        <div className="flex! items-center! gap-4! mb-5! pb-4! border-b! border-[#ededf0]/60! mt-auto!">
                          <span className="flex! items-center! gap-1.5! text-xs! text-[#858598]!"><Clock size={13} />{formation.duration}</span>
                          <span className="flex! items-center! gap-1.5! text-xs! text-[#858598]!"><GraduationCap size={13} />{formation.level}</span>
                        </div>
                        <div className="flex! flex-wrap! gap-1.5!">
                          {formation.features.map((feature) => (
                            <span key={feature} className="text-[11px]! px-2.5! py-1! rounded-md! bg-[#f7f7f8]/80! text-[#515163]! font-medium!">{feature}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center! py-20!">
              <Sparkles size={40} className="mx-auto! text-[#b0b0bd]! mb-4!" />
              <p className="text-[#66667a]! text-lg! font-medium!">Aucune formation trouvée</p>
              <p className="text-[#858598]! text-sm! mt-1!">Essayez de sélectionner une autre catégorie.</p>
            </div>
          )}
        </Container>
      </section>
  )
}