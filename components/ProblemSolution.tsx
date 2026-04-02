
import React, { useState, useRef } from 'react';

const TRUSTED_AVATARS = [
  { photo: '/images/reviews/jim.png', photoUrl: 'https://lh3.googleusercontent.com/a-/ALV-UjVXI1xISuQ9uw78RKbzdkXg-becvWAlBUQqujelsxhPBMYTvY2y=s400-c-rp-mo-br100', name: 'Jim' },
  { photo: '/images/reviews/andrea.png', photoUrl: 'https://lh3.googleusercontent.com/a-/ALV-UjVC1PTxpHRPSDmurmc-0LRhd3tpzJba78LDITDssOqLWHcNzGj3=s400-c-rp-mo-br100', name: 'Andrea' },
  { photo: '/images/reviews/chelsea.png', photoUrl: 'https://lh3.googleusercontent.com/a-/ALV-UjXvZ1Gpt_zdwtwhRboz_M7Ek_RmTh2V5XnRgYWXIik5Lpcgqj5icA=s400-c-rp-mo-br100', name: 'Chelsea' },
  { photo: '/images/reviews/jamie.png', photoUrl: 'https://lh3.googleusercontent.com/a-/ALV-UjUiSzfAtkqhF9AYxOknG6IhHz_v3bLDLXJ_tPhhihlrJzpHK65QXA=s400-c-rp-mo-ba2-br100', name: 'Jamie' },
];

function TrustedAvatar({ photo, photoUrl, name }: { photo: string; photoUrl: string; name: string }) {
  const [src, setSrc] = useState(photo);
  const [showInitial, setShowInitial] = useState(false);
  const triedFallback = useRef(false);
  const onError = () => {
    if (!triedFallback.current) {
      setSrc(photoUrl);
      triedFallback.current = true;
    } else {
      setShowInitial(true);
    }
  };
  if (showInitial) {
    return (
      <div className="w-12 h-12 rounded-full border-2 border-brand-black ring-2 ring-brand-gray/50 flex-shrink-0 bg-brand-yellow/20 flex items-center justify-center text-brand-yellow font-bold text-sm">
        {name.charAt(0)}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt=""
      onError={onError}
      referrerPolicy="no-referrer"
      className="w-12 h-12 rounded-full border-2 border-brand-black object-cover ring-2 ring-brand-gray/50"
    />
  );
}

interface ProblemSolutionProps { city?: string; }
const ProblemSolution: React.FC<ProblemSolutionProps> = ({ city = 'Hamilton' }) => {
  return (
    <section className="bg-brand-dark py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-yellow/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 items-center lg:grid-cols-2">
          {/* Mobile order: 1 = headline+roads, 2 = box, 3 = quote. Desktop: col1 = 1+3, col2 = box */}
          <div className="reveal order-1 lg:col-start-1 lg:row-start-1 lg:flex lg:flex-col lg:justify-center">
            <h2 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8">
              Your Car is an Investment. <br />
              <span className="text-brand-yellow">Don't Let It Fade.</span>
            </h2>
            <p className="text-lg text-white/70 leading-relaxed">
              {`${city}'s roads are tough on your vehicle. From winter salt and road grime to UV damage and bird droppings, your paint is under constant attack.`}
            </p>
          </div>

          <div className="reveal order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-center space-y-8 bg-brand-gray/50 p-8 lg:p-12 border border-white/5 relative">
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-brand-yellow opacity-40"></div>
            
            <h3 className="font-display text-2xl font-bold text-white uppercase italic">The ShowRoom Switch</h3>
            <img
              src="/images/showroom-switch.png"
              alt="ShowRoom AutoCare team hand-washing a Porsche in a residential driveway"
              className="w-full rounded-lg border border-white/10 object-cover aspect-[4/3]"
            />
            <blockquote className="text-lg text-white/80 font-semibold italic">
              &ldquo;We treat every car we work on with the same level of care and attention to detail that we would give to our own cars.&rdquo;
            </blockquote>
            <p className="text-brand-yellow font-bold text-sm uppercase tracking-wider">
              — Nathan Leon & Will Youngberg
            </p>
            
            <div className="pt-4 flex items-center gap-6">
              <div className="flex -space-x-3">
                {TRUSTED_AVATARS.map((avatar, id) => (
                  <TrustedAvatar
                    key={id}
                    photo={avatar.photo}
                    photoUrl={avatar.photoUrl}
                    name={avatar.name}
                  />
                ))}
              </div>
              <span className="text-sm uppercase tracking-widest font-bold text-brand-yellow">Trusted by 200+ clients</span>
            </div>
          </div>

          <div className="reveal order-3 lg:col-start-1 lg:row-start-2">
            <p className="text-lg text-white/70 leading-relaxed border-l-4 border-brand-yellow pl-6 py-2 bg-brand-yellow/5">
              A simple car wash isn't enough to stop the oxidation and swirl marks that kill your resale value.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
