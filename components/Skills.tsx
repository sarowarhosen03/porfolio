import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { categoryList } from "@/data/staticData";
import { Skill } from "@/lib/generated/prisma";

const Skills = ({
  skill
}: {
  skill: Skill[]
}) => {


  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-primary">My Skills</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {categoryList.map((category, categoryIndex) => (
            <Card key={category} className="p-6 bg-gradient-card hover:shadow-glow transition-smooth border-0">
              <h3 className="text-2xl font-semibold mb-6 text-primary">
                {category}
              </h3>

              <div className="space-y-4">
                {skill.filter(skill => skill.category === category).map((skill, skillIndex) => (
                  <div key={skill.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.title}</span>
                      <Badge variant="secondary" className="text-xs">
                        {skill.level}%
                      </Badge>
                    </div>

                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-gradient-primary h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${skill.level}%`,
                          animationDelay: `${(categoryIndex * 3 + skillIndex) * 0.1}s`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;