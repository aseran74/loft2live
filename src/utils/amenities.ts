export type AmenityKey =
  | 'wifi_high_speed'
  | 'common_areas_lounge'
  | 'shared_kitchens'
  | 'laundry'
  | 'climatization'
  | 'smart_access'
  | 'maintenance_included'
  | 'utilities_included'
  | 'coworking_space'
  | 'phone_booths'
  | 'hot_desk'
  | 'printers_scanners'
  | 'good_lighting_quiet'
  | 'focus_social_separated'
  | 'gym_or_agreement'
  | 'yoga_room'
  | 'terrace_rooftop'
  | 'green_areas'
  | 'relax_spaces'
  | 'bike_parking'
  | 'personal_lockers'
  | 'community_events'
  | 'bbq_area'
  | 'game_room'
  | 'cinema_projector'
  | 'community_manager'
  | 'community_app'

export type AmenityGroup = {
  title: string
  subtitle?: string
  items: Array<{ key: AmenityKey; label: string }>
}

export const amenityGroups: AmenityGroup[] = [
  {
    title: 'Comodidades',
    items: [
      { key: 'wifi_high_speed', label: 'Wi‑Fi de alta velocidad (muy estable, incluso con red mesh)' },
      { key: 'common_areas_lounge', label: 'Zonas comunes amuebladas (salón / lounge)' },
      { key: 'shared_kitchens', label: 'Cocinas compartidas o semi-compartidas bien equipadas' },
      { key: 'laundry', label: 'Lavandería (lavadoras + secadoras)' },
      { key: 'climatization', label: 'Climatización (A/C + calefacción)' },
      { key: 'smart_access', label: 'Smart access (cerraduras digitales / app)' },
      { key: 'maintenance_included', label: 'Mantenimiento incluido' },
      { key: 'utilities_included', label: 'Suministros incluidos (agua, luz, internet)' },
    ],
  },
  {
    title: 'Trabajo & productividad',
    subtitle: 'Muy demandado en flexliving moderno',
    items: [
      { key: 'coworking_space', label: 'Coworking space' },
      { key: 'phone_booths', label: 'Cabinas para videollamadas' },
      { key: 'hot_desk', label: 'Mesas hot-desk' },
      { key: 'printers_scanners', label: 'Impresoras / escáner' },
      { key: 'good_lighting_quiet', label: 'Buena iluminación y silencio controlado' },
      { key: 'focus_social_separated', label: 'Espacios “focus” y espacios “social” separados' },
    ],
  },
  {
    title: 'Bienestar & estilo de vida',
    subtitle: 'Retención y satisfacción de inquilinos',
    items: [
      { key: 'gym_or_agreement', label: 'Gimnasio o acuerdos con gym cercano' },
      { key: 'yoga_room', label: 'Sala de yoga / fitness' },
      { key: 'terrace_rooftop', label: 'Terraza o rooftop' },
      { key: 'green_areas', label: 'Zonas verdes / patios interiores' },
      { key: 'relax_spaces', label: 'Espacios de relax' },
      { key: 'bike_parking', label: 'Parking bicicletas' },
      { key: 'personal_lockers', label: 'Taquillas personales' },
    ],
  },
  {
    title: 'Comunidad & social',
    subtitle: 'El “valor invisible” del flexliving',
    items: [
      { key: 'community_events', label: 'Eventos comunitarios (afterwork, cenas, charlas)' },
      { key: 'bbq_area', label: 'Zonas BBQ' },
      { key: 'game_room', label: 'Sala de juegos' },
      { key: 'cinema_projector', label: 'Cine / proyector' },
      { key: 'community_manager', label: 'Community manager' },
      { key: 'community_app', label: 'App de comunidad (avisos, eventos, soporte)' },
    ],
  },
]

export function getAmenityLabel(key: string): string {
  for (const group of amenityGroups) {
    const item = group.items.find((i) => i.key === key)
    if (item) return item.label
  }
  return key
}

// SVGs simples (stroke currentColor) para usar con v-html
export function getAmenityIconSvg(key: string): string {
  // Helpers
  const svg = (paths: string) =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`

  switch (key as AmenityKey) {
    case 'wifi_high_speed':
      return svg('<path d="M5 12.5a10 10 0 0 1 14 0"/><path d="M8.5 15.5a6 6 0 0 1 7 0"/><path d="M12 19h.01"/>')
    case 'common_areas_lounge':
      return svg('<path d="M7 12V9a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3"/><path d="M5 12h14"/><path d="M6 12v4"/><path d="M18 12v4"/><path d="M6 16h12"/>')
    case 'shared_kitchens':
      return svg('<path d="M4 3h16"/><path d="M6 3v18"/><path d="M18 3v18"/><path d="M9 7h6"/><path d="M9 11h6"/><path d="M9 15h6"/>')
    case 'laundry':
      return svg('<path d="M6 4h12v16H6z"/><path d="M9 7h.01"/><path d="M12 7h.01"/><path d="M12 15a4 4 0 1 0 0-8a4 4 0 0 0 0 8z"/>')
    case 'climatization':
      return svg('<path d="M12 2v20"/><path d="M4 8h16"/><path d="M4 16h16"/><path d="M7 5l2 3"/><path d="M17 19l-2-3"/><path d="M17 5l-2 3"/><path d="M7 19l2-3"/>')
    case 'smart_access':
      return svg('<path d="M7 11V8a5 5 0 0 1 10 0v3"/><path d="M6 11h12v10H6z"/><path d="M12 16v2"/>')
    case 'maintenance_included':
      return svg('<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 0 0 2.4-8.4z"/>')
    case 'utilities_included':
      return svg('<path d="M13 2L3 14h7l-1 8 10-12h-7z"/>')
    case 'coworking_space':
      return svg('<path d="M3 7h18"/><path d="M6 7v13"/><path d="M18 7v13"/><path d="M10 11h4"/><path d="M10 15h4"/>')
    case 'phone_booths':
      return svg('<path d="M8 3h8v18H8z"/><path d="M11 7h2"/><path d="M10 11h4"/>')
    case 'hot_desk':
      return svg('<path d="M4 10h16"/><path d="M6 10v10"/><path d="M18 10v10"/><path d="M9 6h6"/><path d="M9 6v4"/><path d="M15 6v4"/>')
    case 'printers_scanners':
      return svg('<path d="M7 8V4h10v4"/><path d="M6 17h12v3H6z"/><path d="M6 10h12a2 2 0 0 1 2 2v3H4v-3a2 2 0 0 1 2-2z"/><path d="M17 14h.01"/>')
    case 'good_lighting_quiet':
      return svg('<path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a6 6 0 0 0-3.5 10.9c.7.6 1.5 1.8 1.5 2.6h4c0-.8.8-2 1.5-2.6A6 6 0 0 0 12 2z"/>')
    case 'focus_social_separated':
      return svg('<path d="M4 4h8v8H4z"/><path d="M12 12h8v8h-8z"/><path d="M12 4h8"/><path d="M4 20h8"/>')
    case 'gym_or_agreement':
      return svg('<path d="M6 10v4"/><path d="M18 10v4"/><path d="M8 12h8"/><path d="M4 9v6"/><path d="M20 9v6"/>')
    case 'yoga_room':
      return svg('<path d="M12 6a2 2 0 1 0 0.001 0z"/><path d="M7 21l5-6 5 6"/><path d="M6 12h12"/><path d="M9 12l3 3 3-3"/>')
    case 'terrace_rooftop':
      return svg('<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/>')
    case 'green_areas':
      return svg('<path d="M12 22s7-4 7-11a7 7 0 0 0-14 0c0 7 7 11 7 11z"/><path d="M12 11c0 6-3 9-3 9"/><path d="M12 11c0 6 3 9 3 9"/>')
    case 'relax_spaces':
      return svg('<path d="M7 8h10"/><path d="M8 8v9a4 4 0 0 0 8 0V8"/><path d="M6 21h12"/>')
    case 'bike_parking':
      return svg('<circle cx="6.5" cy="17.5" r="3.5"/><circle cx="17.5" cy="17.5" r="3.5"/><path d="M9 17.5l4-8h3"/><path d="M10 9h4"/><path d="M14 9l3 8.5"/>')
    case 'personal_lockers':
      return svg('<path d="M7 4h10v16H7z"/><path d="M10 8h4"/><path d="M10 12h4"/><path d="M12 16h.01"/>')
    case 'community_events':
      return svg('<path d="M16 11a4 4 0 1 0-8 0"/><path d="M4 20a8 8 0 0 1 16 0"/><path d="M18 8h3"/><path d="M19.5 6.5v3"/>')
    case 'bbq_area':
      return svg('<path d="M7 21h10"/><path d="M9 21v-4"/><path d="M15 21v-4"/><path d="M8 17h8"/><path d="M7 17a5 5 0 0 1 10 0"/><path d="M10 5c0 2-2 2-2 4"/><path d="M14 5c0 2-2 2-2 4"/>')
    case 'game_room':
      return svg('<path d="M6 15l-1 3"/><path d="M18 15l1 3"/><path d="M7 15h10"/><path d="M8 11h.01"/><path d="M10 13h.01"/><path d="M15 12h2"/><path d="M6 9h12a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-3a3 3 0 0 1 3-3z"/>')
    case 'cinema_projector':
      return svg('<path d="M4 7h16v10H4z"/><path d="M8 7v10"/><path d="M16 7v10"/><path d="M10 12l4 2-4 2z"/>')
    case 'community_manager':
      return svg('<path d="M12 12a4 4 0 1 0-0.001 0z"/><path d="M4 21a8 8 0 0 1 16 0"/><path d="M19 7l2 2"/><path d="M21 7l-2 2"/>')
    case 'community_app':
      return svg('<path d="M8 2h8v20H8z"/><path d="M11 18h2"/><path d="M10 6h4"/>')
    default:
      return svg('<path d="M12 20h.01"/><path d="M12 4v12"/>')
  }
}

