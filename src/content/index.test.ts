import { contactInfo, contactPage, getFullAddress, getSubjectLabel } from './index'

describe('content helpers', () => {
  it('builds the full address from contact info', () => {
    const address = getFullAddress()

    expect(address).toContain(contactInfo.address.street)
    expect(address).toContain(contactInfo.address.city)
  })

  it('returns labels for known subjects and falls back to value', () => {
    const firstSubject = contactPage.formSubjects[0]
    expect(getSubjectLabel(firstSubject.value)).toBe(firstSubject.label)

    expect(getSubjectLabel('unknown-subject')).toBe('unknown-subject')
  })
})
