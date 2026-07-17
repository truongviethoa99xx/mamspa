import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Hero, type HeroData } from '@/Components/Hero';
import { AboutStory, type AboutStoryData } from '@/Components/About/AboutStory';
import { AboutPhilosophy, type AboutPhilosophyData } from '@/Components/About/AboutPhilosophy';
import { AboutHealingJourneys, type AboutHealingJourneysData } from '@/Components/About/AboutHealingJourneys';
import { AboutApproach, type AboutApproachData } from '@/Components/About/AboutApproach';
import { AboutSpaces, type AboutSpacesData } from '@/Components/About/AboutSpaces';
import { AboutPeople, type AboutPeopleData } from '@/Components/About/AboutPeople';
import { AboutExperiences, type AboutExperiencesData } from '@/Components/About/AboutExperiences';
import { type AboutMissionVisionData } from '@/Components/About/AboutMissionVision';
import { type AboutJourneyData } from '@/Components/About/AboutJourney';
import { AboutMissionVisionJourney } from '@/Components/About/AboutMissionVisionJourney';
import { AboutInvitation, type AboutInvitationData } from '@/Components/About/AboutInvitation';

interface Props {
    hero: HeroData;
    story: AboutStoryData;
    philosophy: AboutPhilosophyData;
    healingJourneys: AboutHealingJourneysData;
    approach: AboutApproachData;
    spaces: AboutSpacesData;
    people: AboutPeopleData;
    experiences: AboutExperiencesData;
    missionVision: AboutMissionVisionData;
    journey: AboutJourneyData;
    invitation: AboutInvitationData;
    sectionVisibility: {
        hero: boolean;
        story: boolean;
        philosophy: boolean;
        healingJourneys: boolean;
        approach: boolean;
        spaces: boolean;
        people: boolean;
        experiences: boolean;
        missionVision: boolean;
        journey: boolean;
        invitation: boolean;
    };
}

export default function GioiThieu({
    hero,
    story,
    philosophy,
    healingJourneys,
    approach,
    spaces,
    people,
    experiences,
    missionVision,
    journey,
    invitation,
    sectionVisibility,
}: Props) {
    return (
        <PublicLayout mainClassName="bg-[#f5f2ed]">
            <Head title="Về Mầm" />
            {sectionVisibility.hero && (
                <Hero data={hero} heightClassName="h-[calc(85vh-100px)] min-h-[340px] sm:h-[calc(75vh-100px)]" />
            )}
            {sectionVisibility.story && <AboutStory data={story} />}
            {sectionVisibility.philosophy && <AboutPhilosophy data={philosophy} />}
            {sectionVisibility.healingJourneys && <AboutHealingJourneys data={healingJourneys} />}
            {sectionVisibility.approach && <AboutApproach data={approach} />}
            {sectionVisibility.spaces && <AboutSpaces data={spaces} />}
            {sectionVisibility.people && <AboutPeople data={people} />}
            {sectionVisibility.experiences && <AboutExperiences data={experiences} />}
            {(sectionVisibility.missionVision || sectionVisibility.journey) && (
                <AboutMissionVisionJourney missionVision={missionVision} journey={journey} />
            )}
            {sectionVisibility.invitation && <AboutInvitation data={invitation} />}
        </PublicLayout>
    );
}
