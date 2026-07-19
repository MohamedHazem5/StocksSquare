using StockSquare.Models;

namespace StockSquare.Data;

public static class MarketData
{
    public static BannerDto Banner { get; } = new(
        TitleAr: "سوق السبائك الذهبية المتميز",
        SubtitleAr: "صفحة الشراء المباشر اونلاين لشريكك الاستثماري المتكامل",
        DeliveryBadgeAr: "توصيل مجاني ومؤمن بالكامل لجميع المحافظات"
    );

    public static IReadOnlyList<CategoryDto> Categories { get; } =
    [
        new(1, "gold", "سبائك ذهبية", "Gold Bullion", "crown"),
        new(2, "silver", "سبائك فضية", "Silver Bullion", "box"),
        new(3, "coins", "عملات تذكارية", "Commemorative Coins", "coins")
    ];

    public static IReadOnlyList<GoldPriceDto> GoldPrices { get; } =
    [
        new(24, "عيار 24", 4465.50m, "EGP", "up"),
        new(21, "عيار 21", 4355.00m, "EGP", "up")
    ];

    public static IReadOnlyList<ProductDto> Products { get; } =
    [
        new(
            Id: 1,
            CategorySlug: "gold",
            TitleAr: "سبيكة ذهب 250 جرام",
            TitleEn: "Stock Squares Gold Bullion",
            Price: 1_159_000.00m,
            BadgeText: "1,159,000 EGP",
            ImageKey: "gold",
            IsVip: true,
            IsFeatured: false
        ),
        new(
            Id: 2,
            CategorySlug: "gold",
            TitleAr: "سبيكة ذهب 25 جرام",
            TitleEn: "Stock Squares Gold Bullion",
            Price: 115_221.50m,
            BadgeText: "25g EGP",
            ImageKey: "gold",
            IsVip: true,
            IsFeatured: true
        ),
        new(
            Id: 3,
            CategorySlug: "silver",
            TitleAr: "سبيكة فضة 250 جرام",
            TitleEn: "Stock Squares Silver Bullion",
            Price: 15_036.50m,
            BadgeText: "250g EGP",
            ImageKey: "silver",
            IsVip: true,
            IsFeatured: false
        ),
        new(
            Id: 4,
            CategorySlug: "coins",
            TitleAr: "عملة ذهب تذكارية",
            TitleEn: "Stock Squares Gold Coin",
            Price: 38_005.00m,
            BadgeText: "38,005 EGP",
            ImageKey: "coin",
            IsVip: true,
            IsFeatured: false
        )
    ];

    public static MarketSnapshotDto Snapshot =>
        new(Banner, Categories, Products, GoldPrices);
}
