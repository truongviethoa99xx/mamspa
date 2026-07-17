import { Flower2, Leaf } from 'lucide-react';
import { useLocale } from '@/Hooks/useLocale';
import { tr } from '@/Lib/utils';
import { SectionHeading } from './SectionHeading';
import type { AboutMissionVisionData } from './AboutMissionVision';
import type { AboutJourneyData } from './AboutJourney';

interface Props {
    missionVision: AboutMissionVisionData;
    journey: AboutJourneyData;
}

const stripTags = (html: string) => html.replace(/<[^>]+>/g, '');

/** "Our Mission & Vision" + "Our Journey" chung 1 hàng — col-4 / col-8. */
export function AboutMissionVisionJourney({ missionVision, journey }: Props) {
    const locale = useLocale();

    const mvTitle = tr(missionVision.title, locale);
    const missionTitle = tr(missionVision.mission.title, locale);
    const missionDesc = tr(missionVision.mission.description, locale);
    const visionTitle = tr(missionVision.vision.title, locale);
    const visionDesc = tr(missionVision.vision.description, locale);

    const journeyTitle = tr(journey.title, locale);
    const journeyIntro = tr(journey.intro, locale);

    return (
        <section className="mt-[50px] bg-[#f5f2ed] px-5 py-12 sm:px-10 lg:px-[60px]">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-4">
                    <SectionHeading heading={mvTitle} />
                    <div className="mt-8 space-y-8">
                        <div>
                            <div className="flex items-center gap-2">
                                <Flower2 className="h-5 w-5 shrink-0 text-maha-500" strokeWidth={1.25} aria-hidden="true" />
                                {missionTitle && (
                                    <div
                                        className="rich-content font-serif text-lg text-heading"
                                        dangerouslySetInnerHTML={{ __html: missionTitle }}
                                    />
                                )}
                            </div>
                            {missionDesc && (
                                <div
                                    className="rich-content mt-2 text-sm leading-relaxed text-ink/80"
                                    dangerouslySetInnerHTML={{ __html: missionDesc }}
                                />
                            )}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <Leaf className="h-5 w-5 shrink-0 text-maha-500" strokeWidth={1.25} aria-hidden="true" />
                                {visionTitle && (
                                    <div
                                        className="rich-content font-serif text-lg text-heading"
                                        dangerouslySetInnerHTML={{ __html: visionTitle }}
                                    />
                                )}
                            </div>
                            {visionDesc && (
                                <div
                                    className="rich-content mt-2 text-sm leading-relaxed text-ink/80"
                                    dangerouslySetInnerHTML={{ __html: visionDesc }}
                                />
                            )}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-8">
                    <SectionHeading heading={journeyTitle} />
                    {journeyIntro && (
                        <div
                            className="rich-content mt-4 max-w-xl text-base leading-relaxed text-ink/80"
                            dangerouslySetInnerHTML={{ __html: journeyIntro }}
                        />
                    )}

                    {!!journey.images?.length && (
                        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                            {journey.images.map((item, index) => {
                                const caption = tr(item.caption, locale);
                                const imageAlt = tr(item.image_alt, locale);

                                return (
                                    <figure key={index}>
                                        <div className="aspect-[3/4] w-full overflow-hidden rounded-sm bg-maha-200">
                                            {item.image && (
                                                <img
                                                    src={item.image}
                                                    alt={imageAlt || stripTags(caption) || stripTags(journeyTitle)}
                                                    className="h-full w-full object-cover"
                                                />
                                            )}
                                        </div>
                                        {caption && (
                                            <div
                                                className="rich-content mt-2 text-xs text-ink/60"
                                                dangerouslySetInnerHTML={{ __html: caption }}
                                            />
                                        )}
                                    </figure>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
