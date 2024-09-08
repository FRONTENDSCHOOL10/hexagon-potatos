import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

interface PostActionBarProps {
  postId: string | number;
  onLike: () => void;
  onBookmark: () => void;
  onShare: () => void;
}

const PostActionBar = ({
  postId,
  onLike,
  onBookmark,
  onShare,
}: PostActionBarProps) => {
  return (
    <div className="mb-[2.56rem] flex h-[1.5625rem] items-center gap-4">
      <button
        data-tooltip-id="my-tooltip"
        data-tooltip-content="좋아요"
        type="button"
        aria-label="좋아요"
        onClick={onLike}
      >
        <svg
          width="16"
          height="15"
          role="img"
          className="text-gray-200"
          aria-hidden="true"
        >
          <use width="16" height="15" href="/assets/sprite-sheet.svg#heart" />
        </svg>
      </button>
      <Link
        // 나중에 연결될 댓글 페이지 제작 후 path 연결해주기
        to={`/post/${postId}/comments`}
        data-tooltip-id="my-tooltip"
        data-tooltip-content="댓글"
        type="button"
        aria-label="댓글 보기"
      >
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          role="img"
          className="text-gray-200"
          aria-hidden="true"
        >
          <use width="16" height="17" href="/assets/sprite-sheet.svg#comment" />
        </svg>
      </Link>
      <button
        data-tooltip-id="my-tooltip"
        data-tooltip-content="북마크"
        type="button"
        aria-label="북마크"
        onClick={onBookmark}
      >
        <svg
          width="15"
          height="17"
          viewBox="0 0 15 17"
          role="img"
          className="text-gray-200"
          aria-hidden="true"
        >
          <use
            width="15"
            height="17"
            href="/assets/sprite-sheet.svg#bookmark"
          />
        </svg>
      </button>
      <button
        data-tooltip-id="my-tooltip"
        data-tooltip-content="공유"
        type="button"
        aria-label="공유"
        onClick={onShare}
      >
        <svg
          width="17"
          height="17"
          viewBox="0 0 17 17"
          role="img"
          className="text-gray-200"
          aria-hidden="true"
        >
          <use width="17" height="17" href="/assets/sprite-sheet.svg#share2" />
        </svg>{' '}
      </button>
      <Tooltip id="my-tooltip" />
    </div>
  );
};

export default PostActionBar;
