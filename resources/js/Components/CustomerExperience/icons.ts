import { Leaf, Heart, HeartHandshake, Globe, Sparkles, Shield, Droplet, Flower2, GraduationCap, Star, type LucideIcon } from 'lucide-react';

/** Bảng biểu tượng dùng chung cho dải số liệu và khối "Vì sao khách hàng quay lại Mầm" — khớp options trong CustomerExperiencePageSettings. */
export const CUSTOMER_EXPERIENCE_ICON_MAP: Record<string, LucideIcon> = {
    leaf: Leaf,
    heart: Heart,
    'heart-hands': HeartHandshake,
    globe: Globe,
    sparkles: Sparkles,
    shield: Shield,
    droplet: Droplet,
    flower: Flower2,
    'graduation-cap': GraduationCap,
    star: Star,
};
