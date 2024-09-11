import getPbImageURL from '@/utils/getPbImageURL';
import { Link } from 'react-router-dom';

interface SquarePostingCardProp {
  data: { id: string; img: string; collectionId: string; photo: string };
}

const SquarePostingCard = ({ data }: SquarePostingCardProp) => {
  const ENDPOINT = `https://hexagon-potatoes.pockethost.io/`;
  const defaultTipImage = '/assets/shipmatelogo.png'; // 기본 팁 이미지 URL

  return (
    <li className="[list-style:none]">
      <Link
        to={`/home/community/boast/${data.id}`}
        className="flex h-[6.6875rem] w-[6.6875rem] flex-shrink-0 bg-[#F2F2F2]"
      >
        {/* 적당한 alt 속성값이 떠오르지 않아 추후에 gemini 고려 */}
        {/* 사용할때 img 프롭 src에 넣어야됌 */}
        <img
          className="h-full w-full object-cover"
          src={data.photo ? getPbImageURL(ENDPOINT, data) : defaultTipImage}
          alt="추천 피드 이미지"
        />
      </Link>
    </li>
  );
};

export default SquarePostingCard;
