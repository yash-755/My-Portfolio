import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 && feedback.trim() === "") return;

    setSubmitted(true);
    toast({
      title: "Submitted ✓",
      description: "Thank you for your feedback!",
    });

    setTimeout(() => {
      setRating(0);
      setFeedback("");
      setSubmitted(false);
    }, 3000);
  };

  const isSubmitDisabled = rating === 0 && feedback.trim() === "";

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-transparent to-primary/5">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8"
        >
          <h2 className="text-3xl font-bold text-center mb-3 neon-text">
            Share Your Feedback
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            Your thoughts help me improve and innovate.
          </p>

          {submitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-primary mb-2">Submitted ✓</h3>
              <p className="text-muted-foreground">Thank you for your feedback!</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Star Rating */}
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-10 h-10 transition-all duration-200 ${
                        star <= (hoveredRating || rating)
                          ? "fill-primary text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  </motion.button>
                ))}
              </div>

              {/* Feedback Text */}
              <div>
                <Textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Share your thoughts, suggestions, or experiences..."
                  rows={5}
                  className="bg-background/50 border-border/50 focus:border-primary resize-none"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitDisabled}
                className={`w-full ${
                  isSubmitDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : "neon-border hover:bg-primary/20"
                }`}
              >
                Submit Feedback
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Feedback;
