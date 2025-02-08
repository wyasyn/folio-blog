import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Education, Hobby, Language, Skill } from "@prisma/client";

export default function Skills({
  skills,
  education,
  languages,
  hobbies,
}: {
  skills: Skill[];
  education: Education[];
  languages: Language[];
  hobbies: Hobby[];
}) {
  return (
    <Tabs defaultValue="skill" className="my-20">
      <TabsList className="h-auto rounded-none border-b border-border bg-transparent p-0">
        <TabsTrigger
          value="skill"
          className="relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
        >
          🚀 Skills
        </TabsTrigger>
        <TabsTrigger
          value="education"
          className="relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
        >
          🎓 Education
        </TabsTrigger>
        <TabsTrigger
          value="language"
          className="relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
        >
          🌍 Languages
        </TabsTrigger>
        <TabsTrigger
          value="hobby"
          className="relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
        >
          📷 Hobbies
        </TabsTrigger>
      </TabsList>
      <TabsContent value="skill">
        <ul className="list-disc list-inside space-y-3 py-3">
          {skills.map((skill) => (
            <li
              key={skill.id}
              title={skill.level}
              className="hover:bg-secondary duration-300 p-2 rounded-lg transition-all"
            >
              {skill.name}
            </li>
          ))}
        </ul>
      </TabsContent>
      <TabsContent value="education">
        <ul className="list-disc list-inside space-y-3 py-3">
          {education.map((education) => (
            <li
              key={education.id}
              title={education.school}
              className="hover:bg-secondary duration-300 p-2 rounded-lg transition-all"
            >
              {education.degree}
            </li>
          ))}
        </ul>
      </TabsContent>
      <TabsContent value="language">
        <ul className="list-disc list-inside space-y-3 py-3">
          {languages.map((language) => (
            <li
              key={language.id}
              title={language.fluency}
              className="hover:bg-secondary duration-300 p-2 rounded-lg transition-all"
            >
              {language.name}
            </li>
          ))}
        </ul>
      </TabsContent>
      <TabsContent value="hobby">
        <ul className="list-disc list-inside space-y-3 py-3">
          {hobbies.map((hobby) => (
            <li
              key={hobby.id}
              title={hobby.details ?? undefined}
              className="hover:bg-secondary duration-300 p-2 rounded-lg transition-all"
            >
              {hobby.name}
            </li>
          ))}
        </ul>
      </TabsContent>
    </Tabs>
  );
}
