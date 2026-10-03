// Portfolio Data for SM Graphics — Featuring Original Images & Real Production Work in Cuttack
import smStorefrontOffice from '../assets/images/sm_storefront_office_1790931467068.jpg';
import smFactoryOverview from '../assets/images/sm_factory_overview_1790931485590.jpg';
import smFlexPressAction from '../assets/images/sm_flex_press_action_1790931498880.jpg';
import smRollupStandee from '../assets/images/sm_rollup_standee_1790931570729.jpg';
import smDigitalPressSample from '../assets/images/sm_digital_press_sample_1791040402535.jpg';
import smCommercialPoster from '../assets/images/sm_commercial_poster_1791040422537.jpg';
import smStageEventSignage from '../assets/images/sm_stage_event_signage_1791040439493.jpg';
import smFestivalBackdropCuttack from '../assets/images/sm_festival_backdrop_cuttack_1791040458012.jpg';
import smLogoImg from '../assets/images/sm_graphics_logo_1790931105985.jpg';

import digitalSample from '../assets/images/digital_printing_sample_1790824885908.jpg';
import stationeryMockup from '../assets/images/stationery_mockup_1790824909500.jpg';

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Flex Banners' | 'Visiting Cards' | 'Brochures' | 'Letterheads' | 'Invitations' | 'Signage';
  image: string;
  description: string;
  specs: string;
  isRealFacilityPhoto: boolean;
  badgeLabel: 'Original SM Graphics Work' | 'Actual Facility Photo' | 'Demonstration Design';
}

export const portfolioCategories = [
  'All',
  'Flex Banners',
  'Signage',
  'Brochures',
  'Visiting Cards',
  'Letterheads',
  'Invitations'
] as const;

export type CategoryFilter = typeof portfolioCategories[number];

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'sm-storefront-cda',
    title: 'SM Graphics Office & Showroom at Minerva Complex',
    category: 'Signage',
    image: smStorefrontOffice,
    description: 'Our physical customer consultation office, reception, and showroom at Minerva Complex, CDA Sector-9, Cuttack. Featuring custom ACP & LED display boards, vinyl printing panels, and glow signboards.',
    specs: 'Minerva Complex CDA Sec-9 · ACP & LED Display · Central Cuttack Hub',
    isRealFacilityPhoto: true,
    badgeLabel: 'Actual Facility Photo'
  },
  {
    id: 'sm-flex-press-action',
    title: 'Industrial Large-Format Flex Printing Press in Action',
    category: 'Flex Banners',
    image: smFlexPressAction,
    description: 'Active production on our roll-to-roll industrial flex printer at SM Graphics workshop in Cuttack, delivering high-speed, weather-resistant commercial and event banners.',
    specs: 'Roll-to-Roll Industrial Press · Eco-Solvent Waterproof Inks · 1440 DPI Precision',
    isRealFacilityPhoto: true,
    badgeLabel: 'Original SM Graphics Work'
  },
  {
    id: 'sm-factory-overview-banner',
    title: 'SM Graphics — A Complete Printing Factory Board',
    category: 'Flex Banners',
    image: smFactoryOverview,
    description: 'Official production capabilities board highlighting our flex printing, glow signboards, digital printing, visiting cards, photo shoots, ACP & LED boards, and vinyl printing.',
    specs: 'Full-Scale Print Capabilities · CDA Sector-9 Cuttack · Heavy Star Flex',
    isRealFacilityPhoto: true,
    badgeLabel: 'Original SM Graphics Work'
  },
  {
    id: 'sm-stage-event-signage',
    title: 'Odisha State Film & Cultural Awards Event Stage Signage',
    category: 'Signage',
    image: smStageEventSignage,
    description: 'Grand live cultural awards ceremony stage production in Odisha, featuring large-format backdrop prints, illuminated digital LED screen enclosures, podium branding, and decorative stage pillars.',
    specs: 'Live Event Production · Multi-Display LED & Stage Backdrops · Odisha State Event',
    isRealFacilityPhoto: true,
    badgeLabel: 'Original SM Graphics Work'
  },
  {
    id: 'sm-festival-backdrop-cuttack',
    title: '25th Raja Mahotsaba Silver Jubilee Backdrop at Saheed Bhawan',
    category: 'Flex Banners',
    image: smFestivalBackdropCuttack,
    description: 'Large-scale outdoor cultural festival flex backdrop designed and printed for Soor Mandir’s 25th Raja Mahotsaba at Saheed Bhawan, Cuttack, featuring traditional Odia festival artwork and photo booth layout.',
    specs: 'Saheed Bhawan Cuttack · Large-Format Event Flex Backdrop · Festival Stage Design',
    isRealFacilityPhoto: true,
    badgeLabel: 'Original SM Graphics Work'
  },
  {
    id: 'sm-commercial-poster',
    title: 'SM Graphics Official Flex Printing Showcase Poster',
    category: 'Flex Banners',
    image: smCommercialPoster,
    description: 'Commercial promotional flex print showcase for SM Graphics, detailing comprehensive printing services including Flex Board, Vinyl Print, Glow Signs, Retro Print, LED Board, and ACP Boards.',
    specs: 'Flex Board · Vinyl Print · Glow Sign · Retro & ACP LED · Minerva Complex CDA-9',
    isRealFacilityPhoto: true,
    badgeLabel: 'Original SM Graphics Work'
  },
  {
    id: 'sm-rollup-standee',
    title: 'Commercial Exhibition & Retail Roll-Up Standees Production',
    category: 'Signage',
    image: smRollupStandee,
    description: 'Completed production batch of high-impact promotional roll-up pull-up standees in our workshop, printed on non-tear satin media with sturdy aluminum bases for corporate campaigns.',
    specs: 'Non-Tear Satin Media · Roll-Up Aluminum Mechanism · Workshop Batch Production',
    isRealFacilityPhoto: true,
    badgeLabel: 'Original SM Graphics Work'
  },
  {
    id: 'sm-digital-press-sample',
    title: 'VersaEXPRESS RF-640 High-Precision Digital Roll Output',
    category: 'Brochures',
    image: smDigitalPressSample,
    description: 'High-definition digital roll test print on our Roland VersaEXPRESS RF-640 press, demonstrating vivid CMYK saturation, sharp micro-gradients, and photo-realistic detail.',
    specs: 'Roland VersaEXPRESS RF-640 · High-Density Inks · Photographic Color Fidelity',
    isRealFacilityPhoto: true,
    badgeLabel: 'Original SM Graphics Work'
  },
  {
    id: 'sm-logo-identity',
    title: 'Official SM Graphics 3D Emblem & Signage Badge',
    category: 'Signage',
    image: smLogoImg,
    description: 'Custom 3D embossed golden brand emblem for SM Graphics with high-gloss black acrylic substrate, metallic gold lettering, and precision contour finishing.',
    specs: 'Gloss Acrylic & Golden Mirror Finish · Laser Cut 3D Detailing',
    isRealFacilityPhoto: true,
    badgeLabel: 'Actual Facility Photo'
  },
  {
    id: 'sample-visiting-cards',
    title: 'Executive Visiting Cards with Velvet Matte Finish',
    category: 'Visiting Cards',
    image: stationeryMockup,
    description: '350 GSM premium imported art card stock with soft-touch thermal matte lamination, spot UV detailing, and precision die-cut corners for corporate leadership.',
    specs: '350 GSM Imported Board · Velvet Touch Lamination · Die-Cut Edge Finish',
    isRealFacilityPhoto: false,
    badgeLabel: 'Demonstration Design'
  },
  {
    id: 'sample-brochure',
    title: 'High-Definition Multi-Fold Corporate Brochures',
    category: 'Brochures',
    image: digitalSample,
    description: 'High-definition multi-page and tri-fold corporate marketing brochures printed with calibrated digital offset fidelity and crisp micro-typography.',
    specs: '170 GSM Gloss Art Paper · Precision Creased Folding · True CMYK Output',
    isRealFacilityPhoto: false,
    badgeLabel: 'Demonstration Design'
  },
  {
    id: 'sample-letterhead',
    title: 'Official Corporate Letterheads & Executive Envelopes',
    category: 'Letterheads',
    image: stationeryMockup,
    description: '100 GSM executive bond paper with crisp vector crest reproduction, compatible with all office laser and desktop inkjet printers.',
    specs: '100 GSM Royal Bond Paper · Crisp Vector Reproduction · Watermarked Finish',
    isRealFacilityPhoto: false,
    badgeLabel: 'Demonstration Design'
  },
  {
    id: 'sample-invitations',
    title: 'Bespoke Wedding & Milestone Event Invitation Cards',
    category: 'Invitations',
    image: digitalSample,
    description: 'Bespoke invitation printing with metallic foil accents, textured virgin board, and custom design layouts for personal celebrations.',
    specs: '300 GSM Textured Board · Metallic Accents · Bespoke Envelopes',
    isRealFacilityPhoto: false,
    badgeLabel: 'Demonstration Design'
  }
];
