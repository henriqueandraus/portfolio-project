import profilePhoto from '../assets/images/Foto Henrique.JPG'

export default function About() {
  return (
    <section id="about" className="flex items-center justify-center gap-[100px] max-w-[1200px] mx-auto my-[80px] px-8">

      <div className="shrink-0 relative float-anim">
        <img
          className="relative block w-[460px] h-[400px] object-cover rounded-2xl border border-[#1E2235]/20 p-2 bg-white shadow-xl"
          style={{ zIndex: 1 }}
          src={profilePhoto}
          alt="Henrique Andraus"
        />
        <div
          className="absolute -bottom-5 -right-5 w-full h-full bg-[#FFCC00] rounded-2xl"
          style={{ zIndex: 0 }}
        />
      </div>

      <div className="max-w-[560px] hero-text">
        <span className="inline-block text-xs font-bold tracking-[0.2em] text-[#FFCC00] bg-[#1E2235] px-4 py-2 rounded-full mb-6 uppercase">
          Full Stack Developer
        </span>
        <h1 className="text-[50px] leading-[1.1] mb-6 text-[#1E2235] font-bold">
          Hello, I'm<br />Henrique Andraus
        </h1>
        <p className="text-lg leading-[1.8] text-[#1E2235]/75">
          I'm a passionate Full Stack Developer with experience in building web applications using JavaScript, React, Node.js, and more. I enjoy creating efficient and scalable solutions to solve complex problems.
        </p>
        <div className="flex gap-4 mt-10">
          <a
            href="#projects"
            className="inline-block px-8 py-3.5 bg-[#1E2235] text-[#F9EFE7] rounded-xl font-semibold transition-all duration-300 hover:bg-[#FFCC00] hover:text-[#1E2235] hover:shadow-lg hover:-translate-y-0.5"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="inline-block px-8 py-3.5 border-2 border-[#1E2235] text-[#1E2235] rounded-xl font-semibold transition-all duration-300 hover:bg-[#1E2235] hover:text-[#F9EFE7] hover:-translate-y-0.5"
          >
            Contact Me
          </a>
        </div>
      </div>

    </section>
  )
}
