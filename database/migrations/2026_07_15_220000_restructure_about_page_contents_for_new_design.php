<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Trang Giới thiệu được thiết kế lại theo bố cục 9 section mới (Our Story,
 * Our Philosophy, 4 Healing Journeys, Our Approach, Our Spaces, Our People,
 * Customer Experiences, Mission & Vision, Our Journey, A Gentle Invitation).
 * Frontend cũ đã bị gỡ nên các cột thuộc bố cục cũ (Giá trị cốt lõi, Tầm
 * nhìn dạng ảnh+bullet, danh sách nhân sự, review Instagram) không còn khớp
 * thiết kế mới — xoá để admin không bị rối, thay bằng cột cho các section mới.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('about_page_contents', function (Blueprint $table) {
            $table->dropColumn([
                'hero_retreat',
                'vision_image', 'vision_eyebrow', 'vision_title', 'vision_p1', 'vision_p2', 'vision_bullets', 'vision_visible',
                'value1_image', 'value2_image', 'value3_image',
                'values_eyebrow', 'values_title',
                'value1_title', 'value1_desc', 'value2_title', 'value2_desc', 'value3_title', 'value3_desc', 'values_visible',
                'team', 'team_eyebrow', 'team_title', 'team_visible',
                'instagram_handles', 'review_video_url', 'review_video_image', 'review_cards',
                'reviews_eyebrow', 'reviews_title', 'review_video_caption', 'review_quote', 'review_quote_author', 'reviews_visible',
            ]);
        });

        Schema::table('about_page_contents', function (Blueprint $table) {
            // 2 · Our Philosophy
            $table->boolean('philosophy_visible')->default(true)->after('story_visible');
            $table->json('philosophy_eyebrow')->nullable()->after('philosophy_visible');
            $table->json('philosophy_title')->nullable()->after('philosophy_eyebrow');
            $table->json('philosophy_p1')->nullable()->after('philosophy_title');
            $table->json('philosophy_p2')->nullable()->after('philosophy_p1');

            // 4 · Our Approach
            $table->boolean('approach_visible')->default(true)->after('philosophy_p2');
            $table->string('approach_image')->nullable()->after('approach_visible');
            $table->json('approach_eyebrow')->nullable()->after('approach_image');
            $table->json('approach_title')->nullable()->after('approach_eyebrow');
            $table->json('approach_p1')->nullable()->after('approach_title');

            // 5 · Our Spaces (repeater: {image, title, description, link_text, link_url} — title/description đa ngôn ngữ)
            $table->boolean('spaces_visible')->default(true)->after('approach_p1');
            $table->json('spaces_eyebrow')->nullable()->after('spaces_visible');
            $table->json('spaces_title')->nullable()->after('spaces_eyebrow');
            $table->json('spaces_intro')->nullable()->after('spaces_title');
            $table->json('spaces')->nullable()->after('spaces_intro');

            // 6 · Our People (ảnh nhóm + đoạn giới thiệu, không còn danh sách từng thành viên)
            $table->boolean('people_visible')->default(true)->after('spaces');
            $table->string('people_image')->nullable()->after('people_visible');
            $table->json('people_eyebrow')->nullable()->after('people_image');
            $table->json('people_title')->nullable()->after('people_eyebrow');
            $table->json('people_p1')->nullable()->after('people_title');
            $table->json('people_p2')->nullable()->after('people_p1');

            // 7 · Customer Experiences (repeater 'testimonials': {source, rating, quote, author_name, author_meta})
            $table->boolean('experiences_visible')->default(true)->after('people_p2');
            $table->json('experiences_eyebrow')->nullable()->after('experiences_visible');
            $table->json('experiences_title')->nullable()->after('experiences_eyebrow');
            $table->json('experiences_intro')->nullable()->after('experiences_title');
            $table->json('testimonials')->nullable()->after('experiences_intro');

            // 8 · Mission & Vision (hai khối nhỏ song song, không ảnh)
            $table->boolean('mission_vision_visible')->default(true)->after('testimonials');
            $table->json('mission_title')->nullable()->after('mission_vision_visible');
            $table->json('mission_desc')->nullable()->after('mission_title');
            $table->json('vision_title')->nullable()->after('mission_desc');
            $table->json('vision_desc')->nullable()->after('vision_title');

            // 9 · Our Journey (repeater 'journey_images': {image, caption})
            $table->boolean('journey_visible')->default(true)->after('vision_desc');
            $table->json('journey_eyebrow')->nullable()->after('journey_visible');
            $table->json('journey_title')->nullable()->after('journey_eyebrow');
            $table->json('journey_intro')->nullable()->after('journey_title');
            $table->json('journey_images')->nullable()->after('journey_intro');

            // 10 · A Gentle Invitation (CTA đóng trang)
            $table->boolean('invitation_visible')->default(true)->after('journey_images');
            $table->string('invitation_image')->nullable()->after('invitation_visible');
            $table->json('invitation_eyebrow')->nullable()->after('invitation_image');
            $table->json('invitation_title')->nullable()->after('invitation_eyebrow');
            $table->json('invitation_p1')->nullable()->after('invitation_title');
            $table->json('invitation_button_text')->nullable()->after('invitation_p1');
            $table->string('invitation_button_url')->nullable()->after('invitation_button_text');
        });
    }

    public function down(): void
    {
        Schema::table('about_page_contents', function (Blueprint $table) {
            $table->dropColumn([
                'philosophy_visible', 'philosophy_eyebrow', 'philosophy_title', 'philosophy_p1', 'philosophy_p2',
                'approach_visible', 'approach_image', 'approach_eyebrow', 'approach_title', 'approach_p1',
                'spaces_visible', 'spaces_eyebrow', 'spaces_title', 'spaces_intro', 'spaces',
                'people_visible', 'people_image', 'people_eyebrow', 'people_title', 'people_p1', 'people_p2',
                'experiences_visible', 'experiences_eyebrow', 'experiences_title', 'experiences_intro', 'testimonials',
                'mission_vision_visible', 'mission_title', 'mission_desc', 'vision_title', 'vision_desc',
                'journey_visible', 'journey_eyebrow', 'journey_title', 'journey_intro', 'journey_images',
                'invitation_visible', 'invitation_image', 'invitation_eyebrow', 'invitation_title', 'invitation_p1',
                'invitation_button_text', 'invitation_button_url',
            ]);
        });

        Schema::table('about_page_contents', function (Blueprint $table) {
            $table->json('hero_retreat')->nullable();
            $table->string('vision_image')->nullable();
            $table->json('vision_eyebrow')->nullable();
            $table->json('vision_title')->nullable();
            $table->json('vision_p1')->nullable();
            $table->json('vision_p2')->nullable();
            $table->json('vision_bullets')->nullable();
            $table->boolean('vision_visible')->default(true);
            $table->string('value1_image')->nullable();
            $table->string('value2_image')->nullable();
            $table->string('value3_image')->nullable();
            $table->json('values_eyebrow')->nullable();
            $table->json('values_title')->nullable();
            $table->json('value1_title')->nullable();
            $table->json('value1_desc')->nullable();
            $table->json('value2_title')->nullable();
            $table->json('value2_desc')->nullable();
            $table->json('value3_title')->nullable();
            $table->json('value3_desc')->nullable();
            $table->boolean('values_visible')->default(true);
            $table->json('team')->nullable();
            $table->json('team_eyebrow')->nullable();
            $table->json('team_title')->nullable();
            $table->boolean('team_visible')->default(true);
            $table->json('instagram_handles')->nullable();
            $table->string('review_video_url')->nullable();
            $table->string('review_video_image')->nullable();
            $table->json('review_cards')->nullable();
            $table->json('reviews_eyebrow')->nullable();
            $table->json('reviews_title')->nullable();
            $table->json('review_video_caption')->nullable();
            $table->json('review_quote')->nullable();
            $table->json('review_quote_author')->nullable();
            $table->boolean('reviews_visible')->default(true);
        });
    }
};
