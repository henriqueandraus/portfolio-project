import useFadeUp from './hooks/useFadeUp'
import Header from './components/Header'

export default function App() {
  useFadeUp()

  return (
    <>
      <Header />
      <main>
        <p className="p-8 text-[#1E2235]">Components coming soon...</p>
      </main>
    </>
  )
}
