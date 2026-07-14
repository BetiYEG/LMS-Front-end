import {
  Book,
  BookOpenCheck,
  User,
  BellDot,
  ShieldQuestion,
  HelpCircle,
  Award,
} from "lucide-react"
import logo from "@/assets/images/logo.png"

export interface ClientConfig {
  orgName: string
  orgCode: string
  logoUrl: string
  apiBaseUrl: string
  primaryColor: string
  teamKey: string  // ✅ Add team key
}

export const sidebarConfigs = {
  StudentLMS: [
    { name: "My course", icon: Book, path: "/my-courses" },
    { name: "My Progress", icon: BookOpenCheck, path: "/progress" },
    { name: "Mock Exams", icon: ShieldQuestion, path: "/mock-exams" },
    { name: "Quizzes", icon: HelpCircle, path: "/quizzes" },
    { name: "Profile", icon: User, path: "/profile" },
    { name: "Notification", icon: BellDot, path: "/notifications" },
  ],
  EmployeeLMS: [
    { name: "My Courses", icon: Book, path: "/my-courses" },
    { name: "Certificates", icon: Award, path: "/achievements" },
    { name: "Profile", icon: User, path: "/profile" },
    { name: "Notification", icon: BellDot, path: "/notifications" },
  ],
}

export const clients: Record<string, ClientConfig> = {
  default: {
    orgName: "LMS Platform",
    orgCode: "LMS",
    logoUrl: logo,
    apiBaseUrl: "https://cpd.cms.oeb.gov.et",
    primaryColor: "#4f46e5",
    teamKey: 'default',
  },
  osu: {
    orgName: "OSU LMS",
    orgCode: "OSU",
    logoUrl: logo,
    apiBaseUrl: "https://cpd.cms.oeb.gov.et",
    primaryColor: "#0891b2",
    teamKey: 'osu',
  },
  oeb: {
    orgName: "OEB LMS",
    orgCode: "OEB",
    logoUrl: logo,
    apiBaseUrl: "https://cms.oeb.gov.et",
    primaryColor: "#2563eb",
    teamKey: 'oeb',
  },
  central: {
    orgName: "Central Ethiopia LMS",
    orgCode: "CEREB",
    logoUrl: logo,
    apiBaseUrl: "https://cms.cereb.edu.et",
    primaryColor: "#d97706",
    teamKey: 'central',
  },
  geb: {
    orgName: "AAEB",
    orgCode: "AAEB",
    logoUrl: logo,
    apiBaseUrl: "http://localhost:8000",
    primaryColor: "#dc2626",
    teamKey: 'geb',
  },
}

export const getClientConfig = (): ClientConfig => {
  const clientKey = import.meta.env.VITE_CLIENT || "default"
  return clients[clientKey] || clients.default
}

export const getSidebarItems = () => {
  return sidebarConfigs.StudentLMS
}

export const getApiBaseUrl = (): string => {
  return getClientConfig().apiBaseUrl
}

export const getOrgName = (): string => {
  return getClientConfig().orgName
}

export const getLogoUrl = (): string => {
  return getClientConfig().logoUrl
}

export const getPrimaryColor = (): string => {
  return getClientConfig().primaryColor
}

export const getTeamKey = (): string => {
  return getClientConfig().teamKey
}

export default {
  
  clients,
  sidebarConfigs,
  getClientConfig,
  getSidebarItems,
  getApiBaseUrl,
  getOrgName,
  getLogoUrl,
  getPrimaryColor,
  getTeamKey,
}