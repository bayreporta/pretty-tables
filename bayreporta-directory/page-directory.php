<?php /* Template Name: Directory */ get_header(); ?>
<link rel="stylesheet" href="http://bayreporta.com/wp-content/themes/centauri/styles/fonts/font-awesome.min.css">
<link rel="stylesheet" href="http://bayreporta.com/wp-content/themes/centauri/styles/pretty-tables.css">
<section id="content" role="main">
<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
	<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
		<header class="header page-no-header">
			<div class="page-title"><h1><?php the_title(); ?></h1></div> 
			<?php if ( has_post_thumbnail() ) { the_post_thumbnail(); } ?>
		</header>
		<div id="directory" class="content" role="directory">
			<div><?php the_content(); ?></div>
			<div id="pretty-table">
				<div id="pretty-table-top"><a href="#top"><i class="fa fa-arrow-up"></i></a></div>
				<div id="pretty-table-control">
					<div id="pretty-table-search-options">
						<input id="pretty-table-search" type="text" style="height:24px;" placeholder="Type to Search">
						<div><p class="pretty-table-button san-serif" id="execute-search">Search</p></div>
						<div><p class="pretty-table-button san-serif" id="reset-search">Reset</p></div>
					</div>
					<div id="pretty-table-ask">
						<div>
							<h4>Ask a Question</h4>
							<div><p class="pretty-table-button pretty-table-questions san-serif" filter="0">Only Live Games?</p></div>
							<div><p class="pretty-table-button pretty-table-questions san-serif" filter="1">Only News Games?</p></div>
							<div><p class="pretty-table-button pretty-table-questions san-serif" filter="2">Not News Games?</p></div>
						</div>
					</div>
			</div>	
		</div>
	</article>
	<?php if ( ! post_password_required() ) comments_template( '', true ); ?>
	<?php endwhile; endif; ?>
</section>
<script src="../wp-content/themes/centauri/scripts/jquery.tablesorter.js"></script>
<script src="../wp-content/themes/centauri/data/directory.json"></script>
<script src="../wp-content/themes/centauri/scripts/pretty-table.js"></script>

<?php get_footer(); ?>