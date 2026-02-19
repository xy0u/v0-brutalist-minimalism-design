<?php
session_start();
require_once __DIR__ . '/../../core/database.php';

$user = null;
if (isset($_SESSION['user_id'])) {
    $user = mysqli_fetch_assoc(mysqli_query($conn, "SELECT * FROM users WHERE id=" . intval($_SESSION['user_id'])));
}

$cartCount = 0;
if (isset($_SESSION['cart'])) {
    foreach ($_SESSION['cart'] as $qty) $cartCount += $qty;
}

$products = mysqli_query($conn, "SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id ORDER BY p.sold DESC");
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KANTIN &mdash; Modern Taste</title>
    <link rel="stylesheet" href="assets/css/public.css">
</head>
<body>

<!-- Grid Overlay -->
<div class="grid-overlay">
    <?php for ($i = 0; $i < 12; $i++): ?><div></div><?php endfor; ?>
</div>

<!-- Navbar -->
<header class="navbar">
    <div class="logo">Kantin</div>
    <button class="hamburger" aria-label="Menu">&#9776;</button>
    <nav>
        <a href="#menu">Menu</a>
        <?php if ($user): ?>
            <a href="orders.php">Orders</a>
            <a href="cart/index.php" class="cart-link">Cart (<?= $cartCount ?>)</a>
            <a href="../auth/logout.php">Logout</a>
        <?php else: ?>
            <a href="../auth/login.php">Login</a>
        <?php endif; ?>
    </nav>
</header>

<!-- Hero -->
<section class="hero">
    <h1>Eat<br>Diff.</h1>
    <p>Modern taste experience &mdash; school canteen reimagined</p>
    <a href="#menu" class="hero-cta">Explore Menu</a>
    <span class="scroll-indicator">Scroll</span>
</section>

<!-- Marquee -->
<div class="marquee-band">
    <div class="marquee-inner">
        <?php for ($i = 0; $i < 2; $i++): ?>
            <span>Fresh Daily</span>
            <span>&bull;</span>
            <span>Premium Ingredients</span>
            <span>&bull;</span>
            <span>Made to Order</span>
            <span>&bull;</span>
            <span>Student Favorites</span>
            <span>&bull;</span>
            <span>Fast Service</span>
            <span>&bull;</span>
        <?php endfor; ?>
    </div>
</div>

<!-- Section Label -->
<div class="section-label" id="menu">Top Selling</div>

<!-- Products Grid -->
<div class="products">
    <?php while ($p = mysqli_fetch_assoc($products)):
        $isSold = ($p['stock'] <= 0 && $p['status'] !== 'coming_soon');
        $isComing = ($p['status'] === 'coming_soon');
        $variants = mysqli_query($conn, "SELECT * FROM product_variants WHERE product_id=" . intval($p['id']));
        $img = !empty($p['image']) ? "uploads/" . htmlspecialchars($p['image']) : "uploads/default.jpg";
    ?>
    <div class="card <?= $isComing ? 'coming-soon' : '' ?>">
        <img src="<?= $img ?>" alt="<?= htmlspecialchars($p['name']) ?>" loading="lazy">

        <?php if ($isComing): ?>
            <span class="stock-badge coming">Coming Soon</span>
        <?php elseif ($p['stock'] > 0): ?>
            <span class="stock-badge available">Available</span>
        <?php else: ?>
            <span class="stock-badge out">Sold Out</span>
        <?php endif; ?>

        <?php if (!$isComing): ?>
        <div class="card-body">
            <?php if (!empty($p['category_name'])): ?>
                <span class="category-label"><?= htmlspecialchars($p['category_name']) ?></span>
            <?php endif; ?>

            <h3><?= htmlspecialchars($p['name']) ?></h3>
            <div class="price">Rp <?= number_format($p['price'], 0, ',', '.') ?></div>

            <?php if (!$isSold && $user): ?>
                <?php if (mysqli_num_rows($variants) > 0): ?>
                    <select class="variant-select" data-id="<?= $p['id'] ?>">
                        <?php
                        mysqli_data_seek($variants, 0);
                        while ($v = mysqli_fetch_assoc($variants)):
                        ?>
                            <option value="<?= $v['id'] ?>">
                                <?= htmlspecialchars($v['name']) ?>
                                <?php if ($v['extra_price'] > 0): ?>
                                    (+Rp<?= number_format($v['extra_price'], 0, ',', '.') ?>)
                                <?php endif; ?>
                            </option>
                        <?php endwhile; ?>
                    </select>
                <?php endif; ?>

                <input type="number" class="qty" data-id="<?= $p['id'] ?>" value="1" min="1" max="<?= $p['stock'] ?>">
                <button class="btn addCart" data-id="<?= $p['id'] ?>" <?= $isSold ? 'disabled' : '' ?>>
                    <?= $isSold ? 'Sold Out' : 'Add to Cart' ?>
                </button>
                <button class="btn btn-wishlist wishlist" data-id="<?= $p['id'] ?>">Wishlist</button>
            <?php elseif (!$user && !$isSold): ?>
                <a href="../auth/login.php" class="btn">Login to Order</a>
            <?php endif; ?>
        </div>
        <?php endif; ?>
    </div>
    <?php endwhile; ?>
</div>

<!-- Footer -->
<footer>
    <div>
        <div class="footer-brand">Kantin</div>
        <p class="footer-copy">School canteen, reimagined.</p>
    </div>
    <nav>
        <a href="#menu">Menu</a>
        <?php if ($user): ?>
            <a href="orders.php">Orders</a>
            <a href="dashboard.php">Dashboard</a>
        <?php endif; ?>
    </nav>
</footer>

<script src="assets/js/public.js"></script>
</body>
</html>
