import {
  SiReact, SiNodedotjs, SiMongodb, SiExpress, SiPostgresql, SiPrisma,
  SiMysql, SiPython, SiJavascript, SiGit, SiFigma, SiTailwindcss,
  SiThreedotjs, SiNextdotjs, SiTypescript, SiVite, SiDocker,
  SiFramer
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { Code2, Server, Palette, Terminal } from 'lucide-react';

export const TECH_ICONS = {
  React: <SiReact size={22} />, 'Next.js': <SiNextdotjs size={22} />, 'Node.js': <SiNodedotjs size={22} />,
  Express: <SiExpress size={22} />, MongoDB: <SiMongodb size={22} />, PostgreSQL: <SiPostgresql size={22} />,
  MySQL: <SiMysql size={22} />, Prisma: <SiPrisma size={22} />, Python: <SiPython size={22} />,
  Java: <FaJava size={22} />, TypeScript: <SiTypescript size={22} />, JavaScript: <SiJavascript size={22} />,
  Tailwind: <SiTailwindcss size={22} />, 'Three.js': <SiThreedotjs size={22} />,
  'Framer Motion': <SiFramer size={22} />, Git: <SiGit size={22} />, Vite: <SiVite size={22} />,
  Docker: <SiDocker size={22} />, Judge0: <Terminal size={22} />, Figma: <SiFigma size={22} />
};

export const CAP_ICONS = {
  frontend: <Code2 size={22} />,
  backend: <Server size={22} />,
  creative: <Palette size={22} />
};
