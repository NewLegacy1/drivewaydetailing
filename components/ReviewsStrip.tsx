import React, { useState, useRef } from 'react';

const REVIEWS = [
  {
    name: 'Jim',
    location: 'Mississauga',
    text: "Showroom AutoCare completed an In N' Out Detail of our two vehicles today. They were very good coordinating the date and time to do the work and showed up on time in a fully equipped van with everything needed for the work, including water. They were very polite, accommodating, worked diligently and paid attention to all the necessary details. In the end we had two beautiful looking vehicles, thoroughly cleaned and detailed inside and out. An excellent job! I highly recommend Baraa and Showroom Autocare.",
    photo: '/images/reviews/jim.png',
    photoUrl: 'https://lh3.googleusercontent.com/a-/ALV-UjVXI1xISuQ9uw78RKbzdkXg-becvWAlBUQqujelsxhPBMYTvY2y=s400-c-rp-mo-br100',
  },
  {
    name: 'Andrea',
    location: 'Ancaster',
    text: "They did an excellent job!!!! Very poliet and professional. Above average detailing. They were able to get kid stains out that I thought was not possible lol. I was so impressed that I'm going to use them every month or two to keep my vehicle clean. Also, bonus that they offer a mobile service, and they can come to you. Gives you the flexibility with scheduling.",
    photo: '/images/reviews/andrea.png',
    photoUrl: 'https://lh3.googleusercontent.com/a-/ALV-UjVC1PTxpHRPSDmurmc-0LRhd3tpzJba78LDITDssOqLWHcNzGj3=s400-c-rp-mo-br100',
  },
  {
    name: 'James',
    location: 'Hamilton',
    text: "I would definitely recommend using ShowRoom AutoCare for interior revival (detailing)! My husky does a number on my car and I cannot keep up with the vacuuming. These guys made it look brand new again after months of fur buildup! I will surely be a return customer. See before/after pics",
    photo: '/images/reviews/chelsea.png',
    photoUrl: 'https://lh3.googleusercontent.com/a-/ALV-UjXvZ1Gpt_zdwtwhRboz_M7Ek_RmTh2V5XnRgYWXIik5Lpcgqj5icA=s400-c-rp-mo-br100',
  },
  {
    name: 'Jamie',
    location: 'Mount Hope',
    text: "I can't recommend this car detailing company enough! After two young kids had thoroughly destroyed my car with crumbs, spills, and who knows what else, they came to my house and worked absolute magic. They spent extra time making sure every inch was spotless, going above and beyond to get my car looking brand new again. The convenience of having them come to me was a game changer, and their attention to detail was incredible. If you need a deep clean done right, these are the people to call! Thank you so much!",
    photo: '/images/reviews/jamie.png',
    photoUrl: 'https://lh3.googleusercontent.com/a-/ALV-UjUiSzfAtkqhF9AYxOknG6IhHz_v3bLDLXJ_tPhhihlrJzpHK65QXA=s400-c-rp-mo-ba2-br100',
  },
];

const CARD_WIDTH_PX = 320;
const SCROLL_DURATION_S = 45;

const CARD_GAP_PX = 24;

function ReviewCard({
  name,
  location,
  text,
  photo,
  photoUrl,
}: {
  name: string;
  location: string;
  text: string;
  photo: string;
  photoUrl: string;
}) {
  const [imgSrc, setImgSrc] = useState(photo);
  const [showInitial, setShowInitial] = useState(false);
  const triedFallback = useRef(false);

  const handleImgError = () => {
    if (!triedFallback.current) {
      setImgSrc(photoUrl);
      triedFallback.current = true;
    } else {
      setShowInitial(true);
    }
  };

  return (
    <div
      className="flex-shrink-0 w-[280px] sm:w-[320px] bg-brand-gray/40 border border-white/10 rounded-lg p-5 flex flex-col"
      style={{ minWidth: 280 }}
    >
      <div className="flex items-center gap-3 mb-3">
        {!showInitial ? (
          <img
            src={imgSrc}
            alt=""
            onError={handleImgError}
            referrerPolicy="no-referrer"
            className="w-12 h-12 rounded-full border-2 border-brand-yellow/50 object-cover flex-shrink-0 bg-brand-gray"
          />
        ) : (
          <div className="w-12 h-12 rounded-full border-2 border-brand-yellow/50 flex-shrink-0 bg-brand-yellow/20 flex items-center justify-center text-brand-yellow font-bold text-lg">
            {name.charAt(0)}
          </div>
        )}
        <div className="min-w-0">
          <p className="text-brand-yellow font-bold text-sm uppercase tracking-wider truncate">{name}</p>
          <p className="text-white/60 text-xs uppercase tracking-wider truncate">{location}</p>
        </div>
      </div>
      <p className="text-white/85 text-sm leading-relaxed flex-1 line-clamp-4">&ldquo;{text}&rdquo;</p>
    </div>
  );
}

const ReviewsStrip: React.FC = () => {
  const duplicated = [...REVIEWS, ...REVIEWS];
  const scrollDistance = REVIEWS.length * (CARD_WIDTH_PX + CARD_GAP_PX);

  return (
    <section className="bg-brand-black border-y border-white/10 py-8 overflow-hidden" aria-label="Customer reviews">
      <div className="relative">
        <div
          className="flex gap-6 w-max"
          style={{
            animation: `reviews-scroll ${SCROLL_DURATION_S}s linear infinite`,
          }}
        >
          {duplicated.map((r, i) => (
            <ReviewCard
              key={`${r.name}-${i}`}
              name={r.name}
              location={r.location}
              text={r.text}
              photo={r.photo}
              photoUrl={r.photoUrl}
            />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes reviews-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${scrollDistance}px); }
        }
      `}</style>
    </section>
  );
};

export default ReviewsStrip;
