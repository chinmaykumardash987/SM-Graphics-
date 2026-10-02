// Portfolio Data for SM Graphics
// Easy to update: simply add, edit or replace images and details below.

import digitalSample from '../assets/images/digital_printing_sample_1790824885908.jpg';
import flexBanner from '../assets/images/flex_banner_signage_1790824898075.jpg';
import stationeryMockup from '../assets/images/stationery_mockup_1790824909500.jpg';
import workshopImg from '../assets/images/cuttack_studio_workshop_1790824922488.jpg';
import heroPress from '../assets/images/hero_printing_facility_1790824873591.jpg';
import smLogoImg from '../assets/images/sm_graphics_logo_1790931105985.jpg';
import smStorefrontOffice from '../assets/images/sm_storefront_office_1790931467068.jpg';
import smFactoryOverview from '../assets/images/sm_factory_overview_1790931485590.jpg';
import smFlexPressAction from '../assets/images/sm_flex_press_action_1790931498880.jpg';
import smPromotionalCanopy from '../assets/images/sm_promotional_canopy_1790931543423.jpg';
import smRollupStandee from '../assets/images/sm_rollup_standee_1790931570729.jpg';

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Flex Banners' | 'Visiting Cards' | 'Brochures' | 'Letterheads' | 'Invitations' | 'Signage';
  image: string;
  description: string;
  specs: string;
}

export const portfolioCategories = [
  'All',
  'Flex Banners',
  'Visiting Cards',
  'Brochures',
  'Letterheads',
  'Invitations',
  'Signage'
] as const;

export type CategoryFilter = typeof portfolioCategories[number];

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'sm-storefront-cda',
    title: 'SM Graphics Office & Showroom at Minerva Complex',
    category: 'Signage',
    image: smStorefrontOffice,
    description: 'Our customer consultation office and reception at Minerva Complex, CDA Sector-9, Cuttack. Featuring custom ACP & LED boards, vinyl printing panels, and glow signboards.',
    specs: 'ACP & LED Acrylic Boards · Vinyl Glass Graphics · Minerva Complex CDA Sec-9'
  },
  {
    id: 'sm-factory-overview-banner',
    title: 'SM Graphics — A Complete Printing Factory',
    category: 'Flex Banners',
    image: smFactoryOverview,
    description: 'Commercial facility banner detailing our industrial flex printing, glow sign boards, digital printing, visiting cards, ACP & LED boards, photo shoots, and vinyl print solutions.',
    specs: 'Heavy Duty Frontlit Star Flex · True CMYK Output · CDA Sector-9 Cuttack'
  },
  {
    id: 'sm-flex-press-action',
    title: 'High-Speed Large-Format Flex Printing Press',
    category: 'Flex Banners',
    image: smFlexPressAction,
    description: 'Active production on our roll-to-roll industrial flex printer, delivering vivid, weather-resistant political, event, and commercial advertising banners.',
    specs: 'Roll-to-Roll Industrial Press · Eco-Solvent Waterproof Inks · 1440 DPI'
  },
  {
    id: 'sm-promotional-canopy-tent',
    title: 'Promotional Pop-Up Advertising Canopy Tent',
    category: 'Signage',
    image: smPromotionalCanopy,
    description: 'Outdoor corporate promotional canopy pop-up tent fabricated for corporate campaigns, insurance drives, product roadshows, and field activations in Odisha.',
    specs: 'Weatherproof Heavy Flex Fabric · 6x6 & 8x8 ft Powder-Coated Steel Frame'
  },
  {
    id: 'sm-rollup-standee',
    title: 'Retractable Pull-Up Roll-Up Standee Display',
    category: 'Signage',
    image: smRollupStandee,
    description: 'Full-color promotional exhibition roll-up standee banner printed on non-tear satin media with sturdy aluminum pull-up base.',
    specs: '6x2.5 ft Non-Tear Satin Media · Lightweight Aluminum Base with Carry Bag'
  },
  {
    id: 'sm-logo-identity',
    title: 'Official SM Graphics 3D Emblem & Signage Badge',
    category: 'Signage',
    image: smLogoImg,
    description: 'Custom 3D embossed golden brand emblem for SM Graphics with high-gloss black acrylic substrate, metallic gold lettering, and precision contour finishing.',
    specs: 'Gloss Acrylic & Golden Mirror Finish · Laser Cut 3D Lettering'
  },
  {
    id: 'flex-banner-1',
    title: 'Outdoor Commercial Frontlit Flex Banner',
    category: 'Flex Banners',
    image: flexBanner,
    description: 'Heavy-duty 440 GSM star flex banner printed with eco-solvent waterproof inks for high outdoor durability.',
    specs: '440 GSM Star Flex · UV & Weather Proof · High DPI Output'
  },
  {
    id: 'visiting-card-1',
    title: 'Velvet Matte Premium Visiting Cards',
    category: 'Visiting Cards',
    image: stationeryMockup,
    description: '350 GSM art card with thermal matte lamination and spot UV detailing for an unmistakable executive feel.',
    specs: '350 GSM Board · Velvet Touch Lamination · Die Cut Finish'
  },
  {
    id: 'brochure-1',
    title: 'Multi-fold Tri-Fold Corporate Brochure',
    category: 'Brochures',
    image: digitalSample,
    description: 'High-definition digital multi-colour offset-quality tri-fold brochures for corporate and educational events.',
    specs: '170 GSM Gloss Art Paper · Creased Folding · True CMYK'
  },
  {
    id: 'signage-1',
    title: 'Glow Sign Board & Backlit Hoarding Display',
    category: 'Signage',
    image: flexBanner,
    description: 'Vibrant backlit vinyl signage mounted on sturdy metal structure for 24/7 commercial brand visibility.',
    specs: 'Backlit Translucent Media · LED Illumination Compatible · Heavy Frame'
  },
  {
    id: 'letterhead-1',
    title: 'Official Corporate Letterheads & Envelopes',
    category: 'Letterheads',
    image: stationeryMockup,
    description: '100 GSM executive bond paper with laser-printer friendly inks and crisp crest reproduction.',
    specs: '100 GSM Royal Bond · Sharp Vector Micro-Typography'
  },
  {
    id: 'invitations-1',
    title: 'Festive & Premium Wedding Invitation Cards',
    category: 'Invitations',
    image: digitalSample,
    description: 'Bespoke invitation printing with metallic foil accents, textured virgin board, and custom design layouts.',
    specs: '300 GSM Textured Board · Gold Foil Accent · Custom Envelopes'
  },
  {
    id: 'flex-hoarding-2',
    title: 'Large Format CDA Commercial Hoarding',
    category: 'Flex Banners',
    image: workshopImg,
    description: 'Seamless large-format print for city roadside hoardings and festival promotional campaigns in Cuttack.',
    specs: 'Large Scale Seamless Seaming · Vibrant Fade-Resistant Inks'
  },
  {
    id: 'signage-2',
    title: 'Retail Shop Standee & Directional Signboard',
    category: 'Signage',
    image: heroPress,
    description: 'Roll-up pull-up standees with aluminum base for storefront promotions, exhibition stalls, and announcements.',
    specs: 'Tear-Resistant Satin Media · Portable Aluminum Base'
  }
];
