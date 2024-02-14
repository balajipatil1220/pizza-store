import { useEffect, useState } from "react";
import { BsStarFill, BsStarHalf } from "react-icons/bs";

export function Rating({ rating }) {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    function starsCalculate() {
      const fullStars = Math.floor(parseInt(rating));
      const hasHalfStar = rating - fullStars >= 0.5;
      const stars = [];
      for (let i = 0; i < fullStars; i++) {
        stars.push(<BsStarFill />);
      }
      if (hasHalfStar) {
        stars.push(<BsStarHalf />);
      }
      setStars([...stars]);
    }
    starsCalculate();
  }, []);

  return (
    <>
      <span className="flex items-center">
        {stars.map((Item, i) => {
          return <span key={i}>{Item}</span>;
        })}
        <span className="text-gray-600 ml-3">{rating}</span>
      </span>
    </>
  );
}
