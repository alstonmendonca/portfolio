import Reveal from "./Reveal";

const skillCategories = [
  { category: "Languages", skills: ["Python", "TypeScript", "JavaScript", "Java", "SQL", "C/C++", "R"] },
  { category: "Frontend", skills: ["React.js", "Next.js", "React Native", "HTML/CSS", "Tailwind CSS"] },
  { category: "Backend", skills: ["Node.js", "Express.js", "FastAPI", "Electron.js"] },
  { category: "Databases", skills: ["PostgreSQL", "MySQL", "SQLite", "Supabase", "Redis"] },
  { category: "AI / ML", skills: ["PyTorch", "TensorFlow", "Scikit-learn", "YOLOv8", "Hugging Face", "OpenCV", "Pandas"] },
  { category: "Cloud & DevOps", skills: ["AWS", "Docker", "Git", "Expo", "CUDA", "Linux"] },
];

export default function Skills() {
  return (
    <section id="skills" className="section wrap">
      <div className="sec-head">
        <div className="sec-head__rule">
          <span className="sec-head__index">004 / toolkit</span>
          <span className="sec-head__meta">{skillCategories.length} stacks</span>
        </div>
        <h2 className="sec-title">The toolkit</h2>
      </div>

      <div className="skills-grid">
        {skillCategories.map((group, i) => (
          <Reveal key={group.category} className="skill-group" index={i}>
            <div className="skill-group__name">
              <span className="idx">{String(i + 1).padStart(2, "0")}</span>
              <h3>{group.category}</h3>
            </div>
            <div className="skill-tags">
              {group.skills.map((skill) => (
                <span key={skill} className="chip">
                  {skill}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
