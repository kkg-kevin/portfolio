import { lazy, Suspense } from 'react'
import { LazyMotion, MotionConfig } from 'framer-motion'
import { Route, Routes } from 'react-router'
import { Layout } from './components/layout/Layout'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'

// Secondary pages load on demand so the home page ships less JavaScript.
const ProjectPage = lazy(() => import('./pages/ProjectPage').then((module) => ({ default: module.ProjectPage })))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then((module) => ({ default: module.PrivacyPage })))

const loadMotionFeatures = () => import('./lib/motionFeatures').then((module) => module.default)

export function App() {
  return (
    // reducedMotion="user" turns off transform animations for visitors who ask for less motion.
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadMotionFeatures} strict>
        <Suspense fallback={<div className="min-h-dvh" />}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="work/:slug" element={<ProjectPage />} />
              <Route path="privacy" element={<PrivacyPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </LazyMotion>
    </MotionConfig>
  )
}
