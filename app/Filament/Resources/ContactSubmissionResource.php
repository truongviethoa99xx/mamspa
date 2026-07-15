<?php

namespace App\Filament\Resources;

use App\Filament\Concerns\RestrictsFilamentAccess;
use App\Filament\Resources\ContactSubmissionResource\Pages;
use App\Models\ContactSubmission;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ContactSubmissionResource extends Resource
{
    use RestrictsFilamentAccess;

    protected static ?string $model = ContactSubmission::class;

    protected static ?string $navigationIcon = 'heroicon-o-envelope';

    protected static ?string $navigationGroup = 'Vận hành';

    protected static ?string $navigationLabel = 'Lời nhắn liên hệ';

    protected static ?string $modelLabel = 'Lời nhắn';

    protected static ?string $pluralModelLabel = 'Lời nhắn liên hệ';

    protected static ?string $slug = 'contact-submissions';

    protected static ?int $navigationSort = 2;

    protected static function allowedRoles(): array
    {
        return User::adminRoles();
    }

    public static function getNavigationBadge(): ?string
    {
        $count = static::getModel()::where('status', ContactSubmission::STATUS_NEW)->count();

        return $count > 0 ? (string) $count : null;
    }

    public static function getNavigationBadgeColor(): ?string
    {
        return 'danger';
    }

    public static function getNavigationBadgeTooltip(): ?string
    {
        return 'Lời nhắn chưa liên hệ';
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Nội dung lời nhắn')
                ->description('Thông tin khách gửi từ form liên hệ trên website.')
                ->icon('heroicon-o-envelope')
                ->schema([
                    Forms\Components\TextInput::make('name')
                        ->label('Họ tên')
                        ->disabled(),
                    Forms\Components\TextInput::make('email')
                        ->label('Email')
                        ->disabled(),
                    Forms\Components\TextInput::make('phone')
                        ->label('Số điện thoại')
                        ->disabled()
                        ->placeholder('—'),
                    Forms\Components\TextInput::make('subject')
                        ->label('Chủ đề')
                        ->disabled(),
                    Forms\Components\Textarea::make('message')
                        ->label('Nội dung')
                        ->rows(6)
                        ->disabled()
                        ->columnSpanFull(),
                ])
                ->columns([
                    'default' => 1,
                    'md' => 2,
                ]),

            Forms\Components\Section::make('Xử lý')
                ->schema([
                    Forms\Components\Select::make('status')
                        ->label('Trạng thái')
                        ->options([
                            ContactSubmission::STATUS_NEW => 'Chưa liên hệ',
                            ContactSubmission::STATUS_CONTACTED => 'Đã liên hệ',
                        ])
                        ->native(false)
                        ->required(),
                ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('name')
                ->label('Họ tên')
                ->searchable(),
            Tables\Columns\TextColumn::make('email')
                ->label('Email')
                ->searchable(),
            Tables\Columns\TextColumn::make('phone')
                ->label('Số điện thoại')
                ->placeholder('—'),
            Tables\Columns\TextColumn::make('subject')
                ->label('Chủ đề')
                ->searchable()
                ->limit(40),
            Tables\Columns\TextColumn::make('message')
                ->label('Nội dung')
                ->limit(50)
                ->tooltip(fn (ContactSubmission $record): string => $record->message),
            Tables\Columns\TextColumn::make('status')
                ->label('Trạng thái')
                ->badge()
                ->formatStateUsing(fn (string $state): string => $state === ContactSubmission::STATUS_CONTACTED
                    ? 'Đã liên hệ'
                    : 'Chưa liên hệ')
                ->colors([
                    'danger' => ContactSubmission::STATUS_NEW,
                    'success' => ContactSubmission::STATUS_CONTACTED,
                ]),
            Tables\Columns\TextColumn::make('created_at')
                ->label('Ngày gửi')
                ->dateTime('d/m/Y H:i')
                ->sortable(),
        ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->label('Trạng thái')
                    ->options([
                        ContactSubmission::STATUS_NEW => 'Chưa liên hệ',
                        ContactSubmission::STATUS_CONTACTED => 'Đã liên hệ',
                    ]),
            ])
            ->actions([
                Tables\Actions\Action::make('markContacted')
                    ->label('Đã liên hệ')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->visible(fn (ContactSubmission $record): bool => $record->status === ContactSubmission::STATUS_NEW)
                    ->requiresConfirmation()
                    ->action(fn (ContactSubmission $record) => $record->update([
                        'status' => ContactSubmission::STATUS_CONTACTED,
                    ])),
                Tables\Actions\Action::make('markNew')
                    ->label('Chưa liên hệ')
                    ->icon('heroicon-o-arrow-uturn-left')
                    ->color('gray')
                    ->visible(fn (ContactSubmission $record): bool => $record->status === ContactSubmission::STATUS_CONTACTED)
                    ->action(fn (ContactSubmission $record) => $record->update([
                        'status' => ContactSubmission::STATUS_NEW,
                    ])),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkAction::make('markContactedBulk')
                    ->label('Đánh dấu đã liên hệ')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->requiresConfirmation()
                    ->deselectRecordsAfterCompletion()
                    ->action(fn ($records) => $records->each->update([
                        'status' => ContactSubmission::STATUS_CONTACTED,
                    ])),
                Tables\Actions\DeleteBulkAction::make(),
            ])
            ->defaultPaginationPageOption(50);
    }

    public static function canCreate(): bool
    {
        return false;
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListContactSubmissions::route('/'),
            'edit' => Pages\EditContactSubmission::route('/{record}/edit'),
        ];
    }
}
