import { useAppSelector } from "../../hooks/storeHooks";
import { allStartup } from "../../store/features/startupSlice";
import StartupCard from "./StartupCard";

export default function ViewList() {
  const startups = useAppSelector(allStartup);

 

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Explore Startups</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {startups.length > 0 ? (
          startups.map((startup) => <StartupCard key={startup._id} startup={startup} />)
        ) : (
          <p className="text-gray-500 text-center">No startups available.</p>
        )}
      </div>
    </div>
  );
}
