export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <section className="text-center mb-16">
        <p className="text-sm uppercase tracking-[0.3em] text-brown/60">About Kalamkari</p>
        <h1 className="font-display text-4xl sm:text-5xl text-brown mt-4">Artisan-made textiles with a mindful story.</h1>
        <p className="max-w-2xl mx-auto mt-6 text-brown/70 text-base sm:text-lg">
          We celebrate handcrafted Kalamkari sarees, dupattas, and fabrics made by skilled artisans using time-honored techniques and sustainable materials.
        </p>
      </section>

      <section id="our-story" className="mb-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px] items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brown/60 mb-3">Our story</p>
            <h2 className="font-display text-3xl text-brown mb-4">From hand-drawn motifs to the finished drape.</h2>
            <p className="text-brown/70 leading-8">
              Kalamkari is more than a fabric — it is a tradition preserved by makers who draw, stamp, and dye each piece with care. Our story began with a simple promise: to bring authentic handblock and pen-kalamkari work to modern wardrobes while supporting the artisans who keep the craft alive.
            </p>
          </div>
          <div className="rounded-3xl bg-beige shadow-soft p-8">
            <p className="text-brown/70">Each collection is rooted in the heritage of natural pigments, sustainable cotton, and slow, deliberate craftsmanship. The result is a textile that feels luxurious, looks timeless, and tells a story of people and place.</p>
          </div>
        </div>
      </section>

      <section id="artisans" className="mb-20">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-brown/60">Artisans</p>
          <h2 className="font-display text-3xl text-brown mt-4">How Kalamkari is made, step by step.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              title: "Design & drawing",
              description: "Artists sketch motifs and traditional patterns on paper, choosing designs that reflect nature, folklore, and timeless grace.",
            },
            {
              title: "Block carving",
              description: "Master carvers shape the wooden blocks that will transfer the design to fabric — each block is a small work of art.",
            },
            {
              title: "Hand printing",
              description: "The cloth is printed using natural dyes and the carved blocks, layer by layer, with precision and patience.",
            },
            {
              title: "Finishing & quality",
              description: "After printing and drying, every piece is checked, washed, and finished so it feels soft, drapes beautifully, and lasts for years.",
            },
          ].map((step) => (
            <div key={step.title} className="rounded-3xl border border-brown/10 bg-cream p-6 shadow-softer">
              <h3 className="font-semibold text-brown text-xl mb-3">{step.title}</h3>
              <p className="text-brown/70 leading-7">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="sustainability" className="mb-20">
        <div className="grid gap-8 lg:grid-cols-[360px_1fr] items-center">
          <div className="rounded-3xl bg-brown text-cream p-10 shadow-softer">
            <p className="uppercase tracking-[0.3em] text-sm text-cream/70 mb-3">Sustainability</p>
            <h2 className="font-display text-3xl">Made with respect for people and the planet.</h2>
          </div>
          <div>
            <p className="text-brown/70 leading-8 mb-6">
              We choose breathable cotton, natural dyes, and handcrafted processes that minimise waste. Every piece is designed to be worn, loved, and passed down — not discarded.
            </p>
            <ul className="space-y-4 text-brown/75">
              <li className="flex gap-3"><span className="font-semibold text-brown">•</span> Natural pigments and low-impact dyes wherever possible.</li>
              <li className="flex gap-3"><span className="font-semibold text-brown">•</span> Handwork that supports artisan incomes and local craft communities.</li>
              <li className="flex gap-3"><span className="font-semibold text-brown">•</span> Timeless design intended for slow fashion and long-term wear.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
