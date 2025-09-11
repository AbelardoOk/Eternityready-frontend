<?php
/* Smarty version 3.1.33, created on 2025-08-08 04:21:56
  from '/home/eternity/public_html/old/templates/apollo/index.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.33',
  'unifunc' => 'content_68957b641d6169_22866261',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'ccc3bef61dc3aa6fe8e43c6c75cbd40f4b5059f2' => 
    array (
      0 => '/home/eternity/public_html/old/templates/apollo/index.tpl',
      1 => 1751509793,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:header.tpl' => 1,
    'file:player.tpl' => 2,
    'file:item-video-obj.tpl' => 5,
    'file:footer.tpl' => 1,
  ),
),false)) {
function content_68957b641d6169_22866261 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_checkPlugins(array(0=>array('file'=>'/home/eternity/public_html/old/Smarty/plugins/modifier.truncate.php','function'=>'smarty_modifier_truncate',),));
$_smarty_tpl->_subTemplateRender('file:header.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array('p'=>"index",'tpl_name'=>"index"), 0, false);
?>

<style>
    #header {
	background:rgba(0,0,0,0.60);
/*	padding:20px 0px; old */
	padding:0px 0px;
	position:fixed;
	width:100%;
	z-index:111;
}

.swiper {
  max-height: 100vh;
}
.swiper-pagination-bullet {
     background-color: #FFFFFF !important;
}
.swiper-pagination-bullet-active {
	width: 24px;
}
h5.card-title {
    font-family: "Poppins", Sans-serif;
    font-size: 28px;
    color: #FFFFFF;
    margin-bottom: 16px;
}

.card-body p {
    color: #BDBDBD;
    font-family: "Poppins", Sans-serif;
    padding: 10px;
    font-size: 1.455555rem;
}

.my-bootstrap {
   background: #000;
}


.icon {
    fill: #B93407;
    /*color: #B93407;*/
    border-color: #B93407;
    font-size: 38px;
    padding: 0px 0px 10px 0px;
}
.my-bootstrap .divider {
    border-top: 4px solid #B93407;
    width: 10%;
    margin: 10px auto;
}
.row.p-3 h2 {    color: #FFFFFF;
    font-family: "Poppins", Sans-serif;
    font-size: 37px;
    font-weight: 800;
}

.my-bootstrap .border-warning {
   border-color: #E5BB91 !important; 
  margin: 12px 5px;
    padding: 12px 24px;
    color: #fff;
    
}
.my-bootstrap .border-warning:hover {
    background: #B93407;
}

.my-bootstrap .card {
    background: #2D2D2D;
    padding:15px;
}
.my-bootstrap .card:hover
{
    box-shadow: 0px 0px 10px 0px #E5BB91;
}


.my-bootstrap .container .col-md-4
{
    padding-right: 15px;
    padding-left: 15px;
}
.my-bootstrap a {
    color: #fff !important;
}

.rounded {
    border-radius: 6px 6px 6px 6px !important;
}
.p-3 {
    margin: 20px 5px 20px 5px !important;
    padding: 40px 20px 40px 20px !important;
}

#main_header {
	backdrop-filter: none;
  	box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px;
}

@media only screen and (max-width: 600px) {
 html, body {
    overflow-x: hidden;
}

.card-body p {
    margin-bottom: 0;
}
 .divider {
   
    width: 40%;
    
}
.my-bootstrap .border-warning {
    width: 100%;
}
.my-bootstrap .border-warning {
    
    margin: 8px 0px;
}
.p-3 {
    margin: 20px 5px 20px 5px !important;.iv
    padding: 10px 20px 10px 20px !important;
}    
    
}

@media (max-width: 768px){
    .swiper {
        height: 380px;
        aspect-ratio: initial;
    }
}

.cd-discover-section {
            padding-top: 0;
            padding-bottom: 0;
        }

        /* Elemento: Container */
        .cd-discover-section__container {
            padding: 0 2rem;
            padding-bottom: 4rem;
        }

        /* Elemento: Cabeçalho */
        .cd-discover-section__header {
            text-align: center;
            margin-bottom: 4rem;
            opacity: 1;
            transform: none;
        }

        /* Elementos filhos do Cabeçalho */
        .cd-header__title {
            font-size: 1.875rem;
            line-height: 2.25rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: #ffffff;
        }

        .cd-header__divider {
            height: 0.25rem;
            width: 20rem;
            background-color: #DC2626;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 2rem;
        }

        .cd-header__subtitle {
            font-size: 1.75rem;
            line-height: 1.75rem;
            color: #d1d5db;
            max-width: 70rem;
            margin-left: auto;
            margin-right: auto;
        }

        /* Elemento: Grid de Cards */
        .cd-discover-section__grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 2rem;
        }

        /* --- Bloco do Card: cd-item --- */
        .cd-item {
            position: relative;
            overflow: hidden;
            border-radius: 0.5rem;
            cursor: pointer;
            opacity: 1;
            transform: none;
        }

        /* Elementos do Card */
        .cd-item__overlay {
            position: absolute;
            top: 0; right: 0; bottom: 0; left: 0;
            background-image: linear-gradient(to top, black, rgba(0, 0, 0, 0.3));
            z-index: 10;
        }

        .cd-item__image {
            width: 100%;
            height: 18rem;
            object-fit: cover;
            transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .cd-item:hover .cd-item__image {
            transform: scale(1.1);
        }

        .cd-item__content-wrapper {
            position: absolute;
            bottom: 0;
            left: 0;
            padding: 1.5rem;
            z-index: 20;
        }

        .cd-item__title-area {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 0.5rem;
        }
        
        .cd-item__icon {
            color: #ef4444;
        }

        .cd-item__title {
            font-size: 1.25rem;
            line-height: 1.75rem;
            font-weight: 700;
            color: #ffffff;
        }

        .cd-item__description {
            color: #d1d5db;
            font-size: 1.25rem;
            line-height: 1.25rem;
        }

        /* --- Media Queries para Responsividade --- */

        /* Telas Pequenas (sm: 640px) */
        @media (min-width: 640px) {
            .cd-discover-section__container {
                padding-left: 1.5rem;
                padding-right: 1.5rem;
            }
            .cd-discover-section__grid {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }
        }

        /* Telas Médias (md: 768px) */
        @media (min-width: 768px) {
            .cd-header__title {
                font-size: 5rem;
                line-height: 1;
            }
        }

        /* Telas Grandes (lg: 1024px) */
        @media (min-width: 1024px) {
            .cd-discover-section {
                padding-top: 2.5rem;
                padding-bottom: 2.5rem;
            }
            .cd-discover-section__container {
                margin: 0 18rem;
                padding-left: 2rem;
                padding-right: 2rem;
            }
            .cd-discover-section__grid {
                margin: 0;
                grid-template-columns: repeat(4, minmax(0, 1fr));
            }
        }
        
        .secao-carrossel {
            position: relative;
            background-color: #121212; /* Fundo escuro para a seção */
            padding: 20px 0 10px 0; 
            font-family: 'Poppins', sans-serif; /* Usando a mesma família de fontes */
            max-width: 1170px;
            margin: 0 auto;
            width: 100%;
        }

        .secao-carrossel > h1 {
            padding: 1rem 2rem;
            color: #bf1e2e;
            cursor: pointer;
        }

        .secao-carrossel .swiper-container {
            overflow: hidden;
        }

        .secao-carrossel .swiper-slide {
            display: flex;
            flex-direction: column; /* Organiza os itens em coluna */
            height: auto; /* Permite que a altura se ajuste ao conteúdo */
            background-position: center;
            background-size: cover;
            transition: opacity 0.3s ease;
            background: none;
        }


        .card-carrossel {
            position: relative;
            width: 100%;
            padding-top: 56%; /* Mantém a proporção 1:1 (quadrada) */
            background-color: #2D2D2D;
            overflow: hidden;
            color: #ffffff;
            transition: border-color 0.3s ease;
        }

        .card-carrossel img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover; /* Garante que a imagem cubra todo o espaço */
        }
        
        .card-carrossel-conteudo {
            position: static;
            background: none; 
            
            padding: 10px 5px;
            width: 100%;
            text-align: left; 
        }
        
        .card-carrossel-conteudo h4 {
            font-size: 1.85rem;
            margin: 0 0 5px 0;
            font-weight: 600 !important;
            color: #FFFFFF;
            /* Garante que o texto não quebre de forma estranha */
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .card-carrossel-conteudo p {
            font-size: 0.9rem; /* Ajuste de tamanho para o novo layout */
            margin: 0;
            color: #d1d5db;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        /* Estilização das setas de navegação */
        .secao-carrossel .swiper-button-next,
        .secao-carrossel .swiper-button-prev {
            width: 30px; 
            height: 30px;
            z-index: 10;
            
            margin-top: 0.5rem !important;
            margin: 0 1rem;
            
            display: flex;
            align-items: center;
            justify-content: center;
        
            background: #fff;
            border-radius: 50%; /* Garante a forma de círculo */
            color: #000; /* Cor da seta */
            opacity: 0.7; /* Opacidade inicial */
            transition: opacity 0.2s ease; /* Efeito suave */
        }

        .secao-carrossel .swiper-button-next:hover,
        .secao-carrossel .swiper-button-prev:hover {
            opacity: 1;
        }
        
        .secao-carrossel .swiper-button-next:after,
        .secao-carrossel .swiper-button-prev:after {
            font-weight: 900;
            font-size: 12.5px; /* Tamanho do ícone da seta */
        }

        /* Estilização da paginação */
        .secao-carrossel .swiper-pagination-bullet {
            background: #ffffff;
            opacity: 0.6;
        }

        .secao-carrossel .swiper-pagination-bullet-active {
            background: #DC2626; /* Cor do bullet ativo */
            opacity: 1;
        }

/* Music Player */
#player-bar {
  font-family: "Montserrat", sans-serif;
  position: fixed; /* Fixa a barra na tela */
  z-index: 999;
  margin-bottom: -90px;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 90px;
  background-color: #181818;
  border-top: 1px solid #282828;
  display: flex;
  justify-content: space-between; /* Alinha as 3 seções principais */
  align-items: center;
  padding: 0 20px;
  transition: margin 0.3s ease;
}

#player-bar.ativo {
  margin-bottom: 0;
}

/* === Seção Esquerda: Detalhes da Música === */
.song-details {
  display: flex;
  align-items: center;
  flex: 1; /* Ocupa 1/3 do espaço */
  min-width: 180px;
}

.album-art-bar {
  width: 56px !important;
  height: 56px !important;
  border-radius: 4px;
  margin-right: 15px !important;
  object-fit: cover;
  position: unset !important;
}

.song-info-bar h3 {
  font-size: 0.9rem;
  font-weight: 700;
  margin: 0;
  color: #fff;
}

.song-info-bar p {
  font-size: 0.75rem;
  color: #b3b3b3;
  margin: 0;
  
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

/* === Seção Central: Controles Principais === */
.player-core-controls {
  display: flex;
  flex-direction: column; /* Botões em cima, progresso embaixo */
  align-items: center;
  justify-content: center;
  flex: 2; /* Ocupa 2/3 do espaço, é a área principal */
}

.controls {
  display: flex;
  align-items: center;
  gap: 20px;
}

.control-btn {
  background: none;
  border: none;
  color: #b3b3b3;
  font-size: 1.1rem;
  cursor: pointer;
  transition: color 0.2s ease;
}

.control-btn:hover{
    transform: scale(1.1);
}

.play-btn {
  background-color: #fff;
  color: #121212;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.play-btn:hover {
  transform: scale(1.05);
}

.progress-section {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 500px;
  gap: 10px;
}

.progress-section span {
  font-size: 0.7rem;
  color: #b3b3b3;
  min-width: 30px;
  text-align: center;
}

.progress-container {
  background-color: #535353;
  border-radius: 5px;
  height: 4px;
  width: 100%; /* Ocupa todo o espaço disponível */
  cursor: pointer;
}
.progress-bar {
  background-color: #ff3c3c;
  height: 100%;
  border-radius: 5px;
  transition: width 0.1s linear;
}

/* === Seção Direita: Controles Extras === */
.extra-controls {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  flex: 1; /* Ocupa 1/3 do espaço */
  min-width: 180px;
  color: #b3b3b3;
}

.extra-controls > *{
    cursor: pointer;
}

#close {
    font-size: 2rem;
}

@media (max-width: 480px){
    #mute {
        display: none !important;
    }
    
    .extra-controls {
        justify-content: flex-start;
        margin-left: 2rem;
    }
}

</style>
<link rel="stylesheet" type="text/css" href="css/style.css">
<link rel="stylesheet" type="text/css" href="revolution/css/settings.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
<?php echo '<script'; ?>
 src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"><?php echo '</script'; ?>
>
<link rel="stylesheet" type="text/css" href="revolution/css/layers.css">
<link rel="stylesheet" type="text/css" href="revolution/css/navigation.css">

<link rel="preload" as="image" href="donate/public/transformers.jpg"/>
	<link rel="preload" as="image" href="donate/public/transformers_logo.webp"/>
	<link rel="preload" as="image" href="donate/public/indian.jpg"/>
	<link rel="preload" as="image" href="donate/public/shanghai.webp"/>
	<link rel="preload" as="image" href="donate/public/cars.jpg"/>
	<link rel="preload" as="image" href="donate/public/myfault.webp"/>
<!-- <link rel="stylesheet" type="text/css" media="screen" href="donate/styles.css"> -->

<div class="content">
		<!-- Swiper -->
		<div id="mute_button" class="off">
			<svg class="mute" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"></path>
				<line x1="22" x2="16" y1="9" y2="15"></line>
				<line x1="16" x2="22" y1="9" y2="15"></line>
			</svg>
			<svg class="loud" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"></path>
				<path d="M16 9a5 5 0 0 1 0 6"></path>
				<path d="M19.364 18.364a9 9 0 0 0 0-12.728"></path>
			</svg>
		</div>
		<div class="swiper mySwiper">
			<div class="swiper-wrapper">
				<div class="swiper-slide" data-index="0">
					<div class="overlay_1">
						<img src="donate/public/cars.jpg" id="image1" alt="logo" width="1080" height="608">
					</div>
					<div class="overlay_2"></div>
					<div class="overlay_3"></div>
					<div class="overlay_4"></div>
					<div class="swiper_content">
						<div class="container">
							<div class="top_part">
								<img class="item" id="web_file1" alt="" src="donate/public/myfault.webp">
								<div class="tags item">
									<span id="feature1">#Trending Now</span>
									<div>
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
											<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
										</svg>
										<span id="rating1">6.3</span>
									</div>
								</div>
								<div class="categories item">
									<span id="genre1[1]">Action</span>
									<span id="genre1[2]">Adventure</span>
									<span id="genre1[3]">Thriller</span>
								</div>
							</div>
							<p class="the_text item" id="text1"> Kraven Kravinoff's complex relationship with his ruthless gangster father, Nikolai, starts him down a path of vengeance with brutal consequences, motivating him to become not only the greatest hunter in the world, but also one of its most feared. </p>
							<div class="main_buttons item">
								<button class="play_button" tabindex="0">
									<div class="gradient"></div>
									<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
										<path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path>
									</svg>
									<span>Watch Now</span>
								</button>
								<button class="round_button" tabindex="0">
									<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 384 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
										<path d="M0 512V48C0 21.49 21.49 0 48 0h288c26.51 0 48 21.49 48 48v464L192 400 0 512z"></path>
									</svg>
								</button>
								<button class="round_button info" tabindex="0">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
										<circle cx="12" cy="12" r="10"></circle>
										<path d="M12 16v-4"></path>
										<path d="M12 8h.01"></path>
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
				<div class="swiper-slide" data-index="1">
					<div class="overlay_1">
						<img src="donate/public/indian.jpg" id="image2" alt="logo" width="1080" height="608">
					</div>
					<div class="overlay_2"></div>
					<div class="overlay_3"></div>
					<div class="overlay_4"></div>
					<div class="swiper_content">
						<div class="container">
							<div class="top_part">
								<img class="item" id="web_file2"  alt="" src="donate/public/shanghai.webp">
								<div class="tags item">
									<span id="feature2">Action</span>
									<div>
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
											<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
										</svg>
										<span id="rating2">6.3</span>
									</div>
								</div>
								<div class="categories item">
									<span id="genre2[1]">Action</span>
									<span id="genre2[2]">Adventure</span>
									<span id="genre2[3]">Thriller</span>
								</div>
							</div>
							<p class="the_text item" id="text2"> Kraven Kravinoff's complex relationship with his ruthless gangster father, Nikolai, starts him down a path of vengeance with brutal consequences, motivating him to become not only the greatest hunter in the world, but also one of its most feared. </p>
							<div class="main_buttons item">
								<button class="play_button" tabindex="0">
									<div class="gradient"></div>
									<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
										<path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path>
									</svg>
									<span>Watch Now</span>
								</button>
								<button class="round_button" tabindex="0">
									<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 384 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
										<path d="M0 512V48C0 21.49 21.49 0 48 0h288c26.51 0 48 21.49 48 48v464L192 400 0 512z"></path>
									</svg>
								</button>
								<button class="round_button info" tabindex="0">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
										<circle cx="12" cy="12" r="10"></circle>
										<path d="M12 16v-4"></path>
										<path d="M12 8h.01"></path>
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
				<div class="swiper-slide" data-index="2">
					<div class="overlay_1">
						<img src="" id="image3" alt="logo" width="1920" height="1080">
					</div>
					<div class="overlay_2"></div>
					<div class="overlay_3"></div>
					<div class="overlay_4"></div>
					<div class="swiper_content">
						<div class="container">
							<div class="top_part">
								<img class="item" id="web_file3"  alt="" src="">
								<div class="tags item">
									<span id="feature3">#Adventure</span>
									<div>
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
											<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
										</svg>
										<span id="rating3">6.3</span>
									</div>
								</div>
								<div class="categories item">
										<span id="genre3[1]">Action</span>
									<span id="genre3[2]">Adventure</span>
									<span id="genre2[3]">Thriller</span>
								</div>
							</div>
							<p class="the_text item" id="text3">  Kraven Kravinoff's complex relationship with his ruthless gangster father, Nikolai, starts him down a path of vengeance with brutal consequences, motivating him to become not only the greatest hunter in the world, but also one of its most feared.  </p>
							<div class="main_buttons item">
								<button class="play_button" tabindex="0">
									<div class="gradient"></div>
									<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
										<path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path>
									</svg>
									<span>Watch Now</span>
								</button>
								<button class="round_button" tabindex="0">
									<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 384 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
										<path d="M0 512V48C0 21.49 21.49 0 48 0h288c26.51 0 48 21.49 48 48v464L192 400 0 512z"></path>
									</svg>
								</button>
								<button class="round_button info" tabindex="0">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
										<circle cx="12" cy="12" r="10"></circle>
										<path d="M12 16v-4"></path>
										<path d="M12 8h.01"></path>
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="swiper-pagination"></div>
		</div>
	</div>

<br>

<br>

    <section class="cd-discover-section">
        <div class="cd-discover-section__container">
            <div class="cd-discover-section__header">
                <h2 class="cd-header__title">Discover Content</h2>
                <div class="cd-header__divider"></div>
                <p class="cd-header__subtitle">Explore our diverse range of faith-building content across multiple formats</p>
            </div>
            <div class="cd-discover-section__grid">
                
                <div class="cd-item">
                    <div class="cd-item__overlay"></div>
                    <img alt="Christian TV" class="cd-item__image" src="https://m.media-amazon.com/images/G/31/AmazonVideo/2019/MLP._SX1440_CR575,0,865,675_QL80_AC_FP_.jpg">
                    <div class="cd-item__content-wrapper">
                        <div class="cd-item__title-area">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cd-item__icon">
                                <rect width="20" height="15" x="2" y="7" rx="2" ry="2"></rect>
                                <polyline points="17 2 12 7 7 2"></polyline>
                            </svg>
                            <h3 class="cd-item__title">Christian TV</h3>
                        </div>
                        <p class="cd-item__description">Faith-based shows &amp; series</p>
                    </div>
                </div>

                <div class="cd-item">
                    <div class="cd-item__overlay"></div>
                    <img alt="Radio Stations" class="cd-item__image" src="https://eternityready.net/assets/images/channels/3.webp">
                    <div class="cd-item__content-wrapper">
                        <div class="cd-item__title-area">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cd-item__icon">
                                <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"></path>
                                <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"></path>
                                <circle cx="12" cy="12" r="2"></circle>
                                <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"></path>
                                <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"></path>
                            </svg>
                            <h3 class="cd-item__title">Radio Stations</h3>
                        </div>
                        <p class="cd-item__description">24/7 inspiration &amp; worship</p>
                    </div>
                </div>

                <div class="cd-item">
                    <div class="cd-item__overlay"></div>
                    <img alt="Podcasts" class="cd-item__image" src="https://eternityready.net/assets/images/channels/6.webp">
                    <div class="cd-item__content-wrapper">
                        <div class="cd-item__title-area">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cd-item__icon">
                                <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"></path>
                            </svg>
                            <h3 class="cd-item__title">Podcasts</h3>
                        </div>
                        <p class="cd-item__description">Discussions &amp; teachings</p>
                    </div>
                </div>

                <div class="cd-item">
                    <div class="cd-item__overlay"></div>
                    <img alt="Movies & Music" class="cd-item__image" src="https://eternityready.net/assets/images/channels/2.webp">
                    <div class="cd-item__content-wrapper">
                        <div class="cd-item__title-area">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cd-item__icon">
                                <path d="M9 18V5l12-2v13"></path>
                                <circle cx="6" cy="18" r="3"></circle>
                                <circle cx="18" cy="16" r="3"></circle>
                            </svg>
                            <h3 class="cd-item__title">Movies &amp; Music</h3>
                        </div>
                        <p class="cd-item__description">Films &amp; music videos</p>
                    </div>
                </div>

            </div>
        </div>
    </section>
    
<div class="container-fluid">
	<div class="row">
		<div class="pm-section-highlighted">
			<div class="dis-clumn">
				<div id="video-wrapper">
					<div class="pm-video-watch-featured">
					<?php if ($_smarty_tpl->tpl_vars['featured_videos_total']->value == 1) {?>
						<h2 class="ml-3"><a href="<?php echo $_smarty_tpl->tpl_vars['featured_videos']->value[0]['video_href'];?>
"><?php echo $_smarty_tpl->tpl_vars['featured_videos']->value[0]['video_title'];?>
</a></h2>
						<?php if ($_smarty_tpl->tpl_vars['display_preroll_ad']->value == true) {?>
							<div id="preroll_placeholder">
								<div class="preroll_countdown">
									<?php echo $_smarty_tpl->tpl_vars['lang']->value['preroll_ads_timeleft'];?>
 <span class="preroll_timeleft"><?php echo $_smarty_tpl->tpl_vars['preroll_ad_data']->value['timeleft_start'];?>
</span>
								</div>
								<?php echo $_smarty_tpl->tpl_vars['preroll_ad_data']->value['code'];?>


								<?php if ($_smarty_tpl->tpl_vars['preroll_ad_data']->value['skip']) {?>
								<div class="preroll_skip_countdown">
									<?php echo $_smarty_tpl->tpl_vars['lang']->value['preroll_ads_skip_msg'];?>
 <span class="preroll_skip_timeleft"><?php echo $_smarty_tpl->tpl_vars['preroll_ad_data']->value['skip_delay_seconds'];?>
</span>
								</div>
								<div class="preroll_skip_button">
								<button class="btn btn-default hide-me" id="preroll_skip_btn"><?php echo $_smarty_tpl->tpl_vars['lang']->value['preroll_ads_skip'];?>
</button>
								</div>
								<?php }?>
								<?php if ($_smarty_tpl->tpl_vars['preroll_ad_data']->value['disable_stats'] == 0) {?>
									<img src="<?php echo @constant('_URL');?>
/ajax.php?p=stats&do=show&aid=<?php echo $_smarty_tpl->tpl_vars['preroll_ad_data']->value['id'];?>
&at=<?php echo @constant('_AD_TYPE_PREROLL');?>
" width="1" height="1" border="0" />
								<?php }?>
							</div>
						<?php } else { ?>
							<?php $_smarty_tpl->_subTemplateRender("file:player.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array('page'=>"index",'video_data'=>$_smarty_tpl->tpl_vars['featured_videos']->value[0]), 0, false);
?>
						<?php }?>

					<?php } elseif ($_smarty_tpl->tpl_vars['featured_videos_total']->value > 1) {?>
						<h2 class="ml-3"><a href="<?php echo $_smarty_tpl->tpl_vars['featured_videos']->value[0]['video_href'];?>
"><?php echo $_smarty_tpl->tpl_vars['featured_videos']->value[0]['video_title'];?>
</a></h2>
							<?php $_smarty_tpl->_subTemplateRender("file:player.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array('page'=>"index",'video_data'=>$_smarty_tpl->tpl_vars['featured_videos']->value[0]), 0, true);
?>
						<div class="clearfix"></div>
					<?php }?>
					</div>
				</div>
			</div>
		</div>
	</div>
</div
<br><br>

</div>
<br>
<div id="content" class="pt-0">
	<div class="disable-container">
	<?php if ($_smarty_tpl->tpl_vars['featured_videos_total']->value > 2) {?>
	<div class="row pm-featured-list-row">
		<div class="col-md-12">
			<div class="pm-section-head">
				<h2><?php echo $_smarty_tpl->tpl_vars['lang']->value['_feat'];?>
</h2>
				<div class="btn-group btn-group-sort">
				<button class="btn btn-xs" id="pm-slide-prev_featured"><i class="fa fa-chevron-left"></i></button>
				<button class="btn btn-xs" id="pm-slide-next_featured"><i class="fa fa-chevron-right"></i></button>
				</div>
			</div>
			<div id="">
			<!-- Carousel items -->
				<ul class="pm-ul-carousel-videos list-inline" data-slider-id="featured" data-slides="5" id="pm-carousel_featured">
					<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['featured_videos']->value, 'video_data', false, 'k', 'featured_videos', array (
));
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['k']->value => $_smarty_tpl->tpl_vars['video_data']->value) {
?>
						<li class="col-xs-2 col-sm-2 col-md-6">
							<?php $_smarty_tpl->_subTemplateRender('file:item-video-obj.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array('hideLabels'=>'1','hideMeta'=>'1','thumbSize'=>'medium'), 0, true);
?>
						</li>
					<?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
				</ul>
			</div><!-- #pm-slider -->
		</div>
	</div>
	<?php }?>

	<?php if ($_smarty_tpl->tpl_vars['total_playingnow']->value > 0) {?>
	<div class="row pm-vbwrn-list-row">
		<div class="col-md-12">
			<div class="pm-section-head">
				<h2><?php echo $_smarty_tpl->tpl_vars['lang']->value['vbwrn'];?>
</h2>
				<div class="btn-group btn-group-sort">
				<button class="btn btn-xs" id="pm-slide-prev_vbwrn"><i class="fa fa-chevron-left"></i></button>
				<button class="btn btn-xs" id="pm-slide-next_vbwrn"><i class="fa fa-chevron-right"></i></button>
				</div>
			</div>
			<div id="">
			<!-- Carousel items -->
				<ul class="pm-ul-carousel-videos list-inline" data-slider-id="vbwrn" data-slides="5" id="pm-carousel_vbwrn">
					<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['playingnow']->value, 'video_data', false, 'k');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['k']->value => $_smarty_tpl->tpl_vars['video_data']->value) {
?>
						<li class="col-xs-2 col-sm-2 col-md-6">
							<?php $_smarty_tpl->_subTemplateRender('file:item-video-obj.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, true);
?>
						</li>
					<?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
				</ul>
			</div><!-- #pm-slider -->
		</div>
	</div>
	<?php }?>
<a name="videos"></a>

	<div class="row">
		<div class="col-md-8">
			<div class="pm-section-head">

				<h2><a href="<?php echo @constant('_URL');?>
/newvideos.<?php echo @constant('_FEXT');?>
"><?php echo $_smarty_tpl->tpl_vars['lang']->value['new_videos'];?>
</a></h2>
			</div>
			<ul class="pm-ul-browse-videos list-unstyled">
				<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['new_videos']->value, 'video_data', false, 'k');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['k']->value => $_smarty_tpl->tpl_vars['video_data']->value) {
?>
				<li class="col-xs-6 col-sm-6 col-md-4">
					<?php $_smarty_tpl->_subTemplateRender('file:item-video-obj.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, true);
?>
				</li>
				<?php
}
} else {
?>
				<li class="col-xs-12 col-sm-12 col-md-12">
					<?php echo $_smarty_tpl->tpl_vars['lang']->value['top_videos_msg2'];?>

				</li>
				<?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
			</ul>
			<div class="clearfix"></div>
		</div><!-- .col-md-8 -->

		<div class="col-md-4 col-md-sidebar">
		
			<?php if ($_smarty_tpl->tpl_vars['ad_5']->value != '') {?>
			<div class="widget">

				<div class="pm-section-head">
					<h2><?php echo (($tmp = @$_smarty_tpl->tpl_vars['lang']->value['_advertisment'])===null||$tmp==='' ? 'Advertisment' : $tmp);?>
</h2>
				</div>
				<div class="pm-ads-banner" align="center"><?php echo $_smarty_tpl->tpl_vars['ad_5']->value;?>
</div>
			</div><!-- .widget -->
			<?php }?>

			<div class="widget">
			<div class="pm-section-head">
				<h2><a href="<?php echo @constant('_URL');?>
/topvideos.<?php echo @constant('_FEXT');?>
"><?php echo $_smarty_tpl->tpl_vars['lang']->value['top_m_videos'];?>
</a></h2>
			</div>
			<ul class="row pm-ul-browse-videos list-unstyled">
				<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['top_videos']->value, 'video_data', false, 'k');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['k']->value => $_smarty_tpl->tpl_vars['video_data']->value) {
?>
				<li class="col-xs-6 col-sm-6 col-md-6">
					<?php $_smarty_tpl->_subTemplateRender('file:item-video-obj.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array('hideMeta'=>'1','hideLabels'=>'1','thumbSize'=>'small'), 0, true);
?>
				</li>
				<?php
}
} else {
?>
				<li class="col-xs-12 col-sm-12 col-md-12">
					<?php echo $_smarty_tpl->tpl_vars['lang']->value['top_videos_msg2'];?>

				</li>
				<?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
			</ul>
			<div class="clearfix"></div>
			</div><!-- .widget -->

			<?php if (@constant('_MOD_ARTICLE') == 1) {?>
			<div class="widget">
				<div class="pm-section-head">
					<h2><a href="<?php echo @constant('_URL');?>
/article.<?php echo @constant('_FEXT');?>
"><?php echo $_smarty_tpl->tpl_vars['lang']->value['articles_latest'];?>
</a></h2>
				</div>
				<ul class="pm-sidebar-articles list-unstyled">
				<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['articles']->value, 'article', false, 'id');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['id']->value => $_smarty_tpl->tpl_vars['article']->value) {
?>
				<li class="media<?php if ($_smarty_tpl->tpl_vars['article']->value['featured'] == '1') {?> media-featured<?php }?>">
					<?php if ($_smarty_tpl->tpl_vars['article']->value['meta']['_post_thumb_show'] != '') {?>
					<a href="<?php echo $_smarty_tpl->tpl_vars['article']->value['link'];?>
" class="pull-left" title="<?php echo $_smarty_tpl->tpl_vars['article']->value['title'];?>
"><img src="<?php echo @constant('_ARTICLE_ATTACH_DIR');?>
/<?php echo $_smarty_tpl->tpl_vars['article']->value['meta']['_post_thumb_show'];?>
" align="left" border="0" alt="<?php echo $_smarty_tpl->tpl_vars['article']->value['title'];?>
" class="media-object"></a>
					<?php }?>
					<div class="media-body">
						<h5 class="media-heading"><a href="<?php echo $_smarty_tpl->tpl_vars['article']->value['link'];?>
" title="<?php echo $_smarty_tpl->tpl_vars['article']->value['title'];?>
" ><?php echo $_smarty_tpl->tpl_vars['article']->value['title'];?>
</a></h5>
						<span class="ellipsis"><?php echo smarty_modifier_truncate($_smarty_tpl->tpl_vars['article']->value['excerpt'],130);?>
</span>
					</div>
				</li>
				<?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
				</ul>
			</div><!-- .widget -->
			<?php }?>
		</div><!-- .col-md-4 -->
	</div><!-- .row -->
<div class="row">
    <div class="col-md-12 border border-gray border-left-0 border-top-0 border-right-0" style="margin-bottom: 25px;">
        <div class="pm-section-head" style="margin-bottom: 0px;">
            <h2 style="font-size: 2em"><a href="https://www.eternityready.com/category.php?cat=tvnetworks">TV Networks</a></h2>
        </div>
    </div>
</div>



<ul class="row pm-ul-browse-videos list-unstyled" id="pm-grid" style="animation-duration: 0ms; opacity: 1;">
							<li class="col-xs-6 col-sm-4 col-md-3">
				<div class="thumbnail">
	<div class="pm-video-thumb ripple">
		
		
								<div class="watch-later" style="display: none;">
				<button class="pm-watch-later-add btn btn-xs btn-default hidden-xs watch-later-add-btn-251" onclick="watch_later_add(251); return false;" rel="tooltip" data-placement="left" title="" data-original-title="Watch Later"><i class="fa fa-clock-o"></i></button>
				<button class="pm-watch-later-remove btn btn-xs btn-success hidden-xs watch-later-remove-btn-251" onclick="watch_later_remove(251); return false;" rel="tooltip" title="" data-original-title="Remove from playlist"><i class="fa fa-check"></i></button>
			</div>
							<a href="https://www.eternityready.com/watch.php?vid=74e424682" title="Day Star">
									<div class="pm-video-labels hidden-xs">
												<span class="label label-pop">Popular</span>							</div>
						<img src="https://www.eternityready.com/uploads/thumbs/74e424682-1.jpg" alt="Day Star" class="img-responsive" style="width: 240px; height: 136px; object-fit: cover; object-position: 25% 55%;">
		<span class="overlay"></span>
		</a>
	</div>

	<div class="caption">
		<h3><a href="https://www.eternityready.com/watch.php?vid=74e424682" title="Day Star" class="ellipsis" style="overflow-wrap: break-word; white-space: normal;">Day Star Network</a></h3>
				<div class="pm-video-meta hidden-xs">
			<span class="pm-video-author">by <a href="https://www.eternityready.com/user.php?u=eternityready">eternityready</a></span>
						<span class="pm-video-since"><time datetime="2023-12-11T01:46:29+0000" title="Monday, December 11, 2023 1:46 AM">1 month</time></span>
			<!-- 			<span class="pm-video-views"><i class="fa fa-eye"></i> 60</span>
			<span class=""><i class="fa fa-thumbs-up"></i> 0</span> -->
		</div>
			</div>
</div>				</li>
							<li class="col-xs-6 col-sm-4 col-md-3">
				<div class="thumbnail">
	<div class="pm-video-thumb ripple">
		
		
								<div class="watch-later" style="display: none;">
				<button class="pm-watch-later-add btn btn-xs btn-default hidden-xs watch-later-add-btn-222" onclick="watch_later_add(222); return false;" rel="tooltip" data-placement="left" title="" data-original-title="Watch Later"><i class="fa fa-clock-o"></i></button>
				<button class="pm-watch-later-remove btn btn-xs btn-success hidden-xs watch-later-remove-btn-222" onclick="watch_later_remove(222); return false;" rel="tooltip" title="" data-original-title="Remove from playlist"><i class="fa fa-check"></i></button>
			</div>
							<a href="https://www.eternityready.com/watch.php?vid=52f348499" title="KSCE-TV Life!">
									<div class="pm-video-labels hidden-xs">
												<span class="label label-pop">Popular</span>				<span class="label label-featured">Featured</span>			</div>
						<img src="https://www.eternityready.com/uploads/thumbs/52f348499-1.jpg" alt="KSCE-TV Life!" class="img-responsive" style="width: 240px; height: 136px; object-fit: cover; object-position: 25% 55%;">
		<span class="overlay"></span>
		</a>
	</div>

	<div class="caption">
		<h3><a href="https://www.eternityready.com/watch.php?vid=52f348499" title="KSCE-TV Life!" class="ellipsis" style="overflow-wrap: break-word; white-space: normal;">KSCE-TV Life!</a></h3>
				<div class="pm-video-meta hidden-xs">
			<span class="pm-video-author">by <a href="https://www.eternityready.com/user.php?u=eternityready">eternityready</a></span>
						<span class="pm-video-since"><time datetime="2023-11-10T16:46:01+0000" title="Friday, November 10, 2023 4:46 PM">2 months</time></span>
			<!-- 			<span class="pm-video-views"><i class="fa fa-eye"></i> 65</span>
			<span class=""><i class="fa fa-thumbs-up"></i> 0</span> -->
		</div>
			</div>
</div>				</li>
							<li class="col-xs-6 col-sm-4 col-md-3">
				<div class="thumbnail">
	<div class="pm-video-thumb ripple">
		
		
								<div class="watch-later" style="display: none;">
				<button class="pm-watch-later-add btn btn-xs btn-default hidden-xs watch-later-add-btn-80" onclick="watch_later_add(80); return false;" rel="tooltip" data-placement="left" title="" data-original-title="Watch Later"><i class="fa fa-clock-o"></i></button>
				<button class="pm-watch-later-remove btn btn-xs btn-success hidden-xs watch-later-remove-btn-80" onclick="watch_later_remove(80); return false;" rel="tooltip" title="" data-original-title="Remove from playlist"><i class="fa fa-check"></i></button>
			</div>
							<a href="https://www.eternityready.com/watch.php?vid=61fd1ca0a" title="Son Broadcasting Network">
									<div class="pm-video-labels hidden-xs">
																<span class="label label-featured">Featured</span>			</div>
						<img src="https://www.eternityready.com/uploads/thumbs/61fd1ca0a-1.jpg" alt="Son Broadcasting Network" class="img-responsive" style="width: 240px; height: 136px; object-fit: cover; object-position: 25% 55%;">
		<span class="overlay"></span>
		</a>
	</div>

	<div class="caption">
		<h3><a href="https://www.eternityready.com/watch.php?vid=61fd1ca0a" title="Son Broadcasting Network" class="ellipsis" style="overflow-wrap: break-word; white-space: normal;">Son Broadcasting Network</a></h3>
				<div class="pm-video-meta hidden-xs">
			<span class="pm-video-author">by <a href="https://www.eternityready.com/user.php?u=eternityready">eternityready</a></span>
						<span class="pm-video-since"><time datetime="2023-11-04T05:56:54+0000" title="Saturday, November 4, 2023 5:56 AM">2 months</time></span>
			<!-- 			<span class="pm-video-views"><i class="fa fa-eye"></i> 48</span>
			<span class=""><i class="fa fa-thumbs-up"></i> 0</span> -->
		</div>
			</div>
</div>				</li>
							<li class="col-xs-6 col-sm-4 col-md-3">
				<div class="thumbnail">
	<div class="pm-video-thumb ripple">
		
		
								<div class="watch-later" style="display: none;">
				<button class="pm-watch-later-add btn btn-xs btn-default hidden-xs watch-later-add-btn-79" onclick="watch_later_add(79); return false;" rel="tooltip" data-placement="left" title="" data-original-title="Watch Later"><i class="fa fa-clock-o"></i></button>
				<button class="pm-watch-later-remove btn btn-xs btn-success hidden-xs watch-later-remove-btn-79" onclick="watch_later_remove(79); return false;" rel="tooltip" title="" data-original-title="Remove from playlist"><i class="fa fa-check"></i></button>
			</div>
							<a href="https://www.eternityready.com/watch.php?vid=a4fc306db" title="3ABN! Dare to Dream">
									<div class="pm-video-labels hidden-xs">
																<span class="label label-featured">Featured</span>			</div>
						<img src="https://www.eternityready.com/uploads/thumbs/a4fc306db-1.jpg" alt="3ABN! Dare to Dream" class="img-responsive" style="width: 240px; height: 136px; object-fit: cover; object-position: 25% 55%;">
		<span class="overlay"></span>
		</a>
	</div>

	<div class="caption">
		<h3><a href="https://www.eternityready.com/watch.php?vid=a4fc306db" title="3ABN! Dare to Dream" class="ellipsis" style="overflow-wrap: break-word; white-space: normal;">3ABN! Dare to Dream</a></h3>
				<div class="pm-video-meta hidden-xs">
			<span class="pm-video-author">by <a href="https://www.eternityready.com/user.php?u=eternityready">eternityready</a></span>
						<span class="pm-video-since"><time datetime="2023-11-04T05:55:23+0000" title="Saturday, November 4, 2023 5:55 AM">2 months</time></span>
			<!-- 			<span class="pm-video-views"><i class="fa fa-eye"></i> 50</span>
			<span class=""><i class="fa fa-thumbs-up"></i> 0</span> -->
		</div>
			</div>
</div>				</li>


<div class="clearfix"></div>
<div class=col-md-12>
    <a href="https://www.eternityready.com/category.php?cat=tvnetworks" class="view-morebtn">View More Videos</a>
</div>
    
<!-- Sound Player -->
     <audio id="audio"></audio>

    <div id="player-bar">
      <div class="song-details">
        <img
          src="imagens/capa-padrao.jpg"
          alt="Capa do Álbum"
          class="album-art-bar"
        />
        <div class="song-info-bar">
          <h3 id="song-title">Nome da Música</h3>
          <p id="song-artist">Nome do Artista</p>
        </div>
      </div>

      <div class="player-core-controls">
        <div class="controls">
          <button id="prev" class="control-btn">
            <i class="fas fa-backward-step"></i>
          </button>
          <button id="play" class="control-btn play-btn">
            <i class="fas fa-play"></i>
          </button>
          <button id="next" class="control-btn">
            <i class="fas fa-forward-step"></i>
          </button>
        </div>
      </div>

      <div class="extra-controls">
        <i class="fas fa-volume-high" id="mute"></i>
        <i class="fas fa-close" id="close"></i>
      </div>
    </div>
	
<section class="secao-carrossel carrossel-1">
	<h1 onClick="window.open('https://www.eternityready.com/radio', '_self')">Radio Stations</h1>
	<div class="swiper-container">
		<div class="swiper-wrapper" id="radio-wrapper"></div>
    	<div class="swiper-button-prev"></div>
    	<div class="swiper-button-next"></div>
	</div>
</section>

<section class="secao-carrossel carrossel-2">
	<h1 onClick="window.open('https://www.eternityready.com/radio', '_self')">Tittle</h1>
	<div class="swiper-container">
		<div class="swiper-wrapper">
			<div class="swiper-slide" onClick="window.open('https://www.eternityready.com/radio', '_self')">
				<div class="card-carrossel">
					<img src="https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg" alt="Imagem do Card 1">
				</div>	
				<div class="card-carrossel-conteudo">
					<h4>Card Tittle</h4>
				</div>
			</div>
			<div class="swiper-slide" onClick="window.open('https://www.eternityready.com/radio', '_self')">
				<div class="card-carrossel">
					<img src="https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg" alt="Imagem do Card 1">
				</div>	
				<div class="card-carrossel-conteudo">
					<h4>Card Tittle</h4>
				</div>
			</div>
			<div class="swiper-slide" onClick="window.open('https://www.eternityready.com/radio', '_self')">
				<div class="card-carrossel">
					<img src="https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg" alt="Imagem do Card 1">
				</div>	
				<div class="card-carrossel-conteudo">
					<h4>Card Tittle</h4>
				</div>
			</div>
			<div class="swiper-slide" onClick="window.open('https://www.eternityready.com/radio', '_self')">
				<div class="card-carrossel">
					<img src="https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg" alt="Imagem do Card 1">
				</div>	
				<div class="card-carrossel-conteudo">
					<h4>Card Tittle</h4>
				</div>
			</div>
			<div class="swiper-slide" onClick="window.open('https://www.eternityready.com/radio', '_self')">
				<div class="card-carrossel">
					<img src="https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg" alt="Imagem do Card 1">
				</div>	
				<div class="card-carrossel-conteudo">
					<h4>Card Tittle</h4>
				</div>
			</div>
			<div class="swiper-slide" onClick="window.open('https://www.eternityready.com/radio', '_self')">
				<div class="card-carrossel">
					<img src="https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg" alt="Imagem do Card 1">
				</div>	
				<div class="card-carrossel-conteudo">
					<h4>Card Tittle</h4>
				</div>
			</div>
		</div>
		<div class="swiper-button-prev"></div>
		<div class="swiper-button-next"></div>
	</div>
</section>

<section class="secao-carrossel carrossel-3">
	<h1 onClick="window.open('https://www.eternityready.com/radio', '_self')">Tittle</h1>
	<div class="swiper-container">
		<div class="swiper-wrapper">
			<div class="swiper-slide" onClick="window.open('https://www.eternityready.com/radio', '_self')">
				<div class="card-carrossel">
					<img src="https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg" alt="Imagem do Card 1">
                </div>					
				<div class="card-carrossel-conteudo">
					<h4>Card Tittle</h4>
				</div>
			</div>
			<div class="swiper-slide" onClick="window.open('https://www.eternityready.com/radio', '_self')">
				<div class="card-carrossel">
					<img src="https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg" alt="Imagem do Card 1">
                </div>					
				<div class="card-carrossel-conteudo">
					<h4>Card Tittle</h4>
				</div>
			</div>
			<div class="swiper-slide" onClick="window.open('https://www.eternityready.com/radio', '_self')">
				<div class="card-carrossel">
					<img src="https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg" alt="Imagem do Card 1">
                </div>					
				<div class="card-carrossel-conteudo">
					<h4>Card Tittle</h4>
				</div>
			</div>
			<div class="swiper-slide" onClick="window.open('https://www.eternityready.com/radio', '_self')">
				<div class="card-carrossel">
					<img src="https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg" alt="Imagem do Card 1">
                </div>					
				<div class="card-carrossel-conteudo">
					<h4>Card Tittle</h4>
				</div>
			</div>
			<div class="swiper-slide" onClick="window.open('https://www.eternityready.com/radio', '_self')">
				<div class="card-carrossel">
					<img src="https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg" alt="Imagem do Card 1">
                </div>					
				<div class="card-carrossel-conteudo">
					<h4>Card Tittle</h4>
				</div>
			</div>
			<div class="swiper-slide" onClick="window.open('https://www.eternityready.com/radio', '_self')">
				<div class="card-carrossel">
					<img src="https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg" alt="Imagem do Card 1">
                </div>					
				<div class="card-carrossel-conteudo">
					<h4>Card Tittle</h4>
				</div>
			</div>
			<div class="swiper-slide" onClick="window.open('https://www.eternityready.com/radio', '_self')">
				<div class="card-carrossel">
					<img src="https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg" alt="Imagem do Card 1">
                </div>					
				<div class="card-carrossel-conteudo">
					<h4>Card Tittle</h4>
				</div>
			</div>
			
		</div>
		<div class="swiper-button-prev"></div>
		<div class="swiper-button-next"></div>
	</div>
</section>
 
 
 
<?php if (pm_count($_smarty_tpl->tpl_vars['featured_categories_data']->value) > 0) {?>
    <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['featured_categories_data']->value, 'video_data_array', false, 'category_id');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['category_id']->value => $_smarty_tpl->tpl_vars['video_data_array']->value) {
?>
        <?php if ($_smarty_tpl->tpl_vars['categories']->value[$_smarty_tpl->tpl_vars['category_id']->value]['published_videos'] > 0) {?>
        <div class="row pm-featured-cat-row">
            <div class="col-md-12">
				<div class="pm-section-head">
					<h2><a href="<?php echo $_smarty_tpl->tpl_vars['categories']->value[$_smarty_tpl->tpl_vars['category_id']->value]['url'];?>
"><?php echo $_smarty_tpl->tpl_vars['categories']->value[$_smarty_tpl->tpl_vars['category_id']->value]['name'];?>
</a></h2>
					<div class="btn-group btn-group-sort">
					<button class="btn btn-xs" id="pm-slide-prev_<?php echo $_smarty_tpl->tpl_vars['category_id']->value;?>
"><i class="fa fa-chevron-left"></i></button>
					<button class="btn btn-xs" id="pm-slide-next_<?php echo $_smarty_tpl->tpl_vars['category_id']->value;?>
"><i class="fa fa-chevron-right"></i></button>
					</div>
				</div>
					
				<div id="test">
				<!-- Carousel items -->
					<ul class="pm-ul-carousel-videos list-inline" data-slider-id="<?php echo $_smarty_tpl->tpl_vars['category_id']->value;?>
" data-slides="5" id="pm-carousel_<?php echo $_smarty_tpl->tpl_vars['category_id']->value;?>
">
						<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['video_data_array']->value, 'video_data', false, 'k');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['k']->value => $_smarty_tpl->tpl_vars['video_data']->value) {
?>
						<li class="">
						<?php $_smarty_tpl->_subTemplateRender('file:item-video-obj.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, true);
?>
						</li>
						<?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
					</ul>
				</div><!-- #pm-slider -->
			
	        		
			
			
			</div>
		</div>
			<?php }?>
		<?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
	<?php }?>
	
	<div class="clearfix"></div>

	</div><!-- .container -->
	<style>
	
	a.view-morebtn {
    display: block;
    padding: 10px 10px;
    background: #fff;
    max-width: 300px;
    margin: 0 auto;
    text-align: center;
    font-size: 18px;
    text-transform: capitalize;
    color: #bf1e2e !important;
    text-decoration: none;
}
#header {
    background:transparent;
    transition:all .2s;
}
footer {
  margin-top: 0px;
}
/*.navbar-collapse.collapse {
  display: block!important;
}*/

/*.navbar-nav>li, .navbar-nav {
  float: left !important;
}*/

.navbar-nav.navbar-right:last-child {
  margin-right: -15px !important;
}

/*.navbar-nav li {
    margin-top:-37px;
    margin-right:45px;
    padding-bottom:3px;
}*/

/*.navbar-right {
  float: right!important;
}*/

.navbar-nav {
    margin: 0px 0px 0px 0px;
    padding: 0px 10px;
}

@media (min-width: 768px) {
    .signin {
        font-size:16px;
    }
}

@media (max-width: 768px) {
    .signin {
        font-size:15px;
    }
}


.rev_slider_wrapper {
    padding-top: 0px;
}

body.scrolled #header {
  opacity: 0.2;
  transition: opacity .2s;
}

.pm-top-nav{     background-color: #18191c00; }
body.scrolled #main-menu:hover {
  opacity: 1.0;
  transition: opacity .2s;
}

</style>

<?php echo '<script'; ?>
 src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"><?php echo '</script'; ?>
>

<?php echo '<script'; ?>
>

document.addEventListener('DOMContentLoaded', () => {
     
        const radioWrapper = document.getElementById('radio-wrapper');
        const songTitle = document.getElementById("song-title");
    	const songArtist = document.getElementById("song-artist");
    	const albumArt = document.querySelector(".album-art-bar");
    	const audio = document.getElementById("audio");
    
    	const prevBtn = document.getElementById("prev");
    	const playBtn = document.getElementById("play");
    	const nextBtn = document.getElementById("next");
    	const playBtnIcon = playBtn.querySelector("i.fas");
    	const mute = document.getElementById("mute");
    	const close = document.getElementById("close")
    	const playerBar = document.getElementById("player-bar");
    	
    	let currentPlaylist = [];
    	let currentSongIndex = 0;
    	let isPlaying = false;
    	
    	function playRadio(channel, index) {
    		playerBar.classList.add("ativo");
    		currentPlaylist = channel; // A playlist agora é o array de todas as estações
    		currentSongIndex = index;
    		loadSong(currentPlaylist[currentSongIndex]);
    		playSong();
    	}
    	
    	function loadSong(song) {
    		songTitle.textContent = song.name;
    		songArtist.textContent = song.description;
    		audio.src = song.src;
    		albumArt.src = song.logo;
    	}
    	
    	function playSong() {
    		isPlaying = true;
    		playBtnIcon.classList.remove("fa-play");
    		playBtnIcon.classList.add("fa-pause");
    		audio.play().catch(error => console.error("Erro ao tentar tocar o áudio:", error));
    	}
    	
    	function pauseSong() {
    		isPlaying = false;
    		playBtnIcon.classList.add("fa-play");
    		playBtnIcon.classList.remove("fa-pause");
    		audio.pause();
    	}
    	
    	function prevSong() {
    		currentSongIndex--;
    		if (currentSongIndex < 0) {
    			currentSongIndex = currentPlaylist.length - 1;
    		}
    		loadSong(currentPlaylist[currentSongIndex]);
    		playSong();
    	}
    	
    	function nextSong() {
    		currentSongIndex++;
    		if (currentSongIndex >= currentPlaylist.length) {
    			currentSongIndex = 0;
    		}
    		loadSong(currentPlaylist[currentSongIndex]);
    		playSong();
    	}
    
    	function muteSong() {
    		audio.muted = !audio.muted;
    		mute.classList.toggle("fa-volume-high");
    		mute.classList.toggle("fa-volume-mute");
    	}
    	
    	function closeBar() {
    	    const widget = document.querySelector(".widget-visible");
    	    widget.style.setProperty('display', 'block', 'important');
    	    playerBar.classList.remove("ativo");
    	    pauseSong()
    	    
    	}
    	
    	playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));
    	prevBtn.addEventListener("click", prevSong);
    	nextBtn.addEventListener("click", nextSong);
    	mute.addEventListener("click", muteSong);
        audio.addEventListener('ended', nextSong);
        close.addEventListener("click", closeBar)
        
        let stationsArray = [];
        
        const stationFetch = async () => {
          console.log("Trying to fetch radio");
          try {
            const response = await fetch("radio.json");
            const stationsData = await response.json();
            console.log("Dados das estações buscados com sucesso!");
            return stationsData;
          } catch (e) {
            console.log("error: " + e);
            return null;
          }
        };
        
        (async () => {
          console.log("a")
          const stations = await stationFetch();
          console.log(stations)

        
          if (!stations) {
            console.log("Nenhuma estação carregada.");
            return;
          }
      
      
         const stationsArray = Object.values(stations.channels);
         
         
        function handleRadioClick(event) {
            // 'currentTarget' refere-se ao slide onde o listener foi adicionado
            const clickedIndex = parseInt(event.currentTarget.getAttribute('data-index'), 10);
            const widget = document.querySelector(".widget-visible");
            
            if (!isNaN(clickedIndex) && stationsArray[clickedIndex]) {
                widget.style.setProperty('display', 'none', 'important');
                playRadio(stationsArray, clickedIndex);
            } else {
                console.error('Índice inválido ou estação não encontrada para o índice:', clickedIndex);
            }
        } 
         
        stationsArray.forEach((station, index) => {
          const slide = document.createElement("div");
          slide.className = "swiper-slide";
          slide.setAttribute('data-index', index);
          slide.innerHTML = '<div class="card-carrossel">' +
                    '<img src="' + station.logo + '" alt="' + station.name + '" style="width:100%;height:auto;" />' +
                    '</div>' +
                    '<div class="card-carrossel-conteudo">' +
                        '<h4>' + station.name + '</h4>' +
                    '</div>' +
                  '</div>';
                  
          slide.addEventListener('click', handleRadioClick);
          radioWrapper.appendChild(slide);
        });        
        
        	const swiper1 = new Swiper('.carrossel-1 .swiper-container', {
                effect: 'slide',
                grabCursor: true,
                slidesPerView: 2,
                spaceBetween: 16,
                loop: true,
                breakpoints: {
                    640: { slidesPerView: 2, spaceBetween: 16 },
                    768: { slidesPerView: 3, spaceBetween: 24 },
                    1024: { slidesPerView: 4, spaceBetween: 24 }
                },
                navigation: {
                    nextEl: '.carrossel-1 .swiper-button-next',
                    prevEl: '.carrossel-1 .swiper-button-prev',
                },
                loop: true
            });
        })();
        
        
        	var swiper2 = new Swiper('.carrossel-2 .swiper-container', {
        		effect: 'slide',
        		grabCursor: true,
        		slidesPerView: 2,
        		spaceBetween: 16,
        		loop: true,
        		breakpoints: {
        			640: { slidesPerView: 2, spaceBetween: 16 },
        			768: { slidesPerView: 3, spaceBetween: 24 },
        			1024: { slidesPerView: 4, spaceBetween: 24 }
        		},
        		navigation: {
					nextEl: '.carrossel-2 .swiper-button-next',
                    prevEl: '.carrossel-2 .swiper-button-prev',
						},
        	});
        
        	var swiper3 = new Swiper('.carrossel-3 .swiper-container', {
        		effect: 'slide',
        		grabCursor: true,
        		slidesPerView: 2,
        		spaceBetween: 16,
        		loop: true,
        		breakpoints: {
        			640: { slidesPerView: 2, spaceBetween: 16 },
        			768: { slidesPerView: 3, spaceBetween: 24 },
        			1024: { slidesPerView: 4, spaceBetween: 24 }
        		},
        		navigation: {
					nextEl: '.carrossel-3 .swiper-button-next',
                    prevEl: '.carrossel-3 .swiper-button-prev',
				},
        	});
        
            
	
		let video_timeout;
		let item_timeous = [];

		const swiper = new Swiper(".mySwiper", {
            init: false,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicMainBullets: 3
            },
            hashNavigation: {
                watchState: true,
            },
            on: {
                transitionEnd: transitionEnd
            },
        });
        
        swiper.on('init', function() {
            add_video(swiper);
        });
        
        swiper.init();
        
        // Agora pode chamar isso fora, normalmente
        manageElementVisibility();

		window.addEventListener('load', manageElementVisibility);
		window.addEventListener('resize', manageElementVisibility);


		let previousIndex = 0; 

		function transitionEnd()
		{
			if (swiper.activeIndex !== previousIndex) {
				swiper.slides.forEach((slide, index) => {
					if (index !== swiper.activeIndex)
					{
						const iframe = slide.querySelector('iframe');

						if (iframe)
						{
							iframe.remove()
						}

						slide.classList.remove('video-loaded');

						slide.querySelectorAll('.item').forEach(item => item.classList.remove('show'));
					}
				});

				clearTimeout(video_timeout);
				item_timeous.forEach(timeout => clearTimeout(timeout));

				document.getElementById('mute_button').classList.add('off');

				previousIndex = swiper.activeIndex;


				add_video(swiper);
			}
		}


		function add_video(swiper)
		{
			const activeSlide = swiper.slides[swiper.activeIndex];
			const videoId = activeSlide.dataset.videoId;

			// Only replace if not already replaced
			if (!activeSlide.classList.contains('video-loaded'))
			{
				const iframe = document.createElement('iframe');
				iframe.src = `https://www.youtube.com/embed/rze8QYwWGMs?autoplay=1&amp;controls=0&amp;modestbranding=1&amp;rel=0&amp;showinfo=0&amp;iv_load_policy=3&amp;autohide=1&amp;mute=1&amp;enablejsapi=1&amp;fs=0&amp;cc_load_policy=0&amp;playsinline=1`;
				
				iframe.allow = 'autoplay; encrypted-media';
				iframe.frameBorder = '0';
				iframe.allowFullscreen = '';
				iframe.style.width = '100%';
				iframe.style.height = '100%';

				// Append and mark as loaded
				video_timeout = setTimeout(() => {
					activeSlide.querySelector('.overlay_1').append(iframe);
					activeSlide.classList.add('video-loaded');
				}, 650);
			}

			fadeInByRows(activeSlide);
		}


		function fadeInByRows(activeSlide, delayPerRow = 100) {
			const items = Array.from(activeSlide.querySelectorAll(`.container .item`));

			// Group items by their offsetTop (i.e., row position)
			const rows = {};

			items.forEach(item => {
				const top = item.offsetTop;
				if (!rows[top]) rows[top] = [];
				rows[top].push(item);
			});

			// Get row values sorted by vertical position
			const rowKeys = Object.keys(rows).sort((a, b) => a - b);

			rowKeys.forEach((rowTop, index) => {
				const rowItems = rows[rowTop];
				item_timeous[index] = setTimeout(() => {
					rowItems.forEach(item => item.classList.add('show'));
				}, index * delayPerRow);
			});
		}


		function checkScrollPosition()
		{
			if (window.scrollY !== 0)
				document.body.classList.add('scrolled');
			else
				document.body.classList.remove('scrolled');
		}

		document.addEventListener('DOMContentLoaded', checkScrollPosition);

		window.addEventListener('scroll', checkScrollPosition);



		document.getElementById('mute_button').addEventListener('click', () => {
			const activeSlide = document.querySelector('.swiper-slide-active');

			if (activeSlide.classList.contains('video-loaded') === false) return;

			const iframe = activeSlide?.querySelector('iframe');
			const muteBtn = document.getElementById('mute_button');

			if (iframe && iframe.contentWindow)
			{
				if (iframe.dataset.muted === 'undefined') return;
	
				const isMuted = iframe.dataset.muted === "true";

				iframe.contentWindow.postMessage(JSON.stringify({
					event: "command",
					func: isMuted ? "mute" : "unMute",
					args: []
				}), "*");

				// Toggle dataset and .off class
				iframe.dataset.muted = isMuted ? "false" : "true";
				muteBtn.classList.toggle('off');
			}
		});

		function manageElementVisibility() {
		const breakpoint = 768; // Define your desired screen width breakpoint in pixels
        const elem = $(".the_text");

		for (var i = 0; i < elem.length; i++) {
			if (window.innerWidth < breakpoint) {
				elem[i].textContent = '';
			}
		}
		}


});
<?php echo '</script'; ?>
>


<?php $_smarty_tpl->_subTemplateRender('file:footer.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array('p'=>"index"), 0, false);
}
}
