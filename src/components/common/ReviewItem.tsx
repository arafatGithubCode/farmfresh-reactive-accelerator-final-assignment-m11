"use client";

import { IReviewFronted } from "@/types";
import { getDateDiff } from "@/utils/getDateDiff";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  FaEdit,
  FaEllipsisV,
  FaStar,
  FaStarHalfAlt,
  FaThumbsUp,
  FaTrash,
} from "react-icons/fa";
import Popup from "../ui/Popup";
import UserInfo from "./UserInfo";

const ReviewItem = ({ review }: { review: IReviewFronted }) => {
  const [showCustomerInfo, setShowCustomerInfo] = useState<boolean>(false);
  const [showReviewAction, setShowReviewAction] = useState<boolean>(false);

  const reviewActionRef = useRef<HTMLDivElement>(null);

  const fullStars = Math.trunc(review.rating);
  const halfStar = review.rating % 1 >= 0.5;

  const session = useSession();
  const loggedInUserId = session?.data?.user?.id;

  const isReviewOwner = review.customer.id === loggedInUserId;

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        reviewActionRef.current &&
        !reviewActionRef.current.contains(e.target as Node)
      ) {
        setShowReviewAction(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="flex items-start space-x-4">
      <div className="w-12 h-12 rounded-full relative">
        <Image
          src={review.customer.image!}
          alt={review.customer.firstName ?? review.customer.name}
          fill={true}
          className="w-full object-contain rounded-full"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h4
              onClick={() => setShowCustomerInfo(true)}
              className="font-semibold text-gray-900 dark:text-white hover:underline hover:cursor-pointer"
            >
              {review.customer.name ??
                `${review.customer.firstName} ${review.customer.lastName}`}
            </h4>
            {showCustomerInfo && (
              <Popup
                hasUserInfo={true}
                onClose={() => setShowCustomerInfo(false)}
              >
                <UserInfo user={review.customer} />
              </Popup>
            )}
            <div className="flex items-center space-x-2">
              <div className="flex text-yellow-400 text-sm">
                {[...Array(fullStars)].map((_, index) => (
                  <FaStar key={`full-${index}`} />
                ))}
                {halfStar && <FaStarHalfAlt key="half" />}
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {getDateDiff(review.updatedAt!)}
              </span>
            </div>
          </div>
          {isReviewOwner && (
            <div className="relative" ref={reviewActionRef}>
              <button
                onClick={() => setShowReviewAction((prev) => !prev)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <FaEllipsisV />
              </button>
              {showReviewAction && (
                <div className="absolute top-5 right-4 p-4 space-y-4 bg-gray-100 dark:bg-gray-900 rounded-lg shadow animate-fade-up">
                  <div className="flex items-center gap-1 hover:text-primary-500 hover:cursor-pointer text-sm">
                    <FaEdit />
                    <span>Edit</span>
                  </div>
                  <div className="flex items-center gap-1 hover:text-red-500 hover:cursor-pointer text-sm">
                    <FaTrash />
                    <span>Delete</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-3">
          {review.comment}
        </p>
        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
          <button className="hover:text-primary-600 dark:hover:text-primary-400 flex">
            <FaThumbsUp className="mr-1" /> Helpful (12)
          </button>
          <button className="hover:text-primary-600 dark:hover:text-primary-400">
            Reply
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
