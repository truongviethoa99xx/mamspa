export function PromoBannerBlock({ data }: { data: any }) {
    if (!data.image) return null;
    return (
        <section className="bg-white py-6">
            <div className="mx-auto max-w-7xl px-4">
                <a href={data.link ?? '#'} className="block overflow-hidden rounded-xl">
                    <img src={data.image} alt="Promo" className="w-full" />
                </a>
            </div>
        </section>
    );
}
