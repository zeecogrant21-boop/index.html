/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Licensed Exclusively to Zeeco Grant (ZG Personal AI)
 */

export interface CoffeeEstateInfo {
  id: string;
  name: string;
  parish: string;
  elevationFeet: string;
  elevationMeters: string;
  foundedYear: string;
  founderOrOwner: string;
  currentStatus: string;
  varietiesCultivated: string[];
  signatureFlavorNotes: string[];
  historicalHighlights: string;
  processingFacility: string;
}

export interface CoffeeProcessStep {
  stepNumber: number;
  phase: string;
  title: string;
  description: string;
  duration: string;
  crucialParameters: string;
  traditionalMethod: string;
}

export const JAMAICA_COFFEE_ESTATES: CoffeeEstateInfo[] = [
  {
    id: 'mavis_bank',
    name: 'Mavis Bank Coffee Factory & Estate',
    parish: 'St. Andrew',
    elevationFeet: '3,000 – 4,200 ft',
    elevationMeters: '915 – 1,280 m',
    foundedYear: '1920',
    founderOrOwner: 'Founded by Victor C. Munn; historically guided by Keble Munn; Producer of Jablum',
    currentStatus: 'Active & Premier Processing Hub',
    varietiesCultivated: ['Typica (100% Arabica)', 'Select Bourbon'],
    signatureFlavorNotes: ['Silky milk chocolate', 'Brown sugar sweetness', 'Mild floral jasmine', 'Zero bitterness'],
    historicalHighlights: 'Established in the Yallahs Valley, Mavis Bank is the largest and most famous central washing and processing station for smallholder farmers across the Blue Mountain range. Renowned worldwide for the Jablum label.',
    processingFacility: 'Mavis Bank Central Wet & Dry Mill, Yallahs River spring water washing'
  },
  {
    id: 'clifton_mount',
    name: 'Clifton Mount Estate',
    parish: 'St. Andrew',
    elevationFeet: '4,300 – 5,000 ft',
    elevationMeters: '1,310 – 1,524 m',
    foundedYear: '1750',
    founderOrOwner: 'Founded by Robert Hamilton; stewarded by the Sharp Family (Export Pioneer)',
    currentStatus: 'Active Single Estate (Rainforest Alliance Certified)',
    varietiesCultivated: ['100% Arabica Typica', 'Geisha Micro-Lots'],
    signatureFlavorNotes: ['Delicate orange blossom', 'Candied walnut', 'Cocoa nibs', 'Velvety cream finish'],
    historicalHighlights: 'The oldest functioning coffee estate in Jamaica, founded in 1750 during the British colonial plantation era. Situated on the slopes of Mount Catherine, Clifton Mount is internationally celebrated for single-estate traceability.',
    processingFacility: 'On-site ecological wet mill and heritage concrete sun barbecues'
  },
  {
    id: 'wallenford',
    name: 'Wallenford Coffee Estate',
    parish: 'Portland / St. Andrew',
    elevationFeet: '3,500 – 4,500 ft',
    elevationMeters: '1,067 – 1,372 m',
    foundedYear: 'Late 1780s',
    founderOrOwner: 'Historic British Crown Grant; now owned by Portland Holdings / Wallenford Limited',
    currentStatus: 'Active & Historic Global Exporter',
    varietiesCultivated: ['Arabica Typica', 'Blue Mountain Geisha'],
    signatureFlavorNotes: ['Nutty almond', 'Dark cocoa', 'Bright citrus mandarin', 'Subtle cedar undertone'],
    historicalHighlights: 'One of the most famous heritage brand names in global specialty coffee. Wallenford coffee was among the very first coffees shipped to the royal houses of Europe in the 19th century.',
    processingFacility: 'Wallenford Wet Station and Central Kingston Dry Mill'
  },
  {
    id: 'craighton_estate',
    name: 'Craighton Estate',
    parish: 'St. Andrew (Irish Town)',
    elevationFeet: '2,600 – 3,200 ft',
    elevationMeters: '792 – 975 m',
    foundedYear: '1805',
    founderOrOwner: 'Historic 1805 Great House; owned by Ueshima Coffee Company (UCC Japan)',
    currentStatus: 'Active Model Farm & Heritage Tourism Site',
    varietiesCultivated: ['Arabica Typica', 'Caturra'],
    signatureFlavorNotes: ['Sweet honey', 'Crisp green apple', 'Milk chocolate', 'Gentle herb complexity'],
    historicalHighlights: 'The 1805 Georgian great house once served as the summer residence of Jamaican governors. Acquired by UCC in 1981, Craighton helped solidify Japan as the purchaser of 70%+ of Jamaica Blue Mountain exports.',
    processingFacility: 'Craighton micro-depulper and UCC Central Mill'
  },
  {
    id: 'old_tavern',
    name: 'Old Tavern Coffee Estate',
    parish: 'Portland / Blue Mountain Peak slopes',
    elevationFeet: '4,000 – 4,800 ft',
    elevationMeters: '1,219 – 1,463 m',
    foundedYear: '1968',
    founderOrOwner: 'Pioneered and built by Alex Twyman; managed by the Twyman family',
    currentStatus: 'Active Single-Estate Artisan Roaster',
    varietiesCultivated: ['100% High Altitude Arabica Typica'],
    signatureFlavorNotes: ['Rich berry fruitiness', 'Dark baker chocolate', 'Floral jasmine', 'Exquisite balance'],
    historicalHighlights: 'Alex Twyman defied traditional centralized monopoly mills by obtaining special governmental rights to pulper, ferment, dry, and estate-roast his own crop right on the mountain slopes, pioneering artisan single-estate packaging.',
    processingFacility: 'Complete on-estate artisan wet mill and barrel aging room'
  },
  {
    id: 'flamstead_estate',
    name: 'Flamstead Estate',
    parish: 'St. Andrew',
    elevationFeet: '3,300 – 3,800 ft',
    elevationMeters: '1,006 – 1,158 m',
    foundedYear: '1764',
    founderOrOwner: 'Founded by British planters; historically famous for naval signaling; managed by Sharp Family',
    currentStatus: 'Active Premium Estate',
    varietiesCultivated: ['Arabica Typica'],
    signatureFlavorNotes: ['Toasted hazelnut', 'Milk caramel', 'Mild Meyer lemon', 'Silky body'],
    historicalHighlights: 'Perched high in the mist above Kingston, Flamstead was historically used in the 18th century as a naval semaphore signaling point to Port Royal, alongside producing award-winning coffee.',
    processingFacility: 'Clifton Mount / Flamstead Integrated Washing Facility'
  },
  {
    id: 'clydesdale_estate',
    name: 'Clydesdale Coffee Estate',
    parish: 'St. Andrew',
    elevationFeet: '3,000 – 3,700 ft',
    elevationMeters: '914 – 1,128 m',
    foundedYear: '1800',
    founderOrOwner: 'Founded by Dr. Colin McClarty; historic waterwheel and drying barbecues',
    currentStatus: 'Heritage Historic Landmark & Regional Brand Source',
    varietiesCultivated: ['Arabica Typica'],
    signatureFlavorNotes: ['Classic cocoa', 'Light spice', 'Clean cedar', 'Sweet cane finish'],
    historicalHighlights: 'Dr. Colin McClarty established Clydesdale as one of the premier 19th-century Jamaican estates. Its historic waterwheel and massive stone barbecues in the Clydesdale National Forest reserve remain monumental artifacts of industrial heritage.',
    processingFacility: 'Heritage stone barbecues; modernized regional collection'
  },
  {
    id: 'abbey_green',
    name: 'Abbey Green Estate',
    parish: 'St. Thomas / Portland Border',
    elevationFeet: '4,500 – 5,500 ft',
    elevationMeters: '1,372 – 1,676 m',
    foundedYear: 'Early 19th Century',
    founderOrOwner: 'Historic high-altitude estate at the Blue Mountain Peak trailhead',
    currentStatus: 'Active Extreme-Altitude Farm',
    varietiesCultivated: ['High Altitude Arabica Typica'],
    signatureFlavorNotes: ['Intense floral aromatics', 'Subtle blueberry', 'Crisp citrus', 'Dense velvety mouthfeel'],
    historicalHighlights: 'Abbey Green is the highest commercial coffee cultivation zone in Jamaica, located right along the hiking trail to Blue Mountain Peak. The extreme altitude slows cherry ripening to over 10 months, concentrating sugars.',
    processingFacility: 'High-altitude micro-washing station and mountain spring tanks'
  },
  {
    id: 'radnor_estate',
    name: 'Radnor Estate',
    parish: 'St. Thomas',
    elevationFeet: '3,200 – 4,000 ft',
    elevationMeters: '975 – 1,219 m',
    foundedYear: '1830s',
    founderOrOwner: 'Historic southern slopes plantation',
    currentStatus: 'Active Farm & Smallholder Source',
    varietiesCultivated: ['Arabica Typica'],
    signatureFlavorNotes: ['Milk chocolate', 'Roasted almond', 'Sweet tobacco leaf'],
    historicalHighlights: 'Located on the southern slopes of the Blue Mountains, Radnor benefits from morning Caribbean sun followed by afternoon cloud cover.',
    processingFacility: 'Regional wet pulping depot'
  },
  {
    id: 'moy_hall',
    name: 'Moy Hall Estate',
    parish: 'St. Thomas',
    elevationFeet: '3,000 – 3,800 ft',
    elevationMeters: '914 – 1,158 m',
    foundedYear: '1820s',
    founderOrOwner: 'Scottish colonial planters',
    currentStatus: 'Historic Estate & Farming District',
    varietiesCultivated: ['Arabica Typica'],
    signatureFlavorNotes: ['Rich caramel', 'Cacao', 'Smooth malt'],
    historicalHighlights: 'Historic Scottish-founded estate in St. Thomas, known for stone barbecues and cold-water mountain stream fermentation.',
    processingFacility: 'Moy Hall cooperative wet station'
  },
  {
    id: 'baronhall_estate',
    name: 'Baronhall Estate',
    parish: 'Clarendon',
    elevationFeet: '2,000 – 2,800 ft',
    elevationMeters: '610 – 853 m',
    foundedYear: 'Late 19th Century',
    founderOrOwner: 'Minott Family stewardship',
    currentStatus: 'Active (Premier High Mountain Estate)',
    varietiesCultivated: ['Arabica Typica', 'Bourbon', 'Caturra'],
    signatureFlavorNotes: ['Full body', 'Roasted pecan', 'Dark chocolate', 'Low acidity'],
    historicalHighlights: 'While situated outside the strictly demarcated Blue Mountain boundary, Baronhall is Jamaica’s premier High Mountain Arabica estate, producing deeply rich, full-bodied coffee.',
    processingFacility: 'Baronhall Estate Mills'
  }
];

export const COFFEE_PROCESSING_CYCLE: CoffeeProcessStep[] = [
  {
    stepNumber: 1,
    phase: 'Propagation & Sloped Planting',
    title: 'Nursery Cultivation & Terracing',
    description: 'Seeds of 100% Coffea Arabica var. Typica are germinated in sand beds, transferred into nursery poly-bags for 6-9 months, and planted on terraced 30°-50° mountain slopes between 3,000 and 5,500 feet elevation.',
    duration: '6 – 9 Months in Nursery; 3–4 Years to First Harvest',
    crucialParameters: 'Elevation > 3,000 ft, rich volcanic and shale soil, pH 5.0–6.0, mist canopy.',
    traditionalMethod: 'Hand-dug contour terraces along steep Blue Mountain ridges.'
  },
  {
    stepNumber: 2,
    phase: 'Selective Hand-Harvesting',
    title: 'Cherry Picking at Peak Ripeness',
    description: 'Experienced Jamaican pickers traverse sheer mountain ridges with waist baskets, hand-selecting only fully ripe crimson-red cherries. Green or overripe cherries are strictly rejected.',
    duration: 'Harvest runs August through March depending on elevation',
    crucialParameters: 'Sugar content (Brix 18°–22°), zero defect unripe cherries.',
    traditionalMethod: 'Manual hand-picking in traditional wicker or canvas baskets.'
  },
  {
    stepNumber: 3,
    phase: 'Wet Pulping',
    title: 'Same-Day De-Pulping',
    description: 'Cherries must be pulped within 24 hours of harvest to prevent spontaneous sour fermentation. Mechanical pulpers strip the outer red skin and fruit pulp, leaving parchment beans coated in mucilage.',
    duration: 'Under 24 Hours Post-Harvest',
    crucialParameters: 'Immediate processing, pure mountain spring water flow.',
    traditionalMethod: 'Gravity-fed pulpers powered by mountain stream diversions.'
  },
  {
    stepNumber: 4,
    phase: 'Fermentation & Washing',
    title: 'Mucilage Breakdown & Pure Spring Rinse',
    description: 'Parchment beans soak in concrete fermentation tanks for 12 to 24 hours. Natural enzymes break down the sticky pectin mucilage layer. The coffee is then thoroughly washed with pristine Blue Mountain spring water.',
    duration: '12 – 24 Hours Fermentation',
    crucialParameters: 'Complete pectin removal, clean tactile "pebble crunch" test.',
    traditionalMethod: 'Concrete washing canals with wooden paddles.'
  },
  {
    stepNumber: 5,
    phase: 'Sun-Drying on Barbecues',
    title: 'Barbecue Raking to Precise 11.5% Moisture',
    description: 'The wet parchment coffee is spread across massive concrete barbecues (drying patios). Workers rake the beans continuously every 30-45 minutes from sunrise to sunset to ensure uniform drying until moisture reaches precisely 11.5% - 12.5%.',
    duration: '5 – 10 Days of Natural Sunlight',
    crucialParameters: 'Moisture target: exactly 11.5% – 12.5% (strictly verified by JACRA).',
    traditionalMethod: 'Historic concrete "barbecues" raked with wooden tooth rakes, covered before evening mists.'
  },
  {
    stepNumber: 6,
    phase: 'Conditioning / Repos',
    title: 'Resting in Wood Silos (Repos)',
    description: 'Drying parchment is placed in breathable burlap sacks or wooden cedar/aspen bins in climate-controlled resting rooms for 8 to 12 weeks. This resting phase stabilizes moisture, hardens the bean, and matures the flavor precursors.',
    duration: '8 – 12 Weeks (Crucial Resting Phase)',
    crucialParameters: 'Stable humidity (60%-65%), cool mountain ambient temperature.',
    traditionalMethod: 'Wooden silos at Mavis Bank and Wallenford.'
  },
  {
    stepNumber: 7,
    phase: 'Dry Milling & Hulling',
    title: 'De-Hulling Parchment & Silverskin Removal',
    description: 'The rested parchment (pergamino) is fed into hulling machines that gently crack and strip the brittle protective outer parchment shell and polish away the inner silverskin, revealing the dense blue-green raw coffee beans.',
    duration: '1 – 2 Days Before Grading',
    crucialParameters: 'Zero bean breakage, complete parchment separation.',
    traditionalMethod: 'Impact hullers and air aspiration blowers.'
  },
  {
    stepNumber: 8,
    phase: 'Density & Size Grading',
    title: 'Screen Sizing & Gravity Separation',
    description: 'Beans are passed through vibrating perforated metal screens to separate by bean size: Screen 18+ (Grade 1), Screen 17 (Grade 2), Screen 16 (Grade 3), and Peaberry (single round oval bean formed in cherry).',
    duration: 'Continuous Machine Operation',
    crucialParameters: 'Grade 1: Screen size 17/18 with < 2% minor defects.',
    traditionalMethod: 'Vibrating gravity tables and mechanical screen shakers.'
  },
  {
    stepNumber: 9,
    phase: 'Hand Sorting & Defect Elimination',
    title: 'Manual Table Sorting',
    description: 'Every single lot of Jamaica Blue Mountain coffee is hand-inspected across sorting conveyors by expert Jamaican women sorters. Any discolored, chipped, insect-bitten, or deformed beans are picked out individually.',
    duration: 'Meticulous Hand Inspection',
    crucialParameters: 'Strictly zero major defects, uniform blue-green color.',
    traditionalMethod: 'Conveyor belts with skilled manual hand sorters.'
  },
  {
    stepNumber: 10,
    phase: 'JACRA Cupping & Certification',
    title: 'Official Government Cupping & Seal',
    description: 'Samples from every batch are delivered to the Jamaica Agricultural Commodities Regulatory Authority (JACRA) laboratory. Certified Q-graders cup, score, and verify authentic Blue Mountain flavor, body, and aroma.',
    duration: '24 – 48 Hours Lab Evaluation',
    crucialParameters: 'Score > 84 points, characteristic mild sweet profile, zero off-flavors.',
    traditionalMethod: 'Blind statutory cupping by JACRA chief tasters.'
  },
  {
    stepNumber: 11,
    phase: 'Aspen Wood Barrelling',
    title: 'Packaging in Handmade Aspen Barrels',
    description: 'Unlike virtually all other world coffees shipped in 60kg jute bags, authentic certified Jamaica Blue Mountain Coffee is packed in handmade Aspen wood barrels (15kg, 30kg, and 70kg). The odorless aspen wood preserves moisture equilibrium.',
    duration: 'Final Packaging Prior to Export',
    crucialParameters: 'Official green JACRA lead seal and numbered certificate.',
    traditionalMethod: 'Traditional coopers assembling aspen staves and metal hoops.'
  },
  {
    stepNumber: 12,
    phase: 'Artisan Roasting',
    title: 'Medium City Roast Profile',
    description: 'Roasted to a Medium City Roast (internal bean temperature 415°F – 425°F) just past first crack. Dark roasting is avoided to preserve the delicate floral, milk chocolate, and hazelnut terroir.',
    duration: '11 – 14 Minutes per Roast Batch',
    crucialParameters: 'First crack completed, smooth caramelization without surface oiliness.',
    traditionalMethod: 'Drum roasters with precision airflow and rapid cooling trays.'
  }
];

export const COFFEE_VARIETIES_DETAILS = [
  {
    variety: 'Coffea Arabica var. Typica',
    status: 'The Definitive Jamaican Blue Mountain Cultivar (Over 90% of plantings)',
    origin: 'Traced back to Yemen, brought to Jamaica in 1728 by Governor Sir Nicholas Lawes.',
    characteristics: 'Tall tree, elongated leaves with bronze tips, large oval cherries.',
    cupProfile: 'World-renowned for unmatched balance, natural cane sugar sweetness, chocolate undertones, delicate floral aroma, and zero astringency or bitterness.'
  },
  {
    variety: 'Coffea Arabica var. Geisha (Gesha)',
    status: 'Rare Micro-Lot Cultivar',
    origin: 'Originally from the Gesha village in Ethiopia, planted on select Blue Mountain estates like Clifton Mount.',
    characteristics: 'Slender branches, elongated seeds, highly aromatic.',
    cupProfile: 'Intense bergamot, jasmine tea, peach, and crisp tropical fruit acidity.'
  },
  {
    variety: 'Coffea Arabica var. Bourbon',
    status: 'Heritage Cultivar',
    origin: 'Developed on the island of Réunion (formerly Bourbon).',
    characteristics: 'High yield potential, rounder fruit, dense beans.',
    cupProfile: 'Rich caramel, complex sweetness, deep body with roasted nut finish.'
  },
  {
    variety: 'Peaberry (Caracol)',
    status: 'Natural Morphological Mutation (Approx 5% of harvest)',
    origin: 'Occurs naturally when one of the two seeds inside the coffee cherry fails to develop, creating a single rounded bean.',
    characteristics: 'Dense oval bean, rolls easily during roasting for exceptionally uniform heat transfer.',
    cupProfile: 'Intense aroma, concentrated chocolate and caramel body, highly prized by Japanese connoisseurs.'
  }
];
