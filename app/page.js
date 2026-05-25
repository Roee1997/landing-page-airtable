import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Process from '@/components/Process'
import ContactForm from '@/components/ContactForm'

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />

      <Hero />
      <Services />
      <Process />
      <ContactForm />

      <footer className="py-8 bg-slate-900 text-center text-slate-400 text-sm">
        <p>© 2026 LaunchPro · E-commerce & ERP Implementation</p>
      </footer>
    </main>
  )
}
