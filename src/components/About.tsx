import Reveal from "./Reveal";
import Stats from "./Stats";

export default function About() {
  return (
    <section id="about" className="section wrap">
      <div className="sec-head">
        <div className="sec-head__rule">
          <span className="sec-head__index">002 / about</span>
          <span className="sec-head__meta">Dubai, UAE</span>
        </div>
        <h2 className="sec-title">
          I build things that work in the <span className="accent-mark">real world</span>.
        </h2>
      </div>

      <div className="about-grid">
        <Reveal as="p" className="about-lede">
          Full-stack foundation, machine-learning specialism, a bias toward
          shipping.
        </Reveal>

        <Reveal className="about-body" index={1}>
          <p>
            I&apos;m a Dubai-based Software Developer &amp; AI/ML Engineer with
            1.5+ years of professional experience building and deploying
            machine-learning systems. I specialize in NLP, Computer Vision, and
            LLM integration, from React/Next.js frontends to Node.js and FastAPI
            backends.
          </p>
          <p>
            I co-founded ViperCore, an offline-first POS platform running in
            production; fine-tuned BERT to near-99% accuracy in production on AWS
            SageMaker; and shipped compliance systems on YOLOv8. I like turning
            complex ideas into production software people rely on every day.
          </p>
        </Reveal>
      </div>

      <Stats />
    </section>
  );
}
