import skills from '../data/skills'

const staggerClasses = [
  'stagger-1', 'stagger-2', 'stagger-3', 'stagger-4',
  'stagger-5', 'stagger-6', 'stagger-7', 'stagger-8',
]

export default function Skills() {
  return (
    <section id="skills" className="max-w-[1100px] mx-auto my-[120px] px-8">

      <div className="text-center mb-[60px] fade-up">
        <h2 className="text-[40px] font-bold text-[#1E2235]">Skills & Technologies</h2>
        <p className="text-[#1E2235]/50 mt-3 text-base">Tools I work with every day</p>
      </div>

      <div className="grid grid-cols-4 gap-5 max-w-[960px] mx-auto">
        {skills.map((skill, i) => (
          <div
            key={skill.name}
            className={`skill-card flex flex-col items-center justify-center gap-4 bg-white border border-[#1E2235]/10 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#FFCC00] hover:shadow-xl cursor-default fade-up ${staggerClasses[i]}`}
          >
            <img
              src={skill.icon}
              alt={skill.name}
              className="skill-img w-[70px] h-[70px] object-contain"
            />
            <h3 className="text-sm font-semibold text-[#1E2235]">{skill.name}</h3>
          </div>
        ))}
      </div>

    </section>
  )
}
