import { useState } from 'react'

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="max-w-[1100px] mx-auto my-[120px] px-8 fade-up">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* Coluna esquerda — texto */}
        <div>
          <h2 className="text-[40px] font-bold text-[#1E2235] mb-4">Get In Touch</h2>
          <p className="text-lg text-[#1E2235]/65 leading-relaxed max-w-[380px]">
            I'm currently open to new opportunities. Whether you have a question or just want to say hi, feel free to reach out!
          </p>
        </div>

        {/* Coluna direita — formulário */}
        <div>
          {status === 'success' ? (
            <div className="bg-white border border-[#1E2235]/10 rounded-2xl p-10 text-center">
              <p className="text-[#1E2235] font-semibold text-lg mb-2">Mensagem enviada!</p>
              <p className="text-[#1E2235]/60 text-sm">Em breve retorno o contato.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Nome"
                required
                className="w-full bg-white border border-[#1E2235]/10 rounded-xl px-5 py-3 text-sm text-[#1E2235] placeholder-[#1E2235]/40 focus:outline-none focus:border-[#FFCC00] transition-colors duration-200"
              />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full bg-white border border-[#1E2235]/10 rounded-xl px-5 py-3 text-sm text-[#1E2235] placeholder-[#1E2235]/40 focus:outline-none focus:border-[#FFCC00] transition-colors duration-200"
              />

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Mensagem"
                required
                rows={5}
                className="w-full bg-white border border-[#1E2235]/10 rounded-xl px-5 py-3 text-sm text-[#1E2235] placeholder-[#1E2235]/40 focus:outline-none focus:border-[#FFCC00] transition-colors duration-200 resize-none"
              />

              {status === 'error' && (
                <p className="text-red-500 text-sm">Algo deu errado. Tente novamente.</p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="self-start px-10 py-4 bg-[#1E2235] text-[#F9EFE7] rounded-xl text-base font-semibold transition-all duration-300 hover:bg-[#FFCC00] hover:text-[#1E2235] hover:shadow-xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Enviando...' : 'Enviar mensagem →'}
              </button>

            </form>
          )}
        </div>

      </div>

    </section>
  )
}
