export default function Contact() {
  return (
    <section id="contact" className="max-w-[700px] mx-auto my-[120px] px-8 text-center fade-up">
      <h2 className="text-[40px] font-bold text-[#1E2235] mb-4">Get In Touch</h2>
      <p className="text-lg text-[#1E2235]/65 leading-relaxed mb-10 max-w-[480px] mx-auto">
        I'm currently open to new opportunities. Whether you have a question or just want to say hi, feel free to reach out!
      </p>
      <a
        href="mailto:hpmtandraus@gmail.com"
        className="inline-block px-12 py-4 bg-[#1E2235] text-[#F9EFE7] rounded-xl text-base font-semibold transition-all duration-300 hover:bg-[#FFCC00] hover:text-[#1E2235] hover:shadow-xl hover:-translate-y-1"
      >
        Say Hello →
      </a>
    </section>
  )
}
