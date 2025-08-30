import {
  BsExclamationTriangle,
  BsExclamationTriangleFill,
  BsQuestion,
} from 'react-icons/bs';

type Alert = {
  type: number;
  message: string;
};

type Props = {
  alerts: Alert[];
};

function getIcon(type: number) {
  if (type == 1) return <BsQuestion className=" text-xl"></BsQuestion>;
  if (type == 2)
    return <BsExclamationTriangle className=" text-xl"></BsExclamationTriangle>;
  if (type == 3)
    return (
      <BsExclamationTriangleFill className=" text-xl"></BsExclamationTriangleFill>
    );

  return null;
}

export default function AlertsContainer({ alerts }: Props) {
  function getColor(type: number) {
    if (type == 1) return 'text-yellow-500';
    if (type == 2) return 'text-red-500';
    if (type == 3) return 'text-red-500';
  }

  return (
    <ul>
      {alerts.map((s, index) => (
        <div className="flex" key={index}>
          <div className={`my-2 ${getColor(s.type)} flex gap-2 `}>
            <div className="self-start mt-1">{getIcon(s.type)}</div>
            <div className="self-start">{s.message}</div>
          </div>
        </div>
      ))}
    </ul>
  );
}
