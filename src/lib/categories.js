import {
  Umbrella,
  Ship,
  Mountain,
  Droplets,
  Leaf,
  Trees,
  Sailboat,
  Landmark,
  MapPin,
} from 'lucide-react';

export const CATEGORIES = [
  { value: 'beach', label: 'সমুদ্র সৈকত', icon: Umbrella },
  { value: 'island', label: 'দ্বীপ', icon: Ship },
  { value: 'hill', label: 'পাহাড়', icon: Mountain },
  { value: 'waterfall', label: 'ঝর্ণা', icon: Droplets },
  { value: 'tea-garden', label: 'চা বাগান', icon: Leaf },
  { value: 'forest', label: 'বন/অভয়ারণ্য', icon: Trees },
  { value: 'lake-river', label: 'হ্রদ ও নদী', icon: Sailboat },
  { value: 'heritage', label: 'ঐতিহাসিক/ধর্মীয় স্থান', icon: Landmark },
  { value: 'other', label: 'অন্যান্য', icon: MapPin },
];

export function getCategory(value) {
  return CATEGORIES.find(c => c.value === value) || null;
}
