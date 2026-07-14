export function isSpamSubmission(raw: Record<string, FormDataEntryValue>) {
  const company = raw.company
  return typeof company === 'string' && company.trim().length > 0
}
