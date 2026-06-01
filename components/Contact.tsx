export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#0a0907] px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d7c39a]/36 to-transparent" />
      <div data-reveal className="mx-auto max-w-[1520px]">
        <p className="mb-8 text-[11px] uppercase tracking-cinema text-[#d7c39a]/78">Now Booking Select Productions</p>
        <div className="grid gap-10 lg:grid-cols-[1fr_0.36fr] lg:items-end">
          <h2 className="font-cinema text-[clamp(3.7rem,10.5vw,12rem)] font-semibold uppercase leading-[0.82] tracking-[-0.045em]">
            Lets shoot the frame they remember.
          </h2>

          <div>
            <p className="mb-8 text-lg font-light leading-8 text-[#f4efe5]/62">
              Available for event films, brand campaigns, music visuals, motion edits, and social-first cinematic reels.
            </p>
            <a
              href="mailto:manavdabral1234@gmail.com"
              className="inline-flex w-full items-center justify-center border border-[#d7c39a] bg-[#d7c39a] px-8 py-5 text-xs font-semibold uppercase tracking-cinema text-black transition-colors duration-300 hover:bg-transparent hover:text-[#d7c39a] sm:w-auto"
            >
              manavdabral1234@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
