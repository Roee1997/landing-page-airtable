const services = [
  {
    title: 'E-commerce Store Setup',
    description:
      'Full online store launch — product catalog, payments, shipping, and customer management, built around your business.',
  },
  {
    title: 'ERP Integration & Sync',
    description:
      'Connect your existing ERP to your online channels. Real-time inventory, order sync, and automated data flows.',
  },
  {
    title: 'Business Workflow Automation',
    description:
      'Automate repetitive processes — from order management to customer communication — so your team can focus on growth.',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">What We Do</h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            End-to-end implementation services tailored to your business needs.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="p-8 border border-slate-200 rounded-2xl hover:shadow-lg hover:border-[#52a9ff]/40 hover:scale-105 card-pulse transition-all duration-300 group"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-[#52a9ff] transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-500 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
