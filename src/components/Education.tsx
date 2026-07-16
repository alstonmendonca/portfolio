import Reveal from "./Reveal";

const education = [
  {
    school: "St. Joseph Engineering College",
    degree: "B.E. Artificial Intelligence & Machine Learning",
    grade: "CGPA 9.58 / 10",
    period: "2022 → 2026",
    location: "Mangaluru, India",
    coursework:
      "Deep Learning · Mathematics for ML · Data Structures & Algorithms · DBMS · Computer Vision · Statistics & Probability",
  },
  {
    school: "GEMS Our Own Indian School",
    degree: "Senior Secondary (Class XII), CBSE Board",
    grade: "94.4%",
    period: "2013 → 2022",
    location: "Dubai, UAE",
    coursework: "",
  },
];

export default function Education() {
  return (
    <section id="education" className="section wrap">
      <div className="sec-head">
        <div className="sec-head__rule">
          <span className="sec-head__index">005 / education</span>
          <span className="sec-head__meta">2 institutions</span>
        </div>
        <h2 className="sec-title">Where I studied</h2>
      </div>

      <div className="edu-grid">
        {education.map((edu, i) => (
          <Reveal key={edu.school} className="edu-card lift" index={i}>
            <span className="edu-card__grade">{edu.grade}</span>
            <h3 className="edu-card__school">{edu.school}</h3>
            <p className="edu-card__degree">{edu.degree}</p>
            {edu.coursework && (
              <p className="edu-card__course">
                <span className="mono-label" style={{ display: "block", marginBottom: "0.35rem" }}>
                  Relevant coursework
                </span>
                {edu.coursework}
              </p>
            )}
            <div className="edu-card__meta">
              <span>{edu.period}</span>
              <span>{edu.location}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
