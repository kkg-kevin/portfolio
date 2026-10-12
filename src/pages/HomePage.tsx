import { profile } from '../data/profile'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { About } from '../sections/About/About'
import { Contact } from '../sections/Contact/Contact'
import { Experience } from '../sections/Experience/Experience'
import { FeaturedProjects } from '../sections/FeaturedProjects/FeaturedProjects'
import { Hero } from '../sections/Hero/Hero'
import { Skills } from '../sections/Skills/Skills'

export function HomePage() {
  useDocumentMeta({
    title: `${profile.name} | ${profile.title} in ${profile.location}`,
    description: `Portfolio of ${profile.name}, a software engineer in ${profile.location} building full-stack web applications, backend systems and applied AI projects.`,
    path: '/',
  })

  return (
    <>
      <Hero />
      <FeaturedProjects />
      <Experience />
      <Skills />
      <About />
      <Contact />
    </>
  )
}
