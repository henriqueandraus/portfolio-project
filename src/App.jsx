import useFadeUp from './hooks/useFadeUp'
import Header from './components/Header'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'

export default function App() {
  useFadeUp()

  return (
    <>
      <Header />
      <main>
        <About />
        <Skills />
        <Projects />
      </main>
    </>
  )
}
