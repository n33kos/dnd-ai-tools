import { useQuery } from "@apollo/client";
import { AllActors } from "../../../graph/actor";
import Select from "../Select/Select";

interface ActorSelectProps {
  className?: string;
  campaignId: string;
  onSelect: (actorId: string) => void;
}

export default (props: ActorSelectProps) => {
  const { className, campaignId, onSelect } = props;
  const { data: actorsData, loading } = useQuery(AllActors, { variables: { campaignId }, skip: !campaignId });
  const actors = actorsData?.actors || [];

  return (
    <Select
      className={className}
      onChange={(value) => onSelect(actors.find(actor => actor.id === value))}
    >
      {loading && <option>Loading...</option>}
      <option>Select an Actor</option>
      {actors.map((actor) => (
        <option key={actor.id} value={actor.id}>
          {actor.name} ({actor.actorType})
        </option>
      ))}
    </Select>
  );
}
