"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const footerLinks = {
  Producto: ["Caracteristicas", "Precios", "Casos de uso", "Integraciones", "API"],
  Recursos: ["Documentacion", "Guias", "Blog", "Comunidad", "Soporte"],
  Empresa: ["Sobre nosotros", "Partners", "Contacto", "Ventas", "Demo"],
  Legal: ["Privacidad", "Terminos", "Seguridad", "Cookies", "Licencias"],
}

export function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <footer ref={ref} className="border-t border-zinc-800 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-8"
        >
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                <span className="text-zinc-950 font-bold text-sm">L</span>
              </div>
              <span className="font-semibold text-white">LexSimple</span>
            </a>
            <p className="text-sm text-zinc-500 mb-4">
              IA para empresas que quieren alinear negocio, objetivos y contratos.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-glow" />
              <span className="text-xs text-zinc-400">Plataforma operativa</span>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-zinc-500">&copy; {new Date().getFullYear()} LexSimple. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">
              X
            </a>
            <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">
              YouTube
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
