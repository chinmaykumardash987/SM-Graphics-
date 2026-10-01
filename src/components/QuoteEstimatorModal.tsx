import { useState } from 'react';
import { X, Calculator, ArrowRight, MessageSquare, Phone, Check, RefreshCw } from 'lucide-react';

interface QuoteEstimatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export function QuoteEstimatorModal({ isOpen, onClose, defaultService = 'Flex Banners' }: QuoteEstimatorModalProps) {
  if (!isOpen) return null;

  const [category, setCategory] = useState<'flex' | 'cards' | 'digital' | 'stationery'>(
    defaultService.toLowerCase().includes('card') ? 'cards' :
    defaultService.toLowerCase().includes('digital') ? 'digital' :
    defaultService.toLowerCase().includes('stationery') ? 'stationery' : 'flex'
  );

  // Flex state
  const [flexWidth, setFlexWidth] = useState<number>(6);
  const [flexHeight, setFlexHeight] = useState<number>(3);
  const [flexQuality, setFlexQuality] = useState<'normal' | 'star' | 'backlit'>('star');
  const [flexQuantity, setFlexQuantity] = useState<number>(1);

  // Visiting cards state
  const [cardQuantity, setCardQuantity] = useState<number>(500);
  const [cardFinish, setCardFinish] = useState<'matte' | 'gloss' | 'spot_uv'>('matte');

  // Digital print state
  const [digitalPages, setDigitalPages] = useState<number>(50);
  const [digitalType, setDigitalType] = useState<'color' | 'bw'>('color');
  const [paperGsm, setPaperGsm] = useState<'100' | '170' | '300'>('170');

  // Calculation helpers
  const calculateFlex = () => {
    const sqft = Math.max(1, flexWidth) * Math.max(1, flexHeight);
    const ratePerSqft = flexQuality === 'normal' ? 12 : flexQuality === 'star' ? 18 : 35;
    const total = sqft * ratePerSqft * flexQuantity;
    return {
      sqft: sqft * flexQuantity,
      estMin: Math.round(total * 0.95),
      estMax: Math.round(total * 1.05),
      turnaround: 'Same Day (2–4 Hours)'
    };
  };

  const calculateCards = () => {
    let base = cardQuantity === 100 ? 199 : cardQuantity === 500 ? 499 : cardQuantity === 1000 ? 850 : 1600;
    if (cardFinish === 'spot_uv') base += 350;
    return {
      estMin: Math.round(base * 0.95),
      estMax: Math.round(base * 1.05),
      turnaround: cardFinish === 'spot_uv' ? '48 Hours' : '24 Hours'
    };
  };

  const calculateDigital = () => {
    const rate = digitalType === 'bw' ? 2 : paperGsm === '300' ? 12 : paperGsm === '170' ? 8 : 5;
    const total = digitalPages * rate;
    return {
      estMin: Math.max(50, Math.round(total * 0.95)),
      estMax: Math.max(60, Math.round(total * 1.05)),
      turnaround: 'Ready in 1–2 Hours'
    };
  };

  const flexCalc = calculateFlex();
  const cardCalc = calculateCards();
  const digitalCalc = calculateDigital();

  const getWhatsAppMessage = () => {
    let summary = '';
    if (category === 'flex') {
      summary = `Flex Banner Order: ${flexWidth}x${flexHeight} ft (${flexCalc.sqft} sqft), ${flexQuality.toUpperCase()} Quality, Qty: ${flexQuantity}. Est: ₹${flexCalc.estMin} - ₹${flexCalc.estMax}`;
    } else if (category === 'cards') {
      summary = `Visiting Cards: ${cardQuantity} pcs, ${cardFinish.replace('_', ' ').toUpperCase()} Finish. Est: ₹${cardCalc.estMin} - ₹${cardCalc.estMax}`;
    } else {
      summary = `Digital Prints: ${digitalPages} Pages, ${digitalType.toUpperCase()}, ${paperGsm} GSM Paper. Est: ₹${digitalCalc.estMin} - ₹${digitalCalc.estMax}`;
    }
    return `Hello SM Graphics, I generated a quote estimate from your website:\n\n${summary}\n\nPlease confirm availability and details.`;
  };

  const whatsappUrl = `https://wa.me/919437390950?text=${encodeURIComponent(getWhatsAppMessage())}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-6 sm:p-8 overflow-hidden shadow-2xl z-10 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-600/20 border border-blue-500/30 text-cyan-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-heading text-white">
                Instant Print Rate Estimator
              </h3>
              <p className="text-xs text-slate-400">
                Transparent workshop pricing at CDA Sector-9, Cuttack
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close estimator modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Picker */}
        <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-950 rounded-xl border border-slate-800 mb-6">
          <button
            onClick={() => setCategory('flex')}
            className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              category === 'flex' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Flex Banners
          </button>
          <button
            onClick={() => setCategory('cards')}
            className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              category === 'cards' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Visiting Cards
          </button>
          <button
            onClick={() => setCategory('digital')}
            className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              category === 'digital' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Digital Prints
          </button>
        </div>

        {/* Dynamic Category Controls */}
        {category === 'flex' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Width (Feet)
                </label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={flexWidth}
                  onChange={(e) => setFlexWidth(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Height (Feet)
                </label>
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={flexHeight}
                  onChange={(e) => setFlexHeight(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1.5">
                Flex Material Grade
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'normal', label: 'Normal Flex', sub: 'Standard' },
                  { id: 'star', label: 'Star Flex', sub: 'Heavy 440 GSM' },
                  { id: 'backlit', label: 'Backlit Media', sub: 'Lightboard' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setFlexQuality(item.id as any)}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      flexQuality === item.id
                        ? 'bg-blue-950/60 border-blue-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold">{item.label}</div>
                    <div className="text-[10px] text-slate-500">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">
                Number of Banners
              </label>
              <input
                type="number"
                min={1}
                max={50}
                value={flexQuantity}
                onChange={(e) => setFlexQuantity(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
              />
            </div>
          </div>
        )}

        {category === 'cards' && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1.5">
                Quantity (Pieces)
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[100, 500, 1000, 2000].map((qty) => (
                  <button
                    key={qty}
                    onClick={() => setCardQuantity(qty)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      cardQuantity === qty
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {qty}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1.5">
                Finish & Coating
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'matte', label: 'Matte Laminated', desc: 'Sleek & glare-free' },
                  { id: 'gloss', label: 'Gloss Laminated', desc: 'Vibrant shine' },
                  { id: 'spot_uv', label: 'Spot UV Accent', desc: 'Embossed premium' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCardFinish(item.id as any)}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      cardFinish === item.id
                        ? 'bg-blue-950/60 border-blue-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold">{item.label}</div>
                    <div className="text-[10px] text-slate-500">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {category === 'digital' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Number of Pages
                </label>
                <input
                  type="number"
                  min={1}
                  max={5000}
                  value={digitalPages}
                  onChange={(e) => setDigitalPages(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Print Mode
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => setDigitalType('color')}
                    className={`py-2 text-xs font-bold rounded-lg border cursor-pointer ${
                      digitalType === 'color' ? 'bg-cyan-600 border-cyan-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    Colour
                  </button>
                  <button
                    onClick={() => setDigitalType('bw')}
                    className={`py-2 text-xs font-bold rounded-lg border cursor-pointer ${
                      digitalType === 'bw' ? 'bg-slate-800 border-slate-600 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    B&W
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1.5">
                Paper Thickness
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: '100', label: '100 GSM Bond', sub: 'Standard document' },
                  { id: '170', label: '170 GSM Art', sub: 'Flyers / Brochures' },
                  { id: '300', label: '300 GSM Board', sub: 'Certificates / Cards' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPaperGsm(item.id as any)}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      paperGsm === item.id
                        ? 'bg-blue-950/60 border-blue-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="font-bold">{item.label}</div>
                    <div className="text-[10px] text-slate-500">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Estimated Price Box */}
        <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Estimated Total:
            </span>
            <div className="text-right">
              <span className="text-2xl sm:text-3xl font-black font-heading text-cyan-400">
                ₹{category === 'flex' ? `${flexCalc.estMin} – ₹${flexCalc.estMax}` :
                   category === 'cards' ? `${cardCalc.estMin} – ₹${cardCalc.estMax}` :
                   `${digitalCalc.estMin} – ₹${digitalCalc.estMax}`}
              </span>
              <span className="text-[11px] text-slate-500 block">
                *Taxes & custom finishing may vary slightly
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
            <span className="text-slate-400">Estimated Turnaround:</span>
            <span className="font-bold text-emerald-400">
              {category === 'flex' ? flexCalc.turnaround :
               category === 'cards' ? cardCalc.turnaround :
               digitalCalc.turnaround}
            </span>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Order / Confirm on WhatsApp</span>
          </a>

          <a
            href="tel:9437390950"
            className="w-full sm:w-auto py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-cyan-400" />
            <span>Call 9437390950</span>
          </a>
        </div>
      </div>
    </div>
  );
}
