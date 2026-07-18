<?php

namespace App\Filament\Resources;

use App\Filament\Concerns\RestrictsFilamentAccess;
use App\Filament\Resources\UserResource\Pages;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserResource extends Resource
{
    use RestrictsFilamentAccess;

    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'heroicon-o-users';

    protected static ?string $navigationGroup = 'Hệ thống';

    protected static ?string $navigationLabel = 'Nhân sự & phân quyền';

    protected static ?string $modelLabel = 'Nhân sự';

    protected static ?string $pluralModelLabel = 'Nhân sự & phân quyền';

    protected static ?int $navigationSort = 2;

    protected static function allowedRoles(): array
    {
        return User::superAdminRoles();
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Thông tin nhân viên')
                ->schema([
                    Forms\Components\TextInput::make('name')
                        ->label('Họ tên')
                        ->required(),
                    Forms\Components\TextInput::make('email')
                        ->label('Email')
                        ->email()
                        ->rules(['not_regex:/[\r\n]/'])
                        ->required()
                        ->unique(ignoreRecord: true),
                    Forms\Components\TextInput::make('phone')
                        ->label('Số điện thoại')
                        ->tel(),
                    Forms\Components\TextInput::make('password')
                        ->label('Mật khẩu')
                        ->password()
                        ->dehydrateStateUsing(fn ($state) => filled($state) ? Hash::make($state) : null)
                        ->dehydrated(fn ($state) => filled($state))
                        ->required(fn (string $context): bool => $context === 'create'),
                    Forms\Components\Select::make('roles')
                        ->label('Quyền')
                        ->relationship(
                            'roles',
                            'name',
                            modifyQueryUsing: fn (Builder $query) => $query->whereIn('name', User::MANAGEABLE_ROLES),
                        )
                        ->getOptionLabelFromRecordUsing(fn (Role $record): string => User::roleOptions()[$record->name] ?? $record->name)
                        ->multiple()
                        ->maxItems(1)
                        ->preload()
                        ->required()
                        ->helperText('Superadmin quản lý toàn bộ hệ thống; Admin quản lý vận hành/nội dung; Biên tập viên chỉ sửa nội dung; Lễ tân chỉ thấy Lịch hẹn, Lời nhắn liên hệ và Đăng ký nhận tin.'),
                    Forms\Components\Select::make('preferred_lang')
                        ->label('Ngôn ngữ')
                        ->options([
                            'vi' => 'Tiếng Việt',
                            'en' => 'Tiếng Anh',
                            'ja' => 'Tiếng Nhật',
                            'ko' => 'Tiếng Hàn',
                            'zh' => 'Tiếng Trung',
                        ])
                        ->default('vi'),
                ])->columns(2),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('name')->label('Họ tên')->searchable(),
            Tables\Columns\TextColumn::make('email')->label('Email')->searchable(),
            Tables\Columns\TextColumn::make('roles.name')->label('Quyền')->badge(),
            Tables\Columns\TextColumn::make('created_at')->label('Ngày tạo')->dateTime(),
        ])->actions([
            Tables\Actions\EditAction::make(),
            Tables\Actions\DeleteAction::make()
                ->hidden(fn (User $record): bool => auth()->id() === $record->id),
        ])
            ->defaultPaginationPageOption(50);
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->whereHas('roles', fn (Builder $query) => $query->whereIn('name', User::MANAGEABLE_ROLES));
    }

    public static function canDelete(Model $record): bool
    {
        return static::userHasAccess() && auth()->id() !== $record->getKey();
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
        ];
    }
}
