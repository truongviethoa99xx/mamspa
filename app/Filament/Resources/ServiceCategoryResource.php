<?php

namespace App\Filament\Resources;

use App\Filament\Concerns\RestrictsFilamentAccess;
use App\Filament\Forms\TranslatableField;
use App\Filament\Resources\ServiceCategoryResource\Pages;
use App\Models\ServiceCategory;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ServiceCategoryResource extends Resource
{
    use RestrictsFilamentAccess;

    protected static ?string $model = ServiceCategory::class;

    protected static ?string $navigationIcon = 'heroicon-o-tag';

    protected static ?string $navigationGroup = 'Nội dung';

    protected static ?string $navigationLabel = 'Danh mục dịch vụ';

    protected static ?string $modelLabel = 'Danh mục dịch vụ';

    protected static ?string $pluralModelLabel = 'Danh mục dịch vụ';

    protected static ?int $navigationSort = 5;

    protected static function allowedRoles(): array
    {
        return User::contentRoles();
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Cơ bản')->schema([
                Forms\Components\TextInput::make('slug')
                    ->label('Slug')
                    ->helperText('Định danh trong URL/bộ lọc, ví dụ: massage, head-spa. Chỉ chữ thường, số và dấu gạch ngang.')
                    ->required()
                    ->maxLength(191)
                    ->alphaDash()
                    ->unique(ignoreRecord: true),
                Forms\Components\Select::make('parent_id')
                    ->label('Danh mục cấp 1')
                    ->options(fn (?ServiceCategory $record) => ServiceCategory::query()
                        ->roots()
                        ->when($record, fn ($query) => $query->whereKeyNot($record->getKey()))
                        ->orderBy('order')
                        ->get()
                        ->mapWithKeys(fn (ServiceCategory $category) => [$category->id => $category->getTranslation('name', 'vi')]))
                    ->native(false)
                    ->searchable()
                    ->disabled(fn (?ServiceCategory $record) => $record && $record->children()->exists())
                    ->helperText(fn (?ServiceCategory $record) => $record && $record->children()->exists()
                        ? 'Danh mục này đang có danh mục con nên phải giữ ở cấp 1.'
                        : 'Để trống nếu đây là danh mục cấp 1. Chỉ chọn được danh mục cấp 1 khác làm cha (tối đa 2 cấp).'),
                Forms\Components\TextInput::make('order')->label('Thứ tự')->numeric()->default(0),
                Forms\Components\Toggle::make('is_active')->label('Kích hoạt')->default(true),
            ])->columns(2),
            TranslatableField::group('name', label: 'Tên danh mục', required: true, example: 'Body Massage'),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->modifyQueryUsing(fn ($query) => $query
                ->orderByRaw('COALESCE(parent_id, id)')
                ->orderByRaw('parent_id IS NOT NULL')
                ->orderBy('order'))
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label('Tên danh mục')
                    ->searchable()
                    ->formatStateUsing(fn (ServiceCategory $record, $state) => $record->isRoot() ? $state : '— '.$state),
                Tables\Columns\TextColumn::make('slug')->label('Slug')->searchable(),
                Tables\Columns\TextColumn::make('parent.slug')->label('Thuộc danh mục')->placeholder('— Cấp 1 —'),
                Tables\Columns\TextColumn::make('order')->label('Thứ tự')->sortable(),
                Tables\Columns\IconColumn::make('is_active')->label('Kích hoạt')->boolean(),
                Tables\Columns\TextColumn::make('services_count')->label('Số dịch vụ')->counts('services'),
            ])
            ->filters([
                Tables\Filters\Filter::make('roots_only')
                    ->label('Chỉ danh mục cấp 1')
                    ->query(fn ($query) => $query->roots()),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->defaultPaginationPageOption(50);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListServiceCategories::route('/'),
            'create' => Pages\CreateServiceCategory::route('/create'),
            'edit' => Pages\EditServiceCategory::route('/{record}/edit'),
        ];
    }
}
