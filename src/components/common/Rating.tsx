import { IReviewFronted } from "@/types";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Rating = ({ reviews }: { reviews: IReviewFronted[] }) => {
  if (!reviews || reviews?.length === 0) {
    return <span className="text-gray-500">No reviews yet.</span>;
  }

  const averageRating =
    reviews.reduce((acc, cur) => acc + cur.rating, 0) / reviews.length;

  const fullStars = Math.floor(averageRating);
  const halfStar = averageRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <>
      <div className="flex items-center space-x-1">
        <div className="flex items-center gap-[2px] text-yellow-400 text-xl">
          {[...Array(fullStars)].map((_, i) => (
            <FaStar key={`full-${i}`} />
          ))}
          {halfStar && <FaStarHalfAlt key="half" />}
          {[...Array(emptyStars)].map((_, i) => (
            <FaRegStar key={`empty-${i}`} />
          ))}
        </div>
        <span className="text-lg font-semibold text-gray-900 dark:text-white">
          {averageRating.toFixed(1)}
        </span>
      </div>
      <span className="text-gray-500 dark:text-gray-400">
        ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
      </span>
    </>
  );
};

export default Rating;
