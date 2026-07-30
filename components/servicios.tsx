import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SERVICES = [
	{
		id: 1,
		title: 'Dispensación Automática',
		description:
			'Máquinas dispensadoras de última tecnología con control remoto y análisis en tiempo real.',
		icon: '🤖',
	},
	{
		id: 2,
		title: 'Gestión Remota',
		description:
			'Plataforma integral para monitoreo, reposición y análisis de datos de tus máquinas.',
		icon: '📱',
	},
	{
		id: 3,
		title: 'Soporte 24/7',
		description:
			'Equipo técnico disponible para garantizar el funcionamiento óptimo de tus dispensadores.',
		icon: '🔧',
	},
	{
		id: 4,
		title: 'Customización',
		description:
			'Adaptamos nuestros servicios según las necesidades específicas de tu empresa.',
		icon: '⚙️',
	},
	{
		id: 5,
		title: 'Análisis de Datos',
		description:
			'Reportes detallados sobre consumo, preferencias y rentabilidad de tus máquinas.',
		icon: '📊',
	},
	{
		id: 6,
		title: 'Mantenimiento Preventivo',
		description:
			'Servicio de mantenimiento programado para maximizar la vida útil de equipos.',
		icon: '🛠️',
	},
];

function GeometricPattern({ opacity = 0.06 }: { opacity?: number }) {
	return (
		<svg
			className="absolute inset-0 w-full h-full pointer-events-none"
			xmlns="http://www.w3.org/2000/svg"
			style={{ opacity }}
		>
			<defs>
				<pattern
					id="geo"
					x="0"
					y="0"
					width="60"
					height="60"
					patternUnits="userSpaceOnUse"
				>
					<circle cx="30" cy="30" r="1" fill="#E51B24" />
					<line
						x1="0"
						y1="0"
						x2="60"
						y2="60"
						stroke="#E51B24"
						strokeWidth="0.4"
					/>
					<line
						x1="60"
						y1="0"
						x2="0"
						y2="60"
						stroke="#E51B24"
						strokeWidth="0.2"
					/>
				</pattern>
			</defs>
			<rect width="100%" height="100%" fill="url(#geo)" />
		</svg>
	);
}

export function Servicios() {
	const [activeIndex, setActiveIndex] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);
	const sectionRef = useRef<HTMLElement>(null);

	const prev = () => {
		if (isAnimating) return;
		setIsAnimating(true);
		setActiveIndex((i) => (i - 1 + SERVICES.length) % SERVICES.length);
		setTimeout(() => setIsAnimating(false), 300);
	};

	const next = () => {
		if (isAnimating) return;
		setIsAnimating(true);
		setActiveIndex((i) => (i + 1) % SERVICES.length);
		setTimeout(() => setIsAnimating(false), 300);
	};

	const service = SERVICES[activeIndex];

	return (
		<section
			ref={sectionRef}
			id="servicios"
			className="w-full min-h-screen flex items-center justify-center px-4 py-12"
			style={{ background: '#0a0a0a' }}
			aria-label="Nuestros servicios"
		>
			{/* Outer LED Glowing Chassis Container - Same size and structure as Nuestros Clientes */}
			<motion.div
				className="relative w-full rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden mx-auto px-2 sm:px-4 border-2 border-red-600/70"
				animate={{
					boxShadow: [
						'0 0 12px rgba(229,27,36,0.25), inset 0 0 8px rgba(229,27,36,0.15)',
						'0 0 28px rgba(229,27,36,0.65), inset 0 0 16px rgba(229,27,36,0.35)',
						'0 0 12px rgba(229,27,36,0.25), inset 0 0 8px rgba(229,27,36,0.15)',
					],
					borderColor: [
						'rgba(229,27,36,0.45)',
						'rgba(229,27,36,0.85)',
						'rgba(229,27,36,0.45)',
					],
				}}
				transition={{
					duration: 2.8,
					repeat: Infinity,
					ease: 'easeInOut',
				}}
				style={{
					background:
						'linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 30%, #111 70%, #1e1e1e 100%)',
					padding: '3px sm:4px md:6px',
					maxWidth: '100%',
					height: 'auto',
					minHeight: '400px',
				}}
			>
				{/* Subtle LED Corner Bulbs */}
				<motion.div
					className="absolute top-2 left-2 w-2 h-2 rounded-full bg-red-500 z-30"
					animate={{ opacity: [0.3, 1, 0.3] }}
					transition={{
						duration: 1.8,
						repeat: Infinity,
						ease: 'easeInOut',
					}}
					style={{ boxShadow: '0 0 8px #E51B24' }}
				/>
				<motion.div
					className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 z-30"
					animate={{ opacity: [0.3, 1, 0.3] }}
					transition={{
						duration: 1.8,
						repeat: Infinity,
						ease: 'easeInOut',
						delay: 0.9,
					}}
					style={{ boxShadow: '0 0 8px #E51B24' }}
				/>
				<motion.div
					className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-red-500 z-30"
					animate={{ opacity: [0.3, 1, 0.3] }}
					transition={{
						duration: 1.8,
						repeat: Infinity,
						ease: 'easeInOut',
						delay: 0.45,
					}}
					style={{ boxShadow: '0 0 8px #E51B24' }}
				/>
				<motion.div
					className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-red-500 z-30"
					animate={{ opacity: [0.3, 1, 0.3] }}
					transition={{
						duration: 1.8,
						repeat: Infinity,
						ease: 'easeInOut',
						delay: 1.35,
					}}
					style={{ boxShadow: '0 0 8px #E51B24' }}
				/>

				{/* Inner Content Area */}
				<div
					className="relative rounded-2xl overflow-hidden flex flex-col w-full py-8 px-4 md:px-8"
					style={{
						background: '#121212',
						height: '100%',
						boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.8)',
					}}
				>
					{/* Header */}
					<div className="text-center mb-8 w-full">
						<div className="flex items-center justify-center gap-3 mb-1">
							<div className="h-px w-12 md:w-20" style={{ background: 'linear-gradient(90deg, transparent, #E51B24)' }} />
							<h2
								className="font-black uppercase tracking-wider text-white"
								style={{ fontSize: 'clamp(22px, 4vw, 42px)', letterSpacing: '0.08em', textShadow: '0 0 30px rgba(229,27,36,0.3)' }}
							>
								NUESTROS SERVICIOS
							</h2>
							<div className="h-px w-12 md:w-20" style={{ background: 'linear-gradient(90deg, #E51B24, transparent)' }} />
						</div>
						<p
							className="uppercase tracking-widest font-medium"
							style={{ fontSize: 'clamp(9px, 1.2vw, 13px)', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.22em' }}
						>
							SOLUCIONES INTEGRALES EN DISPENSACIÓN Y VENDING
						</p>
					</div>

					{/* Service Cards Grid */}
					<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10 my-auto">
						{/* ...existing service items/cards... */}
					</div>
				</div>
			</motion.div>
		</section>
	);
}

export default Servicios;
