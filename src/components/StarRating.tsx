import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

const StarRating = ({ rating, size = 16, interactive = false, onChange }: StarRatingProps) => {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(star => (
        <Star
          key={star}
          size={size}
          className={`${star <= rating ? "fill-primary text-primary" : "text-muted-foreground/30"} ${interactive ? "cursor-pointer hover:text-primary transition-colors" : ""}`}
          onClick={() => interactive && onChange?.(star)}
        />
      ))}
    </div>
  );
};

export default StarRating;
