import {
  BsExclamationTriangle,
  BsExclamationTriangleFill,
  BsQuestion,
} from 'react-icons/bs';
import { HiMiniInformationCircle } from 'react-icons/hi2';

type Props = {
  alerts: Alert[] | null;
};

function getIcon(level: number) {
  if (level == 0) return <HiMiniInformationCircle></HiMiniInformationCircle>;
  if (level == 1) return <BsQuestion className=" text-xl"></BsQuestion>;
  if (level == 2)
    return <BsExclamationTriangle className=" text-xl"></BsExclamationTriangle>;
  if (level == 3)
    return (
      <BsExclamationTriangleFill className=" text-xl"></BsExclamationTriangleFill>
    );

  return null;
}

function getColor(level: number) {
  if (level == 0) return 'text-gray-300';
  if (level == 1) return 'text-yellow-500';
  if (level == 2) return 'text-red-500';
  if (level == 3) return 'text-red-500';
}

export default function AlertsContainer({ alerts }: Props) {
  if (!alerts) return null;

  return (
    <ul>
      {alerts.map((s, index) => (
        <div className="flex" key={index}>
          <div className={`my-2 ${getColor(s.level)} flex gap-2 `}>
            <div className="self-center">{getIcon(s.level)}</div>
            <div className="self-start">{s.message}</div>
          </div>
        </div>
      ))}
    </ul>
  );
}
