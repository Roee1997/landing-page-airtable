const steps = [
  {
    number: '01',
    title: 'Welcome Call',
    description: 'We meet to understand your business, goals, and current systems.',
  },
  {
    number: '02',
    title: 'Business Requirements',
    description: 'We document your full business specification and integration needs.',
  },
  {
    number: '03',
    title: 'System Setup',
    description: 'We build and configure your store, ERP connections, and automations.',
  },
  {
    number: '04',
    title: 'Training & Support',
    description: 'We train your team and remain available for ongoing guidance.',
  },
]

export default function Process() {
  return (
    <section id="process" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            A clear, structured process from first contact to full launch.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.number}>
              <div
                className="w-16 h-16 bg-[#52a9ff] text-white rounded-2xl flex items-center justify-center text-xl font-bold mb-4"
                style={{
                  animation: 'float 3s ease-in-out infinite',
                  animationDelay: `${index * 0.4}s`,
                }}
              >
                {step.number}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
