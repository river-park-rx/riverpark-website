// Import from separate JSON files for easier content management
import sharedContent from './shared.json'
import homepageContent from './homepage.json'
import servicesContent from './services.json'
import aboutContent from './about.json'
import prescriptionsContent from './prescriptions.json'
import contactContent from './contact.json'

// Type definitions
export interface NavLink {
  label: string
  href: string
}

export interface Service {
  id: string
  title: string
  shortDescription: string
  description: string
  features: string[]
}

export interface HomeService {
  title: string
  description: string
  href: string
}

export interface Testimonial {
  name: string
  rating: number
  text: string
  location: string
  image: string
}

export interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
}

export interface Value {
  title: string
  description: string
}

export interface RefillStep {
  step: number
  title: string
  description: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface FormSubject {
  value: string
  label: string
}

export interface Stat {
  value: string
  label: string
}

// Export shared content
export const company = sharedContent.company
export const contactInfo = sharedContent.contact
export const hours = sharedContent.hours
export const social = sharedContent.social
export const navigation = sharedContent.navigation
export const seo = sharedContent.seo

// Export page-specific content
export const homepage = homepageContent
export const services = servicesContent
export const about = aboutContent
export const prescriptions = prescriptionsContent
export const contactPage = contactContent

// Export full content object for convenience
export const content = {
  ...sharedContent,
  homepage: homepageContent,
  services: servicesContent,
  about: aboutContent,
  prescriptions: prescriptionsContent,
  contactPage: contactContent,
}

// Helper functions
export const getFullAddress = () => {
  const { street, suite, city, state, zip } = contactInfo.address
  return `${street}, ${suite}, ${city}, ${state} ${zip}`
}

export const getFormattedHours = () => hours.formatted

export const getServiceById = (id: string): Service | undefined => {
  return services.list.find((service) => service.id === id)
}

export const getSubjectLabel = (value: string): string => {
  const subject = contactPage.formSubjects.find((s: FormSubject) => s.value === value)
  return subject?.label || value
}

export default content
