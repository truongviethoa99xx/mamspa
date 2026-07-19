<?php

namespace App\Filament\Support;

/**
 * Danh sách các trang nội dung có thể giới hạn theo từng biên tập viên
 * (xem UserResource + RestrictsFilamentAccess::pageKey()).
 */
enum EditablePage: string
{
    case Header = 'header';
    case Home = 'home';
    case About = 'about';
    case ServicePage = 'service_page';
    case Contact = 'contact';
    case Offer = 'offer';
    case Menu = 'menu';
    case Policy = 'policy';
    case ServiceCategory = 'service_category';
    case CustomerExperience = 'customer_experience';
    case Service = 'service';
    case BlogPage = 'blog_page';
    case BlogPost = 'blog_post';
    case CustomPage = 'custom_page';

    public function label(): string
    {
        return match ($this) {
            self::Header => 'Quản lý header',
            self::Home => 'Trang chủ',
            self::About => 'Trang Giới thiệu',
            self::ServicePage => 'Trang Dịch vụ',
            self::Contact => 'Trang Liên hệ',
            self::Offer => 'Trang Ưu đãi',
            self::Menu => 'Trang Menu dịch vụ',
            self::Policy => 'Trang chính sách',
            self::ServiceCategory => 'Danh mục dịch vụ',
            self::CustomerExperience => 'Trang Customer Experience',
            self::Service => 'Dịch vụ',
            self::BlogPage => 'Trang Blog',
            self::BlogPost => 'Bài viết',
            self::CustomPage => 'Trang tuỳ biến',
        };
    }

    /** @return array<string, string> */
    public static function options(): array
    {
        return collect(self::cases())
            ->mapWithKeys(fn (self $page) => [$page->value => $page->label()])
            ->all();
    }

    /** @return list<string> */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
