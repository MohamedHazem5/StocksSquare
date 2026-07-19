namespace StockSquare.Models;

public record CategoryDto(
    int Id,
    string Slug,
    string NameAr,
    string NameEn,
    string Icon
);

public record ProductDto(
    int Id,
    string CategorySlug,
    string TitleAr,
    string TitleEn,
    decimal Price,
    string BadgeText,
    string ImageKey,
    bool IsVip,
    bool IsFeatured
);

public record GoldPriceDto(
    int Karat,
    string LabelAr,
    decimal Price,
    string Currency,
    string ChangeDirection
);

public record BannerDto(
    string TitleAr,
    string SubtitleAr,
    string DeliveryBadgeAr
);

public record MarketSnapshotDto(
    BannerDto Banner,
    IReadOnlyList<CategoryDto> Categories,
    IReadOnlyList<ProductDto> Products,
    IReadOnlyList<GoldPriceDto> GoldPrices
);
