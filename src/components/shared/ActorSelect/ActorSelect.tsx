import { useQuery } from "@apollo/client";
import { AllActors } from "../../../graph/actor";

interface ActorSelectProps {
  className?: string;
  campaignId: string;
  onSelect: (actorId: string) => void;
}

export default (props: ActorSelectProps) => {
  const { campaignId, onSelect } = props;
  const { data: actorsData, loading } = useQuery(AllActors, { variables: { campaignId }, skip: !campaignId });
  const actors = actorsData?.actors || [];

  return (
    <select
      className={props.className}
      onChange={(e) => onSelect(actors.find(actor => actor.id === e.target.value))}
    >
      {loading && <option>Loading...</option>}
      <option>Select an Actor</option>
      {actors.map((actor) => (
        <option key={actor.id} value={actor.id}>
          {actor.name} ({actor.actorType})
        </option>
      ))}
    </select>
  );
}
