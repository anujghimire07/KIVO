import { useState } from "react"
import { Building2, Mail, Send } from "lucide-react"
import { CONTACT_EMAIL, FORMSPREE_ENDPOINT } from "../config.js"

const inputClass =
  "w-full rounded-xl border border-input-line bg-input-bg px-4 py-3.5 text-sm text-ink outline-none transition placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand"

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState("idle") // idle | sending | success | error

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus("sending")
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus("success")
        setForm({ name: "", email: "", message: "" })
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <div className="bg-soft px-4 py-16 lg:py-24">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-card-bg shadow-lg">
        <div className="flex flex-col lg:flex-row">
          {/* left: video panel */}
          <div className="relative min-h-[280px] lg:w-[45%]">
            <video
              src="/toothless.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ backgroundColor: "rgba(43,45,42,0.55)" }}
            />
            <div className="relative z-10 flex h-full flex-col justify-center p-8 lg:p-10">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-widest text-white/60">
                  Get in touch
                </span>
                <span className="h-px w-8 bg-brand" />
              </div>
              <h2 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">
                Let&apos;s work together
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#a0a69e]">
                Have a project in mind, a bug to report, or just want to say hi?
                Drop a message — I usually reply within a day.
              </p>

              <div className="mt-8 space-y-5">
                <div className="flex items-center gap-3.5">
                  <div
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: "rgba(122,158,126,0.12)" }}
                  >
                    <Building2 className="h-5 w-5" style={{ color: "#7a9e7e" }} />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-widest text-white/40">
                      Address
                    </p>
                    <p className="text-sm font-medium text-white/90">Tikathali, Lalitpur, Nepal</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: "rgba(122,158,126,0.12)" }}
                  >
                    <Mail className="h-5 w-5" style={{ color: "#7a9e7e" }} />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-widest text-white/40">
                      Email
                    </p>
                    <p className="text-sm font-medium text-white/90">{CONTACT_EMAIL}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* right: form */}
          <div className="px-6 py-10 sm:px-10 lg:w-[55%]">
            <h3 className="text-xl font-bold text-ink">Send a message</h3>
            <p className="mt-1 text-sm text-muted">
              Fill out the form and I&apos;ll get back to you.
            </p>

            {status === "success" && (
              <div className="mt-5 rounded-lg border border-[#bbf7d0] bg-[#f0fdf4] p-3 text-sm font-medium text-green-600">
                Message sent! I&apos;ll get back to you soon.
              </div>
            )}
            {status === "error" && (
              <div className="mt-5 rounded-lg border border-[#fecaca] bg-[#fef2f2] p-3 text-sm font-medium text-[#ef4444]">
                Something went wrong. Please try again later.
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-ink">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-ink">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-ink">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className={`${inputClass} resize-none`}
                  placeholder="Write your message here..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-[#2E2A2A] transition hover:opacity-90 hover:shadow-lg disabled:opacity-50"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
                {status !== "sending" && <Send className="h-4 w-4" />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
