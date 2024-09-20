import { Link } from 'react-router-dom';

interface PropTypes {
  title: string;
  label?: string;
  content: string;
  img: string;
  id: string;
}

const Magazine = ({ id, title, label, content, img }: PropTypes) => {
  return (
    <Link
      to={`/home/community/magazine/${id}`}
      style={{
        background: `url(${img}) center /cover no-repeat`,
      }}
      className="relative flex h-[14.5625rem] w-[10rem] flex-col overflow-hidden rounded-xl shadow-lg"
    >
      <div
        style={{
          background: '#2727271D',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      ></div>
      {label &&
        (label === '이벤트' ? (
          <span className="absolute left-3 top-3 z-10 rounded-lg bg-mainblue px-2 py-1 text-caption text-white">
            {label}
          </span>
        ) : (
          <span className="absolute left-3 top-3 z-10 rounded-lg bg-maingreen px-2 py-1 text-caption text-mainblue">
            {label}
          </span>
        ))}
      <div className="relative z-10 flex h-full flex-col justify-end p-4 text-white">
        <div className="flex flex-grow flex-col justify-end">
          <h3 className="mb-1 text-xl font-bold">{title}</h3>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-caption text-sm leading-tight">
            {content}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Magazine;
