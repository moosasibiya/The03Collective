type SpamTrapProps = {
  idPrefix: string
}

export default function SpamTrap({ idPrefix }: SpamTrapProps) {
  return (
    <div aria-hidden="true" className="formTrap">
      <label htmlFor={`${idPrefix}-company`}>Company</label>
      <input
        autoComplete="organization"
        id={`${idPrefix}-company`}
        name="company"
        tabIndex={-1}
        type="text"
      />
    </div>
  )
}
