interface JourneyImage {
    image?: string | null;
    image_alt?: unknown;
    caption?: unknown;
}

export interface AboutJourneyData {
    title?: unknown;
    intro?: unknown;
    images: JourneyImage[];
}
