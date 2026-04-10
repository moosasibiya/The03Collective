const entityMap: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

export function escapeHtml(value: string | null | undefined) {
  return (value || '').replace(/[&<>"']/g, (character) => entityMap[character])
}
