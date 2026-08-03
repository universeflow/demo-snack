import React, { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

const STRAPI_BASE_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337"

export function Contacto() {
	const [formData, setFormData] = useState({
		nombre: "",
		email: "",
		asunto: "",
		mensaje: "",
	})

	const [status, setStatus] = useState<{
		loading: boolean
		success: boolean
		error: string | null
	}>({
		loading: false,
		success: false,
		error: null,
	})

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setStatus({ loading: true, success: false, error: null })

		try {
			const res = await fetch(`${STRAPI_BASE_URL}/api/contacto/send`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					nombre: formData.nombre,
					email: formData.email,
					asunto: formData.asunto,
					mensaje: formData.mensaje,
					// Campos alternativos por si la API usa nomenclatura camelCase
					nombreCliente: formData.nombre,
					emailCliente: formData.email,
				}),
			})

			if (!res.ok) {
				throw new Error("Ocurrió un error al enviar el mensaje. Intenta nuevamente.")
			}

			setStatus({ loading: false, success: true, error: null })
			setFormData({ nombre: "", email: "", asunto: "", mensaje: "" })
		} catch (err: any) {
			console.error("Error enviando contacto:", err)
			setStatus({
				loading: false,
				success: false,
				error: err.message || "No se pudo conectar con el servidor.",
			})
		}
	}

	return (
		<section id="contacto" className="w-full flex items-center justify-center px-4 py-16 bg-transparent">
			<motion.div
				className="relative w-full rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden mx-auto px-2 sm:px-4 border-2 border-red-600/70 max-w-[1600px]"
				animate={{
					boxShadow: [
						"0 0 12px rgba(229,27,36,0.25), inset 0 0 8px rgba(229,27,36,0.15)",
						"0 0 28px rgba(229,27,36,0.65), inset 0 0 16px rgba(229,27,36,0.35)",
						"0 0 12px rgba(229,27,36,0.25), inset 0 0 8px rgba(229,27,36,0.15)",
					],
					borderColor: [
						"rgba(229,27,36,0.45)",
						"rgba(229,27,36,0.85)",
						"rgba(229,27,36,0.45)",
					]
				}}
				transition={{
					duration: 2.8,
					repeat: Infinity,
					ease: "easeInOut",
				}}
				style={{
					background: 'linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 30%, #111 70%, #1e1e1e 100%)',
					padding: '3px sm:4px md:6px',
					maxWidth: '100%',
				}}
			>
				{/* Esquinas LED */}
				<motion.div
					className="absolute top-2 left-2 w-2 h-2 rounded-full bg-red-500 z-30"
					animate={{ opacity: [0.3, 1, 0.3] }}
					transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
					style={{ boxShadow: "0 0 8px #E51B24" }}
				/>
				<motion.div
					className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 z-30"
					animate={{ opacity: [0.3, 1, 0.3] }}
					transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
					style={{ boxShadow: "0 0 8px #E51B24" }}
				/>
				<motion.div
					className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-red-500 z-30"
					animate={{ opacity: [0.3, 1, 0.3] }}
					transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.45 }}
					style={{ boxShadow: "0 0 8px #E51B24" }}
				/>
				<motion.div
					className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-red-500 z-30"
					animate={{ opacity: [0.3, 1, 0.3] }}
					transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 1.35 }}
					style={{ boxShadow: "0 0 8px #E51B24" }}
				/>

				<div
					className="relative rounded-2xl overflow-hidden py-12 px-6 md:px-12 w-full"
					style={{
						background: '#121212',
						height: '100%',
						boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.8)',
					}}
				>
					<div className="max-w-7xl mx-auto">
						{/* Header */}
						<div className="text-center mb-16">
							<h2 className="text-3xl md:text-5xl font-black uppercase tracking-wider mb-4">
								<span className="text-white">CONTÁC</span>
								<span className="text-red-600">TANOS</span>
							</h2>
							<p className="text-neutral-400 max-w-2xl mx-auto">
								Estamos listos para atender tus dudas y ofrecerte la mejor solución en dispensación.
							</p>
						</div>

						<div className="grid lg:grid-cols-2 gap-12">
							{/* Información de contacto */}
							<div className="space-y-8">
								<div className="flex items-start gap-4">
									<div className="p-3 bg-red-600/10 border border-red-600/30 rounded-xl text-red-500">
										<Mail size={24} />
									</div>
									<div>
										<h3 className="font-bold text-lg">Correo Electrónico</h3>
										<p className="text-neutral-400">contacto@snackpro.cl</p>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="p-3 bg-red-600/10 border border-red-600/30 rounded-xl text-red-500">
										<Phone size={24} />
									</div>
									<div>
										<h3 className="font-bold text-lg">Teléfono</h3>
										<p className="text-neutral-400">+56 9 1234 5678</p>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="p-3 bg-red-600/10 border border-red-600/30 rounded-xl text-red-500">
										<MapPin size={24} />
									</div>
									<div>
										<h3 className="font-bold text-lg">Ubicación</h3>
										<p className="text-neutral-400">Santiago, Chile</p>
									</div>
								</div>
							</div>

							{/* Formulario */}
							<form onSubmit={handleSubmit} className="space-y-6 bg-neutral-900/60 p-8 rounded-2xl border border-white/10">
								{status.success && (
									<div className="p-4 bg-green-900/30 border border-green-500/50 rounded-xl flex items-center gap-3 text-green-400">
										<CheckCircle size={20} />
										<span>¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.</span>
									</div>
								)}

								{status.error && (
									<div className="p-4 bg-red-900/30 border border-red-500/50 rounded-xl flex items-center gap-3 text-red-400">
										<AlertCircle size={20} />
										<span>{status.error}</span>
									</div>
								)}

								<div>
									<label htmlFor="nombre" className="block text-sm font-medium mb-2 text-neutral-300">
										Nombre Completo
									</label>
									<input
										type="text"
										id="nombre"
										name="nombre"
										value={formData.nombre}
										onChange={handleChange}
										onInvalid={(e: React.InvalidEvent<HTMLInputElement>) => {
											e.target.setCustomValidity("Por favor, completa este campo.")
										}}
										onInput={(e: React.FormEvent<HTMLInputElement>) => {
											(e.target as HTMLInputElement).setCustomValidity("")
										}}
										required
										className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-red-600 transition-colors"
										placeholder="Tu nombre"
									/>
								</div>

								<div>
									<label htmlFor="email" className="block text-sm font-medium mb-2 text-neutral-300">
										Correo Electrónico
									</label>
									<input
										type="email"
										id="email"
										name="email"
										value={formData.email}
										onChange={handleChange}
										onInvalid={(e: React.InvalidEvent<HTMLInputElement>) => {
											if (e.target.validity.valueMissing) {
												e.target.setCustomValidity("Por favor, completa este campo.")
											} else if (e.target.validity.typeMismatch) {
												e.target.setCustomValidity("Por favor, ingresa un correo electrónico válido.")
											}
										}}
										onInput={(e: React.FormEvent<HTMLInputElement>) => {
											(e.target as HTMLInputElement).setCustomValidity("")
										}}
										required
										className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-red-600 transition-colors"
										placeholder="tu@email.com"
									/>
								</div>

								<div>
									<label htmlFor="asunto" className="block text-sm font-medium mb-2 text-neutral-300">
										Asunto
									</label>
									<select
										id="asunto"
										name="asunto"
										value={formData.asunto}
										onChange={handleChange}
										onInvalid={(e: React.InvalidEvent<HTMLSelectElement>) => {
											e.target.setCustomValidity("Por favor, selecciona un asunto de la lista.")
										}}
										onInput={(e: React.FormEvent<HTMLSelectElement>) => {
											(e.target as HTMLSelectElement).setCustomValidity("")
										}}
										required
										className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-red-600 transition-colors cursor-pointer"
									>
										<option value="" disabled>
											Selecciona un asunto
										</option>
										<option value="Cotización">Cotización</option>
										<option value="Reclamos">Reclamos</option>
										<option value="Sugerencias">Sugerencias</option>
										<option value="Consulta General">Consulta General</option>
									</select>
								</div>

								<div>
									<label htmlFor="mensaje" className="block text-sm font-medium mb-2 text-neutral-300">
										Mensaje
									</label>
									<textarea
										id="mensaje"
										name="mensaje"
										rows={4}
										value={formData.mensaje}
										onChange={handleChange}
										onInvalid={(e: React.InvalidEvent<HTMLTextAreaElement>) => {
											e.target.setCustomValidity("Por favor, ingresa tu mensaje.")
										}}
										onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
											(e.target as HTMLTextAreaElement).setCustomValidity("")
										}}
										required
										className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-red-600 transition-colors resize-none"
										placeholder="Escribe tu mensaje aquí..."
									/>
								</div>

								<button
									type="submit"
									disabled={status.loading}
									className="w-full py-4 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
								>
									{status.loading ? (
										<>
											<Loader2 className="animate-spin" size={20} />
											<span>Enviando...</span>
										</>
									) : (
										<>
											<Send size={20} />
											<span>Enviar Mensaje</span>
										</>
									)}
								</button>
							</form>
						</div>
					</div>
				</div>
			</motion.div>
		</section>
	);
}

export default Contacto;
