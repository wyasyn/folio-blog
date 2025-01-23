import { stats } from "@/lib/stats";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export default function Stats() {
  return (
    <div className="flex gap-10 sm:gap-[5rem] lg:gap-[4rem] flex-col sm:flex-row">
      <h2 className="text-2xl capitalize">Crafting Unique skills</h2>
      <div className="grid gap-6 lg:grid-cols-2">
        {stats.map((stat, index) => (
          <StatsCard
            title={stat.name}
            color={stat.color}
            descriptions={stat.descriptions}
            Icon={stat.icon}
            value={stat.value}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

const StatsCard = ({
  title,
  color,
  Icon,
  descriptions,
  value,
}: {
  title: string;
  color: string;
  value: number;
  descriptions: string;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}) => {
  return (
    <article className="border-l px-4 py-2">
      <div className="flex items-center gap-2">
        <span
          style={{
            color: color,
          }}
        >
          <Icon className="w-5 h-5" />
        </span>

        <h4 className="text-xl capitalize">{value} +</h4>
      </div>

      <h5 className="text-foreground font-medium my-2">{title}</h5>

      <p className="max-w-[30ch]">{descriptions}</p>
    </article>
  );
};
