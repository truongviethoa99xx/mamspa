<?php

namespace App\Filament\Resources;

use App\Filament\Concerns\RestrictsFilamentAccess;
use App\Filament\Resources\UserResource\Pages;
use App\Filament\Support\EditablePage;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Get;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
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
                        ->revealable()
                        ->suffixAction(
                            Forms\Components\Actions\Action::make('generatePassword')
                                ->icon('heroicon-m-arrow-path')
                                ->tooltip('Tạo mật khẩu ngẫu nhiên 10 ký tự')
                                ->action(fn (Set $set) => $set('password', Str::password(10))),
                        )
                        ->dehydrateStateUsing(fn ($state) => filled($state) ? Hash::make($state) : null)
                        ->dehydrated(fn ($state) => filled($state))
                        ->required(fn (string $context): bool => $context === 'create')
                        ->helperText('Bấm biểu tượng 🔄 để tạo mật khẩu ngẫu nhiên 10 ký tự.'),
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
                        ->live()
                        ->helperText('Superadmin quản lý toàn bộ hệ thống; Admin quản lý vận hành/nội dung; Biên tập viên chỉ sửa nội dung; Lễ tân chỉ thấy Lịch hẹn, Lời nhắn liên hệ và Đăng ký nhận tin.'),
                    Forms\Components\CheckboxList::make('editable_pages')
                        ->label('Trang được phép sửa (Biên tập viên)')
                        ->options(function (): array {
                            $options = EditablePage::options();
                            $options[EditablePage::CustomPage->value] .= ' <span style="display:inline-block;margin-left:.375rem;padding:.0625rem .5rem;'
                                .'border-radius:9999px;background:#fee2e2;color:#b91c1c;font-size:.6875rem;font-weight:700;">'
                                .'⚠️ QUAN TRỌNG — rủi ro bảo mật</span>';

                            return $options;
                        })
                        ->allowHtml()
                        ->descriptions([
                            EditablePage::CustomPage->value => 'Cho phép chạy HTML/CSS/JS thô trực tiếp trên site công khai. Chỉ tick nếu thực sự tin tưởng biên tập viên này.',
                        ])
                        ->columns(2)
                        ->bulkToggleable()
                        ->visible(function (Get $get): bool {
                            $roleIds = $get('roles') ?? [];

                            return filled($roleIds) && Role::whereKey($roleIds)->where('name', User::ROLE_EDITOR)->exists();
                        })
                        ->default(EditablePage::values())
                        ->afterStateHydrated(function (Forms\Components\CheckboxList $component, $state): void {
                            if ($state === null) {
                                $component->state(EditablePage::values());
                            }
                        })
                        ->helperText('Chỉ áp dụng cho quyền Biên tập viên. Bỏ tick trang nào thì biên tập viên sẽ không thấy/sửa được trang đó trong menu quản trị.')
                        ->columnSpanFull(),
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
