import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

// Sample avatar placeholder
const avatar = "https://via.placeholder.com/70";

function RateCard() {
  return (
    <Card className="mb-4 bg-gray-200 shadow-sm">
      <div className="flex flex-col md:flex-row items-start px-4 py-3 gap-4">
        <img
          src={avatar}
          alt="Reviewer"
          className="w-[70px] h-[70px] rounded-full object-cover"
        />

        <div className="flex-1">
          <p className="text-base font-semibold">John Chamling Rai</p>
          <p className="text-sm text-gray-700 mt-1">
            Superb voice and performance. Love your songs. Always keep it up bro!!
          </p>
        </div>

        <div className="flex gap-1 items-center pt-2 md:pt-6 text-yellow-500">
          {[...Array(5)].map((_, index) => (
            <Star key={index} className="w-6 h-6 fill-yellow-400" />
          ))}
        </div>
      </div>
    </Card>
  );
}

export default RateCard;
